from rest_framework import serializers
from .models import Job
from accounts.serializers import EmployerSerializer

class JobSerializer(serializers.ModelSerializer):
    employer_details = EmployerSerializer(source='employer', read_only=True)
    applications_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['views_count', 'created_at', 'updated_at']
    
    def get_applications_count(self, obj):
        return obj.applications.count()


class JobListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='employer.company_name', read_only=True)
    company_logo = serializers.ImageField(source='employer.company_logo', read_only=True)
    
    class Meta:
        model = Job
        fields = ['id', 'title', 'company_name', 'company_logo', 'location', 'remote', 
                  'job_type', 'experience_level', 'salary_min', 'salary_max', 
                  'salary_currency', 'created_at', 'is_active']
