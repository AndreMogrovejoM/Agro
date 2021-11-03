from rest_framework import serializers
from core.serializers import PathSerializer
from profile_api import models
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        paths_id = set()
        paths = []

        for group in self.user.groups.all():
            for path in group.paths.all():
                item = PathSerializer(path)
                
                if(path.name not in paths_id):
                    paths_id.add(path.name)
                    paths.append(item.data)

        data['paths'] = paths

        return data

class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()
    channel = serializers.SerializerMethodField()

    def get_profile_image(self, obj):
        if (obj.profile_image.name):
            return settings.MEDIA_URL + obj.profile_image.name
        else:
            return None

    def get_group(self, obj):
        exhibitor_groups = obj.groups.filter(name__in=settings.EXHIBITORS)
        if (exhibitor_groups):
            return exhibitor_groups[0].id
        else:
            return None

    def get_channel(self, obj):
        return obj.id

    class Meta:
        model = models.UserProfile
        exclude  = ('password','user_permissions','groups','last_login','creation_date'
        ,'user_type','user_review_state','feria3d','is_superuser','is_active','is_staff')

        extra_kwargs = {
            """
            'password': {
                'write_only': True,
                'required': False,
                'style': {'input_type': 'password'}
            },
            """
            'email': {
                'read_only': True,
                'required': False,
            },
            'evidence_image': {'read_only': True}
        }

    def create(self, validated_data):
        if validated_data["mobile"] == "":
            validated_data.pop("mobile")
            
        obj = models.UserProfile.objects.create(**validated_data)
        return obj

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if validated_data["mobile"] == "":
            validated_data.pop("mobile")

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)

class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DocumentType
        fields = '__all__'  

class TypeInscriptionSerializer(serializers.ModelSerializer):

    payment_pen = serializers.SerializerMethodField()

    def get_payment_pen(self, obj):
        return round(obj.payment_usd * settings.DOLLAR_CHANGE,2)

    class Meta:
        model = models.TypeInscription
        exclude = ('user_type',)


class UserReviewStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserReviewState
        fields = '__all__' 


class UserInscriptionSerializer(serializers.Serializer):
    inscription_id = serializers.IntegerField()
    ruc = serializers.CharField(max_length=11,required =False)
    number_participants = serializers.IntegerField(required =False, min_value=3, max_value=10)
    document_type = serializers.IntegerField(required =False)
    document_number = serializers.CharField(max_length=12,required =False)
    name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    company_name = serializers.CharField(max_length=30)
    job = serializers.CharField(max_length=30,required =False)
    phone_number = serializers.CharField(max_length=30,required =False )
    country = serializers.CharField(max_length=30)
    email = serializers.EmailField()
    publicity = serializers.BooleanField()
    currency = serializers.CharField(max_length=3,required =False)
    language = serializers.CharField(max_length=2)
    token = serializers.CharField(max_length=25)

class RestorePasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class FreeUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    mobile = serializers.CharField(max_length=30,required =False )

    def create(self, validated_data):
        if validated_data["mobile"] == "":
            validated_data.pop("mobile")
            
        obj = models.UserProfile.objects.create(**validated_data)
        return obj