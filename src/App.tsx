import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Casa } from './pages/home';
import Login from './pages/login';
import Playground from './pages/Playground';
import Cadastro from './pages/cadastro';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Casa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/playground/*" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;