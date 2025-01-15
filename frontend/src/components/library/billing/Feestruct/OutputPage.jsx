import React from 'react';
import MembershipPlansCards from './MembershipPlansCards';  // Optional if you want cards here too

const OutputPage = ({ plans }) => {
  return (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
        {/* Display MembershipPlansCards in OutputPage */}
        <MembershipPlansCards plans={plans} />
        
      </section>
    </>
  );
};

export default OutputPage;
