import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TopRatedPostCard from './TopRatedPostCard';
import TopRatedPostModal from './TopRatedPostModal';
import { PostDto } from '../../types/Post';

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

  if (loading) return <p className="text-center text-gray-500">Загрузка топ постов...</p>;
  if (!posts.length) return <p className="text-center text-gray-500">Топ постов нет.</p>;

  return (
    <section className="py-12 px-4 bg-gray-50">
  <div className="max-w-screen-xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8 text-[#1a1a2e]">🔥 Топ посты</h2>

    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {posts.map((post) => (
        <TopRatedPostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
      ))}
    </motion.div>
  </div>

  {selectedPost && (
    <TopRatedPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
  )}
</section>

  );
};

export default TopRatedPostsSection;
