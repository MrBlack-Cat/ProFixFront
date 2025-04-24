import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api';
import { getDecodedToken } from '../../utils/auth';

interface Props {
  receiverUserId: number;
  onSend: (message: any) => void;
}

const MessageInput: React.FC<Props> = ({ receiverUserId, onSend }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetchWithAuth('https://localhost:7164/api/Message', {
        method: 'POST',
        body: JSON.stringify({ receiverUserId, content }),
      });
      const json = await res.json();
      const senderUserId = getDecodedToken()?.userId;

      onSend({
        ...json.data,
        senderUserId,
        createdAt: new Date().toISOString(),
      });
      setContent('');
    } catch (err) {
      console.error('❌ Ошибка при отправке сообщения:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 rounded-full bg-white/10 text-white px-6 py-2 placeholder-white/60 border border-white/30 focus:outline-none"
        placeholder="Your Message..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;