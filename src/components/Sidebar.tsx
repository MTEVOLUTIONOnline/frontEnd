import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="font-bold text-lg">Menu</h2>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="block p-2 rounded hover:bg-gray-300">Explorar GPTs</a></li>
        <li><a href="#" className="block p-2 rounded hover:bg-gray-300">Consultar APIs</a></li>
        <li><a href="#" className="block p-2 rounded hover:bg-gray-300">Configurações</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
