import React, { useState, useEffect } from "react";

const EbookComponent = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBSkIvOHitNvaE4vcePTMOTCWvXvyg3Ku0"
        );
        const data = await response.json();
        setBooks(data.items || []); // Check if items exist before setting state
      } catch (error) {
        console.error("Error fetching the books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleReadMore = (previewLink) => {
    window.open(previewLink, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">
        eBook Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const { volumeInfo } = book;
          const {
            title,
            authors,
            publisher,
            publishedDate,

            imageLinks,
            previewLink,
          } = volumeInfo;
          return (
            <div
              key={book.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col transition-transform duration-300 transform hover:scale-105 hover:bg-gray-100"
              style={{
                height: "450px", 
                maxHeight: "450px",
                overflow: "hidden", 
              }}
            >
              <img
                src={imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                alt={title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">
                  {title}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Author(s):</strong> {authors?.join(", ") || "Unknown"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Publisher:</strong> {publisher || "Not Available"}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Published Date:</strong> {publishedDate || "N/A"}
                </p>
              </div>
              <button
                onClick={() => handleReadMore(previewLink)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-auto transition-colors"
              >
                Read More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EbookComponent;
