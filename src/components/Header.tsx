import React, { useEffect, useState } from 'react';
import { useOrganizationContext } from '../context/organization/context';
import AddOrganizationModal from '../pages/home/AddOrganizationModal';

const Header: React.FC = () => {
  const { state } = useOrganizationContext();
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedOrg = localStorage.getItem('selectedOrganization');
    if (savedOrg) {
      setSelectedOrg(savedOrg);
    }
  }, []);

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
    <div className="flex flex items-center justify-between m-4">
      <div className="mb-4 w-1/2">
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
      </div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
      >
        Add Organization
      </button>
      {isModalOpen && <AddOrganizationModal onClose={closeModal} />}
    </div>
  );
};

export default Header;
