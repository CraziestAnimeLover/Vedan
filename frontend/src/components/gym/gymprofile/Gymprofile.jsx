import React, { useState , useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../../ui/Card";
import { Input } from "@/components/ui/input";

const GymProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    vedanId: "",
    name: "",
    contactNo: "",
    mainAddress: "",
    email: "",
    image: null,
    branchId: "B1001",
    branchname: "Sunny",
    gymId: "12121",
    founder: "",
    address: "",
    taxes: [{ tax: "GST", taxNo: "" }],
  });

  const branchIds = ["B1001", "B1002", "B1003"]; // Example branch IDs
  useEffect(() => {
    const fetchGymProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/gymProfiles/${formData.gymId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData((prevState) => ({
            ...prevState,
            ...data, 
            branchname: branchIds.includes(data.branchId) ? data.branchId : prevState.branchname
          }));
        } else {
          console.error("Failed to fetch gym profile");
        }
      } catch (error) {
        console.error("Error fetching gym profile:", error);
      }
    };
  
    fetchGymProfile();
  }, []);
  

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      setFormData((prevData) => {
        const updatedTaxes = [...prevData.taxes];
        updatedTaxes[index] = { ...updatedTaxes[index], [field]: e.target.value };
        return { ...prevData, taxes: updatedTaxes };
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddTax = () => {
    setFormData({
      ...formData,
      taxes: [...formData.taxes, { tax: "GST", taxNo: "" }],
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "image" && formData.image instanceof File) {
          formDataToSend.append("image", formData.image);
        } else if (key === "taxes") {
          formDataToSend.append(key, JSON.stringify(formData[key])); // Convert array to string
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
  
      const method = formData._id ? "PUT" : "POST"; // If _id exists, update instead of create
      const url = formData._id 
        ? `http://localhost:8000/api/gymProfiles/${formData._id}`
        : "http://localhost:8000/api/gymProfiles";
  
      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Success:", result);
        setShowProfile(true);
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  
  const handleBranchChange = (e) => {
    const selectedBranchId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      branchId: selectedBranchId,
      branchname: selectedBranchId, // Update branchname dynamically
    }));
  };
  
  
  

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      <Button onClick={() => setShowProfile(!showProfile)} className="absolute top-2 right-2">
        {showProfile ? "Edit Profile" : "Profile"}
      </Button>

      {showProfile ? (
        <Card className="p-4 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Gym Profile</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p><strong>Vedan ID:</strong> {formData.vedanId}</p>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Contact No:</strong> {formData.contactNo}</p>
                <p><strong>Main Address:</strong> {formData.mainAddress}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
              <div className="flex justify-center items-center">
                {formData.image ? (
                  <img src={formData.image} alt="Profile" className="w-32 h-32 object-cover rounded-full border-2 border-gray-300" />
                ) : (
                  <div className="w-32 h-32 flex justify-center items-center border-2 border-gray-300 rounded-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p><strong>Branch:</strong> {formData.branchname} ({formData.gymId})</p>
              </div>
              <div>
                <p><strong>Founder:</strong> {formData.founder}</p>
              </div>
              <div>
                <p><strong>Address:</strong> {formData.address}</p>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <p><strong>Taxes:</strong></p>
              {formData.taxes.map((t, i) => (
                <p key={i}>{t.tax}: {t.taxNo}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-4 shadow-lg">
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input name="vedanId" placeholder="Vedan ID" value={formData.vedanId} onChange={handleChange} className="mb-2" />
                <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="mb-2" />
                <Input name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} className="mb-2" />
                <Input name="mainAddress" placeholder="Main Address" value={formData.mainAddress} onChange={handleChange} className="mb-2" />
                <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="mb-2" />
              </div>
              <div className="flex justify-center items-center">
                <label className="w-32 h-32 rounded-full border-2 border-dashed flex justify-center items-center cursor-pointer">
                  {formData.image ? (
                    <img src={formData.image} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-sm text-gray-500">Click to Upload</span>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            <hr className="my-4" />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold">{formData.branchname} ({formData.gymId})</label>
                <select name="branchId" value={formData.branchId} onChange={handleBranchChange} className="w-full p-2 border rounded">
  {branchIds.map((id) => (
    <option key={id} value={id}>{id}</option>
  ))}
</select>

              </div>
              <div>
                <label className="text-sm font-semibold">Founder</label>
                <Input name="founder" placeholder="Founder Name" value={formData.founder} onChange={handleChange} />
              </div>
              <div>
                <label className="text-sm font-semibold">Address</label>
                <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
              </div>
            </div>

            <hr className="my-4" />

            {formData.taxes.map((taxEntry, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <select value={taxEntry.tax} onChange={(e) => handleChange(e, index, "tax")} className="w-full p-2 border rounded">
                    <option value="GST">GST</option>
                    <option value="VAT">VAT</option>
                    <option value="Income Tax">Income Tax</option>
                  </select>
                </div>
                <div>
                  <Input placeholder="Tax Number" value={taxEntry.taxNo} onChange={(e) => handleChange(e, index, "taxNo")} />
                </div>
                {index === formData.taxes.length - 1 && (
                  <Button onClick={handleAddTax}>Add</Button>
                )}
              </div>
            ))}

<div className="mt-6 text-center">
  <Button onClick={handleSubmit} className="w-40">
    {formData._id ? "Update" : "Submit"}
  </Button>
</div>

          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GymProfile;
