import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="pt-24 pb-24 px-4 md:px-6 py-6 md:py-8">
      <Outlet />
    </div>
  );
};

export default Layout;
