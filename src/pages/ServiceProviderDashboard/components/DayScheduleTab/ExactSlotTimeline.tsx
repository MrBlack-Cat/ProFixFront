import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TooltipWrapper from './TooltipWrapper';
import { BookedSlotDto } from '../../../../types/BookedSlotDto';


interface Slot {
  startTime: string;
  endTime: string;
  clientName: string;
  clientProfileId: number;
  clientAvatarUrl?: string;
}

interface ExactSlotTimelineProps {
    slots: BookedSlotDto[];
  }

const formatTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-200 text-green-800 hover:bg-green-300';
      case 'Pending': return 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300';
      case 'Rejected': return 'bg-red-200 text-red-800 hover:bg-red-300';
      case 'Cancelled': return 'bg-gray-300 text-gray-700 hover:bg-gray-400';
      case 'InProgress': return 'bg-blue-200 text-blue-800 hover:bg-blue-300';
      case 'Completed': return 'bg-purple-200 text-purple-800 hover:bg-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

const ExactSlotTimeline: React.FC<ExactSlotTimelineProps> = ({ slots }) => {
  const navigate = useNavigate();
  const [hoveredSlot, setHoveredSlot] = useState<Slot | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent, slot: Slot) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPos({ top: rect.top - 120, left: rect.left + rect.width / 2 });
    setHoveredSlot(slot);
  };

  const handleMouseLeave = () => {
    setHoveredSlot(null);
  };

  if (!slots || slots.length === 0) {
    return <p className="text-sm text-gray-400">Нет бронирований на этот день</p>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-3 py-2 px-1 bg-gray-50 rounded border border-gray-300 shadow-inner min-w-[600px]">
        {slots.map((slot, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-md shadow text-sm cursor-pointer transition-all relative ${getStatusColor(slot.status)}`}
            onClick={() => navigate(`/clients/${slot.clientProfileId}`)}
            onMouseEnter={(e) => handleMouseEnter(e, slot)}
            onMouseLeave={handleMouseLeave}
          >
            <span className="font-semibold">{formatTime(slot.startTime)}</span>
            <span className="text-xs">до</span>
            <span className="font-semibold">{formatTime(slot.endTime)}</span>
          </div>
        ))}
      </div>

      {hoveredSlot && (
        <TooltipWrapper position={tooltipPos}>
          <div className="flex flex-col items-center text-center">
            {hoveredSlot.clientAvatarUrl && (
              <img
                src={hoveredSlot.clientAvatarUrl}
                alt="Аватар"
                className="w-12 h-12 rounded-full mb-2 border border-gray-300 object-cover"
              />
            )}
            <p className="text-sm font-medium">{hoveredSlot.clientName}</p>
            <p className="text-xs text-gray-500">ID: {hoveredSlot.clientProfileId}</p>
            <button
              onClick={() => navigate(`/clients/${hoveredSlot.clientProfileId}`)}
              className="mt-2 text-xs text-blue-600 hover:underline"
            >
              Open Client Profile →
            </button>
          </div>
        </TooltipWrapper>
      )}
    </div>
  );
};

export default ExactSlotTimeline;
