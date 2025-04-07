import React, { useState } from 'react';
import TabsNavigation from './components/TabsNavigation';
import OverviewTab from './components/OverviewTab';
import PostsTab from './components/PostsTab';
import CertificatesTab from './components/CertificatesTab';
import ReviewsTab from './components/ReviewsTab';
import SettingsTab from './components/SettingsTab';

const TABS = ['Overview', 'Posts', 'Certificates', 'Reviews', 'Settings'] as const;
type Tab = typeof TABS[number];

const ServiceProviderProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'Overview': return <OverviewTab />;
      case 'Posts': return <PostsTab />;
      case 'Certificates': return <CertificatesTab />;
      case 'Reviews': return <ReviewsTab />;
      case 'Settings': return <SettingsTab />;
      default: return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Welcome to your space, Service Hero! 🛠️
      </h1>
      <TabsNavigation tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default ServiceProviderProfilePage;
