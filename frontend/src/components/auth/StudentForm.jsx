import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';

const ResumeInput = () => {
  const navigate = useNavigate();

  // Initial state for the form
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    portfolio: '',
    skills: [{ skill: '' }],
    experience: [{ role: '', company: '', year: '' }],
    education: [
      { university: '', percentage: '', year: '', type: '10th' },
      { university: '', percentage: '', year: '', type: '12th' },
      { university: '', percentage: '', year: '', type: 'Graduation' },
    ],
    certificate: '',
  });

  // Event handler for form inputs
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split('-');

    if (field === 'education') {
      const updatedEducation = [...input.education];
      updatedEducation[index][e.target.dataset.field] = value;
      setInput({ ...input, education: updatedEducation });
    } else if (field === 'skills') {
      const updatedSkills = [...input.skills];
      updatedSkills[index][e.target.dataset.field] = value;
      setInput({ ...input, skills: updatedSkills });
    } else if (field === 'experience') {
      const updatedExperience = [...input.experience];
      updatedExperience[index][e.target.dataset.field] = value;
      setInput({ ...input, experience: updatedExperience });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  // Add new section for Education, Skills, or Experience
  const addRow = (section) => {
    if (section === 'education') {
      setInput({
        ...input,
        education: [...input.education, { university: '', percentage: '', year: '', type: 'Education' }],
      });
    } else if (section === 'skills') {
      setInput({ ...input, skills: [...input.skills, { skill: '' }] });
    } else if (section === 'experience') {
      setInput({
        ...input,
        experience: [...input.experience, { role: '', company: '', year: '' }],
      });
    }
  };

  // Remove rows for Education, Skills, or Experience
  const removeRow = (section, index) => {
    if (section === 'education' && index >= 3) {
      const updatedEducation = [...input.education];
      updatedEducation.splice(index, 1);
      setInput({ ...input, education: updatedEducation });
    } else if (section === 'skills' && index >= 1) {
      const updatedSkills = [...input.skills];
      updatedSkills.splice(index, 1);
      setInput({ ...input, skills: updatedSkills });
    } else if (section === 'experience' && index >= 1) {
      const updatedExperience = [...input.experience];
      updatedExperience.splice(index, 1);
      setInput({ ...input, experience: updatedExperience });
    }
  };

  // Navigate to preview page with entered data
  const handleNavigate = () => {
    navigate('/service/student/preview', { state: { input } });
  };
  const handleNavigateAts = () => {
    navigate('/service/student/previewats', { state: { input } });
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-4xl mx-4 md:mx-8 my-10 p-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3">
        <form className="bg-white shadow-xl rounded-lg p-12 w-full">
          <h1 className="font-bold text-3xl text-center mb-8 text-blue-600">Resume Input</h1>
          <div className="space-y-6">
            {/* Dynamic form fields rendering */}
            {Object.keys(input).map((key) => {
              if (key === 'education') {
                return (
                  <>
                    {input[key].map((edu, index) => (
                      <div key={index}>
                        <h2 className="font-semibold text-2xl mt-4">{edu.type} Education</h2>
                        <div className="flex space-x-6 mt-3">
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Education Type</label>
                            <input
                              type="text"
                              name={`education-${index}`}
                              data-field="type"
                              value={edu.type}
                              onChange={changeEventHandler}
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                              disabled={index < 3} // Disable first three entries
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
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
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
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <input
                              type="text"
                              name={`education-${index}`}
                              data-field="year"
                              value={edu.year}
                              onChange={changeEventHandler}
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                        </div>
                        {index >= 3 && (
                          <div className="flex justify-end mt-3">
                            <button
                              type="button"
                              onClick={() => removeRow('education', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => addRow('education')}
                        className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Education
                      </button>
                    </div>
                  </>
                );
              }

              if (key === 'skills') {
                return (
                  <>
                    {input[key].map((skill, index) => (
                      <div key={index} className="flex space-x-6 mt-6">
                        <div className="w-2/3">
                          <label className="block text-sm font-medium text-gray-700">Skill</label>
                          <input
                            type="text"
                            name={`skills-${index}`}
                            data-field="skill"
                            value={skill.skill}
                            onChange={changeEventHandler}
                            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                          />
                        </div>
                        <div className="flex justify-end w-1/3 mt-8">
                          {index >= 1 && (
                            <button
                              type="button"
                              onClick={() => removeRow('skills', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => addRow('skills')}
                        className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Skill
                      </button>
                    </div>
                  </>
                );
              }

              if (key === 'experience') {
                return (
                  <>
                    {input[key].map((exp, index) => (
                      <div key={index} className="mt-6">
                        <h2 className="font-semibold text-2xl">{`Experience ${index + 1}`}</h2>
                        <div className="flex space-x-6 mt-3">
                          <div className="w-1/3">
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <input
                              type="text"
                              name={`experience-${index}`}
                              data-field="role"
                              value={exp.role}
                              onChange={changeEventHandler}
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
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
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
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
                              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                            />
                          </div>
                        </div>
                        {index >= 1 && (
                          <div className="flex justify-end mt-3">
                            <button
                              type="button"
                              onClick={() => removeRow('experience', index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => addRow('experience')}
                        className="w-1/2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Add New Experience
                      </button>
                    </div>
                  </>
                );
              }

              return (
                <div key={key} className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={input[key]}
                    onChange={changeEventHandler}
                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                  />
                </div>
              );
            })}

<div className="flex justify-between mt-8 space-x-4">
  <button
    type="button"
    onClick={handleNavigate}
    className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
  >
    Vedann
  </button>
  <button
    type="button"
    onClick={handleNavigateAts}
    className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
  >
    ATS 
  </button>
</div>

          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ResumeInput;
