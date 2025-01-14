import React from "react";
import PropTypes from "prop-types";

const MembershipPlansCards = ({ plans }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Membership Plans (Cards)</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans && plans.length > 0 ? (
        plans.map((plan, index) => (
          <div key={index} className="bg-white p-6 rounded shadow border border-gray-300">
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-700 mb-4">
              Annual Fee: {plan.free ? "Free" : plan.affordable ? "400" : plan.standard ? "1000" : plan.premium ? "1500" : "N/A"}
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Affordable: {plan.affordable ? "✔️ Available (400)" : "❌ Not Available"}</li>
              <li>Standard: {plan.standard ? "✔️ Available (1000)" : "❌ Not Available"}</li>
              <li>Premium: {plan.premium ? "✔️ Available (1500)" : "❌ Not Available"}</li>
            </ul>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No plans available.</p>
      )}
    </div>
  </section>
);

MembershipPlansCards.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      free: PropTypes.bool,
      affordable: PropTypes.bool,
      standard: PropTypes.bool,
      premium: PropTypes.bool,
    })
  ),
};

MembershipPlansCards.defaultProps = {
  plans: [],
};

export default MembershipPlansCards;
