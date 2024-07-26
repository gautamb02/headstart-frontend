import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error'; // Add more types if needed
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, message, type }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'error':
        return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center p-4 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-50 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="flex items-center space-x-4">
          {getIcon()}
          <p className="text-lg font-semibold">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
