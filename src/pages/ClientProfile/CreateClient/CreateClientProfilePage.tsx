import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    if (!token) {
      alert('Please login.');
      return;
    }

    setLoading(true);

    try {
      let avatarUrl: string | undefined = undefined;

      if (formData.avatar) {
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

        avatarUrl = avatarResult.data.url;
      }

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
          avatarUrl: avatarUrl || null,
          about: formData.about,
          otherContactLinks: formData.otherContactLinks,
        }),
      });

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok || !profileResult.isSuccess) {
        throw new Error(profileResult.errors?.[0] || 'Profile creation failed.');
      }

      console.log('✅ Profile created successfully:', profileResult.data);

      navigate('/client-profile');
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
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/assets/regback5.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-purple-900 to-pink-900 opacity-20" />

      {/* Forma */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative mt-16 z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 w-[500px] shadow-2xl"
      >
        <motion.h1
          className="text-4xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4 tracking-widest drop-shadow-1xl"
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          Create Client Profile
        </motion.h1>

        <CreateClientProfileForm onSubmit={handleSubmit} loading={loading} />
      </motion.div>
    </section>
  );
};

export default CreateClientProfilePage;
