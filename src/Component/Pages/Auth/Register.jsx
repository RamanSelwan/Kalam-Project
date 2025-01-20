import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../../api/apiConnect";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const { username, email, password } = form;
    if (!username || !email || !password) {
      toast.error("All fields are required.", { duration: 3000 });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.", { duration: 3000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Fetching all users to compare email
      const users = await apiConnect("api/users", "GET");
      
      // Check if the email already exists in the list of users
      const userExists = users.some((user) => user.email === form.email);
      
      if (userExists) {
        toast.error("User already exists. Please log in.", { duration: 3000 });
        setLoading(false);
        return;
      }

      // Register the new user if the email doesn't exist
      const result = await apiConnect("api/auth/register", "POST", form);
      console.log("Registration successful:", result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);
      toast.success("Registration successful! Please log in.", { duration: 3000 });
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h2>
        {loading && (
          <div className="text-center text-blue-500 font-medium mb-4">
            Processing...
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
