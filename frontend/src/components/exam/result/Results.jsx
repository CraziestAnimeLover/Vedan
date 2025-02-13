import React, { useState, useMemo, useEffect } from "react";
import ProfileCard from "../../../components/library/profile/libmgtprofile/ProfileCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import HumanBeingForm from "../../lostnfound/Forms/HumanBeingForm";
// import AnimalForm from "../../lostnfound/Forms/AnimalForm";
// import MaterialForm from "../../lostnfound/Forms/MaterialForm";
// import TeacherForm from "../../lostnfound/Forms/TeacherForm"; // Example for Teacher
// import DefenceForm from "../../lostnfound/Forms/DefenceForm"; // Example for Defence

const Results = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [activeForm, setActiveForm] = useState("");
  const [isLostMenuOpen, setIsLostMenuOpen] = useState(false);
  const [selectedLostCategory, setSelectedLostCategory] = useState("");
  const [isNikatVastuActive, setIsNikatVastuActive] = useState(false); 
  const [selectedNikatCategory, setSelectedNikatCategory] = useState(""); 
  const [isSubjectActive, setIsSubjectActive] = useState(false); // Track subject menu state
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState(""); // Track selected subject
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
const [examData, setExamData] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/exams");
        const data = await response.json();
        setExamData(data); 
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };
  
    fetchExams();
  }, []);


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

  const toggleSubjectMenu = () => {
    setIsSubjectActive(!isSubjectActive); // Toggle subject menu
  };

  const handleCategorySelection = (category, type) => {
    if (type === "myscoreboard") {
      setActiveForm("myscoreboard");
    } else if (type === "waitinglist") {
      setSelectedNikatCategory(category);
      setIsNikatVastuActive(false);
      setActiveForm("nikatVastu");
    } else if (type === "outdateslist") {
      setSelectedNikatCategory(category);
      setActiveForm("postCategory");
    }
  };
  
  const renderCategoryForm = (category) => {
    const formMapping = {
      "SSC CGL": <HumanBeingForm />,
      "SSC JE": <AnimalForm />,
      "GATE": <MaterialForm />,
      "CAT": <HumanBeingForm />,
      "IIT": <AnimalForm />,
      "PMT": <MaterialForm />,
      "JE": <AnimalForm />, // Specific form for JE
      "Teacher": <TeacherForm />, // Specific form for Teacher
      "Engg.": <MaterialForm />, // Specific form for Engineering
      "Defence": <DefenceForm /> // Specific form for Defence
    };
    
    return formMapping[category] || <p className="text-white">Please select a category.</p>;
  };

  const renderCategoryOptions = (type) => {
    const categories = ["" ];
    const postCategories = [''];
    const subjectCategories = ['']; // Add subjects

    const categoryList = 
      type === "post" ? postCategories : 
      type === "subject" ? subjectCategories : categories;

    return categoryList.map((category) => (
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
          {renderCategoryForm(selectedLostCategory)}
        </div>
      );
    }
  };

  const renderNikatVastuCategories = useMemo(() => (
    <div className="bg-[#20354b] p-4 rounded-lg shadow-lg">
      {renderCategoryOptions("nikat")}
    </div>
  ), []);

  const renderPostCategories = useMemo(() => (
    <div className="bg-[#20354b] p-4 rounded-lg shadow-lg">
      {renderCategoryOptions("post")}
    </div>
  ), []);

  const renderSubjectCategories = useMemo(() => (
    <div className="bg-[#20354b] p-4 rounded-lg shadow-lg">
      {renderCategoryOptions("subject")}
    </div>
  ), []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
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
  onClick={() => handleCategorySelection("myscoreboard", "myscoreboard")}
>
  Myscoreboard
</div>

          {/* {isLostMenuOpen && (
            <div className="ml-4">
              {renderCategoryOptions("myscoreboard")}
            </div>
          )} */}
        </div>

        <div
  className="text-white cursor-pointer hover:text-yellow-500 mb-4"
  onClick={() => handleCategorySelection("waitinglist", "waitinglist")}
>
  Waiting List
</div>
<div
  className="text-white cursor-pointer hover:text-yellow-500 mb-4"
  onClick={() => handleCategorySelection("outdateslistt", "outdateslist")}
>
 Out dated Lists
</div>

     

       
      </div>

      <div className="flex-1 bg-[#071e34] p-6 w-full flex justify-start items-start overflow-auto">
        {activeForm === "" && (
          <div className=" min-w-full mt-4 bg-[#20354b] text-white rounded-lg shadow-lg overflow-auto text-center">
            <h2 className="text-white font-semibold text-3xl mb-4 mt-4">
              Result
            </h2>
            <table className="min-w-full bg-[#20354b] text-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Sr. No</th>
                  <th className="py-2 px-4 border-b">Exam Name</th>
                  <th className="py-2 px-4 border-b">Notification Out</th>
                  <th className="py-2 px-4 border-b">Last Date</th>
                  <th className="py-2 px-4 border-b">Exam Site</th>
                </tr>
              </thead>
              <tbody>
                             {examData.map((exam, index) => (
  <tr key={exam.id}>
    <td className="py-2 px-4 border-b">{index + 1}</td>
    <td className="py-2 px-4 border-b">{exam.name}</td>
    <td className="py-2 px-4 border-b">{exam.notificationDate}</td>
    <td className="py-2 px-4 border-b">{exam.lastDate}</td>
    <td className="py-2 px-4 border-b">
      <a href={exam.site} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
        {exam.site}
      </a>
    </td>
  </tr>
))}
              </tbody>
            </table>
          </div>
        )}

    

     

{activeForm === "myscoreboard" && (
  <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
    <h2 className="text-white font-semibold text-3xl mb-4">
      My Scoreboard
    </h2>
    <table className="min-w-full bg-[#20354b] text-white rounded-lg shadow-lg">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Sr. No</th>
          <th className="py-2 px-4 border-b">Exam Name</th>
          <th className="py-2 px-4 border-b">Percentage</th>
          <th className="py-2 px-4 border-b">Organizer</th>
        </tr>
      </thead>
      <tbody>
      {examData.map((exam, index) => (
  <tr key={exam.id}>
    <td className="py-2 px-4 border-b">{index + 1}</td>
    <td className="py-2 px-4 border-b">{exam.name}</td>
    
    <td className="py-2 px-4 border-b">98%</td>
    <td className="py-2 px-4 border-b">
      
      {exam.university}
    
    </td>
  </tr>
))}
        
        
      </tbody>
    </table>
  </div>
)}

      </div>
    </div>
  );
};

export default Results;
