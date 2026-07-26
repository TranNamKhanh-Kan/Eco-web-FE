import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { FaSearch, FaFilter, FaUser, FaPhone, FaEnvelope, FaThumbtack, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function CSRManagement() {
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
  const [markedIds, setMarkedIds] = useState(new Set());

  // Fetch contacts from API
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/contacts', {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
          status: ['Done','Pending','Cancel'].includes(selectedStatus) ? selectedStatus : undefined,
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
  }, [currentPage, selectedStatus, searchTerm]);

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

  

  // Mark toggle
  const toggleMark = (id) => {
    setMarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Combine server-side + client-side (Marked) filtering
  const displayedItems = selectedStatus === 'Marked'
    ? csrItems.filter(item => markedIds.has(item.contactId))
    : csrItems;


  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-6xl font-bold" >
          Contact Management
        </h1>

        <div className="flex gap-6">
          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {/* Search and Filter */}
            <div className="flex items-center justify-end mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for contact"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                onClick={() => setShowStatusFilter(!showStatusFilter)}
                className="ml-3 p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FaFilter className="w-4 h-4 text-gray-600" />
              </button>
              
              {showStatusFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setSelectedStatus('All');
                        setShowStatusFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === 'All' ? 'bg-gray-100 font-medium' : ''
                      }`}
                      
                    >
                      All Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Done');
                        setShowStatusFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === 'Done' ? 'bg-gray-100 font-medium' : ''
                      }`}
                      
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Pending');
                        setShowStatusFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === 'Pending' ? 'bg-gray-100 font-medium' : ''
                      }`}
                      
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Cancel');
                        setShowStatusFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === 'Cancel' ? 'bg-gray-100 font-medium' : ''
                      }`}
                      
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStatus('Marked');
                        setShowStatusFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === 'Marked' ? 'bg-gray-100 font-medium' : ''
                      }`}
                      
                    >
                      Marked
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-500" >
                  Loading contacts...
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
            <div className="space-y-6" style={{ minHeight: '520px' }}>
              {!loading && !error && displayedItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500" >
                    No contacts found matching your search criteria.
                  </p>
                </div>
              ) : !loading && !error ? (
                displayedItems.map((item) => (
                <div key={item.contactId} className="relative border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/admin/message/contact/${item.contactId}`)}>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleMark(item.contactId); }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${markedIds.has(item.contactId) ? 'text-yellow-500' : 'text-gray-300'}`}
                    aria-label="Mark"
                    title={markedIds.has(item.contactId) ? 'Unmark' : 'Mark'}
                  >
                    <FaThumbtack className="w-3 h-3 rotate-45" />
                  </button>
                  
                  {/* Header with username and date */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaUser className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-bold text-lg" >
                        {item.userName}
                      </span>
                    </div>
                    <span className="text-gray-500" >
                      {new Date(item.createdAt || item.date).toLocaleString()}
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

                  {/* Status dropdown */}
                  <div className="flex justify-end">
                    <div className="relative">
                      <select
                        className={`appearance-none bg-white border border-gray-300 rounded-lg py-1.5 px-5 pr-8 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${getStatusTextColor(item.status)}`}
                        value={item.status}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(item.contactId, e.target.value)}
                        
                      >
                        <option value="Done" className=" text-green-500">Done</option>
                        <option value="Pending" className=" text-yellow-500">Pending</option>
                        <option value="Cancel" className=" text-red-500">Cancel</option>
                      </select>
                      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-3 h-3" />
                    </div>
                  </div>
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
