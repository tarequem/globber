import React from "react";

const Chatbox = () => {
    return (
        <div>
            <div>
                <input
                    type="text"
                    name="chat-history"
                    placeholder="Global globbles..."
                    className="border-yellow-900 bg-yellow-500" />
            </div>
            <div>
                <input
                    type="text"
                    name="users-online"
                    placeholder="Globblers"
                />
            </div>
            <div>
                <input
                    type="text"
                    name="usermsg"
                    placeholder="Globble globble..."
                />
                <button>Send</button>
            </div>
        </div>
    )
}

export default Chatbox;