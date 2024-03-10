from rest_framework import serializers

class TopKSerializer(serializers.Serializer):
    curr_situation = serializers.CharField()
    curr_thought = serializers.CharField()
    K = serializers.IntegerField(required=False)  # Make 'K' optional