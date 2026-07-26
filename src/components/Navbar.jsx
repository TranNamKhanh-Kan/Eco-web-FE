import React, { useState } from "react";
import { FaSearch, FaChevronUp, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { title: "Trang chủ", path: "/" },
  { title: "Về chúng tôi", path: "/about" },
  { 
    title: "Tham gia", 
    hasDropdown: true,
    dropdownItems: [
      { title: "Quỹ E.C.O", path: "/our-fund" },
      { title: "Tài trợ", path: "/sponsor" },
      { title: "Trở thành nhà tài trợ", path: "/become-sponsor" },
      { title: "Giáo dục ", path: "/for-school-education" },
      { title: "Đối tác của E.C.O", path: "/our-partner" },
      { title: "Cộng đồng", path: "/community" }
    ]
  },
  { 
    title: "C.H.A.M",
    hasDropdown: true,
    dropdownItems: [
      { title: "Hành trình của C.H.A.M", path: "/our-project" },
      { title: "Trải nghiệm game C.H.A.M", path: "/our-game"}
    ]
  },
  { title: "Tin tức", path: "/news" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);

  // Check active states
  const isActive = (path) => location.pathname === path;
  
  const isGetInvolvedActive = () => {
    const getInvolvedPaths = ['/our-fund', '/sponsor', '/become-sponsor', '/for-school-education', '/our-partner', '/community'];
    return getInvolvedPaths.includes(location.pathname);
  };

  const isCHAMActive = () => {
    const chamPaths = ['/our-project', '/our-game'];
    return chamPaths.includes(location.pathname);
  };

  const handleDropdownEnter = (title) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(title);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Small delay to allow moving mouse to dropdown
    setDropdownTimeout(timeout);
  };

  const handleDropdownMenuEnter = (title) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setOpenDropdown(title);
  };

  const handleDropdownMenuLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileSubmenu = (title) => {
    if (mobileExpandedMenu === title) {
      setMobileExpandedMenu(null);
    } else {
      setMobileExpandedMenu(title);
    }
  };

  return (
    <div className="w-full flex justify-center items-center select-none mt-4 lg:mt-8">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-30 right-6 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-black bg-opacity-95 text-white p-4 rounded-full shadow-2xl border border-white/20"
        >
            <FaBars className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-black/95 z-50 flex flex-col transition-all duration-300 lg:hidden overflow-y-auto
        ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}>
         <div className="flex justify-end p-6">
            <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-2xl p-2"
            >
                <FaTimes />
            </button>
         </div>
         
         <div className="flex flex-col items-center gap-6 px-6 pb-10">
            {menu.map((item) => {
                let isItemActive = false;
                if (item.title === "Trang chủ") isItemActive = isActive("/");
                else if (item.title === "Về chúng tôi") isItemActive = isActive("/about");
                else if (item.title === "Tham gia") isItemActive = isGetInvolvedActive();
                else if (item.title === "C.H.A.M") isItemActive = isCHAMActive();
                else if (item.title === "Tin tức") isItemActive = isActive("/news");

                return (
                    <div key={item.title} className="flex flex-col items-center w-full">
                        <div 
                            className={`text-xl font-bold py-2 flex items-center gap-2 cursor-pointer ${isItemActive ? 'text-[#D68C45]' : 'text-white'}`}
                            onClick={() => {
                                if(item.hasDropdown) {
                                    toggleMobileSubmenu(item.title);
                                } else {
                                    handleMenuClick(item);
                                }
                            }}
                        >
                            {item.title}
                            {item.hasDropdown && (
                                <span className="text-sm">
                                    {mobileExpandedMenu === item.title ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            )}
                        </div>
                        
                        {/* Mobile Submenu */}
                        {item.hasDropdown && (
                            <div className={`
                                flex flex-col items-center gap-3 overflow-hidden transition-all duration-300 w-full
                                ${mobileExpandedMenu === item.title ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                {item.dropdownItems.map((subItem, idx) => (
                                    <div 
                                        key={idx}
                                        className={`text-base py-1 cursor-pointer ${isActive(subItem.path) ? 'text-[#D68C45]' : 'text-gray-300'}`}
                                        onClick={() => {
                                            navigate(subItem.path);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        {subItem.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
         </div>
      </div>

      <nav
        className={`
          hidden lg:flex items-center justify-center
          bg-black bg-opacity-95 text-white rounded-full shadow-2xl
          transition-all duration-300 ease-in-out
          ${hovered
            ? 'w-[715px] h-[78px] gap-6 2xl:w-[1000px] 2xl:h-[120px] 2xl:gap-8'
            : 'w-[555px] h-[70px] gap-4.5 2xl:w-[770px] 2xl:h-[100px] 2xl:gap-6'}
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ maxWidth: '98vw' }}
      >
        {menu.map((item) => {
          // Determine if this item is active
          let isItemActive = false;
          if (item.title === "Trang chủ") {
            isItemActive = isActive("/");
          } else if (item.title === "Về chúng tôi") {
            isItemActive = isActive("/about");
          } else if (item.title === "Tham gia") {
            isItemActive = isGetInvolvedActive();
          } else if (item.title === "C.H.A.M") {
            isItemActive = isCHAMActive();
          } else if (item.title === "Tin tức") {
            isItemActive = isActive("/news");
          }

          return (
            <div key={item.title} className="relative">
              <div
                className={`
                  flex items-center gap-0.5 cursor-pointer
                  transition-all duration-300
                  ${hovered
                    ? 'text-[1.15rem] 2xl:!text-2xl  tracking-wide 2xl:tracking-wider'
                    : 'text-[1rem] 2xl:!text-xl  tracking-tight 2xl:tracking-wide'}
                  ${isItemActive ? 'text-[#D68C45] font-bold' : 'text-white hover:text-[#D68C45]'}
                `}
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.title)}
                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
                onClick={() => handleMenuClick(item)}
              >
                <span className="">{item.title} </span>
                {item.hasDropdown && (
                  <span className="transition-transform duration-200">
                    {openDropdown === item.title 
                      ? <FaChevronUp className="w-3 h-3 2xl:w-4 2xl:h-4" /> 
                      : <FaChevronDown className="w-3 h-3 2xl:w-4 2xl:h-4" />}
                  </span>
                )}
              </div>
            
            {/* Dropdown Menu */}
            {item.hasDropdown && openDropdown === item.title && (
              <div 
                className="absolute top-full left-0 mt-2 bg-black bg-opacity-95 rounded-lg shadow-xl py-2 2xl:py-3 min-w-[330px] 2xl:min-w-[465px] z-50"
                onMouseEnter={() => handleDropdownMenuEnter(item.title)}
                onMouseLeave={() => handleDropdownMenuLeave()}
              >
                {item.dropdownItems.map((dropdownItem, index) => {
                  const isDropdownItemActive = isActive(dropdownItem.path);
                  return (
                    <div key={index} className="relative">
                      <div 
                        className={`
                          px-4 2xl:px-5 py-2 2xl:py-3 cursor-pointer transition-colors duration-200
                          ${isDropdownItemActive ? 'text-[#D68C45] font-bold' : 'hover:text-[#D68C45]'}
                          text-[1.2rem] 2xl:text-[1.6rem] font-light tracking-wide 2xl:tracking-wider
                        `}
                        onClick={() => dropdownItem.path && navigate(dropdownItem.path)}
                      >
                        {dropdownItem.title} <span className="text-[#D68C45] font-bold text-4xl 2xl:text-5xl"> _ </span>
                      </div>
                      {dropdownItem.hasLine && (
                        <div className=" text-[1.1rem] font-light tracking-wide absolute left-2 right-2 h-px bg-[#D68C45] opacity-50"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
        })}
        <span className={`ml-2 text-white cursor-pointer transition-all duration-300 ${hovered ? 'text-xl 2xl:text-2xl' : 'text-base 2xl:text-lg'}`}>
          <FaSearch />
        </span>
      </nav>
    </div>
  );
}