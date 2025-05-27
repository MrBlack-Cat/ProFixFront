import React, { useEffect, useState } from "react";

interface ClientProfile {
  id: number;
  userId: number;
  name: string;
  surname: string;
  city: string;
  email: string;
}

interface Props {
  client: ClientProfile | null;
  onClose: () => void;
  onSave: (updatedClient: ClientProfile) => void;
}

const ClientEditModal: React.FC<Props> = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState<ClientProfile>(
    client || { id: 0, userId: 0, name: "", surname: "", city: "", email: "" }
  );

  useEffect(() => {
    if (client) setFormData(client);
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("Token tapılmadı");

      await fetch(`https://localhost:7164/api/clientprofile/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      onSave(formData);
      onClose();
    } catch (error) {
      alert("Yeniləmə zamanı xəta baş verdi.");
    }
  };

  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Client</h2>
        {["name", "surname" , "about", "city", "email" , "isActive"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ClientEditModal;
