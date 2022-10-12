import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';
import Auth from '../utils/auth';

export default function SignupModal({ visible, onClose }) {
  // User usestate
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // User Registartion Mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose();
  };

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    debugger;
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({ variables: { ...formState } });

      // Setting the token in local Storage
      Auth.login(data.addUser.token);
    } catch (e) {
      debugger;
      console.error(e);
    }
  };

  if (!visible) return null;
  return (
    <div
      id='container'
      onClick={handleOnClose}
      className='fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm flex justify-center items-center'
    >
      <div className='bg-emerald-400 border-4 border-yellow-900 p-6 rounded'>
        <p className='flex items-center justify-center pb-3 text-yellow-900 text-xl'>
          {' '}
          Please register now!
        </p>
        <form
          onSubmit={handleFormSubmit}
          className='flex flex-col w-full md:w-1/2'
        >
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formState.username}
            onChange={handleChange}
            required
            className='p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
          />
          <input
            type='text'
            name='email'
            placeholder='Email Address'
            value={formState.email}
            onChange={handleChange}
            required
            className='my-4 p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formState.password}
            onChange={handleChange}
            required
            className='p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
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
            class='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-3'
            role='alert'
          >
            <span class='font-medium'>Info alert!</span> {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
