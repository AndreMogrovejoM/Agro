from core.serializers import PathSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .countries import countries, paises
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class CountryApiView(APIView):

    def get(self,request,format=None):
        return Response(countries,status.HTTP_200_OK)

class PaisApiView(APIView):

    def get(self,request,format=None):
        return Response(paises,status.HTTP_200_OK)


class PathApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request,format=None):
        user = request.user

        paths = []

        for group in user.groups.all():
            data = PathSerializer(group.paths.all(),many=True)
            paths.extend(data.data)

        return Response(paths,status.HTTP_200_OK)

