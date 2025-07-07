import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile.jsx';
import Order from '../order/Order.jsx';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="font-poppins">
      <div className="flex flex-col items-center mt-8 p-5">
        <UserProfile user={user} />
        <Order user={user} />
      </div>
    </div>
  );
}
