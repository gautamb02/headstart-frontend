import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[400px] bg-[#111b21] border-r border-[#222d34] flex flex-col h-full">
      {/* Logo section */}
      <div className="h-[60px] bg-[#202c33] flex items-center px-4">
        <img 
          src="/home/whatsapp.png" 
          alt="WhatsApp Logo" 
          className="w-8 h-8 mr-3"
        />
        <span className="text-[#00a884] font-semibold text-lg">WhatsApp</span>
      </div>
      
      {/* User profile and actions */}
      <div className="h-[60px] bg-[#202c33] flex justify-between items-center px-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex space-x-6 text-[#aebac1]">
          <svg viewBox="0 0 24 24" width="24" height="24" className="">
            <path fill="currentColor" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path>
          </svg>
          <svg viewBox="0 0 24 24" width="24" height="24" className="">
            <path fill="currentColor" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
          </svg>
          <svg viewBox="0 0 24 24" width="24" height="24" className="">
            <path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
          </svg>
        </div>
      </div>
      
      <div className="h-[50px] bg-[#111b21] px-3 py-1.5">
        <div className="bg-[#202c33] rounded-lg flex items-center px-4 py-1">
          <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#aebac1]">
            <path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-transparent text-white py-1 px-4 focus:outline-none text-sm"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow">
        {/* Chat list items */}
        <ChatListItem name="Chat 1" lastMessage="Hello there!" time="10:30 AM" />
        <ChatListItem name="Chat 2" lastMessage="How are you?" time="Yesterday" />
        <ChatListItem name="Chat 3" lastMessage="See you soon!" time="Tuesday" />
        {/* Add more ChatListItem components as needed */}
      </div>
    </div>
  );
};

// ChatListItem component (unchanged)
const ChatListItem: React.FC<{ name: string; lastMessage: string; time: string }> = ({ name, lastMessage, time }) => (
  <div className="px-3 py-3 flex items-center hover:bg-[#202c33] cursor-pointer">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
    <div className="flex-grow border-b border-[#222d34] pb-3">
      <div className="flex justify-between items-center">
        <h3 className="text-white text-base font-medium">{name}</h3>
        <span className="text-[#8696a0] text-xs">{time}</span>
      </div>
      <p className="text-[#8696a0] text-sm truncate">{lastMessage}</p>
    </div>
  </div>
);

export default Sidebar;