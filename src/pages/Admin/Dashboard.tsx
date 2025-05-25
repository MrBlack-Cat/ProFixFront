import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import UsersTab from './Tabs/ClientsTab';
import PostsTab from './Tabs/PostsTab';
import ReviewsTab from './Tabs/ReviewsTab';
import ServicesTab from './Tabs/ServicesTab';
import BookingsTab from './Tabs/BookingTab';
import CertificatesTab from './Tabs/CertificatesTab';


const TABS = ['Service Providers', 'Clients', 'Posts', 'Reviews', 'Bookings', 'Certificates'] as const;
type Tab = typeof TABS[number];

const AdminPanelPage = () => {
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<Tab>('Clients');


    useEffect(() => {
        if (tabParam && TABS.includes(tabParam as Tab)) {
            setActiveTab(tabParam as Tab);
        }
    }, [tabParam]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Clients':
                return <UsersTab />;
            case 'Service Providers':
                return <ServicesTab />;
            case 'Posts':
                return <PostsTab />;
            case 'Reviews':
                return <ReviewsTab />;
            case 'Bookings':
                return <BookingsTab />;
            case 'Certificates':
                return <CertificatesTab />;
            default:
                return null;
        }
    };

    return (
        <section className="relative py-16 px-4 bg-gradient-to-tr from-[#283e51] to-[#4b79a1] min-h-screen overflow-hidden">
  <div className="relative z-10 w-full max-w-screen-xl mx-auto p-4 sm:p-6">
    {/* NAVIGASYA --> */}
    <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl mb-8">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-white/30 pb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base font-semibold rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow'
                : 'text-white/90 hover:bg-white/30'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  </div>
</section>



    );
};

export default AdminPanelPage;

