import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Model_page from './Models';
import Documentation from './Documentation';
import API_page from './API';

const Playground: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Model_page />} />
        <Route path="DocumentationPage" element={<Documentation />} />
        <Route path="APIpage" element={<API_page />} />
      </Routes>
    </Layout>
  );
}

export default Playground;