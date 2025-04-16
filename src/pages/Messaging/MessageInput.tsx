import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api';
import { getDecodedToken } from '../../utils/auth'; // ← добавь

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

      const senderUserId = getDecodedToken()?.userId;; // ← берём userId из токена

      onSend({
        ...json.data,
        senderUserId, // 👈 ОБЯЗАТЕЛЬНО
        createdAt: new Date().toISOString(),
      });

      setContent('');
    } catch (err) {
      console.error('❌ Ошибка при отправке сообщения:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center rounded-lg gap-3 mt-1 pt-2 border-t border-gray-200 bg-slate-100 px-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 rounded-full  mb-2 px-8 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Your Message..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow transition"
      >
        <Send size={18} />
      </button>
    </form>

  );
};

export default MessageInput;
