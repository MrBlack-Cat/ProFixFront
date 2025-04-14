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

      if (!res.ok) {
        const errText = await res.text();
        console.error('❌ Service Booking fetch failed:', errText);
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      const bookingArray = Array.isArray(json) ? json : json.data ?? [];
      console.log('📦 Provider Booking API response:', bookingArray);

      // Сортировка: новые сверху
      const sorted = [...bookingArray].sort(
        (a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
      );

      setBookings(sorted);
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Service Bookings</h2>
      {loading ? (
        <p className="text-gray-500">⏳ Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-red-500">⚠️ No service bookings found.</p>
      ) : (
        <ServiceBookingList bookings={bookings} reload={loadBookings} />
      )}
    </div>
  );
};

export default ServiceBookingTab;
