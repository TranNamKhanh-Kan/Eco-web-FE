import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import img1 from "../assets/news/1.png";
import img2 from "../assets/news/2.png";
import newAppImage from "../assets/news/new_app.png";
import plantingTreeImage from "../assets/news/planting_tree.png";
import act1Image from "../assets/news/act1.png";
import act2Image from "../assets/news/act2.png";
import missionImage from "../assets/news/mission.png";

export default function News() {
  return (
    <>
      <Header />

      <section className="relative w-full bg-white">
        <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
          <Navbar />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pt-6 sm:pt-8 md:pt-10">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D68C45]">
              TIN TỨC!
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pb-12 sm:pb-14 md:pb-16">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-7">
            <div className="mb-16 bg-white rounded-lg p-6 sm:p-5 md:p-6 col-span-1 md:col-span-2 flex flex-col justify-start items-center text-center">
              <div className="mb-4 w-full flex justify-center">
                <img
                  src={img1}
                  alt="Cập nhật ứng dụng"
                  className="w-full h-auto md:h-full object-cover rounded-lg mx-auto"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl text-black mb-3 w-full text-center">
                Sắp ra mắt
              </h3>
              <p className="text-base sm:text-md text-black leading-relaxed w-full text-center">
                Phiên bản C.H.A.M mới nhất sắp ra mắt, bổ sung đồng bộ thời tiết
                theo thời gian thực và cải thiện theo dõi tác động cho tất cả cây ảo.
              </p>
            </div>

            <div className="mb-20 bg-white text-center flex flex-col justify-center items-center rounded-lg p-4 col-span-3">
              <h3 className="text-2xl xl:text-4xl 2xl:text-5xl font-bold text-black mb-4 2xl:mb-8 text-center">
                Cùng nhau phát triển
              </h3>
              <div className="space-y-1 mb-4 sm:mb-5 md:mb-6 flex flex-col items-center w-full">
                <p className="xl:text-2xl 2xl:text-3xl text-black text-center w-full">
                  Mỗi cây đều có một câu chuyện.
                </p>
                <p className="xl:text-2xl 2xl:text-3xl text-black text-center w-full">
                  Mọi hành động đều tạo hiệu ứng lan tỏa.
                </p>
              </div>
              <button
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=61581382018162",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="text-xl xl:text-2xl 2xl:text-3xl text-black bg-transparent border-2 border-black text-[#D68C45] px-6 py-1 xl:px-8 xl:py-2 2xl:px-10 2xl:py-3 rounded-lg xl:rounded-2xl 2xl:rounded-2xl font-bold hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Theo dõi E.C.O
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 sm:p-5 md:p-6 col-span-1 md:col-span-2 flex flex-col justify-start items-center text-center">
              <div className="mb-4 w-full flex justify-center">
                <img
                  src={img2}
                  alt="Phần thưởng mới"
                  className="w-full h-auto md:h-full object-cover rounded-lg mx-auto"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl text-black mb-3 w-full text-center">
                Sắp ra mắt
              </h3>
              <p className="text-base sm:text-md text-black leading-relaxed w-full text-center">
                Các loài cây độc quyền và huy hiệu xanh đặc biệt sẽ sớm có sẵn
                cho những người chơi C.H.A.M hàng đầu trong tháng này.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}