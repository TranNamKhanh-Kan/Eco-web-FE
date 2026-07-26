import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLeafOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  getPasswordStrength,
} from "../../utils/validation";
import logo from "../../assets/homepage/logo_xanh.png";

export default function Register({ onClose, onSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    strength: "",
    score: 0,
    color: "gray",
  });
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time password strength indicator
    if (name === "password") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Username
    const usernameValidation = validateUsername(formData.username);
    if (!usernameValidation.isValid) {
      setError(usernameValidation.message);
      return;
    }

    // Validate Email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.message);
      return;
    }

    // Validate Password (khớp với BE rules)
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return;
    }

    // Validate Confirm Password
    const confirmPasswordValidation = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );
    if (!confirmPasswordValidation.isValid) {
      setError(confirmPasswordValidation.message);
      return;
    }

    setIsLoading(true);
    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword,
    );
    setIsLoading(false);

    if (result.success) {
      // Lưu email để dùng ở trang verify
      localStorage.setItem("registerEmail", formData.email);
      alert(result.message);
      // Chuyển sang trang verify email thay vì login
      onSwitch("verify-email");
    } else {
      setError(result.message);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError("");
      setIsLoading(true);

      const result = await googleLogin(tokenResponse.access_token);

      setIsLoading(false);

      if (result.success) {
        alert("Đăng ký Google thành công!");
        navigate("/");
      } else {
        setError(result.message);
      }
    },
    onError: () => {
      setError("Đăng ký Google thất bại. Vui lòng thử lại.");
    },
  });

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
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 md:w-25 md:h-25 object-contain"
              />
            </div>
          </div>

          <h2 className="mt-3 text-2xl md:text-3xl text-center flex items-center justify-center mb-6 md:mb-8 font-semibold text-gray-800">
            Tạo tài khoản
            <IoLeafOutline className="ml-2 w-5 h-5 md:w-6 md:h-6 text-[#d68c45]" />
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-4 md:mt-8 space-y-2 flex flex-col items-center"
          >
            {/* Error Message */}
            {error && (
              <div className="w-full md:w-[70%] bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm mb-2">
                {error}
              </div>
            )}

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Tên người dùng
                </label>
              </div>
              <input
                type="text"
                name="username"
                placeholder="Tên của bạn"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
              />
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Mật khẩu
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Tối thiểu 6 ký tự, có chữ hoa, chữ thường và số"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
              />
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="w-full md:w-[70%] mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength.color === "red"
                            ? "bg-red-500 w-1/4"
                            : passwordStrength.color === "orange"
                              ? "bg-orange-500 w-1/2"
                              : passwordStrength.color === "yellow"
                                ? "bg-yellow-500 w-3/4"
                                : passwordStrength.color === "green"
                                  ? "bg-green-500 w-full"
                                  : "bg-gray-300 w-0"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength.color === "red"
                          ? "text-red-500"
                          : passwordStrength.color === "orange"
                            ? "text-orange-500"
                            : passwordStrength.color === "yellow"
                              ? "text-yellow-600"
                              : passwordStrength.color === "green"
                                ? "text-green-500"
                                : "text-gray-400"
                      }`}
                    >
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Yêu cầu: Chữ hoa, chữ thường, số
                  </p>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="w-full md:w-[70%] flex justify-between items-center mb-2 md:mb-3">
                <label className="block text-sm font-medium text-black">
                  Xác nhận mật khẩu
                </label>
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full md:w-[70%] px-4 py-3 md:py-2 border border-gray-200 rounded-xl bg-[#F7FBFF] focus:outline-none focus:ring-2 focus:ring-[#d68c45] focus:border-transparent transition-all text-base"
              />
            </div>

            <div className="w-full md:w-[70%] flex justify-end text-sm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSwitch("login");
                }}
                className="text-[#1E4AE9] hover:text-[#1E4AE9] hover:underline transition-colors font-medium mb-3 mt-1"
              >
                Đã có tài khoản? Đăng nhập
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full md:w-[70%] py-3 md:py-2 rounded-xl font-semibold transition-colors shadow-md text-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#1E2C34] text-white hover:bg-[#2E424E]"
              }`}
            >
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <div className="mt-6 md:mt-8 space-y-3 md:space-y-4 flex flex-col items-center">
            <button
              type="button"
              disabled
              className="w-full md:w-[50%] flex items-center justify-center gap-4 py-3 md:py-2 bg-gray-100 border border-gray-200 rounded-xl opacity-50 cursor-not-allowed"
            >
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <FaFacebookF className="text-white w-4 h-4" />
              </div>
              <span className="text-black font-medium text-sm md:text-base whitespace-nowrap">
                Đăng ký với Facebook (Coming soon)
              </span>
            </button>
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className={`w-full md:w-[50%] flex items-center justify-center gap-4 py-3 md:py-2 bg-gray-100 border border-gray-200 rounded-xl transition-colors ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              <FcGoogle className="w-7 h-7 flex-shrink-0" />
              <span className="text-black font-medium text-sm md:text-base whitespace-nowrap">
                Đăng ký với Gmail
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
