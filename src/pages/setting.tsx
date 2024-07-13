import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { LayoutSetting } from '@/components/LayoutSetting';
import { PageProfile } from './pageProfile';
import { PageSecurity } from './pageSecurity';
import { PageAppearance } from './pageAppearance';
// import LayoutSetting from '@/components/LayoutSetting'; pageAppearance

const Setting: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <LayoutSetting>
      <Routes>
        <Route path="/" element={<PageProfile />} />
        <Route path="Security" element={<PageSecurity />} />
        <Route path="Appearance" element={<PageAppearance />} />
      </Routes>
    </LayoutSetting>
  );
}

export default Setting;