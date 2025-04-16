import React, { useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';

interface CreatePostFormProps {
  onSuccess?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetchWithAuth('https://localhost:7164/api/Post/CreatePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      const json = await response.json();

      if (response.ok) {
        setSuccess('🎉 Post created successfully!');
        setTitle('');
        setContent('');
        setImageUrl('');
        onSuccess?.(); // CLose Modal Resresh page
      } else {
        setError(json?.errors?.[0] || 'Something went wrong 😢');
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">📝 Create a New Post</h2>

      {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your post title"
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium mb-1">Content</label>
          <textarea
            id="content"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block font-medium mb-1">Image URL (optional)</label>
          <input
            id="imageUrl"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
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
          {loading ? 'Posting...' : 'Create Post 🚀'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
