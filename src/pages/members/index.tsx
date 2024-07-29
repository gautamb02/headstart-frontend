import React, { useState } from "react";
import Header from "../../components/Header";
import MemberModal from "./MemberModal";
import Config from "../../config";
import MembersList from "./MembersList";

const Members: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (memberData: {
    email: string;
    name: string;
    phoneNumber: string;
    roleId: string;
  }) => {
    const token = localStorage.getItem("token") || "";
    const orgId = localStorage.getItem("selectedOrganization");

    try {
      const response = await fetch(
        `${Config.API_URL}/api/organization/${orgId}/members`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memberData),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        // You might want to update the members list here
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="w-5/6 mx-auto">
      <Header />
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Members</h1>
        <button
          onClick={handleOpenModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Add Member
        </button>
      </div>
      <MemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      <MembersList/>
    </div>
  );
};

export default Members;
