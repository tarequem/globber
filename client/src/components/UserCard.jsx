import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';

const UserCard = ({ item: { _id, username, email, url } }) => {
  const navigate = useNavigate();
  const { selectedUser, setSelectedUser } = ChatState();
  return (
    <li
      className='w-full  usercard'
      key={_id}
      onClick={() => {
        setSelectedUser({ id: _id, username: username, email: email });
        navigate(`/${_id}/${username}/${email}`);
      }}
      style={{ background: selectedUser.id === _id ? 'white' : '' }}
    >
      <div className='flex items-center space-x-4'>
        {url ? (
          <img className='w-10 h-10 rounded-full' src={url} alt='user photo' />
        ) : (
          <img
            className='w-10 h-10 rounded-full'
            src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
            alt='user photo'
          />
        )}
        <div className='text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
          <div>{username}</div>
        </div>
      </div>
    </li>
  );
};

export default UserCard;
