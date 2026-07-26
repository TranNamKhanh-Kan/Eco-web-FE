import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function Logs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample log data
  const logs = [
    {
      id: 1,
      timestamp: '7/4/2025-10:33:04',
      user: 'User 1',
      ip: '123.456.7.89',
      userAgent: 'Chrome',
      referrerUrl: '/Home Page',
      pageUrl: 'Login page',
      eventType: 'None',
      error: 'None',
      errorMessage: 'None',
      timeOnPage: '15 minutes'
    },
    {
      id: 2,
      timestamp: '7/4/2025-10:32:15',
      user: 'User 2',
      ip: '123.456.7.90',
      userAgent: 'Microsoft Edge',
      referrerUrl: '/Facebook',
      pageUrl: '/About Us',
      eventType: 'Redirect to Login',
      error: '500',
      errorMessage: '500',
      timeOnPage: '8 minutes'
    },
    {
      id: 3,
      timestamp: '7/4/2025-10:31:22',
      user: 'Guest',
      ip: '123.456.7.91',
      userAgent: 'Chrome',
      referrerUrl: '/Google',
      pageUrl: '/Home page',
      eventType: 'Redirect to About us',
      error: 'None',
      errorMessage: 'None',
      timeOnPage: '12 minutes'
    },
    {
      id: 4,
      timestamp: '7/4/2025-10:30:45',
      user: 'User 3',
      ip: '123.456.7.92',
      userAgent: 'Firefox',
      referrerUrl: '/Home Page',
      pageUrl: 'Login page',
      eventType: 'None',
      error: 'None',
      errorMessage: 'None',
      timeOnPage: '20 minutes'
    },
    {
      id: 5,
      timestamp: '7/4/2025-10:29:18',
      user: 'User 1',
      ip: '123.456.7.89',
      userAgent: 'Safari',
      referrerUrl: '/Twitter',
      pageUrl: '/About Us',
      eventType: 'Redirect to Login',
      error: '404',
      errorMessage: '404',
      timeOnPage: '5 minutes'
    }
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.pageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <AdminLayout>
      <div className="space-y-6 mb-10">
        {/* Page Title */}
        <h1 className="text-5xl font-bold ms-10" >
          Log
        </h1>

        <div className="flex gap-1 h-[70vh] px-1">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            

            {/* Search and Filter Bar */}
            <div className="flex items-center justify-end mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="ml-3 p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaFilter className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Timestamp
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      User
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Ip
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      User Agent
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Referrer Url
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Page Url
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Event type
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Error
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Error Message
                    </th>
                    <th className="text-left py-3 px-2 font-bold text-black" >
                      Time on Page
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-black" >
                        {log.timestamp}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.user}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.ip}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.userAgent}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.referrerUrl}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.pageUrl}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.eventType}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.error}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.errorMessage}
                      </td>
                      <td className="py-3 px-2 text-black" >
                        {log.timeOnPage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

