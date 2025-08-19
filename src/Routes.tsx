
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import WelcomePage from './pages/Welcome';

const Users = React.lazy(() => import('users/Routes'));
const Finance = React.lazy(() => import('finance/Routes'));


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/users/*"
            element={
              <React.Suspense fallback={<div>Loading Users...</div>}>
                <Users />
              </React.Suspense>
            }
          />
          <Route
            path="/finance/*"
            element={
              <React.Suspense fallback={<div>Loading Finanças...</div>}>
                <Finance />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default AppRoutes
