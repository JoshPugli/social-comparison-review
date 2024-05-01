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
            try:
                curr_situation = serializer.validated_data["curr_situation"]
                curr_thought = serializer.validated_data["curr_thought"]
                distortions, label_probabilities = generate_distortions(
                    curr_situation, curr_thought
                )
                print("Distortions: ", distortions, "Label Probabilities: ", label_probabilities)
                return Response(
                    {
                        "distortions": distortions,
                        "label_probabilities": label_probabilities,
                    },
                    status=status.HTTP_200_OK,
                )
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST,
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
            new_reframe = new_reframe.strip()
            
            if new_reframe[0] == '"' or new_reframe[-1] == '"':
                new_reframe = new_reframe[1:]
            if new_reframe[-1] == "'" or new_reframe[-1] == '"':
                new_reframe = new_reframe[:-1]

            return Response(
                {"new_reframe": new_reframe},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
