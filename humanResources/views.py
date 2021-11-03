from django.db.models import query
from django.db.models.fields import NullBooleanField
from django.utils.translation import check_for_language
from rest_framework import generics, status
from .permissions import CustomDjangoModelPermission, OwnStand
from rest_framework.permissions import IsAuthenticated
from profile_api.models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from profile_api.serializers import UserProfileSerializer
from culqi.client import Culqi
from django.conf import settings
import requests
import copy

from django.db.models import Q
from django.contrib.auth.models import Group
from fair3D.models import Stand, StandType
from .serializers import StandSerializer





culqi = Culqi(public_key=settings.CULQI_PUBLIC, private_key=settings.CULQI_PRIVATE)

b2b = Group.objects.get(name="Rueda de Negocios")
sala_plenaria = Group.objects.get(name="Sala Plenaria")
chat = Group.objects.get(name="Chat Networking")
exhibidor = Group.objects.get(name="Exhibidor")
colaborador_jr = Group.objects.get(name="Colaborador Jr")
colaborador = Group.objects.get(name="Colaborador")
auspiciador = Group.objects.get(name="Auspiciador")
patrocinador = Group.objects.get(name="Patrocinador")
periodista = Group.objects.get(name="Periodista")



def getAmount(currency, num_participants):
    payment = TypeInscription.objects.get(spanish_name = "Corporativo").payment_usd
    payment *= num_participants
    if currency == 'PEN':
        payment *= settings.DOLLAR_CHANGE
    return int(payment)

def getParticipantTypeUser(name):
    return UserType.objects.get(name=name)

def sendCredentials(user, password):

        body = copy.deepcopy(settings.SPANISH_CREDENTIALS_EMAIL)

        body["template_params"]["nombre"] = user.get_full_name()
        body["template_params"]["contrasenia"] = password
        body["template_params"]["email"] = user.email

        try:
            response = requests.post(settings.END_POINT_EMAIL,json=body)
            return True
        except requests.exceptions.HTTPError as err:
            return False


