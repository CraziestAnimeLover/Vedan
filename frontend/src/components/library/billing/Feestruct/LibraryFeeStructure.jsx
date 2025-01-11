import React, { useState } from 'react';
import InputForm from './InputForm';  // Import InputForm component
import MembershipPlans from '../membership/MembershipPlan';


const ServicesAndDiscounts = ({ services, discounts }) => (
  <div>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Service Fees</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Service</th>
            <th className="border-b px-4 py-2 text-left">Fee</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2 text-gray-700">{service.name}</td>
              <td className="border-b px-4 py-2 text-gray-700">{service.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    <section>
      <h2 className="text-2xl font-semibold mb-4">Special Discounts</h2>
      <ul className="list-disc pl-6">
        {discounts.map((discount, index) => (
          <li key={index} className="text-gray-600">{discount}</li>
        ))}
      </ul>
    </section>
  </div>
);

const LibraryFeeStructure = () => {
  const [membershipPlans, setMembershipPlans] = useState([
    {
      name: 'Basic Membership',
      fee: 'Free or Nominal Fee',
      details: [
        'Access to physical books and magazines.',
        'Limited borrowing privileges (e.g., 2-3 books for 2 weeks).',
        'Free access to reading and study spaces.',
      ],
    },
    {
      name: 'Standard Membership',
      fee: '$50–$100/year',
      details: [
        'Borrow up to 5-10 books or other media for an extended period.',
        'Limited access to digital resources like eBooks and audiobooks.',
      ],
    },
    {
      name: 'Premium Membership',
      fee: '$150–$200/year',
      details: [
        'Unlimited borrowing privileges (with renewal options).',
        'Full access to digital libraries, workshops, and events.',
        'Discounted fees for premium services (e.g., printing, community events).',
      ],
    },
    {
      name: 'Corporate/Institutional Membership',
      fee: '$500–$1,000/year',
      details: [
        'Shared membership for employees/students.',
        'Priority booking for events and workshops.',
      ],
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

      <InputForm onAddPlan={addPlan} onAddService={addService} onAddDiscount={addDiscount} />
      <MembershipPlans plans={membershipPlans} />
      <ServicesAndDiscounts services={serviceFees} discounts={specialDiscounts} />
    </div>
  );
};

export default LibraryFeeStructure;
