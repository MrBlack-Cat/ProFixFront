// components/Timeline.tsx
const Timeline: React.FC = () => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  
    return (
      <div className="w-20 flex flex-col items-end pr-2 text-xs text-gray-600">
        {timeSlots.map((time, i) => (
          <div key={i} className="h-12 border-b border-gray-200 pr-1">
            {time}
          </div>
        ))}
      </div>
    );
  };
  
  export default Timeline;
  