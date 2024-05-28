// Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <div className="fixed top-0 z-50 w-full bg-white">
        <Navbar />
      </div>
      <div className="pt-12">
        {" "}
        {/* Add padding top */}
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
