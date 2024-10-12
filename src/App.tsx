import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import HomePage from './pages/HomePage';
import ExamPreparation from './pages/ExamPreparation';
import SubjectHelp from './pages/SubjectHelp';
import ExamCROLOGRAMA from './pages/exameCrologram';
import ExamesMocambiqueInterface from './pages/About';

// ExamCROLOGRAMA ExamPreparation SubjectHelp ExamCROLOGRAMA ExamesMocambiqueInterface

function App() {
  return (
      <Router>
          <Layout>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/ResolverExame" element={<ExamPreparation />} />
                  <Route path="/SubjectHelp" element={<SubjectHelp />} />
                  <Route path="/Cronograma" element={<ExamCROLOGRAMA />} />
              </Routes>
          </Layout>
        <Routes>
        <Route path="/About" element={<ExamesMocambiqueInterface />} />
  
        </Routes>
      </Router>
  );
}

export default App;