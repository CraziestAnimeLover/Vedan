const MaterialForm = () => (
    <form className="mt-4">
      {/* Exact Samay */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(1) Exact Samay</h3>
  
        <label className="text-gray-400">Lost Location</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter lost location"
        />
  
        <label className="text-gray-400 mt-2">Lost Date</label>
        <input
          type="date"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
  
        <label className="text-gray-400 mt-2">Lost Time</label>
        <input
          type="time"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
      </div>
  
      {/* Measurement */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(2) Measurement</h3>
  
        <label className="text-gray-400">Height</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter height"
        />
  
        <label className="text-gray-400 mt-2">Length</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter length"
        />
  
        <label className="text-gray-400 mt-2">Width</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter width"
        />
  
        <label className="text-gray-400 mt-2">Weight</label>
        <input
          type="number"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter weight"
        />
  
        <label className="text-gray-400 mt-2">Diameter</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter diameter"
        />
      </div>
  
      {/* Social Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(3) Social Details</h3>
  
        <label className="text-gray-400">Material Type</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter material type"
        />
  
        <label className="text-gray-400 mt-2">Upload Picture</label>
        <input
          type="file"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
  
        <label className="text-gray-400 mt-2">Brand Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter brand name"
        />
  
        <label className="text-gray-400 mt-2">Tax Number</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter tax number"
        />
      </div>
  
      {/* Contact Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(4) Contact Details</h3>
  
        <label className="text-gray-400">Contact Person</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter contact person's name"
        />
  
        <label className="text-gray-400 mt-2">Phone Number</label>
        <input
          type="tel"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter phone number"
        />
  
        <label className="text-gray-400 mt-2">Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter address"
        />
      </div>
  
      <button
        type="submit"
        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
      >
        Submit Details
      </button>
    </form>
  );
  
  export default MaterialForm;
  