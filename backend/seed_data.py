import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobboard.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import Employer, Candidate
from jobs.models import Job
from datetime import date, timedelta

User = get_user_model()

# Create sample employer
if not User.objects.filter(username='techcorp').exists():
    employer_user = User.objects.create_user(
        username='techcorp',
        email='hr@techcorp.com',
        password='password123',
        first_name='Tech',
        last_name='Corp',
        user_type='employer'
    )
    
    employer = Employer.objects.create(
        user=employer_user,
        company_name='TechCorp Solutions',
        company_description='Leading technology company specializing in innovative software solutions',
        company_size='100-500',
        industry='Technology',
        verified=True
    )
    
    # Create sample jobs
    Job.objects.create(
        employer=employer,
        title='Senior Full Stack Developer',
        description='We are looking for an experienced Full Stack Developer to join our dynamic team.',
        requirements='5+ years of experience in web development\nStrong knowledge of React and Node.js\nExperience with databases',
        responsibilities='Develop and maintain web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code',
        job_type='full-time',
        experience_level='senior',
        location='San Francisco, CA',
        remote=True,
        salary_min=120000,
        salary_max=180000,
        salary_currency='USD',
        skills_required='React, Node.js, MongoDB, TypeScript, AWS',
        benefits='Health insurance, 401k, Remote work, Flexible hours',
        application_deadline=date.today() + timedelta(days=30)
    )
    
    Job.objects.create(
        employer=employer,
        title='UI/UX Designer',
        description='Creative UI/UX Designer needed to craft beautiful user experiences.',
        requirements='3+ years of UI/UX design experience\nProficiency in Figma and Adobe XD\nStrong portfolio',
        responsibilities='Design user interfaces\nCreate wireframes and prototypes\nConduct user research',
        job_type='full-time',
        experience_level='mid',
        location='New York, NY',
        remote=False,
        salary_min=80000,
        salary_max=120000,
        salary_currency='USD',
        skills_required='Figma, Adobe XD, Sketch, Prototyping, User Research',
        benefits='Health insurance, Creative environment, Learning budget',
        application_deadline=date.today() + timedelta(days=45)
    )
    
    Job.objects.create(
        employer=employer,
        title='DevOps Engineer',
        description='Join our infrastructure team to build and maintain scalable systems.',
        requirements='Experience with AWS/Azure\nKnowledge of Docker and Kubernetes\nCI/CD pipeline experience',
        responsibilities='Manage cloud infrastructure\nImplement automation\nMonitor system performance',
        job_type='full-time',
        experience_level='mid',
        location='Remote',
        remote=True,
        salary_min=100000,
        salary_max=150000,
        salary_currency='USD',
        skills_required='AWS, Docker, Kubernetes, Terraform, Jenkins',
        benefits='Remote work, Health insurance, Stock options',
        application_deadline=date.today() + timedelta(days=60)
    )
    
    print('Sample data created successfully!')
    print('Employer: techcorp / password123')
else:
    print('Sample data already exists!')

# Create sample candidate
if not User.objects.filter(username='johndoe').exists():
    candidate_user = User.objects.create_user(
        username='johndoe',
        email='john@example.com',
        password='password123',
        first_name='John',
        last_name='Doe',
        user_type='candidate'
    )
    
    Candidate.objects.create(
        user=candidate_user,
        skills='Python, JavaScript, React, Django',
        experience_years=5,
        education='Bachelor of Computer Science',
        linkedin_url='https://linkedin.com/in/johndoe',
        github_url='https://github.com/johndoe'
    )
    
    print('Sample candidate created!')
    print('Candidate: johndoe / password123')
