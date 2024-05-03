from django.urls import path
from .views import GetDistortionsView, GetReframeView, UpdateReframeView, SubmissionView

urlpatterns = [
    path("distortions/", GetDistortionsView.as_view(), name="distortions"),
    path("reframes/", GetReframeView.as_view(), name="reframes"),
    path("update-reframe/", UpdateReframeView.as_view(), name="update-reframe"),
    path("submission/", SubmissionView.as_view(), name="submission"),
]