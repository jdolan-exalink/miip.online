import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Clock, ChevronRight } from 'lucide-react';
import { TutorialDef } from '../types';

export const TUTORIAL_DATA: TutorialDef[] = [
  {
    id: 'wireguard-setup',
    title: 'How to Setup WireGuard VPN',
    excerpt: 'A complete step-by-step guide to setting up a modern, high-performance VPN on Linux.',
    category: 'Security',
    readTime: '10 min',
    date: '2023-10-15',
    content: `# Setting up WireGuard... (Content handled in detail view)`
  },
  {
    id: 'mikrotik-security',
    title: 'Securing a Mikrotik Router',
    excerpt: 'Essential firewall rules and service hardening techniques for RouterOS devices.',
    category: 'Networking',
    readTime: '15 min',
    date: '2023-11-02',
    content: ''
  },
  {
    id: 'vlan-segmentation',
    title: 'VLAN Segmentation Basics',
    excerpt: 'Understand how to separate IoT devices from your main network using 802.1Q VLANs.',
    category: 'Networking',
    readTime: '8 min',
    date: '2023-09-20',
    content: ''
  }
];

const Tutorials: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Technical Tutorials</h1>
        <p className="text-gray-600 dark:text-gray-400">In-depth guides for network configuration and security.</p>
      </div>

      <div className="space-y-6">
        {TUTORIAL_DATA.map((tut) => (
          <Link 
            key={tut.id} 
            to={`/tutorials/${tut.id}`}
            className="block bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-primary-600">
                  <span>{tut.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1 text-gray-500"><Clock size={12}/> {tut.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                  {tut.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {tut.excerpt}
                </p>
              </div>
              <div className="flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-dark-800 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    <ChevronRight />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;