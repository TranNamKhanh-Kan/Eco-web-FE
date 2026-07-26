import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import h3Image from "../assets/homepage/h3.jpg";

export default function BambooForest() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/our-partner');
  };

  return (
    <>
      <Header />
      <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
        <Navbar />
      </div>
      
      {/* Monospecific Bamboo Forest Section */}
      <section className="relative w-full h-full overflow-hidden -mt-[102px] pb-15">
        
                 {/* Background Image */}
         <img
           src={h3Image}
           alt="Monospecific Bamboo Forest"
           className="absolute inset-0 w-full h-full object-cover blur-sm"
         />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
                 {/* Content */}
         <div className="relative z-10 flex items-center justify-center min-h-screen pt-20">
           <div className="max-w-7xl mx-auto px-8">
           
            
                                                  {/* Main Content Grid */}
             <div className="relative grid lg:grid-cols-5 gap-10 items-center bg-transparent backdrop-blur-xs rounded-3xl px-20 pb-20 pt-10 shadow-2xl border-2 border-white w-full max-w-7xl mx-auto min-h-[600px]">
              
               {/* Title Section */}
               <div className="lg:col-span-5 text-center ">
                 <h1 className="text-5xl font-bold text-white text-center">
                   MONOSPECIFIC BAMBOO FOREST
                 </h1>
               </div>
              
                               {/* Left Panel - Forest Image */}
               <div className="flex justify-center lg:col-span-2">
                 <div className="relative">
                   <img
                     src={h3Image}
                     alt="Monospecific Bamboo Forest"
                     className="w-100 h-130 object-cover rounded-2xl border-2 border-white shadow-2xl"
                   />
                 </div>
               </div>
              
              {/* Right Panel - Information Box */}
              <div className="lg:col-span-3">
                <div className="space-y-6 text-white">
                  {/* Location */}
                  <div>
                    <p className="text-lg ">
                      Location: <span className="text-lg ">Found widely across the Park</span>
                    </p>
                  </div>
                  
                  {/* Main Heading */}
                  <div>
                    <h2 className="text-3xl font-bold mb-4">
                      Regrowth from abandoned shifting fields
                    </h2>
                  </div>
                  
                  {/* Formation */}
                  <div>
                    <h3 className="text-2xl font-bold">
                      Formation:
                    </h3>
                    <p className="text-lg leading-relaxed">
                      Resulting from fallow lands post-subsistence farming. Dominated by La Ngà bamboo (Bambusa blumeana), Lồ ô, and Mum, with scattered fast-growing light-loving hardwoods like Macaranga tanarius and Ficus spp.
                    </p>
                  </div>
                  
                  {/* Ecological Role */}
                  <div>
                    <h3 className="text-2xl font-bold">
                      Ecological role:
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
