
// import React from "react";

// // interface serviceProvider {
// //   id: number;
// //   userId: number;
// //   name?: string;
// //   surname?: string;
// //   experienceYears?: number;
// //   city?: string;
// //   isActive?: boolean;
// // }

// interface ServiceProvider {
//   id: number;
//   userId: number;
//   name?: string;
//   surname?: string;
//   city?: string;
//   genderId?: number;
//   age?: number;
//   experienceYears?: number;
//   description?: string;
//   avatarFile?: string | null;
//   parentCategoryId?: number;
//   isActive?: boolean;
//   isDeleted?: boolean;
//   approvalDate?: string;
//   serviceTypeIds?: number[];  // DƏYİŞİKLİK: doğru ad bu olmalıdır
// }



// interface Props {
//   serviceProviders: ServiceProvider[];
//   // onServiceProviderClick: (userId: number) => void;
//   onBlockServiceProvider: (userId: number) => void;
//   onEditServiceProvider: (provider: ServiceProvider) => void; //yeni

// }

// const ServiceProviderTable: React.FC<Props> = ({ serviceProviders, onBlockServiceProvider , onEditServiceProvider }) => {
//   return (  
//     <div className="overflow-x-auto  p-4">

//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//         <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//           <tr>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">UserId</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Surname</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Experience Years</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">City</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">isActive</th>
//             <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Action</th>

//           </tr>
//         </thead>
//         <tbody>

//           {serviceProviders.map((serviceProvider) => (
//             <tr
//               key={serviceProvider.id}
//               className="hover:bg-gray-50 cursor-pointer transition"
//             // onClick={() => onServiceProviderClick(serviceProvider.id)}
//             >
//               <td className="border px-4 py-2">{serviceProvider.id || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.userId || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.name || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.surname || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.experienceYears || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.city || "—"}</td>
//               <td className="border px-4 py-2">{serviceProvider.isActive === true ? "true" : "false"}</td>

//               <td className="border px-4 py-2 text-center group">
//                 <div className="flex justify-center space-x-4">

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onBlockServiceProvider(serviceProvider.id);
//                     }}
//                     className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
//                   >
//                     DeActivate
//                   </button>
                  
//                   {/* <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onEditServiceProvider(serviceProvider);
//                     }}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
//                   >
//                     Edit
//                   </button> */}

//                 </div>
//               </td>
//             </tr>
//           ))}


//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default
//   ServiceProviderTable;

import React from "react";
import { useNavigate } from "react-router-dom"; // Yeni əlavə

interface ServiceProvider {
  id: number;
  userId: number;
  name?: string;
  surname?: string;
  city?: string;
  genderId?: number;
  age?: number;
  experienceYears?: number;
  description?: string;
  avatarFile?: string | null;
  parentCategoryId?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  approvalDate?: string;
  serviceTypeIds?: number[];
}

interface Props {
  serviceProviders: ServiceProvider[];
  onBlockServiceProvider: (userId: number) => void;
  onEditServiceProvider: (provider: ServiceProvider) => void;
}

const ServiceProviderTable: React.FC<Props> = ({
  serviceProviders,
  onBlockServiceProvider,
  onEditServiceProvider,
}) => {
  const navigate = useNavigate(); // Hook istifadəsi

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Id</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">UserId</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Surname</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Experience Years</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">City</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">isActive</th>
            <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody>
          {serviceProviders.map((serviceProvider) => (
            <tr
              key={serviceProvider.id}
              className="hover:bg-gray-50 cursor-pointer transition"
            >
              <td
                className="border px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // navigate(`/provider/${serviceProvider.id}`);
                  navigate(`/service-provider/${serviceProvider.id}`);

                }}
              >
                {serviceProvider.id || "—"}
              </td>
              <td className="border px-4 py-2">{serviceProvider.userId || "—"}</td>
              <td className="border px-4 py-2">{serviceProvider.name || "—"}</td>
              <td className="border px-4 py-2">{serviceProvider.surname || "—"}</td>
              <td className="border px-4 py-2">{serviceProvider.experienceYears || "—"}</td>
              <td className="border px-4 py-2">{serviceProvider.city || "—"}</td>
              <td className="border px-4 py-2">{serviceProvider.isActive === true ? "true" : "false"}</td>
              <td className="border px-4 py-2 text-center group">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBlockServiceProvider(serviceProvider.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                  >
                    DeActivate
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditServiceProvider(serviceProvider);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
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

export default ServiceProviderTable;
