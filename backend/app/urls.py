from django.urls import path
from views import GetDistortionsView

urlpatterns = [
    path("distortions/", GetDistortionsView.as_view(), name="distortions"),
]