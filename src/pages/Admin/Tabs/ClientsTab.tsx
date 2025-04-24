
// import { useState, useEffect } from "react";
// import axios from "axios";

// const ClientTab = () => {
//   const [clients, setClients] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]); // 🔹 Yeni: seçilmiş userin postları

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("https://localhost:7164/api/users");

//         if (Array.isArray(response.data)) {
//           setClients(response.data);
//         } else if (Array.isArray(response.data.users)) {
//           setClients(response.data.users);
//         } else if (Array.isArray(response.data.data)) {
//           setClients(response.data.data);
//         } else {
//           console.error("Gözlənilən array gəlmədi:", response.data);
//           setError("Serverdən düzgün formatda istifadəçi siyahısı gəlmədi.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("İstifadəçilər yüklənərkən xəta baş verdi.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []);

//   // 🔹 Yeni: user-a klik edəndə onun postlarını yüklə
//   const handleUserClick = async (userId: number) => {
//     try {
//       const response = await axios.get(`https://localhost:7164/api/users/${userId}/posts`); // <-- 🔁 Bunu öz API-nə uyğun dəyiş
//       setSelectedUserPosts(response.data);
//     } catch (err) {
//       console.error("Postlar yüklənərkən xəta:", err);
//     }
//   };

// //istifadecini bloklamaq ucun
//   const handleBlockUser = async (userId: number) => {
//     try {
//       await axios.put(`https://localhost:7164/api/users/${userId}/block`); // 🔁 BURADA API-ni əvəz et
//       alert("İstifadəçi bloklandı.");
//     } catch (err) {
//       alert("Bloklama zamanı xəta baş verdi.");
//       console.error(err);
//     }
//   };
  

//   return (
//     // <div className="p-4">
//     //   <h2 className="text-xl font-bold mb-4">Bütün İstifadəçilər</h2>
      
//     //   {loading ? (
//     //     <p>Yüklənir...</p>
//     //   ) : error ? (
//     //     <p className="text-red-600">{error}</p>
//     //   ) : (
//     //     <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-md">
//     //       <thead className="bg-gray-100">
//     //         <tr>
//     //           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
//     //           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
//     //           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
//     //           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">IsActive</th>
//     //         </tr>
//     //       </thead>
//     //       <tbody>
//     //         {clients.map((client) => (
//     //           <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition"
//     //             onClick={() => handleUserClick(client.id)}
//     //           >
//     //             <td className="border px-4 py-2">{client.userName || "—"}</td>
//     //             <td className="border px-4 py-2">{client.email || "—"}</td>
//     //             <td className="border px-4 py-2">{client.roleName || "—"}</td>
//     //             <td className="border px-4 py-2">{client.isActive ? "Yes" : "No"}</td>
//     //             <button
//     //                 onClick={(e) => {
//     //                   e.stopPropagation(); // parent'a klik getməsin
//     //                   handleBlockUser(client.id);
//     //                 }}
//     //                 className="text-red-500 hover:text-red-700 font-medium">Block Account</button>
//     //           </tr>
//     //         ))}
//     //       </tbody>
//     //     </table>
//     //   )}


//     <div className="p-4">
//   <h2 className="text-xl font-bold mb-4">Bütün İstifadəçilər</h2>

//   {loading ? (
//     <p>Yüklənir...</p>
//   ) : error ? (
//     <p className="text-red-600">{error}</p>
//   ) : (
//     <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-md">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
//           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
//           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
//           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">IsActive</th>
//           <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Action</th> {/* Yeni sütun */}
//         </tr>
//       </thead>
//       <tbody>
//         {clients.map((client) => (
//           <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition"
//             onClick={() => handleUserClick(client.id)} // click edende postlari gormek ucun
//           >
//             <td className="border px-4 py-2">{client.userName || "—"}</td>
//             <td className="border px-4 py-2">{client.email || "—"}</td>
//             <td className="border px-4 py-2">{client.roleName || "—"}</td>
//             <td className="border px-4 py-2">{client.isActive ? "Yes" : "No"}</td>
//             <td className="border px-4 py-2 text-center group"> {/* Yeni hüceyrə */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation(); // parent'a klik getməsin
//                   handleBlockUser(client.id);
//                 }}
//                 className="group-hover:bg-red-600 group-hover:text-white text-black font-medium bg-transparent border-2 border-transparent group-hover:border-red-600 rounded px-3 py-1 transition-all duration-300 group-hover:scale-110"
//               >
//                 Block Account
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )}

