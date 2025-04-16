import React from 'react';
import { ClientProfileDto } from './../../types/ClientProfileDto';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, AlertOctagon, MapPin, Phone } from 'lucide-react';

interface Props {
  client: ClientProfileDto;
}

const PublicClientInfoCard: React.FC<Props> = ({ client }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-slate-50 to-gray-100 border border-gray-200 rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center"
    >
      {/* Аватар */}
      {client.avatarUrl && (
        <img
          src={client.avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500 shadow-lg"
        />
      )}

      {/* Имя и город */}
      <h2 className="text-2xl font-bold text-gray-800 mb-1">
        {client.name} {client.surname}
      </h2>

      {client.city && (
        <p className="text-gray-500 flex justify-center items-center gap-1 mb-2">
          <MapPin size={16} /> {client.city}
        </p>
      )}

      {/* Контакт */}
      {client.otherContactLinks ? (
        <div className="text-sm text-gray-700 mb-4 flex justify-center items-center gap-1">
          <Phone size={16} /> <span className="font-medium">{client.otherContactLinks}</span>
        </div>
      ) : (
        <div className="text-sm italic text-gray-400 mb-4">📵 Hidden Contacts</div>
      )}

      {/* Кнопки */}
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={() => navigate(`/chat/${client.userId}`)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow"
          >
            <MessageCircle size={18} /> Send Message
          </button>

        <button
          onClick={() => navigate(`/complaint/new?clientId=${client.id}`)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow transition"
        >
          <AlertOctagon size={18} /> Complaint
        </button>
      </div>
    </motion.div>
  );
};

export default PublicClientInfoCard;
