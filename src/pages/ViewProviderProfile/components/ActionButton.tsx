import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  icon: React.ReactNode;
  color?: string; 
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, text, icon, color }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all
        ${disabled
          ? "bg-gray-300 cursor-not-allowed text-gray-500"
          : `bg-gradient-to-br from-white/40 to-white/10 ${color} text-white hover:brightness-110 hover:scale-105`}
        backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl
      `}
    >
      {icon}
      {text}
    </button>
  );
};

export default ActionButton;
