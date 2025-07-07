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
import AdminPage from './features/admin/AdminPage';
import ProductAdd from './features/admin/ProductAdd';
import ProductEdit from './features/admin/ProductEdit';
import Product from './features/product/Product';
import Cart from './features/cart/Cart';
import UserRoute from './components/UserRoute';
import ProfilePage from './features/user/ProfilePage';
import { useSelector } from 'react-redux';
import OrderDetail from './features/order/OrderDetail';
import Checkout from './features/checkout/Checkout';

export default function App() {
  const { user } = useSelector((state) => state.userSlice);

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
          element: <Checkout />,
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
          element: <UserRoute />,
          children: [
            {
              path: 'user/profile',
              element: <ProfilePage />,
            },
          ],
        },
        {
          path: '/myorders/:id',
          element: <OrderDetail />,
        },
        {
          path: '/myorders',
          element: <Order user={user} />,
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
          path: '/about',
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
