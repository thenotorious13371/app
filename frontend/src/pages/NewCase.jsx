import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Shield, ArrowLeft, AlertCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const NewCase = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urls: '',
    priority: 'normal'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create case
      const caseResponse = await axios.post(
        `${BACKEND_URL}/api/cases`,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
          }
        }
      );

      const caseId = caseResponse.data.id;

      // Add URLs if provided
      if (formData.urls.trim()) {
        const urlList = formData.urls.split('\n').filter(url => url.trim());
        await axios.post(
          `${BACKEND_URL}/api/cases/${caseId}/targets`,
          { urls: urlList },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${document.cookie.split('session_token=')[1]?.split(';')[0]}`
            }
          }
        );
      }

      toast({
        title: 'Case Created!',
        description: 'Your takedown case has been submitted successfully.',
      });

      navigate(`/dashboard/cases/${caseId}`);
    } catch (error) {
      console.error('Failed to create case:', error);
      toast({
        title: 'Error',
        description: 'Failed to create case. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link to="/" className="text-xl font-bold text-gray-900">ContentGuard</Link>
                <p className="text-sm text-gray-500">New Takedown Case</p>
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
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Takedown Case
            </h1>
            <p className="text-gray-600">
              Provide details about the unauthorized content you'd like removed.
            </p>
          </div>

          {/* Legal Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Copyright Ownership Declaration</p>
                <p>
                  By submitting this form, you confirm that you are the copyright owner (or authorized agent) of the content provided and that the material has been used without your permission. You authorize ContentGuard to act on your behalf for removal.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Case Title *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Leaked OnlyFans content on example-site.com"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">A brief description to identify this case.</p>
            </div>

            <div>
              <Label htmlFor="description">Case Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide details about the unauthorized content, where it's posted, and any relevant context..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include as much detail as possible to help us process your case quickly.
              </p>
            </div>

            <div>
              <Label htmlFor="urls">Unauthorized URLs</Label>
              <Textarea
                id="urls"
                name="urls"
                placeholder="https://example.com/leaked-content\nhttps://another-site.com/my-content\n(One URL per line)"
                value={formData.urls}
                onChange={handleChange}
                rows={8}
                className="mt-2 font-mono text-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                List all URLs where your content appears without permission. One URL per line.
              </p>
            </div>

            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="normal">Normal (5-7 days)</option>
                <option value="high">High (3-5 days, +$99)</option>
                <option value="urgent">Urgent (24-48h, +$199)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Higher priority cases are processed faster. Additional fees apply.
              </p>
            </div>

            <div className="pt-4 flex space-x-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white"
                disabled={loading}
              >
                {loading ? 'Creating Case...' : 'Submit Takedown Case'}
              </Button>
              <Link to="/dashboard" className="flex-shrink-0">
                <Button type="button" size="lg" variant="outline" className="border-gray-300">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>

          {/* Privacy Note */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Privacy Notice:</strong> All files and information you provide are encrypted and stored securely. Only authorized team members working on your case will have access. Read our full <a href="#" className="text-blue-900 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCase;