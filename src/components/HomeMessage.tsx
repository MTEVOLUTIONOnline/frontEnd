import React from 'react';

interface MessageProps {
  text: string;
  sender: string;
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
   <div className='w-10 flex items-center justify-center text-center'>
     <div className="p-2 m-2 border rounded shadow">
      <div className="font-bold">{sender}</div>
      <div>{text}</div>
    </div>
   </div>
  );
}

export default Message;
