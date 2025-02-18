import React, { useState, useEffect } from "react";

const AnimalCard = () => {
  const [animals, setAnimals] = useState([]); // Initialize as an empty array

  // Fetch the animal data when the component mounts
  useEffect(() => {
    fetch("http://localhost:8000/api/animals")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched animal data:", data); // Log the fetched data to the console
        if (data.success && Array.isArray(data.animals)) {
          setAnimals(data.animals); // Access the animals array inside the response object
        } else {
          console.error("Animals data is not in the expected format:", data);
        }
      })
      .catch((error) => console.error("Error fetching animal data:", error));
  }, []);
  
  const handleInvalidData = (value) => {
    return value && isNaN(value) ? "N/A" : value;
  };

  if (animals.length === 0) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="bg-[#071e34] text-white p-6 rounded-lg shadow-xl w-full max-w-3xl mx-auto mb-6 pb-6">
      {/* Loop through animals and display each one */}
      {animals.map((animal) => (
        <div key={animal._id} className="mb-6 transition-transform duration-300 transform hover:scale-105">
          {/* Title */}
          <h2 className="text-center text-3xl font-bold uppercase tracking-wide mb-4 p-4 bg-[#4f24b3] rounded-t-lg">
            LUPTAM
          </h2>

          {/* Horizontal Line */}
          <hr className="my-4 border-gray-500" />

          {/* Animal Details */}
          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Image Section */}
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:8000${animal?.image || "/default-animal.jpg"}`}
                alt="Animal"
                className="w-36 h-36 object-cover rounded-full border-4 border-[#4f24b3]"
              />
            </div>

            <div className="bg-[#20354b] p-6 rounded-lg shadow-lg hover:bg-[#1c2a38] transition-colors duration-300">
              <h3 className="text-lg font-semibold">Guardian Details</h3>
              <p className="text-gray-300"><strong>Name:</strong> {handleInvalidData(animal?.guardianName)}</p>
              <p className="text-gray-300"><strong>Phone:</strong> {handleInvalidData(animal?.guardianPhone)}</p>
              <p className="text-gray-300"><strong>Address:</strong> {handleInvalidData(animal?.guardianAddress)}</p>
            </div>

            {/* Animal Info */}
            <div className="bg-[#20354b] p-6 rounded-lg shadow-lg hover:bg-[#1c2a38] transition-colors duration-300">
              <h3 className="text-lg font-semibold">Social Details</h3>
              <p className="text-gray-300"><strong>Name:</strong> {animal?.name || "N/A"}</p>
              <p className="text-gray-300"><strong>Specify:</strong> {handleInvalidData(animal?.family)}</p>
              <p className="text-gray-300"><strong>Age:</strong> {handleInvalidData(animal?.age)}</p>
            </div>

            {/* Health Info */}
            <div className="bg-[#20354b] p-6 rounded-lg shadow-lg hover:bg-[#1c2a38] transition-colors duration-300">
              <h3 className="text-lg font-semibold">Biometric Details</h3>
              <p className="text-gray-300"><strong>Body Color:</strong> {handleInvalidData(animal?.bodyColor)}</p>
              <p className="text-gray-300"><strong>Eye Color:</strong> {handleInvalidData(animal?.eyeColor)}</p>
              <p className="text-gray-300"><strong>Height:</strong> {handleInvalidData(animal?.height)}</p>
              <p className="text-gray-300"><strong>Weight:</strong> {handleInvalidData(animal?.weight)}</p>
              <p className="text-gray-300"><strong>Gender:</strong> {handleInvalidData(animal?.gender)}</p>
            </div>
          </div>

          {/* Lost Details Section */}
          <div className="bg-[#20354b] p-6 rounded-lg shadow-lg mt-4 hover:bg-[#1c2a38] transition-colors duration-300">
            <h3 className="text-lg font-semibold">Lost Details</h3>
            <p className="text-gray-300"><strong>Location:</strong> {handleInvalidData(animal?.lostLocation)}</p>
            <p className="text-gray-300"><strong>Date:</strong> {new Date(animal?.lostDate).toLocaleDateString() || "N/A"}</p>
            <p className="text-gray-300"><strong>Time:</strong> {handleInvalidData(animal?.lostTime)}</p>
          </div>

          {/* Horizontal Line */}
          <hr className="my-4 border-gray-500" />
        </div>
      ))}
    </div>
  );
};

export default AnimalCard;
