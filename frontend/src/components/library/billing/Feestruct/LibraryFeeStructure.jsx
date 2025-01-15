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

  // const [serviceFees] = useState([
  //   { name: 'Daily Visitor Pass', fee: '$2–$5' },
  //   { name: 'Temporary Wi-Fi Access', fee: '$2/hour' },
  //   { name: 'Overdue Fines (Books)', fee: '$0.25–$0.50/day' },
  //   { name: 'Overdue Fines (Digital Resources)', fee: '$1–$2/day' },
  //   { name: 'Printing (Black & White)', fee: '$0.10–$0.25/page' },
  //   { name: 'Printing (Color)', fee: '$0.50–$1/page' },
  //   { name: 'Private Study Rooms', fee: '$10/hour' },
  //   { name: 'Community Event Space', fee: '$50–$100/hour' },
  // ]);

  const [specialDiscounts] = useState([
    'Students, Seniors, and Veterans: 10%–25% discount on membership fees.',
    'Family Membership: Combined fee for families (e.g., $150/year for up to 4 members).',
    'Seasonal Offers: Discounted memberships or waiver of joining fees during special promotions.',
  ]);

  // Add new plan to plans state
  const addPlan = (plan) => setPlans([...plans, plan]);
  const addService = (service) => setServiceFees([...serviceFees, service]);
  const addDiscount = (discount) => setSpecialDiscounts([...specialDiscounts, discount]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Billing</h1>

      {/* Display MembershipPlans */}
      <MembershipPlans plans={membershipPlans} />
     
    </div>
  );
};

export default LibraryFeeStructure;
