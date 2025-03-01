import React, { useState } from "react";
import { FaUpload, FaPlus, FaTrash } from "react-icons/fa";
const businessCertificates = [
    {
      category: "General Business",
      certificates: ["GST Registration", "Shop & Establishment License", "PAN & TAN"],
    },
    {
      category: "Food Industry",
      certificates: ["FSSAI License", "Health Trade License", "GST Registration"],
    },
    {
      category: "Import/Export",
      certificates: ["Import Export Code (IEC)", "GST Registration"],
    },
    {
      category: "Manufacturing & Industrial Units",
      certificates: ["Factory License", "Pollution Control Certificate", "GST Registration"],
    },
    {
      category: "Financial Services & NBFCs",
      certificates: ["RBI License", "GST Registration", "Company Registration"],
    },
    {
      category: "Medical & Healthcare",
      certificates: ["ISO Certification", "Drug License", "GST Registration"],
    },
    {
      category: "Construction & Real Estate",
      certificates: ["RERA Registration", "GST Registration", "Environmental Clearance"],
    },
  ];

const CompanyProfile = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const selected = businessCertificates.find((item) => item.category === category);
    if (selected) {
      setCertificates(selected.certificates.map((cert, index) => ({ id: index + 1, name: cert, file: null })));
    } else {
      setCertificates([]);
    }
  };

  // Handle file upload
  const handleFileUpload = (id, file) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
  };

  // Add new certificate manually
  const addCertificate = () => {
    const newId = certificates.length + 1;
    setCertificates([...certificates, { id: newId, name: "", file: null }]);
  };

  // Remove a certificate
  const removeCertificate = (id) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
    setUploadedFiles((prev) => {
      const updatedFiles = { ...prev };
      delete updatedFiles[id];
      return updatedFiles;
    });
  };

  // Handle selecting a certificate from the dropdown
  const handleSelectCertificate = (id, certName) => {
    setCertificates(certificates.map((cert) => (cert.id === id ? { ...cert, name: certName } : cert)));
    setOpenDropdown(null);
  };

  // State for company details
  const [company, setCompany] = useState({
    vedannNo: "12345",
    name: "XYZ Pvt Ltd",
    gstNo: "29ABCDE1234F1Z5",
    founders: ["John Doe"], // Now an array to store multiple founders
    established: "2010",
    website: "https://xyz.com",
  });

  // State for contact details
  const [contact, setContact] = useState({
    phone: "+91 9876543210",
    email: "contact@xyz.com",
    website: "https://xyz.com",
    address: "123 Business St, New York, USA",
  });



   
    

  // Handle changes in company and contact inputs
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    if (section === "company") {
      setCompany({ ...company, [name]: value });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  // Handle founder input change
  const handleFounderChange = (index, value) => {
    const updatedFounders = [...company.founders];
    updatedFounders[index] = value;
    setCompany({ ...company, founders: updatedFounders });
  };

  // Add a new founder
  const addFounder = () => {
    setCompany({ ...company, founders: [...company.founders, ""] });
  };

  // Remove a founder
  const removeFounder = (index) => {
    const updatedFounders = company.founders.filter((_, i) => i !== index);
    setCompany({ ...company, founders: updatedFounders });
  };

  // Handle certificate name change
  

  return (
    <div className="container mx-auto p-6">
     

      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Company Details</h3>
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <tbody>
            {Object.keys(company).map((key, index) => {
              if (key === "founders") return null; // Skip founders here, handle separately
              return (
                <tr key={index} className="border">
                  <td className="border px-4 py-2 font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name={key}
                      value={company[key]}
                      onChange={(e) => handleInputChange(e, "company")}
                      className="w-full p-1 border border-gray-300 rounded-md"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Founder Section */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Founders</h4>
          {company.founders.map((founder, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={founder}
                onChange={(e) => handleFounderChange(index, e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-md"
              />
              {company.founders.length > 1 && (
                <button
                  onClick={() => removeFounder(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addFounder}
            className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaPlus className="mr-1" /> Add Founder
          </button>
        </div>
      </div>

      {/* Certificate Upload Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Certificates</h3>

      {/* Business Type Selection */}
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="p-2 mb-4 border border-gray-300 rounded-md w-full"
      >
        <option value="">-- Select Business Type --</option>
        {businessCertificates.map((item, index) => (
          <option key={index} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>

      {/* Add Certificate Button */}
      <button
        onClick={addCertificate}
        className="mb-4 flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        <FaPlus className="mr-2" /> Add Certificate
      </button>

      {/* Certificate Upload Table */}
      {certificates.length > 0 && (
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Sr. No</th>
              <th className="border px-4 py-2">Certificate Name</th>
              <th className="border px-4 py-2">Upload</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td className="border px-4 py-2 text-center">{cert.id}</td>

                {/* Certificate Name with Dropdown */}
                <td className="border px-4 py-2 relative">
                  <input
                    type="text"
                    value={cert.name}
                    readOnly
                    onClick={() => setOpenDropdown(cert.id === openDropdown ? null : cert.id)}
                    className="w-full p-1 border border-gray-300 rounded-md cursor-pointer"
                  />
                  {openDropdown === cert.id && (
                    <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {businessCertificates
                        .find((b) => b.category === selectedCategory)?.certificates.map((option) => (
                          <li
                            key={option}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelectCertificate(cert.id, option)}
                          >
                            {option}
                          </li>
                        ))}
                    </ul>
                  )}
                </td>

                {/* File Upload */}
                <td className="border px-4 py-2 text-center">
                  <label className="text-blue-600 hover:text-blue-800 flex items-center justify-center cursor-pointer">
                    <FaUpload className="mr-1" /> Upload
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="hidden"
                      onChange={(e) => handleFileUpload(cert.id, e.target.files[0])}
                    />
                  </label>
                  {uploadedFiles[cert.id] && (
                    <p className="text-sm text-gray-600 mt-1">{uploadedFiles[cert.id].name}</p>
                  )}
                </td>

                {/* Remove Certificate */}
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

      {/* Contact Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Contact </h3>
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <tbody>
            {Object.keys(contact).map((key, index) => (
              <tr key={index} className="border">
                <td className="border px-4 py-2 font-semibold capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name={key}
                    value={contact[key]}
                    onChange={(e) => handleInputChange(e, "contact")}
                    className="w-full p-1 border border-gray-300 rounded-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyProfile;
