import { Booking } from '../../../../types/Booking';
import ServiceBookingItem from './ServiceBookingItem';

interface Props {
  bookings: Booking[];
  reload: () => void;
}

const ServiceBookingList: React.FC<Props> = ({ bookings, reload }) => {
  const sorted = [...bookings].sort(
    (a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
  );

  return (
    <ul className="space-y-6">
      {sorted.map((booking) => (
        <ServiceBookingItem key={booking.id} booking={booking} reload={reload} />
      ))}
    </ul>
  );
};

export default ServiceBookingList;
