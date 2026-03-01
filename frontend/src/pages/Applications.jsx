import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaFileAlt } from 'react-icons/fa';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

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

  const fetchStats = async () => {
    try {
      const response = await axios.get('/applications/statistics/');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      reviewing: 'bg-blue-100 text-blue-800 border-blue-300',
      shortlisted: 'bg-green-100 text-green-800 border-green-300',
      interview: 'bg-purple-100 text-purple-800 border-purple-300',
      offered: 'bg-green-200 text-green-900 border-green-400',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      accepted: 'bg-green-300 text-green-900 border-green-500',
      withdrawn: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">My Applications</span>
        </h1>
        <p className="text-xl text-gray-600">Track your job applications</p>
      </motion.div>

      {/* Statistics */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total" value={stats.total} color="blue" />
          <StatCard title="Pending" value={stats.pending} color="yellow" />
          <StatCard title="Shortlisted" value={stats.shortlisted} color="green" />
          <StatCard title="Interviews" value={stats.interview} color="purple" />
        </div>
      )}

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="card-gradient rounded-3xl shadow-2xl p-12 text-center">
          <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Applications Yet</h3>
          <p className="text-gray-600 mb-6">Start applying for jobs to see them here</p>
          <Link to="/jobs" className="btn-gradient inline-block">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((application, index) => (
            <ApplicationCard key={application.id} application={application} index={index} getStatusColor={getStatusColor} />
          ))}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="card-gradient rounded-2xl p-6 shadow-xl"
    >
      <p className="text-gray-600 text-sm mb-2">{title}</p>
      <p className={`text-4xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
        {value}
      </p>
    </motion.div>
  );
};

const ApplicationCard = ({ application, index, getStatusColor }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="card-gradient rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
  >
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Link 
              to={`/jobs/${application.job_details?.id}`}
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {application.job_details?.title}
            </Link>
            <p className="text-lg text-gray-600 mt-1">{application.job_details?.company_name}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(application.status)}`}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-600" />
            {application.job_details?.location}
          </span>
          <span className="flex items-center gap-2">
            <FaBriefcase className="text-purple-600" />
            {application.job_details?.job_type}
          </span>
          <span className="flex items-center gap-2">
            <FaClock className="text-orange-600" />
            Applied {new Date(application.applied_at).toLocaleDateString()}
          </span>
        </div>

        {application.cover_letter && (
          <div className="bg-white/50 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Cover Letter:</p>
            <p className="text-gray-600 text-sm line-clamp-3">{application.cover_letter}</p>
          </div>
        )}

        {application.notes && (
          <div className="bg-blue-50 rounded-lg p-4 mt-4 border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-blue-700 mb-2">Employer Notes:</p>
            <p className="text-blue-600 text-sm">{application.notes}</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

export default Applications;
