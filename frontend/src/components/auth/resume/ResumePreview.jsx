import React, { useRef } from 'react';
import jsPDF from 'jspdf';

const ResumePreview = ({ input }) => {
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // Create a PDF in portrait mode

    // Adjust styles for A4 page with bigger font
    doc.html(resumeRef.current, {
      callback: (pdf) => {
        pdf.save(`${input.name || 'Resume'}.pdf`); // Save with the user's name or "Resume"
      },
      x: 40, // Adjust horizontal margin for more space
      y: 40, // Adjust vertical margin
      width: 510, // A4 width with adjusted margins
      windowWidth: 1024, // Ensure the page layout adapts to browser width
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">Resume Preview</h1>

      <div
        ref={resumeRef}
        style={{
          fontSize: '14px', // Increase font size for readability
          lineHeight: '1.8', // Adjust line height for better spacing
          padding: '30px', // Increase padding for more spacious layout
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

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
