import React from 'react';
import { User, Menu, Award, Lock } from 'lucide-react';

const ExamesMocambiqueInterface = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-green-400 rounded-full p-4 mr-4">
              <User className="text-white w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-green-400">Explica Moçambique</h1>
              <h2 className="text-2xl font-semibold text-gray-700">Mais Informações</h2>
            </div>
          </div>
          <button className="bg-green-400 text-white px-4 py-2 rounded-full">
            <a href="/">Voltar ao Web App</a>
          </button>
        </div>
        
        <p className="text-gray-600 mb-8">
          Todas as informações acerca de Exames Moçambique em um só lugar. Veja informações de como são utilizados os 
          dados coletados pelos nossos serviços (Política de Privacidade), quais são os serviços terceirizados usados no nosso 
          aplicativo e apoios que o Exames Moçambique tem o privilégio de ter.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <Menu className="text-green-400 w-8 h-8 mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">Sobre Nós</h3>
            <p className="text-gray-400 mb-4">Mais informações e os nossos apoios</p>
            <h4 className="text-white font-semibold mb-2">Contactos</h4>
            <p className="text-gray-400">Email: mtevolution0@gmail.com</p>
            <p className="text-gray-400">Facebook: mtevolution</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex mb-4">
              <Award className="text-orange-400 w-8 h-8 mr-2" />
              <Lock className="text-orange-400 w-8 h-8" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-4">Serviços</h3>
            <ul className="text-gray-400">
              <li className="mb-2">Premium</li>
              <li className="mb-2">Anúncios</li>
              <li className="mb-2">Termos e Condições do Premium</li>
              <li>Políticas de Privacidade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamesMocambiqueInterface;