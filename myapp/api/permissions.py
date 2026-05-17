from rest_framework.permissions import BasePermission


class DeleteOnlyOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method == "DELETE":
            return obj.owner == request.user
        else:
            return True