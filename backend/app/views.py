from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status
from .utils import generate_distortions, generate_reframes, update_reframe
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Submission
from .serializers import (
    SituationThoughtSerializer,
    SituationThoughtDistortionSerializer,
    UpdateReframeSerializer,
    FinalSubmissionSerializer
)

class SubmissionView(APIView):
    def post(self, request, *args, **kwargs):
        if "distortions" in request.data:
            distortions = request.data["distortions"]
            distortions = ", ".join(distortions)
            request.data["distortions"] = distortions
            
        serializer = FinalSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            thought = serializer.validated_data["thought"]
            beliefRating = serializer.validated_data["beliefRating"]
            emotion = serializer.validated_data["emotion"]
            emotionIntensity = serializer.validated_data["emotionIntensity"]
            situation = serializer.validated_data["situation"]
            distortions = serializer.validated_data["distortions"]
            initialReframe = serializer.validated_data["initialReframe"]
            finalReframe = serializer.validated_data["finalReframe"]
            user_id = serializer.validated_data["user_id"]
            
            submission = Submission.objects.create(
                id=user_id,
                thought=thought,
                beliefRating=beliefRating,
                emotion=emotion,
                emotionIntensity=emotionIntensity,
                situation=situation,
                distortions=distortions,
                initialReframe=initialReframe,
                finalReframe=finalReframe,
            )
            
            return Response(
                {"submission": "Submission successful"},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetDistortionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SituationThoughtSerializer(data=request.data)
        if serializer.is_valid():
            try:
                curr_situation = serializer.validated_data["curr_situation"]
                curr_thought = serializer.validated_data["curr_thought"]
                distortions = generate_distortions(
                    curr_situation, curr_thought
                )
                print("Distortions: ", distortions)
                return Response(
                    {
                        "distortions": distortions,
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
