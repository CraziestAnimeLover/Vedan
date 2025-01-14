import React, { useState } from 'react';
import InputForm from './InputForm';  // Import InputForm component
import MembershipPlans from './MembershipPlan';
import WaiveOff from './WaiveOff';

const LibraryFeeStructure = () => {
  const [membershipPlans, setMembershipPlans] = useState([
    {
      name: "Price",
      fee: "0",
      affordable: true,
      standard: false,
      premium: false,
    },
  ]);

  const [serviceFees, setServiceFees] = useState([
    { name: 'Daily Visitor Pass', fee: '$2–$5' },
    { name: 'Temporary Wi-Fi Access', fee: '$2/hour' },
    { name: 'Overdue Fines (Books)', fee: '$0.25–$0.50/day' },
    { name: 'Overdue Fines (Digital Resources)', fee: '$1–$2/day' },
    { name: 'Printing (Black & White)', fee: '$0.10–$0.25/page' },
    { name: 'Printing (Color)', fee: '$0.50–$1/page' },
    { name: 'Private Study Rooms', fee: '$10/hour' },
    { name: 'Community Event Space', fee: '$50–$100/hour' },
  ]);

  const [specialDiscounts, setSpecialDiscounts] = useState([
    'Students, Seniors, and Veterans: 10%–25% discount on membership fees.',
    'Family Membership: Combined fee for families (e.g., $150/year for up to 4 members).',
    'Seasonal Offers: Discounted memberships or waiver of joining fees during special promotions.',
  ]);

  const addPlan = (plan) => setMembershipPlans([...membershipPlans, plan]);
  const addService = (service) => setServiceFees([...serviceFees, service]);
  const addDiscount = (discount) => setSpecialDiscounts([...specialDiscounts, discount]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Library Fee Structure</h1>

      <MembershipPlans plans={membershipPlans} />
      {/* <MembershipPlansCards/> */}
      <InputForm onAddPlan={addPlan} onAddService={addService} onAddDiscount={addDiscount} />
      <WaiveOff  />

      <h1 className="text-3xl font-bold mb-6">TAX LINK</h1>
      <a 
        href="https://einvoice1.gst.gov.in/Others/TaxpayerSearch" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 underline"
      >
        Click here to access the GST Taxpayer Search
      </a>
    </div>
  );
};

export default LibraryFeeStructure;
