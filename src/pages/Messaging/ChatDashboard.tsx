import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const userIdFromQuery = searchParams.get('userId');

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [chatList, setChatList] = useState<ChatSummary[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('...');
  const [chatCreated, setChatCreated] = useState(false);
  const [nameMap, setNameMap] = useState<Record<number, string>>({});

  const fetchDisplayName = async (userId: number) => {
    if (nameMap[userId]) return;
  
    try {
      // Client
      const clientRes = await fetchWithAuth(`https://localhost:7164/api/ClientProfile/by-user/${userId}`);
      if (clientRes.ok) {
        const clientJson = await clientRes.json();
        if (clientJson?.data?.name) {
          const fullName = `${clientJson.data.name} ${clientJson.data.surname}`;
          setNameMap((prev) => ({ ...prev, [userId]: fullName }));
          return;
        }
      }
  
      // Service Provider
      const spRes = await fetchWithAuth(`https://localhost:7164/api/ServiceProviderProfile/by-user/${userId}`);
      if (spRes.ok) {
        const spJson = await spRes.json();
        if (spJson?.data?.name) {
          const fullName = `${spJson.data.name} ${spJson.data.surname}`;
          setNameMap((prev) => ({ ...prev, [userId]: fullName }));
          return;
        }
      }
  
      // User (admin)
      const userRes = await fetchWithAuth(`https://localhost:7164/api/Users/${userId}`);
      if (userRes.ok) {
        const userJson = await userRes.json();
        if (userJson?.data?.userName) {
          setNameMap((prev) => ({ ...prev, [userId]: userJson.data.userName }));
          return;
        }
      }
  
      setNameMap((prev) => ({ ...prev, [userId]: 'Unknown User' }));
    } catch (err) {
      console.error('❌ Error loading display name:', err);
      setNameMap((prev) => ({ ...prev, [userId]: 'Unknown User' }));
    }
  };
  

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
        const chats: ChatSummary[] = json.data || [];
        setChatList(chats);

        chats.forEach((chat) => fetchDisplayName(chat.otherUserId));

        const userIdNumber = Number(userIdFromQuery);
        if (userIdFromQuery && !isNaN(userIdNumber)) {
          let target = chats.find((c) => c.otherUserId === userIdNumber);

          if (!target && !chatCreated) {
            const createRes = await fetchWithAuth('https://localhost:7164/api/Message', {
              method: 'POST',
              body: JSON.stringify({
                receiverUserId: userIdNumber,
                content: "Hi, may I kindly get in touch with you regarding a service?",
              }),
            });

            if (createRes.ok) {
              setChatCreated(true);
              const refreshed = await fetchWithAuth('https://localhost:7164/api/Message/chats');
              const refreshedJson = await refreshed.json();
              const newChats: ChatSummary[] = refreshedJson.data || [];
              setChatList(newChats);
              target = newChats.find((c) => c.otherUserId === userIdNumber);
              newChats.forEach((chat) => fetchDisplayName(chat.otherUserId));
            }
          }

          if (target && selectedUserId !== target.otherUserId) {
            setSelectedUserId(target.otherUserId);
            fetchDisplayName(target.otherUserId);
            const fallbackName = target.otherUserName || '...';
            fetchDisplayName(target.otherUserId).then(() => {
              setSelectedUserName(nameMap[target.otherUserId] || fallbackName);
            });
          }
        } else if (chats.length > 0 && selectedUserId === null) {
          const first = chats[0];
          setSelectedUserId(first.otherUserId);
          fetchDisplayName(first.otherUserId);
          setSelectedUserName(nameMap[first.otherUserId] || first.otherUserName);
        }
      } catch (err) {
        console.error('Error loading chats:', err);
      }
    };

    if (currentUserId !== null) {
      loadChats();
    }
  }, [userIdFromQuery, currentUserId, nameMap]);

  return (
    <div className="fixed inset-3 mt-14 grid gap-4 grid-cols-1 md:grid-cols-3">
      <div className="bg-white/10 mt-2 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-4 md:col-span-1 overflow-y-auto h-[90vh]">
        <h2 className="text-xl font-semibold text-white text-center">💬 Chat List</h2>
        <ul className="space-y-2">
          {chatList.map((chat) => (
            <li
              key={chat.otherUserId}
              onClick={() => {
                setSelectedUserId(chat.otherUserId);
                setSelectedUserName(nameMap[chat.otherUserId] || chat.otherUserName);
              }}
              className={`p-3 rounded-xl cursor-pointer transition border border-white/10 text-white/80 hover:bg-green-900/80 ${
                selectedUserId === chat.otherUserId
                  ? 'bg-emerald-900/80 shadow-inner backdrop-blur-sm'
                  : 'bg-white/10 shadow-inner backdrop-blur-sm'
              }`}
            >
              <p className="font-medium">{nameMap[chat.otherUserId] || chat.otherUserName}</p>
              <p className="text-xs truncate">{chat.lastMessageContent}</p>
              <p className="text-[10px] text-right">
                {new Date(chat.lastMessageTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2 h-[90vh]">
        {selectedUserId && currentUserId ? (
          <ChatThread
            currentUserId={currentUserId}
            otherUserId={selectedUserId}
            otherUserName={nameMap[selectedUserId] || selectedUserName}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-white/50">
              Select a chat on the left to start a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
