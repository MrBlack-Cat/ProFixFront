import React, { useEffect, useRef, useState } from 'react';
import { fetchWithAuth } from '../../utils/api';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface Message {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  senderUserId: number;
}

interface ChatThreadProps {
  otherUserId: number;
  currentUserId: number;
  otherUserName: string;
}

const ChatThread: React.FC<ChatThreadProps> = ({
  otherUserId,
  currentUserId,
  otherUserName,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    try {
      const url = `https://localhost:7164/api/Message/between?otherUserId=${otherUserId}`;
      const res = await fetchWithAuth(url);
      const json = await res.json();
      setMessages(json.data || []);
    } catch (err) {
      console.error('❌ Ошибка загрузки сообщений:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [otherUserId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 bg-white shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">💬 {otherUserName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4  bg-slate-100 space-y-3" style={{ height: 'calc(100vh - 150px)' }}>
        {loading ? (
          <p className="text-gray-500">Загрузка сообщений...</p>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={msg.id ?? `${msg.senderUserId}-${msg.createdAt}-${index}`}
              message={msg}
              isOwn={msg.senderUserId === currentUserId}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t px-4 py-3 bg-white">
        <MessageInput receiverUserId={otherUserId} onSend={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChatThread;
