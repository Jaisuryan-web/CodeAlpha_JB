import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import Applications from './pages/Applications';
import ManageApplications from './pages/ManageApplications';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/manage-applications" element={<ManageApplications />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
