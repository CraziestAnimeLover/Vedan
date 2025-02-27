import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';

const ResumePreview = ({ input }) => {
  const resumeRef = useRef();
  const [isSaved, setIsSaved] = useState(false);

  // Save resume data to backend
  const handleSaveResume = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to save resume');
      }

      setIsSaved(true);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    }
  };

  // Generate PDF and download
  const handleDownloadPDF = async () => {
    if (!isSaved) {
      await handleSaveResume(); // Ensure resume is saved before downloading
    }

    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(resumeRef.current, {
      callback: (pdf) => {
        pdf.save(`${input.name || 'Resume'}.pdf`);
      },
      x: 40,
      y: 40,
      width: 510,
      windowWidth: 1024,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">Resume Preview</h1>

      <div
        ref={resumeRef}
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          padding: '30px',
          backgroundColor: '#ffffff',
          color: '#000000',
          width: '100%',
        }}
      >
        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <p><strong>Name:</strong> {input.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {input.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {input.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> {input.address || 'Not provided'}</p>
          <p>
            <strong>Portfolio:</strong>{' '}
            {input.portfolio ? (
              <a href={input.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
                {input.portfolio}
              </a>
            ) : (
              'Not provided'
            )}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          <ul className="list-disc ml-6">
            {input.skills.map((skill, index) => (
              <li key={index}>{skill.skill || 'Not provided'}</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {input.experience.map((exp, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{exp.role || 'Not provided'}</td>
                  <td className="border border-gray-300 px-4 py-2">{exp.company || 'Not provided'}</td>
                  <td className="border border-gray-300 px-4 py-2">{exp.year || 'Not provided'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">University</th>
                <th className="border border-gray-300 px-4 py-2">Percentage</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
              </tr>
            </thead>
            <tbody>
              {input.education.map((edu, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{edu.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{edu.university || 'Not provided'}</td>
                  <td className="border border-gray-300 px-4 py-2">{edu.percentage || 'Not provided'}</td>
                  <td className="border border-gray-300 px-4 py-2">{edu.year || 'Not provided'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save & Download Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleSaveResume}
          className={`px-6 py-3 rounded-lg shadow-md ${isSaved ? 'bg-green-500' : 'bg-gray-600'} text-white`}
          disabled={isSaved}
        >
          {isSaved ? 'Saved ✅' : 'Save Resume'}
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
