from openai import OpenAI
import dotenv
import os
import ast
# from transformers import BertModel
# import torch.nn as nn
# from transformers import BertTokenizer
# import torch
# import pandas as pd
# from sklearn.preprocessing import MultiLabelBinarizer

DISTORTIONS = [
    "emotional reasoning",
    "fortune telling",
    "comparing and despairing",
    "negative feeling or emotion",
    "should statements",
    "disqualifying the positive",
    "catastrophizing",
    "overgeneralizing",
    "all-or-nothing thinking",
    "magnification",
    "labeling",
    "mind reading",
    "blaming",
    "personalizing",
]

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))

if os.environ.get("ENVIRONMENT") != "production":
    dotenv.load_dotenv()

try:
    client = OpenAI()
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OpenAI.api_key = OPENAI_API_KEY
except Exception as e:
    client = None


# def generate_distortions(
#     situation,
#     thought,
# ):
#     tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
#     df = pd.read_csv(f"{CURRENT_FILE}/data/reframing_dataset.csv")
#     df["text"] = df["situation"] + " " + df["thought"]
#     df["labels"] = df["thinking_traps_addressed"].apply(lambda x: x.split(","))
#     mlb = MultiLabelBinarizer()
#     mlb.fit_transform(df["labels"])

#     class BertForMultiLabelClassification(nn.Module):
#         def __init__(self, num_labels):
#             super(BertForMultiLabelClassification, self).__init__()
#             self.bert = BertModel.from_pretrained("bert-base-uncased")
#             self.classifier = nn.Linear(self.bert.config.hidden_size, num_labels)

#         def forward(self, input_ids, attention_mask):
#             outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
#             pooled_output = outputs.pooler_output
#             logits = self.classifier(pooled_output)
#             return logits

#     model = BertForMultiLabelClassification(num_labels=len(mlb.classes_))
#     model.load_state_dict(torch.load(f"{CURRENT_FILE}/bert_finetuned.pth"))

#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     model.to(device)
#     model.eval()

#     thought = thought.strip()
#     situation = situation.strip()
#     if thought[-1] != ".":
#         thought += "."
#     if situation[-1] != ".":
#         situation += "."

#     input = situation + " " + thought

#     encodings = tokenizer(
#         input,
#         truncation=True,
#         padding="max_length",
#         max_length=512,
#         return_tensors="pt",
#     )

#     input_ids = encodings["input_ids"].to(device)
#     attention_mask = encodings["attention_mask"].to(device)

#     def get_top_n_labels(n):
#         with torch.no_grad():
#             logits = model(input_ids, attention_mask)
#             probabilities = torch.sigmoid(logits)

#         label_probabilities = sorted(
#             [
#                 (label, prob.item())
#                 for label, prob in zip(mlb.classes_, probabilities.squeeze())
#             ],
#             key=lambda x: x[1],
#             reverse=True,
#         )

#         # Extract the top n labels based on the sorted probabilities
#         top_n_labels = [label for label, _ in label_probabilities[:n]]

#         return top_n_labels, label_probabilities

#     return get_top_n_labels(4)


def generate_distortions(
    thought, situation, model="ft:gpt-3.5-turbo-0125:personal::9KVzx0oJ"
):
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": f'Given a "situation", and a "distorted thought", generate a list of "thinking traps" from the list: {DISTORTIONS} that correspond to the thought and situation.',
            },
            {
                "role": "user",
                "content": f'{{"situation": "{situation}", "distorted_thought": "{thought}"}}',
            },
        ],
    )

    distortions = completion.choices[0].message.content
    distortions = distortions.split(":")[-1].strip()

    distortions = ast.literal_eval(distortions)

    return distortions


def generate_reframes(
    situation: str,
    thought: str,
    distortions: list,
    # reframe_model="ft:gpt-3.5-turbo-0125:personal::975vA6NT",
    reframe_model="ft:gpt-3.5-turbo-0125:personal::9JgrsBuM",
):
    retries = 0
    while retries < 5:
        try:
            completion = client.chat.completions.create(
                model=reframe_model,
                messages=[
                    {
                        "role": "system",
                        "content": 'Given a "situation", "distorted thoughts", and "thinking traps", generate a list of "reframes" that addresses the thinking traps in a supportive and constructive manner.',
                    },
                    {
                        "role": "user",
                        "content": f'{{"situation": "{situation}", "distorted_thoughts": "{thought}", "thinking_traps": {distortions}}}',
                    },
                ],
            )

            original_str = completion.choices[0].message.content
            print("Original str: ", original_str)
            json_str = "{" + original_str + "}"
            data = ast.literal_eval(json_str)
            reframes = data["reframes"]
            break
        except Exception as e:
            print("Error: ", e)
            retries += 1
            if retries == 5:
                reframes = ["Error: Unable to generate reframes. Please try again."]
                break
            continue

    return reframes


# def generate_reframes(
#     situation: str,
#     thought: str,
#     distortions: list,
#     # reframe_model="ft:gpt-3.5-turbo-0125:personal::975vA6NT",
#     reframe_model="ft:gpt-3.5-turbo-0125:personal::98cmp431",
# ):
#     start_time = time.time()

#     if not OPENAI_API_KEY or not client:
#         return "OPENAI_API_KEY or client not set."

#     distortion_str = ",".join(distortions)
#     completion = client.chat.completions.create(
#         model=reframe_model,
#         messages=[
#             {
#                 "role": "system",
#                 "content": "Given a distorted thought, the situation the user is in, and a list of 1-3 thinking traps that the user resonates with, generate 2 unique reframes.",
#             },
#             {
#                 "role": "user",
#                 "content": f"Situation: {situation}.\nThought: {thought}.\nThinking Traps: {distortion_str}.",
#             },
#         ],
#     )
#     # try:
#     #     reframes = ast.literal_eval(completion.choices[0].message.content)
#     # except SyntaxError:
#     #     reframes = {}
#     reframes = completion.choices[0].message.content

#     print("--- generating distortions took %s seconds ---" % (time.time() - start_time))
#     print("Reframes: ", reframes)

#     return reframes.split("\n")


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
            "content": f"Assist in refining a cognitive reframe. Current situation: '{situation}'. Original thought: '{thought}'. Identified distortions: {distortion_str}. Current reframe: '{current_reframe}'. Aim to improve the reframe based on the user's feedback. I want just the reframe.",
        },
        {
            "role": "user",
            "content": f"{user_request}. Be concise, and put it from the perspective of me (I, me, my).",
        },
    ]

    completion = client.chat.completions.create(
        model=reframe_model,
        messages=prompt_messages,
    )

    new_reframe = completion.choices[0].message.content
    return new_reframe
