from os import name
from typing import Callable
from django.db import models
from django.db.models.deletion import SET_NULL
from profile_api.models import UserProfile, CorporateGroup

class StandType(models.Model):
    name = models.CharField(max_length=6 )
    area = models.CharField(max_length=20)
    num_participants = models.IntegerField()

    def __str__(self):
        return self.name + ' (' + self.area + ')'

class Stand(models.Model):
    name = models.CharField(max_length=50)
    type = models.ForeignKey(to=StandType,on_delete=models.PROTECT,related_name="stands")
    admin = models.ForeignKey(to=UserProfile,on_delete=models.SET_NULL,related_name="stands",null=True,blank=True)
    url_facebook = models.URLField(null=True,blank=True)
    url_twitter = models.URLField(null=True,blank=True)
    url_linkedin = models.URLField(null=True,blank=True)
    url_web_page = models.URLField(null=True,blank=True)
    url_video = models.URLField(null=True,blank=True)

    def __str__(self):
        return self.name


class Staff(models.Model):
    user = models.OneToOneField(to=UserProfile, on_delete=models.CASCADE)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE,related_name="staff")

    def __str__(self):
        return self.user.email

class Whatsapp(models.Model):
    name = models.CharField(max_length=50)
    link = models.URLField()
    staff = models.OneToOneField(to=Staff,on_delete=models.CASCADE,related_name="whatsapp")

    def __str__(self):
        return self.name

class Calendify(models.Model):
    name = models.CharField(max_length=50)
    link = models.URLField()
    staff = models.OneToOneField(to=Staff,on_delete=models.CASCADE,related_name="calendify")

    def __str__(self):
        return self.name

class Pdf(models.Model):
    def document_directory_path(instance, filename):
        return 'stands/{0}/pdfs/{1}'.format(instance.stand.name, filename)

    file = models.FileField(upload_to=document_directory_path)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE,related_name="pdfs")
    description = models.CharField(max_length=50)
    
    def __str__(self):
        return self.description


class Excel(models.Model):
    def document_directory_path(instance, filename):
        return 'stands/{0}/excels/{1}'.format(instance.stand.name, filename)

    file = models.FileField(upload_to=document_directory_path)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE, related_name="excels")
    description = models.CharField(max_length=50)
    
    def __str__(self):
        return self.description


class Image(models.Model):
    def document_directory_path(instance, filename):
        return 'stands/{0}/images/{1}'.format(instance.stand.name, filename)

    image = models.ImageField(upload_to=document_directory_path)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE, related_name="images")
    caption = models.CharField(max_length=35)

    def __str__(self):
        return self.caption


class Color(models.Model):
    r = models.IntegerField()
    g = models.IntegerField()
    b = models.IntegerField()

    material = models.CharField(max_length=50)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE,related_name="colors")

    def __str__(self):
        return str(self.r) + ',' + str(self.g) + ',' + str(self.b)


class Showroom(models.Model):
    stand = models.OneToOneField(to=Stand,on_delete=models.CASCADE,related_name="showroom")
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    date = models.DateTimeField()
    link = models.URLField()
    #inscribed_participants = 

    def __str__(self):
        return self.name


class Resource3D(models.Model):

    def document_directory_path(instance, filename):
        return 'stands/{0}/3d_resources/{1}'.format(instance.stand.name, filename)

    index = models.FileField(upload_to=document_directory_path)
    stand = models.ForeignKey(to=Stand,on_delete=models.CASCADE, related_name="resources_3d")
    description = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.description



    


    




