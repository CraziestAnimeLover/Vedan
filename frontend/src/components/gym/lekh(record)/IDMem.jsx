import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const members = [
  { id: 1, name: "John Doe", pic: "https://via.placeholder.com/50", memberId: "M1001" },
  { id: 2, name: "Jane Smith", pic: "https://via.placeholder.com/50", memberId: "M1002" },
  { id: 3, name: "David Johnson", pic: "https://via.placeholder.com/50", memberId: "M1003" },
];

const IDMem = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const closePopup = () => {
    setSelectedMember(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Member List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr.No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Pic</th>
            <th className="border p-2">Member ID</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{member.name}</td>
              <td className="border p-2">
                <img src={member.pic} alt={member.name} className="w-10 h-10 rounded-full mx-auto" />
              </td>
              <td
                className="border p-2 text-blue-500 cursor-pointer hover:underline"
                onClick={() => handleMemberClick(member)}
              >
                {member.memberId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {selectedMember && (
        <div className="fixed inset-0 flex w-96 mx-80 items-center justify-center bg-gray-900 bg-opacity-50 mt-36">
          <Card className="p-6 bg-white shadow-lg w-96">
            <CardContent className="text-center">
              <img src={selectedMember.pic} alt={selectedMember.name} className="w-24 h-24 rounded-full mx-auto border-2" />
              <h3 className="text-lg font-bold mt-4">{selectedMember.name}</h3>
              <p className="text-gray-600">Member ID: {selectedMember.memberId}</p>
              <Button onClick={closePopup} className="mt-4 w-full">Close</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default IDMem;
