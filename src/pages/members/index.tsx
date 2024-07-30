import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import MemberModal from "./MemberModal";
import Config from "../../config";
import MembersList from "./MembersList";
import { fetchOrganizations } from "../../context/organization/actions";
import { useOrganizationContext } from "../../context/organization/context";


export interface Member {
  id: string;
  role : string  |undefined;
  email: string;
  name: string;
  phoneNumber: string;
  roleId: string;
  userId: string | null;
  status: string;
  addedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}



const Members: React.FC = () => {
  const {dispatch}=  useOrganizationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMembers = async () => {
    const token = localStorage.getItem("token") || "";
    const orgId = localStorage.getItem("selectedOrganization");

    try {
      const response = await fetch(
        `${Config.API_URL}/api/organization/${orgId}/members`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data)
      if (data.success) {
        setMembers(data.members);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setError("An error occurred while fetching members");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrganizations(dispatch);
  }, [dispatch]);
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
        fetchMembers()
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

      <MembersList members={members} loading={loading} fetchMembers={fetchMembers} error={error} />
    </div>
  );
};

export default Members;
