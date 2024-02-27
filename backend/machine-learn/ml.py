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


def generate_distortions(
    platform, usage, thought, thought_score, emotion, emotion_score, situation
):
    pass
