from django.db import models

# Create your models here.
class Submission(models.Model):
    id = models.IntegerField(primary_key=True)
    thought = models.TextField()
    beliefRating = models.IntegerField()
    emotion = models.TextField()
    emotionIntensity = models.IntegerField()
    situation = models.TextField()
    distortions = models.TextField()
    initialReframe = models.TextField()
    finalReframe = models.TextField()
