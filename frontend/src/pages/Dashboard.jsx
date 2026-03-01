import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaBriefcase, FaFileAlt, FaChartBar, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      if (user?.user_type === 'candidate') {
        const appsResponse = await axios.get('/applications/');
        const statsResponse = await axios.get('/applications/statistics/');
        setRecentItems(appsResponse.data.results || appsResponse.data);
        setStats(statsResponse.data);
      } else if (user?.user_type === 'employer') {
        const jobsResponse = await axios.get('/jobs/my_jobs/');
        setRecentItems(jobsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Welcome back, {user?.first_name || user?.username}!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {user?.user_type === 'candidate' ? 'Track your applications' : 'Manage your job postings'}
        </p>

        {/* Stats Cards */}
        {user?.user_type === 'candidate' && stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <StatCard
              icon={<FaFileAlt className="text-4xl text-blue-600" />}
              title="Total Applications"
              value={stats.total}
              color="blue"
            />
            <StatCard
              icon={<FaChartBar className="text-4xl text-green-600" />}
              title="Shortlisted"
              value={stats.shortlisted}
              color="green"
            />
            <StatCard
              icon={<FaBriefcase className="text-4xl text-purple-600" />}
              title="Interviews"
              value={stats.interview}
              color="purple"
            />
            <StatCard
              icon={<FaUsers className="text-4xl text-pink-600" />}
              title="Offers"
              value={stats.offered}
              color="pink"
            />
          </div>
        )}

        {/* Recent Items */}
        <div className="card-gradient rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {user?.user_type === 'candidate' ? 'Recent Applications' : 'Your Job Posts'}
            </h2>
            <Link
              to={user?.user_type === 'candidate' ? '/applications' : '/post-job'}
              className="btn-gradient px-6 py-2"
            >
              {user?.user_type === 'candidate' ? 'View All' : 'Post New Job'}
            </Link>
          </div>

          <div className="space-y-4">
            {recentItems.slice(0, 5).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 rounded-xl p-6 hover:shadow-lg transition-all"
              >
                {user?.user_type === 'candidate' ? (
                  <ApplicationItem application={item} />
                ) : (
                  <JobItem job={item} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="card-gradient rounded-2xl p-6 shadow-xl"
  >
    <div className="flex items-center gap-4">
      <div>{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
      </div>
    </div>
  </motion.div>
);

const ApplicationItem = ({ application }) => (
  <div className="flex justify-between items-center">
    <div>
      <h3 className="text-xl font-bold text-gray-800">{application.job_details?.title}</h3>
      <p className="text-gray-600">{application.job_details?.company_name}</p>
    </div>
    <div className="text-right">
      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
        {application.status}
      </span>
      <p className="text-gray-500 text-sm mt-2">
        {new Date(application.applied_at).toLocaleDateString()}
      </p>
    </div>
  </div>
);

const JobItem = ({ job }) => (
  <Link to={`/jobs/${job.id}`} className="flex justify-between items-center hover:text-blue-600">
    <div>
      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
      <p className="text-gray-600">{job.location} • {job.job_type}</p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-blue-600">{job.applications_count || 0}</p>
      <p className="text-gray-500 text-sm">Applications</p>
    </div>
  </Link>
);

const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    reviewing: 'bg-blue-100 text-blue-800',
    shortlisted: 'bg-green-100 text-green-800',
    interview: 'bg-purple-100 text-purple-800',
    offered: 'bg-green-200 text-green-900',
    rejected: 'bg-red-100 text-red-800',
    accepted: 'bg-green-300 text-green-900',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export default Dashboard;
