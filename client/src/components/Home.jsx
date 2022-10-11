import React, { useState } from "react";
import SignupModal from "./SignupModal";

const Home = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const handleOnClose = () => setShowSignupModal(false);
  return (
    <div className="bg-emerald-400">
      <div className="py-10 px-10 border-8 border-yellow-900">
        <p className="text-8xl text-center text-yellow-900 items-center justify-center   py-5 px-5">
          Welcome to Globber!
        </p>
        <div className="items-center flex mx-auto justify-center my-20">
          <form action="" method="" className="flex flex-col w-full md:w-1/2">
            <p className="border-4 rounded-md py-3 bg-yellow-900 text-white text-xl mx-auto flex items-center px-6 mb-5">
              Please login or signup below!
            </p>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              required
              className="my-4 p-2 border-2 border-yellow-900 rounded-md text-black focus:outline-none mx-auto flex items-center"
            />
            <button
              id="login"
              className="text-white bg-yellow-900 px-6 py-3 my-2 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white"
            >
              Chat with Globber!
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              id="register"
              className="text-white bg-yellow-900 px-6 py-3 my-2 mb-5 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white"
            >
              Register Now!
            </button>
          </form>
        </div>
      </div>
      <SignupModal onClose={handleOnClose} visible={showSignupModal} />
    </div>
  );
};

export default Home;
