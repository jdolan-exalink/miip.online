import React from 'react';
import { Cookie } from 'lucide-react';

const Cookies: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Cookie className="text-primary-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h3>1. What Are Cookies</h3>
        <p>
          Cookies are tiny files that are downloaded to your computer to improve your experience. This page describes what information they gather, 
          how we use it, and why we sometimes need to store these cookies.
        </p>

        <h3>2. How We Use Cookies</h3>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling 
          cookies without completely disabling the functionality and features they add to this site.
        </p>

        <h3>3. The Cookies We Set</h3>
        <ul>
          <li>
            <strong>Site Preferences Cookies:</strong> In order to provide you with a great experience on this site, we provide the functionality to set your 
            preferences for how this site runs when you use it (such as Dark Mode or Language selection).
          </li>
        </ul>

        <h3>4. Third Party Cookies</h3>
        <p>
          In some special cases, we also use cookies provided by trusted third parties.
        </p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web 
            for helping us to understand how you use the site and ways that we can improve your experience.
          </li>
          <li>
            <strong>Google AdSense:</strong> The Google AdSense service we use to serve advertising uses a <strong>DoubleClick cookie</strong> to serve more relevant 
            ads across the web and limit the number of times that a given ad is shown to you.
            <br />
            For more information on Google AdSense, see the official <a href="https://support.google.com/adsense/answer/1348695" target="_blank" rel="noreferrer">Google AdSense privacy FAQ</a>.
          </li>
        </ul>

        <h3>5. Managing Cookies</h3>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). 
          Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.
        </p>
      </div>
    </div>
  );
};

export default Cookies;