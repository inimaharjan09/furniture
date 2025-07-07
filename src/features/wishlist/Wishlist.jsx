import React from 'react';
import { Card, Typography, Button, CardBody } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../app/mainApi';
import {
  removeFromWishlist,
  selectWishListItems,
} from '../wishlist/wishlistSlice';
import { setToCart } from '../cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(selectWishListItems);
  const { carts } = useSelector((state) => state.cartSlice);

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleAddToCart = (item) => {
    dispatch(setToCart({ ...item, qty: 1 }));
    navigate('/cart');
  };

  return (
    <div className="min-h-screen font-poppins flex flex-col items-center justify-start py-10 px-4 mt-15">
      <Typography variant="h4" className="mb-6 text-center">
        Your Wishlist
      </Typography>

      {wishlistItems.length === 0 ? (
        <Typography color="gray" className="text-center">
          Your wishlist is empty.
        </Typography>
      ) : (
        <div className="flex flex-col gap-6 items-center w-full max-w-2xl">
          {wishlistItems.map((item) => {
            const isInCart = carts.some((cart) => cart._id === item._id);
            return (
              <Card
                key={item._id}
                className="w-full flex flex-row items-center p-4"
              >
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <CardBody>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography className="text-gray-600">
                    Rs. {item.price}
                  </Typography>
                  <div className="flex gap-4 mt-3">
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveFromWishlist(item)}
                      className="text-red-500 border-red-500"
                    >
                      Remove
                    </Button>
                    {isInCart ? (
                      <Link to="/cart">
                        <Button variant="outlined" color="blue">
                          Go to Cart
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleAddToCart(item)}
                        className="border-gray-800"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
