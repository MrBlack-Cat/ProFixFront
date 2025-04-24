import React from "react";

interface User {
  id: number;
  userName?: string;
  email?: string;
  roleName?: string;
  isActive?: boolean;
}

interface Props {
  clients: User[];
  onUserClick: (userId: number) => void;
  onBlockUser: (userId: number) => void;
}

const UserTable: React.FC<Props> = ({ clients, onUserClick, onBlockUser }) => {
  return (
    <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
          <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
          <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
          <th className="border px-4 py-2 text-sm font-semibold text-gray-700">IsActive</th>
          <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Action</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition"
              onClick={() => onUserClick(client.id)}>
            <td className="border px-4 py-2">{client.userName || "—"}</td>
            <td className="border px-4 py-2">{client.email || "—"}</td>
            <td className="border px-4 py-2">{client.roleName || "—"}</td>
            <td className="border px-4 py-2">{client.isActive ? "Yes" : "No"}</td>
            <td className="border px-4 py-2 text-center group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBlockUser(client.id);
                }}
                className="group-hover:bg-red-600 group-hover:text-white text-black font-medium bg-transparent border-2 border-transparent group-hover:border-red-600 rounded px-3 py-1 transition-all duration-300 group-hover:scale-110"
              >
                Block Account
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
