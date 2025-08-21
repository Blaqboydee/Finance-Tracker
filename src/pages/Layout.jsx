import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="pt-24 pb-24 px-4 md:px-48 py-6 md:pt-24">
      <Outlet />
    </div>
  );
};

export default Layout;
