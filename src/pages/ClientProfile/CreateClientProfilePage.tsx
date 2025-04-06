// src/pages/ClientProfile/CreateClientProfilePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateClientProfileForm, { FormData } from './CreateClientProfileForm';

const CreateClientProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Token toxlama
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    } else {
      setToken(accessToken);
    }
  }, [navigate]);

  const handleSubmit = async (formData: FormData) => {
    if (!token) return;

    setLoading(true);

    try {
      const response = await fetch('https://localhost:7164/api/ClientProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.isSuccess) {
        throw new Error(result.errors?.[0] || 'Failed to create profile');
      }

      console.log(' Profile created:', result.data);

      // Profile gonderme
      navigate('/profile');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message); 
      } else {
        alert('Unknown error occurred');
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
