import React, { useState } from 'react';

interface Slot {
  startTime: string;
  endTime: string;
}

interface InteractiveBookingGridProps {
  slots: Slot[];
  onSelect: (start: string, end: string) => void;
}

const generateTimeSteps = () => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      times.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return times;
  };
  

const isBooked = (time: string, slots: Slot[]) => {
  const minutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
  return slots.some((s) => {
    const [sh, sm] = s.startTime.split(':').map(Number);
    const [eh, em] = s.endTime.split(':').map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    return minutes >= start && minutes < end;
  });
};

const InteractiveBookingGrid: React.FC<InteractiveBookingGridProps> = ({ slots, onSelect }) => {
  const times = generateTimeSteps();
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (index: number) => {
    if (isBooked(times[index], slots)) return;
    setStartIndex(index);
    setEndIndex(index);
    setIsDragging(true);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging && !isBooked(times[index], slots)) {
      setEndIndex(index);
    }
  };

  const handleMouseUp = () => {
    if (startIndex !== null && endIndex !== null && startIndex !== endIndex) {
      const [from, to] = [startIndex, endIndex].sort((a, b) => a - b);
      const selectedStart = times[from];
      const selectedEnd = times[to + 1] || times[to];
      onSelect(selectedStart, selectedEnd);
    }
    setStartIndex(null);
    setEndIndex(null);
    setIsDragging(false);
  };

  const getClass = (i: number) => {
    const booked = isBooked(times[i], slots);
    if (booked) return 'bg-red-400 text-white';
    if (startIndex !== null && endIndex !== null) {
      const [from, to] = [startIndex, endIndex].sort((a, b) => a - b);
      if (i >= from && i <= to) return 'bg-blue-500 text-white';
    }
    return 'bg-green-100 hover:bg-green-200 text-gray-700';
  };

  return (
    <div className="select-none" onMouseLeave={() => setIsDragging(false)}>
      <div className="flex space-x-1 flex-wrap" onMouseUp={handleMouseUp}>
        {times.map((time, i) => (
          <div
            key={time}
            className={`w-20 h-14 flex items-center justify-center rounded-md text-sm cursor-pointer shadow ${getClass(i)}`}
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveBookingGrid;
