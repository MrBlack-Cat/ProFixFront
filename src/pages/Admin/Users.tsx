import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  // əlavə field-lar varsa bura əlavə et
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">İstifadəçilər</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Ad</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.role === 1 ? "Admin" : "İstifadəçi"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
