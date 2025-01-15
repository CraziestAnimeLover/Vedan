import React from "react";
import PropTypes from "prop-types";

const MembershipPlansCards = ({ plans }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4"> Card Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans && plans.length > 0 ? (
        plans.map((plan, index) => {
          let annualFee;
          if (plan.fee === "Free") {
            annualFee = "Free";
          } else if (["400", "1000", "1500"].includes(plan.fee)) {
            annualFee = plan.fee; // Directly use the fee if it's one of the specific amounts
          } else {
            annualFee = plan.fee || "N/A"; // Default to "N/A" if no valid fee is provided
          }

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold mb-4 text-center">{plan.name}</h3>
              <p className="text-gray-700 text-center mb-4">
                <span className="font-semibold">Annual Fee:</span> {annualFee}
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                {plan.details.map((detail, i) => (
                  <li key={i} className="text-sm">{detail}</li>
                ))}
              </ul>
              <div className="text-center">
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                  Subscribe Now
                </button> */}
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center">No plans available.</p>
      )}
    </div>
  </section>
);

MembershipPlansCards.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      fee: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default MembershipPlansCards;
