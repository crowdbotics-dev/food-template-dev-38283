from django.shortcuts import get_object_or_404
from oscarapi.utils.loading import get_api_classes
from rest_framework import generics, status
from rest_framework.response import Response
from oscar.core.loading import get_model

from modules.ecommerce.utils import JsonResponse
from modules.payments.services.StripeService import StripeService
from .serializers import (
    CheckoutSerializer,
    CompleteDeferredPaymentSerializer,
    PaymentMethodsSerializer,
    PaymentStateSerializer,
)

(OrderSerializer,) = get_api_classes("serializers.checkout", ["OrderSerializer"])

from .signals import order_placed
from .states import DECLINED, CONSUMED
from . import utils

Order = get_model("order", "Order")

CHECKOUT_ORDER_ID = "checkout_order_id"


class PaymentMethodsView(generics.GenericAPIView):
    serializer_class = PaymentMethodsSerializer

    def get(self, request):
        root_serializer = self.get_serializer()
        meta = self.metadata_class()
        data = {}
        for (
                method_code,
                method_serializer,
        ) in root_serializer.child.type_mapping.items():
            method = root_serializer.methods[method_code]
            data[method_code] = {
                "type": "nested object",
                "required": False,
                "read_only": False,
                "label": method.name,
                "children": meta.get_serializer_info(method_serializer),
            }
        return Response(data)


class CheckoutView(generics.GenericAPIView):
    """
    Checkout and begin collecting payment.

    POST(basket, shipping_address, wfrs_source_account,
         [total, shipping_method_code, shipping_charge, billing_address]):
    {
        "basket": "/api/baskets/1/",
        "guest_email": "foo@example.com",
        "total": "100.0",
        "shipping_charge": {
            "currency": "EUR",
            "excl_tax": "10.0",
            "tax": "0.6"
        },
        "shipping_method_code": "no-shipping-required",
        "shipping_address": {
            "country": "/api/countries/NL/",
            "first_name": "Henk",
            "last_name": "Van den Heuvel",
            "line1": "Roemerlaan 44",
            "line2": "",
            "line3": "",
            "line4": "Kroekingen",
            "notes": "Niet STUK MAKEN OK!!!!",
            "phone_number": "+31 26 370 4887",
            "postcode": "7777KK",
            "state": "Gerendrecht",
            "title": "Mr"
        },
        "payment": {
            "cash": {
                "amount": "100.00"
            }
        }
    }

    Returns the order object.
    """

    serializer_class = CheckoutSerializer

    def post(self, request, format=None):
        # Wipe out any previous state data
        utils.clear_consumed_payment_method_states(request)

        # Validate the input
        c_ser = self.get_serializer(data=request.data)
        if not c_ser.is_valid():
            return Response(c_ser.errors, status.HTTP_406_NOT_ACCEPTABLE)

        # Freeze basket
        basket = c_ser.validated_data.get("basket")
        basket.freeze()

        # Save Order
        order = c_ser.save()
        request.session[CHECKOUT_ORDER_ID] = order.id

        # Send order_placed signal
        order_placed.send(sender=self, order=order, user=request.user, request=request)

        stripe_payment_intent = StripeService.create_payment_intent_sheet_for_user(self.request.user,
                                                                                   int(order.total_incl_tax * 100),
                                                                                   c_ser.validated_data[
                                                                                       'stripe_payment_method'])

        order.stripe_payment_intent_id = stripe_payment_intent['id']
        order.save()

        payment_data = c_ser.validated_data["payment"]
        for k, v in payment_data.items():
            v['reference'] = stripe_payment_intent['id']

        # Save payment steps into session for processing
        previous_states = utils.list_payment_method_states(request)
        new_states = self._record_payments(
            previous_states=previous_states,
            request=request,
            order=order,
            methods=c_ser.fields["payment"].methods,
            data=c_ser.validated_data["payment"],
        )
        utils.set_payment_method_states(order, request, new_states)

        # Return order data
        o_ser = OrderSerializer(order, context={"request": request, "stripe_payment_intent": stripe_payment_intent})
        return Response(o_ser.data)

    def _record_payments(self, previous_states, request, order, methods, data):
        order_balance = [order.total_incl_tax]
        new_states = {}

        def record(method_key, method_data):
            # If a previous payment method at least partially succeeded, hasn't been consumed by an
            # order, and is for the same amount, recycle it. This requires that the amount hasn't changed.

            # Get the processor class for this method
            code = method_data["method_type"]
            method = methods[code]

            state = None
            if method_key in previous_states:
                prev = previous_states[method_key]
                if prev.status not in (DECLINED, CONSUMED):
                    if prev.amount == method_data["amount"]:
                        state = prev
                    else:
                        # Previous payment exists but we can't recycle it; void whatever already exists.
                        method.void_existing_payment(request, order, method_key, prev)

            # Previous payment method doesn't exist or can't be reused. Create it now.
            if not state:
                state = method.record_payment(request, order, method_key, **method_data)
            # Subtract amount from pending order balance.
            order_balance[0] = order_balance[0] - state.amount
            return state

        # Loop through each method with a specified amount to charge
        data_amount_specified = {k: v for k, v in data.items() if not v["pay_balance"]}
        for key, method_data in data_amount_specified.items():
            new_states[key] = record(key, method_data)

        # Change the remainder, not covered by the above methods, to the method marked with `pay_balance`
        data_pay_balance = {k: v for k, v in data.items() if v["pay_balance"]}
        for key, method_data in data_pay_balance.items():
            method_data["amount"] = order_balance[0]
            new_states[key] = record(key, method_data)

        return new_states

    # def finalize_response(self, request, response, *args, **kwargs):
    #     if response.status_code >= 300:
    #         error = response.data.get('non_field_errors')
    #         response.data = JsonResponse(False, error[0] if error.__len__() > 0 else error, response.data)
    #     else:
    #         resp = JsonResponse(True, "success", response.data)
    #         response.data = resp
    #     return super(CheckoutView, self).finalize_response(request, response, *args, **kwargs)


class CompleteDeferredPaymentView(CheckoutView):
    """
    Authorize payment for an order previously placed using the “Pay Later”
    deferred payment method.
    """

    serializer_class = CompleteDeferredPaymentSerializer

    def post(self, request, format=None):
        # Wipe out any previous state data
        utils.clear_consumed_payment_method_states(request)

        # Validate the input
        c_ser = self.get_serializer(data=request.data)
        if not c_ser.is_valid():
            return Response(c_ser.errors, status.HTTP_406_NOT_ACCEPTABLE)

        # Update the session to note that we're working on this order
        order = c_ser.validated_data["order"]
        request.session[CHECKOUT_ORDER_ID] = order.id

        # Save payment steps into session for processing
        previous_states = utils.list_payment_method_states(request)
        new_states = self._record_payments(
            previous_states=previous_states,
            request=request,
            order=order,
            methods=c_ser.fields["payment"].methods,
            data=c_ser.validated_data["payment"],
        )
        utils.set_payment_method_states(order, request, new_states)

        # Return order data
        o_ser = OrderSerializer(order, context={"request": request})
        return Response(o_ser.data)


class PaymentStatesView(generics.GenericAPIView):
    def get(self, request, pk):
        order = get_object_or_404(Order, pk=pk)
        # Return order status and payment states
        # states = utils.list_payment_method_states(request)
        # state_data = {}
        # for key, state in states.items():
        #     ser = PaymentStateSerializer(instance=state)
        #     state_data[key] = ser.data

        return Response(
            {
                "order_status": order.status,
                # "payment_method_states": state_data if any(state_data) else None,
            }
        )
