import React from 'react';

const MessageList: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      <div className="flex justify-end">
        <div className="bg-[#005c4b] text-white p-2 rounded-lg max-w-[65%] break-words">
          Hello! How are you?
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-[#202c33] text-white p-2 rounded-lg max-w-[65%] break-words">
          Hi! I'm good, thanks. How about you?
        </div>
      </div>
    </div>
  );
};

export default MessageList;