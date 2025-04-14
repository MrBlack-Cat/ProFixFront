import { useEffect, useState } from 'react';
import { Booking } from '../../../../types/Booking';
import { fetchWithAuth } from '../../../../utils/api';
import BookingList from '../components/BookingList';

const BookingTab = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth('https://localhost:7164/api/ServiceBooking/client');
      if (!res.ok) {
        const errText = await res.text();
        console.error('❌ Booking fetch failed:', errText);
        throw new Error(`HTTP ${res.status}`);
      }

      const json = await res.json();
      const bookingArray = Array.isArray(json) ? json : json.data ?? [];
      console.log('📦 Booking API response:', bookingArray);
      setBookings(bookingArray);
    } catch (error) {
      console.error('❌ Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Bookings</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-red-500">⚠️ No bookings found.</p>
      ) : (
        <BookingList bookings={bookings} reload={loadBookings} />
      )}
    </div>
  );
};

export default BookingTab;
