import React, { useEffect, useState } from "react";
import { apiConnect } from "../../../api/apiConnect";

const MiddleComponent = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      try {
        // Fetching posts from the database
        const postsResult = await apiConnect("api/posts", "GET");

        // Sorting posts based on the number of likes (descending order)
        const sortedPosts = postsResult.sort((a, b) => b.likes.length - a.likes.length);

        // Selecting the top 9 posts
        const topPosts = sortedPosts.slice(0, 9);

        // Updating state with the top posts
        setTopPosts(topPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);

        // Setting an error message if the fetch operation fails
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchPostsAndUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C7FFD8] via-[#98DED9] to-[#0B2F9F] flex flex-col items-center w-full px-4 py-12">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-[#0B2F9F] text-center mb-8">
        Top Weekly Writers List
      </h1>

      {/* Posts Grid Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* Error Message */}
        {error && (
          <div className="col-span-full text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        {/* Fallback for No Posts */}
        {topPosts.length === 0 && !error ? (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No posts available.
          </div>
        ) : (
          // Render Top Posts
          topPosts.map((post) => (
            <div
              key={post._id}
              className="bg-[#C7FFD8] p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              <p
                className="text-lg font-medium text-gray-800 text-center mb-4"
                style={{ whiteSpace: "pre-wrap" }} // Ensures spaces and formatting are preserved
              >
                {post.content}
              </p>
              <div className="text-sm text-gray-600 text-center">
                <p>
                  Author:{" "}
                  <span className="font-semibold text-[#0B2F9F]">
                    {post.user?.username || "Unknown"}
                  </span>
                </p>
                <p>Likes: {post.likes.length}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MiddleComponent;
