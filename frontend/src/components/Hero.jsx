import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Shield, CheckCircle, Lock, Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Protect Your Content.
                <span className="block text-blue-900">Protect Your Privacy.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Fast DMCA takedowns, proactive monitoring, and confidential support for OnlyFans creators. Remove leaked content across the web — quickly, discreetly, and legally.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white h-14 px-8 text-lg w-full sm:w-auto">
                  Start a Takedown Now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50 h-14 px-8 text-lg w-full sm:w-auto">
                  See Pricing & Packages
                </Button>
              </Link>
            </div>

            {/* Trust Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-cyan-600" />
                <span className="text-sm text-gray-700">Verified DMCA takedowns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-cyan-600" />
                <span className="text-sm text-gray-700">Secure client portal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 text-cyan-600" />
                <span className="text-sm text-gray-700">Ongoing monitoring</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1614064643392-8dd713152ae9?w=800&q=80"
                alt="Digital security and protection"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">10,000+</p>
                  <p className="text-sm text-gray-600">Files Removed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-gray-400" />
              <span>SSL Secured</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-gray-400" />
              <span>GDPR Compliant</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="font-semibold text-gray-900">Over 10,000 files removed</span>
            <span className="text-gray-300">•</span>
            <span>Trusted by independent creators</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;