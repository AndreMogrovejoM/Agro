from django.db.models import fields
from rest_framework import serializers
from profile_api import models
from django.conf import settings
from datetime import datetime, timedelta
from fair3D.models import Stand, Staff
from django.contrib.auth.models import Group



class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id','name',)


class UserProfileViewDocumentsSerializer(serializers.ModelSerializer):
    user_review_state = serializers.StringRelatedField()
    user_type=serializers.StringRelatedField()

    class Meta:
        depth = 1
        model = models.UserProfile
        fields = ('id','document_number','first_name','last_name','email',
        'company','creation_date','user_review_state','user_type',) 

class UserProfileViewDocumentsDetailSerializer(serializers.ModelSerializer):
    user_review_state = serializers.StringRelatedField()
    document_type=serializers.StringRelatedField()
    evidence_image = serializers.SerializerMethodField()


    def get_evidence_image(self, obj):
        if (obj.evidence_image.name):
            return settings.MEDIA_URL + obj.evidence_image.name
        else:
            return None

    class Meta:
        depth = 1
        model = models.UserProfile
        fields = ('id','document_type','document_number','first_name','last_name','email',
        'company','job_title','mobile','country','evidence_image','user_review_state')


class CorporateGroupSerializer(serializers.ModelSerializer):
    admin = UserProfileViewDocumentsDetailSerializer()
    admin_registered = serializers.SerializerMethodField()
    can_delete_users = serializers.SerializerMethodField()
    limit_date = serializers.SerializerMethodField()

    def get_admin_registered(self,obj):
        return obj.admin.feria3d
    
    def get_can_delete_users(self,obj):
        present = datetime.now()
        limit_date = settings.AGROMIN_START_DATE

        return present < limit_date

    def get_limit_date(self,obj):
        return settings.AGROMIN_START_DATE

    class Meta:
        model = models.CorporateGroup
        exclude = ('creation_date',)

class CorporateUserInscribedSerializer(serializers.ModelSerializer):
    user = UserProfileViewDocumentsDetailSerializer(read_only=True)
    class Meta:
        model = models.CorporateUserInscribed
        fields = ('user',)

class CorporateUserAdminSerializer(serializers.Serializer):
    document_type = serializers.IntegerField()
    document_number = serializers.CharField()
    job_title = serializers.CharField()

class CorporateGroupPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CorporateGroupPayment
        exclude = ('id','corporate_group','token')


class UpdateReviewStateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    review_id = serializers.IntegerField()

class CorporateGroupBuyPassesSerializer(serializers.Serializer):
    number_participants = serializers.IntegerField(min_value=3, max_value=10)
    currency = serializers.CharField(max_length=3)
    token = serializers.CharField(max_length=25)

class StaffUserSerializer(serializers.ModelSerializer):
    evidence_image = serializers.SerializerMethodField()

    def get_evidence_image(self, obj):
        if (obj.evidence_image.name):
            return settings.MEDIA_URL + obj.evidence_image.name
        else:
            return None

    class Meta:
        model = models.UserProfile
        fields = ('first_name','last_name', 'evidence_image','mobile','email')


class StaffSerializer(serializers.ModelSerializer):
    user = StaffUserSerializer(read_only=True)
    class Meta:
        model = Staff
        fields = ('__all__')

class StandSerializer(serializers.ModelSerializer):
    type = serializers.StringRelatedField()
    admin = UserProfileViewDocumentsDetailSerializer(read_only=True)
    staff = StaffSerializer(many=True, required=False)
    
    class Meta:
        model = Stand
        fields = ('id','name','type','admin', 'staff')
