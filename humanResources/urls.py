from django.urls import path, include
from .views import *


urlpatterns = [ 
    path('user_documents/', UserProfileDocumentsListApiView.as_view()),
    path('user_documents/<int:pk>/', UserProfileViewDocumentsDetailApiView.as_view()),
    path('user_review_state/', UserReviewStateApiView.as_view()),
    path('users_group_chat/', UserGroupChatListApiView.as_view()),
    path('billing/corporate_group/<int:pk>/', CorporateGroupPaymentAdminApiView.as_view()),
    path('billing/corporate_group/', CorporateGroupAdmin.as_view()),
    path('corporate_group/', CorporateGroupApiView.as_view()),
    path('corporate_group/user/<int:pk>/', CorporateGroupUserApiView.as_view()),
    path('corporate_group/buy_passes/', CorporateGroupPaymentApiView.as_view()),
    path('users/', UsersApiView.as_view()),
    path('users/<int:pk>/', UsersDetailApiView.as_view()),
    path('guests/list/', GuestsListApiView.as_view()),
    path('vip_guests/list/', VipGuestsListApiView.as_view()),
    path('exhibitors/list/', ExhibitorsListApiView.as_view()),
    path('assign_stands/<int:pk>/',AssignStandsListAPIView.as_view()),
    path('remove_stands/<int:pk>/',RemoveStandsListAPIView.as_view()),
    path('exhibitor/groups/', ExhibitorGroupsListApiView.as_view()),
    path('assigned_stands/', AssignedStands.as_view()),
]

