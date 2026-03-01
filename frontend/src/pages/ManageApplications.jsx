import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaCheck, FaTimes } from 'react-icons/fa';

const ManageApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('all');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (user?.user_type === 'employer') {
      fetchApplications();
      fetchMyJobs();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/applications/');
      setApplications(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyJobs = async () => {
    try {
      const response = await axios.get('/jobs/my_jobs/');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus, notes = '') => {
    try {
      await axios.post(`/applications/${applicationId}/update_status/`, {
        status: newStatus,
        notes: notes
      });
      
      // Refresh applications
      fetchApplications();
      alert('Application status updated successfully!');
    } catch (error) {
      alert('Failed to update status: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const filteredApplications = selectedJob === 'all' 
    ? applications 
    : applications.filter(app => app.job === parseInt(selectedJob));

  if (user?.user_type !== 'employer') {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600 mt-4">Only employers can manage applications.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Manage Applications</span>
        </h1>
        <p className="text-xl text-gray-600">Review and update candidate applications</p>
      </motion.div>

      {/* Filter by Job */}
      <div className="card-gradient rounded-2xl shadow-xl p-6 mb-8">
        <label className="block text-gray-700 font-semibold mb-2">Filter by Job</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="input-field max-w-md"
        >
          <option value="all">All Jobs ({applications.length})</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} ({applications.filter(app => app.job === job.id).length})
            </option>
          ))}
        </select>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="card-gradient rounded-3xl shadow-2xl p-12 text-center">
          <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Applications Yet</h3>
          <p className="text-gray-600">Applications will appear here when candidates apply</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredApplications.map((application, index) => (
            <ApplicationCard 
              key={application.id} 
              application={application} 
              index={index}
              onUpdateStatus={updateApplicationStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationCard = ({ application, index, onUpdateStatus }) => {
  const [showActions, setShowActions] = useState(false);
  const [notes, setNotes] = useState('');

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      reviewing: 'bg-blue-100 text-blue-800 border-blue-300',
      shortlisted: 'bg-green-100 text-green-800 border-green-300',
      interview: 'bg-purple-100 text-purple-800 border-purple-300',
      offered: 'bg-green-200 text-green-900 border-green-400',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      accepted: 'bg-green-300 text-green-900 border-green-500',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: '⏳' },
    { value: 'reviewing', label: 'Reviewing', icon: '👀' },
    { value: 'shortlisted', label: 'Shortlisted', icon: '⭐' },
    { value: 'interview', label: 'Interview', icon: '🎤' },
    { value: 'offered', label: 'Offered', icon: '🎉' },
    { value: 'rejected', label: 'Rejected', icon: '❌' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-gradient rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {application.candidate_details?.user?.first_name} {application.candidate_details?.user?.last_name}
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            Applied for: <span className="font-semibold">{application.job_details?.title}</span>
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(application.status)}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      {/* Candidate Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <FaEnvelope className="text-blue-600" />
          {application.candidate_details?.user?.email}
        </div>
        {application.candidate_details?.user?.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="text-green-600" />
            {application.candidate_details?.user?.phone}
          </div>
        )}
        {application.candidate_details?.user?.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-red-600" />
            {application.candidate_details?.user?.location}
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <FaUser className="text-purple-600" />
          {application.candidate_details?.experience_years} years experience
        </div>
      </div>

      {/* Skills */}
      {application.candidate_details?.skills && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {application.candidate_details.skills.split(',').map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cover Letter */}
      {application.cover_letter && (
        <div className="bg-white/50 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Cover Letter:</p>
          <p className="text-gray-600 text-sm whitespace-pre-line">{application.cover_letter}</p>
        </div>
      )}

      {/* Resume Link */}
      {application.resume && (
        <div className="mb-4">
          <a 
            href={`http://localhost:8000${application.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaFileAlt />
            View Resume
          </a>
        </div>
      )}

      {/* Action Buttons */}
      <div className="border-t pt-4 mt-4">
        <button
          onClick={() => setShowActions(!showActions)}
          className="btn-gradient mb-4"
        >
          {showActions ? 'Hide Actions' : 'Update Status'}
        </button>

        {showActions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Change Status:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {statusOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => onUpdateStatus(application.id, option.value, notes)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      application.status === option.value
                        ? 'bg-blue-500 text-white border-blue-600'
                        : 'bg-white hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    {option.icon} {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Add Notes (Optional):</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field min-h-[80px]"
                placeholder="Add internal notes about this candidate..."
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onUpdateStatus(application.id, 'shortlisted', 'Candidate looks promising')}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaCheck /> Shortlist
              </button>
              <button
                onClick={() => onUpdateStatus(application.id, 'rejected', 'Not a good fit at this time')}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaTimes /> Reject
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Applied Date */}
      <p className="text-gray-500 text-sm mt-4">
        Applied on {new Date(application.applied_at).toLocaleDateString()} at {new Date(application.applied_at).toLocaleTimeString()}
      </p>
    </motion.div>
  );
};

export default ManageApplications;
