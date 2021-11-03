from re import S
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework import viewsets
#from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
#from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework.parsers import MultiPartParser
from django.shortcuts import get_object_or_404
from django.core.serializers.json import DjangoJSONEncoder
from culqi.client import Culqi
import simplejson as json
from django.db.models import Q
import copy
from profile_api import serializers
from profile_api import models
from profile_api.permissions import OwnProfile
from django.conf import settings
from rest_framework import generics
import requests
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import Group


culqi = Culqi(public_key=settings.CULQI_PUBLIC, private_key=settings.CULQI_PRIVATE)

def getAmount(payment, currency):
    if currency == 'PEN':
        payment*=settings.DOLLAR_CHANGE
    return int(payment)

def getReviewState(state):
    return models.UserReviewState.objects.get(name=state)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer

class OwnApiView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        user_serializer = serializers.UserProfileSerializer(user)
        return Response(user_serializer.data)

    def put(self, request, format=None):
        user = request.user
        user_serializer = serializers.UserProfileSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response("Usuario actualizado.",status=status.HTTP_200_OK)
        return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class UserProfileImageAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]
    def put(self,request,format=None):

        user = request.user
        user_serializer = serializers.UserProfileSerializer(user)

        if "profile_image" not in request.data:
            return Response("profile_image es un campo requerido", status=status.HTTP_400_BAD_REQUEST)
                
        user.profile_image=request.data["profile_image"]
        user.save()

        return Response(user_serializer.data)

class UserProfilePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self,request,format=None):

        user = request.user
        old_password = request.data["old_password"]

        if user.check_password(old_password):
            user.set_password(request.data["new_password"])
            user.save()
            return Response("Contraseña actualizada.",status=status.HTTP_200_OK)
        
        return Response("Constraseña incorrecta.", status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    #authentication_classes = (TokenAuthentication,)
    permission_classes = (OwnProfile,) 
    filter_backends = (filters.SearchFilter,)
    search_fields = ('email', 'first_name', 'last_name',)

"""
class UserLoginApiView(ObtainAuthToken):
    #Handle creating user authentication tokens
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
"""


class DocumentTypeListApiView(generics.ListAPIView):
    queryset = models.DocumentType.objects.all()
    serializer_class = serializers.DocumentTypeSerializer

class UserReviewStateListApiView(generics.ListAPIView):
    queryset = models.UserReviewState.objects.all()
    serializer_class = serializers.UserReviewStateSerializer


class TypeInscriptionListApiView(generics.ListAPIView):
    queryset = models.TypeInscription.objects.all()
    serializer_class = serializers.TypeInscriptionSerializer

class UserInscriptionView(APIView):

    #Get from multipart form 
    parser_classes = [MultiPartParser]

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

    def post(self, request, format=None):

        inscription = serializers.UserInscriptionSerializer(data=request.data)

        #Validate data
        if inscription.is_valid():

            #Validate a user with the same document numeber, mobile or email doesn't already exists

            if models.UserProfile.objects.filter(email=inscription.data['email']).exists():
                removeuser = models.UserProfile.objects.get(email=request.data['email'])

                if removeuser.is_free:
                   removeuser.delete()
                else:
                    return Response("Correo ya inscrito.", status=status.HTTP_400_BAD_REQUEST)
            
            if "phone_number" in inscription.data and models.UserProfile.objects.filter(mobile=inscription.data['phone_number']).exists():
                return Response("Celular ya inscrito.", status=status.HTTP_400_BAD_REQUEST)
            
            if "document_number" in inscription.data and models.UserProfile.objects.filter(document_number=inscription.data['document_number']).exists():
                return Response("Número de documento ya inscrito.", status=status.HTTP_400_BAD_REQUEST)

            if "ruc" in inscription.data and models.CorporateGroup.objects.filter(ruc=inscription.data['ruc']).exists():
                return Response("Ruc ya inscrito.", status=status.HTTP_400_BAD_REQUEST)

            
            type_inscription = get_object_or_404(models.TypeInscription,pk=inscription.data['inscription_id'])
            
            new_user = models.UserProfile(
                email = inscription.data['email'],
                first_name = inscription.data['name'],
                last_name = inscription.data['last_name'],
                company = inscription.data['company_name'],
                country = inscription.data['country'],
                publicity = inscription.data['publicity'],       
            )

            if "phone_number" in inscription.data:
                new_user.mobile = inscription.data['phone_number']

            if "job" in inscription.data:
                new_user.job_title = inscription.data["job"]

            amount = getAmount(type_inscription.payment_usd,inscription.data['currency'])

            description = ""
            try:
                description = inscription.data["document_number"] + " inscription"
            except:
                description = inscription.data["ruc"] + " inscription"

            dir_charge = {"amount":amount,"currency_code": inscription.data['currency'],
                "description":description,
                "email":inscription.data["email"] ,
                "source_id": inscription.data["token"]}

            b2b = Group.objects.get(name="Rueda de Negocios")
            sala_plenaria = Group.objects.get(name="Sala Plenaria")
            chat = Group.objects.get(name="Chat Networking")
            corporativo = Group.objects.get(name="Admin Corporativo")

            
            if type_inscription.spanish_name == "Corporativo":

                if "ruc" not in inscription.data:
                    return Response("ruc is required", status=status.HTTP_400_BAD_REQUEST)
                
                if "number_participants" not in inscription.data:
                    return Response("number_participants is required", status=status.HTTP_400_BAD_REQUEST)

                dir_charge["amount"] = dir_charge["amount"] * inscription.data['number_participants']

                response = culqi.charge.create(dir_charge)
                if response["status"] == 201: 

                    new_user.feria3d = False
                    password = models.UserProfile.objects.make_random_password()
                    new_user.set_password(password)
                    new_user.save()

                    new_user.groups.add(corporativo)
                    new_user.save()

                    new_corporate_group = models.CorporateGroup(
                        ruc = inscription.data['ruc'],
                        company_name = inscription.data['company_name'],
                        max_num_users_inscribed = inscription.data['number_participants'],
                        admin = new_user,
                    )

                    new_corporate_group.save()

                    new_corporate_group_payment = models.CorporateGroupPayment(
                        token = inscription.data["token"],
                        number_participants = inscription.data['number_participants'],
                        corporate_group = new_corporate_group,
                        amount = round(dir_charge["amount"], 2),
                        currency = inscription.data['currency'],
                    )

                    new_corporate_group_payment.save()

                    if not self.sendCredentials(new_user, password,inscription.data["language"]):
                        return Response("El registro fue exitoso, hubo un error en el envio de credenciales.",status=status.HTTP_502_BAD_GATEWAY)                       

                    return Response("Registro exitoso", status=status.HTTP_201_CREATED )
                
                else:
                    return Response(response["data"]["user_message"], status=response["status"] )
            
            #add fields corporate doesn´t have

            document_type = get_object_or_404(models.DocumentType,pk=inscription.data['document_type'])
            new_user.document_type = document_type
            new_user.document_number = inscription.data['document_number']
            new_user.user_type = type_inscription.user_type
            
            

            if type_inscription.spanish_name == "Estudiante" or type_inscription.spanish_name == "Docente":

                if "evidence" not in request.data:
                    return Response("evidence es un campo requerido", status=status.HTTP_400_BAD_REQUEST)
                
                new_user.evidence_image=request.data["evidence"]
                new_user.user_review_state = getReviewState("Revisar")
             
            password = models.UserProfile.objects.make_random_password()
            new_user.set_password(password)

            try:
                new_user.save()
            except:
                return Response("Hubo un error con la conexión, vuelva a intentar más tarde.",status=status.HTTP_504_GATEWAY_TIMEOUT)
            response = culqi.charge.create(dir_charge)
            if response["status"] == 201: 
                

                new_inscription = models.Inscription(
                    type=type_inscription,
                    token_id=inscription.data["token"],
                    user=new_user,
                )
                new_inscription.save()

                new_user.groups.add(sala_plenaria,chat)
                new_user.save()

                if type_inscription.spanish_name == "Empresarial Internacional":
                    new_user.groups.add(b2b)
                    new_user.save()

                if not self.sendCredentials(new_user, password,inscription.data["language"]):
                        return Response("El registro fue exitoso, hubo un error en el envio de credenciales.",status=status.HTTP_502_BAD_GATEWAY)    
                 
                return Response("Registro exitoso", status=status.HTTP_201_CREATED )

            else:
                new_user.delete()
                return Response(response["data"]["user_message"], status=response["status"] )
                 
        else:
            return Response(inscription.errors, status=status.HTTP_400_BAD_REQUEST) 

class RestorePasswordApiView(APIView):

    def sendRestore(self, user, password, language):

        body = {}

        if language == 'es':
            body = copy.deepcopy(settings.SPANISH_RESTORE_EMAIL)

        else:
            body = copy.deepcopy(settings.ENGLISH_RESTORE_EMAIL)

        body["template_params"]["nombre"] = user.get_full_name()
        body["template_params"]["contrasenia"] = password
        body["template_params"]["email"] = user.email

        try:
            response = requests.post(settings.END_POINT_EMAIL,json=body)

            return True
        except requests.exceptions.HTTPError as err:
            return False

    def post(self, request):

        user_restore = serializers.RestorePasswordSerializer(data=request.data)

        #Validate data
        if user_restore.is_valid():

            #Validate a user with the same document numeber, mobile or email doesn't already exists
            user = models.UserProfile.objects.filter(email=user_restore.data['email']).get()

            if models.UserProfile.objects.filter(email=user_restore.data['email']).exists():
                password = models.UserProfile.objects.make_random_password()
                user.set_password(password)
                user.save()
                if not self.sendRestore(user, password,'es'):
                        return Response(False,status=status.HTTP_502_BAD_GATEWAY)    
                 
                return Response(True, status=status.HTTP_200_OK )
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST )

        else:
            return Response(user_restore.errors, status=status.HTTP_400_BAD_REQUEST) 

