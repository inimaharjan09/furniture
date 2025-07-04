import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/singlechair.png';
import img1 from '../assets/chair.png';
import img2 from '../assets/chair.png';
import img4 from '../assets/singlechair.png';
import { useGetProductsQuery } from '../product/productApi';
import { baseUrl } from '../../app/mainApi';

export default function HomePage() {
  const { isLoading, error, data } = useGetProductsQuery();
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  console.log(data);
  return (
    <div className="font-poppins text-gray-900">
      {/* Hero Section */}
      <section className="pt-28 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-10 bg-yellow-200 w-full min-h-[600px] px-6 md:px-20">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-medium pb-6">
            Rocket Single Seater
          </h1>
          <Link to="/products">
            <p className="font-medium text-xl underline">Shop Now</p>
          </Link>
        </div>
        <img
          className="w-full max-w-xs sm:max-w-sm md:w-1/2 object-contain"
          src={image}
          alt="Rocket Single Seater"
        />
      </section>

      {/* Product Section */}
      <section className="flex flex-col md:flex-row justify-evenly pt-14 pb-20 bg-[#d8b8b8] gap-10 md:gap-0">
        <div className="flex flex-col gap-4 items-center">
          <img
            className="w-full max-w-sm object-cover"
            src={img1}
            alt="Side Table"
          />
          <div className="text-center">
            <h1 className="text-xl font-medium">Side Table</h1>
            <Link to="/products">
              <p className="font-medium underline">View More</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <img
            className="w-full max-w-sm object-cover"
            src={img2}
            alt="Side Seater"
          />
          <div className="text-center">
            <h1 className="text-xl font-medium">Side Table</h1>
            <Link to="/products">
              <p className="font-medium underline">View More</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="flex flex-col gap-10 py-14 px-6 md:px-20">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Top Picks For You</h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-2">
            Find a bright ideal to suit your taste with our great selection of
            suspension, floor and table lights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data &&
            data.slice(0, 4).map(({ _id, name, price, image }) => (
              <div
                key={_id}
                className="overflow-hidden hover:shadow-lg bg-white"
              >
                <img
                  src={`${baseUrl}/${image}`}
                  alt=""
                  className="h-52 w-full object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-gray-500 font-semibold">{name}</p>
                  <p className="font-medium text-sm">Rs {price}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <Link to="/products" className="font-medium underline text-center">
            View More
          </Link>
        </div>
      </section>

      {/* New Arrival Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-yellow-100 py-16 px-6 md:px-20 gap-10">
        <img
          src={img4}
          alt="Asgaard Sofa"
          className="w-full max-w-xl object-contain"
        />
        <div className="flex flex-col items-center md:items-start gap-6 text-center md:text-left">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-900">
              New Arrivals
            </p>
            <h1 className="text-4xl text-gray-900 font-bold mt-2">
              Asgaard Sofa
            </h1>
          </div>
          <Link to="/product">
            <button className="text-gray-900 border border-gray-900 rounded-none px-6 py-2 text-sm">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="flex flex-col items-center gap-2 py-36 bg-[#f5eaea]">
        <h1 className="text-4xl font-bold">Our Instagram</h1>
        <p className="text-sm">Follow our store on Instagram</p>
        <Link to="/">
          <button className="rounded-xl py-2 px-14 bg-[#FAF4F4] text-sm shadow-gray-300 shadow-lg">
            Follow Us
          </button>
        </Link>
      </section>
    </div>
  );
}
