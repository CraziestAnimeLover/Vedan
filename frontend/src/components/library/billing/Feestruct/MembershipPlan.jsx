import React from "react";
import PropTypes from "prop-types";
import MembershipPlansCards from "../Feestruct/MembershipPlansCards";

const MembershipPlans = ({ plans }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Membership Plans</h2>
    <h5 className="text-xl font-semibold mb-4">Vedann Plan</h5>

    {/* Membership Plans Table */}
    <div className="overflow-x-auto mb-8">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Plan Name</th>
            <th className="border border-gray-300 px-4 py-2">Free</th>
            <th className="border border-gray-300 px-4 py-2">Affordable</th>
            <th className="border border-gray-300 px-4 py-2">Standard</th>
            <th className="border border-gray-300 px-4 py-2">Premium</th>
          </tr>
        </thead>
        <tbody>
          {plans && plans.length > 0 ? (
            plans.map((plan, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-bold">{plan.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-700">
                  {plan.free ? "free" : "0"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">
                  {plan.affordable ? "400" : "400"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">
                  {plan.standard ? "1000" : "1000"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-600">
                  {plan.premium ? "1500" : "1500"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border border-gray-300 px-4 py-2 text-gray-500 text-center">
                No plans available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Membership Plans Cards */}
    <div className="mb-8">
      <MembershipPlansCards plans={plans} />
    </div>
  </section>
);

MembershipPlans.defaultProps = {
  plans: [],
};

MembershipPlans.propTypes = {
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

export default MembershipPlans;
