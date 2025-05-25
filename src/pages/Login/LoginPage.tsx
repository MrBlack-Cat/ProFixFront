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
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
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
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://localhost:7164/api/Users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.isSuccess) {
        throw new Error('Login failed');
      }

      const { accessToken, refreshToken } = result.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decoded: JwtPayload = jwtDecode(accessToken);
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
localStorage.setItem('userId', userId);
      const role = Array.isArray(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
        ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][0]
        : decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


      if (role === 'Client') {
        const res = await fetch('https://localhost:7164/api/ClientProfile/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        navigate(data.isSuccess && data.data ? '/client-profile' : '/client-profile/create');
      } else if (role === 'ServiceProvider') {
        const res = await fetch('https://localhost:7164/api/ServiceProviderProfile/user', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        navigate(data.isSuccess && data.data ? '/service-profile' : '/serviceprofile/create');
      }else if (role === 'Admin') {
        const res = await fetch('https://localhost:7164/api/clientprofile/all', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const data = await res.json();
        navigate(data.isSuccess && data.data ? '/admin/admin-dashboard' : '/client-profile/create'); //burda 2 ci sehifeni duzelt
          // navigate('/admin/admin-dashboard');
        }
         else {
        navigate('/');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (

    
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden "
        style={{
          backgroundImage: "url('/assets/regback5.jpg')",
        }}
      >
        <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/30 rounded-3xl p-10 w-[380px] shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-8 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Welcome Back
        </motion.h2>

        {error && (
          <motion.div
            className="text-red-400 text-center font-semibold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {error}
          </motion.div>
        )}

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
          <LoginButton loading={loading} />
          {loading && <p className="text-center text-blue-200 animate-pulse">Loading...</p>}
        </form>

        <ForgotPassword />
        <SignUpLink />
      </motion.div>
    </section>
  );
};

export default LoginPage;
