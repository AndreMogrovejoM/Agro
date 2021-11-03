# Generated by Django 3.2.7 on 2021-09-15 01:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profile_api', '0005_auto_20210914_2046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='document_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='profile_api.documenttype'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user_review_state',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='profile_api.userreviewstate'),
        ),
    ]