from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Application, ApplicationStatusHistory
from .serializers import ApplicationSerializer, ApplicationStatusHistorySerializer

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'candidate_profile'):
            return Application.objects.filter(candidate=user.candidate_profile)
        elif hasattr(user, 'employer_profile'):
            return Application.objects.filter(job__employer=user.employer_profile)
        return Application.objects.none()
    
    def perform_create(self, serializer):
        if not hasattr(self.request.user, 'candidate_profile'):
            from rest_framework.exceptions import ValidationError
            raise ValidationError("Only candidates can apply for jobs")
        
        # Check if already applied
        job_id = self.request.data.get('job')
        if Application.objects.filter(
            candidate=self.request.user.candidate_profile,
            job_id=job_id
        ).exists():
            from rest_framework.exceptions import ValidationError
            raise ValidationError("You have already applied for this job")
        
        serializer.save(candidate=self.request.user.candidate_profile)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):
        application = self.get_object()
        
        if not hasattr(request.user, 'employer_profile'):
            return Response({'error': 'Only employers can update application status'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        if application.job.employer != request.user.employer_profile:
            return Response({'error': 'You can only update applications for your jobs'}, 
                          status=status.HTTP_403_FORBIDDEN)
        
        new_status = request.data.get('status')
        notes = request.data.get('notes', '')
        
        application.status = new_status
        application.notes = notes
        application.save()
        
        ApplicationStatusHistory.objects.create(
            application=application,
            status=new_status,
            notes=notes
        )
        
        return Response(ApplicationSerializer(application).data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        queryset = self.get_queryset()
        
        stats = {
            'total': queryset.count(),
            'pending': queryset.filter(status='pending').count(),
            'reviewing': queryset.filter(status='reviewing').count(),
            'shortlisted': queryset.filter(status='shortlisted').count(),
            'interview': queryset.filter(status='interview').count(),
            'offered': queryset.filter(status='offered').count(),
            'rejected': queryset.filter(status='rejected').count(),
            'accepted': queryset.filter(status='accepted').count(),
        }
        
        return Response(stats)
