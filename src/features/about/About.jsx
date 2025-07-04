import React from 'react';
import sofaImage from '../assets/cover.jpg';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="font-poppins">
      <div
        className="relative h-82 bg-cover bg-center flex items-center justify-center text-black"
        style={{ backgroundImage: `url(${sofaImage})` }}
      >
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <div className="text-sm mt-5">
            <Link to="/" className="hover:underline text-black">
              Home
            </Link>{' '}
            &gt; <span className="text-gray-600">About</span>
          </div>
        </div>
      </div>
      <h1 className="text-2xl text-center px-3 py-5">About Us</h1>
      <p className="text-center px-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        impedit expedita eum consectetur. Nobis adipisci est qui, aspernatur
        esse provident nihil. Odio, cum. Quasi, ullam inventore asperiores
        cumque nulla qui. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quos fuga corrupti ea omnis reiciendis quaerat, quae repudiandae
        dolorem accusamus quisquam dolorum, esse iste iusto. Fugit voluptatem
        dicta suscipit fugiat corrupti?
      </p>
    </div>
  );
}
