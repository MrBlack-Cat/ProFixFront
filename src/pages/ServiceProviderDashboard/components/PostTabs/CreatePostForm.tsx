import React, { useState } from 'react';
import { fetchWithAuth } from '../../../../utils/api';

interface CreatePostFormProps {
  onSuccess?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await fetchWithAuth('https://localhost:7164/api/FileUpload/upload-post-image', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      return json?.data?.url || null;
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setError('❌ File upload failed.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !content.trim()) {
      setError('⚠️ Please fill in both title and content.');
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await handleFileUpload();

      const res = await fetchWithAuth('https://localhost:7164/api/Post/CreatePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, imageUrl }),
      });

      const json = await res.json();
      if (res.ok) {
        setSuccess('✅ Post created successfully!');
        setTitle('');
        setContent('');
        setFile(null);
        onSuccess?.();
      } else {
        setError(json?.errors?.[0] || 'Something went wrong ❌');
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center mb-4 text-cyan-700"> Create a New Post</h2>

      {success && <p className="text-green-600 text-center mb-2">{success}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium mb-1 text-gray-700">Content</label>
          <textarea
            id="content"
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What’s on your mind?"
          />
        </div>

        <div>
          <label htmlFor="file" className="block font-medium mb-1 text-gray-700">Upload Image</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-100 file:text-cyan-800 hover:file:bg-cyan-200"
          />
        </div>


        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full bg-cyan-700 text-white py-3 rounded-lg hover:bg-cyan-800 transition-all disabled:opacity-50"
        >
          {loading ? 'Posting...' : uploading ? 'Uploading Image...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
