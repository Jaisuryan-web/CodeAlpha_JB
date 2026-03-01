from django.contrib import admin
from .models import Application, ApplicationStatusHistory

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['candidate', 'job', 'status', 'applied_at']
    list_filter = ['status', 'applied_at']
    search_fields = ['candidate__user__username', 'job__title']
    readonly_fields = ['applied_at', 'updated_at']

@admin.register(ApplicationStatusHistory)
class ApplicationStatusHistoryAdmin(admin.ModelAdmin):
    list_display = ['application', 'status', 'changed_at']
    list_filter = ['status', 'changed_at']
    readonly_fields = ['changed_at']
