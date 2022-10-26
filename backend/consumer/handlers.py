from django.dispatch import receiver
from oscar.core.loading import get_class

from drone_express_36671.settings import ORDER_ALL_CANCELLED,ORDER_WAITING_PICKUP
from modules.payments.services.StripeService import StripeService
from oscarapicheckout.methods import Stripe
from modules.firebase_push_notifications.models import Notification
from django.contrib.auth import get_user_model

from users.models import DRIVER


User = get_user_model()
order_status_changed = get_class("order.signals", "order_status_changed")


@receiver(order_status_changed)
def take_action_upon_order_status_change(sender, order, old_status, new_status, **kwargs):
    # Refund user account
    if new_status in ORDER_ALL_CANCELLED:
        try:
            response = StripeService.initiate_refund(order.stripe_payment_intent_id)
        except Exception as e:
            print(str(e))
        else:
            Stripe().order_refund(order, response['id'])

        # Notification for order status change
    if order.user.notification_setting:
        Notification.objects.create(receiver=order.user,title="Order Update",message="Your order with order id:{} status changed from {} to {}".format(order.number,old_status,new_status))
    else:
        pass

    if new_status == ORDER_WAITING_PICKUP:
        pilot_users = User.objects.filter(user_type=DRIVER,is_active=True,notification_setting=True)
        for pilot in pilot_users:
            Notification.objects.create(receiver=pilot,title="Order Update",message="New order with order id:{} is now ready for pickup".format(order.number))        