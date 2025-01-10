import React, { useState } from "react";

const ServiceTypeSelection = () => {
  const [selectedService, setSelectedService] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const serviceOptions = [
    { name: "Net Water Bottle", value: "net_water_bottle" },
    { name: "Floor Cleaning", value: "floor_cleaning" },
    { name: "Other Service", value: "other_service" },
  ];

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setAdditionalDetails(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-semibold mb-4">Select Service Type</h3>
      
      {/* Service Options */}
      <div className="flex gap-8 mb-6">
        {serviceOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={option.value}
              name="service"
              value={option.value}
              checked={selectedService === option.value}
              onChange={handleServiceChange}
              className="text-indigo-600"
            />
            <label htmlFor={option.value} className="text-lg font-medium">
              {option.name}
            </label>
          </div>
        ))}
      </div>

      {/* Additional Details Section */}
      {selectedService === "other_service" && (
        <div>
          <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details (If any)
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            rows="4"
            placeholder="Provide additional details here"
            value={additionalDetails}
            onChange={handleDetailsChange}
            className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}
      
      {/* Display selected service */}
      {selectedService && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Selected Service: {selectedService}</h4>
          {selectedService === "other_service" && additionalDetails && (
            <p className="text-sm text-gray-600 mt-2">Additional Details: {additionalDetails}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelection;
