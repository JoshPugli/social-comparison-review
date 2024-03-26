from rest_framework import serializers

class SituationThoughtSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()
    
class SituationThoughtDistortionSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()
    distortions = serializers.ListField(child=serializers.CharField())
