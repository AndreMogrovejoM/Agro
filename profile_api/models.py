from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.db.models.fields.related import OneToOneField
from django.utils import timezone


class UserType(models.Model):
    name = models.CharField(max_length=40)
    def __str__(self):
        return self.name

class TypeInscription(models.Model):
    payment_usd = models.IntegerField()
    name = models.CharField(max_length=40)
    spanish_name = models.CharField(max_length=40)
    user_type = models.ForeignKey(
        UserType ,
        on_delete=models.PROTECT,
        )

    def __str__(self):
        return self.name

class DocumentType(models.Model):
    name = models.CharField(max_length=40)
    spanish_name = models.CharField(max_length=40)
    num_digits = models.IntegerField(default=8)
    def __str__(self):
        return self.spanish_name

class UserReviewState(models.Model):
    name = models.CharField(max_length=10)
    def __str__(self):
        return self.name

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""
    def create_user(self, email, password=None, **extra_fields):
        """Create a new user profile"""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user 

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using = self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):

    def other_document_directory_path(instance, filename):
        return 'image_profile/user_{0}/{1}'.format(instance.document_number, filename)

    def document_directory_path(instance, filename):
        return 'evidence/user_{0}/{1}'.format(instance.document_number, filename)

    def get_full_name(self):
        return self.first_name + " " + self.last_name
    
    def __str__(self):
        """Return string representation of our user"""
        return self.email


    """Database model for users in the system"""
    email = models.EmailField(unique=True)
    document_type = models.ForeignKey(
        DocumentType ,
        on_delete=models.PROTECT, null=True, blank=True)

    ruc = models.CharField(max_length=11, unique=True, blank=True, null=True)
    document_number = models.CharField(max_length=12, unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    mobile = models.CharField(max_length=30, blank=True, unique=True, null=True)
    job_title = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_free = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    feria3d = models.BooleanField(default=True)

    user_type = models.ForeignKey(
        UserType ,
        on_delete=models.SET_NULL,
        null=True,
        blank=True)

    user_review_state = models.ForeignKey(
        UserReviewState ,
        on_delete=models.SET_NULL,
        null=True,
        blank=True)

    evidence_image = models.FileField(upload_to=other_document_directory_path,null=True,blank=True)
    profile_image = models.FileField(upload_to=document_directory_path,null=True,blank=True)

    publicity = models.BooleanField(null=True,blank=True)

    creation_date = models.DateTimeField(default=timezone.now)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


class Inscription(models.Model):
    type = models.ForeignKey(
        TypeInscription ,
        on_delete=models.PROTECT,
        )
    token_id = models.CharField(max_length=25)
    user = OneToOneField(to=UserProfile,on_delete=models.PROTECT)

    def __str__(self):
        return self.user.first_name + ' as ' + self.type.name


class CorporateGroup(models.Model):
    ruc = models.CharField(max_length=11, unique=True) 
    company_name = models.CharField(max_length=30, blank=True)  
    max_num_users_inscribed = models.IntegerField()
    admin = OneToOneField(to=UserProfile,on_delete=models.CASCADE, related_name="corporate_group")
    creation_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.company_name


class CorporateGroupPayment(models.Model):
    token = models.CharField(max_length=25)
    number_participants = models.IntegerField()
    amount = models.DecimalField(max_digits=10,decimal_places=2)
    currency = models.CharField(max_length=3)
    corporate_group = models.ForeignKey(
        CorporateGroup ,
        on_delete=models.PROTECT,
        related_name="payments")
    creation_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.corporate_group.company_name + '_' + self.token

class CorporateUserInscribed(models.Model):
    user = OneToOneField(to=UserProfile,on_delete=models.CASCADE)
    corporate_group = models.ForeignKey(
        CorporateGroup ,
        on_delete=models.CASCADE,
        related_name="participants")
    
    def __str__(self):
        return self.user.first_name + '_' +self.corporate_group.company_name

    
