// API Configuration
export const API_BASE_URL = 'http://13.222.71.175:8080';

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  REGISTER: `${API_BASE_URL}/api/users/register`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/update-profile`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  STATISTICS: `${API_BASE_URL}/api/users/statistics`,
  ACTIVITY: `${API_BASE_URL}/api/users/activity`,
  
  // Concert endpoints
  CONCERTS: `${API_BASE_URL}/api/concerts`,
  
  // Post endpoints
  POSTS: `${API_BASE_URL}/api/posts`,
  POST_DETAIL: (id: string) => `${API_BASE_URL}/api/posts/${id}`,
  POSTS_BY_CONCERT: (concertId: string) => `${API_BASE_URL}/api/posts/concert/${concertId}`,
  POST_LIKE: (id: string) => `${API_BASE_URL}/api/posts/${id}/like`,
  POST_LIKE_CHECK: (id: string, userEmail: string) => 
    `${API_BASE_URL}/api/posts/${id}/like/check?userEmail=${encodeURIComponent(userEmail)}`,
  
  // Comment endpoints
  COMMENTS: `${API_BASE_URL}/api/comments`,
  COMMENTS_BY_POST: (postId: string) => `${API_BASE_URL}/api/comments/post/${postId}`,
  
  // Visitor endpoints
  VISITORS_RECORD: `${API_BASE_URL}/api/visitors/record`,
  VISITORS_TODAY: `${API_BASE_URL}/api/visitors/today`,
}; 