class FreeLogin(APIView):
    def post(self, request, format=None):

        if models.UserProfile.objects.filter(email=request.data['email']).exists():
            user = models.UserProfile.objects.get(email=request.data['email']) 
            response = {
                'is_free': user.is_free,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email' : user.email,
            }
            if user.is_free:
                return Response(response, status=status.HTTP_200_OK )

            return Response("Usuario ya cuenta con un plan", status=status.HTTP_400_BAD_REQUEST )
        
        return Response("Correo no existe.", status=status.HTTP_400_BAD_REQUEST)


class FreeRegister(APIView):

    #Get from multipart form 
    #parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        free_register = serializers.FreeUserSerializer(data=request.data)
        if free_register.is_valid():
            if models.UserProfile.objects.filter(email=free_register.data['email']).exists():
                    return Response("Correo ya inscrito.", status=status.HTTP_400_BAD_REQUEST)

            new_user = models.UserProfile(
                    email = free_register.data['email'],
                    first_name = free_register.data['name'],
                    last_name = free_register.data['last_name'],
                    is_free = True     
                )
            if "mobile" in free_register.data:
                new_user.mobile = free_register.data['mobile']
            response = {
                'is_free': new_user.is_free,
                'first_name': new_user.first_name,
                'last_name': new_user.last_name,
                'email' : new_user.email,
            }
            new_user.save()
            return Response(response, status=status.HTTP_201_CREATED )

        else:
            return Response(free_register.errors, status=status.HTTP_400_BAD_REQUEST) 