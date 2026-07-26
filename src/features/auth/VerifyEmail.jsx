import React, { useState, useEffect } from "react";
import { IoLeafOutline, IoMailOutline } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthContext";
import { validateEmail, validateVerificationCode } from "../../utils/validation";
import logo from '../../assets/homepage/logo_xanh.png';

export default function VerifyEmail({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { verifyEmail, resendVerificationCode } = useAuth();

  // Load email from localStorage (từ trang register)
  useEffect(() => {
    const savedEmail = localStorage.getItem('registerEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // Countdown timer cho resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    // Validate Code
    const codeValidation = validateVerificationCode(code);
    if (!codeValidation.isValid) {
      setError(codeValidation.message);
      return;
    }

    setIsLoading(true);
    const result = await verifyEmail(email, code);
    setIsLoading(false);

    if (result.success) {
      alert("✅ " + result.message + "\nBạn có thể đăng nhập ngay bây giờ!");
      // Xóa email đã lưu
      localStorage.removeItem('registerEmail');
      // Chuyển sang trang login
      onSwitch("login");
    } else {
      setError(result.message);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return; // Đang trong thời gian chờ
    
    setError("");
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    setIsResending(true);
    const result = await resendVerificationCode(email);
    setIsResending(false);

    if (result.success) {
      alert("📧 Mã xác thực mới đã được gửi đến email của bạn!");
      setCountdown(60); // 60 giây chờ trước khi gửi lại
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden p-4 md:px-[10%] lg:px-[15%] pt-[1%]">
      <div className="relative bg-white rounded-[30px] md:rounded-[50px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full max-w-2xl mx-auto overflow-hidden border border-gray-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -left-20 w-[300px] h-[3px] bg-green-600 transform -rotate-45 origin-left" />
          <div className="absolute top-0 -right-20 w-[250px] h-[3px] bg-orange-500 transform rotate-45 origin-right" />
          <div className="absolute bottom-0 -left-16 w-[280px] h-[3px] bg-green-700 transform rotate-30 origin-left" />
          <div className="absolute bottom-0 -right-16 w-[240px] h-[3px] bg-orange-600 transform -rotate-30 origin-right" />
        </div>

        <div className="px-6 md:px-12 pt-8 pb-10 relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="rounded-2xl">
              <img src={logo} alt="Logo" className="w-20 h-20 md:w-25 md:h-25 object-contain" />
            </div>
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl text-center flex items-center justify-center mb-4 md:mb-6 font-semibold text-gray-800">
            Xác thực Email
            <IoLeafOutline className="ml-2 w-5 h-5 md:w-6 md:h-6 text-[#d68c45]" />
          </h2>

          {/* Info Box */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-full md:w-[70%] bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <IoMailOutline className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Kiểm tra email của bạn</p>
                <p className="text-blue-700">
                  Chúng tôi đã gửi mã xác thực 6 số đến email của bạn. 
                  Vui lòng nhập mã để kích hoạt tài khoản.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 md:mt-8 space-y-4 flex flex-col items-center">
            
            {/* Error Message */}
            {error && (
              <div className="w-full md:w-[70%] bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Ví dụ: example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Mã xác thực (6 số)
                </label>
              </div>
              <input
                type="text"
                name="code"
                placeholder="123456"
                value={code}
                onChange={(e) => {
                  // Chỉ cho phép nhập số và tối đa 6 ký tự
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setCode(value);
                }}
                maxLength={6}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base text-center text-2xl tracking-widest font-mono"
              />
              <p className="w-full md:w-[70%] text-xs text-gray-500 mt-2">
                Mã xác thực có hiệu lực trong 15 phút
              </p>
            </div>

            {/* Resend Code Button */}
            <div className="w-full md:w-[70%] flex justify-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={countdown > 0 || isResending}
                className={`text-sm font-medium transition-colors ${
                  countdown > 0 || isResending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#1E4AE9] hover:text-[#1E4AE9] hover:underline'
                }`}
              >
                {isResending 
                  ? "Đang gửi..." 
                  : countdown > 0 
                    ? `Gửi lại sau ${countdown}s` 
                    : "Không nhận được mã? Gửi lại"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-[70%] py-3 md:py-2 rounded-xl font-semibold transition-colors shadow-md text-lg ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-[#1E2C34] text-white hover:bg-[#2E424E]'
              }`}
            >
              {isLoading ? "Đang xác thực..." : "Xác thực"}
            </button>

            <div className="w-full md:w-[70%] flex justify-center text-sm mt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("login");
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}





