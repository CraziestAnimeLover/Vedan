import React, { useState, useEffect } from "react";
import ProfileCard from "../library/profile/libmgtprofile/ProfileCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdmitCard = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [admitCards, setAdmitCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admitcards");
        if (!response.ok) throw new Error("Failed to fetch admit cards");
        const data = await response.json();
        setAdmitCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCards(false);
      }
    };

    fetchAdmitCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Sidebar for Navigation */}
      <div className="md:hidden flex justify-between items-center px-4 py-6 bg-[#20354b]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? "×" : "☰"}
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-[#20354b] px-4 py-6 shadow-lg flex flex-col justify-between overflow-auto`}
      >
        <ProfileCard profile={user?.profile} />

        <div>
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={() => setActiveSection("admitcard")}
          >
            Admit Card
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#071e34] p-6 w-full flex justify-center items-center overflow-auto">
        {activeSection === "" && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <h2 className="text-white font-semibold text-3xl">Coming Soon</h2>
          </div>
        )}

        {activeSection === "admitcard" && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
            <h2 className="text-white font-semibold text-3xl mb-4">Admit Card</h2>

            {loadingCards ? (
              <p className="text-white">Loading admit cards...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : admitCards.length === 0 ? (
              <p className="text-white">No admit cards available</p>
            ) : (
              <table className="min-w-full bg-[#20354b] text-white rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Sr. No</th>
                    <th className="py-2 px-4 border-b">Exam</th>
                    <th className="py-2 px-4 border-b">Website Link</th>
                  </tr>
                </thead>
                <tbody>
                  {admitCards.map((card, index) => (
                    <tr key={card._id}>
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{card.exam}</td>
                      <td className="py-2 px-4 border-b">
                        <a href={card.websiteLink} className="text-yellow-400 hover:underline" target="_blank" rel="noopener noreferrer">
                          {card.websiteLink}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmitCard;
