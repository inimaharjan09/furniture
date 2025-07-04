import React, { useState } from 'react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  DocumentChartBarIcon,
} from '@heroicons/react/24/solid';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';

// admin profile menu component
const adminMenuItems = [
  {
    label: 'Profile',
    icon: UserCircleIcon,
  },
  {
    label: 'Admin Dashboard',
    icon: DocumentChartBarIcon,
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

// user profile menu component
const userMenuItems = [
  {
    label: 'Profile',
    icon: UserCircleIcon,
  },
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

export default function ProfileMenu({ user }) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems =
    user?.role === 'Admin' ? adminMenuItems : userMenuItems;

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <FaUserCircle size={20} className="bg-white text-gray-700" />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                switch (label) {
                  case 'Sign Out':
                    dispatch(removeUser());
                    break;
                  case 'Admin Dashboard':
                    nav('/admin/dashboard');
                    break;
                  case 'Cart':
                    nav('/cart');
                    break;

                  case 'Profile':
                    nav('/user/profile');
                    break;
                }
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
