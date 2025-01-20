const express = require("express");
const cors = require("cors"); // Import cors
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Import the user routes
dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: "https://kalam-frontend-n1746psh0-ramanselwans-projects.vercel.app/", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Enable CORS with options

// Middleware to parse JSON bodies
app.use(express.json());

// Register routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
// Use the user routes
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
