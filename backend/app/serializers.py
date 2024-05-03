from rest_framework import serializers


class SituationThoughtSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()


class SituationThoughtDistortionSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()
    distortions = serializers.ListField(child=serializers.CharField())


class UpdateReframeSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()
    distortions = serializers.ListField(child=serializers.CharField())
    current_reframe = serializers.CharField()
    user_request = serializers.CharField()
    
class FinalSubmissionSerializer(serializers.Serializer):
    thought = serializers.CharField()
    beliefRating = serializers.IntegerField()
    emotion = serializers.CharField()
    emotionIntensity = serializers.IntegerField()
    situation = serializers.CharField()
    distortions = serializers.CharField()
    initialReframe = serializers.CharField()
    finalReframe = serializers.CharField()
    
    user_id = serializers.IntegerField()
