import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Config from '../../config';
import { SignupFormData } from "./types";
import AlertModal from "../../components/AlertModal";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: SignupFormData = {
      email,
      password,
      name,
    };

    try {
      const response = await fetch(`${Config.API_URL}/api/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log("Signup successful:", data);

      setSuccessMessage('Signup successful! Please check your email for verification.');
      setModalType('success');
      setIsModalOpen(true);

      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds to allow the user to see the success message
    } catch (error: any) {
      console.error("Signup failed:", error);
      setErrorMessage(error.message || 'An unknown error occurred');
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
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
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

        {errorMessage && (
          <div className="text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Sign up
          </button>
        </div>
        <div className="flex justify-center">
          <span className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link className="text-blue-600 font-semibold" to="/login">
              Login
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

export default SignupForm;
