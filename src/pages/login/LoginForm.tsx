import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your backend
    console.log('Signup attempt with:', email, password);
    // For this example, we'll just set a dummy token and redirect to login
    navigate('/login');
  };

  return (
    <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
    <input type="hidden" name="remember" value="true" />
    <div className="rounded-md shadow-sm -space-y-px">
      
      <div>
        <label htmlFor="email-address" className="sr-only">Email address</label>
        <input 
          id="email-address" 
          name="email" 
          type="email" 
          autoComplete="email" 
          required 
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
          placeholder="Email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          autoComplete="new-password" 
          required 
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>

    <div>
      <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Log in
      </button>
    </div>
  </form>
  );
};

export default LoginForm;