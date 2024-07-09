import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Casa } from './pages/home';
import Login from './pages/login';
import Playground from './pages/Playground';
import Cadastro from './pages/cadastro';
import Home from './pages/home';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/playground/*" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;