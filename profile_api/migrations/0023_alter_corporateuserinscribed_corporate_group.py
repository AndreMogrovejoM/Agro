# Generated by Django 3.2.7 on 2021-10-05 18:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profile_api', '0022_userprofile_ruc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='corporateuserinscribed',
            name='corporate_group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='profile_api.corporategroup'),
        ),
    ]