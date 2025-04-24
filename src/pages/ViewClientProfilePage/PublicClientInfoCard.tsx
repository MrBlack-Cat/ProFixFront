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
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-12 max-w-md mx-auto text-center text-white"
    >
      {client.avatarUrl && (
        <img
          src={client.avatarUrl}
          alt="Avatar"
          className="w-48 h-48 rounded-full mx-auto mb-8 object-cover border-4 border-teal-400 shadow-lg"
        />
      )}

      <h2 className="text-2xl font-bold text-white mb-1">
        {client.name} {client.surname}
      </h2>

      {client.city && (
        <p className="text-white/70 flex justify-center items-center gap-1 mb-2">
          <MapPin size={16} /> {client.city}
        </p>
      )}

      {client.otherContactLinks ? (
        <div className="text-sm text-white/80 mb-4 flex justify-center items-center gap-1">
          <Phone size={16} /> <span className="font-medium">{client.otherContactLinks}</span>
        </div>
      ) : (
        <div className="text-sm italic text-white/40 mb-4">📵 Hidden Contacts</div>
      )}

      <div className="flex justify-center gap-4 mt-4 flex-wrap">
      <button
        onClick={() => navigate(`/messages?userId=${client.userId}`)}
        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full shadow"
      >
        <MessageCircle size={18} /> Send Message
      </button>


        <button
          onClick={() => navigate(`/complaint/new?clientId=${client.id}`)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition"
        >
          <AlertOctagon size={18} /> Complaint
        </button>
      </div>
    </motion.div>
  );
};

export default PublicClientInfoCard;