from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, login_view, profile_view,
    CandidateViewSet, EmployerViewSet
)

router = DefaultRouter()
router.register('candidates', CandidateViewSet)
router.register('employers', EmployerViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile_view, name='profile'),
    path('', include(router.urls)),
]
