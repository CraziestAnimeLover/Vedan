import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import ProfileCard from "../library/profile/libmgtprofile/ProfileCard";

const ServicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Backdrop when Sidebar is Open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Left Sidebar (Responsive) */}
        <div
          className={`lg:w-64 w-full bg-gray-100 p-6 shadow-md transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform ease-in-out duration-300 fixed inset-0 z-10 mt-20 lg:relative lg:block`}
        >
          <ProfileCard />
          <ul className="space-y-4 mt-6">
            {services.map((service) => (
              <li key={service.title} className="relative group">
                <button className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  {service.title}
                </button>
                {/* Display Items when Hovering over the Service */}
                <div className="absolute left-full top-0 mt-1 w-56 bg-white shadow-lg rounded-md hidden group-hover:block">
                  <ul className="space-y-2 p-4">
                    {serviceItems[service.title]?.map((item) => (
                      <li key={item.title}>
                        <Link
                          to={item.url}
                          className="block text-blue-600 hover:text-blue-800"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          className="lg:hidden p-4 text-white bg-blue-500 rounded-full fixed top-5 right-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <div className="space-y-1">
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        </button>

        {/* Right Side Content */}
        <div className="flex-1 p-4 mt-16 bg-white">
          {/* Default Cards for "Past", "Present", and "Future" */}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title}>
                <div className="block bg-gray-50 text-gray-800 text-center py-8 rounded shadow hover:shadow-lg h-40">
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <p className="mt-2 text-sm cursor-pointer ">{card.content1}</p>
                  <p className="mt-2 text-sm cursor-pointer">{card.content2}</p>
                  <p className="mt-2 text-sm cursor-pointer">{card.content3}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const services = [
  { title: "Placement", url: "/industry" },
  { title: "Library", url: "/library" },
  { title: "Exam", url: "/industry" },
  { title: "Activity", url: "/industry" },
  { title: "Diet Chart", url: "/industry" },
];

// Define a mapping of services to their respective items
const serviceItems = {
  Library: [
    { title: "Smriti", url: "/library/smriti" },
    { title: "Full", url: "/library/full" },
    
  ],
  Exam: [
    { title: "Fill Up", url: "/service/exam/apply" },
    { title: "Test Series", url: "/service/exam/testseries" },
    { title: "Scholarship Scheme", url: "/service/exam/scholarship" },
    { title: "Result", url: "/service/exam/result" },
    { title: "Admit Card", url: "/service/exam/admitcard" },
    { title: "Study Center", url: "/service/exam/studycenter" },
  ],
  Activity: [
    { title: "Sports", url: "/service/activity/sports" },
    { title: "E-Sports", url: "/service/activity/esports" },
    { title: "Competitions", url: "/service/activity/compition" },
  ],
  "Diet Chart": [
    { title: "Diet", url: "/diet" },
   
  ],
  Placement: [
    { title: "Placement", url: "/placement" },
    { title: "Internships", url: "/placement/internships" },
  ],
};

const cards = [
  {
    title: "Throwback",
    content1: "Resume",
    content2: "Result",
  },
  {
    title: "Remainder",
    content1: "TimeTable",
    content2: "Exam Notification",
    content3: "Time Until",
  },
  {
    title: "Upskills",
    content1: "course",
    content2: "Events",
  },
];

export default ServicePage;
