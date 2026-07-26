import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/homepage/logo.png";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
  };

  return (
    <footer className="bg-[#2A2A2A] py-7 xl:py-[3vh] 2xl:pb-[3.5vh] justify-center">
      <div className="max-w-6xl xl:max-w-[83vw] 2xl:max-w-[83vw] h-auto mx-auto px-4 md:px-10 xl:px-[4vw] 2xl:px-[5vw] ">
        <div className="flex flex-col items-center px-0 md:px-20 lg:px-[6vw] 2xl:px-[5vw]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-[7vw] 2xl:gap-[7vw] ">
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt="Footer Logo"
                onClick={handleLogoClick}
                className="w-[165px] h-[165px] xl:w-[12vw] xl:h-[12vw] 2xl:w-[13vw] 2xl:h-[12vw] cursor-pointer hover:opacity-80 transition-opacity duration-300"
              />
            </div>

            <div className="md:col-span-2 flex flex-col justify-center mb-3 xl:mb-[2vh] 2xl:mb-[1vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xl:gap-[7vw] 2xl:gap-[7vw] text-left">
                <div className="space-y-2"></div>

                <div className="space-y-2">
                  <h4 className="text-white text-lg xl:text-lg 2xl:text-2xl font-bold">
                    LIÊN HỆ
                  </h4>
                  <div className="space-y-1">
                    <p className="text-white text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.8rem] ">
                      Địa chỉ: TP.Hồ Chí Minh
                    </p>
                    <p className="text-white text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.8rem] ">
                      Email: wtrannamkhanh@gmail.com
                    </p>
                    
                    <p className="text-white text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.8rem] ">
                      Điện thoại: 0373713955
                    </p>
                    
                    <div className="pt-2">
                      <button
                        onClick={() => navigate('/terms-of-service')}
                        className="block text-white text-xs xl:text-xs 2xl:text-sm hover:text-[#D68C45] transition-colors duration-300 text-left "
                      >
                        Điều khoản sử dụng
                      </button>
                      <button
                        onClick={() => navigate('/privacy-policy')}
                        className="block text-white text-xs xl:text-xs 2xl:text-sm hover:text-[#D68C45] transition-colors duration-300 text-left "
                      >
                        Chính sách bảo mật
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[100%] border-t border-white pt-4 xl:pt-[2vh] 2xl:pt-[2.5vh] flex flex-col md:flex-row items-center">
            <div className="hidden md:block flex-1"></div>
            <p className="text-white text-[0.6rem] xl:text-[0.6rem] 2xl:text-[0.8rem] text-center flex-1 w-full md:w-auto mb-4 md:mb-0">
              ©2025 TRAN NAM KHANH - KAN
            </p>
            <div className="flex items-center space-x-5 xl:space-x-[1.2vw] 2xl:space-x-[1.1vw] flex-1 justify-end w-full md:w-auto pe-0 md:pe-10">
              <SocialLinks
                iconSize="w-3 h-3 xl:w-[0.8vw] xl:h-[0.8vw] 2xl:w-[0.8vw] 2xl:h-[0.8vw]"
                iconColor="text-white"
                hoverColor="hover:text-[#D68C45]"
                className="gap-5"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}