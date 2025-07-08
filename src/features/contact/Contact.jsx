import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdLocationOn, MdPhone, MdAccessTime } from 'react-icons/md'; // React Icons
import sofaImage from '../assets/cover.jpg';
import Info from '../../components/Info';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            &gt; <span className="text-gray-600">Contact</span>
          </div>
        </div>
      </div>

      <main className="flex flex-col gap-20 pt-10 pb-10 text-gray-700">
        <section className="flex flex-col gap-2 items-center">
          <h1 className="font-semibold text-2xl">Get In Touch With Us</h1>
          <p className="text-[#9F9F9F] text-center px-5 md:w-1/2 lg:w-1/2">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Will Always Be There To Help You Out.
            Do Not Hesitate!
          </p>
        </section>

        <section className="flex justify-evenly flex-col-reverse gap-10 lg:gap-0 md:flex-row lg:flex-row px-5">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-start">
              <MdLocationOn className="w-5 h-5 text-black" />
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">Address</h1>
                <p className="text-[10px] w-40">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <MdPhone className="w-5 h-5 text-black" />
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">Phone</h1>
                <p className="text-[10px]">Mobile: (+84) 546-6789</p>
                <p className="text-[10px]">Hotline: (+84) 456-6789</p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <MdAccessTime className="w-5 h-5 text-black" />
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">Working Time</h1>
                <p className="text-[10px]">Monday-Friday: 9:00-22:00</p>
                <p className="text-[10px]">Saturday-Sunday: 9:00-21:00</p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <div className="flex flex-col gap-1">
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  placeholder="Abc"
                  className="rounded-lg lg:w-96 placeholder:text-[10px] border px-2 py-2 border-gray-700 focus:outline"
                />
                {errors.name && (
                  <p className="text-[10px] text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="flex flex-col gap-1">
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  className="rounded-lg placeholder:text-[10px] border px-2 py-2 border-gray-700 focus:outline"
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                {...register('subject')}
                type="text"
                id="subject"
                placeholder="This is optional"
                className="rounded-lg placeholder:text-[10px] border px-2 py-2 border-gray-700 focus:outline"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <div className="flex flex-col gap-1">
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  placeholder="Hi, I'd like to ask about..."
                  className="rounded-lg placeholder:text-[10px] border px-2 py-2 border-gray-700 focus:outline"
                ></textarea>
                {errors.message && (
                  <p className="text-[10px] text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="text-sm py-2 bg-black text-white hover:bg-gray-800 transition rounded-lg w-40"
            >
              Submit
            </button>
          </form>
        </section>
      </main>
      <Info />
    </div>
  );
}
