import React, { useState, useEffect } from "react";

const MaterialCard = () => {
  const [materialData, setMaterialData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/materials")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setMaterialData(data.materials); // Adjust according to the actual response structure
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!materialData) {
    return <div className="text-center text-white py-4">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#4f24b3] to-[#2b183f] text-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-auto mt-8">
      {/* Scrollable Grid Container */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-1">
          {/* Check if materialData is an array */}
          {Array.isArray(materialData) ? (
            materialData.map((material, index) => (
              <div key={index} className="bg-[#20354b] p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
                {/* Title: LUPTAM */}
                <h2 className="text-center text-3xl font-bold text-[#ffab00] uppercase tracking-wide mb-6">LUPTAM</h2>

                {/* 2x2 Grid Layout */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Image Section */}
                  <div className="flex justify-center items-center">
                    <img
                      src={`http://localhost:8000${material?.image || "/default-animal.jpg"}`}
                      alt="Material"
                      className="w-40 h-40 object-cover rounded-full border-4 border-[#ffab00] shadow-md"
                    />
                  </div>

                  {/* Guardian Details */}
                  <div className="bg-[#4f24b3] p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Guardian Details</h3>
                    <p className="text-gray-300"><strong>Person:</strong> {material?.contactPerson || "N/A"}</p>
                    <p className="text-gray-300"><strong>Phone Number:</strong> {material?.phoneNumber || "N/A"}</p>
                    <p className="text-gray-300"><strong>Address:</strong> {material?.address || "N/A"}</p>
                  </div>

                  {/* Social Details */}
                  <div className="bg-[#4f24b3] p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Social Details</h3>
                    <p className="text-gray-300"><strong>Type:</strong> {material?.materialType || "N/A"}</p>
                    <p className="text-gray-300"><strong>Brand Name:</strong> {material?.brandName || "N/A"}</p>
                    <p className="text-gray-300"><strong>Unique No.:</strong> {material?.taxNumber || "N/A"}</p>
                  </div>

                  {/* Measurement Info */}
                  <div className="bg-[#4f24b3] p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Measurement</h3>
                    <p className="text-gray-300"><strong>Height:</strong> {material?.height || "N/A"}</p>
                    <p className="text-gray-300"><strong>Length:</strong> {material?.length || "N/A"}</p>
                    <p className="text-gray-300"><strong>Width:</strong> {material?.width || "N/A"}</p>
                    <p className="text-gray-300"><strong>Weight:</strong> {material?.weight || "N/A"}</p>
                  </div>
                </div>

                {/* Remarks Section */}
                <div className="bg-[#4f24b3] p-4 rounded-lg shadow-md mt-6">
                  <h3 className="text-lg font-semibold mb-2">Remarks</h3>
                  <p className="text-gray-300">LUPAT</p>
                </div>
              </div>
            ))
          ) : (
            <div>No materials found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
