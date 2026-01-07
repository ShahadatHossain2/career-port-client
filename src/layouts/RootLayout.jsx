import React from "react";
import Header from "../pages/shared/Header";
import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer";

const RootLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
