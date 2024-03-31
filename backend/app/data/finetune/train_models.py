from openai import OpenAI
import dotenv
import os
import openai
import json

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))

if os.environ.get("ENVIRONMENT") != "production":
    dotenv.load_dotenv()

client = OpenAI()
OpenAI.api_key = os.getenv("OPENAI_API_KEY")

DISTORTIONS = [
    "disqualifying the positive",
    "comparing and despairing",
    "personalizing",
    "should statements",
    "emotional reasoning",
    "catastrophizing",
    "labeling",
    "fortune telling",
    "blaming",
    "magnification",
    "negative feeling or emotion",
    "mind reading",
    "overgeneralizing",
    "all-or-nothing thinking",
]

path = os.path.join(CURRENT_FILE, "reframe_format.jsonl")

file = client.files.create(
  file=open(path, "rb"),
  purpose="fine-tune"
)

client.fine_tuning.jobs.create(
  training_file=file.id, 
  model="gpt-3.5-turbo",
)