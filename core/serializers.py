from rest_framework import serializers
from .models import *


class PathSerializer(serializers.ModelSerializer):

    class Meta:
        model = Path
        exclude = ('groups','id',) 