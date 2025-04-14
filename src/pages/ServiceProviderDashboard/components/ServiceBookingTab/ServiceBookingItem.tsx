import { Booking, BookingStatus } from '../../../../types/Booking';
import ServiceBookingStatusBadge from './ServiceBookingStatusBadge';
import { Link } from 'react-router-dom';

type Props = {
  booking: Booking;
  reload: () => void;
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const ServiceBookingItem: React.FC<Props> = ({ booking, reload }) => {
  const actualStatus: BookingStatus = booking.isCompleted ? 'Completed' : booking.status;

  const handleComplete = async () => {
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/complete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Ошибка завершения:", err);
      } else {
        console.log("✅ Бронирование завершено");
        reload();
      }
    } catch (err) {
      console.error("❌ Complete Error:", err);
    }
  };

  const handleApprove = async () => {
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/approve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Ошибка одобрения:", err);
      } else {
        console.log("✅ Одобрено");
        reload();
      }
    } catch (err) {
      console.error("❌ Approve Error:", err);
    }
  };
  
  const handleReject = async () => {
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Ошибка отклонения:", err);
      } else {
        console.log("❌ Отклонено");
        reload();
      }
    } catch (err) {
      console.error("❌ Reject Error:", err);
    }
  };
  

  return (
    <li className="border rounded-xl p-4 shadow bg-white grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div className="flex items-start gap-3">
        {booking.clientAvatarUrl ? (
            <img
            src={booking.clientAvatarUrl}
            alt="Client Avatar"
            className="w-12 h-12 rounded-full object-cover shrink-0"
            />
        ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0" />
        )}

        <div className="text-sm">
            {booking.clientProfileId ? (
            <Link
                to={`/client-profile/${booking.clientProfileId}`}
                className="text-indigo-600 hover:underline"
            >
                {booking.clientName || 'Unknown Client'}
            </Link>
            ) : (
            <span className="text-gray-400">{booking.clientName || 'Unknown Client'}</span>
            )}
        </div>
        </div>



      {/* 2️⃣ Данные бронирования */}
      <div className="space-y-1">
        <h4 className="text-lg font-semibold">{booking.description || 'No description'}</h4>
        <ServiceBookingStatusBadge status={actualStatus} />
        <p className="text-sm text-gray-600">
          📅 {formatDate(booking.scheduledDate)} ⏱ {booking.startTime.slice(0, 5)}–{booking.endTime.slice(0, 5)}
        </p>
        <p className="text-xs text-gray-400">
          📌 Created at: {formatDate(booking.createdAt)}
        </p>
      </div>

      {/* 3️⃣ Статусы */}
      <div className="text-sm text-gray-600 space-y-1">
        <p className="font-semibold text-gray-700">🗓️ Статусы:</p>
        <ul className="space-y-0.5">
          <li>✅ Approved: {formatDate(booking.confirmationDate)}</li>
          <li>❌ Rejected: {formatDate(booking.rejectedDate)}</li>
          <li>🚫 Cancelled: {formatDate(booking.cancelledDate)}</li>
          <li>🏁 Completed: {formatDate(booking.completionDate)}</li>
        </ul>
      </div>

     {/* 4️⃣ Действия */}
     <div className="text-right space-y-1">
  {['pending'].includes(booking.status?.toLowerCase() || '') && (
    <>
      <button
        type="button"
        onClick={handleApprove}
        className="block text-sm text-blue-600 hover:underline"
      >
        Approve
      </button>
      <button
        type="button"
        onClick={handleReject}
        className="block text-sm text-red-600 hover:underline"
      >
        Reject
      </button>
    </>
  )}

  {['approved', 'inprogress'].includes(booking.status?.toLowerCase() || '') && !booking.isCompleted && (
    <button
      type="button"
      onClick={handleComplete}
      className="block text-sm text-green-600 hover:underline"
    >
      Mark as Completed
    </button>
  )}
</div>



    </li>
  );
};

export default ServiceBookingItem;
