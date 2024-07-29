// components/WhatsAppModal.tsx
import React, { useState } from 'react';

import {Member} from './MembersList'
import Config from '../../config';
interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (phoneNumber: string) => void;
  phoneNumber: string;
  selectedMember : Member | null
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, onSend, phoneNumber,selectedMember }) => {
 

  const handleSend = () => {
    onSend(phoneNumber);
    // Clear message input
    onClose(); // Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Send WhatsApp Message</h3>
        <h4>{selectedMember?.name}</h4>
        <textarea
          value={Config.WA_MSG}
        
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={4} disabled
          placeholder="Type your message here"
        />
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2">
            Cancel
          </button>
          <button onClick={handleSend} className="px-4 py-2 bg-green-600 text-white rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppModal;
