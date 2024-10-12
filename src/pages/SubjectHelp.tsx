import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyDE5BaySsuQk4d7KjyII3XbwvGR1dym2XE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to format the answer
const formatAnswer = (answer) => {
  const lines = answer.split('\n');
  return lines.map((line, index) => {
    if (line.match(/^\d+\./)) {
      return <p key={index} className="mb-2">{line}</p>;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={index} className="font-bold mb-2">{line.replace(/\*\*/g, '')}</p>;
    }
    return <p key={index} className="mb-1">{line}</p>;
  });
};

const SubjectHelp = () => {
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!inputMessage.trim() || !subject) return;

    setIsLoading(true);
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const prompt = `Responda à seguinte pergunta de ${subject}: ${inputMessage}. Por favor, organize a resposta em passos numerados e use marcações Markdown para destacar títulos e informações importantes.`;
      const result = await model.generateContent(prompt);
      const botMessage = { type: 'bot', content: result.response.text() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      const errorMessage = { type: 'bot', content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl  h-[700px] text-zinc-500 shadow-none border-none flex flex-col bg-zinc-5000">
      <CardHeader>
        <h2 className="text-2xl font-bold">Auxílio em Matérias</h2>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : ''}`}>
                {message.type === 'bot' ? formatAnswer(message.content) : message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center w-full space-x-2">
          <Select value={subject} onValueChange={setSubject} required>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Matéria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matemática">Matemática</SelectItem>
              <SelectItem value="física">Física</SelectItem>
              <SelectItem value="química">Química</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua dúvida aqui"
            className="flex-grow"
            required
          />
          <Button type="submit" className='bg-blue-400' disabled={isLoading || !subject}>
            {isLoading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default SubjectHelp;