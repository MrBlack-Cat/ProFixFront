import React from 'react';
import ChatDashboard from '../../pages/Messaging/ChatDashboard';

const MessagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#122E34] via-[#0d7458] to-[#01374c] text-white px-4 py-8">
      <ChatDashboard />
    </div>
  );
};

export default MessagesPage;
