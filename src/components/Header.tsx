import React, { useEffect, useState } from 'react';
import { useOrganizationContext } from '../context/organization/context';
import AddOrganizationModal from '../pages/home/AddOrganizationModal';
import { fetchRoles } from '../context/roles/actions';
import { useRolesContext } from '../context/roles/context';

const Header: React.FC = () => {
  const { state } = useOrganizationContext();
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { roledispatch } = useRolesContext();

  useEffect(() => {
    // Fetch roles and organization data
    fetchRoles(roledispatch);

    // Check if organizations exist
    if (state.organizations.length === 0) {
      setIsModalOpen(true);
    } else {
      const savedOrg = localStorage.getItem('selectedOrganization');
      if (savedOrg && state.organizations.some(org => org.id === savedOrg)) {
        setSelectedOrg(savedOrg);
      } else {
        const defaultOrgId = state.organizations[0].id;
        setSelectedOrg(defaultOrgId);
        localStorage.setItem('selectedOrganization', defaultOrgId);
      }
    }
  }, [state.organizations, roledispatch]); // Depend on organizations and roledispatch

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orgId = event.target.value;
    setSelectedOrg(orgId);
    localStorage.setItem('selectedOrganization', orgId);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between m-4">
      <div className="mb-4 w-1/2">
        {state.organizations.length > 0 ? (
          <select
            value={selectedOrg}
            onChange={handleChange}
            className="form-select mt-1 block w-1/2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {state.organizations.map(org => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-600">No organizations available</p>
        )}
      </div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        {state.organizations.length === 0 ? 'Add Organization' : 'New Organization'}
      </button>
      {isModalOpen && <AddOrganizationModal onClose={closeModal} />}
    </div>
  );
};

export default Header;
