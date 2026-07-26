import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUsPopup from "../components/ContactUsPopup";
import csrImage from "../assets/get_involved/become_a_sponsor/csr.png";
import handImage from "../assets/get_involved/become_a_sponsor/hand.png";

export default function BecomeSponsor() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);
  const toggleCard = () => setIsCardFlipped(!isCardFlipped);

  const handleContactSubmit = (formData) => {
    console.log("Contact form submitted:", formData);
  };

  return (
    <>
      <Header />

      <section className="relative w-full min-h-screen flex flex-col bg-[#C2BDB7]">
        <div className="sticky top-0 z-30 w-full">
          <Navbar />
        </div>

        <div className="flex-grow flex flex-col xl:flex-row items-center justify-center relative w-full py-10 xl:py-0">
          <div className="order-2 xl:absolute xl:right-[2vw] xl:top-0 xl:h-full xl:w-auto z-0 flex items-end justify-center mt-8 xl:mt-0 pointer-events-none">
            <img
              src={csrImage}
              alt="CSR Image"
              className="h-full w-auto object-contain opacity-60 xl:opacity-100 xl:max-w-[45vw]"
            />
          </div>

          <div className="order-1 relative z-10 w-full px-4 flex justify-center xl:justify-start lg:pl-[15vw] xl:pl-[12vw]">
            <div
              className="relative w-full max-w-md md:max-w-xl xl:w-[550px] h-[580px] md:h-[60px] xl:h-[600px] transition-transform duration-700 cursor-pointer"
              onClick={toggleCard}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className={`absolute inset-0 transition-all duration-1000 ${
                  isCardFlipped ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: isCardFlipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                <div className="bg-white rounded-3xl p-6 md:p-12 xl:p-10 shadow-xl w-full h-full flex flex-col justify-between">
                  <div className="flex items-center justify-center mt-0 mb-0 md:mt-0 md:mb-0">
                    <img
                      src={handImage}
                      alt="Partnership Handshake"
                      className="w-16 h-16 md:w-24 md:h-24 xl:w-24 xl:h-24 object-contain"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl xl:text-3xl font-bold text-[#D68C45] mb-2 md:mb-4 text-center">
                    Đồng hành cùng E.C.O
                  </h2>

                  <div className="flex-grow flex flex-col justify-center space-y-2 md:space-y-4 overflow-y-auto pr-2">
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      E.C.O là bạn đồng hành lý tưởng dành cho các doanh nghiệp
                      muốn triển khai hoạt động CSR/ESG (Trách nhiệm xã hội, Môi
                      trường và Quản trị doanh nghiệp) một cách minh bạch, hiệu
                      quả và dễ truyền thông.
                    </p>
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      Chúng tôi mang đến một nền tảng độc đáo, kết hợp giữa công
                      nghệ, cảm xúc và tác động môi trường thực tế, giúp mỗi
                      đóng góp của doanh nghiệp trở nên ý nghĩa và được ghi nhận
                      rõ ràng.
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openContact();
                    }}
                    className="mt-0 md:mt-6 bg-black text-white font-bold py-3 rounded-2xl w-full hover:bg-gray-800 transition-colors duration-300 shadow-lg text-lg"
                  >
                    Liên hệ
                  </button>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-all duration-1000 ${
                  isCardFlipped ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: isCardFlipped
                    ? "rotateY(0deg)"
                    : "rotateY(-180deg)",
                }}
              >
                <div className="bg-white rounded-3xl p-6 md:p-12 xl:p-10 shadow-xl w-full h-full flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl xl:text-3xl font-bold text-[#D68C45] mb-10 text-center">
                    Vì sao chọn E.C.O
                  </h2>

                  <div className="space-y-3 md:space-y-4 overflow-y-auto pr-2 max-h-[450px]">
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      E.C.O giúp doanh nghiệp thực hiện các hành động môi trường
                      và bắt kịp xu hướng ESG toàn cầu.
                    </p>
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      Mỗi hoạt động trồng cây và bảo tồn đều được ghi nhận minh
                      bạch bằng hình ảnh và vị trí thực tế.
                    </p>
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      Thông qua ứng dụng C.H.A.M, doanh nghiệp có thể kết nối
                      với cộng đồng người dùng ý thức cao về môi trường, đặc
                      biệt là thế hệ Gen Z.
                    </p>
                    <p className="text-base md:text-lg xl:text-lg leading-relaxed text-gray-700">
                      Doanh nghiệp đồng hành – người dùng có trải nghiệm cá nhân
                      hóa – và các Rừng nhận thêm nguồn lực bảo tồn thiết thực.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactUsPopup
        isOpen={isContactOpen}
        onClose={closeContact}
        onSubmit={handleContactSubmit}
      />

      <Footer />
    </>
  );
}
