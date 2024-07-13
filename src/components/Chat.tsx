import React, { useState } from 'react';
import Message from './HomeMessage';
import { Input } from './ui/input';
// import Message from './Message';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Olá, como posso ajudar?", sender: "ChatGPT" },
    { text: "Eu preciso de ajuda com um problema.", sender: "Usuário" }
  ]);

  return (
    <div className="flex-1 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">ChatGPT</h1>
      <div className="flex flex-col space-y-4  flex-1 overflow-auto">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>a
      <div className="mt-4">
        <Input
          type="text"
          placeholder="Digite sua mensagem"
          className="w-full p-2 border rounded mb-2"
        />
      
      </div>
    </div>
  );
}

export default Chat;
