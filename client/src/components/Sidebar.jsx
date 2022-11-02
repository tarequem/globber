import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import UserCard from './UserCard';

const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <div
      className='border-4 border-yellow-900 bg-emerald-100 md:w-1/5 md:mx-2 p-9 h-full'
      style={{ overflow: 'auto' }}
    >
      <h3 className='flex items-center justify-center text-3xl pb-3'>
        Globbers:
      </h3>
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
  );
};

export default Sidebar;
