// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaGithub } from 'react-icons/fa'; // Import icons

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // --- Replace with your actual authentication logic ---
    console.log('Attempting login with:', { username, password });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (username === 'test' && password === 'password') {
        console.log('Login successful!');
        // Redirect or set auth state
        alert('Login successful!'); // For demonstration
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Initiating Google login...');
    alert('Google login initiated (dummy)');
  };

  const handleGithubLogin = () => {
    console.log('Initiating GitHub login...');
    alert('GitHub login initiated (dummy)');
  };

  return (
   <>
     <div className="flex min-h-screen bg-white"> {/* Changed background to white */}
      {/* Left Half: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-200"> {/* White background, lighter border */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2> {/* Darker text for white theme */}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2"> {/* Darker text */}
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 border-gray-300" // Lighter input background and border
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2"> {/* Darker text */}
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 border-gray-300" // Lighter input background and border
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-600 text-xs italic text-center">{error}</p> 
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <span className="flex-grow border-t border-gray-300"></span> {/* Lighter border */}
            <span className="flex-shrink mx-4 text-gray-500">OR</span> {/* Gray text */}
            <span className="flex-grow border-t border-gray-300"></span> {/* Lighter border */}
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              <FaGithub className="mr-2" /> Login with GitHub
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6"> {/* Darker gray for text */}
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-bold"> {/* Blue for links */}
              Register here.
            </Link>
          </p>
        </div>
      </div>

      {/* Right Half: Background Video */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"> {/* Hidden on small screens, flex on large */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" // Adjusted opacity for white background
        >
          <source src="/videos/Space_Pinisi_Ship_s_Epic_Battle.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Optional: Overlay to slightly dim the video or add a tint */}
        {/* <div className="absolute inset-0 bg-white opacity-20 z-10"></div> */}
      </div>
    </div>
   </>
  );
}