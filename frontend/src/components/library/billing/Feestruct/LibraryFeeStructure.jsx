import React, { useState } from 'react';
// import InputForm from './InputForm';  // Import InputForm component
import MembershipPlans from './MembershipPlan';
// import WaiveOff from './WaiveOff';
// import OutputPage from './OutputPage';
// import MembershipPlansCards from './MembershipPlansCards';

const LibraryFeeStructure = () => {
  const [plans, setPlans] = useState([]);  // Store plans for MembershipPlansCards and OutputPage
  const [membershipPlans] = useState([  // Predefined membership plans (no changes here)
    {
      name: "Price",
      fee: "0",
      affordable: true,
      standard: false,
      premium: false,
    },
  ]);
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Billing</h1>

      {/* Display MembershipPlans */}
      <MembershipPlans plans={membershipPlans} />
     
    </div>
  );
};

export default LibraryFeeStructure;
