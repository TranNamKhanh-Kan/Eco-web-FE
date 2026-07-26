import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import {
  FaUsers,
  FaHeart,
  FaTree,
  FaComments,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
  FaHashtag,
  FaPaperPlane,
  FaEllipsisH,
  FaCode,
  FaClipboard,
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaLink,
  FaTimes,
  FaSignInAlt
} from "react-icons/fa";
import {
  getPosts,
  createPost,
  toggleLikePost,
  getTrendingHashtags,
  uploadMedia,
  searchHashtags
} from "../utils/communityApi";
import { getEvents, joinEvent } from "../utils/eventApi";
import { useAuth } from "../contexts/AuthContext";
import hero from "../assets/get_involved/community/hero.png";
import logo from "../assets/homepage/logo.png";

// Helper function to format time ago
const formatTimeAgo = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) return "Vừa xong";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 604800)} tuần trước`;
  return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
};

export default function Community() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postHashtags, setPostHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtagSuggestions, setHashtagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const sampleEvents = [
    {
      id: 1,
      title: "Ngày Trồng Cây Cộng Đồng",
      date: "2025-01-15",
      location: "Rừng Cúc Phương",
      description: "Cùng nhau trồng 1000 cây xanh tại Rừng Cúc Phương",
      participants: 150,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
    },
    {
      id: 2,
      title: "Workshop Bảo Vệ Môi Trường",
      date: "2025-01-20",
      location: "Hà Nội",
      description: "Học cách bảo vệ môi trường từ các chuyên gia",
      participants: 80,
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
    },
    {
      id: 3,
      title: "Clean Up Day",
      date: "2025-01-25",
      location: "Bãi biển Đà Nẵng",
      description: "Dọn dẹp rác thải tại bãi biển Đà Nẵng",
      participants: 200,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
    },
  ];

  const sampleTestimonials = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Sinh viên",
      content:
        "Tham gia cộng đồng E.C.O đã thay đổi cách nhìn của tôi về môi trường. Tôi cảm thấy mình đang góp phần tích cực cho tương lai.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    },
    {
      id: 2,
      name: "Trần Thị B",
      role: "Giáo viên",
      content:
        "Các hoạt động của E.C.O rất ý nghĩa và thiết thực. Học sinh của tôi rất hào hứng khi tham gia các chương trình.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
    },
    {
      id: 3,
      name: "Lê Văn C",
      role: "Doanh nhân",
      content:
        "E.C.O giúp tôi kết nối với những người có cùng chí hướng bảo vệ môi trường. Đây là một cộng đồng tuyệt vời.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
  ];

  const samplePosts = [
    {
      id: 1,
      title:
        "Kinh nghiệm trồng cây tại Rừng Cúc Phương - Chia sẻ từ thành viên",
      content:
        "Hôm nay tôi muốn chia sẻ kinh nghiệm trồng cây tại Rừng Cúc Phương. Đây là lần đầu tiên tôi tham gia hoạt động này và cảm thấy rất ý nghĩa...",
      author: "Nguyễn Văn A",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      timeAgo: "2 ngày trước",
      tags: ["trồng cây", "kinh nghiệm", "cúc phương"],
      views: 1250,
      likes: 89,
      comments: 23,
      isLiked: false,
      thumbnail:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300",
    },
    {
      id: 2,
      title: "Cách bảo vệ môi trường từ những hành động nhỏ hàng ngày",
      content:
        "Bảo vệ môi trường không cần những hành động lớn lao. Chỉ cần những thay đổi nhỏ trong cuộc sống hàng ngày...",
      author: "Trần Thị B",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100",
      timeAgo: "1 tuần trước",
      tags: ["bảo vệ môi trường", "hành động", "cuộc sống"],
      views: 2100,
      likes: 156,
      comments: 45,
      isLiked: true,
      thumbnail:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300",
    },
    {
      id: 3,
      title: "Tham gia Clean Up Day tại Đà Nẵng - Trải nghiệm tuyệt vời",
      content:
        "Cuối tuần vừa rồi tôi đã tham gia Clean Up Day tại bãi biển Đà Nẵng. Đây là một trải nghiệm rất ý nghĩa và bổ ích...",
      author: "Lê Văn C",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      timeAgo: "3 ngày trước",
      tags: ["clean up", "đà nẵng", "trải nghiệm"],
      views: 890,
      likes: 67,
      comments: 18,
      isLiked: false,
      thumbnail:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300",
    },
  ];

  // Load posts from API
  const loadPosts = async (tag = null, reset = false) => {
    try {
      if (reset) {
        setPostsLoading(true);
        setPageIndex(1);
      }

      const currentPage = reset ? 1 : pageIndex;
      const filters = {
        pageIndex: currentPage,
        pageSize: 10,
        status: "PUBLISHED",
      };

      if (tag) {
        filters.tag = tag;
      }

      const result = await getPosts(filters);

      if (reset) {
        setPosts(result.items || []);
      } else {
        setPosts((prev) => [...prev, ...(result.items || [])]);
      }

      setHasMorePosts((result.items || []).length === 10);
      setError(null);
    } catch (err) {
      console.error("Error loading posts:", err);
      setError("Không thể tải bài viết. Vui lòng thử lại sau.");
    } finally {
      setPostsLoading(false);
    }
  };

  // Load trending hashtags
  const loadTrendingHashtags = async () => {
    try {
      const tags = await getTrendingHashtags();
      setTrendingHashtags(tags || []);
    } catch (err) {
      console.error("Error loading trending hashtags:", err);
    }
  };

  // Load events from API
  const loadEvents = async () => {
    try {
      setEventsLoading(true);
      const result = await getEvents({ page: 1 });

      // Map EventDto to format used in frontend
      const mappedEvents = (result.items || []).map((event) => ({
        id: event.id,
        title: event.title,
        slug: event.slug,
        date: event.startDate,
        location: event.location,
        description: event.description,
        participants: event.currentParticipants,
        maxParticipants: event.maxParticipants,
        image: event.thumbnailUrl,
        isRegistered: event.isRegistered,
      }));

      setEvents(mappedEvents);
    } catch (err) {
      console.error("Error loading events:", err);
      // Fallback to sample data on error
      setEvents(sampleEvents);
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    setTestimonials(sampleTestimonials);
    loadEvents();
    loadPosts(selectedHashtag, true);
    loadTrendingHashtags();
  }, []);

  // Reload posts when hashtag filter changes
  useEffect(() => {
    if (posts.length > 0 || pageIndex > 1) {
      loadPosts(selectedHashtag, true);
    }
  }, [selectedHashtag]);

  // --- Kiểm tra đăng nhập trước khi mở form tạo bài ---
  const handleOpenCreatePost = () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true); // Mở popup xám nhắc nhở
    } else {
      setShowCreatePostModal(true); // Mở modal tạo bài
    }
  };

  // --- Hàm xử lý Hashtag có gọi API gợi ý ---
  const handleHashtagChange = async (e) => {
    const val = e.target.value;
    
    // Nếu gõ phím cách hoặc phẩy thì tự Add luôn
    if (val.includes(' ') || val.includes(',')) {
      addHashtag(val.replace(/[\s,]/g, ''));
      setShowSuggestions(false);
    } else {
      setHashtagInput(val);
      // Gọi API tìm hashtag nếu gõ text
      const cleanVal = val.replace("#", "").trim();
      if (cleanVal.length > 0) {
        try {
          const suggestions = await searchHashtags(cleanVal);
          setHashtagSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (err) { console.error(err); }
      } else {
        setShowSuggestions(false);
      }
    }
  };

  // --- XỬ LÝ ẢNH & VIDEO ---
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isVideo: file.type.startsWith('video/')
    }));
    
    // Giới hạn tối đa 4 file đính kèm
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 4));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeSelectedImage = (indexToRemove) => {
    setSelectedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[indexToRemove].preview);
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  const handleCreatePostModal = async () => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để tạo bài viết");
      navigate("/login");
      return;
    }

    if (postTitle.trim() && postContent.trim()) {
      try {
        setLoading(true);
        let uploadedMediaUrls = [];

        // 1. Upload file lên Cloudinary trước qua Backend
        if (selectedImages.length > 0) {
          const uploadPromises = selectedImages.map(img => uploadMedia(img.file));
          uploadedMediaUrls = await Promise.all(uploadPromises); // Mảng các URL trả về từ Cloudinary
        }

        // 2. Format Hashtag
        const hashtags = postHashtags.map((tag) =>
          tag.startsWith("#") ? tag : `#${tag}`
        );

        // 3. Gửi data tạo bài viết
        await createPost({
          title: postTitle.trim(),
          content: postContent.trim(),
          hashtags: hashtags,
          mediaUrls: uploadedMediaUrls,
          thumbnailUrl: uploadedMediaUrls.length > 0 ? uploadedMediaUrls[0] : null,
        });

        // 4. Reset form
        await loadPosts(selectedHashtag, true);
        setPostTitle("");
        setPostContent("");
        setPostHashtags([]);
        setHashtagInput("");
        setSelectedImages([]); // Reset file đính kèm
        setShowCreatePostModal(false);
        setError(null);
      } catch (err) {
        console.error("Error creating post:", err);
        setError("Không thể tạo bài viết. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
  };

  const openCreatePostModal = () => {
    setShowCreatePostModal(true);
  };

  const closeCreatePostModal = () => {
    setShowCreatePostModal(false);
    setPostTitle("");
    setPostContent("");
  };

  const handleLikePost = async (postId) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thích bài viết");
      navigate("/login");
      return;
    }

    try {
      await toggleLikePost(postId);

      // Update post like state optimistically
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            const newIsLiked = !post.isLikedByCurrentUser;
            return {
              ...post,
              isLikedByCurrentUser: newIsLiked,
              likeCount: newIsLiked
                ? post.likeCount + 1
                : Math.max(0, post.likeCount - 1),
            };
          }
          return post;
        }),
      );
    } catch (err) {
      console.error("Error toggling like:", err);
      setError("Không thể thích bài viết. Vui lòng thử lại sau.");
    }
  };

  const handlePostClick = (post) => {
    navigate(`/post/${post.slug}`);
  };

  const handleCommentClick = (post) => {
    navigate(`/post/${post.slug}`);
  };

  const handleHashtagClick = (tagName) => {
    const cleanTag = tagName.replace("#", "");
    setSelectedHashtag(selectedHashtag === cleanTag ? null : cleanTag);
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace("#", "").toLowerCase();
    if (tag && !postHashtags.includes(tag)) {
      setPostHashtags([...postHashtags, tag]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (tagToRemove) => {
    setPostHashtags(postHashtags.filter((tag) => tag !== tagToRemove));
  };

  const handleJoinEvent = async (event) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để tham gia sự kiện");
      navigate("/login");
      return;
    }

    try {
      // Sử dụng thông tin từ user nếu đã đăng nhập
      await joinEvent(event.id, {
        participantName: user?.username || user?.email || "Người tham gia",
        participantEmail: user?.email || "",
        participantPhone: "",
      });

      // Update event state
      setEvents(
        events.map((e) =>
          e.id === event.id
            ? { ...e, isRegistered: true, participants: e.participants + 1 }
            : e,
        ),
      );

      setError(null);
    } catch (err) {
      console.error("Error joining event:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Không thể đăng ký tham gia sự kiện. Vui lòng thử lại sau.";
      setError(errorMessage);
    }
  };

  return (
    <>
      <Header />

      <section className="relative w-full items-center justify-center h-[60vh] lg:h-[50vw] select-none mb-12">
        <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
          <Navbar />
        </div>
        <img
          src={hero}
          alt="Background"
          className="absolute inset-0 w-full h-full "
        />

        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center px-4">
            <div>
              <img
                src={logo}
                alt="Plant Pot Logo"
                className="w-32 h-32 sm:w-32 sm:h-32 xl:w-40 xl:h-40 2xl:w-72 2xl:h-68 xl:-my-3 2xl:-mt-6 mx-auto"
                draggable={false}
              />
            </div>

            <div className="text-white font-extrabold text-xl sm:text-2xl  xl:text-[3.1rem] 2xl:text-7xl text-center mb-6 sm:mb-10 2xl:mb-20 tracking-tight drop-shadow  mx-15">
              CÙNG NHAU TẠO NÊN NHỮNG THAY ĐỔI TÍCH CỰC CHO MÔI TRƯỜNG
            </div>
            <div className="flex items-center justify-center">
              <SocialLinks
                iconSize="w-4 h-4 lg:w-6 lg:h-6 2xl:w-8 2xl:h-8"
                iconColor="text-white"
                hoverColor="hover:scale-110"
                className="gap-4"
                customWrapper={(children) => <div className="">{children}</div>}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 2xl:py-24 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold text-black mb-4">
              Sự Kiện Sắp Tới
            </h2>
            <p className="text-lg lg:text-xl 2xl:text-2xl text-gray-600 max-w-3xl mx-auto">
              Tham gia các hoạt động cộng đồng và cùng nhau bảo vệ môi trường
            </p>
          </div>

          {eventsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Đang tải sự kiện...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Chưa có sự kiện nào.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 lg:h-56 2xl:h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 lg:h-56 2xl:h-64 bg-gray-200 flex items-center justify-center">
                      <FaCalendarAlt className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl 2xl:text-3xl font-bold text-black mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm lg:text-base 2xl:text-lg">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="w-4 h-4 mr-2 text-[#D68C45]" />
                        <span className="text-sm lg:text-base 2xl:text-lg">
                          {new Date(event.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[#D68C45]" />
                        <span className="text-sm lg:text-base 2xl:text-lg">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaUsers className="w-4 h-4 mr-2 text-[#D68C45]" />
                        <span className="text-sm lg:text-base 2xl:text-lg">
                          {event.participants}{" "}
                          {event.maxParticipants
                            ? `/${event.maxParticipants}`
                            : ""}{" "}
                          người tham gia
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinEvent(event)}
                      disabled={event.isRegistered}
                      className={`w-full py-3 lg:py-3 rounded-xl font-semibold transition-colors duration-300 ${
                        event.isRegistered
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#D68C45] text-white hover:bg-[#B87A3A]"
                      }`}
                    >
                      {event.isRegistered ? "Đã Tham Gia" : "Tham Gia Ngay"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20 2xl:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-4">
              Diễn Đàn Cộng Đồng
            </h2>
            <p className="text-lg lg:text-xl 2xl:text-2xl text-gray-300 max-w-3xl mx-auto">
              Chia sẻ kinh nghiệm, đặt câu hỏi và kết nối với những người có
              cùng đam mê bảo vệ môi trường
            </p>
          </div>

          {/* Trending Hashtags */}
          {trendingHashtags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Hashtag Phổ Biến
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedHashtag && (
                  <button
                    onClick={() => setSelectedHashtag(null)}
                    className="px-4 py-2 bg-[#D68C45] text-white rounded-full hover:bg-[#B87A3A] transition-colors"
                  >
                    Tất cả ×
                  </button>
                )}
                {trendingHashtags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleHashtagClick(tag.tagName)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedHashtag === tag.tagName
                        ? "bg-[#D68C45] text-white"
                        : "bg-[#636363] text-gray-300 hover:bg-[#D68C45] hover:text-white"
                    }`}
                  >
                    #{tag.tagName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
              {error}
              <button onClick={() => setError(null)} className="ml-2 font-bold">
                ×
              </button>
            </div>
          )}

          <div className="bg-[#313131] rounded-2xl p-4 lg:p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <div className="flex items-center gap-4 flex-1 w-full">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                  alt="User Avatar"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="Chia sẻ những gì bạn đang nghĩ..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="flex-1 bg-[#636363] text-white placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:border-[#D68C45] focus:outline-none"
                  onClick={handleOpenCreatePost}
                  readOnly
                />
              </div>
              <button
                onClick={handleOpenCreatePost}
                className="bg-[#D68C45] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B87A3A] transition-colors duration-300 w-full lg:w-auto"
              >
                Tạo Bài Viết
              </button>
            </div>
          </div>

          {postsLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Đang tải bài viết...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Chưa có bài viết nào.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#313131] rounded-2xl p-4 lg:p-8 hover:bg-gray-750 transition-colors duration-300"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {post.thumbnailUrl ||
                      (post.mediaUrls && post.mediaUrls.length > 0) ? (
                        <img
                          src={post.thumbnailUrl || post.mediaUrls[0]}
                          alt="Post Thumbnail"
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-[#636363] flex items-center justify-center">
                          <FaImage className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg lg:text-xl 2xl:text-2xl font-bold text-white mb-2 hover:text-[#D68C45] transition-colors cursor-pointer truncate"
                        onClick={() => handlePostClick(post)}
                      >
                        {post.title}
                      </h3>

                      <p className="text-gray-300 text-sm lg:text-base 2xl:text-lg mb-4 line-clamp-2">
                        {post.content}
                      </p>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.hashtags.map((tag, index) => (
                            <span
                              key={index}
                              onClick={() => handleHashtagClick(tag)}
                              className="px-2 py-1 bg-[#636363] text-gray-300 text-xs lg:text-sm rounded-full hover:bg-[#D68C45] hover:text-white transition-colors cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                          />
                          <div>
                            <p className="text-white font-medium text-sm lg:text-base">
                              {post.authorName || "Unknown"}
                            </p>
                            <p className="text-gray-400 text-xs lg:text-sm">
                              {formatTimeAgo(post.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm lg:text-base">
                          <span>
                            {post.viewCount?.toLocaleString() || 0} lượt xem
                          </span>
                          <span>{post.likeCount || 0} lượt thích</span>
                          <span
                            className="cursor-pointer hover:text-[#D68C45] transition-colors"
                            onClick={() => handleCommentClick(post)}
                          >
                            {post.commentCount || 0} bình luận
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`p-2 rounded-full transition-colors ${
                          post.isLikedByCurrentUser
                            ? "text-[#D68C45] bg-[#D68C45]/20"
                            : "text-gray-400 hover:text-[#D68C45] hover:bg-[#D68C45]/10"
                        }`}
                      >
                        <FaHeart className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- POPUP YÊU CẦU ĐĂNG NHẬP --- */}
      {showAuthPopup && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#313131] rounded-3xl w-[90vw] max-w-md p-8 shadow-2xl border border-gray-700 text-center relative transform transition-all scale-100">
            <button onClick={() => setShowAuthPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white p-2">
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="w-20 h-20 bg-[#D68C45]/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(214,140,69,0.3)]">
              <FaSignInAlt className="w-8 h-8 text-[#D68C45] ml-1" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Đăng Nhập Bắt Buộc</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Bạn cần phải đăng nhập để tham gia thảo luận, tạo bài viết và chia sẻ cùng cộng đồng E.C.O.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-[#D68C45] text-white rounded-xl font-bold text-lg hover:bg-[#B87A3A] transition-all shadow-lg hover:shadow-[#D68C45]/50"
              >
                Đăng nhập ngay
              </button>
              <button
                onClick={() => setShowAuthPopup(false)}
                className="w-full py-3.5 bg-transparent border-2 border-gray-600 text-gray-300 rounded-xl font-semibold hover:border-gray-400 hover:text-white transition-all"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}


      {/* --- MODAL TẠO BÀI VIẾT (ĐÃ FIX LAYOUT + HASHTAG SUGGESTION) --- */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          
          {/* SỬA: Đổi overflow-y-auto thành flex flex-col max-h-[90vh] overflow-hidden */}
          <div className="bg-[#313131] rounded-2xl w-[95vw] md:w-[80vw] flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Header - Cố định (flex-shrink-0) */}
            <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Tạo Bài Viết
              </h2>
              <button
                onClick={closeCreatePostModal}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Body - Cho phép cuộn (flex-1 overflow-y-auto) */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                    alt="User Avatar"
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Tiêu đề bài viết..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 px-0 py-3 text-xl lg:text-2xl font-semibold border-none focus:outline-none"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    placeholder="Chia sẻ những gì bạn đang nghĩ..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 px-0 py-3 text-base lg:text-lg border-none focus:outline-none resize-none min-h-[120px]"
                    rows={4}
                  />
                </div>

                {/* --- Khu vực Preview Ảnh/Video đã chọn --- */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 mt-2">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-600 bg-black">
                        {img.isVideo ? (
                          <video src={img.preview} className="w-full h-24 object-cover" />
                        ) : (
                          <img src={img.preview} alt="Preview" className="w-full h-24 object-cover" />
                        )}
                        
                        <button
                          onClick={() => removeSelectedImage(index)}
                          className="absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hashtags display */}
                {postHashtags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {postHashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#636363] text-gray-300 rounded-full text-sm flex items-center gap-2"
                      >
                        #{tag}
                        <button
                          onClick={() => removeHashtag(tag)}
                          className="hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-4">
                    Thêm vào bài viết của bạn
                  </p>

                  {/* Input file ẩn */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageSelect} 
                    accept="image/jpeg, image/png, image/gif, image/webp, video/mp4, video/quicktime, video/x-msvideo, video/webm" 
                    multiple 
                    className="hidden" 
                  />

                  <div className="flex flex-wrap items-center gap-4 pb-2 relative">
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-[#636363] text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      <FaImage className="w-4 h-4 text-[#D68C45]" />
                      <span className="text-sm">Ảnh/Video</span>
                    </button>
                    
                    <button className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-[#636363] text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      <FaUsers className="w-4 h-4 text-[#D68C45]" />
                      <span className="text-sm">Gắn thẻ</span>
                    </button>

                    <button className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-[#636363] text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                      <FaMapMarkerAlt className="w-4 h-4 text-[#D68C45]" />
                      <span className="text-sm">Vị trí</span>
                    </button>

                    {/* SỬA: Gói ô input hashtag vào thẻ relative để popup dính liền với nó */}
                    <div className="flex-shrink-0 flex items-center space-x-2 relative">
                      <div className="flex items-center space-x-2 px-4 py-2 bg-[#636363] text-gray-300 rounded-lg">
                        <FaHashtag className="w-4 h-4 text-[#D68C45]" />
                        <input
                          type="text"
                          placeholder="Thêm hashtag"
                          value={hashtagInput}
                          onChange={handleHashtagChange} /* Đã dùng hàm handleHashtagChange ngắn gọn */
                          onBlur={() => { 
                            setTimeout(() => setShowSuggestions(false), 200); 
                            addHashtag(); 
                          }}
                          onKeyPress={(e) => { 
                            if (e.key === "Enter") { 
                              e.preventDefault(); 
                              addHashtag(); 
                              setShowSuggestions(false); 
                            } 
                          }}
                          className="bg-transparent text-white placeholder-gray-400 text-sm border-none focus:outline-none w-32"
                        />
                      </div>

                      {/* Popup Gợi ý Hashtag */}
                      {showSuggestions && hashtagSuggestions.length > 0 && (
                        <div className="absolute left-0 bottom-full mb-2 w-64 bg-[#1E1E1E] border border-gray-600 rounded-lg shadow-xl overflow-hidden z-50">
                          {hashtagSuggestions.map((tag) => (
                            <div 
                              key={tag.id}
                              onMouseDown={(e) => { 
                                e.preventDefault(); 
                                addHashtag(tag.tagName); 
                                setShowSuggestions(false); 
                              }}
                              className="px-4 py-3 hover:bg-[#313131] cursor-pointer flex justify-between items-center transition-colors border-b border-gray-700 last:border-none"
                            >
                              <span className="text-white font-medium text-sm">#{tag.tagName}</span>
                              <span className="text-xs text-gray-400 bg-black px-2 py-1 rounded-md">{tag.usageCount} bài</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Nút bấm - Cố định ở dưới cùng (flex-shrink-0) */}
            <div className="flex-shrink-0 p-6 border-t border-gray-700 bg-[#313131]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <span>🌍</span>
                  <span>Mọi người có thể xem</span>
                </div>
                <button
                  onClick={handleCreatePostModal}
                  disabled={!postTitle.trim() || !postContent.trim() || loading}
                  className="bg-[#D68C45] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B87A3A] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang đăng..." : "Đăng Bài"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
