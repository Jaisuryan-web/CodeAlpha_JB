import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jobboard.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import Employer, Candidate
from jobs.models import Job
from datetime import date, timedelta

User = get_user_model()

print("Adding more dummy data...")

# Create more employers
employers_data = [
    {
        'username': 'google_hr',
        'email': 'hr@google.com',
        'password': 'password123',
        'first_name': 'Google',
        'last_name': 'HR',
        'company_name': 'Google Inc.',
        'company_description': 'Leading technology company focused on search, cloud computing, and AI',
        'company_size': '10000+',
        'industry': 'Technology',
        'verified': True
    },
    {
        'username': 'microsoft_jobs',
        'email': 'jobs@microsoft.com',
        'password': 'password123',
        'first_name': 'Microsoft',
        'last_name': 'Careers',
        'company_name': 'Microsoft Corporation',
        'company_description': 'Global technology company developing software, hardware, and cloud services',
        'company_size': '10000+',
        'industry': 'Technology',
        'verified': True
    },
    {
        'username': 'startup_co',
        'email': 'hello@startup.com',
        'password': 'password123',
        'first_name': 'Startup',
        'last_name': 'Co',
        'company_name': 'StartupCo',
        'company_description': 'Fast-growing startup revolutionizing the fintech industry',
        'company_size': '10-50',
        'industry': 'Fintech',
        'verified': False
    },
    {
        'username': 'design_studio',
        'email': 'contact@designstudio.com',
        'password': 'password123',
        'first_name': 'Design',
        'last_name': 'Studio',
        'company_name': 'Creative Design Studio',
        'company_description': 'Award-winning design agency specializing in branding and digital experiences',
        'company_size': '50-100',
        'industry': 'Design',
        'verified': True
    },
]

created_employers = []

for emp_data in employers_data:
    if not User.objects.filter(username=emp_data['username']).exists():
        user = User.objects.create_user(
            username=emp_data['username'],
            email=emp_data['email'],
            password=emp_data['password'],
            first_name=emp_data['first_name'],
            last_name=emp_data['last_name'],
            user_type='employer'
        )
        
        employer = Employer.objects.create(
            user=user,
            company_name=emp_data['company_name'],
            company_description=emp_data['company_description'],
            company_size=emp_data['company_size'],
            industry=emp_data['industry'],
            verified=emp_data['verified']
        )
        created_employers.append(employer)
        print(f"✓ Created employer: {emp_data['company_name']}")
    else:
        employer = Employer.objects.get(user__username=emp_data['username'])
        created_employers.append(employer)
        print(f"○ Employer exists: {emp_data['company_name']}")

# Get existing employer
techcorp = Employer.objects.get(user__username='techcorp')
created_employers.append(techcorp)

