import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

type BookingForm = {
  serviceProviderProfileId: string;
  description: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
};

const CreateBookingModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState<BookingForm>({
    serviceProviderProfileId: '',
    description: '',
    scheduledDate: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await fetch('/api/ServiceBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ dto: form })
    });
    onCreated();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-bold mb-4">Create Booking</h3>
        <input
          type="number"
          name="serviceProviderProfileId"
          placeholder="Provider ID"
          className="input"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="input mt-2"
          onChange={handleChange}
        />
        <input
          type="date"
          name="scheduledDate"
          className="input mt-2"
          onChange={handleChange}
        />
        <input
          type="time"
          name="startTime"
          className="input mt-2"
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          className="input mt-2"
          onChange={handleChange}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBookingModal;
