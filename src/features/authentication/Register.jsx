import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';
import { Formik } from 'formik';
import { useUserSignUpMutation } from './authApi';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import sofaImage from '../assets/cover.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const nav = useNavigate();
  const [userSignUp] = useUserSignUpMutation();
  const [show, setShow] = useState(false);

  return (
    <div className="font-poppins">
      {/* Header/Banner */}
      <div
        className="relative h-[328px] bg-cover bg-center flex items-center justify-center text-black"
        style={{ backgroundImage: `url(${sofaImage})` }}
      >
        <div className="text-center pt-8">
          <h1 className="text-4xl font-bold">Shop</h1>
          <div className="text-sm mt-5">
            <Link to="/" className="hover:underline text-black">
              Home
            </Link>
            &gt; <span className="text-gray-600">My Account</span>
          </div>
        </div>
      </div>

      {/* Register Form */}
      <div className=" flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

          <Formik
            initialValues={{ username: '', email: '', password: '' }}
            onSubmit={async (value) => {
              try {
                await userSignUp(value).unwrap();
                toast.success('Successfully registered');
                nav('/login');
              } catch (err) {
                toast.error(err.data?.message || err.data);
              }
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  onChange={handleChange}
                  value={values.username}
                  label="Username"
                  name="username"
                />
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
                    Sign Up
                  </Button>
                </div>
              </form>
            )}
          </Formik>

          {/* Already have account */}
          <Typography className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Button
              onClick={() => nav('/login')}
              className="text-blue-500 font-medium hover:bg-gray-50 hover:underline px-2"
              variant="text"
            >
              Login
            </Button>
          </Typography>
        </div>
      </div>
    </div>
  );
}
