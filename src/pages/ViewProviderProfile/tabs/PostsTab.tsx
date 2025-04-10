// src/components/ViewProviderProfile/components/PostsTab.tsx
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

const PostsTab = ({ providerId }: { providerId: number }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchWithAuth(`https://localhost:7164/api/Post/GetPostsByProvider/${providerId}`);
        const json = await res.json();
        setPosts(json);
      } catch (err) {
        console.error('Error loading posts', err);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) fetchPosts();
  }, [providerId]);

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length) return <p>No posts available.</p>;

  return (
    <motion.div
  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {posts.map((post, index) => (
    <motion.div
      key={post.id}
      className="p-5 bg-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h3 className="text-lg font-bold text-indigo-600">{post.title}</h3>
      <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="mt-2 text-gray-700">{post.content}</p>
      {post.imageUrl && post.imageUrl !== "string" && (
        <img src={post.imageUrl} className="mt-3 w-full rounded-lg shadow" />
      )}
    </motion.div>
  ))}
</motion.div>

  );
};

export default PostsTab;
