import React from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import Hero from 'src/components/Hero';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <Hero/>
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer/>
    </div>
  );
};

export default Layout;
