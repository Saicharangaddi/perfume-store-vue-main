from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None and user.is_staff:
            return Response({"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({"success": True, "username": user.username})
        return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)
