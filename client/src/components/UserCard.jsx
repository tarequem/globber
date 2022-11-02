import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ item: { _id, username, email } }) => {
  const navigate = useNavigate();
  return (
    <li
      className='w-full  usercard'
      key={_id}
      onClick={() => navigate(`/${_id}/${username}/${email}`)}
    >
      <div className='flex items-center space-x-4'>
        <img
          className='w-8 h-8 rounded-full shadow-xl'
          src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
          alt=''
        />
        <div className='text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
          <div>{username}</div>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
