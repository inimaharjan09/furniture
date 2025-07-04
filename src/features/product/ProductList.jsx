import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sofaImage from '../assets/cover.jpg';
import { useGetProductsQuery } from '../product/productApi';
import { baseUrl } from '../../app/mainApi';
import { FilterList, ViewModule, ViewList } from '@mui/icons-material';

export default function ProductList() {
  const nav = useNavigate();
  const { isLoading, error, data } = useGetProductsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  const totalPages = Math.ceil(data.length / productsPerPage);

  const currentProducts = data.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="font-poppins bg-white">
      <div
        className="relative h-82 bg-cover bg-center flex items-center justify-center text-black"
        style={{ backgroundImage: `url(${sofaImage})` }}
      >
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <div className="text-sm mt-5">
            <Link to="/" className="hover:underline text-black">
              Home
            </Link>
            &gt; <span className="text-gray-600">Shop</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center py-6 px-6 sm:px-10 bg-gray-100 text-sm">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1">
            <FilterList fontSize="small" /> Filter
          </button>
          <ViewModule fontSize="small" />
          <ViewList fontSize="small" />
          <span className="ml-4 text-gray-700">
            Showing {(currentPage - 1) * productsPerPage + 1}–
            {Math.min(currentPage * productsPerPage, data.length)} of{' '}
            {data.length} results
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Show</span>
          <input
            type="number"
            value={productsPerPage}
            readOnly
            className="w-12 h-8 border text-center rounded"
          />
          <span>Sort by</span>
          <select className="border h-8 px-2 rounded bg-white">
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 px-6 sm:px-10 py-10">
        {currentProducts.map(({ _id, name, price, image }) => (
          <div
            onClick={() => nav(`/products/${_id}`)}
            key={_id}
            className="text-center shadow-lg hover:shadow-2xl cursor-pointer"
          >
            <img
              src={`${baseUrl}${image}`}
              alt={name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="mt-2 text-lg font-semibold">{name}</h2>
              <p className="text-gray-600">Rs {price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 py-4">
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-black hover:text-white disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-black hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