class UserProfileViewDocumentsDetailApiView(generics.RetrieveAPIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileViewDocumentsDetailSerializer

class UserProfileDocumentsListApiView(generics.ListAPIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.filter(user_review_state__isnull=False).order_by('user_type')
    serializer_class = UserProfileViewDocumentsSerializer

class UserReviewStateApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.filter(user_review_state__isnull=False)

    def put(self, request, format=None):
        serializer = UpdateReviewStateSerializer(data=request.data)
        if serializer.is_valid():

            user = get_object_or_404(UserProfile,pk=serializer.data['user_id'])
            state = get_object_or_404(UserReviewState,pk=serializer.data['review_id'])
            user.user_review_state = state
            user.save()
            return Response("Estado actualizado.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserReviewStateApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.filter(user_review_state__isnull=False)

    def put(self, request, format=None):
        serializer = UpdateReviewStateSerializer(data=request.data)
        if serializer.is_valid():

            user = get_object_or_404(UserProfile,pk=serializer.data['user_id'])
            state = get_object_or_404(UserReviewState,pk=serializer.data['review_id'])
            user.user_review_state = state
            user.save()
            return Response("Estado actualizado.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserGroupChatListApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.all()#filter(groups__name__in=['Chat Networking'])   
    def get(self,request,format=None):
        user = request.user
        usuarios_chat = UserProfile.objects.filter(groups__name='Chat Networking').exclude(email=user)
        response = {
            "usuarios_chat" : UserProfileSerializer(usuarios_chat,many=True).data,
        }
 
        return Response(response,status.HTTP_200_OK)

class CorporateGroupApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        user = request.user
        corporate_group = get_object_or_404(CorporateGroup, admin=user)

        corporate_group_serializer = CorporateGroupSerializer(corporate_group)
        response = corporate_group_serializer.data

        participants = CorporateUserInscribed.objects.filter(corporate_group=corporate_group)
        participants_serializer = CorporateUserInscribedSerializer(participants,many=True)
        response["participants"] = participants_serializer.data


        return Response(response,status=status.HTTP_200_OK)

    def post(self, request, format=None):

        user = request.user
        corporate_group = get_object_or_404(CorporateGroup, admin=user)
        if(corporate_group.participants.all().count() >= corporate_group.max_num_users_inscribed):
            return Response({"error":"Ya llego al límite de participantes."},status=status.HTTP_400_BAD_REQUEST)

        participant = UserProfileSerializer(data=request.data)

        if participant.is_valid(): 
            participant.country = user.country 
            participant.company = user.company

            new_user = participant.save()

            password = models.UserProfile.objects.make_random_password()

            new_user.set_password(password)
            new_user.user_type = getParticipantTypeUser("Participante")
            new_user.groups.add(sala_plenaria,chat)

            new_user.save()

            inscription = CorporateUserInscribed(
                user=new_user,
                corporate_group=corporate_group
            )
            inscription.save()

            if not sendCredentials(new_user,password):
                return Response("El participante se registro, hubo un error en el envio de credenciales.",status=status.HTTP_502_BAD_GATEWAY)

            return Response("Participante registrado.",status=status.HTTP_201_CREATED)

        return Response(participant.errors,status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):

        user = request.user

        corporate_group = get_object_or_404(CorporateGroup, admin=user)

        if(corporate_group.participants.all().count() >= corporate_group.max_num_users_inscribed):
            return Response("Ya llego al límite de participantes.",status=status.HTTP_400_BAD_REQUEST)

        serializer = CorporateUserAdminSerializer(data=request.data)

        if serializer.is_valid():
            
            document_type = get_object_or_404(DocumentType, pk=serializer.data["document_type"])

            user.document_type = document_type
            user.document_number = serializer.data["document_number"]
            user.job_title = serializer.data["job_title"]
            user.feria3d = True
            user.user_type = getParticipantTypeUser("Participante")
            user.groups.add(sala_plenaria,chat)
            user.save()

            inscription = CorporateUserInscribed(
                    user=user,
                    corporate_group=corporate_group
                )
            inscription.save()


            return Response("Participante registrado.",status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class CorporateGroupUserApiView(APIView):

    permission_classes = [IsAuthenticated]

    def getParticipant(self, user, pk):
        corporate_group = get_object_or_404(CorporateGroup, admin=user)
        participant = get_object_or_404(UserProfile, pk=pk)
        corporate_user = get_object_or_404(CorporateUserInscribed,user=participant, corporate_group=corporate_group)

        return participant, corporate_user

    def get(self, request, pk, format=None):

        participant, corporate_user = self.getParticipant(request.user,pk)
        participant_serializer = UserProfileSerializer(participant)

        return Response(participant_serializer.data,status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):

        participant, corporate_user = self.getParticipant(request.user,pk)
        participant_serializer = UserProfileSerializer(participant, data=request.data)

        if participant_serializer.is_valid():    
            participant_serializer.save()
            return Response(participant_serializer.data,status=status.HTTP_200_OK)

        return Response(participant_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):

        participant, corporate_user = self.getParticipant(request.user,pk)

        if participant == request.user:

            participant.feria3d = False
            participant.user_type = None
            participant.save()
            corporate_user.delete()

        else:
            participant.delete()

        return Response("Participante eliminado.",status=status.HTTP_204_NO_CONTENT)


class CorporateGroupAdmin(generics.ListAPIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = CorporateGroup.objects.filter(payments__isnull=False)
    serializer_class = CorporateGroupSerializer



class CorporateGroupPaymentAdminApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = CorporateGroupPayment.objects.all()

    def get(self,request,pk,format=None):
        corporate_group = get_object_or_404(CorporateGroup, pk=pk)
        payments = CorporateGroupPaymentSerializer(corporate_group.payments.all(),many=True)
        response = CorporateGroupSerializer(corporate_group).data
        response["payments"] = payments.data
        return Response(response,status=status.HTTP_200_OK)




class CorporateGroupPaymentApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):

        user = request.user
        corporate_group = get_object_or_404(CorporateGroup, admin=user)

        payment_serializer = CorporateGroupBuyPassesSerializer(data=request.data)

        if (payment_serializer.is_valid()):

            currency = payment_serializer.data['currency']
            description = corporate_group.company_name + " inscription"

            dir_charge = {"amount":getAmount(currency,payment_serializer.data['number_participants']),"currency_code":currency,
                "description":description,
                "email":user.email ,
                "source_id": payment_serializer.data["token"]}

            response = culqi.charge.create(dir_charge)
            if response["status"] == 201: 
                new_corporate_group_payment = models.CorporateGroupPayment(
                                token = payment_serializer.data["token"],
                                number_participants = payment_serializer.data['number_participants'],
                                corporate_group = corporate_group,
                                amount = round(dir_charge["amount"], 2),
                                currency = payment_serializer.data['currency'],
                )

                new_corporate_group_payment.save()

                corporate_group.max_num_users_inscribed = corporate_group.max_num_users_inscribed + payment_serializer.data['number_participants']
                corporate_group.save()

                corporate_group_serializer = CorporateGroupSerializer(corporate_group)

                return Response(corporate_group_serializer.data,status=status.HTTP_200_OK)
            
            else:
             
                return Response(response["data"]["user_message"], status=response["status"] )
        
        return Response(payment_serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class UsersApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.all()

    def post(self,request,format=None):

        user = UserProfileSerializer(data=request.data)


        if user.is_valid():

            user = user.save()

            if (request.data["tipo"] == "Invitado"):
                user.user_type = getParticipantTypeUser(request.data["tipo"])
                user.groups.add(sala_plenaria)
            
            elif(request.data["tipo"] == "Invitado Vip"):
                user.user_type = getParticipantTypeUser(request.data["tipo"])
                user.groups.add(sala_plenaria,b2b,chat)
            
            elif(request.data["tipo"] == "Exhibidor"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 0,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(exhibidor)

            elif(request.data["tipo"] == "Colaborador"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 15,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(colaborador)

            elif(request.data["tipo"] == "Colaborador Jr"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 5,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(colaborador_jr)
            
            elif(request.data["tipo"] == "Auspiciador"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 25,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(auspiciador)

            elif(request.data["tipo"] == "Patrocinador"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 35,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(patrocinador)

            elif(request.data["tipo"] == "Periodista"):
                user.feria3d = False
                new_corporate_group = CorporateGroup(
                    ruc = user.ruc,
                    company_name = user.company,
                    max_num_users_inscribed = 0,
                    admin = user,
                )
                new_corporate_group.save()
                user.groups.add(periodista)

            else:
                user.delete()
                return Response({"error":"Tipo inválido."},status.HTTP_400_BAD_REQUEST)
            
            password = models.UserProfile.objects.make_random_password()
            user.set_password(password)
            user.save()

            sendCredentials(user,password)

            return Response(status=status.HTTP_201_CREATED)

        return Response(user.errors,status=status.HTTP_400_BAD_REQUEST)

class ExhibitorGroupsListApiView(generics.ListAPIView):
    queryset = Group.objects.filter(name__in=settings.EXHIBITORS)
    serializer_class = GroupSerializer

class UsersDetailApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.all()

    def get(self, request, pk, format=None):

        participant = get_object_or_404(UserProfile,pk=pk)
        participant_serializer = UserProfileSerializer(participant)

        return Response(participant_serializer.data,status=status.HTTP_200_OK)


    def put(self, request, pk, format=None):

        participant = get_object_or_404(UserProfile,pk=pk)
        participant_serializer = UserProfileSerializer(participant, data=request.data)

        if participant_serializer.is_valid():    
            participant_serializer.save()
            return Response(participant_serializer.data,status=status.HTTP_200_OK)

        return Response(participant_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):

        participant = get_object_or_404(UserProfile,pk=pk)
        participant.delete()

        return Response("Participante eliminado.",status=status.HTTP_204_NO_CONTENT)


class GuestsListApiView(generics.ListAPIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.filter(user_type=getParticipantTypeUser("Invitado"))
    serializer_class = UserProfileSerializer


class VipGuestsListApiView(generics.ListAPIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.filter(user_type=getParticipantTypeUser("Invitado Vip"))
    serializer_class = UserProfileSerializer


class ExhibitorsListApiView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = UserProfile.objects.all()#filter(groups__name__in=['Exhibidor','Patrocinador','Auspiciador','Colaborador','Colaborador Jr', 'Periodista])   

    def get(self,request,format=None):
        exhibidores = UserProfile.objects.filter(groups__name='Exhibidor')
        colaboradores = UserProfile.objects.filter(groups__name='Colaborador')
        colaboradores_jr = UserProfile.objects.filter(groups__name='Colaborador Jr')
        auspiciadores = UserProfile.objects.filter(groups__name='Auspiciador')
        patrocinadores = UserProfile.objects.filter(groups__name='Patrocinador')
        periodistas = UserProfile.objects.filter(groups__name='Periodista')
        
        response = {
            "exhibidores" : UserProfileSerializer(exhibidores,many=True).data,
            "colaboradores_jr" : UserProfileSerializer(colaboradores_jr,many=True).data,
            "colaboradores" : UserProfileSerializer(colaboradores,many=True).data,
            "auspiciadores" : UserProfileSerializer(auspiciadores,many=True).data,
            "patrocinadores" : UserProfileSerializer(patrocinadores,many=True).data,
            "periodistas" : UserProfileSerializer(periodistas,many=True).data,
        }
    
        return Response(response,status.HTTP_200_OK)



    

        
class AssignStandsListAPIView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = Stand.objects.all()

    def get(self,request,pk,format=None):
        user = get_object_or_404(UserProfile, pk=pk)
        available_stands = Stand.objects.filter(admin__isnull=True).order_by('id')

        a_type = StandType.objects.get(name='A')
        b_type = StandType.objects.filter(name='B')
        c_type = StandType.objects.get(name='C')
        prensa_type = StandType.objects.get(name="Prensa")


        if user.groups.filter(name="Patrocinador"):
            available_stands = available_stands.filter(type=c_type)    

        elif user.groups.filter(name="Auspiciador"):
            available_stands = available_stands.filter(type__in=b_type)  

        elif user.groups.filter(name="Colaborador"):
            available_stands = available_stands.filter(type=a_type)  

        elif user.groups.filter(name="Colaborador Jr"):
            available_stands =  Stand.objects.none()

        elif user.groups.filter(name="Periodista"):
            available_stands =  available_stands.filter(type=prensa_type)   


        available = StandSerializer(available_stands,many=True)
        assigned_stands = Stand.objects.filter(admin=user)
        assigned = StandSerializer(assigned_stands,many=True)

        response = {
            "assigned" : assigned.data,
            "available" : available.data
        }
        return Response(response,status.HTTP_200_OK)

    def put(self,request,pk,format=None):
        if "stand_id" not in request.data:
            return(status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(UserProfile, pk=pk)
        stand = get_object_or_404(Stand,pk=request.data["stand_id"])
        stand.admin = user
        stand.save()

        if user.groups.filter(name="Exhibidor"):
            corporate_group = CorporateGroup.objects.get(admin=user)
            corporate_group.max_num_users_inscribed += stand.type.num_participants
            corporate_group.save()

        return Response(status.HTTP_200_OK)

class RemoveStandsListAPIView(APIView):
    permission_classes = [CustomDjangoModelPermission]
    queryset = Stand.objects.all()

    def put(self,request,pk,format=None):
        if "stand_id" not in request.data:
            return(status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(UserProfile, pk=pk)
        stand = get_object_or_404(Stand,pk=request.data["stand_id"])
        stand.admin = None
        stand.save()

        if user.groups.filter(name="Exhibidor"):
            corporate_group = CorporateGroup.objects.get(admin=user)
            corporate_group.max_num_users_inscribed -= stand.type.num_participants
            corporate_group.save()

        return Response(status.HTTP_200_OK)

class AssignedStands(APIView):
    permission_classes = [OwnStand]
    queryset = Stand.objects.all()

    def get(self,request,format=None):
        assigned_stands = Stand.objects.filter(admin=request.user)
        assigned = StandSerializer(assigned_stands,many=True)

        response = {
            "stands" : assigned.data
        }

        return Response(response,status.HTTP_200_OK)




        
        
        
