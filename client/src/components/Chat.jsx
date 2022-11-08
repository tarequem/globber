import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_GLOBES_BY_USER } from '../utils/queries';
import { SEND_GLOBE } from '../utils/mutation';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageCard from './MessageCard';
import AuthService from '../utils/auth';
import { ChatState } from '../context/ChatProvider';
import Loading from './Loading';

const Chat = () => {
  const { id, username, email } = useParams();
  const { messages, setMessages, setSelectedUser, selectedUser } = ChatState();

  if (selectedUser.length <= 0 && id !== undefined) {
    setSelectedUser({ id: id, username: username, email: email });
  }
  // Setting the message
  const [text, setText] = useState('');

  // Logged In user Details
  const {
    data: { _id, username: currentUsername },
  } = AuthService.getProfile();

  // Messages send to the selected user
  const { loading, error } = useQuery(GET_GLOBES_BY_USER, {
    variables: { receiverId: id },
    onCompleted(data) {
      setMessages(data.globs);
    },
  });

  // Sending Globe
  const [sendGlobe] = useMutation(SEND_GLOBE);

  // Setting the Scroller at the bottom
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      },
      [messages]
    );
  });
  return (
    <div className='flex flex-col border-4 border-yellow-900 bg-emerald-100 w-full mx-2 p-9 justify-between'>
      <div style={{ overflow: 'auto' }}>
        {error ? (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
            role='alert'
          >
            <span className='font-medium'>Error!</span> {error.message}
          </div>
        ) : loading ? (
          <Loading />
        ) : messages.length <= 0 ||
          messages.filter(
            (glob) =>
              (glob.receiverId === id && glob.senderId === _id) ||
              (glob.receiverId === _id && glob.senderId === id)
          ).length <= 0 ? (
          <h3> No message send/ receive from {username}</h3>
        ) : (
          <ul ref={divRef}>
            {messages
              .filter(
                (glob) =>
                  (glob.receiverId === id && glob.senderId === _id) ||
                  (glob.receiverId === _id && glob.senderId === id)
              )
              .map((glob) => {
                return (
                  <MessageCard
                    key={glob._id}
                    item={{
                      username:
                        glob.receiverId === id ? currentUsername : username,
                      globText: glob.globText,
                      createdAt: glob.createdAt,
                    }}
                  />
                );
              })}
          </ul>
        )}
      </div>
      <>
        <div className='flex items-center py-2 px-3 mt-3 bg-emerald-100 rounded-lg dark:bg-gray-700 border-2 border-yellow-500 hover:border-yellow-800 '>
          {/* <button
            type='button'
            className='inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
          >
            <svg
              aria-hidden='true'
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Upload image</span>
          </button> */}
          <button
            type='button'
            className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
          >
            <svg
              aria-hidden='true'
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
                clipRule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Add emoji</span>
          </button>
          <textarea
            id='chat'
            rows='1'
            className='block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Your message...'
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          ></textarea>
          <button
            className='inline-flex justify-center p-2 text-yellow-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600'
            onClick={() => {
              sendGlobe({
                variables: {
                  receiverId: id,
                  globText: text,
                },
              });
              setText('');
            }}
          >
            <svg
              aria-hidden='true'
              className='w-6 h-6 rotate-90'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
            </svg>
            <span className='sr-only'>Send message</span>
          </button>
        </div>
      </>
    </div>
  );
};

export default Chat;
