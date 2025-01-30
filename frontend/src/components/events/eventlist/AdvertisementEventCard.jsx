import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "../../ui/Card";

// Sample advertisement event
const advertisementEvent = {
  id: 1,
  title: "Exclusive Offer: Dental Checkup at 50% Off!",
  description: "Free appointment today and save big on your dental care. Limited time offer!",
  image: "https://images1-fabric.practo.com/clove-dental-faridabad-1489558524-58c8dbfc60acf.png", // Ad Image URL
  buttonText: "Book Now",
  buttonLink: "#", // Link to book now
};

const AdvertisementEventCard = ({ onClose }) => {
  return (
    <motion.div
      className="p-4"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: "relative" }}
    >
      <Card className="w-full lg:w-96 flex flex-col justify-between rounded-2xl shadow-lg overflow-hidden relative">
        {/* Advertisement Image */}
        <img
          src={advertisementEvent.image}
          alt={advertisementEvent.title}
          className="w-full h-40 object-cover"
        />

        {/* Card Content */}
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold">{advertisementEvent.title}</CardTitle>
          <p className="mt-2 text-sm text-gray-700">{advertisementEvent.description}</p>
          <a
            href={advertisementEvent.buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-center transition duration-300 hover:bg-blue-700"
          >
            {advertisementEvent.buttonText}
          </a>
        </CardContent>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-900 rounded-full p-2 hover:bg-black transition duration-200"
        >
          &times;
        </button>
      </Card>
    </motion.div>
  );
};

export default AdvertisementEventCard;
