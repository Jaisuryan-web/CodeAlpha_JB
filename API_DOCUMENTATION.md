# 📚 Job Board API Documentation

Base URL: `http://localhost:8000/api`

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register/
```
**Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "password2": "string",
  "first_name": "string",
  "last_name": "string",
  "user_type": "candidate|employer",
  "phone": "string",
  "location": "string"
}
```

### Login
```http
POST /auth/login/
```
**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "access": "jwt_token",
  "refresh": "refresh_token",
  "user": { ... }
}
```

### Get Profile
```http
GET /auth/profile/
```
**Headers:** `Authorization: Bearer {access_token}`

---

## 💼 Job Endpoints

### List All Jobs
```http
GET /jobs/
```
**Query Parameters:**
- `search` - Search in title, description, skills
- `job_type` - full-time, part-time, contract, internship, freelance
- `experience_level` - entry, mid, senior, lead, executive
- `location` - Filter by location
- `remote` - true/false
- `ordering` - created_at, salary_min, views_count

**Example:**
```
GET /jobs/?search=developer&job_type=full-time&remote=true
```

### Get Job Details
```http
GET /jobs/{id}/
```

### Create Job (Employer Only)
```http
POST /jobs/
```
**Headers:** `Authorization: Bearer {access_token}`
**Body:**
```json
{
  "title": "string",
  "description": "string",
  "requirements": "string",
  "responsibilities": "string",
  "job_type": "full-time",
  "experience_level": "mid",
  "location": "string",
  "remote": false,
  "salary_min": 100000,
  "salary_max": 150000,
  "salary_currency": "USD",
  "skills_required": "Python, Django, React",
  "benefits": "string",
  "application_deadline": "2026-04-01"
}
```

### Update Job
```http
PUT /jobs/{id}/
PATCH /jobs/{id}/
```

### Delete Job
```http
DELETE /jobs/{id}/
```

### Get My Jobs (Employer Only)
```http
GET /jobs/my_jobs/
```

---

## 📝 Application Endpoints

### List Applications
```http
GET /applications/
```
**Headers:** `Authorization: Bearer {access_token}`
- Candidates see their applications
- Employers see applications for their jobs

### Create Application (Candidate Only)
```http
POST /applications/
```
**Headers:** 
- `Authorization: Bearer {access_token}`
- `Content-Type: multipart/form-data`

**Body (Form Data):**
- `job` - Job ID
- `cover_letter` - Text
- `resume` - File upload

### Get Application Details
```http
GET /applications/{id}/
```

### Update Application Status (Employer Only)
```http
POST /applications/{id}/update_status/
```
**Body:**
```json
{
  "status": "pending|reviewing|shortlisted|interview|offered|rejected|accepted|withdrawn",
  "notes": "string"
}
```

### Get Application Statistics
```http
GET /applications/statistics/
```
**Response:**
```json
{
  "total": 10,
  "pending": 3,
  "reviewing": 2,
  "shortlisted": 2,
  "interview": 1,
  "offered": 1,
  "rejected": 1,
  "accepted": 0
}
```

---

## 👥 User Management Endpoints

### List Candidates
```http
GET /auth/candidates/
```

### Get Candidate Details
```http
GET /auth/candidates/{id}/
```

### Update Candidate Profile
```http
PUT /auth/candidates/{id}/
PATCH /auth/candidates/{id}/
```

### List Employers
```http
GET /auth/employers/
```

### Get Employer Details
```http
GET /auth/employers/{id}/
```

### Update Employer Profile
```http
PUT /auth/employers/{id}/
PATCH /auth/employers/{id}/
```

---

## 🔄 Token Refresh

### Refresh Access Token
```http
POST /token/refresh/
```
**Body:**
```json
{
  "refresh": "refresh_token"
}
```
**Response:**
```json
{
  "access": "new_access_token"
}
```

---

## 📊 Response Formats

### Success Response
```json
{
  "id": 1,
  "field": "value",
  ...
}
```

### Error Response
```json
{
  "error": "Error message",
  "detail": "Detailed error information"
}
```

### Paginated Response
```json
{
  "count": 100,
  "next": "http://localhost:8000/api/jobs/?page=2",
  "previous": null,
  "results": [...]
}
```

---

## 🔒 Authentication

Most endpoints require JWT authentication. Include the token in the header:

```
Authorization: Bearer {your_access_token}
```

Access tokens expire after 24 hours. Use the refresh token to get a new access token.

---

## 📝 Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "password2": "password123",
    "first_name": "Test",
    "last_name": "User",
    "user_type": "candidate"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Get Jobs
```bash
curl http://localhost:8000/api/jobs/
```

### Get Jobs with Auth
```bash
curl http://localhost:8000/api/jobs/ \
  -H "Authorization: Bearer {your_token}"
```

---

## 🎯 Common Use Cases

### 1. Job Seeker Flow
1. Register as candidate
2. Login to get token
3. Browse jobs (GET /jobs/)
4. View job details (GET /jobs/{id}/)
5. Apply for job (POST /applications/)
6. Check application status (GET /applications/)

### 2. Employer Flow
1. Register as employer
2. Login to get token
3. Post job (POST /jobs/)
4. View applications (GET /applications/)
5. Update application status (POST /applications/{id}/update_status/)
6. View statistics (GET /applications/statistics/)

---

## 📦 File Uploads

For endpoints that accept file uploads (resumes, logos), use `multipart/form-data`:

```javascript
const formData = new FormData();
formData.append('job', jobId);
formData.append('cover_letter', 'My cover letter...');
formData.append('resume', fileObject);

axios.post('/applications/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🔍 Search & Filter Examples

### Search for React jobs
```
GET /jobs/?search=react
```

### Remote full-time jobs
```
GET /jobs/?job_type=full-time&remote=true
```

### Senior positions in New York
```
GET /jobs/?experience_level=senior&location=New York
```

### Sort by salary
```
GET /jobs/?ordering=-salary_min
```

---

Happy coding! 🚀
