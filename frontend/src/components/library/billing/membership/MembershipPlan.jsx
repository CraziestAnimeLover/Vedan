import React from "react";
 // Importing the billing icon

const MembershipPlans = ({ plans }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => (
        <div key={index} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <p className="text-gray-700 mb-4">Annual Fee: {plan.fee}</p>
          <ul className="list-disc pl-6">
            {plan.details.map((detail, i) => (
              <li key={i} className="text-gray-600">{detail}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default MembershipPlans;
