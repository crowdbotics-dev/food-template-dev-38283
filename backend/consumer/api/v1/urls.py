from django.urls import path, include
from rest_framework.routers import DefaultRouter

from consumer.api.v1.viewsets import PublicPartnerList, FoodTypesList, SupportViewSet, CancelOrder, \
    CheckDeliveryLocation

router = DefaultRouter()
router.register("vendors", PublicPartnerList, basename="vendors")
router.register("foodtypes", FoodTypesList, basename="foodtypes")
router.register("support", SupportViewSet, basename="support")

urlpatterns = [
    path('cancel-order/<int:pk>/', CancelOrder.as_view(), name='cancel_order'),
    path('check-delivery-location/', CheckDeliveryLocation.as_view(), name='check_delivery_location'),
    path("", include(router.urls)),
]
