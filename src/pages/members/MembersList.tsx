import React, { useEffect, useState } from "react";
import Config from "../../config";
import { useRolesContext } from "../../context/roles/context";
import { useOrganizationContext } from "../../context/organization/context";
import WhatsAppModal from "./WhatsappModal";

const { WA_MSG } = Config;
export interface Member {
  id: string;
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

const MembersList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { rolesstate } = useRolesContext();
  const { state } = useOrganizationContext();

  const roleMap = new Map(rolesstate.roles.map((role) => [role.id, role.role]));

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
    fetchMembers();
  }, [state.selectedOrg]); // Depend on selectedOrg

  const handleSendMessage = async (phoneNumber: string) => {
    const token = localStorage.getItem("token") || "";
  
    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: WA_MSG,
        mobile: phoneNumber || '919970102190',
        msgType: "text",
        templateName: "ssb",
      }),
    };
  
    try {
      const res = await fetch(`${Config.API_URL}/api/wa/send`, options);
  
      if (!res.ok) {
        // Handle non-200 responses
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const jsonResponse = await res.json();
      console.log("WhatsApp Response: ", jsonResponse);
      console.log(`Message sent to ${phoneNumber}`);
  
      // Show success alert
      alert(`Message successfully sent to ${phoneNumber}`);
    } catch (error) {
      console.error("Error sending message: ", error);
      alert(`Failed to send message to ${phoneNumber}`);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full mx-auto mt-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Phone Number</th>
            <th className="px-4 py-2 border-b">Role ID</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Whatsapp</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-4 py-2 border-b">{member.name}</td>
              <td className="px-4 py-2 border-b">{member.phoneNumber}</td>
              <td className="px-4 py-2 border-b">
                {roleMap.get(member.roleId) || "Unknown"}
              </td>
              <td className="px-4 py-2 border-b">{member.status}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => {
                    setSelectedPhoneNumber(member.phoneNumber);
                    setIsModalOpen(true);
                    setSelectedMember(member);
                  }}
                  className="bg-green-600 text-sm text-white px-2 rounded-sm"
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPhoneNumber && (
        <WhatsAppModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSend={handleSendMessage}
          selectedMember={selectedMember}
          phoneNumber={selectedPhoneNumber}
        />
      )}
    </div>
  );
};

export default MembersList;
