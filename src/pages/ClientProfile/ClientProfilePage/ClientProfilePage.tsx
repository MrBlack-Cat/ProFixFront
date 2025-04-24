import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfoTab from './tabs/InfoTab';
import GuaranteesTab from './tabs/GuaranteesTab';
import SettingsTab from './tabs/SettingsTab';
import BookingTab from './tabs/BookingTab';

const TABS = ['Info', 'Guarante Documents', 'Settings', 'Booking'] as const;
type Tab = typeof TABS[number];

const ClientProfilePage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<Tab>('Info');

  useEffect(() => {
    if (tabParam && TABS.includes(tabParam as Tab)) {
      setActiveTab(tabParam as Tab);
    }
  }, [tabParam]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Info':
        return <InfoTab />;
      case 'Guarante Documents':
        return <GuaranteesTab />;
      case 'Settings':
        return <SettingsTab />;
      case 'Booking':
        return <BookingTab />;
      default:
        return null;
    }
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-tr from-[#283e51] to-[#4b79a1] min-h-screen overflow-hidden">
      {/* Альбомный слой (если хочешь атмосферу) */}
      {/* <div className="absolute inset-6 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div> */}

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Навигация вкладок */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl mb-8">
          <div className="flex justify-center gap-4 border-b border-white/30 pb-3">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-all ${
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

export default ClientProfilePage;
