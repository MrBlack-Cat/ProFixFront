import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../../utils/api';
import ServiceBookingList from '../../ServiceProviderDashboard/components/ServiceBookingTab/ServiceBookingList';
import { Booking } from '../../../types/Booking';

const ServiceBookingTab = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth('https://localhost:7164/api/ServiceBooking/provider');
      if (!res.ok) throw new Error('HTTP Error');
      const json = await res.json();
      setBookings(Array.isArray(json) ? json : json.data ?? []);
    } catch (error) {
      console.error('❌ Failed to fetch service bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-cyan-800">📆 Service Bookings</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading bookings... ⏳</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-red-500">No bookings found ❌</p>
      ) : (
        <ServiceBookingList bookings={bookings} reload={loadBookings} />
      )}
    </div>
  );
};

export default ServiceBookingTab;
