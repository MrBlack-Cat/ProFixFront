
// import React from "react";


// interface User {
//   id: number;
//   userId: number;
//   name?: string;
//   surname?: string;
//   about?: string;
//   isActive?: boolean;
// }

// interface Props {
//   clients: User[];
//   onBlockUser: (userId: number) => void;
//   onEditUser: (userId: number) => void;
// }

// const UserTable: React.FC<Props> = ({ clients, onBlockUser, onEditUser }) => {
//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//           <tr>
//             <th className="py-3 px-6">Id</th>
//             <th className="py-3 px-6">UserId</th>
//             <th className="py-3 px-6">Name</th>
//             <th className="py-3 px-6">Surname</th>
//             <th className="py-3 px-6">About</th>
//             <th className="py-3 px-6">IsActive</th>
//             <th className="py-3 px-6">Manage Account</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client) => (
//             <tr key={client.id} className="hover:bg-gray-50 transition">
//               <td className="border px-4 py-2">{client.id || "—"}</td>
//               <td className="border px-4 py-2">{client.userId || "—"}</td>
//               <td className="border px-4 py-2">{client.name || "—"}</td>
//               <td className="border px-4 py-2">{client.surname || "—"}</td>
//               <td className="border px-4 py-2">{client.about || "—"}</td>
//               <td className="border px-4 py-2">{client.isActive ? "False" : "True"}</td>
//               <td className="border px-4 py-2 text-center">
//                 <div className="flex justify-center space-x-2">
//                   <button
//                     onClick={() => onBlockUser(client.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => onEditUser(client.id)}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;
import React from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  userId: number;
  name?: string;
  surname?: string;
  about?: string;
  isActive?: boolean;
}

interface Props {
  clients: User[];
  onBlockUser: (userId: number) => void;
  onEditUser: (userId: number) => void;
}

const UserTable: React.FC<Props> = ({ clients, onBlockUser, onEditUser }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="py-3 px-6">Id</th>
            <th className="py-3 px-6">UserId</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Surname</th>
            <th className="py-3 px-6">About</th>
            <th className="py-3 px-6">IsActive</th>
            <th className="py-3 px-6">Manage Account</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50 transition">
              <td className="border px-4 py-2">
                <Link
                  to={`/clients/${client.id}`} // Profile səhifəsinə yönləndirir
                  className="text-blue-600 hover:underline"
                >
                  {client.id || "—"}
                </Link>
              </td>
              <td className="border px-4 py-2">{client.userId || "—"}</td>
              <td className="border px-4 py-2">{client.name || "—"}</td>
              <td className="border px-4 py-2">{client.surname || "—"}</td>
              <td className="border px-4 py-2">{client.about || "—"}</td>
              <td className="border px-4 py-2">{client.isActive === true ? "true" : "false"}</td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onBlockUser(client.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => onEditUser(client.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
