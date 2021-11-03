from rest_framework.generics import ListAPIView, get_object_or_404, CreateAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StandSerializer, PdfSerializer, ExcelSerializer, ImageSerializer, StandDetailSerializer, StaffSerializer, StaffUserInscriptionSerializer, StaffUpdateUserSerializer, StaffUpdateSerializer
from .models import Excel, Image, Pdf, Stand, Staff
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import OwnStand, OwnStandResource
import copy
import requests
import json
from django.conf import settings
from django.shortcuts import get_object_or_404
from profile_api.models import UserProfile, DocumentType

class StandListApiView(ListAPIView):
    queryset = Stand.objects.all().order_by('id')
    serializer_class = StandSerializer

class StaffCreateUpdateApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]

    def sendCredentials(self, user, password, language):

        body = {}

        if language == 'es':
            body = copy.deepcopy(settings.SPANISH_CREDENTIALS_EMAIL)

        else:
            body = copy.deepcopy(settings.ENGLISH_CREDENTIALS_EMAIL)

        body["template_params"]["nombre"] = user.get_full_name()
        body["template_params"]["contrasenia"] = password
        body["template_params"]["email"] = user.email

        try:
            response = requests.post(settings.END_POINT_EMAIL,json=body)
            return True
        except requests.exceptions.HTTPError as err:
            return False

    def get(self, request, pk, format=None):
        stand = Staff.objects.get(pk=pk)
        serializer_pdf = StaffSerializer(stand)
        return Response(serializer_pdf.data)

    def post (self, request, format=None):
        inscription = StaffUserInscriptionSerializer(data=json.loads(request.data['user']))
        
        if inscription.is_valid():
            if UserProfile.objects.filter(email=inscription.data['email']).exists():
                return Response("Correo ya inscrito.", status=status.HTTP_400_BAD_REQUEST)
            
            if "mobile" in inscription.data and UserProfile.objects.filter(mobile=inscription.data['mobile']).exists():
                return Response("Celular ya inscrito.", status=status.HTTP_400_BAD_REQUEST)
            
            if "document_number" in inscription.data and UserProfile.objects.filter(document_number=inscription.data['document_number']).exists():
                return Response("Número de documento ya inscrito.", status=status.HTTP_400_BAD_REQUEST)
            
            new_user = UserProfile(
                first_name = inscription.data['first_name'],
                last_name = inscription.data['last_name'],
                job_title = inscription.data['job_title'],
                company = inscription.data['company'],
                email = inscription.data['email'],   
                evidence_image = request.data['image'],    
            )
            
            if "mobile" in inscription.data:
                new_user.mobile = inscription.data['mobile']

            password = UserProfile.objects.make_random_password()
            new_user.set_password(password)
            new_user.save()
            
            new_staff = Staff(
                user = get_object_or_404(UserProfile,pk=new_user.pk),
                stand = get_object_or_404(Stand,pk=int(request.data['stand'])) 
            )
            if not self.sendCredentials(new_user, password,inscription.data["language"]):
                return Response("El registro fue exitoso, hubo un error en el envio de credenciales.",status=status.HTTP_502_BAD_GATEWAY)                       
            
            new_staff.save()
            return Response("Registro exitoso", status=status.HTTP_201_CREATED )

    def put(self, request, pk, format=None):
        snippet = Staff.objects.get(pk=pk)
        snippet_user = UserProfile.objects.get(pk=snippet.user.pk)
        serializer_staff = Staff(snippet)
        
        edit_user = {
            "first_name" : json.loads(request.data['user'])['first_name'],
            "last_name" : json.loads(request.data['user'])['last_name'],
            "job_title" : json.loads(request.data['user'])['job_title'],
            "company" : json.loads(request.data['user'])['company'],  
            "mobile" : json.loads(request.data['user'])['mobile'],  
            "evidence_image" : request.data['image'], 
        }

        serializer = StaffUpdateUserSerializer(snippet_user, data=edit_user)
        if serializer.is_valid():
            serializer.save()

        edit_staff = {
            "user" : snippet.user.pk,
            "stand" : int(request.data['stand'])
        }
        serializer_staff = StaffUpdateSerializer(snippet, data=edit_staff)
        if serializer_staff.is_valid():
            serializer_staff.save()
            return Response("Actualización correcta del staff",status.HTTP_200_OK)

        return Response(serializer_staff.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        staff = Staff.objects.get(pk=pk)
        staff.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

class StaffListApiView(ListAPIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        stand = Stand.objects.get(pk=pk)
        serializer_pdf = StandSerializer(stand)
        return Response(serializer_pdf.data['staff'])

class PdfCreateApiView(CreateAPIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    queryset = Pdf.objects.all()
    serializer_class = PdfSerializer

class PdfListApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        stand = Stand.objects.get(pk=pk)
        serializer_pdf = StandSerializer(stand)
        return Response(serializer_pdf.data['pdfs'])

class PdfRetrieveUpdateDestroyApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        pdf = Pdf.objects.get(pk=pk)
        serializer_pdf = PdfSerializer(pdf)
        return Response(serializer_pdf.data)

    def delete(self, request, pk, format=None):
        pdfs = Pdf.objects.all()
        pdf = Pdf.objects.get(pk=pk)
        pdf.delete()
        # serializer_pdf = PdfSerializer(pdf)
        serializer_class = PdfSerializer(pdfs, many=True)
        return Response(serializer_class.data)

class ExcelCreateApiView(CreateAPIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    queryset = Excel.objects.all()
    serializer_class = ExcelSerializer

class ExcelListApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        stand = Stand.objects.get(pk=pk)
        serializer_excel = StandSerializer(stand)
        return Response(serializer_excel.data['excels'])

class ExcelRetrieveUpdateDestroyApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        excel = Excel.objects.get(pk=pk)
        serializer_excel = ExcelSerializer(excel)
        return Response(serializer_excel.data)

    def delete(self, request, pk, format=None):
        all_excel = Excel.objects.all()
        excel = Excel.objects.get(pk=pk)
        excel.delete()
        serializer_class = ExcelSerializer(all_excel, many=True)
        return Response(serializer_class.data)

class ImageCreateApiView(CreateAPIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

class ImageListApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        stand = Stand.objects.get(pk=pk)
        serializer_image = StandSerializer(stand)
        return Response(serializer_image.data['images'])

class ImageRetrieveUpdateDestroyApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStandResource]
    
    def get(self, request, pk, format=None):
        image = Image.objects.get(pk=pk)
        serializer_image = ImageSerializer(image)
        return Response(serializer_image.data)

    def delete(self, request, pk, format=None):
        all_image = Image.objects.all()
        image = Image.objects.get(pk=pk)
        image.delete()
        serializer_class = ImageSerializer(all_image, many=True)
        return Response(serializer_class.data)

class ConfigureStandApiView(APIView):
    permission_classes = [IsAuthenticated, OwnStand]

    def put(self, request, pk, format=None):

        admin = request.user
        stand = get_object_or_404(Stand,admin=admin,pk=pk)
        data = StandSerializer(stand,request.data)

        if data.is_valid():
            data.save()
            return Response(data.data,status.HTTP_200_OK)
        
        return Response(data.errors,status.HTTP_400_BAD_REQUEST)

class StandDetailApiView(RetrieveAPIView):   
    permission_classes = [IsAuthenticated, OwnStand]
    queryset = Stand.objects.all()
    serializer_class = StandDetailSerializer 


