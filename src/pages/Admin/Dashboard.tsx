// const Dashboard: React.FC = () => {
//     return (
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Admin Panelinə Xoş Gəlmisiniz</h2>
//         <p className="text-gray-600">Buradan istifadəçilərə, postlara, review-lara və service provider-lara nəzarət edə bilərsiniz.</p>
//       </div>
//     );
//   };

//   export default Dashboard;

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import UsersTab from './Tabs/ClientsTab';
import PostsTab from './Tabs/PostsTab';
import ReviewsTab from './Tabs/ReviewsTab';
import ServicesTab from './Tabs/ServicesTab';
import BookingsTab from './Tabs/BookingTab';
import CertificatesTab from './Tabs/CertificatesTab';

const TABS = ['Users', 'Posts', 'Reviews', 'Services', 'Bookings', 'Certificates'] as const;
type Tab = typeof TABS[number];

const AdminPanelPage = () => {
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<Tab>('Users');

    useEffect(() => {
        if (tabParam && TABS.includes(tabParam as Tab)) {
            setActiveTab(tabParam as Tab);
        }
    }, [tabParam]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Users':
                return <UsersTab />;
            case 'Posts':
                return <PostsTab />;
            case 'Reviews':
                return <ReviewsTab />;
            case 'Services':
                return <ServicesTab />;
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
            <div className="relative z-10 max-w-6xl mx-auto p-6">
                {/* NAVIGASYA --> */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-4 shadow-2xl mb-8">
                    <div className="flex justify-center gap-4 border-b border-white/30 pb-3">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-all ${activeTab === tab
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

