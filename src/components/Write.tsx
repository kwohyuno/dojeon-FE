import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jinImage from '../jin.jpeg';
import './Write.css';

interface PostRequest {
  title: string;
  content: string;
  author: string;
  userEmail: string;
  concertId?: number;
}

interface Concert {
  id: number;
  name: string;
  artist: string;
}

const Write: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedConcertId, setSelectedConcertId] = useState<number | null>(null);
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConcerts();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both title and content.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const userEmail = localStorage.getItem('userEmail') || 'Anonymous';
      const userName = localStorage.getItem('userName') || userEmail;
      const postData: PostRequest = {
        title: title.trim(),
        content: content.trim(),
        author: userName,
        userEmail: userEmail,
        concertId: selectedConcertId || undefined
      };

      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const createdPost = await response.json();
      navigate(`/post/${createdPost.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const containerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <div className="write-container" style={containerStyle}>
      <header className="write-header">
        <div className="header-content">
          <h1>Write Post</h1>
          <div className="header-actions">
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </header>

      <main className="write-main">
        <div className="write-card">
          <form onSubmit={handleSubmit} className="write-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter your post title..."
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="concert" className="form-label">Concert (Optional)</label>
              <select
                id="concert"
                value={selectedConcertId || ''}
                onChange={(e) => setSelectedConcertId(e.target.value ? parseInt(e.target.value) : null)}
                className="form-input"
                disabled={isSubmitting}
              >
                <option value="">Select a concert (optional)</option>
                {concerts.map((concert) => (
                  <option key={concert.id} value={concert.id}>
                    {concert.name} - {concert.artist}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
                placeholder="Write your post content here..."
                rows={12}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Write; 