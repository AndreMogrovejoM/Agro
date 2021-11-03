from rest_framework import permissions
import copy

class CustomDjangoModelPermission(permissions.DjangoModelPermissions):

    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map) 
        self.perms_map['GET'] = ['%(app_label)s.view_%(model_name)s']

class OwnStand(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.admin.id == request.user.id