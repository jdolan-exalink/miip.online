import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { DnsRecord } from '../../types';

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME'];

const DnsLookup: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<Record<string, DnsRecord[]>>({});
  const [loading, setLoading] = useState(false);

  const performLookup = async () => {
    if (!domain) return;
    setLoading(true);
    setResults({});
    
    const newResults: Record<string, DnsRecord[]> = {};

    try {
      // Parallel requests for all record types
      const promises = RECORD_TYPES.map(async (type) => {
        try {
          // Using Cloudflare DNS over HTTPS public API
          const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`, {
            headers: { 'accept': 'application/dns-json' }
          });
          const data = await response.json();
          if (data.Answer) {
             newResults[type] = data.Answer;
          }
        } catch (e) {
          console.error(`Error fetching ${type}`, e);
        }
      });

      await Promise.all(promises);
      setResults(newResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Search className="text-primary-500" /> DNS Lookup
      </h2>

      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && performLookup()}
          className="flex-grow rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:text-white p-3 border"
        />
        <button 
          onClick={performLookup}
          disabled={loading || !domain}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Lookup'}
        </button>
      </div>

      <div className="space-y-6">
        {Object.keys(results).length === 0 && !loading && (
             <div className="text-center text-gray-500 py-8">Enter a domain to search records</div>
        )}

        {RECORD_TYPES.map(type => {
            const records = results[type];
            if (!records) return null;

            return (
                <div key={type} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-dark-800 px-4 py-2 border-b border-gray-200 dark:border-gray-800 font-semibold text-sm text-gray-700 dark:text-gray-300 flex justify-between">
                        <span>{type} Records</span>
                        <span className="bg-gray-200 dark:bg-dark-700 text-xs px-2 py-0.5 rounded-full">{records.length}</span>
                    </div>
                    <div className="p-0">
                        {records.map((rec, i) => (
                            <div key={i} className="px-4 py-3 border-b last:border-0 border-gray-100 dark:border-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                                {rec.data}
                                <span className="float-right text-xs text-gray-400">TTL: {rec.TTL}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default DnsLookup;