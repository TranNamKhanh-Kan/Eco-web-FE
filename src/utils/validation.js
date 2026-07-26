// Validation utilities cho form authentication

/**
 * Validate email format
 * @param {string} email 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: "Email không được để trống" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Email không đúng định dạng" };
  }
  
  return { isValid: true, message: "" };
};

/**
 * Validate username
 * @param {string} username 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, message: "Username không được để trống" };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: "Username phải dài hơn 3 ký tự" };
  }
  
  return { isValid: true, message: "" };
};

/**
 * Validate password - KHỚP VỚI BACKEND RULES
 * Backend yêu cầu:
 * - Tối thiểu 6 ký tự
 * - Ít nhất 1 chữ hoa [A-Z]
 * - Ít nhất 1 chữ thường [a-z]
 * - Ít nhất 1 số [0-9]
 * 
 * @param {string} password 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Mật khẩu không được để trống" };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: "Mật khẩu phải dài hơn 6 ký tự" };
  }
  
  // Check chữ hoa
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "Mật khẩu phải chứa ít nhất 1 ký tự hoa" };
  }
  
  // Check chữ thường
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: "Mật khẩu phải chứa ít nhất 1 ký tự thường" };
  }
  
  // Check số
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "Mật khẩu phải chứa ít nhất 1 số" };
  }
  
  return { isValid: true, message: "" };
};

/**
 * Validate confirm password
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: "Xác nhận mật khẩu không được để trống" };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: "Mật khẩu xác nhận không khớp" };
  }
  
  return { isValid: true, message: "" };
};

/**
 * Validate OTP/Verification code (6 digits)
 * @param {string} code 
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateVerificationCode = (code) => {
  if (!code) {
    return { isValid: false, message: "Mã xác thực không được để trống" };
  }
  
  if (!/^\d{6}$/.test(code)) {
    return { isValid: false, message: "Mã xác thực phải là 6 chữ số" };
  }
  
  return { isValid: true, message: "" };
};

/**
 * Get password strength và hiển thị tiến độ
 * @param {string} password 
 * @returns {object} { strength: string, score: number, color: string }
 */
export const getPasswordStrength = (password) => {
  if (!password) {
    return { strength: "Rất yếu", score: 0, color: "gray" };
  }
  
  let score = 0;
  
  // Length check
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special chars
  
  // Determine strength
  if (score <= 2) {
    return { strength: "Yếu", score, color: "red" };
  } else if (score <= 4) {
    return { strength: "Trung bình", score, color: "orange" };
  } else if (score <= 5) {
    return { strength: "Mạnh", score, color: "yellow" };
  } else {
    return { strength: "Rất mạnh", score, color: "green" };
  }
};





