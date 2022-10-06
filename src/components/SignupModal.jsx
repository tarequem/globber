import React from "react";

export default function SignupModal({visible}) {
if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded">
        <p> Please register now!</p>
      </div>
    </div>
  );
}
