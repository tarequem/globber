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
                    <div className="border-8 border-yellow-900 bg-emerald-100 w-1/5 mr-1.5">
                        <h3 className="" >Globbers Online:</h3>
                    </div>
                    <div className="border-8 border-yellow-900 bg-emerald-100 w-4/5">
                        <h3>Chat placeholder</h3>
                    </div>
                </div>

            </div>
            <div className="bg-emerald-400">
                <form className=" border-8 border-yellow-900 bg-emerald-100">
                    <textarea className="w-full" placeholder="globble globble..." />
                </form>
            </div>
        </div>
    );
}

export default Chat;
