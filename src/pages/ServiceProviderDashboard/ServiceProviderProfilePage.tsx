import React, { useEffect, useState } from 'react';
import TabsNavigation from './components/TabsNavigation';
import OverviewTab from './components/OverviewTab';
import PostsTab from './components/PostTabs/PostsTab';
import CertificatesTab from './components/CertificateTabs/CertificatesTab';
import ReviewsTab from './components/ReviewsTab';
import SettingsTab from './components/SettingsTabs/SettingsTab';
import GuaranteesTab from './components/GuarenteeTabs/GuaranteesTab';
import ServiceBookingTab from './components/ServiceBookingTab';
import DayScheduleTab from './components/DayScheduleTab';
import { fetchWithAuth } from '../../utils/api';

const TABS = ['Overview', 'Posts', 'Certificates', 'Reviews', 'Guarantees', 'Booking', 'Day Schedule', 'Settings'] as const;
export type Tab = typeof TABS[number];

const ServiceProviderProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [providerProfile, setProviderProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
        const json = await res.json();
        setProviderProfile(json.data);
      } catch (err) {
        console.error('Failed to load provider profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const renderTab = () => {
    if (!providerProfile && !loading) return <p className="text-center text-red-500">Profile not found</p>;
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    switch (activeTab) {
      case 'Overview':
        return <OverviewTab profile={providerProfile} />;
      case 'Posts':
        return <PostsTab providerId={providerProfile.id} />;
      case 'Certificates':
        return <CertificatesTab providerId={providerProfile.id} />;
      case 'Reviews':
        return <ReviewsTab providerId={providerProfile.id} />;
      case 'Guarantees':
        return <GuaranteesTab providerId={providerProfile.id} />;
      case 'Booking':
        return <ServiceBookingTab />;
      case 'Day Schedule':
        return <DayScheduleTab providerId={providerProfile.id} />;
      case 'Settings':
        return <SettingsTab />;
      default:
        return null;
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
