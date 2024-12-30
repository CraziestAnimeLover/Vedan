import React, { useState } from 'react';
import Navbar from '../shared/Navbar';

const ResumeInput = () => {
  // Initial state with static entries for education, skills, and experience
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    portfolio: '',
    skills: [{ skill: '' }],
    experience: [{ role: '', company: '', year: '' }],
    education: [
      { university: '', percentage: '', type: '10th' },
      { university: '', percentage: '', type: '12th' },
      { university: '', percentage: '', type: 'Graduation' },
    ],
    certificate: '',
  });

  // Handles input changes for all fields
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split('-'); // Split to get field and index

    if (field === 'education') {
      const newEducation = [...input.education];
      newEducation[index][e.target.dataset.field] = value;
      setInput({
        ...input,
        education: newEducation,
      });
    } else if (field === 'skills') {
      const newSkills = [...input.skills];
      newSkills[index][e.target.dataset.field] = value;
      setInput({
        ...input,
        skills: newSkills,
      });
    } else if (field === 'experience') {
      const newExperience = [...input.experience];
      newExperience[index][e.target.dataset.field] = value;
      setInput({
        ...input,
        experience: newExperience,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  // Add new education row
  const addEducationRow = () => {
    setInput({
      ...input,
      education: [
        ...input.education,
        { university: '', percentage: '', type: `Education ${input.education.length + 1}` },
      ],
    });
  };

  // Remove education row
  const removeEducationRow = (index) => {
    if (index >= 3) {
      const newEducation = [...input.education];
      newEducation.splice(index, 1);
      setInput({
        ...input,
        education: newEducation,
      });
    }
  };

  // Add new skill row
  const addSkillRow = () => {
    setInput({
      ...input,
      skills: [...input.skills, { skill: '' }],
    });
  };

  // Remove skill row
  const removeSkillRow = (index) => {
    if (index >= 1) { // Keep at least one skill
      const newSkills = [...input.skills];
      newSkills.splice(index, 1);
      setInput({
        ...input,
        skills: newSkills,
      });
    }
  };

  // Add new experience row
  const addExperienceRow = () => {
    setInput({
      ...input,
      experience: [...input.experience, { role: '', company: '', year: '' }],
    });
  };

  // Remove experience row
  const removeExperienceRow = (index) => {
    if (index >= 1) { // Keep at least one experience entry
      const newExperience = [...input.experience];
      newExperience.splice(index, 1);
      setInput({
        ...input,
        experience: newExperience,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-4 md:mx-8 my-10 p-8">
        {/* Input Form Section */}
        <form className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="font-bold text-2xl text-center mb-6 text-blue-600">Resume Input</h1>

          <div className="space-y-4">
            {Object.keys(input).map((key) => {
              // For education, skills, and experience, handle them differently
              if (key === 'education') {
                return (
                  <>
                    {input[key].map((edu, index) => (
                      <div key={index}>
                        <h2 className="font-semibold text-xl mt-4">{edu.type} Education</h2>
                        <div className="flex space-x-4 mt-2">
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Education Type</label>
                            <input
                              type="text"
                              name={`education-${index}`}
                              data-field="type"
                              value={edu.type}
                              onChange={changeEventHandler}
                              placeholder="Enter education type (e.g., 10th, 12th, Graduation)"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                              disabled={index < 3} // Disable the default entries
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">University</label>
                            <input
                              type="text"
                              name={`education-${index}`}
                              data-field="university"
                              value={edu.university}
                              onChange={changeEventHandler}
                              placeholder="Enter university"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Percentage</label>
                            <input
                              type="text"
                              name={`education-${index}`}
                              data-field="percentage"
                              value={edu.percentage}
                              onChange={changeEventHandler}
                              placeholder="Enter percentage"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                        </div>
                        {/* Remove Button */}
                        <div className="flex justify-end mt-2">
                          {index >= 3 && ( // Only show Remove button for dynamic rows
                            <button
                              type="button"
                              onClick={() => removeEducationRow(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {/* Add Row Button */}
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={addEducationRow}
                        className="w-1/2 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Education 
                      </button>
                    </div>
                  </>
                );
              }

              // Handling Skills Section
              if (key === 'skills') {
                return (
                  <>
                    {input[key].map((skill, index) => (
                      <div key={index} className="flex space-x-4 mt-4">
                        <div className="w-2/3">
                          <label className="block text-sm font-medium text-gray-700">Skill</label>
                          <input
                            type="text"
                            name={`skills-${index}`}
                            data-field="skill"
                            value={skill.skill}
                            onChange={changeEventHandler}
                            placeholder="Enter skill"
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="flex justify-end w-1/3 mt-8">
                          {index >= 1 && ( // Allow removal of dynamically added skills (except the first one)
                            <button
                              type="button"
                              onClick={() => removeSkillRow(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={addSkillRow}
                        className="w-1/2 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Skill 
                      </button>
                    </div>
                  </>
                );
              }

              // Handling Experience Section
              if (key === 'experience') {
                return (
                  <>
                    {input[key].map((exp, index) => (
                      <div key={index} className="mt-4">
                        <h2 className="font-semibold text-xl">{`Experience ${index + 1}`}</h2>
                        <div className="flex space-x-4 mt-2">
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                              type="text"
                              name={`experience-${index}`}
                              data-field="role"
                              value={exp.role}
                              onChange={changeEventHandler}
                              placeholder="Enter role"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                              type="text"
                              name={`experience-${index}`}
                              data-field="company"
                              value={exp.company}
                              onChange={changeEventHandler}
                              placeholder="Enter company"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                              type="text"
                              name={`experience-${index}`}
                              data-field="year"
                              value={exp.year}
                              onChange={changeEventHandler}
                              placeholder="Enter year"
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          {index >= 1 && ( // Only allow removing dynamic rows
                            <button
                              type="button"
                              onClick={() => removeExperienceRow(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        onClick={addExperienceRow}
                        className="w-1/2 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Experience 
                      </button>
                    </div>
                  </>
                );
              }

              // Handle other fields like name, email, phone etc.
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    type={key === 'email' ? 'email' : 'text'}
                    name={key}
                    value={input[key]}
                    onChange={changeEventHandler}
                    placeholder={`Enter your ${key}`}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              );
            })}
          </div>
        </form>

        {/* Display Submitted Data Section (real-time display as user types) */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-1/2 mt-8 md:mt-0">
          <h2 className="font-bold text-4xl mb-4 text-gray-800">{input.name || 'Name'}</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-1/3">
                <p><strong>Email:</strong> {input.email || 'No email entered'}</p>
                <p><strong>Phone:</strong> {input.phone || 'No phone entered'}</p>
                <p><strong>Address:</strong> {input.address || 'No address entered'}</p>
              </div>
              <div className="w-1/3">
                <p><strong>Portfolio:</strong> <a href={input.portfolio || '#'} className="text-blue-600">{input.portfolio || 'No portfolio link'}</a></p>
              </div>
            </div>

            {/* Display Education Table */}
            <h3 className="font-semibold text-xl mt-4">Education</h3>
            <table className="min-w-full mt-2 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">University</th>
                  <th className="px-4 py-2 border">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {input.education.map((edu, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{edu.type}</td>
                    <td className="px-4 py-2 border ">{edu.university || 'Ex. School Name'}</td>
                    <td className="px-4 py-2 border">{edu.percentage || 'Ex. Percentage'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Display Skills */}
            <h3 className="font-semibold text-xl mt-4">Skills</h3>
            <ul className="list-disc pl-6">
              {input.skills.map((skill, index) => (
                <li key={index}>{skill.skill || 'No skill'}</li>
              ))}
            </ul>

            {/* Display Experience */}
            <h3 className="font-semibold text-xl mt-4">Experience</h3>
            <ul className="pl-6">
              {input.experience.map((exp, index) => (
                <li key={index}>
                  {exp.role || 'No role'} at {exp.company || 'No company'} ({exp.year || 'No year'})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeInput;
