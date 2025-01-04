import React, { useRef } from 'react';
import jsPDF from 'jspdf';

const ResumePreviewAts = ({ input }) => {
  const resumeRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4'); // Create a PDF in portrait mode
    doc.html(resumeRef.current, {
      callback: (pdf) => {
        pdf.save(`${input.name || 'Resume'}.pdf`); // Save with the user's name or "Resume"
      },
      x: 40,
      y: 40,
      width: 510,
      windowWidth: 1024,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Resume Preview</h1>

      <div
        ref={resumeRef}
        style={{
          fontSize: '12pt',
          lineHeight: '1.5',
          padding: '20px',
          backgroundColor: '#ffffff',
          color: '#000000',
          width: '100%',
        }}
      >
        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
          <p><strong>Name:</strong> {input.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {input.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> {input.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> {input.address || 'Not provided'}</p>
        </div>

        {/* Professional Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Professional Summary</h2>
          <p>{input.summary || 'Not provided'}</p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {input.skills.map((skill, index) => (
              <li key={index}>{skill.skill || 'Not provided'}</li>
            ))}
          </ul>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Job Title</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Company</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Dates</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Key Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              {input.experience.map((exp, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{exp.role || 'Not provided'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{exp.company || 'Not provided'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{exp.year || 'Not provided'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {exp.responsibilities || 'Not provided'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Degree</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>University</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Year</th>
                <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {input.education.map((edu, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{edu.degree || 'Not provided'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {edu.university || 'Not provided'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {edu.year || 'Not provided'}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {edu.grade || 'Not provided'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Certifications (optional) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
          <ul style={{ paddingLeft: '20px' }}>
            {input.certifications && input.certifications.length > 0 ? (
              input.certifications.map((cert, index) => (
                <li key={index}>{cert || 'Not provided'}</li>
              ))
            ) : (
              <li>No certifications listed</li>
            )}
          </ul>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadPDF}
        style={{
          marginTop: '20px',
          backgroundColor: '#4A90E2',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreviewAts;
