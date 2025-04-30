import { Booking } from '../../../../types/Booking';

type Props = {
  booking: Booking;
  reload: () => void;
};

const BookingActionButtons: React.FC<Props> = ({ booking, reload }) => {
  const handleAction = async (action: string) => {
    await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/${action}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    reload();
  };

  return (
    <div className="space-x-2 mt-2">
      {booking.status === 'Pending' && (
        <>
          <button onClick={() => handleAction('approve')} className="text-green-600 hover:underline">Approve</button>
          <button onClick={() => handleAction('reject')} className="text-red-600 hover:underline">Reject</button>
        </>
      )}
      {booking.status === 'Approved' && (
        <button onClick={() => handleAction('complete')} className="text-blue-600 hover:underline">Complete</button>
      )}
    </div>
  );
};

export default BookingActionButtons;
