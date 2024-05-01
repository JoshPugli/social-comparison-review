from openai import OpenAI
import dotenv
import os
import time

if os.environ.get("ENVIRONMENT") != "production":
    dotenv.load_dotenv()

client = OpenAI()
OpenAI.api_key = os.getenv("OPENAI_API_KEY")

print(client.fine_tuning.jobs.list(limit=10))


file = client.files.create(
    file=open("reframing_dataset.jsonl", "rb"),
    purpose="fine-tune"
)

job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-3.5-turbo"
)

job_id = job['id']  

def check_job_status(client):
    while True:
        job_status = client.fine_tuning.jobs.retrieve('ftjob-tkQohLVAsPYLBZioiSYWo7Gm')
        if job_status.status in ['succeeded', 'failed', 'cancelled']:
            return job_status
        else:
            print(f"Job {'ftjob-tkQohLVAsPYLBZioiSYWo7Gm'} status: {job_status.status}")
            time.sleep(60)  

completed_job = check_job_status(client)

if completed_job.status == 'succeeded':
    model_id = completed_job.fine_tuned_model
    print(f"Fine-tuning completed successfully. Model ID: {model_id}")
else:
    print(f"Fine-tuning job did not succeed. Status: {completed_job['status']}")

"ft:gpt-3.5-turbo-0125:personal::9JgrsBuM"