from django.contrib import admin

# Register your models here.
from consumer.models import Support


@admin.register(Support)
class SupportAdmin(admin.ModelAdmin):
    fields = ('user', 'subject', 'message', 'admin_reply', 'is_resolved')
    list_display = ('get_sender_email', "get_sender", "subject", 'is_resolved')
    list_filter = ('is_resolved',)
    readonly_fields = ('message', 'user', 'subject')

    def get_sender(self, obj):
        return obj.user.name

    def get_sender_email(self, obj):
        return obj.user.email

    get_sender.short_description = "SENDER NAME"
    get_sender_email.short_description = "SENDER'S EMAIL"

    def has_add_permission(self, request):
        return False
