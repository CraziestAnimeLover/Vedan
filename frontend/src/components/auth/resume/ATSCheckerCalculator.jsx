import React, { useState, useEffect } from 'react';

const ATSCheckerCalculator = ({ input }) => {
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    calculateATSScore();
  }, [input]);

  const calculateATSScore = () => {
    let score = 0;
    const feedbackList = [];

    // Check for essential sections
    if (input.name && input.email && input.phone) {
      score += 20;
    } else {
      feedbackList.push('Ensure contact information (name, email, phone) is complete.');
    }

    if (input.skills.length > 0 && input.skills.some(skill => skill.skill)) {
      score += 20;
    } else {
      feedbackList.push('Add relevant skills to your resume.');
    }

    if (input.experience.length > 0 && input.experience.some(exp => exp.role && exp.company)) {
      score += 20;
    } else {
      feedbackList.push('Add detailed work experience, including roles and companies.');
    }

    if (input.education.length > 0 && input.education.some(edu => edu.university)) {
      score += 20;
    } else {
      feedbackList.push('Include your educational background.');
    }

    // Check for keywords
    const keywords = ['teamwork', 'leadership', 'project management', 'problem-solving'];
    const resumeText = JSON.stringify(input).toLowerCase();

    const matchedKeywords = keywords.filter(keyword => resumeText.includes(keyword));
    if (matchedKeywords.length > 0) {
      score += 20;
    } else {
      feedbackList.push(
        'Incorporate relevant keywords (e.g., teamwork, leadership, project management) into your resume.'
      );
    }

    setScore(score);
    setFeedback(feedbackList);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">ATS Compatibility Score</h1>
      <div className="text-center mb-6">
        <p className="text-2xl font-semibold">
          Your ATS Score: <span className="text-blue-600">{score}%</span>
        </p>
        <p className="text-gray-600">Optimize your resume to improve your ATS score.</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Feedback</h2>
        {feedback.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">Great job! Your resume is well-optimized for ATS.</p>
        )}
      </div>
    </div>
  );
};

export default ATSCheckerCalculator;
