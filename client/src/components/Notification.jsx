import React, { useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate = useNavigate();
  const { notification, selectedUser } = ChatState();

  // useEffect(() => [notification]);

  return (
    <>
      <button
        id='dropdownNotificationButton'
        data-dropdown-toggle='dropdownNotification'
        className='inline-flex items-center text-sm  mr-3 font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400'
        type='button'
      >
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z'></path>
        </svg>
        <div className='flex relative'>
          {notification.length > 0 &&
            notification.filter(
              (message) => message.senderId === selectedUser.id
            ).length <= 0 && (
              <div className='inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900'></div>
            )}
        </div>
      </button>

      <div
        id='dropdownNotification'
        className='hidden z-20 w-full max-w-sm bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700'
        aria-labelledby='dropdownNotificationButton'
      >
        <div className='block py-2 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white'>
          Notifications
        </div>

        {notification.length > 0 && notification !== undefined ? (
          notification.map((message) => {
            return (
              <div
                className='divide-y divide-gray-100 dark:divide-gray-700'
                key={message._id}
              >
                <span
                  style={{ cursor: 'pointer' }}
                  className='flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700'
                  onClick={() => {
                    notification.splice(
                      notification.findIndex((x) => x._id === message._id),
                      1
                    );
                    navigate(
                      `/${message.senderId}/${message.senderUserName}/${message.senderUserEmail}`
                    );
                  }}
                >
                  <div className='flex-shrink-0'>
                    <img
                      className='w-8 h-8 rounded-full shadow-xl'
                      src={`https://avatars.dicebear.com/api/initials/${message.senderUserName}.svg`}
                      alt=''
                    />
                    <div className='flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800'>
                      <svg
                        className='w-3 h-3 text-white'
                        aria-hidden='true'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                        <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                      </svg>
                    </div>
                  </div>
                  <div className='pl-3 w-full'>
                    <div className='text-gray-500 text-sm mb-1.5 dark:text-gray-400'>
                      New message from{' '}
                      <span className='font-semibold text-gray-900 dark:text-white'>
                        {message.senderUserName}
                      </span>
                      : `{message.globText}`
                    </div>
                    <div className='text-xs text-blue-600 dark:text-blue-500'>
                      {message.createdAt}
                    </div>
                  </div>
                </span>
                <span className='flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700'></span>
              </div>
            );
          })
        ) : (
          <div>
            {' '}
            <div className='divide-y divide-gray-100 dark:divide-gray-700'>
              <div className='pl-3 w-full'>
                <div className='text-gray-500 text-sm mb-1.5 dark:text-gray-400'>
                  No New Messages
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
