from django import forms
from django.contrib.auth.models import Permission
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import gettext_lazy as _
from django.utils.translation import pgettext_lazy

from oscar.core.compat import existing_user_fields, get_user_model
from oscar.core.loading import get_class, get_model

User = get_user_model()
Partner = get_model('partner', 'Partner')
PartnerAddress = get_model('partner', 'PartnerAddress')
EmailUserCreationForm = get_class('customer.forms', 'EmailUserCreationForm')

ROLE_CHOICES = (
    ('staff', _('Full dashboard access')),
    ('limited', _('Limited dashboard access')),
)

class NewUserForm(EmailUserCreationForm):
    role = forms.ChoiceField(choices=ROLE_CHOICES, widget=forms.RadioSelect,
                             label=_('User role'), initial='limited')

    def __init__(self, partner, *args, **kwargs):
        self.partner = partner
        # set initial values for fields that are not in the form
        self.base_fields['user_type'].initial = 3
        super().__init__(host=None, *args, **kwargs)

    def save(self):
        role = self.cleaned_data.get('role', 'limited')
        user = super().save(commit=False)
        user.is_staff = role == 'staff'
        user.save()
        self.partner.users.add(user)
        if role == 'limited':
            dashboard_access_perm = Permission.objects.get(
                codename='dashboard_access', content_type__app_label='partner')
            user.user_permissions.add(dashboard_access_perm)
        return user

    class Meta:
        model = User
        fields = existing_user_fields(
            ['first_name', 'last_name', 'email', 'user_type']) + ['password1', 'password2']


class PartnerAddressForm(forms.ModelForm):
    name = forms.CharField(
        required=False, max_length=128,
        label=pgettext_lazy("Partner's name", "Name"))
    lat = forms.DecimalField(
        required=True, max_digits=9, decimal_places=6,
        label=pgettext_lazy("Latitude", "Latitude"))
    lng = forms.DecimalField(
        required=True, max_digits=9, decimal_places=6,
        label=pgettext_lazy("Longitude", "Longitude"))

    class Meta:
        fields = ('name', 'line1', 'line2', 'line3', 'line4',
                  'state', 'postcode', 'country', 'lat', 'lng')
        model = PartnerAddress


class UploadMenuForm(forms.Form):
    """
    Form for uploading a menu
    """
    menu_file = forms.FileField(label=_('Menu file'))
    delimiter = forms.ChoiceField(
        choices=[(',', 'Comma'), (';', 'Semicolon'), ('\t', 'Tab')],
        label=_('Delimiter'),
        initial=',',
        required=False)

    def clean_menu_file(self):
        menu_file = self.cleaned_data['menu_file']
        if menu_file.size > 1024 * 1024:
            raise forms.ValidationError(_('File too large (max size is 1MB)'))
        if not menu_file.name.endswith('.csv'):
            raise forms.ValidationError(_('File is not CSV type'))
        return menu_file

    def clean(self):
        cleaned_data = super().clean()
        menu_file = cleaned_data.get('menu_file')
        if menu_file:
            if menu_file.size > 2 * 1024 * 1024:
                raise forms.ValidationError(_('File too large ( > 2mb )'))
            if menu_file.content_type not in ('text/csv', 'application/json'):
                raise forms.ValidationError(_('File type not supported'))
        return cleaned_data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['menu_file'].widget.attrs['accept'] = '.csv'

    class Meta:
        fields = ('menu_file', 'delimiter')