import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobboard.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@jobboard.com',
        password='admin123',
        user_type='employer'
    )
    print('Superuser created successfully!')
    print('Username: admin')
    print('Password: admin123')
else:
    print('Superuser already exists!')
