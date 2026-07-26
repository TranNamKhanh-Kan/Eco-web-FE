import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import img1 from "../assets/about_us/1.png";
import img2 from "../assets/about_us/2.png";
import img3 from "../assets/about_us/3.png";
import img4 from "../assets/about_us/4.png";
import img5 from "../assets/about_us/5.png";
import ourStory from "../assets/about_us/our_story.png";
import img6 from "../assets/about_us/6.png";
import logo from "../assets/homepage/logo_xanh.png";
import ourMission1 from "../assets/about_us/our_mission1.png";
import ourMission2 from "../assets/about_us/our_mission2.png";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
        <Navbar />
      </div>

      <section className="pb-20 lg:pb-[6.25vw] 2xl:pb-[12vh] pt-8 lg:pt-[2.5vw] 2xl:pt-[6vh] bg-white  flex flex-1  justify-center items-center">
        <div className="w-full ">
          <div className="text-center ">
            <h2 className="text-2xl md:text-3xl xl:text-5xl 2xl:text-7xl mb-10 md:mb-12 2xl:mb-[4vh] font-bold px-4">
              Công Ty TNHH{" "}
              <span className="text-[#d68c45]">
                Giải Pháp Xanh Bền Vững E.C.O
              </span>
            </h2>

            <div className="flex flex-nowrap justify-center items-center gap-2 md:gap-4 lg:gap-[1.5vw] mb-6 mx-4 md:mx-8 lg:mx-[2vw]">
              <div className="w-[12%] md:w-[14%] aspect-square flex-shrink-0 flex items-center justify-center">
                <img
                  src={img1}
                  alt="Plant growing from book"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="w-[17%] md:w-[20%] aspect-square flex-shrink-0 flex items-center justify-center">
                <img
                  src={img2}
                  alt="Plant with circuit patterns"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="w-[22%] md:w-[26%] aspect-square flex-shrink-0 flex items-center justify-center">
                <img
                  src={img3}
                  alt="Plant with light and circuits"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="w-[17%] md:w-[20%] aspect-square flex-shrink-0 flex items-center justify-center">
                <img
                  src={img4}
                  alt="Laptop with moss and butterflies"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="w-[12%] md:w-[14%] aspect-square flex-shrink-0 flex items-center justify-center">
                <img
                  src={img5}
                  alt="Hands holding seedlings"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="w-full h-px bg-gray-300 mb-6"></div>

            <div className="text-center px-8 md:px-0">
              <p className="text-md 2xl:text-xl text-gray-800 ">
                Gắn kết con người với thiên nhiên thông qua công nghệ và cảm
                xúc.
              </p>
              <p className="text-md 2xl:text-xl text-gray-800 ">
                Mỗi hành động số tạo nên một mầm xanh thật, một giá trị thật.
              </p>

              <div className="flex justify-center items-center mt-16 2xl:mt-[6vh]">
                <SocialLinks
                  iconSize="w-4 h-4 2xl:w-5 2xl:h-5"
                  iconColor="text-[#D68C45]"
                  hoverColor="hover:scale-110"
                  className="gap-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-10 md:py-20 2xl:py-[10vh] bg-cover bg-center relative h-full mx-4 md:mx-16 2xl:mx-[8vw] rounded-xl mb-8 md:mb-16 2xl:mb-[8vh]"
        style={{
          backgroundImage: `url(${ourStory})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 rounded-xl"></div>

        <div className="relative h-full flex justify-center items-center">
          <div className="w-full md:w-[90%] lg:w-[60%] 2xl:w-[55vw] mx-auto px-4 md:px-8 2xl:px-[2.5vw]">
            <div className="flex justify-start items-center">
              <div className="bg-white/90 md:bg-white/80 rounded-lg p-6 md:p-8 2xl:p-[2vw] shadow-md w-full">
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-800 mb-2">
                    Câu chuyện của chúng tôi
                  </h3>
                  <p className="text-md 2xl:text-xl text-gray-800">
                    E.C.O là doanh nghiệp xã hội được sáng lập bởi một nhóm bạn
                    trẻ Việt Nam cùng chung tình yêu với thiên nhiên và công
                    nghệ. Chúng tôi hướng đến việc khôi phục rừng bản địa và
                    truyền cảm hứng hành động xanh cho cộng đồng thông qua các
                    giải pháp gamification sáng tạo.
                  </p>
                  <p className="text-md 2xl:text-xl text-gray-800">
                    Sáng kiến trọng điểm của E.C.O - C.H.A.M (Chạm - Hiểu - Ấp ủ
                    - Mầm) - biến mỗi hành động nhỏ trên nền tảng số (ứng dụng
                    game hóa và website) được quy đổi thành tác động thật ngoài
                    đời: trồng cây, phục hồi rừng, và giảm phát thải carbon.
                    C.H.A.M giúp việc đóng góp cho môi trường trở nên thú vị,
                    minh bạch và dễ lan tỏa, kết nối người trẻ, tổ chức và doanh
                    nghiệp cùng hành động vì mục tiêu chung.
                  </p>
                  <p className="text-md 2xl:text-xl text-gray-800">
                    Dự án ra đời từ trăn trở: “Làm thế nào để bảo vệ Trái Đất mà
                    vẫn kết nối được thế hệ trẻ trong hành trình đó?” Và E.C.O
                    chính là lời hồi đáp - nơi công nghệ và thiện chí gặp nhau
                    để gieo những mầm xanh cho tương lai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-10 md:py-20 2xl:py-[8vh] bg-cover bg-center relative h-[200px] md:h-[350px] 2xl:h-[40vh] mx-4 md:mx-16 2xl:mx-[8vw] rounded-xl"
        style={{
          backgroundImage: `url(${img6})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

        <div className="relative h-full flex justify-center items-center px-4">
          <div className="text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-[3.5rem] 2xl:text-6xl font-bold mb-0 md:mb-4"
              style={{
                background:
                  "linear-gradient(90deg, white 0%, #d68c45 50%, white 100%)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientMove 3s ease-in-out infinite",
              }}
            >
              GROW TREES - GROW IMPACT
            </h2>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 2xl:py-[10vh] bg-gray-50">
        <div className="max-w-5xl 2xl:max-w-[70vw] mx-auto px-4 md:px-8 2xl:px-[4vw]">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-12 2xl:p-[3vw]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 2xl:gap-[3vw]">
              <div className="w-full md:w-2/3 2xl:w-[60%]">
                <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-[#d68c45] mb-3">
                  Cách chúng tôi hoạt động
                </h3>
                <div className="space-y-2">
                  <p className="text-md 2xl:text-xl text-gray-800 ">
                    Chúng tôi kết nối thế giới số với hành động xanh ngoài đời
                    thực. Thông qua nền tảng ứng dụng C.H.A.M, người dùng gieo
                    và chăm sóc cây ảo trong game – mỗi tương tác đều được quy
                    đổi thành cây thật được trồng tại các khu rừng ở Việt Nam.
                  </p>

                  <p className="text-md 2xl:text-xl text-gray-800 ">
                    Song song, E.C.O hợp tác với doanh nghiệp CSR, tổ chức phi
                    lợi nhuận và cộng đồng địa phương để đảm bảo mọi hoạt động
                    trồng rừng đều minh bạch, bền vững và có thể theo dõi được.
                  </p>
                  <p className="text-md 2xl:text-xl text-gray-800 ">
                    C.H.A.M sử dụng AI và hệ thống định vị (GPS) để theo dõi
                    tăng trưởng cây thật, minh chứng tác động và cung cấp báo
                    cáo ESG trực quan – biến mỗi lần “chạm” của người dùng thành
                    một bước tiến thật trong hành trình phủ xanh Trái Đất.
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center w-full md:w-1/3 ">
                <div className="relative w-24 h-24 md:w-30 md:h-30 xl:w-[12vw] xl:h-[12vw] 2xl:w-[13vw] 2xl:h-[12vw]">
                  <img src={logo} alt="Our Mission" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-20 2xl:py-[10vh] bg-white">
        <div className="max-w-6xl 2xl:max-w-[85vw] mx-auto px-4 md:px-15 2xl:px-[5vw]">
          <div className="text-center mb-8 md:mb-16">
            <div className="flex items-center justify-center mb-5">
              <div className="w-8 md:w-16 h-px bg-black"></div>
              <h2 className="text-2xl md:text-4xl 2xl:text-5xl font-bold text-[#d68c45] px-4">
                Sứ mệnh của chúng tôi
              </h2>
              <div className="w-8 md:w-16 h-px bg-black"></div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10 2xl:gap-[3vw] mb-8 md:mb-16 2xl:mb-[6vh]">
            <div className="w-full md:w-2/5">
              <p className="text-md 2xl:text-xl text-gray-800 ">
                Chúng tôi tin rằng mỗi người đều có thể đóng góp cho môi trường
                - bắt đầu từ những hành động nhỏ, khi được trao một nền tảng đủ
                gần gũi, minh bạch và truyền cảm hứng.
              </p>
            </div>

            <div className="w-full md:w-3/5">
              <div className="relative">
                <img
                  src={ourMission1}
                  alt="Digital nature connection"
                  className="w-full h-48 md:h-55 2xl:h-[30vh] object-cover rounded-lg 2xl:rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <img
                  src={ourMission2}
                  alt="Environmental impact"
                  className="w-full h-48 md:h-70 2xl:h-[30vh] object-cover rounded-lg 2xl:rounded-2xl"
                />
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="space-y-2">
                <p className="text-md 2xl:text-xl text-gray-800 ">
                  Sứ mệnh của E.C.O là biến công nghệ thành cầu nối để con người
                  hành động vì môi trường một cách dễ dàng và ý nghĩa hơn.
                </p>
                <p className="text-md 2xl:text-xl text-gray-800 ">
                  E.C.O hướng tới xây dựng một thế hệ biết sống xanh thông qua
                  học hỏi, trải nghiệm và tương tác số, nơi việc bảo vệ môi
                  trường không còn xa vời, mà trở thành một phần tự nhiên trong
                  đời sống hàng ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
