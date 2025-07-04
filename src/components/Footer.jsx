import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white text-sm mt-16 px-20 font-poppins">
      <div className="max-w-7xl mx-auto px-6 md:px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-5 text-gray-800">
        <div className="pt-10">
          <p>400 University Drive Suite 200</p>
          <p>Coral Gables, FL 33134 USA</p>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-5 text-gray-500">Links</h3>
          <ul className="space-y-1">
            <li className="pb-3">
              <a href="/" className="hover:text-black">
                Home
              </a>
            </li>
            <li className="pb-3">
              <a href="/products" className="hover:text-black">
                Shop
              </a>
            </li>
            <li className="pb-3">
              <a href="/about" className="hover:text-black">
                About
              </a>
            </li>
            <li className="pb-3">
              <a href="/contact" className="hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-5 text-gray-500">Help</h3>
          <ul className="space-y-1">
            <li className="pb-3">
              <a href="" className="hover:text-black">
                Payment Options
              </a>
            </li>
            <li className="pb-3">
              <a href="" className="hover:text-black">
                Returns
              </a>
            </li>
            <li className="pb-3">
              <a href="" className="hover:text-black">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold mb-2 text-gray-500">
            Newsletter
          </h3>
          <form className="flex items-center border-b border-gray-400 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-800 
              leading-tight focus:outline-none placeholder-gray-400"
              type="email"
              placeholder="Enter Your Email Address"
              label="Email"
            />
            <div>
              <button
                className="text-xs font-bold text-black hover:underline"
                type="submit"
              >
                SUBSCRIBE
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t pt-6 pb-10 text-x1 text-gray-500">
        © 2022 Meubel House. All rights reserved.
      </div>
    </footer>
  );
}
