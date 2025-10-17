import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Upload, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Proof',
      description: 'Securely upload the protected content and proof of ownership.'
    },
    {
      icon: FileText,
      title: 'We File DMCA',
      description: 'We draft & submit takedowns to offending sites and host providers.'
    },
    {
      icon: CheckCircle,
      title: 'Monitor & Enforce',
      description: 'Continuous scans and repeat filings until removed.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$49',
      period: 'per takedown',
      features: [
        'Single URL removal',
        'Email support',
        'DMCA filing included',
        '5-7 day turnaround'
      ]
    },
    {
      name: 'Pro',
      price: '$199',
      period: 'per month',
      features: [
        'Up to 50 URLs monitored',
        'Auto-DMCA filing',
        'Client dashboard access',
        'Priority support',
        'Weekly reports'
      ],
      popular: true
    },
    {
      name: 'VIP',
      price: '$599',
      period: 'per month',
      features: [
        'Unlimited monitoring',
        'Priority response (24h)',
        'Legal escalation',
        'Privacy remediation',
        'Dedicated specialist',
        'Daily reports'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <StatsSection />
      <FeaturesSection />

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to protect your content and remove unauthorized copies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="bg-blue-900 p-6 rounded-2xl">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-cyan-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the protection plan that fits your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                  tier.popular
                    ? 'border-blue-900 bg-blue-50 relative'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-2">/{tier.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard">
                  <Button
                    className={`w-full ${
                      tier.popular
                        ? 'bg-blue-900 hover:bg-blue-800 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                View Full Pricing Details
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of creators who trust us to protect their work and privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 h-14 px-8 text-lg">
                Start a Takedown Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;