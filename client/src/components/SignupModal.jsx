import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';
import Auth from '../utils/auth';

export default function SignupModal({ visible, onClose }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [url, setUrl] = useState('');

  // User Registartion Mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: {
          username: username,
          email: email,
          password: password,
          url: url,
        },
      });

      // Setting the token in local Storage
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const postDetails = (pics) => {
    if (pics !== undefined) {
      if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'globber');
        data.append('cloud_name', 'dvijdokq7');
        fetch('https://api.cloudinary.com/v1_1/dvijdokq7/image/upload', {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl(data.url.toString());
            console.log(data.url.toString());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm flex justify-center items-center'
    >
      <div className='bg-emerald-400 border-4 border-yellow-900 p-8 rounded '>
        <p className='text-center p-2 mb-4 text-white border-4 rounded-md bg-yellow-900 text-xl'>
          {' '}
          Please register now!
        </p>
        <form onSubmit={handleFormSubmit} className='flex flex-col w-full'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            onChange={(e) => setUserName(e.target.value)}
            required
            className='p-3 border-2 border-yellow-900 rounded-md text-black focus:outline-none  flex items-center'
          />
          <input
            type='text'
            name='email'
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
            required
            className='my-3 p-3 border-2 border-yellow-900 rounded-md text-black focus:outline-none  flex items-center'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='p-3 border-2 border-yellow-900 rounded-md text-black focus:outline-none flex items-center'
          />
          <input
            type='file'
            name='url'
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
            className='mt-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
          />
          <button
            id='signup'
            className='text-white bg-yellow-900 mt-5 px-6 py-3 rounded-md hover:scale-110 duration-300 border-4 border-white flex items-center justify-center'
          >
            Signup!
          </button>
        </form>

        {error && (
          <div
            className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-3'
            role='alert'
          >
            <span className='font-medium'>Info alert!</span> {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
