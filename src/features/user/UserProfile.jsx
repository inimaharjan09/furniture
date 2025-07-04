import React from 'react';
import { Link } from 'react-router';
import sofaImage from '../assets/cover.jpg';

export default function UserProfile() {
  return (
    <div className="font-poppins">
      <div
        className="relative h-[328px] bg-cover bg-center flex items-center justify-center text-black"
        style={{ backgroundImage: `url(${sofaImage})` }}
      >
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <div className="text-sm mt-5">
            <Link to="/" className="hover:underline text-black">
              Home
            </Link>
            &gt; <span className="text-gray-600">My Profile</span>
          </div>
        </div>
      </div>
      <main></main>
    </div>
  );
}
