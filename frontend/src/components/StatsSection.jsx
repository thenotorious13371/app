import React, { useEffect, useState } from 'react';
import { Shield, Clock, Users, CheckCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StatsSection = () => {
  const [stats, setStats] = useState({
    filesRemoved: 10000,
    activeClients: 250,
    successRate: 98,
    avgResponseTime: 24
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/stats/public`);
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.log('Using default stats');
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    {
      icon: Shield,
      value: `${stats.filesRemoved.toLocaleString()}+`,
      label: 'Files Removed',
      color: 'text-blue-900'
    },
    {
      icon: Users,
      value: `${stats.activeClients}+`,
      label: 'Active Clients',
      color: 'text-cyan-600'
    },
    {
      icon: CheckCircle,
      value: `${stats.successRate}%`,
      label: 'Success Rate',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      value: `${stats.avgResponseTime}h`,
      label: 'Avg Response Time',
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <Icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;