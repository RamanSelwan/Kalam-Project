import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from "../../../api/apiConnect";
import toast from "react-hot-toast";
import Loader from "../../../../src/Component/Animation/Loader";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = form;
    if (!email || !password) {
      setError("Both fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await apiConnect("api/auth/login", "POST", form);
      // console.log("Login successful:", result);
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);
      toast.success("Login successful!", { duration: 3000 });

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password");

      toast.error("Login failed. Please try again.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Loader */}
        {loading && <Loader />}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center text-sm mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
