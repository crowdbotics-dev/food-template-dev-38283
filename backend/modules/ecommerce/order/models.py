from django.db import models
from oscar.apps.order.abstract_models import AbstractOrder, AbstractLineAttribute


class Order(AbstractOrder):
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, default='')


class LineAttribute(AbstractLineAttribute):
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    group = models.ForeignKey(
        'catalogue.ProductOptionGroup', related_name='order_option_group', null=True, default=None, blank=True,
        on_delete=models.SET_NULL
    )


from oscar.apps.order.models import *  # noqa isort:skip
