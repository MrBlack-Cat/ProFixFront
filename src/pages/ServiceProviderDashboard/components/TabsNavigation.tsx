import React from 'react';
import type { Tab } from '../ServiceProviderProfilePage';

interface Props {
  tabs: Tab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabsNavigation: React.FC<Props> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            activeTab === tab
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white/30 text-emerald-900 hover:bg-white/50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;
