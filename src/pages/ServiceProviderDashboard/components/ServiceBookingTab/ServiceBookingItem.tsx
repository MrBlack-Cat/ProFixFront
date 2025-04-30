import { Booking, BookingStatus } from '../../../../types/Booking';
import ServiceBookingStatusBadge from './ServiceBookingStatusBadge';
import { Link } from 'react-router-dom';

interface Props {
  booking: Booking;
  reload: () => void;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ServiceBookingItem: React.FC<Props> = ({ booking, reload }) => {
  const actualStatus: BookingStatus = booking.isCompleted ? 'Completed' : booking.status;

  const handleAction = async (action: 'approve' | 'reject' | 'complete') => {
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/${action}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        console.error(`❌ ${action} error:`, error);
      } else {
        console.log(`✅ ${action} success`);
        reload();
      }
    } catch (err) {
      console.error(`❌ ${action} request error:`, err);
    }
  };

  return (
    <li className="border rounded-2xl p-6 bg-white/30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
      
      {/* cleint */}
      <div className="flex items-center gap-4">
        {booking.clientAvatarUrl ? (
          <img
            src={booking.clientAvatarUrl}
            alt="Client Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300" />
        )}
        <div className="text-sm">
          {booking.clientProfileId ? (
            <Link
              to={`/clients/${booking.clientProfileId}`}
              className="text-cyan-700 hover:underline font-semibold"
            >
              {booking.clientName || 'Unknown Client'}
            </Link>
          ) : (
            <span className="text-gray-500">{booking.clientName || 'Unknown Client'}</span>
          )}
        </div>
      </div>

      {/* description date */}
      <div className="space-y-2">
        <h4 className="text-lg font-bold text-cyan-800">{booking.description || 'No description'}</h4>
        <ServiceBookingStatusBadge status={actualStatus} />
        <p className="text-sm text-gray-700">
          📅 {formatDate(booking.scheduledDate)} ⏱ {booking.startTime.slice(0, 5)}–{booking.endTime.slice(0, 5)}
        </p>
        <p className="text-xs text-gray-500">📌 Created: {formatDate(booking.createdAt)}</p>
      </div>

      {/* Status */}
      <div className="text-xs text-gray-700 space-y-1">
        <p className="font-semibold text-blue-900">🗓️ Status History:</p>
        <ul className="space-y-0.5">
          <li>Approved: {formatDate(booking.confirmationDate)}</li>
          <li>Rejected: {formatDate(booking.rejectedDate)}</li>
          <li>Cancelled: {formatDate(booking.cancelledDate)}</li>
          <li>Completed: {formatDate(booking.completionDate)}</li>
        </ul>
      </div>

      <div className="text-right space-y-2 text-sm">
        {['pending'].includes(booking.status?.toLowerCase() || '') && (
          <>
            <button
              type="button"
              onClick={() => handleAction('approve')}
              className="block text-blue-600 hover:underline"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => handleAction('reject')}
              className="block text-red-600 hover:underline"
            >
              Reject
            </button>
          </>
        )}

        {['approved', 'inprogress'].includes(booking.status?.toLowerCase() || '') && !booking.isCompleted && (
          <button
            type="button"
            onClick={() => handleAction('complete')}
            className="block text-green-600 hover:underline"
          >
            Mark as Completed
          </button>
        )}
      </div>

    </li>
  );
};

export default ServiceBookingItem;
