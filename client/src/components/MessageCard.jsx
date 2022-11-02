import React from 'react';

const MessageCard = ({ item: { username, globText, createdAt } }) => {
  return (
    <li
      id='toast-notification'
      className='mb-5 p-4 w-full max-w-xs text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300'
      role='alert'
    >
      <div className='flex items-center'>
        <div className='inline-block relative shrink-0'>
          <img
            className='w-12 h-12 rounded-full'
            src={`https://avatars.dicebear.com/api/initials/${username}.svg`}
          />
        </div>
        <div className='ml-3 text-sm font-normal'>
          <div className='text-sm font-semibold text-gray-900 dark:text-white'>
            {username}
          </div>
          <div className='text-sm font-normal'>{globText}</div>
          <span className='text-xs font-medium text-blue-600 dark:text-blue-500'>
            {createdAt}
          </span>
        </div>
      </div>
    </li>
  );
};

export default MessageCard;
