import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import h1Image from "../assets/homepage/h1.jpg";

export default function MixedHardwood() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/our-partner");
  };

  return (
    <>
      <Header />
      <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
        <Navbar />
      </div>

      {/* Mixed Hardwood-Bamboo Forest Section */}
      <section className="relative w-full h-full overflow-hidden -mt-[102px] pb-15">
        {/* Background Image */}
        <img
          src={h1Image}
          alt="Mixed Hardwood-Bamboo Forest"
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
          <div className="max-w-7xl mx-auto px-8">
            {/* Main Content Grid */}
            <div className="relative grid lg:grid-cols-5 gap-10 items-center bg-transparent backdrop-blur-xs rounded-3xl px-20 pb-20 pt-10 shadow-2xl border-2 border-white w-full max-w-7xl mx-auto min-h-[600px]">
              {/* Title Section */}
              <div className="lg:col-span-5 text-center ">
                <h1
                  className="text-5xl font-bold text-white text-center"
                >
                  MIXED HARDWOOD-BAMBOO FOREST
                </h1>
              </div>

              {/* Left Panel - Forest Image */}
              <div className="flex justify-center lg:col-span-2">
                <div className="relative">
                  <img
                    src={h1Image}
                    alt="Mixed Hardwood-Bamboo Forest"
                    className="w-100 h-130 object-cover rounded-2xl border-2 border-white shadow-2xl"
                  />
                </div>
              </div>

              {/* Right Panel - Information Box */}
              <div className="lg:col-span-3">
                <div className="space-y-6 text-white">
                  {/* Location */}
                  <div>
                    <p className="text-lg">
                      Location: <span className="text-lg">Eastern and southern Nam Cát Tiên</span>
                    </p>
                  </div>

                  {/* Main Heading */}
                  <div>
                    <h2 className="text-3xl font-bold mb-4">
                      A secondary forest shaped by human activity
                    </h2>
                  </div>

                  {/* Origin */}
                  <div>
                    <h3 className="text-2xl font-bold">
                      Origin:
                    </h3>
                    <p className="text-lg leading-relaxed">
                      A secondary forest type, formed after human interventions (logging, fires, chemicals). The open canopy allowed bamboo species to invade, resulting in a forest mixture of hardwood and bamboo.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Common hardwoods: Dipterocarpus costatus, Dalbergia oliveri, Shorea
                    </p>
                    <p className="text-lg leading-relaxed">
                      Common bamboos: Bambusa blumeana (La Ngà bamboo), Gigantochloa species.
                    </p>
                  </div>

                  {/* Ecological insight */}
                  <div>
                    <h3 className="text-2xl font-bold">
                      Ecological insight:
                    </h3>
                    <p className="text-lg leading-relaxed">
                      While human-influenced, these forests help protect soil, reduce erosion, and support forest regeneration over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
