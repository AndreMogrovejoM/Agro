# Generated by Django 3.2.7 on 2021-09-28 18:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('profile_api', '0016_corporategroup_creation_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='corporategrouppayment',
            name='creation_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
