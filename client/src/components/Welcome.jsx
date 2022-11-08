import React from 'react';

const Welcome = () => {
  return (
    <div
      className='border-4 border-yellow-900 bg-emerald-100 w-full mx-2 p-9'
      style={{ overflow: 'auto' }}
    >
      <div className='flex flex-col items-center justify-center text-5xl align-middle h-full'>
        <h3>Welcome To Globber</h3>
      </div>
    </div>
  );
};

export default Welcome;
