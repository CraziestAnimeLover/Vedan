import React, { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa"; // Billing Icon

const MembershipPlanForm = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");

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

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !paymentInfo || !selectedPlan) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`You have successfully selected the ${feePlans[selectedPlan].name} plan. We'll send a confirmation to your email.`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">Library Membership Plan Registration</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* User Information */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentInfo" className="block text-gray-700 text-sm font-medium">Payment Information</label>
          <input
            type="text"
            id="paymentInfo"
            name="paymentInfo"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            required
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter payment details"
          />
        </div>

        {/* Membership Plan Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Your Membership Plan</h3>
          
          <div className="flex gap-8">
            {Object.entries(feePlans).map(([key, plan]) => (
              <div key={key} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={key}
                  name="membershipPlan"
                  value={key}
                  checked={selectedPlan === key}
                  onChange={handlePlanChange}
                  className="text-indigo-600"
                />
                <label htmlFor={key} className="text-lg font-medium">
                  {plan.name} - {plan.fee}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Confirmation */}
        {selectedPlan && (
          <div className="text-center mt-4">
            <h4 className="font-medium text-gray-700">Selected Plan: {feePlans[selectedPlan].name}</h4>
            <p className="text-sm text-gray-600">{feePlans[selectedPlan].description}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembershipPlanForm;
