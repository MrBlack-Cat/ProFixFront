import { Booking, BookingStatus } from '../../../../types/Booking';
import BookingStatusBadge from './BookingStatusBadge';
import { Link } from 'react-router-dom';

type Props = {
  booking: Booking;
  reload: () => void;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const BookingItem: React.FC<Props> = ({ booking, reload }) => {
  const handleCancel = async () => {
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (res.ok) {
        reload();
      } else {
        const err = await res.text();
        console.error('❌ Cancel Error:', err);
      }
    } catch (err) {
      console.error('❌ Cancel Error:', err);
    }
  };

  const actualStatus: BookingStatus = booking.isCompleted ? 'Completed' : booking.status;

  return (
    <li className="bg-white/40 backdrop-blur-md rounded-2xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4">
        {booking.serviceProviderAvatarUrl ? (
          <img src={booking.serviceProviderAvatarUrl} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300" />
        )}
        <div className="text-sm text-indigo-700 font-medium">
          {booking.serviceProviderProfileId ? (
            <Link to={`/service-provider/${booking.serviceProviderProfileId}`} className="hover:underline">
              {booking.serviceProviderName}
            </Link>
          ) : (
            booking.serviceProviderName || 'Unknown'
          )}
        </div>
      </div>

      {/* Description + Status */}
      <div className="space-y-2">
        <h4 className="font-bold text-gray-800">{booking.description || 'No description'}</h4>
        <BookingStatusBadge status={actualStatus} />
        <p className="text-sm text-gray-700">
          📅 {formatDate(booking.scheduledDate)} ⏱ {booking.startTime.slice(0, 5)} - {booking.endTime.slice(0, 5)}
        </p>
      </div>

      {/* Status History */}
      <div className="text-xs text-gray-600 space-y-1">
        <p className="font-semibold">🕓 Status Timeline:</p>
        <ul>
          <li>✅ Approved: {formatDate(booking.confirmationDate)}</li>
          <li>❌ Rejected: {formatDate(booking.rejectedDate)}</li>
          <li>🚫 Cancelled: {formatDate(booking.cancelledDate)}</li>
          <li>✔️ Completed: {formatDate(booking.completionDate)}</li>
        </ul>
      </div>

      {/* Cancel */}
      <div className="text-right">
        {booking.status === 'Pending' && (
          <button onClick={handleCancel} className="text-red-600 hover:underline text-sm">
            Cancel
          </button>
        )}
      </div>
    </li>
  );
};

export default BookingItem;
