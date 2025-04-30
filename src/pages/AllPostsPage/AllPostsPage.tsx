import { useEffect, useState } from 'react';
import { PostDto } from '../../types/Post';
import PostGrid from '../AllPostsPage/components/PostGrid';
import PostModal from '../AllPostsPage/components/PostModal';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';



const AllPostsPage = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);
  const { t } = useTranslation();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://localhost:7164/api/Post/PostList');
        const json = await res.json();
        setPosts(json);
      } catch (err) {
        console.error('❌ Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#396a70] via-[#cbd5e1] to-[#bea6c2] px-4 md:px-4 py-8">
      <div className="max-w-8xl mx-auto bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-2"
        >
          <SectionTitle
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500">{t('loading')}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">{t('noPosts')}</p>
        ) : (
          <PostGrid posts={posts} onSelect={setSelectedPost} />
        )}

        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </div>
    </div>
  );
};

export default AllPostsPage;
