import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterInput from './RegisterInput';
import RoleSelect from './RoleSelect';
import RegisterButton from './RegisterButton';

const RegisterForm = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState(2);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://localhost:7164/api/Users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password, roleId }),
      });

      const result = await response.json();
      if (!response.ok || !result.isSuccess) {
        const errorMsg = result.errors?.[0] || 'Registration failed';
        throw new Error(errorMsg);
      }
      

      navigate('/login');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      {error && <div className="text-red-500 text-center">{error}</div>}

      <RegisterInput
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />
      <RegisterInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <RegisterInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <RoleSelect value={roleId} onChange={(e) => setRoleId(Number(e.target.value))} />
      <RegisterButton loading={loading} />
    </form>
  );
};

export default RegisterForm;
