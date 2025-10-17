import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Shield, ArrowLeft, FileText, Clock, CheckCircle, AlertCircle, Plus, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CaseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [case_, setCase] = useState(null);
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [addingUrl, setAddingUrl] = useState(false);

  useEffect(() => {
    fetchCaseDetails();
  }, [id]);

  const fetchCaseDetails = async () => {
    try {
      const [caseResponse, targetsResponse] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/cases/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
          }
        }),
        axios.get(`${BACKEND_URL}/api/cases/${id}/targets`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
          }
        })
      ]);
      setCase(caseResponse.data);
      setTargets(targetsResponse.data);
    } catch (error) {
      console.error('Failed to fetch case:', error);
      toast({
        title: 'Error',
        description: 'Failed to load case details.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setAddingUrl(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/cases/${id}/targets`,
        { urls: [newUrl] },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
          }
        }
      );
      setNewUrl('');
      fetchCaseDetails();
      toast({
        title: 'URL Added',
        description: 'Target URL has been added to the case.',
      });
    } catch (error) {
      console.error('Failed to add URL:', error);
      toast({
        title: 'Error',
        description: 'Failed to add URL. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setAddingUrl(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      submitted: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Submitted' },
      filed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: FileText, label: 'Filed' },
      in_review: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Clock, label: 'In Review' },
      removed: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Removed' },
      denied: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle, label: 'Denied' },
      pending: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Clock, label: 'Pending' },
      failed: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle, label: 'Failed' }
    };
    return configs[status] || configs.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!case_) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Case not found</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(case_.status);
  const StatusIcon = statusConfig.icon;

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
                <p className="text-sm text-gray-500">Case Details</p>
              </div>
            </div>
            <Link to="/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Case Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{case_.title}</h1>
              <p className="text-gray-600">{case_.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${statusConfig.color} flex items-center space-x-2`}>
              <StatusIcon className="h-5 w-5" />
              <span className="font-semibold">{statusConfig.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Case ID</p>
              <p className="font-mono text-sm text-gray-900">{case_.id.slice(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Created</p>
              <p className="text-gray-900">{new Date(case_.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Priority</p>
              <p className="text-gray-900 capitalize">{case_.priority || 'Normal'}</p>
            </div>
          </div>
        </div>

        {/* Target URLs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Target URLs ({targets.length})</h2>
          </div>

          {/* Add URL Form */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <form onSubmit={handleAddUrl} className="flex space-x-3">
              <Input
                type="url"
                placeholder="https://example.com/unauthorized-content"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={addingUrl || !newUrl.trim()}>
                <Plus className="h-5 w-5 mr-2" />
                {addingUrl ? 'Adding...' : 'Add URL'}
              </Button>
            </form>
          </div>

          {/* URLs List */}
          <div className="divide-y divide-gray-200">
            {targets.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No target URLs added yet.</p>
              </div>
            ) : (
              targets.map((target) => {
                const targetStatus = getStatusConfig(target.status);
                const TargetIcon = targetStatus.icon;
                return (
                  <div key={target.id} className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <a
                            href={target.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-900 hover:underline font-medium break-all"
                          >
                            {target.url}
                          </a>
                          <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </div>
                        <p className="text-sm text-gray-500">Domain: {target.domain}</p>
                        {target.last_checked_at && (
                          <p className="text-xs text-gray-400 mt-1">
                            Last checked: {new Date(target.last_checked_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-lg border ${targetStatus.color} flex items-center space-x-1 flex-shrink-0`}>
                        <TargetIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{targetStatus.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Timeline / Updates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Case Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Case Created</p>
                <p className="text-sm text-gray-600">{new Date(case_.created_at).toLocaleString()}</p>
              </div>
            </div>
            {case_.status !== 'submitted' && (
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-blue-900" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Status: {statusConfig.label}</p>
                  <p className="text-sm text-gray-600">Updated {new Date(case_.updated_at).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetails;