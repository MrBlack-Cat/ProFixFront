import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api';

interface Admin {
  id: number;
  userName: string;
  email: string;
}

const ChatWithAdminButton = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const res = await fetchWithAuth('https://localhost:7164/api/Users/admins');
        const json = await res.json();
        setAdmins(json);
      } catch (err) {
        console.error('❌ Failed to fetch admins:', err);
      }
    };

    loadAdmins();
  }, []);

  const handleClick = () => {
    if (!admins.length) return;
    const randomAdmin = admins[Math.floor(Math.random() * admins.length)];
    navigate(`/messages?userId=${randomAdmin.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:scale-105 transition-all"
    >
     Chat with Admin
    </button>
  );
};

export default ChatWithAdminButton;
