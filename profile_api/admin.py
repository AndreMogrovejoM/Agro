from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.db.models import fields
from profile_api.models import *

user_fields = ('document_type','document_number', 'email',
        'mobile','job_title','company','country','feria3d','user_type',
        'user_review_state','evidence_image','publicity',
        'creation_date','first_name','last_name','is_staff','is_active',
        'password','groups')

class UserProfileAdmin(UserAdmin):
    list_display = ('email',)
    ordering = ('email',)
    fieldsets =  (
        (None, {'fields': user_fields}),
    )
    add_fieldsets = (
        (None, {'fields': user_fields}),
    )


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(CorporateGroupPayment)
admin.site.register(UserType)
admin.site.register(TypeInscription)
admin.site.register(Inscription)
admin.site.register(DocumentType)
admin.site.register(UserReviewState)
admin.site.register(CorporateGroup)
admin.site.register(CorporateUserInscribed)