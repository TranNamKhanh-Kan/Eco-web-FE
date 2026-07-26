import api from './api';

/**
 * Event API Service
 * Tất cả các API calls liên quan đến Events
 */

// GET: Lấy danh sách events
export const getEvents = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.keyword) params.append('keyword', filters.keyword);
  if (filters.page) params.append('page', filters.page);
  
  const queryString = params.toString();
  const url = `/api/events${queryString ? `?${queryString}` : ''}`;
  
  const response = await api.get(url);
  return response.data;
};

// GET: Lấy event detail theo slug
export const getEventBySlug = async (slug) => {
  const response = await api.get(`/api/events/${slug}`);
  return response.data;
};

// POST: Đăng ký tham gia event
export const joinEvent = async (eventId, request = {}) => {
  const response = await api.post(`/api/events/${eventId}/join`, request);
  return response.data;
};

