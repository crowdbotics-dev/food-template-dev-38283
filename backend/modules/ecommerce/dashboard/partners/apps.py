from django.urls import path
import oscar.apps.dashboard.partners.apps as apps
from oscar.core.loading import get_class


class PartnersDashboardConfig(apps.PartnersDashboardConfig):
    name = 'modules.ecommerce.dashboard.partners'

    permissions_map = _map = {
        'upload_menu': (['is_staff'], ['partner.dashboard_access']),
    }

    def ready(self):
        super().ready()
        # Custom views
        self.upload_menu = get_class('dashboard.partners.views', 'UploadMenuView')


    def get_urls(self):
        urls = super().get_urls()
        urls += [
            # Custom URLs
            path('upload-menu/', self.upload_menu.as_view(), name='upload_menu'),
        ]
        return self.post_process_urls(urls)