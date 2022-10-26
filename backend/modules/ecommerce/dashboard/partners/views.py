import logging

from django.contrib import messages
from django.shortcuts import redirect
from django.views.generic import TemplateView

from modules.ecommerce.dashboard.partners.forms import UploadMenuForm

from django.core.management.base import BaseCommand, CommandError

from oscar.core.loading import get_class

CatalogueImporter = get_class('partner.importers', 'CatalogueImporter')
ImportingError = get_class('partner.exceptions', 'ImportingError')

logger = logging.getLogger('oscar.catalogue.import')


class UploadMenuView(TemplateView):
    template_name = 'oscar/dashboard/partners/upload_menu.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = UploadMenuForm()
        context['includes_files'] = True
        context['sample_files'] = [
            'sample_menu.csv',
            'sample_menu_with_images.csv',
        ]
        return context

    def post(self, request, *args, **kwargs):
        form = UploadMenuForm(request.POST, request.FILES)
        if form.is_valid():
            delimiter = form.cleaned_data['delimiter']
            file = form.cleaned_data['menu_file']
            # Do something with the file
            importer = CatalogueImporter(
                logger, delimiter=delimiter,
                flush=False)
            logger.info(" - Importing records from '%s'" % file)
            try:
                importer.handle(file)
            except ImportingError as e:
                raise CommandError(str(e))
            messages.success(request, "Menu imported successfully")
            return redirect('dashboard:upload_menu')
        else:
            return self.render_to_response(self.get_context_data(form=form))