from django.urls import path, include
from rest_framework.routers import DefaultRouter
from profile_api import views

router = DefaultRouter()
router.register('', views.UserProfileViewSet)


urlpatterns = [ 
    #path('login/', views.UserLoginApiView.as_view()),
    #path('', include(router.urls)),
    path('login/', views.MyTokenObtainPairView.as_view()),
    path('', views.OwnApiView.as_view()),
    path('image/', views.UserProfileImageAPIView.as_view()),
    path('password_update/', views.UserProfilePasswordAPIView.as_view()),
    path('inscription/', views.UserInscriptionView.as_view()),
    path('free_login/', views.FreeLogin.as_view()),
    path('free_register/', views.FreeRegister.as_view()),
    path('document_types/', views.DocumentTypeListApiView.as_view()),
    path('inscription_types/', views.TypeInscriptionListApiView.as_view()),
    path('user_review_states/', views.UserReviewStateListApiView.as_view()),
    path('restore_password/', views.RestorePasswordApiView.as_view()),
]
