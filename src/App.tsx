import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PostDetail from './components/PostDetail';
import MyPage from './components/MyPage';
import Write from './components/Write';
import MusicPlayer from './components/MusicPlayer';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const userEmail = localStorage.getItem('userEmail') || 'User';

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard userEmail={userEmail} />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/post/:id" 
            element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/mypage" 
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/write" 
            element={
              <PrivateRoute>
                <Write />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
        <MusicPlayer />
      </div>
    </Router>
  );
}

export default App;
