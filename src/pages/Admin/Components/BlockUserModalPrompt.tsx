import React from "react";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  userName?: string;
}

const BlockUserModal: React.FC<BlockUserModalProps> = ({ isOpen, onClose, onSubmit, userName }) => {
  const [reason, setReason] = React.useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">İstifadəçini blokla</h2>
        <p className="mb-2">{userName} istifadəçisini bloklamaq istəyirsinizmi?</p>
        <textarea
          className="w-full border rounded p-2 mb-4"
          placeholder="Silmə səbəbini yazın..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Ləğv et
          </button>
          <button
            onClick={() => onSubmit(reason)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Blokla
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;
