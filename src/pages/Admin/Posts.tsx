import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  category: string;
  createdAt: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Elanlar</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Başlıq</th>
            <th className="border p-2">Kateqoriya</th>
            <th className="border p-2">Tarix</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.category}</td>
              <td className="border p-2">{new Date(post.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Posts;
