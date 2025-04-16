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
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadSlots = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7164/api/ServiceBooking/provider');
        const json = await res.json();

        if (json?.data) {
          const filteredByDate = json.data.filter((s: BookedSlotDto) =>
            dayjs(s.scheduledDate).isSame(selectedDate, 'day')
          );
          setBookedSlots(filteredByDate);
        } else {
          setBookedSlots([]);
        }
      } catch (err) {
        console.error('❌ Booking Load Error:', err);
        setBookedSlots([]);
      }
    };

    loadSlots();
  }, [selectedDate]);

  const filteredSlots = statusFilter === 'all'
    ? bookedSlots
    : bookedSlots.filter((slot) => slot.status === statusFilter);

  return (
    <div className="relative p-4 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          📅 Select Date:
        </label>
        <DatePicker
          selected={selectedDate.toDate()}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedDate(dayjs(date));
            }
          }}
          dateFormat="dd-MM-yyyy"
          className="border border-gray-300 rounded px-3 py-1 shadow-sm"
          showPopperArrow={false}
          placeholderText="Select Date"
        />
      </div>

      {/* 📋 Status Filtr */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          🔎 Status Filtr:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 shadow-sm text-sm"
        >
          <option value="all">Все</option>
          <option value="Approved">✅ Approved</option>
          <option value="Pending">⏳ Pending</option>
          <option value="Rejected">❌ Rejected</option>
          <option value="Cancelled">🚫 Cancelled</option>
          <option value="InProgress">🔄 In Progress</option>
          <option value="Completed">🏁 Completed</option>
        </select>
      </div>

      {/* 📌Bookings */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">📌Booking for Selected Date</h3>
        <ExactSlotTimeline slots={filteredSlots} />
      </div>

      {/* 🎯 Interactive */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🎯 Interactive Booking Grid </h3>
        <Legend />
        <InteractiveBookingGrid
          slots={filteredSlots}
          onSelect={(start, end) => {
            console.log('Selected:', start, end);
            // Можно отправить API-запрос здесь
          }}
        />
      </div>
    </div>
  );
};

export default DayScheduleTab;
