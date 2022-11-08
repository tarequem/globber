import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import UserCard from './UserCard';
import { ChatState } from '../context/ChatProvider';

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const {
    selectedUser: { username },
  } = ChatState();
  return (
    <>
      <div className='text-center m-auto'>
        {username !== undefined && (
          <span className='text-xl font-medium text-gray-900 dark:text-white'>
            Selected Gobbler : {username}
          </span>
        )}

        <button
          className='text-white  bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-900  hover:scale-110 duration-300 focus:ring-4 font-medium rounded-lg text-sm px-2 py-2.5 m-2 mb-2  focus:outline-none border-4 border-white'
          type='button'
          data-drawer-target='drawer'
          data-drawer-show='drawer'
          data-drawer-placement='right'
          aria-controls='drawer'
        >
          Click to select the Globbers
        </button>
      </div>
      <div
        id='drawer'
        className='fixed z-40 h-screen p-4 overflow-y-auto bg-emerald-100 w-80 dark:bg-yellow-800'
        tabIndex='-1'
        aria-labelledby='drawer-right-label'
      >
        <h5
          id='drawer-right-label'
          className=' inline-flex items-center mb-4 text-2xl font-semibold text-gray-500 dark:text-gray-400'
        >
          <svg
            className='w-5 h-5 mr-2'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clipRule='evenodd'
            ></path>
          </svg>
          Globbers:
        </h5>
        <button
          type='button'
          data-drawer-dismiss='drawer'
          aria-controls='drawer'
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>
        <>
          {error ? (
            <div
              className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
              role='alert'
            >
              <span className='font-medium'>Error!</span> {error.message}
            </div>
          ) : (
            <ul className='flex flex-wrap '>
              {loading && <h1 className='text-2xl'>Loading Users....</h1>}

              {data !== undefined &&
                data.users.map((user) => {
                  return <UserCard key={user._id} item={user} />;
                })}
            </ul>
          )}
        </>
      </div>
    </>
  );
};

export default Sidebar;
