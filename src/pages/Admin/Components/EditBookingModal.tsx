import { FC } from 'react';

interface EditBookingModal {
  booking: any;
  setBooking: (booking: any) => void;
  onSave: () => void;
  onClose: () => void;
}

const EditBookingModal: FC<EditBookingModal> = ({ booking, setBooking, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
    <input
      type="text"
      value={booking.description}
      onChange={(e) => setBooking({ ...booking, description: e.target.value })}
      className="input border border-gray-300 rounded p-2 w-full mb-4"
      placeholder="Description"
    />
    <div className="flex justify-end space-x-4">
      <button onClick={onSave} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
      <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
        Cancel
      </button>
    </div>
  </div>
</div>

  );
};

export default EditBookingModal;
