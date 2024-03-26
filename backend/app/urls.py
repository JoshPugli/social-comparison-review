from django.urls import path
from .views import GetDistortionsView, GetReframeView

urlpatterns = [
    path("distortions/", GetDistortionsView.as_view(), name="distortions"),
    path("reframes/", GetReframeView.as_view(), name="reframes")
]