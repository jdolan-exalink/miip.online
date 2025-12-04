
import React, { useState, FormEvent } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AdsenseBlock from '../components/AdsenseBlock';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // -----------------------------------------------------------------------
      // NOTE: This is a frontend simulation.
      // To actually send the email to juan@dolan.com.ar, you need a backend endpoint 
      // or a service like Formspree, EmailJS, or Getform.
      //
      // Example implementation with fetch:
      // await fetch('https://your-backend.com/api/send-email', {
      //   method: 'POST',
      //   body: JSON.stringify({ ...formData, to: 'juan@dolan.com.ar' })
      // });
      // -----------------------------------------------------------------------

      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('--- Email Payload Sent ---');
      console.log('To: juan@dolan.com.ar');
      console.log('Name:', formData.name);
      console.log('Email:', formData.email);
      console.log('Message:', formData.message);
      console.log('--------------------------');

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-in">
      
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {t.contact.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-primary-600 rounded-xl p-6 text-white shadow-lg">
             <h3 className="font-bold text-lg mb-4">Support Info</h3>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <Mail className="shrink-0 mt-1" size={20} />
                 <div>
                   <span className="block text-xs text-blue-200 uppercase font-bold">Email</span>
                   <a href="mailto:juan@dolan.com.ar" className="hover:underline break-all">juan@dolan.com.ar</a>
                 </div>
               </li>
             </ul>
          </div>
          
          <AdsenseBlock slotId="contact-sidebar" format="rectangle" className="h-64" />
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm">
            
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.contact.form.success}</h3>
                <p className="text-gray-500 mb-6">We will get back to you shortly.</p>
                <button 
                  type="button" 
                  onClick={() => setStatus('idle')}
                  className="text-primary-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.contact.form.name} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm p-2.5 border"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.contact.form.email} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm p-2.5 border"
                      placeholder="juan@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t.contact.form.message} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                      <MessageSquare size={18} />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full pl-10 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-800 focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm p-2.5 border"
                      placeholder="Your inquiry..."
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
                    <AlertCircle size={16} />
                    {t.contact.form.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.contact.form.submit}
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  {t.contact.form.note}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;