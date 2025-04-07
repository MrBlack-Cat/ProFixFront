import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';

const PostsTab = ({ providerId }: { providerId: number }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchWithAuth(`https://localhost:7164/api/Posts/provider/${providerId}`);
      const json = await res.json();
      setPosts(json.data ?? []);
      setLoading(false);
    };
    fetch();
  }, [providerId]);

  if (loading) return <p>Loading posts...</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-sm p-4 rounded border">
          <h4 className="font-semibold text-lg">{post.title}</h4>
          <p className="text-sm text-gray-600">{post.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostsTab;
