import React, { useState } from 'react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeAdmin } from '../features/admin/adminSlice';

// admin profile menu component
const profileMenuItems = [
  {
    label: 'Profile',
    icon: UserCircleIcon,
  },

  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

export default function ProfileMenu() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { admin } = useSelector((state) => state.adminSlice);
  console.log(admin);

  const initialLetter = admin.fullName
    ? admin.fullName.charAt(0).toUpperCase()
    : '!';

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <div className='avatar avatar-placeholder'>
            <div className='bg-neutral text-neutral-content w-9 rounded-full'>
              <span className='text-lg'>{initialLetter}</span>
            </div>
          </div>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='bg-base-100 rounded-box border border-gray-700 z-50 w-45 shadow'>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                switch (label) {
                  case 'Sign Out':
                    dispatch(removeAdmin());
                    nav('/login');
                    break;

                  case 'Profile':
                    nav('/admin/profile');
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
                as='span'
                variant='small'
                className='font-normal'
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
