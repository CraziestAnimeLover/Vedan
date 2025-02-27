import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profiles = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/users');
                console.log('Profiles Data:', data);
                setProfiles(Array.isArray(data) ? data : data.profiles || []);
            } catch (err) {
                setError('Failed to load profiles. Please try again later.');
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
            <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                {profiles.length > 0 && (
                    <div className="text-center">
                        <img
                            src={profiles[0]?.profile?.profilePhoto || 'https://via.placeholder.com/100'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mb-4 shadow-md border border-gray-300"
                        />
                        <h3 className="text-xl font-semibold">{profiles[0].fullname}</h3>
                        <p className="text-gray-600">{profiles[0].email}</p>
                        <p className="text-gray-600">{profiles[0].phoneNumber}</p>
                    </div>
                )}
            </div>

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
