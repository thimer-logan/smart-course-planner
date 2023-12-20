import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-oxford_blue">
        <Nav />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
