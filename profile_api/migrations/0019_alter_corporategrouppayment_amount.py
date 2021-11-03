# Generated by Django 3.2.7 on 2021-09-28 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profile_api', '0018_corporategrouppayment_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corporategrouppayment',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=300, max_digits=5),
            preserve_default=False,
        ),
    ]