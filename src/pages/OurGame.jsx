import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import heroImage from "../assets/C.H.A.M/our_game/hero.png";
import gameBackground from "../assets/C.H.A.M/our_game/bg.png";
import gameInterface from "../assets/C.H.A.M/our_game/game.png";

export default function OurGame() {
  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <Header />

      {/* Main Content Section */}
      <section className="relative w-full bg-white">
        <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
          <Navbar />
        </div>

        {/* Hero Section */}
        <section className="relative w-full md:h-auto lg:h-screen mt-[-16px] md:-mt-[20spx] lg:-mt-[102px] xl:-mt-[102px] 2xl:-mt-[132px]">
          {/* Background Image */}
          <div className="relative w-full h-full lg:absolute lg:inset-0">
            <img
              src={heroImage}
              alt="C.H.A.M Game Hero Background"
              className="w-full h-auto lg:h-full object-contain lg:object-cover"
            />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-10 flex items-center justify-center h-full pointer-events-none">
            <div className="container mx-auto px-4 md:px-6 pointer-events-auto">
              <div className="flex justify-center items-center md:mt-10 lg:-mt-15 2xl:-mt-25">
                <div className="text-center space-y-3">
                  {/* Download Button */}
                  <div
                    className="flex justify-center items-center min-[2200px]:mt-20"
                  >
                    <a
                      href="/CHAMsetup.exe"
                      download="CHAMsetup.exe"
                      className="text-white text-xl md:text-2xl 2xl:text-3xl font-bold px-8 py-2 md:px-11 md:py-1.5 2xl:py-2.5 2xl:px-14 rounded-[15px] 2xl:rounded-[20px] bg-[#CB1622] border-white border-2 md:border-3 transition-all duration-300 hover:bg-[#a9121c] hover:shadow-xl transform hover:scale-105 min-[2880px]:text-[2rem] min-[2880px]:px-8 min-[2880px]:py-4"
                    >
                      Tải Game Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Interface Section */}
        <section className="relative pt-10 md:pt-20 pb-10">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={gameBackground}
              alt="Forest Background with Rain Effect"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Rain effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-200/10 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 md:gap-0">
              {/* Game Interface Image */}
              <div className="w-full flex justify-center">
                <img
                  src={gameInterface}
                  alt="C.H.A.M Game Interface"
                  className="max-w-4xl w-full rounded-2xl shadow-2xl border-2 md:border-5 border-white"
                />
              </div>

              {/* Description */}
              <div className="max-w-4xl rounded-2xl p-4 md:p-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Tính năng kết nối thời tiết thực
                </h3>
                <p className="text-white text-base md:text-lg leading-relaxed text-justify md:text-left">
                  C.H.A.M kết nối trực tiếp với thời tiết theo thời gian thực
                  với các điểm trồng cây, cho phép cây ảo của bạn phát triển dựa
                  trên điều kiện thời tiết thực tế. Trong những ngày nắng hạn,
                  người chơi sẽ cần chăm sóc cây cẩn thận hơn. Tính năng này
                  không chỉ mang lại trải nghiệm chân thực, mà còn giúp người
                  chơi hiểu rõ thời tiết ảnh hưởng đến sự phát triển của cây ra
                  sao, đồng thời nâng cao nhận thức về biến đổi khí hậu. Không
                  chỉ thế, đây là minh chứng rõ ràng nhất cho sự kết nối giữa
                  hành động số và tác động thật, nơi mỗi thay đổi của thời tiết
                  đều được phản ánh chân thực trong trải nghiệm của bạn.
                </p>
              </div>

              {/* Joining the Journey Section */}
              <div className="w-full mt-10 md:mt-30 px-0 md:px-8 lg:px-20">
                <div className="flex flex-row justify-center md:justify-between items-center gap-3 md:gap-0">
                  {/* Text with Gradient */}
                  <div className="text-center md:text-left shrink-0">
                    <h2
                      className="text-lg md:text-3xl lg:text-5xl font-bold pb-0 md:pb-5 whitespace-nowrap"
                      style={{
                        background:
                          "linear-gradient(135deg, #ffffff 0%, #60DEF2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Cùng tham gia ngay
                    </h2>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex justify-center">
                    <SocialLinks
                      iconSize="w-6 h-6 md:w-7 md:h-7 2xl:w-12 2xl:h-12"
                      iconColor="text-white"
                      hoverColor="hover:scale-110"
                      className="gap-2 md:gap-6 2xl:gap-14"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
