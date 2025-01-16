import React, { useState } from "react";
import Navbar from "../../../shared/Navbar";
import { Avatar } from "../../../ui/avatar";
// import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState({
    photo: user?.profile?.profilePhoto || "https://via.placeholder.com/150",
    name: user?.fullname || "Unknown User",
    availability: user?.profile?.availability || "Not specified",
    birthday: user?.profile?.birthday || "",
    gender: user?.profile?.gender || "Not specified",
    address: user?.profile?.address || "No address available",
    email: user?.email || "No email available",
    password: "Password last changed 2 months ago",
    twoFA: user?.profile?.twoFA || false,
    referralLink: user?.profile?.referralLink || "N/A",
    workAvailability: user?.profile?.workAvailability || "",
    hourlyRate: user?.profile?.hourlyRate || "",
    language: user?.profile?.language || "",
    skills: user?.profile?.skills || [],
    about: user?.profile?.bio || "",
    badges: user?.profile?.badges || [],
  });

  const handleEdit = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-500 to-indigo-500 text-white rounded-t-lg">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <button
              className="px-4 py-2 bg-white text-blue-600 rounded shadow hover:bg-gray-200"
              onClick={() => alert("Save changes functionality here")}
            >
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Profile Sidebar */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <img
                    src={profile.photo}
                    alt="Profile"
                    className="rounded-full object-cover shadow-lg"
                  />
                </Avatar>
                <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
                <p className="text-gray-600">{profile.availability}</p>
              </div>
              <button
                onClick={() =>
                  handleEdit("photo", prompt("Enter photo URL:", profile.photo))
                }
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Change Photo
              </button>
            </div>

            {/* Public Profile */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Personal Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <label className="w-1/4 font-medium">Name:</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleEdit("name", e.target.value)}
                      className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 font-medium">Birthday:</label>
                    <input
                      type="date"
                      value={profile.birthday}
                      onChange={(e) => handleEdit("birthday", e.target.value)}
                      className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 font-medium">Gender:</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => handleEdit("gender", e.target.value)}
                      className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/4 font-medium">Address:</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleEdit("address", e.target.value)}
                      className="flex-1 border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Add address"
                    />
                  </div>
                </div>
              </div>

              {/* Skills and Badges */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-500 text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge, index) => (
                    <Badge key={index} className="bg-green-500 text-white">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
