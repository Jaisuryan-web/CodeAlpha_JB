import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Find Your Dream Job</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and ambitions
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/jobs" className="btn-gradient text-lg px-8 py-4">
              Browse Jobs
            </Link>
            <Link to="/register" className="px-8 py-4 rounded-lg border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200">
              Post a Job
            </Link>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-gradient rounded-2xl shadow-2xl p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="input-field flex-1"
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input-field flex-1"
                />
                <button className="btn-gradient flex items-center justify-center gap-2">
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<FaBriefcase className="text-5xl text-blue-600" />}
            title="Thousands of Jobs"
            description="Browse through thousands of job listings from top companies worldwide"
          />
          <FeatureCard
            icon={<FaUsers className="text-5xl text-purple-600" />}
            title="Top Employers"
            description="Connect with leading companies looking for talented professionals"
          />
          <FeatureCard
            icon={<FaChartLine className="text-5xl text-pink-600" />}
            title="Career Growth"
            description="Track your applications and grow your career with our platform"
          />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="card-gradient rounded-3xl shadow-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Active Jobs" />
            <StatCard number="5,000+" label="Companies" />
            <StatCard number="50,000+" label="Candidates" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -10 }}
    className="card-gradient rounded-2xl p-8 shadow-xl text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <div>
    <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{number}</div>
    <div className="text-gray-600 text-lg">{label}</div>
  </div>
);

export default Home;
