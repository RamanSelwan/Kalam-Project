const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;
    console.log(req.body);

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields.",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up to continue.",
      });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!isMatch) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    // Send success response with token and userId
    res.status(200).json({
      success: true,
      message: "Login successful!",
      token, // Send the generated token in the response
      userId: user._id, // Send the userId in the response
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    user = new User({ username, email, password });
    console.log(req.body);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Generate JWT Token
    const token = generateToken(user._id);

    // Send success response with token and userId
    res.status(201).json({
      success: true,
      message: "Registration successful!",
      token, // Send the generated token in the response
      userId: user._id,
      // Send the userId in the response
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.logoutUser = (req, res) => {
  try {
    // Invalidate the token or instruct the client to remove it
    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
