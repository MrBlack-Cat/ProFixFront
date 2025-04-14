// components/BookedSlotsLayer.tsx
import React from 'react';

interface Slot {
  startTime: string; // "10:00"
  endTime: string;   // "12:00"
}

interface BookedSlotsLayerProps {
  slots: Slot[];
}

const getTopOffset = (time: string): number => {
  const [h, m] = time.split(':').map(Number);
  return (h * 60 + m) * (48 / 60); // 1 час = 48px
};

const getHeight = (start: string, end: string): number => {
  const [h1, m1] = start.split(':').map(Number);
  const [h2, m2] = end.split(':').map(Number);
  return ((h2 * 60 + m2) - (h1 * 60 + m1)) * (48 / 60);
};

const BookedSlotsLayer: React.FC<BookedSlotsLayerProps> = ({ slots }) => {
  return (
    <div className="relative w-full h-[1152px]"> {/* 24h * 48px */}
      {slots.map((slot, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bg-red-400 bg-opacity-50 rounded-md shadow-sm border border-red-600 text-xs text-white px-2 py-1"
          style={{
            top: `${getTopOffset(slot.startTime)}px`,
            height: `${getHeight(slot.startTime, slot.endTime)}px`,
          }}
        >
          {slot.startTime} – {slot.endTime}
        </div>
      ))}
    </div>
  );
};

export default BookedSlotsLayer;
