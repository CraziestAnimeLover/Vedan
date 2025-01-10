import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'; // Assuming you are using lucide-react for icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo and Brand Name */}
          <div className="mb-8 md:mb-0 md:mr-8">
            <h1 className="text-3xl font-bold">
              Only<span className="text-[#c03131]">Jobs</span>
            </h1>
            <p className="mt-2 text-gray-400">Your gateway to career success.</p>
          </div>

          {/* Social Media and Newsletter */}
          <div className="flex flex-col items-start md:items-start text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
            <div className="flex items-center space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c03131] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://x.com/vedann4" target="_blank" rel="noopener noreferrer" className="hover:text-[#c03131] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c03131] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c03131] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@Vedann4" target="_blank" rel="noopener noreferrer" className="hover:text-[#c03131] transition-colors">
                <Youtube className="w-8 h-12" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <form className="w-full max-w-sm">
              <div className="flex items-center border-b border-gray-400 py-2">
                <input
                  type="email"
                  className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
                <button
                  className="flex-shrink-0 bg-[#c03131] hover:bg-[#a62727] border-[#c03131] hover:border-[#a62727] text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="hover:text-white transition-colors">
              Jobs
            </Link>
            <Link to="/browse" className="hover:text-white transition-colors">
              Browse
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contactus" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Copyright Section */}
          <div className="mt-4 md:mt-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} OnlyJobs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
