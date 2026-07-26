import React from "react";
import {
  FaTiktok,
  FaGithub,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function SocialLinks({ 
  className = "", 
  iconSize = "w-4 h-4", 
  iconColor = "text-white",
  hoverColor = "hover:text-[#D68C45]",
  showLabels = false,
  customWrapper = null
}) {
  const socialLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/TranNamKhanh-Kan", // Thay đổi URL thực tế
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/in/namkhanhtrankan/", // Thay đổi URL thực tế
    }
  ];

  const handleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        const iconElement = (
          <button
            onClick={() => handleClick(social.url)}
            className={`${iconColor} ${social.color} transition-colors duration-300 cursor-pointer`}
            title={social.name}
            aria-label={`Visit our ${social.name} page`}
          >
            <IconComponent className={iconSize} />
          </button>
        );

        return (
          <div key={social.name} className="flex flex-col items-center">
            {customWrapper ? customWrapper(iconElement) : iconElement}
            {showLabels && (
              <span className="text-xs text-gray-400 mt-1">{social.name}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
