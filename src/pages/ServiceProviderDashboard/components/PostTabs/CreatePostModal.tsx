import React, { useEffect } from 'react';
import CreatePostForm from './CreatePostForm';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSuccess }) => {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20 px-4">
      <div className="relative w-full max-w-3xl rounded-3xl p-8 border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition font-bold"
          aria-label="Close"
        >
          ×
        </button>

        <CreatePostForm
          onSuccess={() => {
            onSuccess?.();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default CreatePostModal;
