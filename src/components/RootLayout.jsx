import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
