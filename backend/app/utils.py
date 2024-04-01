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


def generate_distortions(
    situation,
    thought,
    distortion_model="ft:gpt-3.5-turbo-0125:personal::923pIUVO",
    distortions=DISTORTIONS,
):
    start_time = time.time()

    if not OPENAI_API_KEY or not client:
        return "OPENAI_API_KEY or client not set."

    completion = client.chat.completions.create(
        model=distortion_model,
        messages=[
            {
                "role": "system",
                "content": 'Given a distorted thought, and situation that the user with the distorted thought is in and the following list of distortions: ["disqualifying the positive", "comparing and despairing","personalizing","should statements","emotional reasoning","catastrophizing","labeling","fortune telling","blaming","magnification","negative feeling or emotion","mind reading","overgeneralizing","all-or-nothing thinking"], provide the following fields in a sorted list, ranking the distortions\' likelihood of being present in the thought, where applicable: "distortions".',
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


def generate_reframes(
    situation: str,
    thought: str,
    distortions: list,
    # reframe_model="ft:gpt-3.5-turbo-0125:personal::975vA6NT",
    reframe_model="ft:gpt-3.5-turbo-0125:personal::98cmp431",
):
    start_time = time.time()

    if not OPENAI_API_KEY or not client:
        return "OPENAI_API_KEY or client not set."

    distortion_str = ",".join(distortions)
    completion = client.chat.completions.create(
        model=reframe_model,
        messages=[
            {
                "role": "system",
                "content": "Given a distorted thought, the situation the user is in, and a list of 1-3 thinking traps that the user resonates with, generate 2 unique reframes.",
            },
            {
                "role": "user",
                "content": f"Situation: {situation}.\nThought: {thought}.\nThinking Traps: {distortion_str}.",
            },
        ],
    )
    # try:
    #     reframes = ast.literal_eval(completion.choices[0].message.content)
    # except SyntaxError:
    #     reframes = {}
    reframes = completion.choices[0].message.content

    print("--- generating distortions took %s seconds ---" % (time.time() - start_time))
    print("Reframes: ", reframes)

    return reframes.split("\n")


def update_reframe(
    situation: str,
    thought: str,
    distortions: list,
    current_reframe: str,
    user_request,
    reframe_model="gpt-3.5-turbo-0125",
):
    distortion_str = ", ".join(distortions)
    
    prompt_messages = [
        {
            "role": "system",
            "content": f"Assist in refining a cognitive reframe. Current situation: '{situation}'. Original thought: '{thought}'. Identified distortions: {distortion_str}. Current reframe: '{current_reframe}'. Aim to improve the reframe based on the user's feedback."
        },
        {
            "role": "user",
            "content": user_request
        },
    ]
    
    completion = client.chat.completions.create(
        model=reframe_model,
        messages=prompt_messages,
    )
    
    new_reframe = completion.choices[0].message.content
    return new_reframe

