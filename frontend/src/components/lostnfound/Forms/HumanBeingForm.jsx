const HumanBeingForm = () => (
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
  
      {/* Biometric Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(2) Biometric Info</h3>
  
        <label className="text-gray-400">Eye Color</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter eye color"
        />
  
        <label className="text-gray-400 mt-2">Hair Type</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter hair type"
        />
  
        <label className="text-gray-400 mt-2">Height</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter height"
        />
  
        <label className="text-gray-400 mt-2">Age</label>
        <input
          type="number"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter age"
        />
  
        <label className="text-gray-400 mt-2">Skin Color</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter skin color"
        />
  
        <label className="text-gray-400 mt-2">Gender</label>
        <select className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
  
      {/* Social Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(3) Social Details</h3>
  
        <label className="text-gray-400">Full Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter full name"
        />
  
        <label className="text-gray-400 mt-2">Upload Picture</label>
        <input
          type="file"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
  
        <label className="text-gray-400 mt-2">Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter address"
        />
  
        <label className="text-gray-400 mt-2">Profession</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter profession"
        />
      </div>
  
      {/* Guardian Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(4) Guardian Details</h3>
  
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
  
        <label className="text-gray-400 mt-2">Guardian's Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter guardian's address"
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
  
  export default HumanBeingForm;
  