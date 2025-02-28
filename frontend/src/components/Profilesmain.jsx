import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingField, setEditingField] = useState(null);
    const [editableProfile, setEditableProfile] = useState(null);
     
    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleChange = (e) => {
        setEditableProfile({ ...editableProfile, [editingField]: e.target.value });
    };

    const handleBlur = () => {
        setEditingField(null);
        console.log("Updated Profile:", editableProfile);
    };




    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/user');
                console.log('Profiles Data:', data);

                if (data && data.success && Array.isArray(data.users)) {
                    setProfiles(data.users);
                    if (data.users.length > 0) {
                        setEditableProfile({
                            fullname: data.users[0]?.fullname || "",
                            email: data.users[0]?.email || "",
                            phoneNumber: data.users[0]?.phoneNumber || "",
                            handlerType: data.users[0]?.handlerType || "@Handler",
                        });
                    }
                } else {
                    setProfiles([]);
                }
            } catch (err) {
                setError(`Failed to load profiles: ${err.response?.data?.message || err.message}`);
                console.error('Error fetching profiles:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    const vedannprofile = [
        { srNo: 1, profile: "student", vedannNumber: "100048" },
        { srNo: 2, profile: "librarian", vedannNumber: "100048" },
    ];

    const achievements = [
        { srNo: 1, exam: "Math Olympiad", type: "National", rank: 2 },
        { srNo: 2, exam: "Science Fair", type: "State", rank: 1 }
    ];

    const sports = [
        { srNo: 1, event: "100m Sprint", type: "District", rank: 1 },
        { srNo: 2, event: "Long Jump", type: "State", rank: 3 }
    ];

    if (loading) return <p>Loading profiles...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4 space-y-6">
            {/* Profile Section */}
            {editableProfile && (
                <div className="bg-white shadow-lg rounded-2xl p-6  flex items-center space-x-24">
                    {/* Left Side - Profile Image */}
                    <img
                        src={profiles[0]?.profile?.profilePhoto || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full shadow-md border border-gray-300 mx-24"
                    />

                    {/* Right Side - Profile Details */}
                    <div className="flex flex-col space-y-2">
                        {/* Full Name */}
                        {editingField === "fullname" ? (
                            <input
                                type="text"
                                value={editableProfile.fullname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="border-b-2 border-blue-500 outline-none"
                            />
                        ) : (
                            <h3 className="text-xl font-semibold cursor-pointer" onClick={() => handleEdit("fullname")}>
                                {editableProfile.fullname}
                            </h3>
                        )}

                        {/* Email */}
                        {editingField === "email" ? (
                            <input
                                type="email"
                                value={editableProfile.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="border-b-2 border-blue-500 outline-none"
                            />
                        ) : (
                            <p className="text-gray-600 cursor-pointer" onClick={() => handleEdit("email")}>
                                {editableProfile.email}
                            </p>
                        )}

                        {/* Phone Number */}
                        {editingField === "phoneNumber" ? (
                            <input
                                type="text"
                                value={editableProfile.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="border-b-2 border-blue-500 outline-none"
                            />
                        ) : (
                            <p className="text-gray-600 cursor-pointer" onClick={() => handleEdit("phoneNumber")}>
                                {editableProfile.phoneNumber}
                            </p>
                        )}

                        {/* Handler Type */}
                        {editingField === "handlerType" ? (
                            <input
                                type="text"
                                value={editableProfile.handlerType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className="border-b-2 border-blue-500 outline-none"
                            />
                        ) : (
                            <p className="text-gray-600 cursor-pointer" onClick={() => handleEdit("handlerType")}>
                                {editableProfile.handlerType}
                            </p>
                        )}
                    </div>
                </div>
            )}
      

            {/* Profile Vedann Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Profile Vedann</h2>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 p-2 text-left">SrNo.</th>
                            <th className="border-b-2 p-2 text-left">Profile</th>
                            <th className="border-b-2 p-2 text-left">Vedann Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vedannprofile.map((profile) => (
                            <tr key={profile.srNo} className="hover:bg-gray-100">
                                <td className="border-b p-2">{profile.srNo}</td>
                                <td className="border-b p-2">{profile.profile}</td>
                                <td className="border-b p-2">{profile.vedannNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Achievement Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                <h3 className="font-bold mb-2">Academic</h3>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 p-2 text-left">SrNo.</th>
                            <th className="border-b-2 p-2 text-left">Exam</th>
                            <th className="border-b-2 p-2 text-left">Type</th>
                            <th className="border-b-2 p-2 text-left">Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {achievements.map((ach) => (
                            <tr key={ach.srNo} className="hover:bg-gray-100">
                                <td className="border-b p-2">{ach.srNo}</td>
                                <td className="border-b p-2">{ach.exam}</td>
                                <td className="border-b p-2">{ach.type}</td>
                                <td className="border-b p-2">{ach.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Sports Section */}
            <div className="bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Sports</h2>
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 p-2 text-left">SrNo.</th>
                            <th className="border-b-2 p-2 text-left">Event</th>
                            <th className="border-b-2 p-2 text-left">Type</th>
                            <th className="border-b-2 p-2 text-left">Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sports.map((sport) => (
                            <tr key={sport.srNo} className="hover:bg-gray-100">
                                <td className="border-b p-2">{sport.srNo}</td>
                                <td className="border-b p-2">{sport.event}</td>
                                <td className="border-b p-2">{sport.type}</td>
                                <td className="border-b p-2">{sport.rank}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profiles;
