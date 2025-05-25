// import { useState, useEffect } from "react";
// import axios from "axios";
// import ServiceTable from "../Components/ServiceProviderTable";
// import EditModal from "../Components/ServiceProviderEditModal";


// const ServiceTab = () => {
//   const [serviceProviders, setServiceProviders] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchServiceProviders = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('accessToken');
//         if (!token) {
//           setError("Token tapılmadı.");
//           return;
//         }
//         const response = await axios.get("https://localhost:7164/api/ServiceProviderProfile/ListOfProfiles", {
//           headers: { Authorization: ` Bearer ${token}` },
//         });
//         console.log("API Response:", response.data); // Debug

//         if (Array.isArray(response.data)) {
//           setServiceProviders(response.data);
//         } else if (Array.isArray(response.data.serviceProviders)) {
//           setServiceProviders(response.data.serviceProviders);
//         } else if (Array.isArray(response.data.data)) {
//           setServiceProviders(response.data.data);
//         } else {
//           setError("Serverdən düzgün formatda service provider siyahısı gəlmədi.");
//         }
//       } catch (err) {
//         setError("Service provider-lar yüklənərkən xəta baş verdi.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceProviders();
//   }, []);


//   const handleBlockServiceProvider = async (Id: number) => {
//     try {
//       const deletedReason = prompt("please write reason for deActivating :");

//       if (!deletedReason || deletedReason.trim() === "") {
//         alert("Reasin of Deactivating !");
//         return;
//       }

//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         alert("Token doesn t found .");
//         return;
//       }

//       await axios.delete(`https://localhost:7164/api/ServiceProviderProfile/${Id}?deletedReason=${encodeURIComponent(deletedReason)}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setServiceProviders(prev => prev.filter(provider => provider.userId !== Id));
//       alert("Service provider has deleted.");
//     } catch (err) {
//       alert("there s been error during deleting.");
//       console.error(err);
//     }
//   };










//   // Yeni state-lər
//   const [editingProvider, setEditingProvider] = useState<any>(null);

//   const handleEditServiceProvider = (provider: any) => {
//     setEditingProvider(provider);
//   };

//   // const handleSaveEditedProvider = async (updatedProvider: any) => {
//   //   try {
//   //     const token = localStorage.getItem('accessToken');
//   //     if (!token) {
//   //       alert("Token tapılmadı.");
//   //       return;
//   //     }

//   //     const formData = new FormData();
//   //     formData.append("name", updatedProvider.name);
//   //     formData.append("surname", updatedProvider.surname);
//   //     formData.append("age", updatedProvider.age);
//   //     formData.append("city", updatedProvider.city);
//   //     formData.append("genderId", updatedProvider.genderId);
//   //     formData.append("genderId", updatedProvider.experienceYears);
//   //     formData.append("description", updatedProvider.description);
//   //     formData.append("parentCategoryId", updatedProvider.parentCategoryId);
//   //     formData.append("isActive", updatedProvider.isActive.toString());
//   //     formData.append("approvalDate", updatedProvider.approvalDate);




//   //     // ↓↓↓ URL-ini sən dolduracaqsan
//   //     await axios.post(`https://localhost:7164/api/ServiceProviderProfile/Update${updatedProvider.id}`, formData, {
//   //       headers: {"Content-Type": "multipart/form-data" , Authorization: `Bearer ${token}`},
//   //     });


//   //     setServiceProviders(prev =>
//   //       prev.map(p => (p.userId === updatedProvider.userId ? updatedProvider : p))
//   //     );

//   //     setEditingProvider(null);
//   //     alert("Məlumat uğurla yeniləndi.");
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Yeniləmə zamanı xəta baş verdi.");
//   //   }
//   // };


  
//   const handleSaveEditedProvider = async (updatedProvider: any) => {
//     console.log("Edited provider data:", updatedProvider);
//     // Burada updatedProvider-in içindəki məlumatları yoxlayın
//     try {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         alert("Token tapılmadı.");
//         return;
//       }

