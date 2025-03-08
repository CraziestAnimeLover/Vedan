import React, { useState, useEffect } from "react";

const AharID = ({ member }) => {
  // Default state if no member is passed
  const [memberData, setMemberData] = useState(
    member || {
      profileImage: "https://via.placeholder.com/100",
      startDate: "N/A",
      expiredDate: "N/A",
      plan: "N/A",
    }
  );

  useEffect(() => {
    if (!member) {
      // Simulate fetching data from API
      setTimeout(() => {
        setMemberData({
          profileImage: "https://example.com/profile.jpg",
          startDate: "2024-01-01",
          expiredDate: "2024-12-31",
          plan: "Premium",
        });
      }, 1000);
    }
  }, [member]);

  return (
    <div className="p-4 mx-6 bg-gray-100 rounded-lg shadow-md w-64 text-center">
      {/* Gym Name */}
      <h2 className="text-lg font-bold">Dummy Gym</h2>
      <h2 className="text-lg font-bold">ID</h2>

      {/* Horizontal Line */}
      <hr className="my-2 border-gray-400" />

      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={memberData.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
        />
      </div>

      {/* Horizontal Line */}
      <hr className="my-3 border-gray-400" />

      {/* Start Date & End Date */}
      <div className="text-sm text-gray-700">
        <p>
          <strong>Start Date:</strong> {memberData.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {memberData.expiredDate}
        </p>
      </div>

      {/* Horizontal Line */}
      <hr className="my-3 border-gray-400" />

      {/* Plan */}
      <p className="text-md font-semibold">
        <strong>Plan:</strong> {memberData.plan}
      </p>
    </div>
  );
};

export default AharID;
