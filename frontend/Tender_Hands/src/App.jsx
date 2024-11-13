import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CharityListPage from './pages/CharityListPage';
import StoriesPage from './pages/StoriesPage';
import UserProfilePage from './pages/UserProfilePage';
import DonatePage from './pages/DonatePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';  

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/charities" element={<CharityListPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
  );
}

export default App;
