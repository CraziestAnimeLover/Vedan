import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { motion } from "framer-motion";

const ServicePage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div className="w-64 bg-gradient-to-r from-blue-200 to-purple-200 p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Services</h2>
          <ul className="space-y-4">
            {services.map((service) => (
              <li key={service.title}>
                <button
                  onClick={() => handleServiceClick(service)}
                  className="w-full text-left bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Content */}
        <div className="flex-1 p-8 bg-white">
          <motion.h1
            className="text-4xl font-bold text-center text-gray-800 mb-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {selectedService ? selectedService.title : "Select a Service"}
          </motion.h1>

          {/* Display Selected Service or Default Cards */}
          {selectedService ? (
            <motion.div
              className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                key={selectedService.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to={selectedService.url} aria-label={`Go to ${selectedService.title}`}>
                  <ServiceButton title={selectedService.title} />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            // Default Cards for "Past", "Present", and "Future"
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="block bg-white text-gray-800 text-center py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100">
                    <h2 className="text-2xl font-semibold">{card.title}</h2>
                    <p className="mt-4">{card.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ServiceButton = ({ title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block bg-white text-gray-800 text-center py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100"
  >
    <h2 className="text-2xl font-semibold">{title} </h2>
  </motion.div>
);

const services = [
  { title: "Placement", url: "/service/student" },
  { title: "Library", url: "/library" },
  { title: "Exam", url: "/industry" },
  { title: "Activity", url: "/industry" },
];

const cards = [
  {
    title: "Past",
    content: "This represents the past achievements, history, and foundation of the services."
  },
  {
    title: "Present",
    content: "This section highlights the current offerings, achievements, and goals in the service."
  },
  {
    title: "Future",
    content: "The future section outlines what is planned, upcoming developments, and aspirations."
  },
];

export default ServicePage;
