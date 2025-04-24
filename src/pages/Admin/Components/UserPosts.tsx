import React from "react";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Props {
  posts: Post[];
}

const UserPosts: React.FC<Props> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Postlar</h3>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-3 border rounded bg-gray-50">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
