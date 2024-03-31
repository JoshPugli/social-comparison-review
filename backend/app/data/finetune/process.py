import pandas as pd
import os
from tqdm import tqdm
from copy import deepcopy
import json

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))
PARENT_DIR = os.path.abspath(os.path.join(CURRENT_FILE, os.pardir))

# df = pd.read_csv(os.path.join(CURRENT_FILE, "reframing_dataset.csv"))
# print(df.head())

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

distortion_jsonl_template = {
    "messages": [
        {
            "role": "system",
            "content": "Given a distorted thought, the situation the user is in, and a list of 1-3 thinking traps that the user resonates with, generate 2 unique reframes.",
        },
        {"role": "user", "content": ""},
        {"role": "assistant", "content": ""},
    ]
}

with open(os.path.join(CURRENT_FILE, "reframe_format.jsonl"), "w") as f:
    pass

data_template = {
    "user": {
        "Thought": "",
        "Situation": "",
        "Thinking Traps": [],
    },
    "assistant": {"reframes": []},
}

data = []

df = pd.read_csv(os.path.join(PARENT_DIR, "reframing_dataset.csv"))

for i in range(0, 100, 2):
    dt = deepcopy(data_template)
    dt["user"]["Thought"] = df.iloc[i]["thought"]
    dt["user"]["Situation"] = df.iloc[i]["situation"]
    dt["user"]["Thinking Traps"] += (
        df.iloc[i]["thinking_traps_addressed"].split(",")
    )
    dt["user"]["Thinking Traps"] += (
        df.iloc[i + 1]["thinking_traps_addressed"].split(",")
    )
    dt["assistant"]["reframes"].append(df.iloc[i]["reframe"])
    dt["assistant"]["reframes"].append(df.iloc[i + 1]["reframe"])

    data.append(dt)


with open(os.path.join(CURRENT_FILE, "new.jsonl"), "w") as f:
    for d in data:
        f.write(json.dumps(d) + "\n")
    f.close()

with open(os.path.join(CURRENT_FILE, "reframe_format.jsonl"), "w") as f:
    pass

with open(os.path.join(CURRENT_FILE, "new.jsonl"), "r") as f:
    data = f.readlines()
    for d in data:
        dat = json.loads(d)
        template = deepcopy(distortion_jsonl_template)
        template["messages"][1]["content"] = f"Thought: {dat['user']['Thought']}\nSituation: {dat['user']['Situation']}\nThinking Traps: {', '.join(dat['user']['Thinking Traps'])}"
        template["messages"][2]["content"] = f"{dat['assistant']['reframes'][0]}\n{dat['assistant']['reframes'][1]}"

        with open(os.path.join(CURRENT_FILE, "reframe_format.jsonl"), "a") as f:
            f.write(json.dumps(template) + "\n")
            f.close()