import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaRegUser, FaBars, FaTimes } from 'react-icons/fa';
import { CiSearch, CiHeart } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import { Button } from '@material-tailwind/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.userSlice);
  const { carts } = useSelector((state) => state.cartSlice);
  const nav = useNavigate();

  return (
    <div className="px-6 py-4 shadow-md w-full bg-white fixed z-50 top-0">
      <div className="flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Rocket</Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-6 text-gray-900 text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/products" className="hover:underline">
            Shop
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <NavLink to="/login">
              <Button className="bg-white text-gray-700 rounded-b-none cursor-pointer p-1">
                <FaRegUser size={19} />
              </Button>
            </NavLink>
          )}
          <Link to="/search">
            <CiSearch size={24} />
          </Link>
          <Link to="/wishlist">
            <CiHeart size={26} />
          </Link>

          {user && (
            <Link to="/cart" className="relative hover:text-red-500 transition">
              <IoCartOutline size={28} />
              {carts.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {carts.length}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-gray-700 text-lg">
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </div>
  );
}
