import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import api from "../utils/api";

export default function ContactUsPopup({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Auto-resize textarea
    if (e.target.name === 'message') {
      const textarea = e.target;
      textarea.style.height = 'auto';
      const computedStyles = window.getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyles.lineHeight || '20', 10);
      const maxLines = 3; // limit to 3 lines
      const maxHeight = lineHeight * maxLines;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + 'px';
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      
      // Gọi API POST /api/contacts
      await api.post("/api/contacts", {
        userName: formData.name.trim(),
        contactInfo: formData.contact.trim(),
        message: formData.message.trim()
      });

      // Thông báo thành công
      alert("Gửi liên hệ thành công!");
      
      // Reset form và đóng popup
      setFormData({
        name: "",
        contact: "",
        message: ""
      });
      onClose();
      
    } catch (error) {
      console.error("Contact submission error:", error);
      const errorMessage = error.response?.data?.message || "Gửi liên hệ thất bại. Vui lòng thử lại.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: "",
      contact: "",
      message: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[30px] p-15 max-w-3xl w-full h-[550px] mx-4 relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-8 text-[#D68C45] text-4xl hover:text-[#B87A3A] transition-colors"
        >
          ×
        </button>

        {/* Title */}
        <h2
          className="text-4xl font-bold text-[#D68C45] mb-6"
          
        >
          Liên hệ
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Field */}
          <div>
            <label
              className="block text-gray-500 text-xl font-semibold mb-2"
              
            >
              Tên liên hệ
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên của bạn"
              className="w-full px-0 py-2 text-sm border-b-2 border-gray-300 focus:border-[#D68C45] outline-none bg-transparent"
              
              required
            />
          </div>
          {/* Phone or Email Field */}
          <div>
            <label
              className="block text-gray-500 text-xl font-semibold mb-2"
              
            >
              Số điện thoại hoặc email
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Số điện thoại hoặc email"
              className="w-full px-0 py-2 text-sm border-b-2 border-gray-300 focus:border-[#D68C45] outline-none bg-transparent"
              
              required
            />
          </div>

          

           {/* Message Field */}
           <div>
             <label
               className="block text-gray-500 text-xl font-semibold mb-2"
               
             >
               Nội dung
             </label>
             <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nội dung"
                  rows="1"
                  className="w-full px-0 py-2 text-sm border-b-2 border-gray-300 focus:border-[#D68C45] outline-none bg-transparent leading-6 resize-none"
                  
                  required
                />
              
             </div>
           </div>

          {/* Send Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#D68C45] text-white w-[300px] text-lg py-2 rounded-xl font-bold flex items-center justify-center hover:bg-[#B87A3A] transition-colors duration-300 shadow-lg mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              
            >
              {isLoading ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
