import { BookingStatus } from '../../../../types/Booking';

const statusColors: Record<BookingStatus, string> = {
  Pending: 'bg-yellow-400 text-black',
  Approved: 'bg-green-500 text-white',
  Rejected: 'bg-red-500 text-white',
  Cancelled: 'bg-gray-400 text-white',
  Completed: 'bg-blue-600 text-white',
  InProgress: 'bg-purple-500 text-white',
};

interface Props {
  status: BookingStatus;
}

const ServiceBookingStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}>
      {status}
    </span>
  );
};

export default ServiceBookingStatusBadge;
