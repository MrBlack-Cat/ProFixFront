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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = async (): Promise<string | null> => {
    if (!file) return post.imageUrl || null;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await fetchWithAuth('https://localhost:7164/api/FileUpload/upload-post-image', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      return json?.data?.url || post.imageUrl || null;
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setError('❌ File upload failed.');
      return post.imageUrl || null;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !content.trim()) {
      setError('⚠️ Please fill in both title and content.');
      return;
    }

    try {
      setLoading(true);
      const finalImageUrl = await handleFileUpload();

      const response = await fetchWithAuth('https://localhost:7164/api/Post/Update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postDto: {
            id: post.id,
            title,
            content,
            imageUrl: finalImageUrl,
          },
        }),
      });

      const json = await response.json();
      if (response.ok) {
        setSuccess('✅ Post updated!');
        onSuccess?.();
      } else {
        setError(json?.errors?.[0] || 'Something went wrong ❌');
      }
    } catch {
      setError('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-4 text-center text-cyan-800">✏️ Edit Post</h2>

      {success && <p className="text-green-600 text-center mb-2">{success}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update title..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Content</label>
          <textarea
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Update your thoughts..."
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Upload Image</label>
          <input
            type="file"
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
          {loading ? 'Updating...' : uploading ? 'Uploading Image...' : '💾 Update Post'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
