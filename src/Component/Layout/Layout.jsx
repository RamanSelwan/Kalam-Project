import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="content">
        {children} 
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
