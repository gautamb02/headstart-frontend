import React, { useEffect, useState } from "react";
import Config from "../../config";
import { useRolesContext } from "../../context/roles/context";
import { useOrganizationContext } from "../../context/organization/context";
import WhatsAppModal from "./WhatsappModal";
import { Member } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const { WA_MSG } = Config;

interface MembersListProps {
  members: Member[];
  loading: boolean;
  fetchMembers: () => void;
  error: string | null;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  loading,
  fetchMembers,
  error,
}) => {
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedField, setSortedField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { rolesstate } = useRolesContext();
  const { state } = useOrganizationContext();

  const roleMap = new Map(rolesstate.roles.map((role) => [role.id, role.role]));

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
        mobile: phoneNumber || "919970102190",
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

  const filteredMembers = members.filter((member) => {
    member.role = roleMap.get(member.roleId);
    return JSON.stringify(member)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortedField) {
      const aValue = a[sortedField as keyof Member];
      const bValue = b[sortedField as keyof Member];
      if (
        aValue !== null &&
        bValue !== null &&
        aValue !== undefined &&
        bValue !== undefined
      ) {
        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
      }
    }
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortedField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortedField === field) {
      return sortDirection === "asc" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full mx-auto mt-4">
      <input
        type="text"
        placeholder="Search by name, role, phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out w-full"
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th
              className="px-4   py-2 border-b cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name <FontAwesomeIcon icon={getSortIcon("name")} />
            </th>
            <th
              className="px-4   py-2 border-b cursor-pointer"
              onClick={() => handleSort("phoneNumber")}
            >
              Phone Number <FontAwesomeIcon icon={getSortIcon("phoneNumber")} />
            </th>
            <th
              className="px-4   py-2 border-b cursor-pointer"
              onClick={() => handleSort("roleId")}
            >
              Role <FontAwesomeIcon icon={getSortIcon("roleId")} />
            </th>
            <th
              className="px-4   py-2 border-b cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status <FontAwesomeIcon icon={getSortIcon("status")} />
            </th>
            <th className="px-4  py-2 border-b">WhatsApp</th>
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((member) => (
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
