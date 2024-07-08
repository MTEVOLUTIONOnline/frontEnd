import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar w-64 bg-gray-800 text-white flex flex-col fixed top-16 h-[calc(100vh-4rem)]">
      <Link to="/playground" className="p-4 hover:bg-gray-700">Home</Link>
      <Link to="/playground/DocumentationPage" className="p-4 hover:bg-gray-700">Documentation</Link>
      <Link to="/playground/APIpage" className="p-4 hover:bg-gray-700">API</Link>
    </div>
  );
}

export default Sidebar;