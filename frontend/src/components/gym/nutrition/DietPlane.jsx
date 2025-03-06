import React, { useState } from "react";

const DietPlan = () => {
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [janta, setJanta] = useState("");
  const [dietData, setDietData] = useState({});
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [memberList, setMemberList] = useState([]);

  const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];
  const weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

 const handleImageUpload = (week, meal, event) => {
    const file = event.target.files[0];
    if (file) {
      setDietData((prev) => ({
        ...prev,
        [week]: {
          ...prev[week],
          [meal]: { 
            image: URL.createObjectURL(file), 
            description: prev[week]?.[meal]?.description || "", 
            uploaded: true 
          },
        },
      }));
    }
  };
  const handleDescriptionChange = (week, meal, event) => {
    setDietData((prev) => ({
      ...prev,
      [week]: {
        ...prev[week],
        [meal]: { image: prev[week]?.[meal]?.image || "", description: event.target.value },
      },
    }));
  };

  const handleSubmit = () => {
    setPlans([...plans, { planName, janta, dietData }]);
    setPlanName("");
    setJanta("");
    setDietData({});
    setShowSubmitButton(false);
  };

  const handleEdit = (index) => {
    const planToEdit = plans[index];
    setPlanName(planToEdit.planName);
    setJanta(planToEdit.janta);
    setDietData(planToEdit.dietData);
    setPlans(plans.filter((_, i) => i !== index));
    setShowSubmitButton(true);
  };

  const handleDelete = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const handleAddMember = (plan) => {
    setMemberList([...memberList, plan]);
  };

  return (
    <div className="p-4 w-full relative">
      <button
        onClick={() => setShowSubmitButton((prev) => !prev)}
         className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        {showSubmitButton ? "show card" : "Add"}
      </button>

      {showSubmitButton && (
        <>
         <div className="flex justify-between items-center mb-4">
  <div className="w-1/4">
    <label className="block text-gray-700 font-semibold mb-1">Plan Name</label>
    <input
      type="text"
      placeholder="Plan Name"
      value={planName}
      onChange={(e) => setPlanName(e.target.value)}
      className="border p-2 rounded w-full"
    />
  </div>

  <div className="w-1/4">
    <label className="block text-gray-700 font-semibold mt-14 mb-1">Janta Name</label>
    <input
      type="text"
      placeholder="Janta Name"
      value={janta}
      onChange={(e) => setJanta(e.target.value)}
      className="border p-2 rounded w-full"
    />
  </div>
</div>


          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Week</th>
                {meals.map((meal) => (
                  <th key={meal} className="border p-2">{meal}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week) => (
                <tr key={week} className="text-center">
                  <td className="border p-2 font-bold">{week}</td>
                  {meals.map((meal) => (
                    <td key={meal} className="border  p-8">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(week, meal, e)}
                        className="hidden"
                        id={`${week}-${meal}`}
                      />
                      <label htmlFor={`${week}-${meal}`} 
                                             className={`cursor-pointer p-2 rounded block text-center ${dietData[week]?.[meal]?.uploaded ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
                        Upload Image
                      </label>
                      <textarea
                        value={dietData[week]?.[meal]?.description || ""}
                        onChange={(e) => handleDescriptionChange(week, meal, e)}
                        placeholder="Add Description"
                        className="border p-2 rounded w-full mt-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Submit Plan
          </button>
        </>
      )}

      <div className="mt-8">
        {plans.map((plan, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white mt-14 mb-4">
            <div className=" flex justify-between">

            <h2 className="text-xl font-bold mb-2">{plan.planName}</h2>
            <p className="text-gray-600 mb-4">Janta: {plan.janta}</p>
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Week</th>
                  {meals.map((meal) => (
                    <th key={meal} className="border p-2">{meal}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weeks.map((week) => (
                  <tr key={week} className="text-center">
                    <td className="border p-2 font-bold">{week}</td>
                    {meals.map((meal) => (
                      <td key={meal} className="border p-2">
                        {plan.dietData[week]?.[meal]?.image ? (
                          <>
                            <img
                              src={plan.dietData[week][meal].image}
                              alt={`${meal}`}
                              className="w-16 h-16 mx-auto object-cover rounded"
                            />
                            <p className="text-sm mt-2">{plan.dietData[week][meal].description}</p>
                          </>
                        ) : (
                          "No Data"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex space-x-2">
              <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button onClick={() => handleAddMember(plan)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Member</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlan;
