import React, { useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';

interface UpdatePostFormProps {
  post: {
    id: number;
    title: string;
    content?: string;
    imageUrl?: string;
  };
  onSuccess?: () => void;
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ post, onSuccess }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || '');
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetchWithAuth('https://localhost:7164/api/Post/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postDto: {
            id: post.id,
            title,
            content,
            imageUrl,
          },
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setSuccess('✅ Post updated successfully!');
        if (onSuccess) onSuccess();
      } else {
        setError(json?.errors?.[0] || 'Update failed 😢');
      }
    } catch {
      setError('Unexpected error during update.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">✏️ Edit Post</h2>

      {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter updated title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update your thoughts..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Post 🚀'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
