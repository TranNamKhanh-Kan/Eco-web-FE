import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { FaSearch, FaFilter, FaUser, FaPhone, FaEnvelope, FaThumbtack, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function CustomerSupport() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [csrItems, setCsrItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch feedbacks from API
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/feedbacks', {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
          search: searchTerm || undefined,
        }
      });
      setCsrItems(response.data.items || []);
      const totalCount = response.data.totalCount || 0;
      const apiPageSize = response.data.pageSize || pageSize;
      setTotalPages(Math.max(1, Math.ceil(totalCount / apiPageSize)));
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchTerm]);

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === csrItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(csrItems.map(item => item.contactId));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/api/contacts/${id}/status?status=${newStatus}`);
      setCsrItems(prevItems => 
        prevItems.map(item => 
          item.contactId === id 
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Done':
        return 'text-green-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Cancel':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  

  // Server-side paging/filtering handled by API
  const displayedItems = csrItems;


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-6xl font-bold" >
          Customer Support
        </h1>

        <div className="flex gap-6">
          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {/* Search and Filter */}
            <div className="flex items-center justify-end mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search feedback"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {/* Optional filter removed for feedbacks */}
            </div>
            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-500" >
                  Loading feedbacks...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-500" >
                  {error}
                </p>
                <button 
                  onClick={fetchContacts}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Retry
                </button>
              </div>
            )}

            {/* CSR Items */}
            <div className="space-y-6">
              {!loading && !error && displayedItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500" >
                    No feedbacks found matching your search criteria.
                  </p>
                </div>
              ) : !loading && !error ? (
                displayedItems.map((item) => (
                <div key={item.id} className="relative border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/admin/message/feedback/${item.id}`)}>
                  {item.pinned && (
                    <div className="absolute top-2 right-2  text-yellow-500 p-1.5 rounded-full ">
                      <FaThumbtack className="w-3 h-3 rotate-45" />
                    </div>
                  )}
                  
                  {/* Header with username and date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaUser className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-bold text-lg" >
                        {item.userName}
                      </span>
                    </div>
                    <span className="text-gray-500" >
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Contact information */}
                  <div className="flex items-center mb-4 space-x-6">
                    <div className="flex items-center">
                      <FaPhone className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-gray-700" >
                        Contact: {item.contactInfo}
                      </span>
                    </div>
                    {item.email && (
                      <div className="flex items-center">
                        <FaEnvelope className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-gray-700" >
                          Email: {item.email}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description (clamp 5 lines with ellipsis) */}
                  <p
                    className="text-gray-600 text-sm mb-4 leading-relaxed"
                    style={{
                      
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.message}
                  </p>

                  {/* No status control for feedbacks */}
                </div>
              ))
              ) : null}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          

          
        </div>
      </div>
    </AdminLayout>
  );
}
