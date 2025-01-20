import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyProfile from './Profile'; // Import MyProfile component
import AddWriteUp from './AddWriteUp'; // Import AddWriteUp component
import Logout from './Logout'; // Import Logout component
import YourAllPost from './YourAllPost'; // Import YourAllPost component  

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'MyProfile':
        return <MyProfile />;
      case 'AddWriteUp':
        return <AddWriteUp />;
      case 'Logout':
        return <Logout />;
      case 'YourAllPost':
        return <YourAllPost />;
      default:
        return <div><MyProfile /></div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="w-full md:w-1/4 bg-white shadow-lg p-4 mb-4 md:mb-0">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link
              to="/dashboard/my-profile"
              onClick={() => setSelectedComponent('MyProfile')}
              className="text-gray-700 hover:text-blue-500"
            >
              My Profile
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/add-your-writeup"
              onClick={() => setSelectedComponent('AddWriteUp')}
              className="text-gray-700 hover:text-blue-500"
            >
              Add Your Write Up
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/dashboard/see-your-all-posts"
              onClick={() => setSelectedComponent('YourAllPost')}
              className="text-gray-700 hover:text-blue-500"
            >
              See Your All Posts
            </Link>
          </li>
          {/* <li className="mb-4">
            <Link
              to="/dashboard/logout"
              onClick={() => setSelectedComponent('Logout')}
              className="text-gray-700 hover:text-blue-500"
            >
              Logout
            </Link>
          </li> */}
        </ul>
      </div>
      {/* Content */}
      <div className="w-full md:w-3/4 p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
