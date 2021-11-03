from django.urls import path, include
from .views import *

urlpatterns = [ 
    path('stands/', StandListApiView.as_view()),
    path('staff/', StaffCreateUpdateApiView.as_view()),
    path('staff/list/<int:pk>/', StaffListApiView.as_view()),
    path('staff/<int:pk>/', StaffCreateUpdateApiView.as_view()),
    path('configure_stand/<int:pk>/', ConfigureStandApiView.as_view()),
    path('detail_stand/<int:pk>/', StandDetailApiView.as_view()),
    path('pdf/', PdfCreateApiView.as_view()),
    path('pdf/list/<int:pk>/', PdfListApiView.as_view()),
    path('pdf/<int:pk>/', PdfRetrieveUpdateDestroyApiView.as_view()),
    path('excel/', ExcelCreateApiView.as_view()),
    path('excel/list/<int:pk>/', ExcelListApiView.as_view()),
    path('excel/<int:pk>/', ExcelRetrieveUpdateDestroyApiView.as_view()),
    path('image/', ImageCreateApiView.as_view()),
    path('image/list/<int:pk>/', ImageListApiView.as_view()),
    path('image/<int:pk>/', ImageRetrieveUpdateDestroyApiView.as_view()),
]
