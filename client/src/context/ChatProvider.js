import React, { createContext, useContext, useState, useEffect } from 'react';
import { GLOBE_SUBSCRIPTION } from '../utils/subscription';
import { useSubscription } from '@apollo/client';
import AuthService from '../utils/auth';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedtab, setTab] = useState([false]);
  const [notification, setNotification] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chosenEmoji, setchosenEmoji] = useState(false);

  // Logged In user Details
  const {
    data: { _id },
  } = AuthService.getProfile();

  useEffect(() => {}, [messages, notification.length > 0]);

  // Subscibing to all the messages
  useSubscription(GLOBE_SUBSCRIPTION, {
    onData({ data: { data } }) {
      if (
        data.globeAdded.senderId !== selectedUser.id &&
        data.globeAdded.receiverId === _id
      ) {
        setNotification((prevMessages) => [...prevMessages, data.globeAdded]);
      }
      setMessages((prevMessages) => [...prevMessages, data.globeAdded]);
    },
  });

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        selectedtab,
        setTab,
        messages,
        setMessages,
        notification,
        chosenEmoji,
        setchosenEmoji,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
