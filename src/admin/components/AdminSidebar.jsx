import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaChartLine, 
  FaUsers, 
  FaGraduationCap, 
  FaTag, 
  FaChartBar, 
  FaHeadset, 
  FaClipboardList,
  FaHandshake
} from 'react-icons/fa';
import logo from '../../assets/homepage/logo.png';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FaChartLine, path: '/admin' },
  { id: 'users', label: 'User Management', icon: FaUsers, path: '/admin/users' },
  { id: 'csr', label: 'CSR Management', icon: FaHandshake, path: '/admin/csr' },
  { id: 'financial', label: 'Financial Reports', icon: FaChartBar, path: '/admin/financial' },
  { id: 'support', label: 'Customer Support', icon: FaHeadset, path: '/admin/support' },
  { id: 'logs', label: 'Logs', icon: FaClipboardList, path: '/admin/logs' },
];

export default function AdminSidebar({ isOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`${isOpen ? 'w-75' : 'w-20'} bg-[#2C2C2C] text-white transition-all duration-300 flex flex-col`}>
      {/* Logo Section */}
      <div className="flex items-center px-2 py-3 border-b border-gray-700">
        <div className={`flex items-center space-x-3 ${isOpen ? 'ms-5' : ''}`}>
            <img src={logo} alt="Logo" className="w-16 h-16" />
         
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.path)}
              className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-white text-[#D68C45]'
                  : 'text-white hover:text-[#D68C45]'
              }`}
            >
              <div className="mr-3 flex items-center justify-center">
                <item.icon className="w-5 h-5" />
              </div>
              {isOpen && (
                <span className="font-medium text-xl" >{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
