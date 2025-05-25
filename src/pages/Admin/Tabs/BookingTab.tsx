// import { useEffect, useState } from "react";
// import axios from "axios";

// interface ServiceBooking {
//   id: number;
//   clientProfileId: number;
//   serviceProviderProfileId: number;
//   description: string;
//   scheduledDate: string;
//   inProgressDate: Date;
// }

// export default function ServiceBookingTab() {
//   const [bookings, setBookings] = useState<ServiceBooking[]>([]);
//   const [searchProviderId, setSearchProviderId] = useState<string>("");
//   const [token, setToken] = useState<string>("");

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       console.error("Token tapılmadı.");
//     }
//     fetchAllBookings();
//   }, []);

//   const fetchAllBookings = async () => {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get<ServiceBooking[]>("https://localhost:7164/api/servicebooking/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Booking-lar yükləndi:", response.data);
//       setBookings(response.data);
//     } catch (error) {
//       console.error("Booking-lar yüklənərkən xəta:", error);
//     }
//   };

//   const fetchByProviderId = async () => {
//     if (!searchProviderId.trim()) {
//       fetchAllBookings();
//       return;
//     }
//     try {
//       const response = await axios.get<ServiceBooking>(`https://localhost:7164/api/servicebooking/${searchProviderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings([response.data]);
//       console.log("Provider ID ilə booking-lar yükləndi:", response.data);
//     } catch (error) {
//       console.error("Provider ID ilə booking-lar yüklənərkən xəta:", error);
//     }
//   };



//   const handleDelete = async (id: number, reason: string) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         alert("Token tapılmadı. Zəhmət olmasa yenidən login olun.");
//         return;
//       }

//       await axios.delete(`https://localhost:7164/api/Review/${id}?reason=${encodeURIComponent(reason)}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      

//       setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
//       alert("Booking uğurla silindi.");
//     } catch (error) {
//       console.error("Silinərkən xəta baş verdi:", error);
//       alert("Booking silinərkən xəta baş verdi.");
//     }
//   };



//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Service Bookings</h2>

//       <div className="flex mb-6">
//         <input
//           type="text"
//           placeholder="ServiceProvider ID ilə axtar..."
//           value={searchProviderId}
//           onChange={(e) => setSearchProviderId(e.target.value)}
//           className="border border-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={fetchByProviderId}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-r-md transition-all"
//         >
//           Axtar
//         </button>
//       </div>

//       <div className="overflow-x-auto p-4">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//             <tr>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Client ID</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Service Provider ID</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Scheduled Date</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">In Progress</th>
//               <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr
//                 key={booking.id}
//                 className="hover:bg-gray-50 transition cursor-pointer"
//               >
//                 <td className="border px-4 py-2">{booking.clientProfileId}</td>
//                 <td className="border px-4 py-2">{booking.serviceProviderProfileId}</td>
//                 <td className="border px-4 py-2 truncate max-w-xs">{booking.description}</td>
//                 <td className="border px-4 py-2">{booking.scheduledDate}</td>
//                 <td className="border px-4 py-2">
//                   {booking.inProgressDate ? new Date(booking.inProgressDate).toLocaleDateString() : "No Date"}
//                 </td>
//                 <td className="border px-4 py-2">
//                   <div className="flex justify-center space-x-4">

//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                     
//                       onClick={() => {
//                         const reason = window.prompt("Niyə bu review-u silmək istəyirsiniz?");
//                         if (reason && reason.trim() !== "") {
//                           handleDelete(booking.id, reason);
//                         } else {
//                           alert("Silinmə səbəbi göstərilməlidir.");
//                         }
//                       }}
//                     >
//                       Sil
//                     </button>
//                     <button
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                       }}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// src/components/ServiceBookingTab.tsximport { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import EditBookingModal from "../Components/EditBookingModal"; // Import the modal component


interface ServiceBooking {
  id: number;
  clientProfileId: number;
  serviceProviderProfileId: number;
  description: string;
  scheduledDate: string;
  inProgressDate: Date | null;
}

export default function ServiceBookingTab() {
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [searchProviderId, setSearchProviderId] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [editBooking, setEditBooking] = useState<ServiceBooking | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token tapılmadı.");
    }
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get<ServiceBooking[]>("https://localhost:7164/api/servicebooking/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Booking-lar yükləndi:", response.data);
      setBookings(response.data);
    } catch (error) {
      console.error("Booking-lar yüklənərkən xəta:", error);
    }
  };

  const fetchByProviderId = async () => {
    if (!searchProviderId.trim()) {
      fetchAllBookings();
      return;
    }
    try {
      const response = await axios.get<ServiceBooking[]>(`https://localhost:7164/api/servicebooking/${searchProviderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Provider ID ilə booking-lar yüklənərkən xəta:", error);
    }
  };

  // const handleEdit = (booking: ServiceBooking) => {
  //   setEditBooking({ ...booking });
  // };

  const handleSave = async () => {
    if (editBooking) {
      try {
        await axios.put(
          `https://localhost:7164/api/servicebooking/${editBooking.id}`,
          editBooking,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === editBooking.id ? { ...b, ...editBooking } : b
          )
        );
        setEditBooking(null);
        alert("Booking məlumatları uğurla yeniləndi.");
      } catch (error) {
        console.error("Yeniləmə zamanı xəta baş verdi:", error);
        alert("Booking məlumatları yenilənərkən xəta baş verdi.");
      }
    }
  };

  const handleDelete = async (id: number, reason: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Token tapılmadı. Zəhmət olmasa yenidən login olun.");
        return;
      }

      await axios.delete(`https://localhost:7164/api/servicebooking/${id}?reason=${encodeURIComponent(reason)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
      alert("Booking uğurla silindi.");
    } catch (error) {
      console.error("Silinərkən xəta baş verdi:", error);
      alert("Booking silinərkən xəta baş verdi.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Service Bookings</h2>

      <div className="flex mb-6">
        <input
          type="text"
          placeholder="search by service provider ID"
          value={searchProviderId}
          onChange={(e) => setSearchProviderId(e.target.value)}
          className="border border-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchByProviderId}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-r-md transition-all"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Client ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Service Provider ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Description</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Scheduled Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">In Progress</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="border px-4 py-2">{booking.clientProfileId}</td>
                <td className="border px-4 py-2">{booking.serviceProviderProfileId}</td>
                <td className="border px-4 py-2 truncate max-w-xs">{booking.description}</td>
                <td className="border px-4 py-2">{booking.scheduledDate}</td>
                <td className="border px-4 py-2">
                  {booking.inProgressDate ? new Date(booking.inProgressDate).toLocaleDateString() : "No Date"}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center space-x-4">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                      onClick={() => {
                        const reason = window.prompt("Niyə bu booking-u silmək istəyirsiniz?");
                        if (reason && reason.trim() !== "") {
                          handleDelete(booking.id, reason);
                        } else {
                          alert("Silinmə səbəbi göstərilməlidir.");
                        }
                      }}
                    >
                      Delete
                    </button>
                    {/* <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                      onClick={() => handleEdit(booking)}
                    >
                      Edit
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editBooking && (
        <EditBookingModal
          booking={editBooking}
          setBooking={setEditBooking}
          onSave={handleSave}
          onClose={() => setEditBooking(null)}
        />
      )}
    </div>
  );
}

