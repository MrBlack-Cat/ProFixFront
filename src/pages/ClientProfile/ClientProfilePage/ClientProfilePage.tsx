import { useState } from 'react';
import InfoTab from './tabs/InfoTab';
import GuaranteesTab from './tabs/GuaranteesTab';
import SettingsTab from './tabs/SettingsTab';
import BookingTab from './tabs/BookingTab';

const TABS = ['Info', 'Guarante Documents', 'Settings', 'Booking'];

const ClientProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>('Info');

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">My Account</h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b pb-2 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-t-md text-sm font-medium ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
