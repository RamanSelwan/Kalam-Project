import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "./AuthContext";
import Logo from "../../Assets/Logo.png";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext); // Access context directly
  // console.log("Navbar Login State:", isLoggedIn); // This should reflect the correct value
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
// console.log("After login Navbar re-render")
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Sher", path: "/sher" },
    { name: "Shayari", path: "/shayari" },
    { name: "Poetry", path: "/poetry" },
    { name: "Quotes", path: "/quote" },
    { name: "E-Books", path: "/ebooks" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#C7FFD8] via-[#98DED9] to-[#0B2F9F] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
          <span className="text-xl text-black font-extrabold tracking-wide">
            Kalam
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center lg:space-x-6 space-x-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-xl hover:text-black transition duration-200"
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="bg-[#98DED9] text-black px-5 py-2 rounded-lg shadow-md hover:bg-[#C7FFD8] transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-400 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-[#C7FFD8] text-black text-center px-5 py-2 rounded-lg shadow-md hover:bg-[#98DED9] transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-[#98DED9] text-black px-5 py-2 rounded-lg shadow-md hover:bg-[#C7FFD8] transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="text-3xl md:hidden focus:outline-none hover:text-[#0B2F9F]"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#C7FFD8] via-[#98DED9] to-[#0B2F9F] text-white">
          <div className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block text-lg hover:text-[#0B2F9F] transition"
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="block bg-[#98DED9] text-black px-4 py-2 rounded-lg shadow-md hover:bg-[#C7FFD8] transition"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block w-full bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-300 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block bg-[#C7FFD8] text-black px-4 py-2 rounded-lg shadow-md hover:bg-[#98DED9] transition"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block bg-[#98DED9] text-black px-4 py-2 rounded-lg shadow-md hover:bg-[#C7FFD8] transition"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
