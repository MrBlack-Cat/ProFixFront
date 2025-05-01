import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchWithAuth } from './../../utils/api';
import { X } from 'lucide-react';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuggestionModal = ({ isOpen, onClose }: SuggestionModalProps) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter your message.');
      return;
    }

    setLoading(true);
    try {
      await fetchWithAuth('https://localhost:7164/api/Complaint/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          typeId: 5,
          description: text,
          toUserId: null,
        }),
      });

      setSuccess(true);
      setText('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('❌ Submission error', err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white text-gray-800 rounded-3xl p-8 w-full max-w-xl shadow-2xl border border-emerald-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">Feedback & Suggestions</h2>

            {success ? (
              <div className="text-green-600 font-semibold text-center">
                ✅ Thank you for your message!
              </div>
            ) : (
              <>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-4 h-36 resize-none text-sm text-gray-800 bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Write your complaint or idea here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionModal;
