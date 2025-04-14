import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import DayHeader from './DayScheduleTab/DayHeader';
import Timeline from './DayScheduleTab/Timeline';
import BookedSlotsLayer from './DayScheduleTab/BookedSlotsLayer';
import { fetchWithAuth } from '../../../utils/api';
import { BookedSlotDto } from '../../../types/BookedSlotDto';

const DayScheduleTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [bookedSlots, setBookedSlots] = useState<BookedSlotDto[]>([]);

  useEffect(() => {
    const loadProfileAndSlots = async () => {
      try {
        const profileRes = await fetchWithAuth('https://localhost:7164/api/ServiceProviderProfile/user');
        const profileJson = await profileRes.json();
        const id = profileJson.data?.id;

        const dateStr = selectedDate.format('YYYY-MM-DD');
        const slotRes = await fetchWithAuth(
          `https://localhost:7164/api/ServiceBooking/booked-times?providerId=${id}&date=${dateStr}`
        );
        const slotJson = await slotRes.json();
        setBookedSlots(slotJson);
      } catch (err) {
        console.error('❌ Failed to load profile or slots:', err);
      }
    };

    if (selectedDate) {
      loadProfileAndSlots();
    }
  }, [selectedDate]);

  return (
    <div className="relative p-4">
      <DayHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        weekStart={selectedDate.startOf('week')}
      />

      <div className="relative border border-gray-300 rounded-lg p-4 overflow-y-auto h-[600px] bg-white shadow">
        <Timeline />
        <BookedSlotsLayer slots={bookedSlots} />
      </div>
    </div>
  );
};

export default DayScheduleTab;
