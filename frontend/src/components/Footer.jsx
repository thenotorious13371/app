import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Lock, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-900 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">ContentGuard</span>
            </div>
            <p className="text-sm text-gray-600">
              Professional DMCA takedowns and copyright protection for content creators.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Lock className="h-4 w-4" />
              <span>SSL Secured</span>
              <span className="mx-2">•</span>
              <span>GDPR Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-600 hover:text-blue-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-600 hover:text-blue-900">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-blue-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-blue-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-blue-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-900">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                <a href="mailto:support@contentguard.com" className="text-sm text-gray-600 hover:text-blue-900">
                  support@contentguard.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Typical response: 24-48 hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © 2025 ContentGuard. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;