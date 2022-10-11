import React from "react";

const Chat = () => {
    return (
        <div className="flex flex-col bg-emerald-400">
        <div>
        <p className="text-8xl text-left text-yellow-900 items-center justify-center   py-5 px-5">
        Globber 🦃
        </p>
        </div>
            <div className="h-full">
                <div className="flex flex-row mb-1.5">
                    <div className="border-4 border-yellow-900 bg-emerald-100 w-1/5 mr-1.5">
                        <h3 className="" >Globbers Online:</h3>
                    </div>
                    <div className="border-4 border-yellow-900 bg-emerald-100 w-4/5">
                        <h3>Chat placeholder</h3>
                    </div>
                </div>

            </div>
            <div className="bg-emerald-400">
                <form className=" border-4 border-yellow-900 bg-emerald-100 flex flex-row">
                    <textarea 
                    className="w-full" 
                    placeholder="globble globble..." />
                    <button className="text-white bg-yellow-900 px-6 py-3 my-2 mb-5 mx-auto flex items-center rounded-md hover:scale-110 duration-300 border-4 border-white">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
