# Generated by Django 3.2.7 on 2021-10-04 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_api', '0021_alter_corporategrouppayment_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='ruc',
            field=models.CharField(blank=True, max_length=11, null=True, unique=True),
        ),
    ]
