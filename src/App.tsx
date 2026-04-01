import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Welcome from './components/Welcome';
import "./App.css"
const App: React.FC = () => {
  return (
      <Routes>
        {/* Think of these as "If the URL is X, show component Y" */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
  );
};

export default App;