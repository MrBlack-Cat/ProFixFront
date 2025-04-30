import { useParams } from 'react-router-dom';
import ChatThread from '../pages/Messaging/ChatThread';
import { getDecodedToken, logout, isAuthenticated } from '../utils/auth';
import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/api';

const ChatPage = () => {
  const { otherUserId } = useParams();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [otherUserName, setOtherUserName] = useState<string>('...');

  useEffect(() => {
    if (!isAuthenticated()) {
      console.warn("User is not authorized. Redirecting to login.");
      logout();
      return;
    }

    const decoded = getDecodedToken();
    if (decoded?.userId && !isNaN(decoded.userId)) {
      setCurrentUserId(decoded.userId);
    } else {
      console.error("Error: userId is invalid");
      logout();
    }

    // Kim
    if (otherUserId) {
      fetchWithAuth(`https://localhost:7164/api/ClientProfile/by-user/${otherUserId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json?.data?.name) {
            setOtherUserName(`${json.data.name} ${json.data.surname || ''}`);
          } else {
            setOtherUserName('User');
          }
        })
        .catch((err) => {
          console.error('Error loading username:', err);
          setOtherUserName('User');
        });
    }

  }, [otherUserId]);

  if (!currentUserId || !otherUserId) {
    return <div className="p-6 text-center text-gray-500">Loading chat...</div>;
  }

  return (
    <div className="min-h-[80vh] py-20 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">💬 {otherUserName}</h1>
      <ChatThread
  currentUserId={currentUserId}
  otherUserId={parseInt(otherUserId)}
  otherUserName={otherUserName} 
/>

    </div>
  );
};

export default ChatPage;
