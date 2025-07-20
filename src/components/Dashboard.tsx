import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from './PostList';
import jinImage from '../jin.jpeg';
import './Dashboard.css';

interface DashboardProps {
  userEmail: string;
}

interface Concert {
  id: number;
  name: string;
  artist: string;
  description: string;
  concertDate: string;
  venue: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail }) => {
  const navigate = useNavigate();
  const [selectedConcert, setSelectedConcert] = useState('bts-jin');
  const [showAddModal, setShowAddModal] = useState(false);
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(false);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const userName = localStorage.getItem('userName');

  const [newConcert, setNewConcert] = useState({
    name: '',
    artist: '',
    description: '',
    concertDate: '',
    venue: ''
  });

  useEffect(() => {
    fetchConcerts();
    fetchTodayVisitors();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/concerts');
      if (response.ok) {
        const data = await response.json();
        setConcerts(data);
      }
    } catch (error) {
      console.error('Failed to fetch concerts:', error);
    }
  };

  const fetchTodayVisitors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/visitors/today');
      if (response.ok) {
        const data = await response.json();
        setTodayVisitors(data.todayVisitors);
      }
    } catch (error) {
      console.error('Failed to fetch today visitors:', error);
    }
  };

  const handleAddConcert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/concerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConcert),
      });

      if (response.ok) {
        const createdConcert = await response.json();
        setConcerts(prev => [...prev, createdConcert]);
        setShowAddModal(false);
        setNewConcert({
          name: '',
          artist: '',
          description: '',
          concertDate: '',
          venue: ''
        });
      }
    } catch (error) {
      console.error('Failed to create concert:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleGoToMyPage = () => {
    navigate('/mypage');
  };

  const handleGoToWrite = () => {
    navigate('/write');
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };



  return (
    <div className="dashboard-container" style={containerStyle}>
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Dojeon</h1>
            <div className="visitor-stats-header">
              <div className="visitor-card-header">
                <div className="visitor-icon-header">👥</div>
                <div className="visitor-info-header">
                  <div className="visitor-number-header">{todayVisitors}</div>
                  <div className="visitor-label-header">Today's Visitors</div>
                </div>
              </div>
            </div>
          </div>
          <div className="user-info">
            <span>Welcome, {userName || userEmail}</span>
            <button onClick={handleGoToMyPage} className="mypage-button">
              My Page
            </button>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-main">
        
        <div className="dashboard-controls">
          <div className="concert-selector">
            <label htmlFor="concert-select" className="concert-label">
              🎵 Select Concert
            </label>
            <select
              id="concert-select"
              value={selectedConcert}
              onChange={(e) => setSelectedConcert(e.target.value)}
              className="concert-dropdown"
            >
              <option value="all">🎵 All Concerts</option>
              {concerts.map((concert) => (
                <option key={concert.id} value={concert.id}>
                  {concert.name} - {concert.artist}
                </option>
              ))}
            </select>
          </div>
          
          <div className="action-buttons">
            <button 
              className="action-button"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Add Concert
            </button>
            <button onClick={handleGoToWrite} className="action-button">
              ✍️ Write Post
            </button>
          </div>
        </div>
        
        <PostList selectedConcertId={selectedConcert !== 'all' ? parseInt(selectedConcert) : null} />
      </main>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Concert</h2>
            <form onSubmit={handleAddConcert}>
              <div className="form-group">
                <label>Concert Name:</label>
                <input
                  type="text"
                  value={newConcert.name}
                  onChange={(e) => setNewConcert({...newConcert, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Artist:</label>
                <input
                  type="text"
                  value={newConcert.artist}
                  onChange={(e) => setNewConcert({...newConcert, artist: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newConcert.description}
                  onChange={(e) => setNewConcert({...newConcert, description: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Concert Date:</label>
                <input
                  type="datetime-local"
                  value={newConcert.concertDate}
                  onChange={(e) => setNewConcert({...newConcert, concertDate: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Venue:</label>
                <input
                  type="text"
                  value={newConcert.venue}
                  onChange={(e) => setNewConcert({...newConcert, venue: e.target.value})}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Concert'}
                </button>
                <button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 