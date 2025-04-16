import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  providerId: number;
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
}

interface BookedSlot {
  startTime: string;
  endTime: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ providerId, isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  // Time load
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!scheduledDate) return;

      try {
        const res = await fetch(
          `https://localhost:7164/api/ServiceBooking/booked-times?providerId=${providerId}&date=${scheduledDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setBookedSlots(data);
        } else {
          console.error('⚠️ Failed to load booked slots');
        }
      } catch (err) {
        console.error('❌ Error fetching booked slots:', err);
      }
    };

    fetchBookedSlots();
  }, [scheduledDate, providerId]);

  const handleSubmit = async () => {
    if (!description || !scheduledDate || !startTime || !endTime) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    setValidationErrors([]);

    const dto = {
      serviceProviderProfileId: providerId,
      description,
      scheduledDate,
      startTime: startTime + ':00',
      endTime: endTime + ':00',
    };

    console.log('📤 Submitting booking DTO:', dto);

    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ dto }),
      });

      const data = await res.json();

      if (!res.ok || !data.isSuccess) {
        console.error(`❌ Booking failed: HTTP ${res.status} -`, data);

        if (Array.isArray(data.errors)) {
          setValidationErrors(data.errors);
        } else if (typeof data.errors === 'object') {
          const allErrors = Object.values(data.errors).flat().filter((e): e is string => typeof e === 'string');
          setValidationErrors(allErrors);
        } else {
          setError('Booking failed. Please try again.');
        }
        return;
      }

      console.log('✅ Booking created successfully');
      onClose();
    } catch (err) {
      console.error('❌ Booking error:', err);
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
          >
            <h2 className="text-xl font-bold border-b pb-2">📅 Create Booking</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {validationErrors.length > 0 && (
              <ul className="text-red-600 text-sm list-disc pl-5 space-y-1">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}

            <div className="space-y-2">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {bookedSlots.length > 0 && (
              <div className="bg-gray-100 p-3 rounded mt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">⛔ Already booked slots for selected date:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                {[...bookedSlots]
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((slot, i) => (
                        <li key={i}>
                        {slot.startTime} – {slot.endTime}
                        </li>
                    ))}

                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
