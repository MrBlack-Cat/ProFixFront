import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal';

const PostPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={openModal}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          ➕ Create Post
        </button>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default PostPage;
