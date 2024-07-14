// src/components/Chat.jsx
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export function CChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  // Carregar mensagens do localStorage quando o componente for montado
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Salvar mensagens no localStorage sempre que o estado messages mudar
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a response from the bot.', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  return (
    <div>

      <div className="flex flex-col h-screen bg-gray-100 pl-[25%] pr-[25%]">
      <div className="flex-grow p-6 overflow-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-xs ${message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white border-gray-300">
        <div className="flex gap-3">
          <Input
            type="text"
            className="flex-grow p-5 border border-gray-300  focus:outline-none focus:ring focus:border-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            className=" bg-blue-500 text-white g hover:bg-blue-600"
            onClick={handleSend}
          >
            Send
          </Button><br /><br /> <br /><br />
        </div>
      </div>
    </div>
    </div>
  );
}
