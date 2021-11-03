from django.urls import path, include
from .views import *


urlpatterns = [ 
    path('countries/', CountryApiView.as_view()),
    path('paises/', PaisApiView.as_view()),
    path('paths/', PathApiView.as_view()),
]
