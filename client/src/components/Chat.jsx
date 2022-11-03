import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_GLOBES_BY_USER } from '../utils/queries';
import { SEND_GLOBE } from '../utils/mutation';
import { GLOBE_SUBSCRIPTION } from '../utils/subscription';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MessageCard from './MessageCard';
import AuthService from '../utils/auth';

const Chat = () => {
  const { id, username } = useParams();

  // Setting the message
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

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

  // Subscription
  const { data: globeData } = useSubscription(GLOBE_SUBSCRIPTION, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (
        (data.globeAdded.receiverId === id &&
          data.globeAdded.senderId === _id) ||
        (data.globeAdded.receiverId === _id && data.globeAdded.senderId === id)
      ) {
        setMessages((prevMessages) => [...prevMessages, data.globeAdded]);
      }
    },
  });

  return (
    <div
      className='flex flex-col justify-between border-4 border-yellow-900 bg-emerald-100 w-full mr-2 p-9 h-full'
      style={{ overflow: 'auto' }}
    >
      <div>
        {error ? (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
            role='alert'
          >
            <span className='font-medium'>Error!</span> {error.message}
          </div>
        ) : loading ? (
          <h3> Loading Chats ... </h3>
        ) : messages.length <= 0 ? (
          <h3> No message send/ receive with the User</h3>
        ) : (
          <ul>
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
        <div
          className=' border-4 border-yellow-900 bg-emerald-100 flex flex-row mx-2'
          style={{ position: 'fixed', bottom: '0', left: '0', right: '0' }}
        >
          <textarea
            className='w-full'
            placeholder='globble globble...'
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button
            className='text-white  bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-900  hover:scale-110 duration-300 focus:ring-4 font-medium rounded-lg text-sm px-8 py-2.5 m-2 mb-2  focus:outline-none border-4 border-white'
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
            Send
          </button>
        </div>
      </>
    </div>
  );
};

export default Chat;
