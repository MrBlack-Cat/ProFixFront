import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api';
import { Notification } from '../../types/Notification';
import { BellIcon } from 'lucide-react';
import { getDecodedToken } from '../../utils/auth';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const decoded = getDecodedToken();
  const isLoggedIn = !!decoded?.userId;

  const loadNotifications = async () => {
    try {
      const res = await fetchWithAuth('https://localhost:7164/api/Notification/unread');
      const json = await res.json();
      if (Array.isArray(json.data)) {
        setNotifications(json.data);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error('❌ Notification load error:', err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    loadNotifications();
    const interval = setInterval(() => loadNotifications(), 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoggedIn) return null;

  const getIconForType = (typeId: number) => {
    switch (typeId) {
      case 1: return '💬'; // NewMessage
      case 2: return '⭐'; // NewReview
      case 3: return '❤️'; // LikePost
      case 4: return '📄'; // NewGuarantee
      case 5: return '📅'; // NewBooking
      default: return '🔔';
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      const endpoint =
        notification.typeId === 1
          ? `mark-all-from-user/${notification.createdBy}`
          : notification.typeId === 5
            ? `mark-all-booking-from-user/${notification.createdBy}`
            : `${notification.id}/mark-as-read`;

      await fetchWithAuth(`https://localhost:7164/api/Notification/${endpoint}`, {
        method: 'PUT',
      });
    } catch (err) {
      console.error("❌ Ошибка при отметке как прочитанное:", err);
    }

    switch (notification.typeId) {
      case 1:
        navigate('/messages');
        break;
      case 2:
        navigate('/profile/reviews');
        break;
      case 3:
        navigate('/posts');
        break;
      case 4:
        navigate('/guarantees');
        break;
      case 5:
        navigate('/service-profile?tab=Booking');
        break;
      default:
        console.log('Unnamed type error');
    }

    // Tip ve user uzre hamisini silirik
    setNotifications((prev) =>
      prev.filter(
        (n) =>
          !(
            n.createdBy === notification.createdBy &&
            n.typeId === notification.typeId
          )
      )
    );
    setDropdownOpen(false);
  };

  return (
    <div className="relative" ref={bellRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative">
        <BellIcon className="w-6 h-6 text-white" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 p-2 space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className="cursor-pointer text-sm p-2 border-b border-gray-200 hover:bg-gray-100 rounded transition"
            >
              <span className="mr-1">{getIconForType(n.typeId)}</span>
              {n.message}
              <div className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
