import React from "react";

const AharProfileMem = ({ member }) => {
  if (!member) {
    return <p className="text-gray-500">No member selected.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Member Profile</h2>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>ID:</strong> {member.memberId}
        </p>
        <p>
          <strong>Gender:</strong> {member.gender}
        </p>
        <p>
          <strong>Document</strong> {member.document || "N/A"}
        </p>
        <p>
          <strong>Date of Birth:</strong> {member.dateOfBirth}
        </p>
        <p>
          <strong>Email:</strong> {member.email}
        </p>
        <p>
          <strong>Case Of:</strong> {member.caseOf}
        </p>
        <p >
          <strong>Join Date:</strong> {member.joinDate}
        </p>
        <p >
          <strong>Remarks:</strong> {member.remarks}
        </p>
      </div>
    </div>
  );
};

export default AharProfileMem;
