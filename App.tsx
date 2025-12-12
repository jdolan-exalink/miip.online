
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import Contact from './pages/Contact';
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Cookies from './pages/legal/Cookies';
import MyIP from './components/tools/MyIP';
import SubnetCalculator from './components/tools/SubnetCalculator';
import RJ45Visualizer from './components/tools/RJ45Visualizer';
import DnsLookup from './components/tools/DnsLookup';
import PortChecker from './components/tools/PortChecker';
import PasswordGenerator from './components/tools/PasswordGenerator';
import { LanguageProvider } from './context/LanguageContext';
import GoogleAnalytics from './components/GoogleAnalytics';
import SEOSchema from './components/SEOSchema';
import { logVisit } from './utils/analyticsBackend';

// Wrapper to handle Side Effects (Scroll Top + Analytics)
const RouteObserver = () => {
  const location = useLocation();
  
  useEffect(() => {
    // 1. Scroll to top
    window.scrollTo(0, 0);

    // 2. Log visit to Custom Backend
    logVisit(location.pathname);
    
  }, [location]);

  return null;
};

const App: React.FC = () => {
  
  return (
    <LanguageProvider>
      <Router>
        <SEOSchema />
        <RouteObserver />
        <GoogleAnalytics />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legal Routes */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            
            {/* Tools Routes */}
            <Route path="/tools/my-ip" element={<MyIP />} />
            <Route path="/tools/subnet" element={<SubnetCalculator />} />
            <Route path="/tools/rj45" element={<RJ45Visualizer />} />
            <Route path="/tools/dns" element={<DnsLookup />} />
            <Route path="/tools/port" element={<PortChecker />} />
            <Route path="/tools/password" element={<PasswordGenerator />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
};

export default App;