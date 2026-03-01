from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Candidate, Employer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type', 
                  'phone', 'profile_picture', 'bio', 'location', 'website', 'created_at']
        read_only_fields = ['id', 'created_at']


class CandidateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Candidate
        fields = '__all__'


class EmployerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Employer
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 
                  'last_name', 'user_type', 'phone', 'location']
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value
    
    def validate(self, data):
        if data.get('password') != data.get('password2'):
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return data
    
    def create(self, validated_data):
        try:
            validated_data.pop('password2')
            password = validated_data.pop('password')
            user = User.objects.create(**validated_data)
            user.set_password(password)
            user.save()
            
            if user.user_type == 'candidate':
                Candidate.objects.create(user=user)
            elif user.user_type == 'employer':
                Employer.objects.create(
                    user=user, 
                    company_name=f"{user.first_name} {user.last_name}'s Company" if user.first_name else f"{user.username}'s Company"
                )
            
            return user
        except Exception as e:
            # If user was created but profile creation failed, delete the user
            if 'user' in locals() and user.pk:
                user.delete()
            raise serializers.ValidationError({"error": str(e)})
