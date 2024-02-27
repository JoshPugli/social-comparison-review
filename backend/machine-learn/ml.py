import os
import pandas as pd
import numpy as np
from random import shuffle
import time
import argparse
from random import shuffle
from tqdm import tqdm
import torch
from sentence_transformers import SentenceTransformer, util
from dotenv import load_dotenv
from transformers import (
    BertTokenizer,
    BertModel,
    BertConfig,
    AutoModelForSequenceClassification,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
)
from torch.utils.data import Dataset, DataLoader
from sklearn.metrics import f1_score, accuracy_score


if os.environ.get("ENV") != "production":
    load_dotenv()

DISTORTIONS = [
    {
        "Filtering": {
            "Definitions": [
                "Mental filtering is draining and straining all positives in a situation and, instead, dwelling on its negatives.",
                "Even if there are more positive aspects than negative in a situation or person, you focus on the negatives exclusively.",
            ],
            "Examples": [
                "It’s performance review time at your company, and your manager compliments your hard work several times. In the end, they make one improvement suggestion. You leave the meeting feeling miserable and dwell on that one suggestion all day long."
            ],
        }
    },
    {"All-or-nothing thinking": {"Definitions": [], "Examples": []}},
    {"Overgeneralization": {"Definitions": [], "Examples": []}},
    {"Discounting the positive": {"Definitions": [], "Examples": []}},
    {"Jumping to conclusions": {"Definitions": [], "Examples": []}},
    {"Catastrophizing": {"Definitions": [], "Examples": []}},
    {"Personalization": {"Definitions": [], "Examples": []}},
    {"Control fallacies": {"Definitions": [], "Examples": []}},
    {"Fallacy of fairness": {"Definitions": [], "Examples": []}},
    {"Blaming": {"Definitions": [], "Examples": []}},
    {"Shoulds": {"Definitions": [], "Examples": []}},
    {"Emotional reasoning": {"Definitions": [], "Examples": []}},
    {"Fallacy of change": {"Definitions": [], "Examples": []}},
    {"Global labeling": {"Definitions": [], "Examples": []}},
    {"Always being right": {"Definitions": [], "Examples": []}},
]


def generate_distortions(
    platform, usage, thought, thought_score, emotion, emotion_score, situation
):
    pass
