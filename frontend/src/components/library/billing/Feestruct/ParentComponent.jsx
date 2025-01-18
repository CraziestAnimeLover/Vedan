import React, { useState } from 'react';
import InputForm from './InputForm';  // InputForm for adding new plans
// import OutputPage from './OutputPage';  // OutputPage to display plans
import MembershipPlansCards from './MembershipPlansCards';  // Show plans as cards
import WaiveOff from './WaiveOff';
// import WaiveOff from './WaiveOff';


const ParentComponent = () => {
  const [plans, setPlans] = useState([]);

  // Handle Adding New Plan
  const handleAddPlan = (newPlan) => {
    setPlans([...plans, newPlan]);
  };

  // Handle Removing a Plan
  const handleRemovePlan = (index) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  // Handle Editing a Plan (if applicable)
  const handleEditPlan = (index, updatedPlan) => {
    const updatedPlans = plans.map((plan, i) =>
      i === index ? updatedPlan : plan
    );
    setPlans(updatedPlans);
  };

  return (
    <div className="container">
      {/* InputForm component to add plans */}
      <InputForm
        onAddPlan={handleAddPlan}
        onRemovePlan={handleRemovePlan}
        onEditPlan={handleEditPlan}
        plansList={plans}  // Passing plansList to InputForm
      />
      <MembershipPlansCards  apiUrl="http://localhost:8000" plans={plans} />
      <div>
        <WaiveOff/>
      </div>
      {/* Pass plans to both OutputPage and MembershipPlansCards */}
      {/* <OutputPage plans={plans} /> */}
      <div>

      <MembershipPlansCards  apiUrl="http://localhost:8000" plans={plans} />
      </div>
    </div>
  );
};

export default ParentComponent;
