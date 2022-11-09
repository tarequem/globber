import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { ChatState } from '../context/ChatProvider';

const Emoticon = () => {
  const { setText } = ChatState();
  const onEmojiClick = (event, emojiObject) => {
    setText((previosMessages) => previosMessages + event.emoji);
  };
  return (
    <div>
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default Emoticon;
