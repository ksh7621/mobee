from rest_framework import serializers
from .models import Mobee

class MobeeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'title',
            'id'
        )
        model = Mobee