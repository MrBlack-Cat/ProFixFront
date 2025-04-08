import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api';
import InfoTab from '../ViewProviderProfile/components/InfoTab';
import CertificatesTab from '../ViewProviderProfile/components/CertificatesTab';
import PostsTab from '../ViewProviderProfile/components/PostsTab';
import ReviewsTab from '../ViewProviderProfile/components/ReviewsTab';
import { motion } from 'framer-motion';

const ViewProviderProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'certificates' | 'posts' | 'reviews'>('info');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/ServiceProviderProfile/${id}`);
        const json = await res.json();
        console.log("Profile object", json.data); // 👈 вот сюда
        setProfile(json.data);
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchProfile();
  }, [id]);
  

  const tabClass = (tab: string) =>
    `py-2 px-4 border-b-2 transition font-medium ${
      activeTab === tab
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-blue-600'
    }`;

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (!profile) return <div className="text-center text-red-500 mt-10">Profile not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4">
        <Link to="/category" className="text-blue-600 hover:underline text-sm">
          ← Back to category
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex space-x-4 mb-6">
        <button onClick={() => setActiveTab('info')} className={tabClass('info')}>Info</button>
        <button onClick={() => setActiveTab('certificates')} className={tabClass('certificates')}>Certificates</button>
        <button onClick={() => setActiveTab('posts')} className={tabClass('posts')}>Posts</button>
        <button onClick={() => setActiveTab('reviews')} className={tabClass('reviews')}>Reviews</button>
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'info' && <InfoTab profile={profile} />}
        {activeTab === 'certificates' && profile?.id && <CertificatesTab providerId={profile.id} />}
        {activeTab === 'posts' && profile?.id && <PostsTab providerId={profile.id} />}
        {activeTab === 'reviews' && <ReviewsTab providerId={profile.id} />}
      </motion.div>
    </div>
  );
};

export default ViewProviderProfilePage;
