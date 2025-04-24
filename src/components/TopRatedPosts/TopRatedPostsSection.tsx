import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopRatedPostCard from './TopRatedPostsCard';
import TopRatedPostModal from './TopRatedPostsModal';
import { PostDto } from '../../types/Post';
import SectionTitle from '../SectionTitle/SectionTitle';

const TopRatedPostsSection = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await fetch('https://localhost:7164/api/Post/liked-posts');
        const json = await res.json();
        setPosts(json);
      } catch (err) {
        console.error('Ошибка загрузки топ постов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading top posts...</p>;
  if (!posts.length) return <p className="text-center text-gray-400">No top posts yet.</p>;

  return (
    <section id="top-posts" className="relative py-14 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] flex flex-col items-center overflow-hidden">
      {/* Альбомный слой */}
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* Контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-2"
        >
          <SectionTitle
            title="Top Rated Posts"
            subtitle="Explore the best posts shared by our amazing community."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {posts
            .sort((a, b) => b.likesCount - a.likesCount)
            .slice(0, 8)
            .map((post) => (
            <TopRatedPostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
        </motion.div>
      </div>

      {/* Модалка для поста */}
      {selectedPost && (
        <TopRatedPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
};

export default TopRatedPostsSection;