# Create diverse job listings
jobs_data = [
    # Internships
    {
        'employer': created_employers[0],  # Google
        'title': 'Software Engineering Intern',
        'description': 'Join our team as a software engineering intern and work on real-world projects that impact millions of users.',
        'requirements': 'Currently pursuing BS/MS in Computer Science\nStrong programming skills in Python or Java\nPassion for technology',
        'responsibilities': 'Develop features for Google products\nCollaborate with senior engineers\nParticipate in code reviews',
        'job_type': 'internship',
        'experience_level': 'entry',
        'location': 'Mountain View, CA',
        'remote': False,
        'salary_min': 7000,
        'salary_max': 9000,
        'salary_currency': 'USD',
        'skills_required': 'Python, Java, Data Structures, Algorithms',
        'benefits': 'Mentorship, Free meals, Gym access, Learning opportunities',
        'application_deadline': date.today() + timedelta(days=30)
    },
    {
        'employer': created_employers[1],  # Microsoft
        'title': 'UX Design Intern',
        'description': 'Work with our design team to create intuitive user experiences for Microsoft products.',
        'requirements': 'Pursuing degree in Design, HCI, or related field\nPortfolio demonstrating design skills\nFigma or Sketch experience',
        'responsibilities': 'Create wireframes and prototypes\nConduct user research\nCollaborate with product teams',
        'job_type': 'internship',
        'experience_level': 'entry',
        'location': 'Seattle, WA',
        'remote': True,
        'salary_min': 6000,
        'salary_max': 8000,
        'salary_currency': 'USD',
        'skills_required': 'Figma, Sketch, User Research, Prototyping',
        'benefits': 'Remote work, Mentorship, Portfolio building',
        'application_deadline': date.today() + timedelta(days=45)
    },
    {
        'employer': created_employers[2],  # StartupCo
        'title': 'Marketing Intern',
        'description': 'Help us grow our brand and reach new customers through creative marketing campaigns.',
        'requirements': 'Interest in digital marketing\nSocial media savvy\nCreative mindset',
        'responsibilities': 'Manage social media accounts\nCreate marketing content\nAnalyze campaign performance',
        'job_type': 'internship',
        'experience_level': 'entry',
        'location': 'Austin, TX',
        'remote': True,
        'salary_min': 3000,
        'salary_max': 4500,
        'salary_currency': 'USD',
        'skills_required': 'Social Media, Content Creation, Analytics, Canva',
        'benefits': 'Flexible hours, Remote work, Startup experience',
        'application_deadline': date.today() + timedelta(days=60)
    },
    
    # Part-time positions
    {
        'employer': created_employers[3],  # Design Studio
        'title': 'Part-Time Graphic Designer',
        'description': 'Create stunning visual designs for our clients on a flexible part-time schedule.',
        'requirements': '2+ years of graphic design experience\nProficiency in Adobe Creative Suite\nStrong portfolio',
        'responsibilities': 'Design marketing materials\nCreate brand identities\nCollaborate with clients',
        'job_type': 'part-time',
        'experience_level': 'mid',
        'location': 'Los Angeles, CA',
        'remote': True,
        'salary_min': 30,
        'salary_max': 50,
        'salary_currency': 'USD',
        'skills_required': 'Adobe Photoshop, Illustrator, InDesign, Branding',
        'benefits': 'Flexible schedule, Remote work, Creative freedom',
        'application_deadline': date.today() + timedelta(days=30)
    },
    {
        'employer': techcorp,
        'title': 'Part-Time Customer Support Specialist',
        'description': 'Provide excellent customer support to our users during evening hours.',
        'requirements': 'Excellent communication skills\nProblem-solving ability\nCustomer service experience',
        'responsibilities': 'Respond to customer inquiries\nResolve technical issues\nDocument common problems',
        'job_type': 'part-time',
        'experience_level': 'entry',
        'location': 'Remote',
        'remote': True,
        'salary_min': 20,
        'salary_max': 30,
        'salary_currency': 'USD',
        'skills_required': 'Communication, Problem Solving, Zendesk, Email Support',
        'benefits': 'Remote work, Flexible hours, Training provided',
        'application_deadline': date.today() + timedelta(days=45)
    },
    
    # Contract positions
    {
        'employer': created_employers[0],  # Google
        'title': 'Contract Data Analyst',
        'description': '6-month contract to analyze user data and provide insights for product improvements.',
        'requirements': '3+ years of data analysis experience\nSQL and Python proficiency\nExperience with data visualization',
        'responsibilities': 'Analyze large datasets\nCreate dashboards and reports\nPresent findings to stakeholders',
        'job_type': 'contract',
        'experience_level': 'mid',
        'location': 'New York, NY',
        'remote': True,
        'salary_min': 80000,
        'salary_max': 110000,
        'salary_currency': 'USD',
        'skills_required': 'SQL, Python, Tableau, Data Analysis, Statistics',
        'benefits': 'Competitive pay, Remote work, Google perks',
        'application_deadline': date.today() + timedelta(days=20)
    },
    {
        'employer': created_employers[1],  # Microsoft
        'title': 'Contract Cloud Solutions Architect',
        'description': 'Help enterprise clients design and implement Azure cloud solutions.',
        'requirements': '5+ years cloud architecture experience\nAzure certifications preferred\nStrong communication skills',
        'responsibilities': 'Design cloud architectures\nLead technical workshops\nProvide best practice guidance',
        'job_type': 'contract',
        'experience_level': 'senior',
        'location': 'Chicago, IL',
        'remote': True,
        'salary_min': 120000,
        'salary_max': 160000,
        'salary_currency': 'USD',
        'skills_required': 'Azure, Cloud Architecture, Kubernetes, Terraform',
        'benefits': 'High compensation, Remote work, Cutting-edge projects',
        'application_deadline': date.today() + timedelta(days=15)
    },
    {
        'employer': created_employers[2],  # StartupCo
        'title': 'Contract Mobile App Developer',
        'description': '3-month contract to build our iOS and Android mobile applications.',
        'requirements': 'React Native experience\nPublished apps in App Store/Play Store\nUI/UX sensibility',
        'responsibilities': 'Develop mobile applications\nImplement new features\nOptimize performance',
        'job_type': 'contract',
        'experience_level': 'mid',
        'location': 'Remote',
        'remote': True,
        'salary_min': 70000,
        'salary_max': 95000,
        'salary_currency': 'USD',
        'skills_required': 'React Native, iOS, Android, JavaScript, API Integration',
        'benefits': 'Fully remote, Flexible hours, Startup equity option',
        'application_deadline': date.today() + timedelta(days=25)
    },
    
    # Freelance positions
    {
        'employer': created_employers[3],  # Design Studio
        'title': 'Freelance Content Writer',
        'description': 'Create engaging blog posts and articles for our clients on various topics.',
        'requirements': 'Excellent writing skills\nSEO knowledge\nPortfolio of published work',
        'responsibilities': 'Write blog posts and articles\nResearch topics\nOptimize content for SEO',
        'job_type': 'freelance',
        'experience_level': 'mid',
        'location': 'Remote',
        'remote': True,
        'salary_min': 50,
        'salary_max': 100,
        'salary_currency': 'USD',
        'skills_required': 'Content Writing, SEO, Research, WordPress',
        'benefits': 'Work from anywhere, Choose your projects, Flexible schedule',
        'application_deadline': date.today() + timedelta(days=90)
    },
    {
        'employer': techcorp,
        'title': 'Freelance Video Editor',
        'description': 'Edit promotional videos and tutorials for our products.',
        'requirements': 'Video editing experience\nProficiency in Premiere Pro or Final Cut\nCreative storytelling ability',
        'responsibilities': 'Edit marketing videos\nAdd graphics and effects\nColor correction and audio mixing',
        'job_type': 'freelance',
        'experience_level': 'mid',
        'location': 'Remote',
        'remote': True,
        'salary_min': 500,
        'salary_max': 1500,
        'salary_currency': 'USD',
        'skills_required': 'Premiere Pro, After Effects, Color Grading, Audio Editing',
        'benefits': 'Project-based, Remote work, Creative freedom',
        'application_deadline': date.today() + timedelta(days=60)
    },
    
    # More full-time positions
    {
        'employer': created_employers[0],  # Google
        'title': 'Machine Learning Engineer',
        'description': 'Build and deploy ML models that power Google products used by billions.',
        'requirements': 'MS/PhD in CS or related field\n5+ years ML experience\nStrong Python and TensorFlow skills',
        'responsibilities': 'Develop ML models\nOptimize model performance\nDeploy to production',
        'job_type': 'full-time',
        'experience_level': 'senior',
        'location': 'San Francisco, CA',
        'remote': False,
        'salary_min': 180000,
        'salary_max': 250000,
        'salary_currency': 'USD',
        'skills_required': 'Python, TensorFlow, PyTorch, ML, Deep Learning',
        'benefits': 'Stock options, Health insurance, Free meals, Gym',
        'application_deadline': date.today() + timedelta(days=30)
    },
    {
        'employer': created_employers[1],  # Microsoft
        'title': 'Product Manager',
        'description': 'Lead product strategy and development for Microsoft 365 suite.',
        'requirements': '5+ years product management experience\nTechnical background\nExcellent communication',
        'responsibilities': 'Define product roadmap\nWork with engineering teams\nAnalyze user feedback',
        'job_type': 'full-time',
        'experience_level': 'senior',
        'location': 'Redmond, WA',
        'remote': True,
        'salary_min': 150000,
        'salary_max': 200000,
        'salary_currency': 'USD',
        'skills_required': 'Product Management, Agile, User Research, Analytics',
        'benefits': 'Stock options, Health insurance, Remote work, 401k',
        'application_deadline': date.today() + timedelta(days=40)
    },
    {
        'employer': created_employers[2],  # StartupCo
        'title': 'Frontend Developer',
        'description': 'Build beautiful, responsive web applications using modern frameworks.',
        'requirements': '3+ years React experience\nStrong CSS skills\nEye for design',
        'responsibilities': 'Develop user interfaces\nImplement responsive designs\nOptimize performance',
        'job_type': 'full-time',
        'experience_level': 'mid',
        'location': 'Austin, TX',
        'remote': True,
        'salary_min': 90000,
        'salary_max': 130000,
        'salary_currency': 'USD',
        'skills_required': 'React, JavaScript, CSS, HTML, TypeScript',
        'benefits': 'Startup equity, Health insurance, Remote work, Flexible hours',
        'application_deadline': date.today() + timedelta(days=35)
    },
    {
        'employer': created_employers[3],  # Design Studio
        'title': 'Senior Brand Designer',
        'description': 'Lead brand design projects for high-profile clients.',
        'requirements': '7+ years brand design experience\nStrong portfolio\nLeadership skills',
        'responsibilities': 'Create brand identities\nLead design projects\nMentor junior designers',
        'job_type': 'full-time',
        'experience_level': 'senior',
        'location': 'Los Angeles, CA',
        'remote': False,
        'salary_min': 100000,
        'salary_max': 140000,
        'salary_currency': 'USD',
        'skills_required': 'Branding, Adobe Creative Suite, Typography, Art Direction',
        'benefits': 'Health insurance, Creative environment, Portfolio building',
        'application_deadline': date.today() + timedelta(days=50)
    },
    {
        'employer': techcorp,
        'title': 'Backend Engineer',
        'description': 'Build scalable backend systems and APIs.',
        'requirements': '4+ years backend development\nNode.js or Python\nDatabase experience',
        'responsibilities': 'Design and implement APIs\nOptimize database queries\nEnsure system reliability',
        'job_type': 'full-time',
        'experience_level': 'mid',
        'location': 'Remote',
        'remote': True,
        'salary_min': 110000,
        'salary_max': 150000,
        'salary_currency': 'USD',
        'skills_required': 'Node.js, Python, PostgreSQL, MongoDB, AWS',
        'benefits': 'Remote work, Health insurance, Stock options, Learning budget',
        'application_deadline': date.today() + timedelta(days=45)
    },
]

# Create jobs
for job_data in jobs_data:
    Job.objects.create(**job_data)
    print(f"✓ Created job: {job_data['title']} at {job_data['employer'].company_name}")

print("\n" + "="*60)
print("✅ Successfully added more dummy data!")
print("="*60)
print(f"\nTotal jobs in database: {Job.objects.count()}")
print(f"Total employers: {Employer.objects.count()}")
print(f"Total candidates: {Candidate.objects.count()}")
print("\n📊 Jobs by type:")
print(f"  - Full-time: {Job.objects.filter(job_type='full-time').count()}")
print(f"  - Part-time: {Job.objects.filter(job_type='part-time').count()}")
print(f"  - Contract: {Job.objects.filter(job_type='contract').count()}")
print(f"  - Internship: {Job.objects.filter(job_type='internship').count()}")
print(f"  - Freelance: {Job.objects.filter(job_type='freelance').count()}")
print("\n🎉 You can now browse all these jobs on the frontend!")
