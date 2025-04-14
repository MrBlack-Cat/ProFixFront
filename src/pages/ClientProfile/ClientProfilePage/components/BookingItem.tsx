import { Booking, BookingStatus } from '../../../../types/Booking';
import BookingStatusBadge from './BookingStatusBadge';
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

const BookingItem: React.FC<Props> = ({ booking, reload }) => {
  const handleCancel = async () => {
    console.log("🔁 Попытка отмены брони ID:", booking.id);
    try {
      const res = await fetch(`https://localhost:7164/api/ServiceBooking/${booking.id}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
  
      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Ошибка отмены:", err);
      } else {
        console.log("✅ Бронирование отменено, обновляем список...");
        reload(); // эта функция должна делать повторный fetch
      }
    } catch (err) {
      console.error("❌ Cancel Error:", err);
    }
  };
  

  const actualStatus: BookingStatus = booking.isCompleted ? 'Completed' : booking.status;

  return (
    <li className="border rounded-xl p-4 shadow bg-white grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
      {/* 1️⃣ Левая — аватар + имя */}
      <div className="flex items-start gap-3">
  {booking.serviceProviderAvatarUrl ? (
    <img
      src={booking.serviceProviderAvatarUrl}
      alt="Avatar"
      className="w-12 h-12 rounded-full object-cover shrink-0"
    />
  ) : (
    <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0" />
  )}

  <div className="text-sm">
    <p className="text-sm text-indigo-600">
      Provider:{' '}
      {booking.serviceProviderName ? (
        booking.serviceProviderProfileId ? (
          <Link
            to={`/service-provider/${booking.serviceProviderProfileId}`}
            className="underline hover:text-indigo-800 transition"
          >
            {booking.serviceProviderName}
          </Link>
        ) : (
          booking.serviceProviderName
        )
      ) : (
        <span className="text-gray-400">N/A</span>
      )}
    </p>
  </div>
</div>


      {/* 2️⃣ Центр — описание, дата, статус */}
      <div className="space-y-1">
        <h4 className="text-lg font-semibold">{booking.description || 'No description'}</h4>
        <BookingStatusBadge status={actualStatus} />
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

      {/* 4️⃣ Кнопка */}
      <div className="text-right">
        {booking.status === 'Pending' && (
          <button
          type="button"
            onClick={handleCancel}
            className="text-sm text-red-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </li>
  );
};

export default BookingItem;
