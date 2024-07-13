import Chat from '@/components/Chat';
import Header from '@/components/HomeHeader';
import Sidebar from '@/components/Sidebar';
import { CarouselSpacing } from '@/components/HomeCarousel';
import React from 'react';
// import Header from './components/Header';
// import Chat from './components/Chat';

// import React from 'react';
// import Sidebar from './Sidebar';
// import Chat from './Chat';

const Home: React.FC = () => {
  return (
    <div className='flex justify-center h-[100vh]'>
      <CarouselSpacing />
    </div>
  );
}

export  {Home};


