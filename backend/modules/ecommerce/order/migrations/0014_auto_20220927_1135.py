# Generated by Django 2.2.28 on 2022-09-27 06:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0013_auto_20220927_1126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lineattribute',
            name='group',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='order_option_group', to='catalogue.ProductOptionGroup'),
        ),
    ]
