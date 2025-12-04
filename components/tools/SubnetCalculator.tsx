import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { calculateSubnet } from '../../utils/networkLogic';

const SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.1');
  const [cidr, setCidr] = useState(24);

  const result = calculateSubnet(ip, cidr);

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Calculator className="text-primary-500" /> Subnet Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IP Address</label>
          <input 
            type="text" 
            value={ip} 
            onChange={(e) => setIp(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-dark-800 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:text-white p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CIDR (/{cidr})</label>
          <input 
            type="range" 
            min="0" 
            max="32" 
            value={cidr} 
            onChange={(e) => setCidr(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3"
          />
        </div>
      </div>

      {result ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-dark-900">
              {[
                ['Network Address', result.networkAddress],
                ['Broadcast Address', result.broadcastAddress],
                ['Subnet Mask', result.subnetMask],
                ['Usable Host Range', `${result.firstUsable} - ${result.lastUsable}`],
                ['Total Usable Hosts', result.totalHosts.toLocaleString()],
                ['Binary Mask', result.binaryMask],
              ].map(([label, value], idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">{label}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono text-right md:text-left">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-4 text-red-500 bg-red-50 dark:bg-red-900/10 rounded">Invalid IP Address</div>
      )}
    </div>
  );
};

export default SubnetCalculator;