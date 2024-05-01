import pandas as pd
import json

data = pd.read_csv("reframing_dataset.csv")

data_grouped = (
    data.groupby(["situation", "thought"])
    .agg(
        {
            "reframe": "<sep>".join, 
            "thinking_traps_addressed": ",".join,  
        }
    )
    .reset_index()
)

with open('reframing_dataset.jsonl', 'w', encoding='utf-8') as f:
    for index, row in data_grouped.iterrows():
        situation = row["situation"]
        thought = row["thought"]
        reframes = row["reframe"].split("<sep>")
        thinking_traps = list(set(row["thinking_traps_addressed"].split(",")))
        
        data_entry = {
            "messages": [
                {
                    "role": "system",
                    "content": 'Given a "situation", "distorted thoughts", and "thinking traps", generate a list of "reframes" that addresses the thinking traps in a supportive and constructive manner.',
                },
                {
                    "role": "user",
                    "content": f'{{"situation": "{situation}", "distorted_thoughts": "{thought}", "thinking_traps": {thinking_traps}}}'
                },
                {
                    "role": "assistant",
                    "content": f'"reframes": {reframes}'  
                },
            ]
        }
        f.write(json.dumps(data_entry) + '\n')

        
        if index == 25:
            break
    print()