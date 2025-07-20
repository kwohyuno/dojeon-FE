import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './PostList.css';
import jinImage from '../jin.jpeg';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  concertId?: number;
}

interface PostListProps {
  selectedConcertId?: number | null;
}

const PostList: React.FC<PostListProps> = ({ selectedConcertId }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedConcertId]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = API_ENDPOINTS.POSTS;
      
      if (selectedConcertId) {
        url = API_ENDPOINTS.POSTS_BY_CONCERT(selectedConcertId.toString());
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className="post-list-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="post-list-container">

      <div className="post-list">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to write a post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="post-item"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">
                  {post.content.length > 100 
                    ? `${post.content.substring(0, 100)}...` 
                    : post.content}
                </p>
                <div className="post-meta">
                  <span className="post-author">by {post.author}</span>
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="post-stats">
                <div className="stat">
                  <span className="stat-icon">👁️</span>
                  <span className="stat-value">{post.viewCount}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">❤️</span>
                  <span className="stat-value">{post.likeCount}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList; 