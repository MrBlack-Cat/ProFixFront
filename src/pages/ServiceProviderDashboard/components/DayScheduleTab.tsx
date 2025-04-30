import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { fetchWithAuth } from '../../../utils/api';
import { BookedSlotDto } from '../../../types/BookedSlotDto';
import InteractiveBookingGrid from './DayScheduleTab/InteractiveBookingGrid';
import ExactSlotTimeline from './DayScheduleTab/ExactSlotTimeline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Legend = () => (
  <div className="flex gap-4 items-center text-sm text-gray-600 mb-2">
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-red-400 rounded" /> Booked
    </div>
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-green-200 rounded" /> Free
    </div>
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-blue-500 rounded" /> Selected
    </div>
  </div>
);

const DayScheduleTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [bookedSlots, setBookedSlots] = useState<BookedSlotDto[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const loadSlots = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth('https://localhost:7164/api/ServiceBooking/provider');
      const json = await res.json();

      if (json?.data) {
        const filtered = json.data.filter((s: BookedSlotDto) =>
          dayjs(s.scheduledDate).isSame(selectedDate, 'day')
        );
        setBookedSlots(filtered);
      } else {
        setBookedSlots([]);
      }
    } catch (err) {
      console.error('❌ Error loading bookings:', err);
      setBookedSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSlots();
  }, [selectedDate]);

  const filteredSlots = statusFilter === 'all'
    ? bookedSlots
    : bookedSlots.filter((slot) => slot.status === statusFilter);

  return (
    <div className="relative bg-blue-100 p-6 rounded-2xl shadow-lg space-y-8">
      {/* Date */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          📅 Select Date:
        </label>
        <DatePicker
          selected={selectedDate.toDate()}
          onChange={(date) => date && setSelectedDate(dayjs(date))}
          dateFormat="dd-MM-yyyy"
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
          showPopperArrow={false}
          placeholderText="Select Date"
        />
      </div>

      {/* Filtr*/}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">
          🔎 Status Filter:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 shadow-sm text-sm focus:ring focus:ring-blue-300"
        >
          <option value="all">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Cancelled">Cancelled</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Bookings for Selected Date</h3>
        {loading ? (
          <p className="text-blue-500 text-center">Loading bookings... ⏳</p>
        ) : (
          <ExactSlotTimeline slots={filteredSlots} />
        )}
      </div>

      {/* Booking grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Interactive Booking Grid</h3>
        <Legend />
        <InteractiveBookingGrid
          slots={filteredSlots}
          onSelect={(start, end) => {
            console.log('🆕 Selected slot:', start, '→', end);
            // Bron yaratmaq ucun gelecekde"
          }}
        />
      </div>
    </div>
  );
};

export default DayScheduleTab;
