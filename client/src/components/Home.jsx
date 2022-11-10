import React, { useState } from 'react';
import SignupModal from './SignupModal';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutation';
import Auth from '../utils/auth';

const Home = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const handleOnClose = () => setShowSignupModal(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const [login, { error }] = useMutation(LOGIN_USER);
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div className='bg-emerald-400 border-8 border-yellow-900 h-screen'>
      <div className='flex flex-col w-full mt-20'>
        <p className='text-6xl text-center text-yellow-900 items-center justify-center'>
          Welcome to Globber!
        </p>
        <div className='items-center  mx-auto w-full md:w-1/2 mt-5'>
          <form onSubmit={handleFormSubmit} className='flex flex-col '>
            <p className='border-4 rounded-md py-2.5 bg-yellow-900 text-white text-xl mx-auto flex items-center p-6 m-3'>
              Please login or signup below!
            </p>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formState.email}
              onChange={handleChange}
              required
              className='p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formState.password}
              onChange={handleChange}
              required
              className='my-4 p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center'
            />
            <button
              id='login'
              className='text-white bg-yellow-900 px-6 py-3 my-2 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white'
            >
              Chat with Globber!
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              id='register'
              className='text-white bg-yellow-900 px-6 py-3 my-2 mb-5 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white'
            >
              Register Now!
            </button>
            {error && (
              <div
                className='p-4 mb-1 w-3/4 mx-auto text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-3'
                role='alert'
              >
                <span className='font-medium'>Info alert!</span> {error.message}
              </div>
            )}
          </form>
        </div>
      </div>
      <SignupModal onClose={handleOnClose} visible={showSignupModal} />
    </div>
  );
};

export default Home;
