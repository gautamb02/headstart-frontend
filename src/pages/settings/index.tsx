import React, { useState } from 'react';
import Header from '../../components/Header';
import { useRolesContext } from '../../context/roles/context';
import { fetchRoles } from '../../context/roles/actions'; // Import action creator
import Config from '../../config';

interface Role {
  id: string;
  role: string;
}

const Settings: React.FC = () => {
  const { rolesstate, roledispatch } = useRolesContext();
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newRole.trim()) {
      setMessage('Role cannot be empty');
      return;
    }

    try {
      const orgId =localStorage.getItem('selectedOrganization'); // Replace with actual organization ID
      const token = localStorage.getItem('token'); // Replace with actual token

      const response = await fetch(`${Config.API_URL}/api/organization/${orgId}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const result = await response.json();

      if (result.success === 1) {
        setMessage('Role added successfully');
        setNewRole('');
        fetchRoles(roledispatch);
        // Optionally, refetch roles or dispatch an action to update context
        // roledispatch(setRoles([...rolesstate.roles, { id: result.roleId, role: newRole }]));
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding role');
    }
  };

  return (
    <div className="w-5/6 mx-auto">
      <Header />
      <h1 className="text-3xl font-semibold mb-4">Settings</h1>
      <SectionTitle title="Roles" />
      <RoleList roles={rolesstate.roles} />
      <RoleForm newRole={newRole} setNewRole={setNewRole} onSubmit={handleSubmit} />
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

// Reusable Component for Section Title
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h3 className="text-xl font-bold mb-2">{title}</h3>
);

// Reusable Component for Role List
const RoleList: React.FC<{ roles: Role[] }> = ({ roles }) => (
  <ul className="list-disc pl-5 mb-4">
    {roles.map((role) => (
      <li key={role.id} className="mb-1">{role.role}</li>
    ))}
  </ul>
);

// Form Component for Adding New Role
const RoleForm: React.FC<{
  newRole: string;
  setNewRole: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent) => void;
}> = ({ newRole, setNewRole, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-4">
    <label htmlFor="role" className="block text-sm font-medium text-gray-700">New Role:</label>
    <input
      type="text"
      id="role"
      value={newRole}
      onChange={(e) => setNewRole(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    />
    <button
      type="submit"
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
    >
      Add Role
    </button>
  </form>
);

export default Settings;
