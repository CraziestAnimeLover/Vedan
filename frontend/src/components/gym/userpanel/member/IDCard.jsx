import React from "react";

const IDCard = ({ member }) => {
  if (!member) {
    return <p className="text-gray-500">No member selected.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-64 text-center">
      {/* Gym Name */}
      <h2 className="text-lg font-bold top-8">Dummy Gym</h2>
      <h2 className="text-lg font-bold top-8">ID</h2>

      {/* Member ID */}
      <p className="text-sm text-gray-700">
        
      </p>

      {/* Horizontal Line */}
      <hr className="my-2 border-gray-400" />

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={member.profileImage || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
      </div>

      {/* Horizontal Line */}
      <hr className="my-3 border-gray-400" />

      {/* Start Date & End Date */}
      <div className="text-sm text-gray-700">
        <p>
          <strong>Start Date:</strong> {member.startDate || "N/A"}
        </p>
        <p>
          <strong>End Date:</strong> {member.expiredDate || "N/A"}
        </p>
      </div>

      {/* Horizontal Line */}
      <hr className="my-3 border-gray-400" />

      {/* Plan */}
      <p className="text-md font-semibold">
        <strong>Plan:</strong> {member.plan || "N/A"}
      </p>
    </div>
  );
};

export default IDCard;
