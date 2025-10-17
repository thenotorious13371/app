import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Users, Lock, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Copyright Protection',
      description: 'Expert knowledge of DMCA law, copyright enforcement, and international treaties.'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Every case handled with complete confidentiality and discretion.'
    },
    {
      icon: Users,
      title: 'Creator-Focused',
      description: 'Built specifically for OnlyFans and adult content creators by people who understand your challenges.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '98% success rate with over 10,000 files removed and counting.'
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Most takedowns filed within 24-48 hours, with priority options available.'
    },
    {
      icon: Heart,
      title: 'Supportive',
      description: 'Empowering creators to protect their work and maintain control of their content.'
    }
  ];

  const team = [
    {
      role: 'Copyright Specialists',
      description: 'Legal experts who understand DMCA, copyright law, and platform policies.'
    },
    {
      role: 'Technical Team',
      description: 'Engineers who build monitoring systems and maintain secure infrastructure.'
    },
    {
      role: 'Support Staff',
      description: 'Dedicated team members who handle cases with care and professionalism.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Protecting Creators,
            <span className="block text-blue-900">Defending Copyright</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're a team of copyright specialists, legal experts, and technology professionals dedicated to helping content creators protect their work and privacy online.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Every day, content creators work hard to produce original content, only to have it stolen and distributed without permission. This isn't just a violation of copyright law—it's a violation of trust and personal boundaries.
                </p>
                <p>
                  We founded ContentGuard because creators deserve better. They deserve a service that understands the unique challenges of the adult content industry, respects their privacy, and fights aggressively to protect their rights.
                </p>
                <p>
                  Our mission is simple: empower creators to take control of their content, remove unauthorized copies quickly, and prevent future leaks through proactive monitoring.
                </p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-4xl font-bold text-blue-900 mb-2">10,000+</p>
                  <p className="text-gray-700">Files removed from unauthorized sites</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-4xl font-bold text-blue-900 mb-2">98%</p>
                  <p className="text-gray-700">Success rate on takedown requests</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="text-4xl font-bold text-blue-900 mb-2">24-72h</p>
                  <p className="text-gray-700">Average removal time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values guide everything we do, from how we handle your case to how we treat your privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200">
                  <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-7 w-7 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to protecting your content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-900 text-white rounded-2xl p-8 mb-4">
                  <p className="text-2xl font-bold">{member.role}</p>
                </div>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Specialized */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Why We Specialize in Adult Content
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Adult content creators face unique challenges that generic DMCA services don't understand. We're different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">We Understand the Platforms</h3>
              <p className="text-blue-100">
                From OnlyFans to tube sites, we know how each platform works, their DMCA processes, and how to get fast results.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">No Judgment, Total Discretion</h3>
              <p className="text-blue-100">
                Your content is your business. We handle every case professionally and confidentially, without judgment.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Privacy Is Paramount</h3>
              <p className="text-blue-100">
                We understand the importance of privacy in this industry and take extra measures to protect your identity and personal information.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Fast, Aggressive Action</h3>
              <p className="text-blue-100">
                We know time is money. We move quickly and aggressively to get your content removed as fast as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;