from rest_framework import permissions

class OwnStand(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.admin.id == request.user.id

class OwnStandResource(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):

        return obj.stand.admin.id == request.user.id