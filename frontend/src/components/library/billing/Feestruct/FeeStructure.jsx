import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa"; // Importing a dollar sign icon for billing

const FeeStructure = () => {
  const [selectedPlan, setSelectedPlan] = useState("affordable");

  // Fee data for different plans
  const feePlans = {
    affordable: {
      name: "Affordable",
      fee: "$10/month",
      description: "A budget-friendly option for casual users.",
    },
    standard: {
      name: "Standard",
      fee: "$20/month",
      description: "For regular library users with added features.",
    },
    premium: {
      name: "Premium",
      fee: "$30/month",
      description: "The best option for frequent users, with all premium features.",
    },
  };

  // Handle plan selection
  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Library Fee Structure
      </h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => handlePlanChange("affordable")}
          className={`px-4 py-2 mx-2 rounded-md ${
            selectedPlan === "affordable" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Affordable
        </button>
        <button
          onClick={() => handlePlanChange("standard")}
          className={`px-4 py-2 mx-2 rounded-md ${
            selectedPlan === "standard" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => handlePlanChange("premium")}
          className={`px-4 py-2 mx-2 rounded-md ${
            selectedPlan === "premium" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Premium
        </button>
      </div>

      <div className="flex justify-center items-center gap-6">
        <div className="text-center">
          <FaDollarSign className="text-4xl text-green-500 mb-2" />
          <h3 className="text-xl font-medium text-gray-700">{feePlans[selectedPlan].fee}</h3>
          <p className="text-gray-600 mt-2">{feePlans[selectedPlan].description}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => alert(`You selected the ${feePlans[selectedPlan].name} plan.`)}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default FeeStructure;
