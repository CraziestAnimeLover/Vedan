import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import BackgroundImage from "../assets/tech.jpg";

function ContactUs() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background Image with animation */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-500 hover:scale-110"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full bg-white bg-opacity-60 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Reach out to us through social media.
        </p>

        {/* Social Media Icons with Animations */}
        <div className="mt-8 flex justify-center space-x-6 text-gray-800">
          <a
            href="https://www.facebook.com/profile.php?id=61571468146618"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125 hover:text-blue-600"
          >
            <Facebook size={32} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125 hover:text-blue-400"
          >
            <Twitter size={32} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125 hover:text-blue-700"
          >
            <Linkedin size={32} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125 hover:text-pink-500"
          >
            <Instagram size={32} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-125 hover:text-red-500"
          >
            <Youtube size={32} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
