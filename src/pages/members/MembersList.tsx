import React, { useEffect, useState } from "react";
import Config from "../../config";
import { useRolesContext } from "../../context/roles/context";
import { useOrganizationContext } from "../../context/organization/context";
import WhatsAppModal from "./WhatsappModal";

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

  const handleSendMessage = (phoneNumber: string) => {
    // Define the necessary constants
    const API_KEY = Config.WA_API;
    const USER_ID = Config.WA_USERID;
    const SENDING_NUMBER = Config.WA_SENDER_NUMBER;
    const RECEIVER_PHONE_NUMBER = "919970102190"; 
    const TEMPLATE_NAME = Config.WA_TEMPLATE_NAME; 

    console.log(
         API_KEY,
         USER_ID,
         SENDING_NUMBER,
         RECEIVER_PHONE_NUMBER ,
         TEMPLATE_NAME
    )
    // Construct the form data
    const formData = new FormData();
    formData.append("userid", USER_ID);
    formData.append("msg", Config.WA_MSG);
    formData.append("wabaNumber", SENDING_NUMBER);
    formData.append("output", "json");
    formData.append("mobile", RECEIVER_PHONE_NUMBER);
    formData.append("sendMethod", "quick");
    formData.append("msgType", "text");
    formData.append("templateName", TEMPLATE_NAME);

    // Define the API URL
    const apiUrl = "https://theultimate.io/WAApi/send";

    // Make the POST request
    fetch(apiUrl, {
      method: "POST",
      headers: {
        apikey: API_KEY,
       
        'Content-Type': '*',
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(`Message send to ${phoneNumber}`);
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
