// Cart.jsx
import React from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { baseUrl } from '../../app/mainApi';
import sofaImage from '../assets/cover.jpg';
import toast from 'react-hot-toast';
import { removeFromCart, setToCart } from './cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);

  const total = carts.reduce((a, b) => a + b.price * b.qty, 0);

  const handleCheckout = () => {
    if (!user) return toast.error('Please log in first');
    if (carts.length === 0) return toast.error('Cart is empty');
    navigate('/checkout');
  };

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
            &gt;
            <span className="text-gray-600"> Cart</span>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-poppins border-none">
        <Card className="col-span-2">
          <CardBody>
            <table className="min-w-full table-auto">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="p-4">Items</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {carts.map((product) => (
                  <tr key={product._id} className="bg-white border-b">
                    <td className="p-4">
                      <img
                        src={`${baseUrl}${product.image}`}
                        alt={product.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">Rs {product.price}</td>
                    <td className="p-4">
                      <UpdateToCart product={product} />
                    </td>
                    <td className="p-4">Rs {product.price * product.qty}</td>
                    <td className="p-4">
                      <IconButton
                        onClick={() => dispatch(removeFromCart(product._id))}
                        variant="text"
                        color="red"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card className="bg-yellow-100 p-6 h-fit">
          <Typography variant="h4" className="mb-6 text-center">
            Total Cart
          </Typography>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Button
              onClick={handleCheckout}
              className="bg-white border border-gray-00 text-black hover:bg-gray-500"
              disabled={carts.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function UpdateToCart({ product }) {
  const dispatch = useDispatch();

  const handleCart = (isAdd) => {
    const newQty = isAdd ? product.qty + 1 : product.qty - 1;
    if (newQty < 1) return;
    dispatch(setToCart({ ...product, qty: newQty }));
  };

  return (
    <div className="flex items-center gap-2">
      <IconButton
        disabled={product.qty === 1}
        onClick={() => handleCart(false)}
        size="sm"
        className="bg-gray-300"
      >
        <i className="fas fa-minus"></i>
      </IconButton>
      <span className="text-lg font-semibold">{product.qty}</span>
      <IconButton
        onClick={() => handleCart(true)}
        size="sm"
        className="bg-gray-300"
      >
        <i className="fas fa-plus"></i>
      </IconButton>
    </div>
  );
}
