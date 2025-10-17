import React from 'react';
import { FileText, Search, Shield, Lock, AlertCircle, Zap } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: 'DMCA Takedowns',
      description: 'Professional copyright enforcement with legal DMCA notices filed on your behalf.',
      color: 'bg-blue-100 text-blue-900'
    },
    {
      icon: Search,
      title: 'Proactive Monitoring',
      description: 'Continuous scans across the web to detect unauthorized use of your content.',
      color: 'bg-cyan-100 text-cyan-700'
    },
    {
      icon: Shield,
      title: 'Copyright Protection',
      description: 'Full copyright enforcement including legal escalation when needed.',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Encrypted storage and confidential handling of all your sensitive content.',
      color: 'bg-green-100 text-green-700'
    },
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'Most takedowns filed within 24-48 hours, with priority options available.',
      color: 'bg-orange-100 text-orange-700'
    },
    {
      icon: AlertCircle,
      title: 'Reupload Detection',
      description: 'Automated alerts when removed content appears again on other sites.',
      color: 'bg-red-100 text-red-700'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Content Protection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to protect your content, enforce your rights, and maintain your privacy online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;