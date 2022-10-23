from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
from food_template_dev_38283.base_model import BaseModels

User = get_user_model()


class Support(BaseModels):
    user = models.ForeignKey(
        User, verbose_name=_("Sender"), on_delete=models.CASCADE
    )
    subject = models.CharField(_("Subject"), max_length=255)
    message = models.TextField(_("Message"))
    admin_reply = models.TextField(blank=True)
    is_resolved = models.BooleanField(_("Resolved Status"), default=False)
