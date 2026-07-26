import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";
import ContactUsPopup from "./ContactUsPopup";
import SocialLinks from "./SocialLinks";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleDonateClick = () => {
    navigate("/sponsor");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  const handleContactClose = () => {
    setIsContactOpen(false);
  };

  const handleContactSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <header className="w-full bg-black flex items-center justify-between select-none h-[50px] lg:h-[55px] xl:h-[60px] 2xl:h-[74px] px-0 lg:px-14 xl:px-16 2xl:px-30">
      <div className="flex items-center gap-2 pl-3 lg:pl-7 xl:pl-8 2xl:pl-12 shrink-0">
        <div className="scale-75 lg:scale-100 origin-left">
          <SocialLinks
            iconSize="w-3 h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
            iconColor="text-white"
            hoverColor="hover:text-[#D68C45]"
          />
        </div>
        <button
          onClick={handleContactClick}
          className="hidden lg:block ml-2 lg:ml-4 text-[10px] sm:text-xs lg:text-md xl:text-md 2xl:text-lg text-white tracking-wide hover:text-[#D68C45] transition-colors cursor-pointer whitespace-nowrap"
        >
          LIÊN HỆ
        </button>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center h-full">
        <button
          onClick={handleDonateClick}
          className="h-full px-3 sm:px-6 lg:px-10 xl:px-10 2xl:px-12 bg-[#d68c45] rounded-none text-white text-[10px] sm:text-xs lg:text-md xl:text-md 2xl:text-lg hover:brightness-110 transition whitespace-nowrap font-medium"
        >
          QUYÊN GÓP
        </button>

        <button
          onClick={handleLoginClick}
          className="h-full flex items-center gap-1.5 px-3 sm:px-4 lg:px-10 xl:px-10 2xl:px-12 text-white text-[10px] sm:text-xs lg:text-md xl:text-md 2xl:text-lg border-l border-[#333] hover:bg-[#111] transition whitespace-nowrap"
        >
          <FaUser className="w-3 h-3" />
          <span>ĐĂNG NHẬP</span>
        </button>

        <div className="relative h-full">
          <button className="h-full bg-[#d68c45] rounded-none w-[40px] sm:w-[50px] lg:w-[68px] xl:w-[72px] 2xl:w-[84px] flex items-center justify-center hover:brightness-110 transition">
            <FaBell className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
          </button>
          <span className="absolute top-1 right-1 sm:right-2 lg:top-1.5 lg:right-2.5 bg-red-600 text-[9px] sm:text-[10px] rounded-full px-1 text-white min-w-[14px] text-center">
            0
          </span>
        </div>
      </div>

      <ContactUsPopup
        isOpen={isContactOpen}
        onClose={handleContactClose}
        onSubmit={handleContactSubmit}
      />
    </header>
  );
}
