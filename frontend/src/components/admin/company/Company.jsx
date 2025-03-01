import React from "react";

const Company = () => {
  const students = [
    {
      name: "John Doe",
      address: "123 Main St, NY",
      education: {
        tenth: "85%",
        twelfth: "90%",
        graduation: "B.Tech (CS)",
        postgraduation: "M.Tech (AI)",
      },
      skills: ["AutoCAD", "Excel", "MS Office"],
      experience: ["6 months", "1 year"],
    },
    {
        name: "John Doe",
        address: "123 Main St, NY",
        education: {
          tenth: "85%",
          twelfth: "90%",
          graduation: "B.Tech (CS)",
          postgraduation: "M.Tech (AI)",
        },
        skills: ["AutoCAD", "Excel", "MS Office"],
        experience: ["6 months", "1 year"],
      },
      {
        name: "John Doe",
        address: "123 Main St, NY",
        education: {
          tenth: "85%",
          twelfth: "90%",
          graduation: "B.Tech (CS)",
          postgraduation: "M.Tech (AI)",
        },
        skills: ["AutoCAD", "Excel", "MS Office"],
        experience: ["6 months", "1 year"],
      },
      {
        name: "John Doe",
        address: "123 Main St, NY",
        education: {
          tenth: "85%",
          twelfth: "90%",
          graduation: "B.Tech (CS)",
          postgraduation: "M.Tech (AI)",
        },
        skills: ["AutoCAD", "Excel", "MS Office"],
        experience: ["6 months", "1 year","2 years"],
      },
      {
        name: "John Doe",
        address: "123 Main St, NY",
        education: {
          tenth: "85%",
          twelfth: "90%",
          graduation: "B.Tech (CS)",
          postgraduation: "M.Tech (AI)",
        },
        skills: ["AutoCAD", "Excel", "MS Office"],
        experience: ["6 months", "1 year"],
      },
    {
      name: "Jane Smith",
      address: "456 Elm St, CA",
      education: {
        tenth: "88%",
        twelfth: "92%",
        graduation: "B.Sc (IT)",
        postgraduation: "M.Sc (Data Science)",
      },
      skills: ["Excel", "MS Office"],
      experience: ["1 year", "2 years"],
    },
  ];

  // Extract unique skills & experiences from all students
  const allSkills = [...new Set(students.flatMap(student => student.skills))];
  const allExperiences = [...new Set(students.flatMap(student => student.experience))];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">(क) Tabular Comparison Resume</h2>
      <h1>Vedann will send sheet to company which comprision resume in Tabular form</h1>
      <h1>Eg = Excel sheet</h1>
      <h1>Short Listing according merit & experience details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2">Name</th>
              {students.map((student, index) => (
                <th key={index} className="border px-4 py-2">{student.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Basic Information */}
            <tr><td className="border px-4 py-2">Address</td>{students.map(student => <td key={student.name} className="border px-4 py-2">{student.address}</td>)}</tr>
            <tr><td className="border px-4 py-2">10th</td>{students.map(student => <td key={student.name} className="border px-4 py-2">{student.education.tenth}</td>)}</tr>
            <tr><td className="border px-4 py-2">12th</td>{students.map(student => <td key={student.name} className="border px-4 py-2">{student.education.twelfth}</td>)}</tr>
            <tr><td className="border px-4 py-2">Graduation</td>{students.map(student => <td key={student.name} className="border px-4 py-2">{student.education.graduation}</td>)}</tr>
            <tr><td className="border px-4 py-2">Post Graduation</td>{students.map(student => <td key={student.name} className="border px-4 py-2">{student.education.postgraduation}</td>)}</tr>

            {/* Dynamic Skills Section */}
            <tr><td className="border px-4 py-2 font-bold">Skills</td>{students.map(() => <td className="border px-4 py-2"></td>)}</tr>
            {allSkills.map(skill => (
              <tr key={skill}>
                <td className="border px-4 py-2">{skill}</td>
                {students.map(student => (
                  <td key={student.name} className="border px-4 py-2">
                    {student.skills.includes(skill) ? "✔️" : "❌"}
                  </td>
                ))}
              </tr>
            ))}

            {/* Dynamic Experience Section */}
            <tr><td className="border px-4 py-2 font-bold">Experience</td>{students.map(() => <td className="border px-4 py-2"></td>)}</tr>
            {allExperiences.map(exp => (
              <tr key={exp}>
                <td className="border px-4 py-2">{exp}</td>
                {students.map(student => (
                  <td key={student.name} className="border px-4 py-2">
                    {student.experience.includes(exp) ? "✔️" : "❌"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Company;
