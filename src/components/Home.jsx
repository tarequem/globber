import React from "react";

const Home = () => {
  return (
    <div>
      <div>
        <p className="text-xl">Welcome to Globber!</p>
        <div>
            <p className="mx-auto flex items-center">
              Please login or signup below!
            </p>
          <form action="" method="" className="flex flex-col w-full md:w-1/2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 bg-transparent border-2 border-gray-500 rounded-md text-white focus:outline-none mx-auto flex items-center"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="my-4 p-2 bg-transparent border-2 border-gray-500 rounded-md text-white focus:outline-none mx-auto flex items-center"
            />
            <button className="text-white bg-gradient-to-b from-green-500 to-green-800 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Chat with Globber!
            </button>
            <button className="text-white bg-gradient-to-b from-blue-500 to-blue-800 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Register Now!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
