import React from 'react';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import Sidebar from './Sidebar';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#111b21]">
     < ChatHeader/>
     < ChatWindow/>
     < MessageInput/>
     < MessageList/>
     < Sidebar/>
    </div>
  );
};

export default Chat;