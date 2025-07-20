import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import './PostDetail.css';
import jinImage from '../jin.jpeg';

interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  postId: number;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const currentIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (currentIdRef.current !== id) {
      setPost(null);
      setComments([]);
      setLoading(true);
      setError(null);
      currentIdRef.current = id || null;
    }

    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jinImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.minHeight = '100vh';

    const fetchPost = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      console.log('Fetching post:', id, 'at', new Date().toISOString());
      
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINTS.POST_DETAIL(id!), {
          signal: abortControllerRef.current.signal,
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        console.log('Post fetched:', data.id, 'at', new Date().toISOString());
        setPost(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Request aborted for post:', id);
          return;
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.COMMENTS_BY_POST(id!));
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    const checkLikeStatus = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;
        
        const response = await fetch(API_ENDPOINTS.POST_LIKE_CHECK(id!, userEmail));
        if (response.ok) {
          const data = await response.json();
          setHasLiked(data.hasLiked);
          if (post) {
            setPost((prevPost: any) => ({
              ...prevPost,
              likeCount: data.likeCount
            }));
          }
        }
      } catch (err) {
        console.error('Failed to check like status:', err);
      }
    };

    if (id) {
      fetchPost();
      fetchComments();
      checkLikeStatus();
    }

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.minHeight = '';
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id]);

  const handleLike = async () => {
    if (!post || likeLoading) return;
    
    setLikeLoading(true);
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        alert('Please login to like posts');
        return;
      }
      
      const response = await fetch(API_ENDPOINTS.POST_LIKE(id!), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHasLiked(data.isLiked);
        setPost((prevPost: any) => ({
          ...prevPost,
          likeCount: data.likeCount
        }));
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    setCommentLoading(true);
    try {
      const userEmail = localStorage.getItem('userEmail') || 'Anonymous';
      const response = await fetch(API_ENDPOINTS.COMMENTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment.trim(),
          author: userEmail,
          postId: post.id
        }),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments(prev => [...prev, createdComment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-detail-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-content">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="post-views">Views: {post.viewCount}</span>
          <span className="post-likes">Likes: {post.likeCount}</span>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <button 
            onClick={handleLike} 
            className={`like-button ${hasLiked ? 'liked' : ''}`}
            disabled={likeLoading}
          >
            {likeLoading ? '...' : hasLiked ? '❤️ Liked' : '🤍 Like'}
          </button>
          <button onClick={() => navigate('/dashboard')} className="back-button">
            ← Back
          </button>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-title">💬 Comments ({comments.length})</h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
              rows={3}
              disabled={commentLoading}
            />
            <button 
              type="submit" 
              className="comment-submit-btn"
              disabled={commentLoading || !newComment.trim()}
            >
              {commentLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="comment-content">{comment.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 