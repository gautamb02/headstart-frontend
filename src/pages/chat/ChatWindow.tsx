import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow bg-[#0b141a] bg-[url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')]">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatWindow;