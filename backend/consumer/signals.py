from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from consumer.models import Support
from consumer.utils import send_support_message_reply

User = get_user_model()


@receiver(post_save, sender=Support)
def saved_support(sender, instance, created, **kwargs):
    try:
        if created:
            pass
        else:
            if instance.admin_reply and instance.is_resolved:
                # Send Email to User
                send_support_message_reply(instance)
    except Exception as e:
        print(str(e))
        raise Exception(e)
