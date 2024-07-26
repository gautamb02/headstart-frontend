import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Config from '../../config'; 
import AlertModal from '../../components/AlertModal';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login start")
    const formData = { email, password };

    try {
      const response = await fetch(`${Config.API_URL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccessMessage('Login successful!');
      setModalType('success');
      setIsModalOpen(true);

      // Store token or perform any other login-related actions here
      localStorage.setItem('token', data.token);

      // Redirect to home page or any other page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(typeof error === 'object' && error !== null ? (error as Error).message : 'An unknown error occurred');
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              autoComplete="current-password" 
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
        <div className="flex justify-center">
          <span className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link className="text-blue-600 font-semibold" to="/signup">
              Register
            </Link>
          </span>
        </div>
      </form>

      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={errorMessage || successMessage || ''}
        type={modalType}
      />
    </div>
  );
};

export default LoginForm;
