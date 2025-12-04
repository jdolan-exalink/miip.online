import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { TUTORIAL_DATA } from './Tutorials';
import AdsenseBlock from '../components/AdsenseBlock';

const TutorialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorial = TUTORIAL_DATA.find(t => t.id === id);

  if (!tutorial) {
    return <div className="text-center py-20 text-gray-500">Tutorial not found.</div>;
  }

  // Placeholder content since we don't have the full markdown in the array for this demo
  const markdownContent = `
## Introduction

This is a placeholder for the detailed content of **${tutorial.title}**. In a real application, this would be fetched from a markdown file or CMS.

### Prerequisites
* A Linux server or router
* Basic command line knowledge

### Step 1: Installation
\`\`\`bash
sudo apt update && sudo apt install wireguard
\`\`\`

### Step 2: Configuration
Create keys and configure the interface.

> Note: Always backup your config before applying changes.

### Conclusion
Your network is now secure.
  `;

  return (
    <div className="max-w-4xl mx-auto">
       <Link to="/tutorials" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6">
         <ArrowLeft size={16} className="mr-1" /> Back to Tutorials
       </Link>

       <article className="bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-8 border-b border-gray-200 dark:border-gray-800">
             <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14}/> {tutorial.date}</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {tutorial.readTime} read</span>
             </div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
               {tutorial.title}
             </h1>
             <div className="inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold">
               {tutorial.category}
             </div>
          </div>

          <div className="p-8 prose prose-slate dark:prose-invert max-w-none">
             <ReactMarkdown 
               components={{
                 code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-dark-800 text-pink-500 px-1 py-0.5 rounded text-sm" {...props} />,
                 pre: ({node, ...props}) => <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
               }}
             >
                {markdownContent}
             </ReactMarkdown>
          </div>
       </article>

       <AdsenseBlock slotId="tut-detail-footer" />
    </div>
  );
};

export default TutorialDetail;