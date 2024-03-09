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
import dotenv
import openai
from openai import OpenAI

#### Load the environment variables ####
if os.environ.get("ENVIRONMENT") != "production":
    dotenv.load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))

#### Load the sentence transformer model ####
sentence_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

if torch.cuda.is_available():
    sentence_model.cuda()


def get_sentence_emb(input_text):
    return sentence_model.encode(input_text)


def load_data():
    """
    Load the training data
    """
    #### Load the training data ####
    training_df = pd.read_csv(os.path.join(CURRENT_FILE, "data/reframing_dataset.csv"))

    #### Preprocess the training data ####
    training_grouped_df = (
        training_df.groupby(["situation", "thought", "thinking_traps_addressed"])[
            "reframe"
        ]
        .apply(list)
        .reset_index(name="reframe_list")
    )

    #### Get the sentence embeddings for the training data ####
    training_grouped_df["thought_record_id"] = training_grouped_df.index

    training_thought_record_ids = training_grouped_df["thought_record_id"].tolist()
    training_situation_and_thought_emb = training_grouped_df.apply(
        lambda x: get_sentence_emb(x.situation + " " + x.thought), axis=1
    )
    return (
        training_situation_and_thought_emb,
        training_thought_record_ids,
        training_grouped_df,
    )


def get_top_k_matches(
    curr_situation: str,
    curr_thought: str,
    training_situation_and_thought_emb,
    training_thought_record_ids,
    training_grouped_df,
    K: int = 5,
) -> pd.DataFrame:
    """
    Gets the top K matches for the current situation and thought

    :param curr_situation: _description_
    :param curr_thought: _description_
    :param K: _description_, defaults to 5
    :return: Dataframe of the K closest matches in the training data
    """
    curr_situation_and_thought_emb = sentence_model.encode(
        curr_situation + " " + curr_thought
    )
    situation_and_thought_scores = (
        util.dot_score(
            curr_situation_and_thought_emb, training_situation_and_thought_emb
        )[0]
        .cpu()
        .tolist()
    )
    situation_and_thought_score_pairs = list(
        zip(training_thought_record_ids, situation_and_thought_scores)
    )
    situation_and_thought_score_pairs_sorted = sorted(
        situation_and_thought_score_pairs, key=lambda x: x[1], reverse=True
    )
    matched_thought_record_ids = [
        x[0] for x in situation_and_thought_score_pairs_sorted[:K]
    ]
    shuffle(matched_thought_record_ids)
    matched_user_response_df = training_grouped_df[
        training_grouped_df["thought_record_id"].isin(matched_thought_record_ids)
    ]
    return matched_user_response_df


def generate_reframe(
    situation, thought, gpt3_model="gpt-3.5-turbo", top_p=0.6, top_k=5
):
    """
    Use openai's GPT3 to generate a rational response to the distorted thought

    :param situation: Situation description
    :param thought: Distorted thought
    :return: Rational response
    """
    (
        training_grouped_df,
        training_thought_record_ids,
        training_situation_and_thought_emb,
    ) = load_data()

    matched_user_response_df = get_top_k_matches(
        situation,
        thought,
        training_situation_and_thought_emb,
        training_thought_record_ids,
        training_grouped_df,
        K=top_k,
    )

    #### Generate the retrieval prompt ####
    curr_retrieval_prompt = ""

    for inner_index, inner_row in matched_user_response_df.iterrows():
        # Sample a reframe from the reframe list
        curr_reframe = np.random.choice(inner_row["reframe_list"])

        curr_retrieval_prompt += (
            "Situation: "
            + inner_row["situation"]
            + "\nDistorted Thought: "
            + inner_row["thought"]
            + "\nRational Response: "
            + curr_reframe
            + "\n\n"
        )

    curr_test_input = (
        "Situation: " + situation.strip() + "\nDistorted Thought: " + thought.strip()
    )

    #### Generate the rational response using GPT3 ####
    MAX_RETRIES = 5
    current_tries = 1
    client = OpenAI()

    while current_tries <= MAX_RETRIES:
        try:
            curr_response_reframing = client.chat.completions.create(
                model=gpt3_model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant, helping a user perform cognitive reframing on a distorted thought.",
                    },
                    {
                        "role": "user",
                        "content": f"These are the top {top_k} closest matches to my situation in a public dataset: {curr_retrieval_prompt}, and this is my current scenario: {curr_test_input}. What would be a rational response to my distorted thought? Respond in a way that is very concise, and helpful for me to reframe my distorted thought.",
                    },
                ],
            )
            break
        except Exception as e:
            print("Error: {}".format(e))
            print("retrying")
            time.sleep(5)
            current_tries += 1

    curr_response_reframing_str = curr_response_reframing.choices[0].message.content
    return curr_response_reframing_str


trained_situation_and_thought_emb, trained_thought_record_ids, trained_grouped_df = (
    load_data()
)

top_k = get_top_k_matches(
    "I got a bad grade on my test",
    "I am a failure",
    trained_situation_and_thought_emb,
    trained_thought_record_ids,
    trained_grouped_df,
)

print(top_k)
