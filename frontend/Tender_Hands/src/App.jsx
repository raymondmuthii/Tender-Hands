import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CharityListPage from './pages/CharityListPage';
import StoriesPage from './pages/StoriesPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/charities" element={<CharityListPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </Layout>
  );
}

export default App;
