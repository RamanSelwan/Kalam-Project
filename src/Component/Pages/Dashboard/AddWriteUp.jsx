import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnect } from '../../../api/apiConnect'; // Import apiConnect
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

const AddWriteUp = () => {
  // State for write-up input and category selection
  const [writeUp, setWriteUp] = useState("");
  const [category, setCategory] = useState("Sher");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [postedUser, setPostedUser] = useState(null); // State to store posted user information
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const postData = {
      content: writeUp,
      type: category,
    };

    try {
      const result = await apiConnect('api/posts', 'POST', postData);
      console.log('Post created successfully:', result);
      toast.success('Post created successfully!');
      setPostedUser(result.post.user); // Set the posted user information
      setLoading(false);
      navigate('/dashboard'); // Redirect to the dashboard after successful submission
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
      toast.error('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <Toaster />
      <h2 className="text-xl font-bold mb-4 text-blue-600">Add Your Write Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="writeUp"
              className="block text-gray-700 font-medium mb-2"
            >
              Write Up
            </label>
            <textarea
              id="writeUp"
              value={writeUp}
              onChange={(e) => setWriteUp(e.target.value)}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="Sher">Sher</option>
              <option value="Shayari">Shayari</option>
              <option value="Poetry">Poetry</option>
              <option value="Quote">Quote</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
     
    </div>
  );
};

export default AddWriteUp;