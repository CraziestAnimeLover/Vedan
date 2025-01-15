import React, { useState } from "react";
import PropTypes from "prop-types";
import './styles.css'; // Assuming you add the CSS in this file
import MembershipPlansCards from "./MembershipPlansCards";
import ParentComponent from "./ParentComponent";
import WaiveOff from "./WaiveOff";

const MembershipPlans = ({ plans: initialPlans }) => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPlan, setEditedPlan] = useState(null);

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditedPlan({ ...plans[index] }); // Make a copy of the selected plan for editing
  };

  const handleEditChange = (field, value) => {
    setEditedPlan((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0, // Update the specific field
    }));
  };

  const handleUpdatePlan = () => {
    if (editingIndex === null || !editedPlan) return;

    const updatedPlans = [...plans];
    updatedPlans[editingIndex] = editedPlan; // Update the edited plan
    setPlans(updatedPlans);
    setEditingIndex(null);
    setEditedPlan(null); // Reset editing state
  };

  const handleRemovePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans); // Update the plans state after removal
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">(1) Membership Plans</h2>
      <h5 className="text-xl font-semibold mb-4">(a) Vedann Plan</h5>

      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Plan Name</th>
              <th className="border border-gray-300 px-4 py-2">Free</th>
              <th className="border border-gray-300 px-4 py-2">Affordable</th>
              <th className="border border-gray-300 px-4 py-2">Standard</th>
              <th className="border border-gray-300 px-4 py-2">Premium</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans && plans.length > 0 ? (
              plans.map((plan, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedPlan?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.name
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedPlan?.free }
                        onChange={(e) => handleEditChange("free", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.free
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={  editedPlan?.affordable }
                        onChange={(e) => handleEditChange("affordable", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.affordable
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedPlan?.standard }
                        onChange={(e) => handleEditChange("standard", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.standard
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editedPlan?.premium }
                        onChange={(e) => handleEditChange("premium", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.premium
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-2">
                    {editingIndex === index ? (
                      <button
                        onClick={handleUpdatePlan}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditStart(index)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleRemovePlan(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-gray-500 text-center">
                  No plans available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <ParentComponent/>
        {/* <WaiveOff/> */}
       
      </div>
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
                  <td className="border border-gray-300 px-4 py-2 font-bold">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedPlan?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        plan.name
                      )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                      type="number"
                      value={editedPlan?.free }
                      onChange={(e) => handleEditChange("free", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.free
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                      type="number"
                      value={  editedPlan?.affordable }
                      onChange={(e) => handleEditChange("affordable", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.affordable
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                      type="number"
                      value={editedPlan?.standard }
                      onChange={(e) => handleEditChange("standard", e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                      />
                    ) : (
                      plan.standard
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingIndex === index ? (
                      <input
                      type="number"
                        value={editedPlan?.premium }
                        onChange={(e) => handleEditChange("premium", e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                        />
                      ) : (
                        plan.premium
                      )}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-gray-500 text-center">
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

MembershipPlans.defaultProps = {
  plans: [],
};

MembershipPlans.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      free: PropTypes.number,
      affordable: PropTypes.number,
      standard: PropTypes.number,
      premium: PropTypes.number,
    })
  ),
};

export default MembershipPlans;
