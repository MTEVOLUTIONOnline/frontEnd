import React from 'react';

interface MessageProps {
  message: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isUser }) => {
  return (
    <div className={`p-4 my-2 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
      {message}
    </div>
  );
};

export default Message;
