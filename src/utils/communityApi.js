import api from './api';

/**
 * Community API Service
 * Tất cả các API calls liên quan đến Community feature
 */

// GET: Lấy danh sách posts với filter
export const getPosts = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.tag) params.append('tag', filters.tag);
  if (filters.pageIndex) params.append('pageIndex', filters.pageIndex);
  if (filters.pageSize) params.append('pageSize', filters.pageSize);
  if (filters.userId) params.append('userId', filters.userId);
  if (filters.status) params.append('status', filters.status);
  
  const queryString = params.toString();
  const url = `/api/community/posts${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.get(url);
  return response.data;
};

// GET: Lấy post detail theo slug
export const getPostBySlug = async (slug) => {
  const response = await api.get(`/api/community/posts/${slug}`);
  return response.data;
};

// POST: Tạo post mới
export const createPost = async (postData) => {
  const response = await api.post('/api/community/posts', postData);
  return response.data;
};

// POST: Toggle like post
export const toggleLikePost = async (postId) => {
  const response = await api.post(`/api/community/posts/${postId}/like`);
  return response.data;
};

// GET: Tìm kiếm hashtags
export const searchHashtags = async (keyword) => {
  const response = await api.get(`/api/community/hashtags/search?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};

// GET: Lấy trending hashtags
export const getTrendingHashtags = async () => {
  const response = await api.get('/api/community/hashtags/trending');
  return response.data;
};

// GET: Lấy comments của post
export const getComments = async (postId, page = 1, size = 10) => {
  const response = await api.get(`/api/community/posts/${postId}/comments?page=${page}&size=${size}`);
  return response.data;
};

// POST: Tạo comment
export const createComment = async (commentData) => {
  const response = await api.post('/api/community/comments', commentData);
  return response.data;
};

// POST: Upload file (Ảnh/Video)
export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // 'file' phải khớp với tên tham số IFormFile trong Controller
  
  // Kiểm tra loại file để gọi đúng Endpoint (image hoặc video) của Backend
  const isVideo = file.type.startsWith('video/');
  const endpoint = isVideo ? '/api/media/video' : '/api/media/image';

  const response = await api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  // Backend của bạn đang trả về: return Ok(new { url = ..., publicId = ... })
  // Nên ta chỉ cần lấy trường url
  return response.data.url; 
};
