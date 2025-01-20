import React from "react";
import image from "../../../Assets/Mask Group.png";
const ResponsiveImageComponent = () => {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center items-center mt-44">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Have you ever posted any photo on social media?
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-12">Sed ut perspiciatis</h2>
            <p className="mt-2 text-gray-600">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur libero delectus totam reiciendis dolorem quod tenetur, harum, ipsam quisquam. Dolorem, ipsum ut qui quod molestias asperiores blanditiis? Sequi!.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-12">Lorem ipsum dolor</h2>
            <p className="mt-2 text-gray-600">
              Amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur animi sit .
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-12">Nemo enim ipsam</h2>
            <p className="mt-2 text-gray-600">
              Consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt. Neque porro quisquam est, qui dolorem libero delectus totam reiciendis dolorem quod tenetur, harum, ipsam quisquam. Dolorem, ipsum ut qui quod molestias asperiores blanditiis? Sequi!.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative">
          <img src={image} alt="Building" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveImageComponent;
