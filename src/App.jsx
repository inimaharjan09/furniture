import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import HomePage from './features/home/HomePage';
import RootLayout from './components/RootLayout';
import Contact from './features/contact/Contact';
import ProductList from './features/product/ProductList';
import Order from './features/order/Order';
import About from './features/about/About';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import UserProfile from './features/user/UserProfile';
import AdminPage from './features/admin/AdminPage';
import ProductAdd from './features/admin/ProductAdd';
import ProductEdit from './features/admin/ProductEdit';
import Product from './features/product/Product';
import Cart from './features/cart/Cart';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/user/profile',
          element: <UserProfile />,
        },

        {
          path: '/products',
          element: <ProductList />,
        },
        {
          path: '/products/:id',
          element: <Product />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/checkout',
          element: <Order />,
        },
        {
          path: '/admin/dashboard',
          element: <AdminPage />,
        },
        {
          path: 'admin/product/add',
          element: <ProductAdd />,
        },

        {
          path: 'admin/product/edit/:id',
          element: <ProductEdit />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: '/order',
          element: <Order />,
        },
        {
          path: '/about',
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
