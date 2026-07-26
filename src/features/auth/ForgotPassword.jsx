import React, { useState } from "react";
import { IoLeafOutline } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/homepage/logo_xanh.png";

export default function ForgotPassword({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Vui lòng nhập địa chỉ email của bạn");
      return;
    }

    setIsLoading(true);
    const result = await forgotPassword(email);
    setIsLoading(false);

    if (result.success) {
      alert(result.message);
      // Store email for reset password page
      localStorage.setItem("resetEmail", email);
      onSwitch("change-password");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden p-4 md:px-[10%] lg:px-[15%] pt-[1%]">
      <div className="relative bg-white rounded-[30px] md:rounded-[50px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full max-w-2xl mx-auto overflow-hidden border border-gray-100 py-10 md:py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-20 w-[300px] h-[3px] bg-green-600 transform -rotate-45 origin-left" />
          <div className="absolute top-0 -right-20 w-[250px] h-[3px] bg-orange-500 transform rotate-45 origin-right" />
          <div className="absolute bottom-0 -left-16 w-[280px] h-[3px] bg-green-700 transform rotate-30 origin-left" />
          <div className="absolute bottom-0 -right-16 w-[240px] h-[3px] bg-orange-600 transform -rotate-30 origin-right" />
        </div>

        <div className="px-6 md:px-12 pt-8 pb-10 relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="rounded-2xl">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 md:w-25 md:h-25 object-contain"
              />
            </div>
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl text-center flex items-center justify-center mb-6 md:mb-8 font-semibold text-gray-800">
            Quên mật khẩu
            <IoLeafOutline className="ml-2 w-5 h-5 md:w-6 md:h-6 text-[#d68c45]" />
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-4 md:mt-8 space-y-4 flex flex-col items-center"
          >
            {/* Error Message */}
            {error && (
              <div className="w-full md:w-[70%] bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
              </div>
              <div className="w-full md:w-[70%] relative">
                <input
                  type="email"
                  placeholder="Email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 md:py-2 pr-20 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
                  required
                />
              </div>
            </div>

            <div className="w-full md:w-[70%] flex flex-col md:flex-row justify-between items-center text-sm gap-3 md:gap-0 my-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("login");
                }}
                className="text-[#1E4AE9] hover:text-[#1E4AE9] hover:underline transition-colors font-medium"
              >
                Quay lại đăng nhập
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("register");
                }}
                className="text-[#1E4AE9] hover:text-[#1E4AE9] hover:underline transition-colors font-medium"
              >
                Chưa có tài khoản? Đăng ký
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-[70%] py-3 md:py-2 rounded-xl font-semibold transition-colors shadow-md text-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#1E2C34] hover:bg-[#2E424E]"
              } text-white`}
            >
              {isLoading ? "Đang gửi..." : "Gửi OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
