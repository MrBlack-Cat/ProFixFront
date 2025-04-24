import React from 'react';
import { Tab } from '../ServiceProviderProfilePage'; 

interface TabsNavigationProps {
  tabs: readonly Tab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="relative flex flex-wrap justify-center gap-3 border-b border-gray-500 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative px-4 py-2 text-sm md:text-base font-semibold transition-all duration-300
            ${activeTab === tab 
              ? 'text-cyan-700 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cyan-700 after:rounded-full'
              : 'text-gray-600 hover:text-cyan-900'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;
