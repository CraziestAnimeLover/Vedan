import React from 'react';
import ConsultList from '../consultquery/ConsultList';

const Consultant = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Consultant Header */}
      <div className="py-4 bg-gray-100 shadow-md">
        
      </div>

      {/* Consultant List Section */}
      <div className="flex-1 overflow-auto p-4">
        <ConsultList />
      </div>
    </div>
  );
}

export default Consultant;
