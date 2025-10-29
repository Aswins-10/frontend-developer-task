'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/token/`,
        { username, password }
      );

      const { access } = res.data;
      login(username, access);
      toast.success('Login successful! 🎉');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Invalid username or password');
      toast.error('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Need to create an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}


