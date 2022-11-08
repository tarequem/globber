import React from 'react';
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';
import { Route, Routes } from 'react-router-dom';
import Auth from '../utils/auth';
import Chat from '../components/Chat';
import Notification from '../components/Notification';
import ChatProvider from '../context/ChatProvider';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/:id/:username/:email' element={<Chat />} />
    </Routes>
  );
};

const HomeScreen = () => {
  const {
    data: { username, email },
  } = Auth.getProfile();

  return (
    <ChatProvider>
      <div className='bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300  p-2'>
        <div className='flex flex-wrap w-full justify-between mb-3'>
          <a href='/'>
            <p
              className='text-5xl text-left text-yellow-900 py-2'
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              Globber 🦃
            </p>
          </a>

          <div className='flex items-center md:order-2 pr-8'>
            <span>
              <Notification />
            </span>
            <button
              type='button'
              className='flex mr-3 text-3xl bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
              id='user-menu-button'
              aria-expanded='false'
              data-dropdown-toggle='user-dropdown'
              data-dropdown-placement='bottom'
            >
              <span className='sr-only'>Open user menu</span>
              <img
                className='w-10 h-10 rounded-full'
                src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
                alt='user photo'
              />
            </button>

            <div
              className='hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
              id='user-dropdown'
            >
              <div className='py-3 px-4'>
                <span className='block text-sm text-gray-900 dark:text-white'>
                  {username}
                </span>
                <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                  {email}
                </span>
              </div>
              <ul className='py-1' aria-labelledby='user-menu-button'>
                <li>
                  <a
                    onClick={Auth.logout}
                    style={{ cursor: 'pointer' }}
                    className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-row h-screen'>
          <AllRoutes />
          <Sidebar />
        </div>
      </div>
    </ChatProvider>
  );
};

export default HomeScreen;
