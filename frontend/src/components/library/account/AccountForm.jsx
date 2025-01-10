
import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon

const AccountForm = ({ onAddPlan, onAddService, onAddDiscount }) => {
  const [plan, setPlan] = useState({ name: '', fee: '', details: [] });
  const [service, setService] = useState({ name: '', fee: '' });
  const [discount, setDiscount] = useState('');
  const [plansList, setPlansList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [discountsList, setDiscountsList] = useState([]);

  const handleAddPlan = () => {
    if (plan.name && plan.fee && plan.details.length > 0) {
      const newPlan = {
        name: plan.name,
        fee: plan.fee,
        details: plan.details,
      };
      onAddPlan(newPlan);
      setPlansList([...plansList, newPlan]);
      setPlan({ name: '', fee: '', details: [] });
    }
  };

  const handleAddService = () => {
    if (service.name && service.fee) {
      const newService = { name: service.name, fee: service.fee };
      onAddService(newService);
      setServicesList([...servicesList, newService]);
      setService({ name: '', fee: '' });
    }
  };

  const handleAddDiscount = () => {
    if (discount) {
      onAddDiscount(discount);
      setDiscountsList([...discountsList, discount]);
      setDiscount('');
    }
  };

  const handleRemovePlan = (index) => {
    const updatedPlans = plansList.filter((_, i) => i !== index);
    setPlansList(updatedPlans);
  };

  const handleRemoveService = (index) => {
    const updatedServices = servicesList.filter((_, i) => i !== index);
    setServicesList(updatedServices);
  };

  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = discountsList.filter((_, i) => i !== index);
    setDiscountsList(updatedDiscounts);
  };

  return (
    <section className="mb-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Data</h2>

      {/* Add Membership Plan */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Membership Plan</h3>
        <input
          type="text"
          placeholder="Plan Name"
          value={plan.name}
          onChange={(e) => setPlan({ ...plan, name: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Fee"
          value={plan.fee}
          onChange={(e) => setPlan({ ...plan, fee: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Details (comma-separated)"
          value={plan.details.join(', ')}
          onChange={(e) => setPlan({ ...plan, details: e.target.value.split(',').map(d => d.trim()) })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddPlan}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Plan
        </button>
      </div>

      {/* List of Membership Plans with Remove Button */}
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

      {/* Add Service Fee */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Add Service Fee</h3>
        <input
          type="text"
          placeholder="Service Name"
          value={service.name}
          onChange={(e) => setService({ ...service, name: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Fee"
          value={service.fee}
          onChange={(e) => setService({ ...service, fee: e.target.value })}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddService}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      {/* List of Service Fees with Remove Button */}
      <div>
        {servicesList.map((service, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{service.name}</span>
            <button
              onClick={() => handleRemoveService(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>

      {/* Add Discount */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Add Discount</h3>
        <input
          type="text"
          placeholder="Discount Description"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          onClick={handleAddDiscount}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Discount
        </button>
      </div>

      {/* List of Discounts with Remove Button */}
      <div>
        {discountsList.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{discount}</span>
            <button
              onClick={() => handleRemoveDiscount(index)}
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

export default AccountForm;
