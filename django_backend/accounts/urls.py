from django.urls import path
from .views import AdminLoginView, UserLoginView


urlpatterns = [
    path("api/admin/login/", AdminLoginView.as_view()),
    path("login/", UserLoginView.as_view()),
]