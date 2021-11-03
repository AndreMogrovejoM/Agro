from django.db import models
from django.contrib.auth.models import Group

class Path(models.Model):
    name = models.CharField(max_length=50)
    english_name = models.CharField(max_length=50, null=True, blank=True)
    groups = models.ManyToManyField(to=Group,related_name='paths')
    title = models.CharField(max_length=50)
    icon = models.CharField(max_length=50)
    href = models.CharField(max_length=50)
    visible = models.BooleanField(default=False)

    def __str__(self):
        return self.title
