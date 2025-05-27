import { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { fetchWithAuth } from '../../utils/api';

interface ChatMessage {
  sender: string;
  text: string;
  createdAt: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [loading, setLoading] = useState(true);
  const [botTyping, setBotTyping] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem('userId') || "0";

  const scrollToBottom = () => {
    setTimeout(() => {
      messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const loadMessages = async () => {
    if (!userId || userId === "0") return;

    try {
      const res = await fetchWithAuth(`https://localhost:7164/api/Chat/user/${userId}`);
      const data = await res.json();

      if (data.isSuccess) {
        const history: ChatMessage[] = data.data.map((m: any) => ({
          sender: m.sender,
          text: m.messageText,
          createdAt: m.createdAt
        }));
        setMessages(history);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupSignalRConnection = () => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7164/chatHub?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log('✅ Connected to ChatHub');
        newConnection.on('ReceiveMessage', (sender: string, text: string) => {
          setMessages((prev) => [...prev, { sender, text, createdAt: new Date().toISOString() }]);
          setBotTyping(false);
          scrollToBottom();
        });
      })
      .catch(error => console.error('❌ Connection failed:', error));

    setConnection(newConnection);
  };

  useEffect(() => {
    loadMessages();
    setupSignalRConnection();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (connection?.state === signalR.HubConnectionState.Connected) {
      setMessages((prev) => [...prev, { sender: 'You', text, createdAt: new Date().toISOString() }]);
      setBotTyping(true);
      await connection.invoke('SendMessage', userId, text);
      scrollToBottom();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <p className="text-white text-lg animate-pulse">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl h-[600px] flex flex-col rounded-2xl p-4 backdrop-blur-md bg-white/10 shadow-2xl border border-white/20">
      <div ref={messageListRef} className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
        <MessageList messages={messages} />
        {botTyping && (
          <div className="text-center text-white/70 text-sm animate-pulse mt-2">
            The bot is typing...
          </div>
        )}
      </div>
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatBox;
