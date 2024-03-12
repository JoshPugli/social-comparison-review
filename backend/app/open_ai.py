from openai import OpenAI
import dotenv
import os
import openai
import time

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

client = OpenAI()
OpenAI.api_key = os.getenv("OPENAI_API_KEY")

distortion_model = "ft:gpt-3.5-turbo-0125:personal::923pIUVO"

start_time = time.time()
completion = client.chat.completions.create(
  model=distortion_model,
  messages=[
    {"role": "system", "content": "Given a distorted thought, and situation that the user with the distorted thought is in and the following list of distortions: [\"disqualifying the positive\", \"comparing and despairing\",\"personalizing\",\"should statements\",\"emotional reasoning\",\"catastrophizing\",\"labeling\",\"fortune telling\",\"blaming\",\"magnification\",\"negative feeling or emotion\",\"mind reading\",\"overgeneralizing\",\"all-or-nothing thinking\"], provide the following fields in a sorted list, ranking the distortions' likelihood of being present in the thought, where applicable: \"distortions\"."},
    {"role": "user", "content": "Situation: After I complained about not spending time together, my boyfriend did not want to go on a date last weekend. Thought: He doesn't love me."}
  ]
)

print("--- %s seconds ---" % (time.time() - start_time))
print(completion.choices[0].message)

"""
/social-comparison/social-comparison-review/backend/app/open_ai.py
--- 2.999565601348877 seconds ---
ChatCompletionMessage(content='["overgeneralizing", "personalizing", "catastrophizing"]', role='assistant', function_call=None, tool_calls=None)
"""
