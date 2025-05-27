import React, { useState } from 'react';


interface Props {
    onSend: (text: string) => void;
  }
  
  const MessageInput: React.FC<Props> = ({ onSend }) => {
    const [text, setText] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (text.trim()) {
        onSend(text.trim());
        setText('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex space-x-2 p-2 backdrop-blur-md bg-white/10 rounded-2xl">
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition"
        >
          Send
        </button>
      </form>
    );
  };
  
  export default MessageInput;
  