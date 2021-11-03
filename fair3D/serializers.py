from django.db.models import fields
from rest_framework import serializers
from .models import *
from profile_api.models import UserProfile
from django.conf import settings

class PdfSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = Pdf
        fields = '__all__'

        extra_kwargs = {
            'stand': {
                'write_only': True,
            },     
        }
    def get_name(self, instance):
        return '{0}'.format(instance.file.name[22:])

class ExcelSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    class Meta:
        model = Excel
        fields = '__all__'

        extra_kwargs = {
            'stand': {
                'write_only': True,
            },     
        }
    def get_name(self, instance):
        return '{0}'.format(instance.file.name[24:])

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        exclude = ('id','stand')       

class ImageSerializer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    class Meta:
        model = Image
        fields = '__all__'

        extra_kwargs = {
            'stand': {
                'write_only': True,
            },     
        }

    def get_name(self, instance):
        return '{0}'.format(instance.image.name[24:])


class CalendifySerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendify
        exclude = ('staff',)

class WhatsappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Whatsapp
        exclude = ('staff',)


class StaffUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Staff
        fields = ('__all__')

class StaffUpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('first_name','last_name','job_title','company', 'mobile', 'evidence_image')

class StaffUserInscriptionSerializer(serializers.Serializer):   
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    job_title = serializers.CharField(max_length=30)
    company = serializers.CharField(max_length=30)
    email = serializers.EmailField()
    mobile = serializers.CharField(max_length=30,required =False )
    language = serializers.CharField(max_length=2)

class StaffCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

        extra_kwargs = {
            'stand': {
                'write_only': True,
            },     
        }

class StaffUSerSerializer(serializers.ModelSerializer):
    evidence_image = serializers.SerializerMethodField()

    def get_evidence_image(self, obj):
        if (obj.evidence_image.name):
            return settings.MEDIA_URL + obj.evidence_image.name
        else:
            return None

    class Meta:
        model = UserProfile
        fields = ('first_name','last_name', 'evidence_image','mobile','email','job_title','company')

class StaffSerializer(serializers.ModelSerializer):
    user = StaffUSerSerializer()
    whatsapp = WhatsappSerializer()
    calendify = CalendifySerializer()
    
    class Meta:
        model = Staff
        exclude = ('stand',)

class StandSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    staff = StaffSerializer(many=True, required=False)
    excels = ExcelSerializer(many=True, required=False)
    pdfs = PdfSerializer(many=True, required=False)
    #colors = ColorSerializer(many=True)
    images = ImageSerializer(many=True, required=False)

    class Meta:
        model = Stand
        exclude = ('admin',)
        read_only_fields = ('type','name', )

class StandDetailSerializer(serializers.ModelSerializer):
    
    type = serializers.StringRelatedField()

    class Meta:
        model = Stand
        exclude = ('id','admin')
        read_only_fields = ('name', )





