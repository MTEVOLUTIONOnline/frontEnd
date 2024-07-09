import Chat from '@/components/Chat';
import Header from '@/components/HomeHeader';
import React from 'react';
// import Header from './components/Header';
// import Chat from './components/Chat';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Chat />
    </div>
  );
};

export default Home;