//       {/* 🔻 Burada postlar görünəcək */}
//       {selectedUserPosts.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-2">Postlar</h3>
//           <ul className="space-y-2">
//             {selectedUserPosts.map((post) => (
//               <li key={post.id} className="p-3 border rounded bg-gray-50">
//                 <h4 className="font-semibold">{post.title}</h4>
//                 <p>{post.content}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientTab;




// import { useState, useEffect } from "react";
// import axios from "axios";

// const ClientTab = () => {
//   const [clients, setClients] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("https://localhost:7164/api/users");

//         if (Array.isArray(response.data)) {
//           setClients(response.data);
//         } else if (Array.isArray(response.data.users)) {
//           setClients(response.data.users);
//         } else if (Array.isArray(response.data.data)) {
//           setClients(response.data.data);
//         } else {
//           setError("Serverdən düzgün formatda istifadəçi siyahısı gəlmədi.");
//         }
//       } catch (err) {
//         setError("İstifadəçilər yüklənərkən xəta baş verdi.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []);

//   const handleUserClick = async (userId: number) => {
//     try {
//       const response = await axios.get(`https://localhost:7164/api/users/${userId}/posts`);
//       setSelectedUserPosts(response.data);
//     } catch (err) {
//       console.error("Postlar yüklənərkən xəta:", err);
//     }
//   };

//   const handleBlockUser = async (userId: number) => {
//     try {
//       await axios.put(`https://localhost:7164/api/users/${userId}/block`);
//       alert("İstifadəçi bloklandı.");
//     } catch (err) {
//       alert("Bloklama zamanı xəta baş verdi.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Bütün İstifadəçilər</h2>

//       {loading ? (
//         <p>Yüklənir...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden shadow-md">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Username</th>
//               <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Email</th>
//               <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Role</th>
//               <th className="border px-4 py-2 text-sm font-semibold text-gray-700">IsActive</th>
//               <th className="border px-4 py-2 text-sm font-semibold text-gray-700">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((client) => (
//               <tr key={client.id} className="hover:bg-gray-50 cursor-pointer transition"
//                 onClick={() => handleUserClick(client.id)}
//               >
//                 <td className="border px-4 py-2">{client.userName || "—"}</td>
//                 <td className="border px-4 py-2">{client.email || "—"}</td>
//                 <td className="border px-4 py-2">{client.roleName || "—"}</td>
//                 <td className="border px-4 py-2">{client.isActive ? "Yes" : "No"}</td>
//                 <td className="border px-4 py-2 text-center">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleBlockUser(client.id);
//                     }}
//                     className="text-red-600 border border-red-600 rounded px-3 py-1 hover:bg-red-600 hover:text-white transition-all"
//                   >
//                     Block
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {selectedUserPosts.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-2">İstifadəçi Postları</h3>
//           <ul className="space-y-2">
//             {selectedUserPosts.map((post) => (
//               <li key={post.id} className="p-3 border rounded bg-gray-50">
//                 <h4 className="font-semibold">{post.title}</h4>
//                 <p>{post.content}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientTab;
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../Components/UserTable";
import UserPosts from "../Components/UserPosts";

const ClientTab = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7164/api/users");

        if (Array.isArray(response.data)) {
          setClients(response.data);
        } else if (Array.isArray(response.data.users)) {
          setClients(response.data.users);
        } else if (Array.isArray(response.data.data)) {
          setClients(response.data.data);
        } else {
          setError("Serverdən düzgün formatda istifadəçi siyahısı gəlmədi.");
        }
      } catch (err) {
        setError("İstifadəçilər yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  //user-a klik edəndə onun postlarını yüklə
  // const handleUserClick = async (userId: number) => {
  //   try {
  //     const response = await axios.get(`https://localhost:7164/api/Post/PostList`);
  //     setSelectedUserPosts(response.data);
  //   } catch (err) {
  //     console.error("Postlar yüklənərkən xəta:", err);
  //   }
  // };

  const handleUserClick= async () => {
    try {
      const response = await axios.get("https://localhost:7164/api/Post/PostList");
      setSelectedUserPosts(response.data);
    } catch (err) {
      console.error("Postlar yüklənərkən xəta:", err);
    }
  };
  
 //istifadecini bloklamaq ucun
  const handleBlockUser = async (userId: number) => {
    try {
      await axios.put(`https://localhost:7164/api/users/${userId}/block`);
      alert("İstifadəçi bloklandı.");
    } catch (err) {
      alert("Bloklama zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Bütün İstifadəçilər</h2>
      {loading ? (
        <p>Yüklənir...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <UserTable clients={clients} onUserClick={handleUserClick} onBlockUser={handleBlockUser} />
      )}
      <UserPosts posts={selectedUserPosts} />
    </div>
  );
};

export default ClientTab;
