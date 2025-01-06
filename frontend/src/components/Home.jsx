import React from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './Footer';
import Advertisement from './shared/Advertisement';
import Signup from '../components/auth/Signup';
import Quotes from './quotes/Quotes';

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen">
      {/* <Advertisement/> */}
      <div>
        {/* <Navbar/>
        <HeroSection/>
        <CategoryCarousel/> */}
        <Signup />
        <Quotes />
        {/* <LatestJobs/> */}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
