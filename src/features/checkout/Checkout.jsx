// Order.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useAddOrderMutation } from '../order/orderApi';
import sofaImage from '../assets/cover.jpg';
import toast from 'react-hot-toast';
import Info from '../../components/Info';
import { clearCart } from '../cart/cartSlice';

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [addOrder] = useAddOrderMutation();

  const totalAmount = carts.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const onSubmit = async (data) => {
    try {
      await addOrder({
        token: user.token,
        body: {
          total: totalAmount,
          orderItems: carts,
          billingInfo: data,
        },
      }).unwrap();

      dispatch(clearCart());
      toast.success('Order placed successfully');
    } catch (err) {
      toast.error(err.data?.message || err.data);
    }
  };

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
            </Link>{' '}
            &gt; <span className="text-gray-600">Checkout</span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 lg:flex-row justify-center pt-10 px-5 text-gray-700"
      >
        <section className="flex flex-col gap-5 w-full lg:w-2/3 max-w-xl">
          <h1 className="font-semibold text-2xl">Billing details</h1>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  {...register('fname', { required: 'First name is required' })}
                  type="text"
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm">{errors.fname.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  {...register('lname', { required: 'Last name is required' })}
                  type="text"
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm">{errors.lname.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Country / Region</label>
              <select
                {...register('country', { required: 'Country is required' })}
                className="rounded-lg border px-2 py-2 border-gray-700 w-full"
              >
                <option value="">Select</option>
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Street Address</label>
              <input
                {...register('address', { required: 'Address is required' })}
                type="text"
                className="rounded-lg border px-2 py-2 border-gray-700 w-full"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  {...register('city', { required: 'City is required' })}
                  type="text"
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">Province</label>
                <select
                  {...register('province', {
                    required: 'Province is required',
                  })}
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                >
                  <option value="">Select</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                </select>
                {errors.province && (
                  <p className="text-red-500 text-sm">
                    {errors.province.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">ZIP Code</label>
                <input
                  {...register('zip')}
                  type="text"
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Phone must be a number',
                    },
                  })}
                  type="text"
                  className="rounded-lg border px-2 py-2 border-gray-700 w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
                type="text"
                className="rounded-lg border px-2 py-2 border-gray-700 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">
                Additional Information
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="rounded-lg border px-2 py-2 border-gray-700 w-full"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5 w-full lg:w-1/3 py-10">
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full text-left">
              <thead className="bg-yellow-50 text-gray-600 font-semibold">
                <tr>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-yellow-50/40">
                    {/* Product */}
                    <td className="py-2 px-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-1xl text-gray-500">
                        {item.qty} × Rs {item.price}
                      </p>
                    </td>

                    {/* Subtotal */}
                    <td className="py-2 px-4 text-right font-semibold text-gray-700">
                      Rs {item.qty * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="font-semibold text-sm text-center mt-4">
            Total ({carts.length} items): Rs {totalAmount}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="text-sm mt-4 py-3 px-4 border font-medium border-black rounded-lg w-full cursor-pointer hover:bg-black hover:text-white transition"
          >
            Place Order
          </button>
        </section>
      </form>

      <Info />
    </div>
  );
}
