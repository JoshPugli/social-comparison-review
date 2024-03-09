from django.core.cache import cache
from sentence_transformers import SentenceTransformer, util
import torch
import os
import pandas as pd
from random import shuffle

CURRENT_FILE = os.path.abspath(os.path.dirname(__file__))


def load_model_into_cache() -> None:
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    if torch.cuda.is_available():
        model.cuda()
    # `None` timeout means the cache never expires
    cache.set("sentence_model", model, None)


def __get_model() -> SentenceTransformer:
    sentence_model = cache.get("sentence_model")
    if sentence_model is None:
        load_model_into_cache()
        sentence_model = cache.get("sentence_model")
    return sentence_model


def __get_data() -> tuple:
    training_situation_and_thought_emb = cache.get("training_situation_and_thought_emb")
    training_thought_record_ids = cache.get("training_thought_record_ids")
    training_grouped_df = cache.get("training_grouped_df")
    if (
        training_situation_and_thought_emb is None
        or training_thought_record_ids is None
        or training_grouped_df is None
    ):
        load_data_into_cache()
        training_situation_and_thought_emb = cache.get(
            "training_situation_and_thought_emb"
        )
        training_thought_record_ids = cache.get("training_thought_record_ids")
        training_grouped_df = cache.get("training_grouped_df")
    return (
        training_situation_and_thought_emb,
        training_thought_record_ids,
        training_grouped_df,
    )


def __get_sentence_emb(input_text) -> torch.Tensor:
    sentence_model = __get_model()
    return sentence_model.encode(input_text)


def load_data_into_cache() -> None:
    """
    Load the training data
    """
    training_df = pd.read_csv(os.path.join(CURRENT_FILE, "data/reframing_dataset.csv"))

    training_grouped_df = (
        training_df.groupby(["situation", "thought", "thinking_traps_addressed"])[
            "reframe"
        ]
        .apply(list)
        .reset_index(name="reframe_list")
    )

    # A DataFrame grouping situations, thoughts, and their addressed thinking traps, with associated reframing strategies aggregated into lists.
    training_grouped_df["thought_record_id"] = training_grouped_df.index

    # List of unique ids for each record in the preprocessed dataset, corresponding to distinct situation-thought combinations.
    training_thought_record_ids = training_grouped_df["thought_record_id"].tolist()

    # A series of vector embeddings representing the semantic content of concatenated situation and thought texts for similarity comparisons.
    training_situation_and_thought_emb = training_grouped_df.apply(
        lambda x: __get_sentence_emb(x.situation + " " + x.thought), axis=1
    )

    cache.set(
        "training_situation_and_thought_emb", training_situation_and_thought_emb, None
    )
    cache.set("training_thought_record_ids", training_thought_record_ids, None)
    cache.set("training_grouped_df", training_grouped_df, None)


def get_top_k_matches(
    curr_situation: str,
    curr_thought: str,
    K: int = 5,
) -> pd.DataFrame:
    """
    Gets the top K matches for the current situation and thought

    :param curr_situation: _description_
    :param curr_thought: _description_
    :param K: _description_, defaults to 5
    :return: Dataframe of the K closest matches in the training data
    """
    # load the model and data
    sentence_model = __get_model()
    (
        training_situation_and_thought_emb,
        training_thought_record_ids,
        training_grouped_df,
    ) = __get_data()

    # get embedding for input params
    curr_situation_and_thought_emb = sentence_model.encode(
        curr_situation + " " + curr_thought
    )
    
    # calculate similarity scores
    situation_and_thought_scores = (
        util.dot_score(
            curr_situation_and_thought_emb, training_situation_and_thought_emb
        )[0]
        .cpu()
        .tolist()
    )
    
    # sort the scores and get the top K matches
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
