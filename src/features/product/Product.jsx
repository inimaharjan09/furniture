import React, { useState } from 'react';
import {
  Button,
  Typography,
  IconButton,
  Rating,
} from '@material-tailwind/react';
import Checkbox from '@mui/material/Checkbox';
import { FaGripLinesVertical } from 'react-icons/fa';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';
import { useDispatch, useSelector } from 'react-redux';
import { setToCart } from '../cart/cartSlice';
import AddReview from '../user/AddReview';
import ReviewList from '../user/ReviewList';
import {
  addToWishlist,
  removeFromWishlist,
  selectWishListItems,
} from '../wishlist/wishlistSlice';

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userSlice);
  const wishlistItems = useSelector(selectWishListItems);

  const { data, isLoading, error } = useGetProductQuery(id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);

  const isWishlisted = wishlistItems.some((item) => item._id === id);

  const handleAddRemoveFromWishlist = (e) => {
    if (!user) {
      return navigate('/login');
    }

    if (e.target.checked) {
      dispatch(addToWishlist(data));
      console.log('Added to wishlist');
    } else {
      dispatch(removeFromWishlist(data));
      console.log('Removed from wishlist');
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message || 'Something went wrong'}</h1>;

  return (
    <div className="font-poppins">
      <div className="px-15 py-5 pt-20 flex flex-row items-center gap-5 bg-amber-50">
        <Link className="hover:underline" to="/">
          Home
        </Link>
        &gt;
        <span>Shop</span> <FaGripLinesVertical />
        <span>{data.name}</span>
      </div>

      <div className="pt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* Left Image Section */}
        <div className="space-y-5">
          <img
            src={`${baseUrl}${data.image}`}
            alt={data.name}
            className="w-96 h-96 object-cover rounded-xl"
          />
          <div className="flex space-x-5">
            {[...Array(4)].map((_, i) => (
              <img
                key={data._id + i}
                src={`${baseUrl}${data.image}`}
                alt="thumbnail"
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography variant="h4">{data.name}</Typography>
            <Checkbox
              checked={isWishlisted}
              onChange={handleAddRemoveFromWishlist}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: 'red' }} />}
            />
          </div>

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

          {/* Sizes */}
          <div className="flex items-center gap-2">
            <Typography>Size:</Typography>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <Button
                key={size}
                size="sm"
                variant={selectedSize === size ? 'filled' : 'outlined'}
                className={`rounded-full ${
                  selectedSize === size ? 'bg-gray-800 text-white' : ''
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                <p>{size}</p>
              </Button>
            ))}
          </div>

          {/* Color Picker */}
          <div className="flex items-center space-x-2">
            <Typography>Color:</Typography>
            {['bg-yellow-500', 'bg-black', 'bg-purple-700'].map(
              (color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 ${color} ${
                    selectedColorIndex === index
                      ? 'border-gray-900'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedColorIndex(index)}
                />
              )
            )}
          </div>

          {/* Add to Cart */}
          <ProductAddToCart
            product={data}
            selectedSize={selectedSize}
            disabled={!selectedSize}
          />
        </div>
      </div>

      {user && user?.role === 'User' && <AddReview id={data._id} />}
      <ReviewList product={data} />
    </div>
  );
}

function ProductAddToCart({ product, selectedSize, disabled }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);

  const isExistCart = carts.find((cart) => cart._id === product._id);
  const [count, setCount] = useState(isExistCart?.qty || 1);

  const handleCart = () => {
    dispatch(
      setToCart({
        name: product.name,
        image: product.image,
        price: product.price,
        qty: count,
        _id: product._id,
        size: selectedSize,
      })
    );
    navigate('/cart');
  };

  return (
    <div className="pt-5">
      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <IconButton
          disabled={count === 1}
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
          disabled={!user || user?.role === 'Admin' || disabled}
          className="bg-gray-600 hover:bg-red-600"
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
