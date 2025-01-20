import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Header from "./Component/Pages/LandingPage/Header";
import MiddleComponent from "./Component/Pages/LandingPage/MiddleComponent";

import PhotoCards from "./Component/Pages/LandingPage/PhotoCards";
import Register from "./Component/Pages/Auth/Register";
import Login from "./Component/Pages/Auth/Login";
import Dashboard from "./Component/Pages/Dashboard/Dashboard";
import { Toaster } from "react-hot-toast";
import EbookComponent from "./Component/NavbarLinks/EbookComponent";
import Sher from "./Component/NavbarLinks/Sher";
import Poetry from "./Component/NavbarLinks/Poetry";
import Quote from "./Component/NavbarLinks/Quote";
import Shayari from "./Component/NavbarLinks/Shayari";
import Navbar from "./Component/Layout/Navbar";
import ProtectedRoute from "./Component/Pages/Auth/ProtectedRoute"; // Import the PrivateRoute component

function App() {
  return (
    <div className="font-display">
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Header />
              <MiddleComponent />
              {/* <ResponsiveImageComponent /> */}
              <PhotoCards />
            </Layout>
          }
        />
        <Route path="/ebooks" element={<EbookComponent />} />
        <Route
          path="/shayari"
          element={
            <ProtectedRoute>
              <Shayari />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sher"
          element={
            <ProtectedRoute>
              <Sher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/poetry"
          element={
            <ProtectedRoute>
              <Poetry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quote"
          element={
            <ProtectedRoute>
              <Quote />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/add-your-writeup"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/see-your-all-posts"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard/logout"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
