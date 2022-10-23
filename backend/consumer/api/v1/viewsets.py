from django.contrib.postgres.aggregates import StringAgg
from django.db.models import Count, Q, CharField
from django.db.models.functions import Cast
from oscarapi.utils.loading import get_api_class
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from oscar.core.loading import get_model

from consumer.api.v1.serializers import CustomPartnerSerializer, CustomProductClassSerializer, CustomProductSerializer, \
    SupportSerializer, CustomProductSerializerWithMoreInfo
from consumer.drone_location_api import DroneLocationAPI
from consumer.models import Support
from consumer.utils import filter_vendors_queryset
from food_template_dev_38283.settings import ORDER_STATUS_AUTHORIZED, ORDER_STATUS_CANCELED_USER

Product = get_model('catalogue', 'Product')
ProductClass = get_model('catalogue', 'ProductClass')
Partner = get_model('partner', 'Partner')
Order = get_model("order", "Order")
OrderSerializer = get_api_class("serializers.checkout", "OrderSerializer")


class PublicPartnerList(ReadOnlyModelViewSet, ):
    serializer_class = CustomPartnerSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        response = []
        qry = Partner.objects.all()
        search = self.request.query_params.get('search')
        food_type_id = self.request.query_params.get('food_type_id')

        if food_type_id:
            qry = qry.filter(stockrecords__product__product_class__id=food_type_id)
        if search:
            qry = Partner.objects.filter(
                Q(name__icontains=search) | Q(stockrecords__product__description__icontains=search) | Q(
                    stockrecords__product__title__icontains=search) | Q(
                    stockrecords__product__product_class__name__icontains=search))
        qry = qry.annotate(product_count=Count('stockrecords'),
                           products=StringAgg(Cast('stockrecords__product__id', output_field=CharField()),
                                              delimiter=','))
        for i in qry:
            response.append({
                'id': i.id,
                'name': i.name,
                'logo': i.logo,
                'cover': i.cover,
                'description': i.description,
                'products': Product.objects.filter(id__in=i.products.split(','))[:2] if i.products else None,
                'product_count': i.product_count,
                'partner_lat': i.addresses.first().lat if hasattr(i, 'addresses') and i.addresses.first() else None,
                'partner_long': i.addresses.first().lng if hasattr(i, 'addresses') and i.addresses.first() else None,
                'is_open': i.is_open
            })
        response = filter_vendors_queryset(response, self.request)
        return response

    @action(methods=["get"], detail=True, url_path="vendor-food-types")
    def vendor_food_types(self, request, pk=None):
        vendor_types = []
        product_type_count = {}
        vendor_object = get_object_or_404(Partner, pk=pk)
        vendor_stock_data = vendor_object.stockrecords.all()
        for i in vendor_stock_data:
            if i.product.product_class not in product_type_count:
                product_type_count[i.product.product_class] = 1
            else:
                product_type_count[i.product.product_class] += 1
            if i.product.product_class not in vendor_types:
                vendor_types.append(i.product.product_class)
        serializer = CustomProductClassSerializer(
            vendor_types, context={"request": request, 'product_type_count': product_type_count}, many=True
        )
        return Response(serializer.data)

    @action(methods=["get"], detail=True, url_path="vendor-food-types/(?P<vendor_type_id>\d+)/vendor-food-type-menu")
    def vendor_food_type_menu(self, request, pk=None, **kwargs):
        vendor_type_id = kwargs.get('vendor_type_id')
        vendor_object = get_object_or_404(Partner, pk=pk)
        vendor_stock_data = vendor_object.stockrecords.filter(product__product_class=vendor_type_id)
        if not vendor_stock_data:
            return Response("Invalid Vendor Type ID")
        product_data = []
        for i in vendor_stock_data:
            product_data.append(i.product)
        serializer = CustomProductSerializerWithMoreInfo(
            product_data, context={"request": request}, many=True
        )
        return Response(serializer.data)


class FoodTypesList(ReadOnlyModelViewSet, ):
    queryset = ProductClass.objects.all()
    serializer_class = CustomProductClassSerializer
    permission_classes = (IsAuthenticated,)


class SupportViewSet(ModelViewSet):
    permission_classes = (
        IsAuthenticated,
    )
    serializer_class = SupportSerializer
    http_method_names = ['post', ]

    def get_queryset(self):
        queryset = Support.objects.filter(user=self.request.user).order_by('-created_at')
        return queryset


class CancelOrder(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        qs = Order.objects.all()
        return qs.filter(user=self.request.user, status=ORDER_STATUS_AUTHORIZED)

    def post(self, request, *args, **kwargs):
        order = self.get_object()
        order.set_status(ORDER_STATUS_CANCELED_USER)
        return Response(self.serializer_class(order, context={'request': request}).data)


class CheckDeliveryLocation(APIView):
    def get(self, request, *args, **kwargs):
        drone_api_response = DroneLocationAPI().check_delivery_location(request.query_params)
        response = {} if not drone_api_response else drone_api_response
        return Response(response)
