from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status
from .utils import generate_distortions, generate_reframes, update_reframe
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    SituationThoughtSerializer,
    SituationThoughtDistortionSerializer,
    UpdateReframeSerializer,
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
        serializer = SituationThoughtDistortionSerializer(data=request.data)
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


class UpdateReframeView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UpdateReframeSerializer(data=request.data)
        if serializer.is_valid():
            curr_situation = serializer.validated_data["curr_situation"]
            curr_thought = serializer.validated_data["curr_thought"]
            distortions = serializer.validated_data["distortions"]
            current_reframe = serializer.validated_data["current_reframe"]
            user_request = serializer.validated_data["user_request"]

            new_reframe = update_reframe(
                curr_situation, curr_thought, distortions, current_reframe, user_request
            )

            return Response(
                {"new_reframe": new_reframe},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
