import React from 'react';

type Tab = 'Overview' | 'Posts' | 'Certificates' | 'Reviews' | 'Settings';

interface TabsNavigationProps {
  tabs: readonly Tab[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center border-b pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full transition-all duration-300 
            ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;
