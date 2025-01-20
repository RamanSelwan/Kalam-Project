import React from "react";
import Logo from "../../Assets/Logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">
        <div>
          <div className="flex text-center items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-10 w-auto mb-4" />
            <span className="text-lg font-bold text-blue-600">Kalam</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering creativity and collaboration. Join our community and explore endless possibilities with our app.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <Link to="/features" className="text-gray-400 hover:text-white">
                Features
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/live-share" className="text-gray-400 hover:text-white">
                Live Share
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/video-record" className="text-gray-400 hover:text-white">
                Video Record
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Community</h3>
          <ul>
            <li className="mb-2">
              <Link to="/featured-artists" className="text-gray-400 hover:text-white">
                Featured Artists
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/the-portal" className="text-gray-400 hover:text-white">
                The Portal
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/live-events" className="text-gray-400 hover:text-white">
                Live Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Subscribe</h3>
          <p className="text-gray-400 text-sm mb-4">
            Stay updated with our latest news and offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md text-gray-800 focus:outline-none w-full"
            />
            <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-8"></div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12">
        <p className="text-gray-400 text-sm text-center md:text-left">
          © 2025 Your Company. All Rights Reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/facebook" aria-label="Facebook">
            <FaFacebook className="text-gray-400 hover:text-blue-500 text-xl" />
          </Link>
          <Link to="/twitter" aria-label="Twitter">
            <FaTwitter className="text-gray-400 hover:text-blue-300 text-xl" />
          </Link>
          <Link to="/linkedin" aria-label="LinkedIn">
            <FaLinkedin className="text-gray-400 hover:text-blue-700 text-xl" />
          </Link>
          <Link to="/instagram" aria-label="Instagram">
            <FaInstagram className="text-gray-400 hover:text-pink-500 text-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
