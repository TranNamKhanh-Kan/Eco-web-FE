import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLeafOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/homepage/logo_xanh.png";

export default function Login({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setIsLoading(true);

      // tokenResponse.access_token là token từ Google
      const result = await googleLogin(tokenResponse.access_token);

      setIsLoading(false);

      if (result.success) {
        alert("Đăng nhập Google thành công!");
        navigate("/");
      } else {
        setError(result.message);
      }
    },
    onError: () => {
      setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
    },
  });

  return (
    // Container chính: Bỏ px-[20%], dùng px-4 cho mobile
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 md:px-0">
      {/* Card Form: Thêm w-full và max-w để giới hạn độ rộng hợp lý */}
      <div className="relative bg-white rounded-3xl md:rounded-[50px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full max-w-[500px] mx-auto overflow-hidden border border-gray-100">
        {/* Decorative diagonal lines - Giữ nguyên hiệu ứng */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-20 w-[300px] h-[3px] bg-green-600 transform -rotate-45 origin-left" />
          <div className="absolute top-0 -right-20 w-[250px] h-[3px] bg-orange-500 transform rotate-45 origin-right" />
          <div className="absolute bottom-0 -left-16 w-[280px] h-[3px] bg-green-700 transform rotate-30 origin-left" />
          <div className="absolute bottom-0 -right-16 w-[240px] h-[3px] bg-orange-600 transform -rotate-30 origin-right" />
        </div>

        {/* Content - Giảm padding trên mobile */}
        <div className="px-6 py-8 md:px-10 md:py-12 relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="rounded-2xl">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="mt-2 text-2xl md:text-3xl text-center flex items-center justify-center mb-6 md:mb-8 font-semibold text-gray-800">
            Chào mừng trở lại
            <IoLeafOutline className="ml-2 w-6 h-6 text-[#d68c45]" />
          </h2>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-5 md:space-y-6 flex flex-col items-center"
          >
            {/* Error Message */}
            {error && (
              <div className="w-full md:w-[80%] bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Input Email */}
            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[80%] flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
              </div>
              <input
                type="email"
                placeholder="Ví dụ: example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full md:w-[80%] px-4 py-3 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-sm md:text-base"
              />
            </div>

            {/* Input Password */}
            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[80%] flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-black">
                  Mật khẩu
                </label>
              </div>
              <input
                type="password"
                placeholder="ít nhất 8 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full md:w-[80%] px-4 py-3 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-sm md:text-base"
              />
            </div>

            {/* Links: Forgot password / Register */}
            <div className="w-full md:w-[80%] flex justify-between text-xs md:text-sm px-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("register");
                }}
                className="text-[#1E4AE9] hover:underline transition-colors font-medium text-left"
              >
                Chưa có tài khoản? <br className="hidden md:block" /> Đăng ký
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("forgot");
                }}
                className="text-[#1E4AE9] hover:underline transition-colors font-medium text-right"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-[80%] py-3 rounded-xl font-semibold transition-colors shadow-md text-base md:text-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#1E2C34] text-white hover:bg-[#2E424E]"
              }`}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Social Buttons */}
          <div className="mt-8 space-y-3 flex flex-col items-center">
            <button
              type="button"
              disabled
              className="w-full md:w-[70%] flex items-center justify-center gap-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl opacity-50 cursor-not-allowed"
            >
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                <FaFacebookF className="text-white w-3.5 h-3.5" />
              </div>
              <span className="text-black font-medium text-sm md:text-base truncate">
                Đăng nhập với Facebook (Coming soon)
              </span>
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className={`w-full md:w-[70%] flex items-center justify-center gap-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl transition-colors ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <FcGoogle className="w-6 h-6 shrink-0" />
              <span className="text-black font-medium text-sm md:text-base truncate">
                Đăng nhập với Gmail
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