//       // const formData = new FormData();
//       // formData.append("Name", updatedProvider.name);
//       // formData.append("Surname", updatedProvider.surname);
//       // formData.append("Age", updatedProvider?.age?.toString());
//       // formData.append("City", updatedProvider?.city);
//       // formData.append("GenderId", updatedProvider?.genderId?.toString());
//       // formData.append("ExperienceYears", updatedProvider?.experienceYears?.toString());
//       // formData.append("Description", updatedProvider?.description);
//       // formData.append("AvatarFile", updatedProvider?.avatarFile.toString());
//       // formData.append("ParentCategoryId", updatedProvider?.parentCategoryId?.toString());
//       // formData.append("isActive", (updatedProvider.isActive ?? false).toString());
//       // formData.append("IsDeleted", updatedProvider?.isDeleted?.toString() || "false");
//       // formData.append("ApprovalDate", updatedProvider?.approvalDate);
//       // formData.append("ServiceTypeIds", updatedProvider.serviceTypes.join(","));


//       const formData = new FormData();

//       formData.append("Name", updatedProvider.name);
//       formData.append("Surname", updatedProvider.surname);
//       formData.append("City", updatedProvider.city);
//       formData.append("Description", updatedProvider.description);

//       if (updatedProvider.age !== undefined) formData.append("Age", updatedProvider.age.toString());
//       if (updatedProvider.genderId !== undefined) formData.append("GenderId", updatedProvider.genderId.toString());
//       if (updatedProvider.experienceYears !== undefined) formData.append("ExperienceYears", updatedProvider.experienceYears.toString());
//       if (updatedProvider.parentCategoryId !== undefined) formData.append("ParentCategoryId", updatedProvider.parentCategoryId.toString());

//       formData.append("isActive", (updatedProvider.isActive ?? false).toString());
//       formData.append("IsDeleted", updatedProvider?.isDeleted?.toString() || "false");

//       if (updatedProvider.approvalDate)
//         formData.append("ApprovalDate", new Date(updatedProvider.approvalDate).toISOString());

//       if (updatedProvider.avatarFile)
//         formData.append("AvatarFile", updatedProvider.avatarFile); // `.toString()` yox!

//       if (updatedProvider.serviceTypes?.length)
//         formData.append("ServiceTypeIds", updatedProvider.serviceTypes.join(","));

//       await axios.post(`https://localhost:7164/api/ServiceProviderProfile/Update/${updatedProvider.id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`  
//         },
//       });

//       setServiceProviders(prev =>
//         prev.map(p => (p.userId === updatedProvider.userId ? updatedProvider : p))
//       );

//       setEditingProvider(null);
//       alert("Məlumat uğurla yeniləndi.");
//     } catch (err) {
//       console.error(err);
//       alert("Yeniləmə zamanı xəta baş verdi.");
//     }
//   };









//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-gray-900">All Service Providers</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <>


//           <ServiceTable
//             serviceProviders={serviceProviders}
//             onBlockServiceProvider={handleBlockServiceProvider}
//             onEditServiceProvider={handleEditServiceProvider}
//           />
//         </>
//       )}


//       {editingProvider && (
//         <EditModal
//           serviceProvider={editingProvider}
//           onClose={() => setEditingProvider(null)}
//           onSave={handleSaveEditedProvider}
//         />
//       )}


//     </div>
//   );
// };

// export default ServiceTab;


import { useState, useEffect } from "react";
import axios from "axios";
import ServiceTable from "../Components/ServiceProviderTable";
import EditModal from "../Components/ServiceProviderEditModal";

