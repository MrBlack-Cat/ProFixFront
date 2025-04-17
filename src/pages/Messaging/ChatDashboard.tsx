import { useEffect, useState } from 'react';
import ChatThread from './ChatThread';
import { fetchWithAuth } from '../../utils/api';
import { getDecodedToken } from '../../utils/auth';

interface ChatSummary {
  otherUserId: number;
  otherUserName: string;
  lastMessageContent: string;
  lastMessageTime: string;
}

const ChatDashboard = () => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [chatList, setChatList] = useState<ChatSummary[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('...');

  useEffect(() => {
    const decoded = getDecodedToken();
    if (decoded?.userId) {
      setCurrentUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7164/api/Message/chats');
        const json = await res.json();
        setChatList(json.data || []);
        if (json.data?.length > 0) {
          setSelectedUserId(json.data[0].otherUserId);
          setSelectedUserName(json.data[0].otherUserName);
        }
      } catch (err) {
        console.error('Ошибка загрузки чатов:', err);
      }
    };

    loadChats();
  }, []);

  return (
    <div className="fixed inset-3 mt-8 grid grid-cols-1 md:grid-cols-3">
      <div className="bg-white rounded-lg shadow-md p-4 md:col-span-1 overflow-y-auto h-[90vh]">
        <h2 className="text-xl font-semibold mb-2 text-center">💬 Мои чаты</h2>
        <ul className="space-y-2">
          {chatList.map((chat) => (
            <li
              key={chat.otherUserId}
              onClick={() => {
                setSelectedUserId(chat.otherUserId);
                setSelectedUserName(chat.otherUserName);
              }}
              className={`p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition ${selectedUserId === chat.otherUserId ? 'bg-blue-200' : 'bg-gray-100'}`}
            >
              <p className="font-medium">{chat.otherUserName}</p>
              <p className="text-xs text-gray-500 truncate">{chat.lastMessageContent}</p>
              <p className="text-[10px] text-gray-400 text-right">{new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2 h-[90vh]">
        {selectedUserId && currentUserId ? (
          <ChatThread
            currentUserId={currentUserId}
            otherUserId={selectedUserId}
            otherUserName={selectedUserName}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Выберите чат слева, чтобы начать переписку
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;