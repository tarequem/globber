import React from 'react';
import Sidebar from '../components/Sidebar';
import Welcome from '../components/Welcome';
import { Route, Routes } from 'react-router-dom';
import Auth from '../utils/auth';
import Chat from '../components/Chat';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/:id/:username/:email' element={<Chat />} />
    </Routes>
  );
};

const HomeScreen = () => {
  return (
    <div className='bg-emerald-400 p-2'>
      <div className='flex flex-wrap w-full justify-between'>
        <p className='text-5xl text-left text-yellow-900   py-2 px-2'>
          Globber 🦃
        </p>
        <button
          id='logout'
          className='text-white bg-yellow-900 px-10  text-center m-2 rounded-md hover:scale-110 duration-300 border-4 border-white flex items-center'
          onClick={Auth.logout}
        >
          Logout
        </button>
      </div>
      <div className='flex flex-row h-screen'>
        <AllRoutes />
        <Sidebar />
      </div>
    </div>
  );
};

export default HomeScreen;
