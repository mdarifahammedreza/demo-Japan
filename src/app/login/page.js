'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy auth check: accept any username/password
    if (username && password) {
      // Save "token" in localStorage
      localStorage.setItem('authToken', 'dummy-auth-token');

      // Redirect to original requested page or homepage
      router.push(redirectUrl);
      console.log(redirectUrl)
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 transition">
          Log In
        </button>
      </form>
    </div>
  );
}
