from rest_framework import serializers
from .models import Application, ApplicationStatusHistory
from jobs.serializers import JobListSerializer
from accounts.serializers import CandidateSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    job_details = JobListSerializer(source='job', read_only=True)
    candidate_details = CandidateSerializer(source='candidate', read_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['candidate', 'applied_at', 'updated_at', 'status', 'notes']


class ApplicationStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationStatusHistory
        fields = '__all__'
