import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Basic',
      price: '$49',
      period: 'per takedown',
      description: 'Perfect for one-time removals',
      features: [
        'Single URL removal',
        'DMCA filing included',
        'Email support',
        '5-7 day turnaround',
        'Proof of removal',
        'No monthly commitment'
      ],
      cta: 'Start Takedown',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$199',
      period: 'per month',
      description: 'Best for active creators',
      features: [
        'Up to 50 URLs monitored',
        'Automated DMCA filing',
        'Client dashboard access',
        'Priority support',
        'Weekly monitoring reports',
        'Reupload detection',
        'Email & dashboard alerts',
        '3-5 day turnaround'
      ],
      cta: 'Start Pro Plan',
      highlight: true
    },
    {
      name: 'VIP',
      price: '$599',
      period: 'per month',
      description: 'Complete protection & priority service',
      features: [
        'Unlimited URL monitoring',
        'Priority 24h response',
        'Legal escalation support',
        'Privacy remediation',
        'Dedicated case specialist',
        'Daily monitoring reports',
        'Brand monitoring',
        'Reputation management',
        'Direct phone support',
        '24-48 hour turnaround'
      ],
      cta: 'Start VIP Plan',
      highlight: false
    }
  ];

  const addOns = [
    {
      name: 'Priority Processing',
      price: '$99',
      description: 'Move your case to the front of the queue for faster processing (24-48h).'
    },
    {
      name: 'Legal Escalation',
      price: '$299',
      description: 'Send cease & desist letters when standard DMCA fails.'
    },
    {
      name: 'Privacy Package',
      price: '$199',
      description: 'Remove personal info, address, and doxing attempts from web and search results.'
    },
    {
      name: 'Bulk Takedowns',
      price: 'Custom',
      description: 'Need to remove 100+ URLs? Contact us for volume pricing.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            No hidden fees. Cancel anytime. Choose the plan that protects your content.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl ${
                  tier.highlight
                    ? 'border-blue-900 bg-blue-50 relative transform scale-105 shadow-xl'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="flex items-baseline">
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
                    size="lg"
                    className={`w-full ${
                      tier.highlight
                        ? 'bg-blue-900 hover:bg-blue-800 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optional Add-Ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your protection with additional services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{addon.name}</h3>
                  <span className="text-lg font-bold text-blue-900">{addon.price}</span>
                </div>
                <p className="text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes! Pro and VIP plans are month-to-month with no long-term commitment. Cancel anytime from your dashboard.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you guarantee content removal?
              </h3>
              <p className="text-gray-600">
                While we can't provide absolute guarantees (compliance is up to the hosting provider), we have a 98% success rate and will escalate with legal action if needed.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and cryptocurrency for your privacy and convenience.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my information kept confidential?
              </h3>
              <p className="text-gray-600">
                Absolutely. All files are encrypted, and we never share your information with anyone. Your privacy is our top priority.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/faq">
              <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                View All FAQs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;