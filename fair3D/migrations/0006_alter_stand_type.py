# Generated by Django 3.2.7 on 2021-10-04 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fair3D', '0005_auto_20211004_1038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stand',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='stands', to='fair3D.standtype'),
        ),
    ]