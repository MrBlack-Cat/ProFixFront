import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  message: {
    content: string;
    createdAt: string;
  };
  isOwn: boolean;
}

const MessageBubble: React.FC<Props> = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-[70%] px-4 py-3 rounded-2xl border border-white/20 shadow-lg backdrop-blur-md bg-white/10 text-white ${
          isOwn ? 'rounded-br-none' : 'rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <span className="absolute -bottom-4 right-2 text-[10px] text-white/60">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageBubble;