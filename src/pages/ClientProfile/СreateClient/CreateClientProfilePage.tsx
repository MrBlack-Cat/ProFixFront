// // src/pages/ClientProfile/CreateClientProfilePage.tsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CreateClientProfileForm, { FormData } from './CreateClientProfileForm';

// const CreateClientProfilePage = () => {
//   const [loading, setLoading] = useState(false);
//   const [token, setToken] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Token toxlama
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (!accessToken) {
//       navigate('/login');
//     } else {
//       setToken(accessToken);
//     }
//   }, [navigate]);

//   const handleSubmit = async (formData: FormData) => {
//     if (!token) return;

//     setLoading(true);

//     try {
//       const response = await fetch('https://localhost:7164/api/ClientProfile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.isSuccess) {
//         throw new Error(result.errors?.[0] || 'Failed to create profile');
//       }

//       console.log(' Profile created:', result.data);

//       // Profile gonderme
//       navigate('/profile');
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         alert(err.message); 
//       } else {
//         alert('Unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
//       <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-xl">
//         <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//           Complete Your Client Profile
//         </h1>
//         <CreateClientProfileForm onSubmit={handleSubmit} loading={loading} />
//       </div>
//     </section>
//   );
// };

// export default CreateClientProfilePage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateClientProfileForm, { type FormData } from './CreateClientProfileForm';

const CreateClientProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    } else {
      setToken(accessToken);
    }
  }, [navigate]);

  const handleSubmit = async (formData: FormData) => {
    if (!token || !formData.avatar) {
      alert('Please select an avatar.');
      return;
    }

    setLoading(true);

    try {
      // 1. Загрузка аватарки на сервер
      const fileData = new FormData();
      fileData.append('file', formData.avatar);

      const avatarResponse = await fetch('https://localhost:7164/api/FileUpload/upload-client-avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fileData,
      });

      const avatarResult = await avatarResponse.json();

      if (!avatarResponse.ok || !avatarResult.isSuccess) {
        throw new Error(avatarResult.errors?.[0] || 'Avatar upload failed.');
      }

      const avatarUrl = avatarResult.data.url;

      // 2. Создание профиля с полученным URL аватара
      const profileResponse = await fetch('https://localhost:7164/api/ClientProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          city: formData.city,
          avatarUrl,
          about: formData.about,
          otherContactLinks: formData.otherContactLinks,
        }),
      });

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok || !profileResult.isSuccess) {
        throw new Error(profileResult.errors?.[0] || 'Profile creation failed.');
      }

      console.log('Profile created:', profileResult.data);

      // Успешно создан профиль, перенаправляем
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Complete Your Client Profile
        </h1>
        <CreateClientProfileForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </section>
  );
};

export default CreateClientProfilePage;
