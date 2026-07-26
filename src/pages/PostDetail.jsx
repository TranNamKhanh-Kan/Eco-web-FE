import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUsers, FaHeart, FaComments, FaArrowLeft, FaShare, FaBookmark, FaEllipsisH, FaPaperPlane } from "react-icons/fa";
import { getPostBySlug, toggleLikePost, getComments, createComment } from "../utils/communityApi";
import { useAuth } from "../contexts/AuthContext";

// Helper function to format time ago
const formatTimeAgo = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  
  if (diffInSeconds < 60) return 'Vừa xong';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} tuần trước`;
  return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
};

export default function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // FIX LỖI: Thêm biến user vào đây để dùng cho việc hiển thị avatar ở phần bình luận
  const { isAuthenticated, user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  // Load post by slug
  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostBySlug(slug);
        setPost(postData);
        
        // Load comments
        await loadComments(postData.id);
        
        setError(null);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadComments = async (postId, page = 1) => {
    try {
      setCommentsLoading(true);
      const result = await getComments(postId, page, 50); // Tăng số lượng load bình luận
      setComments(result.items || []);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleLikePost = async () => {
    if (!isAuthenticated) {
      setError('Vui lòng đăng nhập để thích bài viết');
      navigate('/login');
      return;
    }

    if (!post) return;

    try {
      await toggleLikePost(post.id);
      
      // Update post like state
      setPost(prev => ({
        ...prev,
        isLikedByCurrentUser: !prev.isLikedByCurrentUser,
        likeCount: prev.isLikedByCurrentUser 
          ? Math.max(0, prev.likeCount - 1) 
          : prev.likeCount + 1
      }));
    } catch (err) {
      console.error('Error toggling like:', err);
      setError('Không thể thích bài viết. Vui lòng thử lại sau.');
    }
  };

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      setError('Vui lòng đăng nhập để bình luận');
      navigate('/login');
      return;
    }

    if (!newComment.trim() || !post) return;

    try {
      await createComment({
        postId: post.id,
        content: newComment.trim(),
        mediaUrl: null,
        parentCommentId: null
      });

      // Reload comments after creating
      await loadComments(post.id);
      
      // Update comment count
      setPost(prev => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1
      }));
      
      setNewComment("");
      setError(null);
    } catch (err) {
      console.error('Error creating comment:', err);
      setError('Không thể đăng bình luận. Vui lòng thử lại sau.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-[#D68C45] text-xl font-bold animate-pulse">Đang tải...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post || error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4 text-red-400">
              {error || 'Không tìm thấy bài viết'}
            </h1>
            <button
              onClick={() => navigate('/community')}
              className="bg-[#D68C45] text-white px-6 py-3 rounded-lg hover:bg-[#B87A3A] transition-colors"
            >
              Quay lại Community
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      {/* CĂN CHỈNH FORM: Giới hạn chiều rộng (max-w-4xl) và đưa ra giữa (mx-auto) */}
      <main className="w-full bg-[#1A1A1A] min-h-screen px-4 sm:px-6 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          
          <button
            onClick={() => navigate('/community')}
            className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-[#D68C45] transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Quay lại Community</span>
          </button>

          {/* Khung Card bọc bài viết */}
          <article className="bg-[#2A2A2A] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#3f3f3f]">
            
            {/* Author Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
                  alt={post.authorName}
                  className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-[#313131] object-cover"
                />
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white">{post.authorName || 'Unknown'}</h3>
                  <p className="text-gray-400 text-sm lg:text-base">{formatTimeAgo(post.createdAt)}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-white"><FaEllipsisH className="w-5 h-5"/></button>
            </div>

            {/* Post Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-snug">
              {post.title}
            </h1>

            {/* Post Content */}
            <div className="mb-8">
              <p className="text-gray-200 text-base lg:text-lg xl:text-xl leading-relaxed whitespace-pre-line font-light">
                {post.content}
              </p>
            </div>

            {/* NÂNG CẤP ẢNH: Xếp lưới Grid tự động chia bố cục tùy số lượng ảnh */}
            {(post.mediaUrls?.length > 0 || post.thumbnailUrl) && (
              <div className={`mb-10 grid gap-2 ${
                post.mediaUrls?.length === 1 || (!post.mediaUrls?.length && post.thumbnailUrl) ? 'grid-cols-1' : 
                post.mediaUrls?.length === 2 ? 'grid-cols-2' : 
                post.mediaUrls?.length === 3 ? 'grid-cols-2' : 
                'grid-cols-2 md:grid-cols-3'
              }`}>
                {post.mediaUrls?.length > 0 ? (
                  post.mediaUrls.map((url, index) => (
                    <img 
                      key={index}
                      src={url} 
                      alt={`Media ${index + 1}`}
                      className={`w-full object-cover rounded-xl ${
                        post.mediaUrls.length === 1 ? 'max-h-[600px]' : 
                        post.mediaUrls.length === 3 && index === 0 ? 'col-span-2 max-h-[400px]' : 'h-48 sm:h-64'
                      }`}
                    />
                  ))
                ) : (
                  <img 
                    src={post.thumbnailUrl} 
                    alt="Thumbnail"
                    className="w-full max-h-[600px] object-cover rounded-xl"
                  />
                )}
              </div>
            )}

            {/* Tags */}
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.hashtags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-[#D68C45] bg-[#D68C45]/10 border border-[#D68C45]/20 font-medium text-sm lg:text-base rounded-full px-3 py-1 cursor-pointer hover:bg-[#D68C45] hover:text-white transition-all"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* ĐỔI TÔNG MÀU TƯƠNG TÁC: Chuyển bg-[#DEDEDE] thành nền tối */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#3f3f3f] mb-8">
              <div className="flex items-center space-x-6 text-gray-400 font-medium">
                <span className="flex items-center space-x-2">
                  <FaUsers className="w-5 h-5 text-[#D68C45]" />
                  <span>{post.viewCount?.toLocaleString() || 0} lượt xem</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FaHeart className="w-5 h-5 text-[#D68C45]" />
                  <span>{post.likeCount || 0} lượt thích</span>
                </span>
                <span className="flex items-center space-x-2">
                  <FaComments className="w-5 h-5 text-[#D68C45]" />
                  <span>{post.commentCount || 0} bình luận</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLikePost}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold transition-all ${
                    post.isLikedByCurrentUser 
                      ? 'bg-[#D68C45] text-white shadow-[0_0_10px_rgba(214,140,69,0.3)]' 
                      : 'bg-[#383838] text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FaHeart className={post.isLikedByCurrentUser ? "scale-110" : ""} />
                  <span className="hidden sm:inline">{post.isLikedByCurrentUser ? 'Đã thích' : 'Thích'}</span>
                </button>
                <button className="p-2.5 bg-[#383838] text-gray-300 rounded-full hover:text-[#D68C45] transition-colors">
                  <FaShare className="w-5 h-5" />
                </button>
                <button className="p-2.5 bg-[#383838] text-gray-300 rounded-full hover:text-[#D68C45] transition-colors">
                  <FaBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-4">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-6">
                Bình luận ({post.commentCount || comments.length})
              </h3>
              
              {error && (
                <div className="mb-4 p-4 bg-red-900/40 border border-red-800 text-red-200 rounded-lg flex justify-between">
                  <span>{error}</span>
                  <button onClick={() => setError(null)} className="font-bold text-xl">×</button>
                </div>
              )}

              {/* ĐỔI TÔNG MÀU FORM BÌNH LUẬN: Chuyển input thành textarea để giống Facebook, đổi bg thành tối */}
              <div className="flex items-start space-x-4 mb-8">
                <img 
                  src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
                  alt="User Avatar"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-gray-700"
                />
                <div className="flex-1 relative">
                  <textarea
                    placeholder="Viết bình luận..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleAddComment();
                      }
                    }}
                    className="w-full bg-[#383838] text-white placeholder-gray-400 px-5 py-4 rounded-2xl border border-[#4f4f4f] focus:border-[#D68C45] focus:outline-none resize-none min-h-[90px]"
                  />
                  <button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="absolute bottom-3 right-3 bg-[#D68C45] text-white p-2 sm:px-4 sm:py-2 rounded-xl font-semibold hover:bg-[#B87A3A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <span className="hidden sm:inline">Gửi</span>
                    <FaPaperPlane />
                  </button>
                </div>
              </div>

              {/* ĐỔI TÔNG MÀU DANH SÁCH BÌNH LUẬN */}
              {commentsLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 animate-pulse">Đang tải bình luận...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-8 bg-[#383838]/30 rounded-2xl border border-[#4f4f4f] border-dashed">
                  <p className="text-gray-400">Hãy là người đầu tiên bình luận về bài viết này.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3 sm:space-x-4">
                      <img 
                        src={comment.userAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
                        alt={comment.userName}
                        className="w-10 h-10 rounded-full object-cover border border-[#4f4f4f]"
                      />
                      <div className="flex-1">
                        <div className="bg-[#383838]rounded-2xl rounded-tl-none px-5 py-4 inline-block w-full sm:w-auto">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-bold text-white">{comment.userName || 'Ẩn danh'}</span>
                            <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-200 text-sm sm:text-base break-words">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}