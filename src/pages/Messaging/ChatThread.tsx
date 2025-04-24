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

const ChatThread: React.FC<ChatThreadProps> = ({ otherUserId, currentUserId, otherUserName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const loadMessages = async () => {
    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Message/between?otherUserId=${otherUserId}`);
      const json = await res.json();
      setMessages(json.data || []);
    } catch (err) {
      console.error('❌ Message load error:', err);
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
    <div className="flex mt-2 flex-col h-full rounded-2xl overflow-hidden border border-white/20 shadow-xl">
      <div className="px-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/50 shadow rounded-t-2xl">
      <h2 className="text-xl font-semibold text-white">💬 {otherUserName}</h2>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl"
        style={{ height: 'calc(100vh - 150px)' }}
      >
        {loading ? (
          <p className="text-white/70">Loading Messages...</p>
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

      <div className="px-4 py-3 border-t border-white/20 bg-white/10 backdrop-blur-lg">
        <MessageInput receiverUserId={otherUserId} onSend={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChatThread;