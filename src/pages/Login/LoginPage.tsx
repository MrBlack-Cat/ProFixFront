import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import InputField from './InputField';
import LoginButton from './LoginButton';
import ForgotPassword from './ForgotPassword';
import SignUpLink from './SignUpLink';

interface JwtPayload {
  nameid: string;
  email: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string | string[];
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('👋 handleSubmit вызван');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7164/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.isSuccess) {
        throw new Error('Login failed');
      }

      const { accessToken, refreshToken } = result.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      //  JWT
      const decoded: JwtPayload = jwtDecode(accessToken);
      const role = Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
  ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][0]
  : decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


      console.log('🎯 Роль:', role);

      if (role === 'Client') {
        const res = await fetch('https://localhost:7164/api/ClientProfile/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        console.log('📦 ClientProfile response:', data);

        if (data.isSuccess && data.data) {
          navigate('/profile');
        } else {
          navigate('/client-profile/create');
        }
      } else if (role === 'ServiceProvider') {
        const res = await fetch('https://localhost:7164/api/ServiceProviderProfile/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        console.log('📦 ServiceProfile response:', data);

        if (data.isSuccess && data.data) {
          navigate('/profile');
        } else {
          navigate('/serviceprofile/create');
        }
      } else {
        // Error
        navigate('/');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <motion.div
        className="bg-white rounded-xl shadow-xl p-8 w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Login</h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <LoginButton />
          {loading && <p className="text-center text-blue-600">Loading...</p>}
        </form>

        <ForgotPassword />
        <SignUpLink />
      </motion.div>
    </section>
  );
};

export default LoginPage;
