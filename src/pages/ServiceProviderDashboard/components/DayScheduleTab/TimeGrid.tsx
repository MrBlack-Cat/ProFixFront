import React from 'react';

interface Slot {
  startTime: string;
  endTime: string;
}

interface TimeGridProps {
  slots: Slot[];
  onTimeClick?: (time: string) => void;
}

const generateTimeSlots = () => {
  const times: string[] = [];
  for (let i = 8; i <= 22; i++) {
    times.push(i.toString().padStart(2, '0') + ':00');
  }
  return times;
};

const isTimeBooked = (time: string, slots: Slot[]) => {
  const timeMinutes = parseInt(time.split(':')[0]) * 60;
  return slots.some((slot) => {
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;
    return timeMinutes >= start && timeMinutes < end;
  });
};

const TimeGrid: React.FC<TimeGridProps> = ({ slots, onTimeClick }) => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-2 min-w-[1024px]">
        {timeSlots.map((time) => {
          const booked = isTimeBooked(time, slots);
          const now = new Date();
          const currentHour = now.getHours();
          const isNow = time.startsWith(currentHour.toString().padStart(2, '0'));

          return (
            <div
              key={time}
              onClick={() => onTimeClick?.(time)}
              className={`w-24 h-20 flex flex-col items-center justify-center rounded-md shadow cursor-pointer transition-all
                ${booked ? 'bg-red-400 text-white' : 'bg-green-100 hover:bg-green-200 text-gray-700'}
                ${isNow ? 'border-2 border-yellow-400' : ''}
              `}
            >
              <span className="text-sm font-semibold">{time}</span>
              <span className="text-xs">{booked ? 'Booked' : 'Free'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeGrid;
