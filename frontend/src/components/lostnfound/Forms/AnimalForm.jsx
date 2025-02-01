const AnimalForm = () => (
    <form className="mt-4">
      {/* Exact Samay */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(1) Exact Samay</h3>
  
        <label className="text-gray-400">Lost Location</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter lost location"
          aria-label="Lost Location"
        />
  
        <label className="text-gray-400 mt-2">Lost Date</label>
        <input
          type="date"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          aria-label="Lost Date"
        />
  
        <label className="text-gray-400 mt-2">Lost Time</label>
        <input
          type="time"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          aria-label="Lost Time"
        />
      </div>
  
      {/* Animal Specify */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(2) Animal Specify</h3>
  
        <label className="text-gray-400">Kingdom</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter kingdom"
          aria-label="Kingdom"
        />
  
        <label className="text-gray-400 mt-2">Phylum</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter phylum"
          aria-label="Phylum"
        />
  
        <label className="text-gray-400 mt-2">Class</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter class"
          aria-label="Class"
        />
  
        <label className="text-gray-400 mt-2">Order</label>
        <input
          type="number"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter order"
          aria-label="Order"
        />
  
        <label className="text-gray-400 mt-2">Family</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter family"
          aria-label="Family"
        />
      </div>
  
      {/* Biometric Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(3) Biometric Details</h3>
  
        <label className="text-gray-400">Body Color</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter body color"
          aria-label="Body Color"
        />
  
        <label className="text-gray-400 mt-2">Eye Color</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter eye color"
          aria-label="Eye Color"
        />
  
        <label className="text-gray-400 mt-2">Height (from standard position)</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter height from standard position"
          aria-label="Height (from standard position)"
        />
  
        <label className="text-gray-400 mt-2">Weight</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter weight"
          aria-label="Weight"
        />
  
        <label className="text-gray-400 mt-2">Age</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter age"
          aria-label="Age"
        />
  
        <label className="text-gray-400 mt-2">Gender</label>
        <select
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          aria-label="Gender"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
  
      {/* Social Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(4) Social Details</h3>
  
        <label className="text-gray-400">Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter full name"
          aria-label="Name"
        />
  
        <label className="text-gray-400 mt-2">Upload Picture</label>
        <input
          type="file"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          aria-label="Upload Picture"
        />
  
        <label className="text-gray-400 mt-2">Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter address"
          aria-label="Address"
        />
      </div>
  
      {/* Guardian Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(5) Guardian Details</h3>
  
        <label className="text-gray-400">Person</label>
        <input
          type="text"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter contact person's name"
          aria-label="Person"
        />
  
        <label className="text-gray-400 mt-2">Phone Number</label>
        <input
          type="tel"
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter phone number"
          aria-label="Phone Number"
        />
  
        <label className="text-gray-400 mt-2">Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter guardian's address"
          aria-label="Guardian Address"
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
  
  export default AnimalForm;
  