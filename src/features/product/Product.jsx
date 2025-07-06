import React, { useState } from 'react';
import {
  Button,
  Typography,
  IconButton,
  Rating,
} from '@material-tailwind/react';
import { FaGripLinesVertical, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';

import { useNavigate, useParams } from 'react-router';
import { useGetProductQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';
import { useDispatch, useSelector } from 'react-redux';
import { setToCart } from '../cart/cartSlice';
import AddReview from '../user/AddReview';
import ReviewList from '../user/ReviewList';

export default function Product() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.userSlice);

  const { data, isLoading, error } = useGetProductQuery(id);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState('gold');
  const handleWishlist = () => {};

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="font-poppins">
      <div className="px-15 py-5 pt-20 flex flex-row items-center gap-5 bg-amber-50">
        <a className="hover:underline" href="/">
          Home
        </a>
        &gt;
        <span>Shop</span> <FaGripLinesVertical />
        <span>{data.name}</span>
      </div>
      <div className="pt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* Left Image Section */}
        <div className="space-y-5">
          <img
            src={`${baseUrl}${data.image}`}
            alt=""
            className="w-96 h-96 object-cover rounded-xl"
          />
          <div className="flex space-x-5">
            {[...Array(4)].map((_, i) => (
              <img
                key={data._id + i}
                src={`${baseUrl}${data.image}`}
                alt=""
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="space-y-4">
          <Typography variant="h4">
            {data.name}
            <Button variant="text" onClick={handleWishlist}>
              <FaHeart className="text-red-500" />
            </Button>
          </Typography>
          <Typography variant="h6" className="text-gray-500">
            Rs. {data.price}
          </Typography>

          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">
              <Rating readonly value={data.rating} />
            </span>
          </div>

          <Typography className="text-sm text-gray-700">
            {data.description}
          </Typography>

          {/* Size */}
          <div className="flex items-center gap-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <Button
                key={size}
                size="sm"
                variant="outlined"
                className="rounded-full"
              >
                {size}
              </Button>
            ))}
          </div>

          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            {['bg-yellow-500', 'bg-black', 'bg-purple-700'].map(
              (color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 ${color} ${
                    selectedColor === color
                      ? 'border-gray-900'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedColor(color)}
                />
              )
            )}
          </div>
          <div>
            <ProductAddToCart product={data} />
          </div>
        </div>
      </div>
      {user && user?.role === 'User' && <AddReview id={data._id} />}
      <ReviewList product={data} />
    </div>
  );
}
function ProductAddToCart({ product }) {
  const nav = useNavigate();
  const { carts } = useSelector((state) => state.cartSlice);
  const isExistCart = carts.find((cart) => cart._id === product._id);

  const [count, setCount] = useState(isExistCart?.qty || 1);
  const { user } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      setToCart({
        name: product.name,
        image: product.image,
        price: product.price,
        qty: count,
        _id: product._id,
      })
    );
    nav('/cart');
  };

  return (
    <div className="pt-5">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <IconButton
          disabled={count === 0}
          onClick={() => setCount((prev) => prev - 1)}
          size="sm"
          className="bg-gray-300"
        >
          <i className="fas fa-minus"></i>
        </IconButton>
        <span className="text-lg font-semibold">{count}</span>
        <IconButton
          onClick={() => setCount((prev) => prev + 1)}
          size="sm"
          className="bg-gray-300"
        >
          <i className="fas fa-plus"></i>
        </IconButton>
      </div>
      <br />
      <div className="flex flex-row">
        <Button
          onClick={handleCart}
          disabled={!user || user?.role === 'Admin'}
          className="bg-gray-600 hover:bg-red-600"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
