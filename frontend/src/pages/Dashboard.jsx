import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Shield, Plus, FileText, Clock, CheckCircle, AlertCircle, LogOut, User } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({ total: 0, filed: 0, removed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/cases`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
        }
      });
      setCases(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const filed = response.data.filter(c => c.status === 'filed' || c.status === 'in_review').length;
      const removed = response.data.filter(c => c.status === 'removed').length;
      const pending = response.data.filter(c => c.status === 'submitted').length;
      setStats({ total, filed, removed, pending });
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      submitted: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      filed: { color: 'bg-blue-100 text-blue-800', icon: FileText },
      in_review: { color: 'bg-purple-100 text-purple-800', icon: Clock },
      removed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      denied: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    const { color, icon: Icon } = config[status] || config.submitted;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}`}>
        <Icon className="h-4 w-4 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link to="/" className="text-xl font-bold text-gray-900">ContentGuard</Link>
                <p className="text-sm text-gray-500">Client Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.picture && (
                  <img src={user.picture} alt="Profile" className="h-8 w-8 rounded-full" />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" onClick={logout} className="text-gray-600">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Manage your takedown cases and monitor your content protection.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Cases</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-3xl font-bold text-blue-900">{stats.filed}</p>
              </div>
              <Clock className="h-10 w-10 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Removed</p>
                <p className="text-3xl font-bold text-green-600">{stats.removed}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <AlertCircle className="h-10 w-10 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <Link to="/dashboard/new-case">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white">
              <Plus className="h-5 w-5 mr-2" />
              New Takedown Case
            </Button>
          </Link>
        </div>

        {/* Cases List */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Cases</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-900 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading cases...</p>
              </div>
            ) : cases.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No cases yet. Create your first takedown request!</p>
                <Link to="/dashboard/new-case">
                  <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                    Create First Case
                  </Button>
                </Link>
              </div>
            ) : (
              cases.map((case_) => (
                <Link
                  key={case_.id}
                  to={`/dashboard/cases/${case_.id}`}
                  className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{case_.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Created {new Date(case_.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Priority: {case_.priority || 'Normal'}</span>
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(case_.status)}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;