import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBriefcase, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-effect sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FaBriefcase className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold gradient-text">JobBoard</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Browse Jobs
            </Link>
            {user?.user_type === 'employer' && (
              <>
                <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Post Job
                </Link>
                <Link to="/manage-applications" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Applications
                </Link>
              </>
            )}
            {user?.user_type === 'candidate' && (
              <Link to="/applications" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                My Applications
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <FaUser />
                  <span className="hidden md:inline">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <FaSignOutAlt />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-gradient">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
