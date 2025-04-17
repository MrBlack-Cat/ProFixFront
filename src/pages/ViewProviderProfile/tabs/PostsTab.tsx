import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import { motion } from 'framer-motion';
import PostItem from '../components/PostItem';
import { PostDto } from '../../../types/Post';


// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   createdAt: string;
// }

const PostsTab = ({ providerId }: { providerId: number }) => {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostDto[]>([]);


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
    {posts.map((post) => (
      <PostItem key={post.id} post={post} />
    ))}
  </motion.div>

  );
};

export default PostsTab;
