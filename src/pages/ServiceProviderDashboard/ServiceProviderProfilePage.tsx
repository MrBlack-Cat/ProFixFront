import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TabsNavigation from './components/TabsNavigation';
import OverviewTab from './components/OverviewTab';
import PostsTab from './components/PostTabs/PostsTab';
import ReviewsTab from './components/ReviewsTab';
import SettingsTab from './components/SettingsTabs/SettingsTab';
import ServiceBookingTab from './components/ServiceBookingTab';
import DayScheduleTab from './components/DayScheduleTab';
import CertificatePage from './components/CertificateTabs/CertificatePage';
import GuaranteePage from './components/GuarenteeTabs/GuaranteePage';
import { fetchWithAuth } from '../../utils/api';

const TABS = [
  'Overview',
  'Posts',
  'Certificates',
  'Reviews',
  'Guarantees',
  'Booking',
  'Day Schedule',
  'Settings'
] as const;
export type Tab = typeof TABS[number];

const ServiceProviderProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryTab = searchParams.get('tab') as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [providerProfile, setProviderProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (queryTab && TABS.includes(queryTab)) {
      setActiveTab(queryTab);
    }
  }, [queryTab]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
        const json = await res.json();
        setProviderProfile(json.data);
      } catch (err) {
        console.error('❌ Failed to load provider profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams({ tab }); // URL ?tab=...
  };

  const renderTab = () => {
    if (!providerProfile && !loading) return <p className="text-center text-red-500">Profile not found</p>;
    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    switch (activeTab) {
      case 'Overview': return <OverviewTab profile={providerProfile} />;
      case 'Posts': return <PostsTab providerId={providerProfile.id} />;
      case 'Certificates': return <CertificatePage providerId={providerProfile.id} />;
      case 'Reviews': return <ReviewsTab providerId={providerProfile.id} />;
      case 'Guarantees': return <GuaranteePage providerId={providerProfile.id} />;
      case 'Booking': return <ServiceBookingTab />;
      case 'Day Schedule': return <DayScheduleTab providerId={providerProfile.id} />;
      case 'Settings': return <SettingsTab />;
      default: return null;
    }
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-4 shadow-2xl">
          <TabsNavigation tabs={TABS} activeTab={activeTab} setActiveTab={handleTabChange} />
          <div className="mt-4 mb-4">{renderTab()}</div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProviderProfilePage;
