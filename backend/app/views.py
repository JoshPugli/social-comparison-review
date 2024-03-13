from django.shortcuts import render
from django.core.cache import cache
from sentence_transformers import SentenceTransformer
from django.http import JsonResponse
from rest_framework import status
from .utils import generate_distortions  # Import your utility function
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SituationThoughtSerializer


class GetDistortionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SituationThoughtSerializer(data=request.data)
        if serializer.is_valid():
            curr_situation = serializer.validated_data["curr_situation"]
            curr_thought = serializer.validated_data["curr_thought"]
            distortions = generate_distortions(curr_situation, curr_thought)
            return Response(
                {"distortions": distortions},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
