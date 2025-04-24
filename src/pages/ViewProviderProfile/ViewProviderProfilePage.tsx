import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api';
import InfoTab from '../ViewProviderProfile/tabs/InfoTab';
import CertificatesTab from '../ViewProviderProfile/tabs/CertificatesTab';
import PostsTab from '../ViewProviderProfile/tabs/PostsTab';
import ReviewsTab from '../ViewProviderProfile/tabs/ReviewsTab';
import { motion } from 'framer-motion';

const ViewProviderProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'certificates' | 'posts' | 'reviews'>('info');
  const [loading, setLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/ServiceProviderProfile/${id}`);
        const json = await res.json();
        setProfile(json.data);

        const clientRes = await fetchWithAuth('https://localhost:7164/api/ClientProfile/user');
        const clientJson = await clientRes.json();
        setCurrentClient(clientJson.data);
      } catch (err) {
        console.error('❌ Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const tabClass = (tab: string) =>
    `py-2 px-4 transition font-semibold rounded-t-lg ${
      activeTab === tab
        ? 'bg-white/30 backdrop-blur-md text-blue-700 shadow-md'
        : 'text-gray-600 hover:text-blue-600 hover:bg-white/20'
    }`;

  if (loading) return <div className="text-center mt-10 text-blue-600 text-lg animate-pulse">Loading profile...</div>;
  if (!profile) return <div className="text-center text-red-500 mt-10 text-lg">Profile not found</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/regback4.jpg')`, // путь к твоему фоновому изображению
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="mb-6 mt-8">
          <Link to="/category" className="text-blue-600 hover:underline text-sm">
            ← Back to Categories
          </Link>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-6">

          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-gray-200 pb-2">
            <button onClick={() => setActiveTab('info')} className={tabClass('info')}>Info</button>
            <button onClick={() => setActiveTab('certificates')} className={tabClass('certificates')}>Certificates</button>
            <button onClick={() => setActiveTab('posts')} className={tabClass('posts')}>Posts</button>
            <button onClick={() => setActiveTab('reviews')} className={tabClass('reviews')}>Reviews</button>
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-[300px]"
          >
            {activeTab === 'info' && <InfoTab profile={profile} currentClient={currentClient} />}
            {activeTab === 'certificates' && profile?.id && <CertificatesTab providerId={profile.id} />}
            {activeTab === 'posts' && profile?.id && <PostsTab providerId={profile.id} />}
            {activeTab === 'reviews' && <ReviewsTab providerId={profile.id} />}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ViewProviderProfilePage;
