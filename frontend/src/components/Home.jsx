import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from './Footer';
import Signup from '../components/auth/Signup';
import Quotes from './quotes/Quotes';
import AdvertisementEventCard from './events/eventlist/AdvertisementEventCard'; // Import the AdvertisementEventCard

const Home = () => {
  // State to manage advertisement visibility
  const [showAd, setShowAd] = useState(true);
  const navigate = useNavigate()

  // Function to handle closing the advertisement
  const handleCloseAd = () => {
    setShowAd(false);
  };

  // Function to handle advertisement click
  const handleAdClick = () => {
    navigate('/social/events'); // Navigate to the /social/event route
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen">
      {/* Optional Advertisement */}
      <div>
        {/* Signup Section */}
        <div className="space-x-4">
          <Signup />
        </div>

        {/* Show Advertisement only if showAd is true */}
        {showAd && (
          <div>
            <AdvertisementEventCard onClose={handleCloseAd} onClick={handleAdClick} /> {/* Pass the close handler */}
          </div>
        )}

        {/* Quotes Section */}
        <div>
          {/* <Quotes /> */}
        </div>

        {/* Latest Jobs Section */}
        {/* <div>
          <LatestJobs />
        </div> */}

        {/* Footer Section */}
        <div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
