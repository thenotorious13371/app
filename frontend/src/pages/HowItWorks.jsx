import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Upload, FileText, CheckCircle, Search, Shield, Clock } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: '1. Upload Proof',
      description: 'Securely upload the protected content and proof of ownership',
      details: [
        'Upload original content files or screenshots',
        'Provide proof of copyright ownership',
        'List all unauthorized URLs where content appears',
        'All files encrypted and stored securely'
      ]
    },
    {
      icon: FileText,
      title: '2. We File DMCA',
      description: 'We draft & submit takedowns to offending sites and host providers',
      details: [
        'Legal DMCA notices drafted by our team',
        'Filed with hosting providers and platforms',
        'Follow-up communications handled',
        'Track filing status in your dashboard'
      ]
    },
    {
      icon: CheckCircle,
      title: '3. Content Removed',
      description: 'Most content removed within 24-72 hours of filing',
      details: [
        'Typical removal: 24-72 hours',
        'Status updates via email and dashboard',
        'Confirmation when content is removed',
        'Legal escalation if needed'
      ]
    },
    {
      icon: Search,
      title: '4. Ongoing Monitoring',
      description: 'Continuous scans and repeat filings until removed (Pro/VIP plans)',
      details: [
        'Automated web scanning for reuploads',
        'Instant alerts when content reappears',
        'Automatic re-filing of takedowns',
        'Weekly or daily monitoring reports'
      ]
    }
  ];

  const timeline = [
    { time: '0-24h', event: 'Case submitted and reviewed', status: 'submit' },
    { time: '24-48h', event: 'DMCA notices filed', status: 'filed' },
    { time: '48-72h', event: 'Initial removal responses', status: 'progress' },
    { time: '3-7 days', event: 'Most content removed', status: 'complete' },
    { time: 'Ongoing', event: 'Monitoring for reuploads', status: 'monitor' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600">
            Our proven process removes unauthorized content quickly and keeps it down.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-900 p-6 rounded-2xl">
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Typical Timeline
            </h2>
            <p className="text-xl text-gray-600">
              Most takedowns complete within 3-7 days from submission.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-32">
                  <div className="bg-blue-900 text-white px-4 py-2 rounded-lg text-center font-semibold">
                    {item.time}
                  </div>
                </div>
                <div className="flex-1 ml-8">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                    <p className="text-lg font-semibold text-gray-900">{item.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ContentGuard?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-blue-100 p-6 rounded-2xl">
                  <Shield className="h-10 w-10 text-blue-900" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Specialized Experience</h3>
              <p className="text-gray-600">
                We understand adult creator platforms and handle cases with complete confidentiality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-cyan-100 p-6 rounded-2xl">
                  <Clock className="h-10 w-10 text-cyan-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Fast Response</h3>
              <p className="text-gray-600">
                Most takedowns filed within 24-48 hours, with priority options available.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-purple-100 p-6 rounded-2xl">
                  <FileText className="h-10 w-10 text-purple-700" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Transparent Process</h3>
              <p className="text-gray-600">
                Track every step in your dashboard with regular updates and progress reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;