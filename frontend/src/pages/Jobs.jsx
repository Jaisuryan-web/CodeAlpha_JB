import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaSearch } from 'react-icons/fa';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    job_type: '',
    location: '',
    remote: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.job_type) params.append('job_type', filters.job_type);
      if (filters.location) params.append('location', filters.location);
      if (filters.remote) params.append('remote', filters.remote);

      const response = await axios.get(`/jobs/?${params.toString()}`);
      setJobs(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Browse Jobs</span>
        </h1>
        <p className="text-xl text-gray-600">Find your perfect opportunity</p>
      </motion.div>

      {/* Filters */}
      <div className="card-gradient rounded-2xl shadow-xl p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field pl-12"
            />
          </div>

          <select
            value={filters.job_type}
            onChange={(e) => setFilters({ ...filters, job_type: e.target.value })}
            className="input-field"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="input-field"
          />

          <select
            value={filters.remote}
            onChange={(e) => setFilters({ ...filters, remote: e.target.value })}
            className="input-field"
          >
            <option value="">All Locations</option>
            <option value="true">Remote Only</option>
            <option value="false">On-site Only</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const JobCard = ({ job, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
    className="card-gradient rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
  >
    <Link to={`/jobs/${job.id}`}>
      <div className="flex items-start gap-6">
        {job.company_logo && (
          <img
            src={job.company_logo}
            alt={job.company_name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-lg text-gray-600 mb-4">{job.company_name}</p>
          
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

        <button className="btn-gradient px-6 py-2 text-sm">
          View Details
        </button>
      </div>
    </Link>
  </motion.div>
);

export default Jobs;
