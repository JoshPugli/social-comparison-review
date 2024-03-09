from django.shortcuts import render
from django.core.cache import cache
from sentence_transformers import SentenceTransformer
from backend.app.utils import load_model_into_cache, __get_model
from django.http import JsonResponse
from .utils import __get_data, __get_model