const ServiceTab = () => {
  const [serviceProviders, setServiceProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("Token tapılmadı.");
          return;
        }
        const response = await axios.get("https://localhost:7164/api/ServiceProviderProfile/ListOfProfiles", {
          headers: { Authorization: ` Bearer ${token}` },
        });
        console.log("API Response:", response.data); // Debug

        if (Array.isArray(response.data)) {
          setServiceProviders(response.data);
        } else if (Array.isArray(response.data.serviceProviders)) {
          setServiceProviders(response.data.serviceProviders);
        } else if (Array.isArray(response.data.data)) {
          setServiceProviders(response.data.data);
        } else {
          setError("Serverdən düzgün formatda service provider siyahısı gəlmədi.");
        }
      } catch (err) {
        setError("Service provider-lar yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleBlockServiceProvider = async (Id: number) => {
    try {
      const deletedReason = prompt("please write reason for deActivating :");

      if (!deletedReason || deletedReason.trim() === "") {
        alert("Reasin of Deactivating!");
        return;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token doesn't found.");
        return;
      }

      await axios.delete(`https://localhost:7164/api/ServiceProviderProfile/${Id}?deletedReason=${encodeURIComponent(deletedReason)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServiceProviders(prev => prev.filter(provider => provider.userId !== Id));
      alert("Service provider has deactivated.");
      window.location.reload(); 
    } catch (err) {
      alert("There has been an error during deleting.");
      console.error(err);
    }
    
  };

  // Yeni state-lər
  const [editingProvider, setEditingProvider] = useState<any>(null);

  const handleEditServiceProvider = (provider: any) => {
    setEditingProvider(provider);
  };

  const handleSaveEditedProvider = async (updatedProvider: any) => {
    console.log("Edited provider data:", updatedProvider);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert("Token tapılmadı.");
        return;
      }

     
      const formData = new FormData();

     
      formData.append("Name", updatedProvider.name);
      formData.append("Surname", updatedProvider.surname);
      formData.append("City", updatedProvider.city || "");
      formData.append("Description", updatedProvider.description || "");

      if (updatedProvider.age !== undefined) formData.append("Age", updatedProvider.age.toString());
      if (updatedProvider.genderId !== undefined) formData.append("GenderId", updatedProvider.genderId.toString());
      if (updatedProvider.experienceYears !== undefined) formData.append("ExperienceYears", updatedProvider.experienceYears.toString());
      if (updatedProvider.parentCategoryId !== undefined) formData.append("ParentCategoryId", updatedProvider.parentCategoryId.toString());

      formData.append("IsActive", (updatedProvider.isActive ? "true" : "false"));
      formData.append("IsDeleted", updatedProvider.isDeleted ? "true" : "false");

      // formData.append("IsDeleted", updatedProvider.isDeleted?.toString() || "false");

      if (updatedProvider.approvalDate)
        formData.append("ApprovalDate", new Date(updatedProvider.approvalDate).toString());

      if (updatedProvider.avatarFile)
        formData.append("AvatarFile", updatedProvider.avatarFile);

      // `ServiceTypeIds` array-lə işləyirik
      if (updatedProvider.serviceTypes?.length) {
        updatedProvider.serviceTypes.forEach((id: number) => {
          formData.append("ServiceTypeIds", id.toString());
        });
      }

    
      await axios.post(`https://localhost:7164/api/ServiceProviderProfile/Update/${updatedProvider.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      
      setServiceProviders(prev =>
        prev.map(p => (p.userId === updatedProvider.userId ? updatedProvider : p))
      );

      setEditingProvider(null);
      alert("Məlumat uğurla yeniləndi.");
    } catch (err) {
      console.error(err);
      alert("Yeniləmə zamanı xəta baş verdi.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900">All Service Providers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ServiceTable
          serviceProviders={serviceProviders}
          onBlockServiceProvider={handleBlockServiceProvider}
          onEditServiceProvider={handleEditServiceProvider}
        />
      )}

      {editingProvider && (
        <EditModal
          serviceProvider={editingProvider}
          onClose={() => setEditingProvider(null)}
          onSave={handleSaveEditedProvider}
        />
      )}
    </div>
  );
};

export default ServiceTab;
