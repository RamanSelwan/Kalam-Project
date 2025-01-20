import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const PhotoCards = () => {
  const writers = [
    {
      image: "https://images.unsplash.com/photo-1598738865218-7809c17181c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ldHJ5fGVufDB8fDB8fHww",
      name: "Munshi Premchand",
      bio: "Munshi Premchand was an Indian writer famous for his modern Hindi-Urdu literature. He is known for works like 'Godaan' and 'Karmabhoomi'."
    },
    {
      image: "https://images.unsplash.com/photo-1598738865218-7809c17181c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ldHJ5fGVufDB8fDB8fHww",
      name: "William Shakespeare",
      bio: "William Shakespeare is regarded as one of the greatest writers in the English language, known for 'Hamlet', 'Romeo and Juliet', and 'Macbeth'."
    },
    {
      image: "https://images.unsplash.com/photo-1598738865218-7809c17181c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ldHJ5fGVufDB8fDB8fHww",
      name: "Charles Dickens",
      bio: "Charles Dickens was an English writer known for creating some of the world's best-known fictional characters like in 'Oliver Twist' and 'A Christmas Carol'."
    },
    {
      image: "https://images.unsplash.com/photo-1598738865218-7809c17181c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ldHJ5fGVufDB8fDB8fHww",
      name: "Rabindranath Tagore",
      bio: "Rabindranath Tagore was a Bengali polymath, who reshaped Bengali literature and music, as well as Indian art, with 'Gitanjali'."
    }
  ];

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "linear-gradient(to bottom, #C7FFD8, #98DED9)" }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold" style={{ color: "#0B2F9F" }}>
          Famous Writers and Their Works
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Discover the most influential writers from around the world
        </p>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {writers.map((writer, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative bg-white shadow-lg rounded-lg overflow-hidden mb-8 transform hover:scale-105 transition-transform duration-300"
              style={{ border: `2px solid ${"#98DED9"}` }}
            >
              <img
                src={writer.image}
                alt={writer.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6 bg-white">
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={{ color: "#0B2F9F" }}
                >
                  {writer.name}
                </h2>
                <p className="text-gray-600 mb-6">{writer.bio}</p>
                <button
                  className="px-6 py-2 rounded-lg"
                  style={{
                    backgroundColor: "#0B2F9F",
                    color: "#FFFFFF",
                    transition: "background-color 0.3s ease"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#98DED9")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#0B2F9F")}
                >
                  Learn More
                </button>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoCards;
