import React, { useState } from 'react';
import Config from '../../config';
import { fetchOrganizations } from '../../context/organization/actions';
import { useOrganizationContext } from '../../context/organization/context';

interface ModalProps {
  onClose: () => void;
}

const AddOrganizationModal: React.FC<ModalProps> = ({ onClose }) => {
  const [name, setOrgName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const {dispatch} = useOrganizationContext();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { API_URL } = Config;

    try {
      let options = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          authorization: localStorage.getItem('token') || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  name, description })
      };

      const res = await fetch(`${API_URL}/api/organization/create`, options);

      if (res.ok) {
        // Assuming the API returns the newly created organization, you might want to add it to your state.
        const newOrg = await res.json();
        console.log('New Organization Created:', newOrg);
        fetchOrganizations(dispatch);
        // Optionally, you can add the new organization to the context or state here
      } else {
        console.error('Failed to create organization');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-1/3">
        <h2 className="text-2xl mb-4">Add New Organization</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Organization Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setOrgName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Organization Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrganizationModal;
