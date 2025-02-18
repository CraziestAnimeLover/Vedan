import React, { useState, useMemo, useEffect } from "react";
import ProfileCard from "../../components/library/profile/libmgtprofile/ProfileCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HumanBeingForm from "./Forms/HumanBeingForm";
import AnimalForm from "./Forms/AnimalForm";
import MaterialForm from "./Forms/MaterialForm";
import HumanCard from "./Cards/lostdetails/HumanCard";
import MaterialCard from "./Cards/lostdetails/MaterialCard";
import AnimalCard from "./Cards/lostdetails/AnimalCard";



const LosProfile = () => {
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
      setIsNikatVastuActive(false); // Disable the "Nikat Vastu" toggle when selecting a category
  
      // Check which category is selected and show the corresponding card
      if (category === "Human Being") {
        setActiveForm("nikatVastuHuman"); // Trigger only HumanCard when Human Being is selected
      } else if (category === "Animal") {
        setActiveForm("nikatVastuAnimal"); // Trigger only AnimalCard when Animal is selected
      } else if (category === "Material") {
        setActiveForm("nikatVastuMaterial"); // Trigger only MaterialCard when Material is selected
      }
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
  const renderCategoryCard = (category) => {
    switch (category) {
      case "Human Being":
        return <HumanCard />; // Render only HumanCard when "Human Being" is selected
      case "Animal":
        return <AnimalCard />; // Render only AnimalCard when "Animal" is selected
      case "Material":
        return <MaterialCard />; // Render only MaterialCard when "Material" is selected
      default:
        return <p className="text-white"></p>;
    }
  };
  ;
  

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
          {isSidebarOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-[#20354b] px-4 py-6 shadow-lg flex flex-col justify-between overflow-auto`}
      >
        <ProfileCard profile={user?.profile} />

        {/* Lost Menu */}
        <div>
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={toggleLostMenu}
            aria-label="Toggle Lost Category Menu"
          >
            Lost ▼
          </div>
          {isLostMenuOpen && (
            <div className="ml-4">{renderCategoryOptions("lost")}</div>
          )}
        </div>

        {/* Nikat Vastu Option */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => setIsNikatVastuActive(!isNikatVastuActive)}
          aria-label="Toggle Nikat Vastu Menu"
        >
          Nikat Vastu ▼
        </div>
        {isNikatVastuActive && renderNikatVastuCategories}

        {/* Messages */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm("founder")}
          aria-label="Navigate to Messages"
        >
          Messages
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#071e34] p-6 flex justify-start items-start overflow-auto">
        {/* Default Message */}
        {activeForm === "" && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <h2 className="text-white font-semibold text-3xl mb-4">
              Luptah N Labdi
            </h2>
            <p className="text-gray-300">(Lost N Found)</p>
          </div>
        )}

{/* Nikat Vastu Selected - Show Human Card if Human Being is Selected */}
{activeForm === "nikatVastuHuman" && (
  <div className="mt-6 w-full max-w-3xl">
    {renderCategoryCard("Human Being")}
  </div>
)}

{/* Nikat Vastu Selected - Show Animal Card if Animal is Selected */}
{activeForm === "nikatVastuAnimal" && (
  <div className="mt-6 w-full max-w-3xl">
    {renderCategoryCard("Animal")}
  </div>
)}

{/* Nikat Vastu Selected - Show Material Card if Material is Selected */}
{activeForm === "nikatVastuMaterial" && (
  <div className="mt-6 w-full max-w-3xl">
    {renderCategoryCard("Material")}
  </div>
)}

{/* Nikat Vastu Selected - Show All Three Cards */}
{activeForm === "nikatVastu" && (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
    {renderCategoryCard("Human Being")}
    {renderCategoryCard("Material")}
    {renderCategoryCard("Animal")}
  </div>
)}


        {/* Lost Category Selected */}
        {activeForm === "lostCategory" && renderSelectedCategoryCard()}
      </div>
    </div>
  );
};

export default LosProfile;
