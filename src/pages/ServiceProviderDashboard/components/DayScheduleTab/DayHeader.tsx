import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import classNames from 'classnames';

interface DayHeaderProps {
  weekStart: Dayjs;
  selectedDate: Dayjs;
  setSelectedDate: React.Dispatch<React.SetStateAction<Dayjs>>;
}

const DayHeader: React.FC<DayHeaderProps> = ({ weekStart, selectedDate, setSelectedDate }) => {
  const days = Array.from({ length: 7 }).map((_, index) =>
    weekStart.add(index, 'day')
  );

  return (
    <div className="flex justify-between mb-4">
      {days.map((day) => {
        const isToday = day.isSame(dayjs(), 'day');
        const isSelected = day.isSame(selectedDate, 'day');

        return (
          <button
            key={day.format('DD-MM-YYYY')}
            onClick={() => setSelectedDate(day)}
            className={classNames(
              'flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200',
              {
                'bg-blue-600 text-white': isSelected,
                'border border-blue-400 text-blue-600': isToday && !isSelected,
                'hover:bg-blue-100 text-gray-700': !isToday && !isSelected,
              }
            )}
          >
            <span className="text-sm font-semibold">{day.format('ddd')}</span>
            <span className="text-base">{day.format('D')}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DayHeader;
