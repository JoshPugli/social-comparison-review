from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status
from .utils import generate_distortions, generate_reframes
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    SituationThoughtSerializer,
    SituationThoughtDistortionSerializer,
)


class GetDistortionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SituationThoughtSerializer(data=request.data)
        if serializer.is_valid():
            curr_situation = serializer.validated_data["curr_situation"]
            curr_thought = serializer.validated_data["curr_thought"]
            distortions = generate_distortions(curr_situation, curr_thought)
            if distortions == "OPENAI_API_KEY not set.":
                return Response(
                    {"error": "OPENAI_API_KEY not set."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            else:
                return Response(
                    {"distortions": distortions},
                    status=status.HTTP_200_OK,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetReframeView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SituationThoughtSerializer(data=request.data)
        if serializer.is_valid():
            curr_situation = serializer.validated_data["curr_situation"]
            curr_thought = serializer.validated_data["curr_thought"]
            distortions = serializer.validated_data["distortions"]

            reframes = generate_reframes(curr_situation, curr_thought, distortions)

            return Response(
                {"reframes": reframes},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
