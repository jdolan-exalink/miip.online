import React from 'react';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-primary-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using miip.online, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h3>2. Use of Tools</h3>
        <p>
          The tools provided on this website (Subnet Calculator, IP Lookups, etc.) are for educational and professional utility purposes.
          You agree not to use these tools for any illegal activities, including but not limited to unauthorized network scanning or hacking.
        </p>

        <h3>3. Disclaimer of Warranties</h3>
        <p>
          The website is provided on an "AS IS" and "AS AVAILABLE" basis. miip.online makes no representations or warranties of any kind,
          express or implied, regarding the accuracy, reliability, or completeness of the calculations or data provided by the tools.
        </p>

        <h3>4. Limitation of Liability</h3>
        <p>
          In no event shall miip.online or its operators be liable for any damages (including, without limitation, damages for loss of data or profit)
          arising out of the use or inability to use the materials on this site.
        </p>

        <h3>5. External Links</h3>
        <p>
          Our Service may contain links to third-party web sites or services (such as tutorials linking to hardware vendors) that are not owned or controlled by miip.online.
          We has no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites.
        </p>

        <h3>6. Changes</h3>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
        </p>
      </div>
    </div>
  );
};

export default Terms;