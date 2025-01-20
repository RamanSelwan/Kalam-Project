import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debug log to check if the token is retrieved correctly

    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Display a toast message indicating that the logout was successful
    toast.success('Logout successful!');

    // Navigate to the home page after a short delay to allow the toast to be visible
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div>
      <Toaster />
     
    </div>
  );
};

export default Logout;