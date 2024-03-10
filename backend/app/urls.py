from django.urls import path
from views import TopKDistortionsView

urlpatterns = [
    path("distortions/", TopKDistortionsView.as_view(), name="top-k-distortions"),
]