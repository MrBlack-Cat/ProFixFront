import { createPortal } from 'react-dom';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  position: { top: number; left: number };
}

const TooltipWrapper: React.FC<Props> = ({ children, position }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{ top: position.top, left: position.left }}
      className="fixed z-50 bg-white border border-gray-300 shadow-lg text-xs text-black rounded px-3 py-1 whitespace-nowrap"
    >
      {children}
    </div>,
    document.body
  );
};

export default TooltipWrapper;
