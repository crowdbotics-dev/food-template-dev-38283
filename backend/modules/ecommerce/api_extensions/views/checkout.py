from oscar.core.loading import get_model
from oscarapi.permissions import IsOwner
from oscarapi.utils.loading import get_api_class
from rest_framework import generics

from food_template_dev_38283.settings import ORDER_STATUS_AUTHORIZED, ORDER_BEING_PREPARED, ORDER_WAITING_PICKUP, \
    ORDER_ON_THE_WAY

OrderSerializer = get_api_class("serializers.checkout", "OrderSerializer")
Order = get_model("order", "Order")


class OrderList(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsOwner,)

    def get_queryset(self):
        qs = Order.objects.all()
        if self.request.query_params.get('ongoing'):
            status_list = [ORDER_STATUS_AUTHORIZED, ORDER_BEING_PREPARED, ORDER_WAITING_PICKUP, ORDER_ON_THE_WAY]
            qs = qs.filter(status__in=status_list)
        return qs.filter(user=self.request.user)
