import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FileText, Search, Shield, Lock, AlertCircle, Zap, Scale, Eye } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: FileText,
      title: 'One-off Takedown',
      price: 'Starting at $49',
      description: 'Fast individual URL removals for leaked or stolen content.',
      features: [
        'Single URL removal',
        'DMCA filing included',
        'Email support',
        '5-7 day turnaround',
        'Proof of removal provided'
      ],
      color: 'bg-blue-100 text-blue-900'
    },
    {
      icon: Search,
      title: 'Monthly Monitoring',
      price: 'From $199/month',
      description: 'Continuous web scans to detect and remove unauthorized content.',
      features: [
        'Up to 50 URLs monitored',
        'Automated DMCA filing',
        'Client dashboard access',
        'Weekly monitoring reports',
        'Reupload detection & removal'
      ],
      color: 'bg-cyan-100 text-cyan-700',
      popular: true
    },
    {
      icon: Shield,
      title: 'VIP Protection',
      price: 'From $599/month',
      description: 'Priority response, legal escalation, and comprehensive privacy protection.',
      features: [
        'Unlimited URL monitoring',
        'Priority 24h response',
        'Legal escalation support',
        'Privacy remediation',
        'Dedicated specialist',
        'Daily monitoring reports'
      ],
      color: 'bg-purple-100 text-purple-700'
    }
  ];

  const additionalServices = [
    {
      icon: Lock,
      title: 'Privacy Remediation',
      description: 'Remove personal information and doxing attempts from search engines and websites.'
    },
    {
      icon: Scale,
      title: 'Legal Escalation',
      description: 'When standard DMCA fails, we escalate with legal action and cease & desist letters.'
    },
    {
      icon: AlertCircle,
      title: 'Brand Monitoring',
      description: 'Monitor for unauthorized use of your brand name, stage name, or trademarks.'
    },
    {
      icon: Eye,
      title: 'Reputation Management',
      description: 'Ongoing monitoring and removal of negative or defamatory content about you.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive protection packages designed for content creators at every level.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                    service.popular
                      ? 'border-blue-900 bg-blue-50 relative transform scale-105'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-lg font-semibold text-blue-900 mb-4">{service.price}</p>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Zap className="h-5 w-5 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/dashboard">
                    <Button
                      className={`w-full ${
                        service.popular
                          ? 'bg-blue-900 hover:bg-blue-800 text-white'
                          : 'bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive protection beyond standard DMCA takedowns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different?
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Specialized for Adult Creators</h3>
              <p className="text-gray-700 leading-relaxed">
                We understand the unique challenges OnlyFans and adult content creators face. Our team has extensive experience with adult platforms, tube sites, and unauthorized content distribution networks. We handle every case with complete discretion and professionalism.
              </p>
            </div>

            <div className="bg-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparent Process & Pricing</h3>
              <p className="text-gray-700 leading-relaxed">
                No hidden fees, no surprises. Track every step of your case in your secure dashboard. Get regular updates via email and see exactly what we're doing to protect your content. Our pricing is clear and straightforward - you'll always know what you're paying for.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confidential & Secure</h3>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is paramount. All files are encrypted, all communications are confidential, and we never share your information with third parties. Your content and personal details are stored securely and only accessible to authorized team members working on your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;