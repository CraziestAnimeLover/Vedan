import React, { useState, useEffect } from "react";

const HumanCard = () => {
  const [profiles, setProfiles] = useState([]); // Changed to an array of profiles
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/humans")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the entire response
        if (data.success && data.humanBeings && data.humanBeings.length > 0) {
          setProfiles(data.humanBeings); // Store the entire array of human beings
        } else {
          setError("No human beings data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch data from the server");
      });
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (profiles.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f7fafc] text-black p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto mb-6 pb-6">
      <h2 className="text-center text-3xl font-bold uppercase tracking-wide mb-4 p-4 bg-[#4f24b3] text-white rounded-t-lg mb-16">
        Human
      </h2>
      {/* Title and Remarks mapping */}
      {profiles.map((profile) => (
        <div key={profile._id} className="mb-24 transition-transform duration-300 transform hover:scale-105">
          {/* Title */}
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide mb-4 p-4 bg-[#4f24b3] text-white rounded-t-lg">
            LUPTAM
          </h2>

          {/* Horizontal Line */}
          <hr className="my-4 border-gray-300" />

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-2 gap-6 my-6">
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:8000${profile?.image || "/default-animal.jpg"}`}
                alt="Profile"
                className="w-36 h-36 object-cover rounded-full border-4 border-[#4f24b3]"
              />
            </div>

            {/* Guardian Details */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#f1f5f8] transition-colors duration-300 border border-gray-300">
              <h3 className="text-lg font-semibold">Guardian Details</h3>
              <p className="text-gray-700"><strong>Name:</strong> {profile?.guardianName || "N/A"}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {profile?.guardianPhone || "N/A"}</p>
              <p className="text-gray-700"><strong>Address:</strong> {profile?.guardianAddress || "N/A"}</p>
            </div>

            {/* Social Details */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#f1f5f8] transition-colors duration-300 border border-gray-300">
              <h3 className="text-lg font-semibold">Social Details</h3>
              <p className="text-gray-700"><strong>Name:</strong> {profile?.name || "N/A"}</p>
              <p className="text-gray-700"><strong>Address:</strong> {profile?.address || "N/A"}</p>
            </div>

            {/* Biometric Info */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#f1f5f8] transition-colors duration-300 border border-gray-300">
              <h3 className="text-lg font-semibold">Biometric Info</h3>
              <p className="text-gray-700"><strong>Hair Color:</strong> {profile?.hairColor || "N/A"}</p>
              <p className="text-gray-700"><strong>Eye Color:</strong> {profile?.eyeColor || "N/A"}</p>
              <p className="text-gray-700"><strong>Skin Color:</strong> {profile?.skinColor || "N/A"}</p>
              <p className="text-gray-700"><strong>Gender:</strong> {profile?.gender || "N/A"}</p>
              <p className="text-gray-700"><strong>Profession:</strong> {profile?.profession || "N/A"}</p>
            </div>
          </div>

          {/* Horizontal Line */}
          <hr className="my-4 border-gray-300" />

          {/* Remarks Section */}
          <div className="bg-[#4f24b3] p-6 rounded-lg shadow-md mt-4 hover:bg-white transition-colors duration-300 border border-gray-300">
            <h3 className="text-lg font-semibold">Remarks</h3>
            <p className="text-gray-700">{profile?.remarks || "No remarks available"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HumanCard;
