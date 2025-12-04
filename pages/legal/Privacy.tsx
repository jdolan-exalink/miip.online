import React from 'react';
import { Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-primary-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <h3>1. Introduction</h3>
        <p>
          Welcome to miip.online. We respect your privacy and are committed to protecting the personal information you share with us.
          This policy explains how we handle data when you use our network utilities and tutorials.
        </p>

        <h3>2. Information We Collect</h3>
        <ul>
          <li><strong>Usage Data:</strong> We automatically collect information about how you access the site, such as IP addresses (processed briefly for geolocation tools), browser type, and pages visited.</li>
          <li><strong>Local Storage:</strong> We use your browser's local storage to save your preferences (like Dark Mode and Language settings).</li>
          <li><strong>Input Data:</strong> Data entered into tools (like subnet calculators or password generators) is processed entirely within your browser (client-side) and is not sent to our servers unless explicitly stated (e.g., Contact Form).</li>
        </ul>

        <h3>3. Google Analytics</h3>
        <p>
          We use Google Analytics to understand website traffic. Google Analytics uses "cookies" to collect information about your visit. 
          This data is anonymized and aggregated. We do not transmit personally identifiable information (PII) to Google Analytics.
        </p>

        <h3>4. Google AdSense & Advertising</h3>
        <p>
          We use Google AdSense to display advertisements. 
        </p>
        <ul>
          <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">Ads Settings</a>.</li>
        </ul>

        <h3>5. Contact Form</h3>
        <p>
          If you use our contact form, the name and email address you provide are used solely to respond to your inquiry. We do not sell or share this contact list.
        </p>

        <h3>6. Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. We encourage you to review this page periodically for any changes.
        </p>

        <h3>7. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:juan@dolan.com.ar">juan@dolan.com.ar</a>.
        </p>
      </div>
    </div>
  );
};

export default Privacy;