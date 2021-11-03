# Generated by Django 3.2.7 on 2021-10-06 01:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fair3D', '0011_remove_stand_corporate_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='standtype',
            name='num_participants',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='stand',
            name='admin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='stands', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='stand',
            name='url_facebook',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stand',
            name='url_linkedin',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stand',
            name='url_twitter',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stand',
            name='url_video',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='stand',
            name='url_web_page',
            field=models.URLField(blank=True, null=True),
        ),
    ]