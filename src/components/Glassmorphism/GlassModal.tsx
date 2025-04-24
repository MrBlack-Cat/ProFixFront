import React, { useEffect } from 'react';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GlassModal: React.FC<GlassModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl border border-white/20 bg-emerald-900/50 backdrop-blur-xl shadow-2xl ring-1 ring-white/20 animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-400 text-xl font-bold transition"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default GlassModal;
