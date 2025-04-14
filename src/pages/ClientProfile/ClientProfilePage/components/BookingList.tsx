import { Booking } from '../../../../types/Booking';
import BookingItem from './BookingItem';

type Props = {
  bookings: Booking[];
  reload: () => void;
};

const BookingList: React.FC<Props> = ({ bookings, reload }) => {
  const sorted = [...bookings].sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

  return (
    <ul className="space-y-4">
      {sorted.map((booking) => (
        <BookingItem key={booking.id} booking={booking} reload={reload} />
      ))}
    </ul>
  );
};

export default BookingList;
