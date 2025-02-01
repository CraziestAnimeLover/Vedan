import React, { useState, useMemo, useEffect } from "react";
import ProfileCard from "../../library/profile/libmgtprofile/ProfileCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HumanBeingForm from "../../lostnfound/Forms/HumanBeingForm";
import AnimalForm from "../../lostnfound/Forms/AnimalForm";
import MaterialForm from "../../lostnfound/Forms/MaterialForm";

const Competition = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("");
  const [isLostMenuOpen, setIsLostMenuOpen] = useState(false);
  const [selectedLostCategory, setSelectedLostCategory] = useState("");
  const [isNikatVastuActive, setIsNikatVastuActive] = useState(false);
  const [selectedNikatCategory, setSelectedNikatCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const handleToggleForm = (formType) => {
    setActiveForm(formType);
  };

  const toggleLostMenu = () => {
    setIsLostMenuOpen(!isLostMenuOpen);
  };

  const handleCategorySelection = (category, type) => {
    if (type === "lost") {
      setSelectedLostCategory(category);
      setActiveForm("lostCategory");
    } else if (type === "nikat") {
      setSelectedNikatCategory(category);
      setIsNikatVastuActive(false);
      setActiveForm("nikatVastu");
    }
  };

  const renderCategoryForm = (category, type) => {
    switch (category) {
      case "Human Being":
        return <HumanBeingForm />;
      case "Animal":
        return <AnimalForm />;
      case "Material":
        return <MaterialForm />;
      default:
        return <p className="text-white">Please select a category.</p>;
    }
  };

  const renderCategoryOptions = (type) => {
    const categories = ["Human Being", "Animal", "Material"];
    return categories.map((category) => (
      <div
        key={category}
        className="text-white cursor-pointer hover:text-yellow-500 mb-2"
        onClick={() => handleCategorySelection(category, type)}
      >
        {category}
      </div>
    ));
  };

  const renderSelectedCategoryCard = () => {
    if (selectedLostCategory) {
      return (
        <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-white font-semibold text-lg">
            {selectedLostCategory} - Details
          </h3>
          {renderCategoryForm(selectedLostCategory, "lost")}
        </div>
      );
    }
  };

  const renderNikatVastuCategories = useMemo(() => (
    <div className="bg-[#20354b] p-4 rounded-lg shadow-lg">
      {renderCategoryOptions("nikat")}
    </div>
  ), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex justify-between items-center px-4 py-6 bg-[#20354b]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? "×" : "☰"} {/* Hamburger or Close Icon */}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-[#20354b] px-4 py-6 shadow-lg flex flex-col justify-between overflow-auto`}
      >
        <ProfileCard profile={user?.profile} />

        {/* Lost Menu with Dropdown */}
        <div>
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={toggleLostMenu}
            aria-label="Toggle Lost Category Menu"
          >
            Competition Event
          </div>
          {isLostMenuOpen && (
            <div className="ml-4">
              {renderCategoryOptions("lost")}
            </div>
          )}
        </div>

        {/* Nikat Vastu Option with Dropdown */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => setIsNikatVastuActive(!isNikatVastuActive)}
          aria-label="Toggle Nikat Vastu Menu"
        >
          Result
        </div>
        {isNikatVastuActive && renderNikatVastuCategories}

        {/* Team */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm("founder")}
          aria-label="Navigate to Team"
        >
          Team
        </div>

        {/* Scoreboard */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm("founder")}
          aria-label="Navigate to Scoreboard"
        >
          Scoreboard
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="flex-1 bg-[#071e34] p-6 flex justify-start items-start overflow-auto">
        {/* Default Message */}
        {activeForm === "" && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <h2 className="text-white font-semibold text-3xl mb-4">
              Competition
            </h2>
          </div>
        )}

        {/* Form for Nikat Vastu Categories */}
        {activeForm === "nikatVastu" && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg">
              {selectedNikatCategory} - Nikat Vastu Details
            </h3>
            {renderCategoryForm(selectedNikatCategory, "nikat")}
          </div>
        )}

        {/* Form for Lost Categories */}
        {activeForm === "lostCategory" && renderSelectedCategoryCard()}
      </div>
    </div>
  );
};

export default Competition;
