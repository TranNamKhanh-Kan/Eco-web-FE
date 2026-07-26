import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ecoFund from "../assets/get_involved/our_fund/eco_fund.png";
import fundGoal from "../assets/get_involved/our_fund/fund_goal.png";
import logo from "../assets/homepage/logo.png";
import financeState from "../assets/get_involved/our_fund/finance_state.png";

export default function OurFund() {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    navigate("/sponsor");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  };

  return (
    <>
      <Header />
      <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
        <Navbar />
      </div>

      <section
        className="relative h-auto min-h-[500px] lg:h-[55vh] 2xl:h-[55vh] w-[85%] lg:w-[85vw] 2xl:w-[85vw] bg-center flex items-center mt-6 lg:mt-[-4.5vh] 2xl:mt-[-5vh] mx-auto rounded-[30px] 2xl:rounded-[45px]"
        style={{
          backgroundImage: `url(${ecoFund})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center py-12 lg:py-0 px-4 lg:px-16 lg:px-[5vw] 2xl:px-[5vw] gap-8 lg:gap-0">
          <div className="text-white text-center lg:text-left lg:self-end lg:mb-[8vh] 2xl:mb-[8vh]">
            <h1 className="text-4xl lg:text-6xl 2xl:text-8xl font-bold mb-2 lg:mb-3">
              Quỹ E.C.O
            </h1>
            <p className="text-lg lg:text-xl 2xl:text-2xl lg:ps-2">
              Vì một tương lai xanh.
            </p>
          </div>

          <div className="text-white text-center lg:text-center flex flex-col items-center lg:items-center">
            <p className="text-sm lg:text-sm 2xl:text-xl leading-tight tracking-wide mb-5 max-w-lg lg:max-w-[30vw] xl:max-w-[40vw] 2xl:max-w-[40vw] mx-auto lg:mx-0">
              Với E.C.O, phát triển bền vững không chỉ là mục tiêu, mà còn là
              một hành trình cần được lan tỏa và công khai minh bạch.
            </p>
            <button
              onClick={handleSponsorClick}
              className="bg-white text-black font-bold py-1.5 lg:py-[0.7vh] 2xl:py-[1vh] rounded-[15px] 2xl:rounded-[20px] w-[280px] lg:w-[20vw] 2xl:w-[18vw] hover:bg-black hover:text-white transition-colors duration-300 shadow-lg text-xl lg:text-xl 2xl:text-2xl flex items-center justify-center"
            >
              Tài trợ ngay
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-[6vh] 2xl:py-[8vh] px-4 lg:px-[10vw] 2xl:px-[12vw]">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[2vw] 2xl:gap-[3vw] px-0 lg:px-0">
          <div className="w-full lg:w-1/3">
            <div className="bg-gradient-to-tr from-black via-[#4D4D4D] to-[#6B6B6B] rounded-[30px] 2xl:rounded-[32px] p-8 lg:p-[3vw] 2xl:p-[2.2vw] text-white relative overflow-hidden h-[325px] w-full max-w-[300px] 2xl:max-w-[500px] lg:h-[23vw] lg:w-[30vw] 2xl:h-[23vw] 2xl:w-[25vw] mx-auto transition-all duration-300 ease-in-out group">
              <div className="absolute top-[-20px] left-3">
                <div className="w-45 h-45 lg:w-[12vw] lg:h-[12vw] 2xl:w-[13vw] 2xl:h-[13vw] flex items-center justify-start">
                  <img
                    src={logo}
                    alt="E.C.O Logo"
                    className="w-65 h-65 lg:w-full lg:h-full object-contain group-hover:scale-110 transition-all duration-300 ease-in-out transform origin-center"
                  />
                </div>
              </div>

              <div className="absolute bottom-8 lg:bottom-[4vh] left-8 lg:left-[3vw] group-hover:scale-110 transition-all duration-300 ease-in-out transform origin-center">
                <div className="">
                  <div className="text-2xl lg:text-2xl 2xl:text-4xl font-semibold">
                    <span className="text-[2.75rem] lg:text-[2.75rem] 2xl:text-[3.5rem] font-semibold">
                      10000+
                    </span>
                  </div>
                  <div
                    className="text-xs lg:text-xs 2xl:text-base"
                    text-sm
                    lg:text-sm
                  >
                    Cây được trồng
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 lg:bottom-[2vh] 2xl:bottom-[2vh] right-8 lg:right-[1.5vw] 2xl:right-[1.5vw] text-right group-hover:scale-110 transition-all duration-300 ease-in-out transform origin-center">
                <div className="space-y-1">
                  <div
                    className="text-sm lg:text-sm 2xl:text-lg"
                    text-sm
                    lg:text-sm
                  >
                    <span className="text-[2.8rem] lg:text-[3.2rem] 2xl:text-[3.6rem] font-semibold">
                      5
                    </span>{" "}
                    Năm
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-3/4">
            <img
              src={fundGoal}
              alt="Fund Goals"
              className="w-full h-auto lg:h-[23vw] 2xl:h-[23vw] rounded-lg shadow-2xl mx-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-[8vh] 2xl:py-[10vh] px-4 lg:px-[4vw] 2xl:px-[5vw] bg-white">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-center mb-8 lg:mb-[4vh] 2xl:mb-[5vh]">
            <img
              src={financeState}
              alt="Financial Statement Timeline"
              className="w-full h-auto"
            />
          </div>

          <div className="max-w-5xl lg:max-w-[70vw] 2xl:max-w-[74vw] mx-auto ">
            <div className="bg-[#F4F4F4] rounded-[30px] 2xl:rounded-[32px] pt-8 lg:pt-[2.5vh] 2xl:pt-[3vh]">
              <div className="text-center mb-3 lg:mb-[2vh] lg:pt-[4vh] 2xl:mb-[2.5vh]">
                <h2 className="text-3xl lg:text-5xl 2xl:text-7xl font-bold">
                  <span className="text-[#D68C45]">E.C.O</span>
                  <span className="text-[#3A3A3A]"> Cam Kết</span>
                </h2>
              </div>

              <div className="text-left px-6 lg:px-[4vw] 2xl:px-[4.5vw] space-y-2 lg:space-y-[1.2vh] 2xl:space-y-[1.5vh] pb-8 lg:pb-[6vh] 2xl:pb-[7vh]">
                <p
                  className="text-sm lg:text-sm 2xl:text-xl leading-relaxed"
                  text-sm
                  lg:text-sm
                >
                  Đội ngũ điều hành Tài chính (CFO) của chúng tôi, với chuyên
                  môn về Công nghệ Truyền thông cùng trách nhiệm quản lý tài
                  chính - pháp lý, cam kết đảm bảo mọi nguồn quỹ đều được quản
                  lý chặt chẽ và tuân thủ tuyệt đối các quy định của pháp luật.
                </p>

                <p
                  className="text-sm lg:text-sm 2xl:text-xl leading-relaxed"
                  text-sm
                  lg:text-sm
                >
                  Trong tương lai, E.C.O hướng tới việc hợp tác cùng một đơn vị
                  kiểm toán độc lập để xác minh tính minh bạch của các báo cáo
                  tài chính, qua đó củng cố niềm tin vững chắc nơi cộng đồng và
                  các đối tác.
                </p>

                <p
                  className="text-sm lg:text-sm 2xl:text-xl leading-relaxed"
                  text-sm
                  lg:text-sm
                >
                  Chúng tôi luôn lắng nghe những góp ý từ cộng đồng và đối tác
                  để không ngừng cải thiện quy trình quản lý quỹ, đồng thời tối
                  ưu hóa những tác động tích cực mà dự án mang lại.
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
