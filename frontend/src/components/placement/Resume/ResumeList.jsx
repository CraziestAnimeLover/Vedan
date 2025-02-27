import React, { useEffect, useState } from 'react';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/resumes')
      .then((res) => res.json())
      .then((data) => setResumes(data))
      .catch((error) => console.error('Error fetching resumes:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Saved Resumes</h1>
      <ul>
        {resumes.map((resume) => (
          <li key={resume._id} className="border-b p-4">
            <h2 className="text-xl font-semibold">{resume.name}</h2>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <p>Address: {resume.address}</p>
            <p>Portfolio: <a href={resume.portfolio} className="text-blue-600" target="_blank" rel="noopener noreferrer">{resume.portfolio}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
