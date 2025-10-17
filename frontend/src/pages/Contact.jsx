import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: 'We\'ll get back to you within 24-48 hours.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600">
            Have questions? Need help with a takedown? We're here to support you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your situation..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                All inquiries are handled confidentially. We typically respond within 24-48 hours.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Mail className="h-6 w-6 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Support</h4>
                      <p className="text-gray-600">support@contentguard.com</p>
                      <p className="text-sm text-gray-500 mt-1">Response within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-cyan-100 p-3 rounded-xl">
                      <MessageSquare className="h-6 w-6 text-cyan-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Client Portal</h4>
                      <p className="text-gray-600">Secure messaging for existing clients</p>
                      <p className="text-sm text-gray-500 mt-1">Login to access your dashboard</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                      <p className="text-sm text-gray-500 mt-1">Emergency cases: 24/7 for VIP clients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Note */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Your Privacy Matters
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All communications are encrypted and confidential. We never share your information with third parties. If you prefer to remain anonymous initially, feel free to use a pseudonym in the contact form.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Need Immediate Help?
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/faq" className="text-blue-900 hover:underline">
                      Check our FAQ for quick answers
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="text-blue-900 hover:underline">
                      View pricing and plans
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="text-blue-900 hover:underline">
                      Start a takedown now (requires login)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;