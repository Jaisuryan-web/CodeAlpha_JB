from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'employer', 'job_type', 'location', 'is_active', 'created_at']
    list_filter = ['job_type', 'experience_level', 'remote', 'is_active']
    search_fields = ['title', 'description', 'employer__company_name']
    readonly_fields = ['views_count', 'created_at', 'updated_at']
