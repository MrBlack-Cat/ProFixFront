import { BookingStatus } from '../../../../types/Booking';

const statusColors: Record<BookingStatus, string> = {
  Pending: 'bg-yellow-400 text-black',
  Approved: 'bg-green-500 text-white',
  Rejected: 'bg-red-500 text-white',
  Cancelled: 'bg-gray-400 text-white',
  Completed: 'bg-blue-600 text-white',
  InProgress: 'bg-purple-500 text-white',
};

type Props = {
  status: BookingStatus;
};

const BookingStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default BookingStatusBadge;
