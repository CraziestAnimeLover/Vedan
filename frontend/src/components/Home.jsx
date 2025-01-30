import React, { useState } from 'react';
// import Navbar from './shared/Navbar';
// import HeroSection from './HeroSection';
// import CategoryCarousel from './CategoryCarousel';
// import LatestJobs from './LatestJobs';
import Footer from './Footer';
// import Advertisement from './shared/Advertisement';
import Signup from '../components/auth/Signup';
import Quotes from './quotes/Quotes';
import { motion } from 'framer-motion';
import AdvertisementEventCard from './events/eventlist/AdvertisementEventCard'; // Import the AdvertisementEventCard

const Home = () => {
  // State to manage advertisement visibility
  const [showAd, setShowAd] = useState(true);

  // Function to handle closing the advertisement
  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen">
      {/* Optional Advertisement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      

        {/* Navbar Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
        </motion.div> */}

        {/* Hero Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroSection />
        </motion.div> */}

        {/* Category Carousel */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CategoryCarousel />
        </motion.div> */}

        {/* Signup Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className='space-x-4'>
            <Signup />
          </div>
        </motion.div>

  {/* Show Advertisement only if showAd is true */}
  {showAd && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AdvertisementEventCard onClose={handleCloseAd} /> {/* Pass the close handler */}
          </motion.div>
        )}
        {/* Quotes Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* <Quotes /> */}
        </motion.div>

        {/* Latest Jobs Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <LatestJobs />
        </motion.div> */}

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {/* <Footer /> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
