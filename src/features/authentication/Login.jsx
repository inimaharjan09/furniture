import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Input,
  Button,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUserLoginMutation } from './authApi';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../user/userSlice';
import sofaImage from '../assets/cover.jpg';

export default function Login() {
  const nav = useNavigate();
  const [userLogin] = useUserLoginMutation();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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
            &gt; <span className="text-gray-600">My Account</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (value) => {
              try {
                const response = await userLogin(value).unwrap();
                dispatch(setUser(response));
                toast.success('Login Successful');
                nav(-1);
              } catch (err) {
                toast.error(err.data?.message || err.data);
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  onChange={handleChange}
                  value={values.email}
                  label="Email"
                  name="email"
                />

                <div className="relative flex w-full">
                  <Input
                    onChange={handleChange}
                    value={values.password}
                    type={show ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    className="pr-20"
                    containerProps={{ className: 'min-w-0' }}
                  />
                  <IconButton
                    onClick={() => setShow(!show)}
                    variant="text"
                    size="sm"
                    className="!absolute right-1 top-1 rounded"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </IconButton>
                </div>

                <div className="flex justify-center">
                  <Button size="sm" type="submit" className="bg-gray-500 w-1/2">
                    Login
                  </Button>
                </div>

                <div className="text-center text-sm text-blue-gray-500">
                  <a href="#" className="hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </form>
            )}
          </Formik>

          <Typography className="text-center text-sm mt-4">
            Don’t have an account?
            <Button
              onClick={() => nav('/register')}
              className="text-gray-500 font-medium hover:bg-gray-50 hover:underline px-2"
              variant="text"
            >
              Sign up
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
}
