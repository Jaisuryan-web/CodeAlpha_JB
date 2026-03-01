import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaBuilding } from 'react-icons/fa';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    cover_letter: '',
    resume: null,
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`/jobs/${id}/`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      const formData = new FormData();
      formData.append('job', job.id);
      formData.append('cover_letter', applicationData.cover_letter);
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }

      await axios.post('/applications/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Application submitted successfully!');
      navigate('/applications');
    } catch (error) {
      console.error('Application error:', error.response?.data);
      const errorMsg = error.response?.data?.detail || 
                       error.response?.data?.error || 
                       JSON.stringify(error.response?.data) ||
                       'Failed to submit application';
      alert(errorMsg);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card-gradient rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-start gap-6 mb-6">
            {job.employer_details?.company_logo && (
              <img
                src={job.employer_details.company_logo}
                alt={job.employer_details.company_name}
                className="w-24 h-24 rounded-xl object-cover"
              />
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{job.employer_details?.company_name}</p>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  {job.location}
                  {job.remote && <span className="text-green-600 font-semibold">(Remote)</span>}
                </span>
                <span className="flex items-center gap-2">
                  <FaBriefcase className="text-purple-600" />
                  {job.job_type}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock className="text-orange-600" />
                  {job.experience_level}
                </span>
                {job.salary_min && (
                  <span className="flex items-center gap-2">
                    <FaDollarSign className="text-green-600" />
                    {job.salary_currency} {job.salary_min} - {job.salary_max}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Section title="Job Description" content={job.description} />
            <Section title="Requirements" content={job.requirements} />
            <Section title="Responsibilities" content={job.responsibilities} />
            
            {job.benefits && <Section title="Benefits" content={job.benefits} />}
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills_required.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        {user?.user_type === 'candidate' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card-gradient rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="gradient-text">Apply for this Position</span>
            </h2>

            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
                <textarea
                  value={applicationData.cover_letter}
                  onChange={(e) => setApplicationData({ ...applicationData, cover_letter: e.target.value })}
                  className="input-field min-h-[150px]"
                  placeholder="Tell us why you're a great fit for this role..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload Resume (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.files[0] })}
                  className="input-field"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <button
                type="submit"
                disabled={applying}
                className="w-full btn-gradient disabled:opacity-50"
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const Section = ({ title, content }) => (
  <div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 whitespace-pre-line">{content}</p>
  </div>
);

export default JobDetail;
