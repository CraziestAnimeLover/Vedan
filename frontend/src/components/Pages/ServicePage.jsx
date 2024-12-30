import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { motion } from 'framer-motion';

const ServicePage = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-8">
        <motion.h1
          className="text-4xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Our Services
        </motion.h1>

        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#schedule"
            className="bg-blue-600 text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Schedule Now
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link to={service.url}>
                <ServiceButton title={service.title} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceButton = ({ title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="block bg-white text-gray-800 text-center py-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100"
  >
    <h2 className="text-2xl font-semibold">{title}</h2>
  </motion.div>
);

const services = [
  { title: 'NewsFeed', url: '/newsfeed' },
  { title: 'Placement', url: '/service/student' },
  { title: 'Industry', url: '/jobs' },
  { title: 'Library', url: '/library' },
  { title: 'Blood Help', url: '#' },
  { title: 'Lost n Found', url: '/lostnfound' },
];

export default ServicePage;
