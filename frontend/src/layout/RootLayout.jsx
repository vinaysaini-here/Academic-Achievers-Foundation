import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
