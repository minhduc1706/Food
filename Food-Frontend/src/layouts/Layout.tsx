import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Hero from "src/components/Hero";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children}: Props) => {
  const location = useLocation();
  const showHero = location.pathname === "/";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
