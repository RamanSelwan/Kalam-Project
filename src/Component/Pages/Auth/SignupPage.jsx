import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First Name is required.";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last Name is required.";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Invalid email format.";
      isValid = false;
    }

    // Phone Number validation (Assuming 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Invalid phone number.";
      isValid = false;
    }

    // Password validation (Minimum 8 characters)
    if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Log the form data in the console
      console.log({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-2 md:text-4xl font-lora">
        Ready to take a free trial?
      </h2>
      <p className="text-center text-gray-500 mb-8 md:text-lg font-opensans">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:max-w-lg w-full">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center font-lora">
          Sign up for a free account
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Row for First Name and Last Name */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={`border p-2 rounded-md w-full ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } font-opensans`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`border p-2 rounded-md w-full ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } font-opensans`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Row for Email and Phone Number */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`border p-2 rounded-md w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } font-opensans`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex-1">
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`border p-2 rounded-md w-full ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } font-opensans`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className={`border p-2 rounded-md w-full ${
                errors.password ? "border-red-500" : "border-gray-300"
              } font-opensans`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Small Register Button aligned to the left */}
          <div className="mb-4 flex justify-start">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              style={{ width: '100px' }} // Small width for the button
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
