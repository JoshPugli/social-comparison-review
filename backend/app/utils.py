from openai import OpenAI
import dotenv
import os
import openai
import time
import ast

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))
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

if os.environ.get("ENVIRONMENT") != "production":
    dotenv.load_dotenv()

try:
    client = OpenAI()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OpenAI.api_key = OPENAI_API_KEY
except Exception as e:
    client = None

def generate_distortions(situation, thought, distortion_model="ft:gpt-3.5-turbo-0125:personal::923pIUVO", distortions=DISTORTIONS):
    start_time = time.time()
    
    if not OPENAI_API_KEY or not client:
        return "OPENAI_API_KEY or client not set."
    
    completion = client.chat.completions.create(
        model=distortion_model,
        messages=[
            {
                "role": "system",
                "content": "Given a distorted thought, and situation that the user with the distorted thought is in and the following list of distortions: [\"disqualifying the positive\", \"comparing and despairing\",\"personalizing\",\"should statements\",\"emotional reasoning\",\"catastrophizing\",\"labeling\",\"fortune telling\",\"blaming\",\"magnification\",\"negative feeling or emotion\",\"mind reading\",\"overgeneralizing\",\"all-or-nothing thinking\"], provide the following fields in a sorted list, ranking the distortions\' likelihood of being present in the thought, where applicable: \"distortions\".",
            },
            {"role": "user", "content": f"Situation: {situation}. Thought: {thought}."},
        ],
    )
    try:
        distortions = ast.literal_eval(completion.choices[0].message.content)
    except SyntaxError:
        distortions = []

    print("--- generating distortions took %s seconds ---" % (time.time() - start_time))
    print("Distortions: ", distortions)
    
    return distortions
