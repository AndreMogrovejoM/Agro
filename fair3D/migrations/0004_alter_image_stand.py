# Generated by Django 3.2.7 on 2021-09-30 22:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fair3D', '0003_auto_20210930_1731'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='stand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='fair3D.stand'),
        ),
    ]