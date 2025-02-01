import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "../../ui/Card";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

// Sample advertisement event
const advertisementEvent = {
  id: 1,
  title: "Exclusive Offer: Health Checkup !",
  description: "Free appointment at Sunday and save big on your Health care. Limited time offer!",
  image: "https://images1-fabric.practo.com/clove-dental-faridabad-1489558524-58c8dbfc60acf.png", // Ad Image URL
  buttonText: "Others",
  image1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVu_0fbvJONqmYSV6MeiXs-Rqb6t_v2UzXVohIwUEGxyYpVxOmMa0c2vJEwejkX4RBuNs&usqp=CAU",
  buttonLink: "/social/event", // Link to book now (This will navigate to /social/event)
};

const AdvertisementEventCard = ({ onClose }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation when the card is clicked
  const handleCardClick = () => {
    navigate("/social/events"); // Navigate to the buttonLink route
  };

  return (
    <motion.div
      className="p-4"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: "relative" }}
    >
      <div className="relative flex items-start">
        <Card className="w-full lg:w-96 flex flex-col justify-between rounded-2xl shadow-lg overflow-hidden relative">
          {/* Tag in the Top Right Corner */}
          <img
            src={advertisementEvent.image1}
            alt="Tag Image"
            className="absolute top-4 right-4 w-20 h-10 object-cover rounded-lg border-2 border-white shadow-md"
          />

          {/* Advertisement Image */}
          <img
            src={advertisementEvent.image}
            alt={advertisementEvent.title}
            className="w-full h-40 object-cover"
          />

          {/* Card Content */}
          <CardContent className="p-4">
            <CardTitle className="text-xl font-semibold">{advertisementEvent.title}</CardTitle>
            <p className="mt-2 text-sm text-gray-700"> {advertisementEvent.description}</p>
            <button
              onClick={handleCardClick} // Trigger navigation when the button is clicked
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-center transition duration-300 hover:bg-blue-700"
            >
              {advertisementEvent.buttonText}
            </button>
          </CardContent>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-gray-900 rounded-full p-2 hover:bg-black transition duration-200"
          >
            &times;
          </button>
        </Card>

        {/* Message Box Outside the Card (Right Side) */}
        <div className="absolute top-4 right-24 w-80 h-auto bg-black text-white p-4 rounded-lg shadow-lg">
  <p className="text-sm">dfsdfgsdg</p>
  <p className="text-sm">dfsdfgsdg</p>
  <p className="text-sm">dfsdfgsdg</p>
  <p className="text-sm">dfsdfgsdg</p>
  <p className="text-sm">dfsdfgsdg</p>
  <p className="text-sm">dfsdfgsdg</p>
</div>

      </div>
    </motion.div>
  );
};

export default AdvertisementEventCard;
