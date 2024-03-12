import pandas as pd
import os
from tqdm import tqdm
from copy import deepcopy
import json

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))

df = pd.read_csv(os.path.join(CURRENT_FILE, "reframing_dataset.csv"))
print(df.head())

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
            "content": 'Given a distorted thought, and situation that the user with the distorted thought is in and the following list of distortions: ["disqualifying the positive", "comparing and despairing","personalizing","should statements","emotional reasoning","catastrophizing","labeling","fortune telling","blaming","magnification","negative feeling or emotion","mind reading","overgeneralizing","all-or-nothing thinking"], provide the following fields in a sorted list, ranking the distortions\' likelihood of being present in the thought, where applicable: "distortions".',
        },
        {"role": "user", "content": ""},
        {"role": "assistant", "content": ""},
    ]
}


data = []

for row in tqdm(df.itertuples(index=False), total=len(df)):
    new = deepcopy(distortion_jsonl_template)
    user_content = f"Situation: {row.situation}. Thought: {row.thought}"
    new["messages"][1]["content"] = user_content
    distortions = row.thinking_traps_addressed.split(',')
    new["messages"][2]["content"] = json.dumps(distortions)
    data.append(new)

# for row in tqdm(df.itertuples(index=False), total=len(df)):
#     new = deepcopy(template)
#     user_content = f"Situation: {row.situation}. Thought: {row.thought}"
#     new["messages"][1]["content"] = user_content
#     assistant_content = f"Distortions: {json.dumps(row.thinking_traps_addressed.split(','))}. Reframes: {json.dumps(row.reframe.split(','))}"
#     new["messages"][2]["content"] = assistant_content
#     data.append(new)

with open(os.path.join(CURRENT_FILE, "distortion_format.jsonl"), "w") as f:
    for item in data:
        json.dump(item, f)
        f.write("\n")
