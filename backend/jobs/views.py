from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job
from .serializers import JobSerializer, JobListSerializer
from accounts.models import Employer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_active=True)
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['job_type', 'experience_level', 'remote', 'location']
    search_fields = ['title', 'description', 'skills_required', 'employer__company_name']
    ordering_fields = ['created_at', 'salary_min', 'views_count']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return JobListSerializer
        return JobSerializer
    
    def perform_create(self, serializer):
        if not hasattr(self.request.user, 'employer_profile'):
            raise ValueError("Only employers can create jobs")
        serializer.save(employer=self.request.user.employer_profile)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_jobs(self, request):
        if not hasattr(request.user, 'employer_profile'):
            return Response({'error': 'Only employers can view their jobs'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        jobs = Job.objects.filter(employer=request.user.employer_profile)
        serializer = self.get_serializer(jobs, many=True)
        return Response(serializer.data)
