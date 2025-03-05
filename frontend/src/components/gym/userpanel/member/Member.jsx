import React, { useState } from "react";
import ProfileMem from "./ProfileMem";
import IDCard from "./IDCard";
import Attendance from "./Attendance";
const Member = () => {

  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);


  const [formData, setFormData] = useState({
    memberId: "",
    name: "",
    address: "",
    gender: "male",
    mobile: "",
    email: "",
    dateOfBirth: "",
    batch: "",
    caseOf: "",
    remarks: "",
    plan: "today plan",
    planamount:"",
    startDate: "",
    expiredDate: "",
    enrollmentFee: "",
    discount: "",
    taxApplication: "Name 1",
    taxAmount: "",
    billDate: "",
    document: null,
    profileImage: null,
  });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const renderComponent = () => {
    if (!selectedComponent || !selectedMember) return null;
  
    switch (selectedComponent) {
      case "Profile":
        return <ProfileMem member={selectedMember} />;
      case "Attendance":
        return <Attendance member={selectedMember} />;
      case "ID Card":
        return <IDCard member={selectedMember} />;
      default:
        return null;
    }
  };
  
  
  const handleComponentSelection = (component, member) => {
    if (selectedComponent === component && selectedMember === member) {
      setSelectedComponent(null);
      setSelectedMember(null);
    } else {
      setSelectedComponent(component);
      setSelectedMember(member);
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMembers([...members, formData]); // Correctly adding formData to members array
  
    setFormData({  // Reset form data instead of members
      memberId: "",
      name: "",
      address: "",
      gender: "male",
      mobile: "",
      email: "",
      dateOfBirth: "",
      batch: "",
      caseOf: "",
      remarks: "",
      plan: "today plan",
      planamount: "",
      startDate: "",
      expiredDate: "",
      enrollmentFee: "",
      discount: "",
      taxApplication: [],
      taxAmount: "",
      billDate: "",
      document: null,
      profileImage: null,
    });
  
    setShowForm(false);
  };
  
  // Update handleChange for checkboxes
const handleCheckboxChange = (e) => {
  const { name, value, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: checked
      ? [...prev[name], value] // Add to array if checked
      : prev[name].filter((item) => item !== value), // Remove if unchecked
  }));
};

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg relative">
      {/* Toggle Form Button */}
      <button 
      onClick={()=>setShowForm(!showForm)}
      className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
{showForm ? "Close Form " : "Add Batch"}
      </button>

      {/* Show Form When Button Clicked */}
      {showForm && (
        <>
        <div className="absolute top-16 pt-4 right-4">
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-sm text-gray-500">Upload</span>
              </div>
            )}
          </div>
        </label>
        <input
          type="file"
          id="profileImageInput"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <div>
          <label className="block font-medium">Member ID</label>
          <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} className="w-74 p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-74 p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} className="w-74 p-2 border rounded"></textarea>
        </div>
        <div>
        
          <div>
  <label className="block font-medium">Gender</label>
  <div className="flex space-x-4">
    <label className="flex items-center">
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formData.gender === "male"}
        onChange={handleChange}
        className="mr-2"
      />
      Male
    </label>
    <label className="flex items-center">
      <input
        type="radio"
        name="gender"
        value="female"
        checked={formData.gender === "female"}
        onChange={handleChange}
        className="mr-2"
      />
      Female
    </label>
  </div>
</div>

        </div>
        <div>
          <label className="block font-medium">Mobile</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-74 p-2 border rounded" />
        </div>
       
        
        {/* Plan Details */}
        <h3 className="text-md font-semibold">Plan Details</h3>
        <div>
          <label className="block font-medium">Select Plan</label>
          <select name="plan" value={formData.plan} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="today plan">Today Plan</option>
            <option value="tomorrow plan">Tomorrow Plan</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Plan Amount</label>
          <input type="number" name="planamount" value={formData.planamount} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Expired Date</label>
          <input type="date" name="expiredDate" value={formData.expiredDate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Enrollment Fee</label>
          <input type="number" name="enrollmentFee" value={formData.enrollmentFee} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Discount</label>
          <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
        <div>
  <label className="block font-medium">Tax Application</label>
  <div className="space-y-2">
    {["Name 1", "Name 2", "Name 3"].map((name) => (
      <div key={name} className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="taxApplication"
          value={name}
          checked={formData.taxApplication.includes(name)}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <label>{name}</label>
        <input
          type="text"
          name={`taxAmount_${name}`}
          placeholder="Enter amount"
          onChange={handleChange}
          className="p-2 border rounded w-24"
        />
      </div>
    ))}
  </div>
</div>;
</div>

        <div>
          <label className="block font-medium">Tax Amount</label>
          <input type="number" name="taxAmount" value={formData.taxAmount} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Bill Date</label>
          <input type="date" name="billDate" value={formData.billDate} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Upload Document</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Batch</label>
          <input type="text" name="batch" value={formData.batch} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Case Of</label>
          <input type="text" name="caseOf" value={formData.caseOf} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
        </>
    
    ) }
      
      {/* Batch Cards */}
      <div className="mt-6">
      {members.length === 0 ? (
  <p className="text-gray-500 text-center">No Member added yet.</p>
) : (
  members.map((member, index) => (
    <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        {member.profileImage && (
          <img
            src={member.profileImage}
            alt="Member"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
        )}

        <div className="w-full">
          <h3 className="text-lg font-semibold">Name: {member.name}</h3>
          <h3 className="text-lg font-semibold">Address: {member.address}</h3>

          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <p>
              <strong>ID:</strong> {member.memberId}
            </p>
            <p>
              <strong>Contact:</strong> {member.mobile}
            </p>
          </div>
        </div>

        <button
          onClick={() => removeMember(index)}
          className="text-red-600 font-bold text-lg ml-4"
        >
          ❌
        </button>
      </div>

      <hr className="my-3 border-gray-300" />

      <div className="flex justify-around">
        <button
          onClick={() => handleComponentSelection("Profile", member)}
          className={`px-4 py-2 rounded ${
            selectedComponent === "Profile" && selectedMember === member
              ? "bg-blue-700"
              : "bg-blue-500"
          } text-white hover:bg-blue-600`}
        >
          {selectedComponent === "Profile" && selectedMember === member
            ? "Hide Profile"
            : "Show Profile"}
        </button>

        <button
          onClick={() => handleComponentSelection("Attendance", member)}
          className={`px-4 py-2 rounded ${
            selectedComponent === "Attendance" && selectedMember === member
              ? "bg-green-700"
              : "bg-green-500"
          } text-white hover:bg-green-600`}
        >
          {selectedComponent === "Attendance" && selectedMember === member
            ? "Hide Attendance"
            : "Show Attendance"}
        </button>

        <button
          onClick={() => handleComponentSelection("ID Card", member)}
          className={`px-4 py-2 rounded ${
            selectedComponent === "ID Card" && selectedMember === member
              ? "bg-purple-700"
              : "bg-purple-500"
          } text-white hover:bg-purple-600`}
        >
          {selectedComponent === "ID Card" && selectedMember === member
            ? "Hide ID Card"
            : "Show ID Card"}
        </button>
      </div>

      {selectedMember === member && <div className="mt-4">{renderComponent()}</div>}
    </div>
  ))
)}
</div>

      
     
    </div>
  );
};

export default Member;