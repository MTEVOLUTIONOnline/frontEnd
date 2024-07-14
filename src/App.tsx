import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Casa } from './pages/home';
import Login from './pages/login';
import Playground from './pages/Playground';
import Cadastro from './pages/cadastro';
// import { Setting } from './pages/setting';
import { Home } from './pages/home';
import Setting from './pages/setting';
import { Chat } from "./pages/chat"


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/playground/*" element={<Playground />} />
        <Route path="/Setting/*" element={<Setting />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;