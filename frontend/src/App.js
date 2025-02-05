import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import UserDashboard from './components/dashboard/UserDashboard';
import DeveloperDashboard from './components/dashboard/DeveloperDashboard';
import AddGamePage from './pages/Games/AddGamePage';
import GamesListPage from './pages/Games/GamesListPage';
import EditGamePage from './pages/Games/EditGamePage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* User Dashboard Route with Email Parameter */}
        <Route path="/UserDashboard/:userEmail" element={<UserDashboard />} />
        {/* Developer Dashboard Route with Email Parameter */}
        <Route path="/DeveloperDashboard/:userEmail" element={<DeveloperDashboard />} />
        <Route path="/games/add/:userEmail" element={<AddGamePage />} />
        <Route path="/games/list" element={<GamesListPage />} />
        <Route path="/games/edit/:gameId" element={<EditGamePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
