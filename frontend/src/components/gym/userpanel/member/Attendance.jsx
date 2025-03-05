import React from "react";

const Attendance = ({ member }) => {
  if (!member) return null;

  return (
    <div className="p-4 bg-gray-200 rounded shadow-md">
      <h3 className="text-lg font-semibold">Attendance for {member.name}</h3>
      <p><strong>Member ID:</strong> {member.memberId}</p>
      <p><strong>Batch:</strong> {member.batch}</p>
      <p><strong>Plan:</strong> {member.plan}</p>
      <p><strong>Status:</strong> Present ✅</p>
    </div>
  );
};

export default Attendance;
