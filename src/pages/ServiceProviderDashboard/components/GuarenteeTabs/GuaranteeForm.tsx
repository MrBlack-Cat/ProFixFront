// import { useState } from 'react';
// import { fetchWithAuth, uploadToCloud } from '../../../../utils/api';

// interface Props {
//   onCreated: () => void;
// }

// const GuaranteeForm = ({ onCreated }: Props) => {
//   const [clientId, setClientId] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [issueDate, setIssueDate] = useState('');
//   const [expirationDate, setExpirationDate] = useState('');


//   const handleCreate = async () => {
//     if (!clientId || !title || !file) return alert("Client, Title and File are required");

//     setLoading(true);
//     try {
//       const uploadedFileUrl = await uploadToCloud(file);
//       const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           clientProfileId: Number(clientId),
//           title,
//           description,
//           issueDate,
//           expirationDate,
//           fileUrl: uploadedFileUrl
//         })
//       });

//       const json = await res.json();
//       if (json.isSuccess) {
//         setClientId('');
//         setTitle('');
//         setDescription('');
//         setFile(null);
//         onCreated();
//       } else {
//         alert("Error: " + JSON.stringify(json.errors));
//       }
//     } catch (error) {
//       console.error("Create error", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-5 rounded-lg shadow">
//       <h3 className="text-lg font-semibold mb-4">➕ Add Guarantee</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           value={clientId}
//           onChange={(e) => setClientId(e.target.value)}
//           placeholder="Client Profile ID"
//           className="border rounded px-3 py-2"
//         />
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//           className="border rounded px-3 py-2"
//         />
//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="border rounded px-3 py-2 col-span-1 md:col-span-2"
//         />
//         <input
//           type="date"
//           value={issueDate}
//           onChange={(e) => setIssueDate(e.target.value)}
//           className="border rounded px-3 py-2"
//           placeholder="Issue Date"
//         />
//         <input
//           type="date"
//           value={expirationDate}
//           onChange={(e) => setExpirationDate(e.target.value)}
//           className="border rounded px-3 py-2"
//         />
//         <input
//           type="file"
//              accept="image/*,application/pdf"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="border rounded px-3 py-2 col-span-1 md:col-span-2"
//         />
//       </div>
//       <button
//         disabled={loading}
//         onClick={handleCreate}
//         className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//       >
//         {loading ? 'Creating...' : 'Create Guarantee'}
//       </button>
//     </div>
//   );
// };

// export default GuaranteeForm;
