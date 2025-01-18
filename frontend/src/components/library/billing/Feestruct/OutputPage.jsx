import React, { useEffect, useState } from "react";

const OutputPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/plans")
      .then((response) => response.json())
      .then((data) => setPlans(data))
      .catch((error) => console.error("Error fetching plans:", error));
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Output: Membership Plans</h2>
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
            {plans.length > 0 ? (
              plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-bold">{plan.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.free}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.affordable}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.standard}</td>
                  <td className="border border-gray-300 px-4 py-2">{plan.premium}</td>
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
    </section>
  );
};

export default OutputPage;
