import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { motion } from 'framer-motion';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    job_type: 'full-time',
    experience_level: 'mid',
    location: '',
    remote: false,
    salary_min: '',
    salary_max: '',
    salary_currency: 'USD',
    skills_required: '',
    benefits: '',
    application_deadline: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/jobs/', formData);
      alert('Job posted successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (user?.user_type !== 'employer') {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600 mt-4">Only employers can post jobs.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Post a New Job</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12">Find the perfect candidate for your team</p>

        <form onSubmit={handleSubmit} className="card-gradient rounded-3xl shadow-2xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Job Type *</label>
              <select
                value={formData.job_type}
                onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                className="input-field"
                required
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Experience Level *</label>
              <select
                value={formData.experience_level}
                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                className="input-field"
                required
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.remote}
              onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
              className="w-5 h-5 text-blue-600"
            />
            <label className="text-gray-700 font-semibold">Remote Position</label>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Min Salary</label>
              <input
                type="number"
                value={formData.salary_min}
                onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Max Salary</label>
              <input
                type="number"
                value={formData.salary_max}
                onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Currency</label>
              <select
                value={formData.salary_currency}
                onChange={(e) => setFormData({ ...formData, salary_currency: e.target.value })}
                className="input-field"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Job Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[150px]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Requirements *</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="input-field min-h-[150px]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Responsibilities *</label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              className="input-field min-h-[150px]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Skills Required * (comma-separated)</label>
            <input
              type="text"
              value={formData.skills_required}
              onChange={(e) => setFormData({ ...formData, skills_required: e.target.value })}
              className="input-field"
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Benefits</label>
            <textarea
              value={formData.benefits}
              onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              className="input-field min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Application Deadline</label>
            <input
              type="date"
              value={formData.application_deadline}
              onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient disabled:opacity-50"
          >
            {loading ? 'Posting Job...' : 'Post Job'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
