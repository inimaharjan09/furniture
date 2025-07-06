import React from 'react';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile.jsx';
import Order from '../order/Order.jsx';

export default function ProfilePage() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="p-5 grid grid-cols-3 gap-5">
      <UserProfile user={user} />
      <Order user={user} />
    </div>
  );
}
