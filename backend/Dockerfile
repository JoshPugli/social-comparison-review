FROM python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /backend

RUN pip install django django-cors-headers djangorestframework openai scikit-learn numpy pandas torch transformers python-dotenv

COPY . . 

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

