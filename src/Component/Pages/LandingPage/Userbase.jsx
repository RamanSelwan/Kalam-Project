import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Userbase = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold">
          Our user base is growing every day
        </h1>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Users */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          {startCount && <CountUp start={0} end={40} duration={2.75} className="text-4xl font-bold" />}K
          <p className="text-gray-600 mt-2">Users</p>
        </div>

        {/* Articles Generated */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          {startCount && <CountUp start={0} end={1000} duration={2.75} className="text-4xl font-bold" />}K
          <p className="text-gray-600 mt-2">Articles Generated</p>
        </div>

        {/* Article Headlines Generated */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          {startCount && <CountUp start={0} end={2000} duration={2.75} className="text-4xl font-bold" />}K
          <p className="text-gray-600 mt-2">Article Headlines Generated</p>
        </div>
      </div>
    </div>
  );
};

export default Userbase;
