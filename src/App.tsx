import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import routes from './routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MainLayout } from '@/components/layouts/MainLayout';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
};

export default App;
