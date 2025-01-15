import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Font Awesome Trash icon

const InputForm = ({ onAddPlan }) => {
  const [plan, setPlan] = useState({ name: "", fee: "", details: "" });
  const [plansList, setPlansList] = useState([]);

  const handleAddPlan = () => {
    if (plan.name && plan.fee && plan.details) {
      const newPlan = {
        name: plan.name,
        fee: plan.fee,
        details: plan.details.split(",").map((d) => d.trim()),
      };
      onAddPlan(newPlan); // Pass the new plan to the parent
      setPlansList([...plansList, newPlan]);
      setPlan({ name: "", fee: "", details: "" });
    }
  };

  const handleRemovePlan = (index) => {
    const updatedPlans = plansList.filter((_, i) => i !== index);
    setPlansList(updatedPlans);
  };

  return (
    <section className="mb-8 p-4 bg-white rounded shadow">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold mb-2">(b) Card Plan</h3>
        <input
          type="text"
          placeholder="Plan Name"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Fee (e.g. Free, 400, 1000, 1500)"
          value={plan.fee}
          onChange={(e) => setPlan({ ...plan, fee: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Details (comma-separated)"
          value={plan.details}
          onChange={(e) => setPlan({ ...plan, details: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddPlan}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Plan
        </button>
      </div>

      <div>
        {plansList.map((plan, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{plan.name}</span>
            <button
              onClick={() => handleRemovePlan(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InputForm;
