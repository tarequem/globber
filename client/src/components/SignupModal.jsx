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
      <div className="bg-emerald-400 border-4 border-yellow-900 p-6 rounded">
        <p className="flex items-center justify-center pb-3 text-yellow-900 text-xl"> Please register now!</p>
        <form action="" method="" className="flex flex-col w-full md:w-1/2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
          />
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            required
            className="my-4 p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            required
            className="p-4 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
          />
          <button
            id="signup"
            className="text-white bg-yellow-900 mt-5 px-6 py-3 rounded-md hover:scale-110 duration-300 border-4 border-white flex items-center justify-center"
          >
            Signup!
          </button>
        </form>
      </div>
    </div>
  );
}
