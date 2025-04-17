import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchWithAuth } from '../../../utils/api';

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  toUserId: number;
}

interface ComplaintType {
  id: number;
  name: string;
}

const ComplaintModal = ({ isOpen, onClose, toUserId }: ComplaintModalProps) => {
  const [complaintTypes, setComplaintTypes] = useState<ComplaintType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadComplaintTypes = async () => {
      try {
        const res = await fetch('https://localhost:7164/api/ComplaintType/types');
        const json = await res.json();
        setComplaintTypes(json.data);
      } catch (err) {
        console.error('❌ Ошибка загрузки типов жалоб', err);
      }
    };

    if (isOpen) {
      loadComplaintTypes();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedTypeId || !description.trim()) {
      alert('Пожалуйста, выберите тип жалобы и напишите описание.');
      return;
    }

    setLoading(true);
    try {
      await fetchWithAuth('https://localhost:7164/api/Complaint/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId,
          typeId: selectedTypeId,
          description,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('❌ Ошибка отправки жалобы', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Submit a Complaint</h2>

        {success ? (
          <div className="text-green-600 text-center font-semibold">✅ Complaint submitted successfully!</div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Complaint Type</label>
              <select
                className="w-full border rounded p-2"
                value={selectedTypeId || ''}
                onChange={(e) => setSelectedTypeId(Number(e.target.value))}
              >
                <option value="" disabled>Select a type</option>
                {complaintTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Description</label>
              <textarea
                className="w-full border rounded p-2 h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ComplaintModal;
