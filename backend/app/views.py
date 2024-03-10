from django.shortcuts import render
from django.core.cache import cache
from sentence_transformers import SentenceTransformer
from django.http import JsonResponse
from rest_framework import status
from .utils import get_top_k_matches  # Import your utility function
from rest_framework.views import APIView
from rest_framework.response import Response
from serializers import TopKSerializer


class TopKDistortionsView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TopKSerializer(data=request.data)

        if serializer.is_valid():
            curr_situation, curr_thought, K = (
                serializer.validated_data["curr_situation"],
                serializer.validated_data["curr_thought"],
                serializer.validated_data.get("K", 5),
            )

            matches_df = get_top_k_matches(curr_situation, curr_thought, K)

            # Convert DataFrame to JSON (ensure your DataFrame is in a format that can be easily converted to JSON)
            matches_json = matches_df.to_json(orient="records")

            return Response({"matches": matches_json}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
