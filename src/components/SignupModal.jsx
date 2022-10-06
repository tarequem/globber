import React from "react";

export default function SignupModal({ visible, onClose }) {
  const handleOnClose = (e) => {
    if(e.target.id === "container") onClose();
  };

  if (!visible) return null;
  return (
    <div
    id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-2 rounded">
        <p> Please register now!</p>
        <form action="" method="" className="flex flex-col w-full md:w-1/2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-2 border-2 border-yellow-900 rounded-md text-white focus:outline-none mx-auto flex items-center"
          />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            className="my-4 p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="my-4 p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
          />
          <button
            id="signup"
            className="text-white bg-yellow-900 px-6 py-3 my-2 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white"
          >
            Signup!
          </button>
          <button
            onClick={onClose}
            id="exit"
            className="text-white bg-yellow-900 px-6 py-3 my-2 mb-5 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white"
          >
            Exit!
          </button>
        </form>
      </div>
    </div>
  );
}
