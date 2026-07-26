import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Pagination from '../components/Pagination';
import { FaSearch, FaFilter, FaTimes, FaCheck, FaClock, FaUndo, FaEllipsisH, FaUser, FaChevronDown } from 'react-icons/fa';

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [rolePermissions, setRolePermissions] = useState({
    admin: {
      userManagement: true,
      csrEducation: true,
      partnerVoucher: true,
      financialReporting: true,
      customerSupport: true
    },
    staff1: {
      userManagement: false,
      csrEducation: true,
      partnerVoucher: true,
      financialReporting: false,
      customerSupport: false
    },
    staff2: {
      userManagement: false,
      csrEducation: false,
      partnerVoucher: false,
      financialReporting: true,
      customerSupport: true
    },
    user: {
      userManagement: false,
      csrEducation: false,
      partnerVoucher: false,
      financialReporting: false,
      customerSupport: false
    }
  });

  // Sample user data
  const users = [
    {
      id: 1,
      name: 'User 1',
      username: 'username1',
      birthday: 'dd/mm/yyyy',
      address: 'address',
      phone: '09xxxxxxxx',
      email: 'xxxx@gmail.com',
      point: '0',
      transaction: 'Show History'
    },
    {
      id: 2,
      name: 'Nguyen Ngoc Quyen',
      username: 'quynquyn@gmail.com',
      birthday: '09/04/2004',
      address: 'Fpt, Ho Chi Minh,...',
      phone: '09xxxxxxxx',
      email: 'xxxx@gmail.com',
      point: '10000',
      transaction: 'Show History'
    }
  ];

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      invoice: 'xxxx1',
      amount: 'xxxxxx vnđ',
      status: 'Paid',
      date: 'dd/mm/yy',
      service: 'Battle pass'
    },
    {
      id: 2,
      invoice: 'xxxx2',
      amount: 'xxxxxx vnđ',
      status: 'Pending',
      date: 'dd/mm/yy',
      service: 'Game'
    },
    {
      id: 3,
      invoice: 'xxxx3',
      amount: 'xxxxxx vnđ',
      status: 'Refund',
      date: 'dd/mm/yy',
      service: 'Game'
    },
    {
      id: 4,
      invoice: 'xxxx4',
      amount: 'xxxxxx vnđ',
      status: 'Paid',
      date: 'dd/mm/yy',
      service: 'Sponsor'
    }
  ];

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const handleRolePermissionChange = (role, permission) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permission]: !prev[role][permission]
      }
    }));
  };

  const handleShowTransactionHistory = (user) => {
    setSelectedUser(user);
    setShowTransactionModal(true);
  };

  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setSelectedUser(null);
  };

  // Filter transactions based on selected status
  const filteredTransactions = selectedStatus === 'All' 
    ? transactions 
    : transactions.filter(transaction => transaction.status === selectedStatus);


  return (
    <AdminLayout>
      <div className="space-y-6 mb-10">
        {/* Page Title */}
        <h1 className="text-5xl font-bold ms-10" >
          User Management
        </h1>

        <div className="flex gap-1 h-[70vh] px-1">
          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
              {/* Search Bar */}
              <div className="flex items-center justify-end mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for user"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="ml-3 p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaFilter className="w-4 h-4 text-gray-600" />
                </button>
              </div>

            {/* User Table */}
            <div className=" flex-1">
              <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === users.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Name
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Username
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Birthday
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Address
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Phone
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Email
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Point
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Transaction
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.name}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.username}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.birthday}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.address}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.phone}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.email}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {user.point}
                        </td>
                        <td className="py-3 px-2">
                          <button 
                            onClick={() => handleShowTransactionHistory(user)}
                            className="bg-[#2C2C2C] text-white px-3 py-1 rounded-lg text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" 
                            
                          >
                            {user.transaction}
                          </button>
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

          {/* Sidebar - Management Actions */}
          <div className="w-35 h-60 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col">
            <h3 className="text-sm font-bold text-black mb-3" >
              Manage
            </h3>
            
            <div className="space-y-2">
              <button className="w-full bg-[#2C2C2C] text-white text-center py-1 px-3 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" >
                Update Info
              </button>
              <button className="w-full bg-[#2C2C2C] text-white text-center py-1 px-3 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" >
                Delete User
              </button>
              <button className="w-full bg-[#2C2C2C] text-white text-center py-1 px-3 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" >
                Ban
              </button>
              <button className="w-full bg-[#2C2C2C] text-white text-center py-1 px-3 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" >
                Unban
              </button>
              <button className="w-full bg-[#2C2C2C] text-white text-center py-1 px-3 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border-1  transition-colors" >
                Assign Role
              </button>
            </div>
          </div>
        </div>

        {/* Manage Role Section */}
        <h1 className="text-5xl font-bold text-black mt-15 mb-5 ms-10" >
            Manage Role
          </h1>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
          
          {/* Role Management Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <button className="bg-[#2C2C2C] text-white px-4 py-1 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                Create Role
              </button>
              <button className="bg-[#2C2C2C] text-white px-4 py-1 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                Update Role
              </button>
              <button className="bg-[#2C2C2C] text-white px-4 py-1 rounded-xl text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                Delete Role
              </button>
            </div>

            {/* Search for Roles */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for Roles"
                  className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaFilter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Role Claim Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-bold text-black" >
                    Role/Claim
                  </th>
                  <th className="text-center py-3 px-2 font-bold text-black" >
                    User Management
                  </th>
                  <th className="text-center py-3 px-2 font-bold text-black" >
                    CSR & Education
                  </th>
                  <th className="text-center py-3 px-2 font-bold text-black" >
                    Partner & Voucher
                  </th>
                  <th className="text-center py-3 px-2 font-bold text-black" >
                    Financial & Reporting
                  </th>
                  <th className="text-center py-3 px-2 font-bold text-black" >
                    Customer Support
                  </th>
                  <th className="text-left py-3 px-2 font-bold text-black" >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Admin Role */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="text-sm py-3 px-2 text-black font-medium" >
                    Admin
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.admin.userManagement}
                      onChange={() => handleRolePermissionChange('admin', 'userManagement')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.admin.csrEducation}
                      onChange={() => handleRolePermissionChange('admin', 'csrEducation')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.admin.partnerVoucher}
                      onChange={() => handleRolePermissionChange('admin', 'partnerVoucher')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.admin.financialReporting}
                      onChange={() => handleRolePermissionChange('admin', 'financialReporting')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.admin.customerSupport}
                      onChange={() => handleRolePermissionChange('admin', 'customerSupport')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 ">
                    <div className="flex gap-2">
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Edit
                      </button>
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Show Members
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Staff 1 Role */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="text-sm py-3 px-2 text-black font-medium" >
                    Staff 1
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff1.userManagement}
                      onChange={() => handleRolePermissionChange('staff1', 'userManagement')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff1.csrEducation}
                      onChange={() => handleRolePermissionChange('staff1', 'csrEducation')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff1.partnerVoucher}
                      onChange={() => handleRolePermissionChange('staff1', 'partnerVoucher')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff1.financialReporting}
                      onChange={() => handleRolePermissionChange('staff1', 'financialReporting')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff1.customerSupport}
                      onChange={() => handleRolePermissionChange('staff1', 'customerSupport')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Edit
                      </button>
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Show Members
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Staff 2 Role */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="text-sm py-3 px-2 text-black font-medium" >
                    Staff 2
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff2.userManagement}
                      onChange={() => handleRolePermissionChange('staff2', 'userManagement')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff2.csrEducation}
                      onChange={() => handleRolePermissionChange('staff2', 'csrEducation')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff2.partnerVoucher}
                      onChange={() => handleRolePermissionChange('staff2', 'partnerVoucher')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff2.financialReporting}
                      onChange={() => handleRolePermissionChange('staff2', 'financialReporting')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.staff2.customerSupport}
                      onChange={() => handleRolePermissionChange('staff2', 'customerSupport')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Edit
                      </button>
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Show Members
                      </button>
                    </div>
                  </td>
                </tr>

                {/* User Role */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="text-sm py-3 px-2 text-black font-medium" >
                    User
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.user.userManagement}
                      onChange={() => handleRolePermissionChange('user', 'userManagement')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.user.csrEducation}
                      onChange={() => handleRolePermissionChange('user', 'csrEducation')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.user.partnerVoucher}
                      onChange={() => handleRolePermissionChange('user', 'partnerVoucher')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.user.financialReporting}
                      onChange={() => handleRolePermissionChange('user', 'financialReporting')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={rolePermissions.user.customerSupport}
                      onChange={() => handleRolePermissionChange('user', 'customerSupport')}
                      className="rounded border-gray-300" 
                    />
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Edit
                      </button>
                      <button className="bg-[#2C2C2C] text-white px-3 py-1 rounded text-xs hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors" >
                        Show Members
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination for Role Management */}
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Transaction History Modal */}
      {showTransactionModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="">
                <h2 className="text-2xl font-bold text-black" >
                  Transaction History: 
                  
                </h2>
                <span className="text-xl ps-2" >{selectedUser?.name}</span> 
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-20 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowStatusFilter(!showStatusFilter)}
                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <FaFilter className="w-4 h-4 text-gray-600" />
                    <span className="text-xs" >
                      {selectedStatus}
                    </span>
                    <FaChevronDown className="w-3 h-3 text-gray-600" />
                  </button>
                  
                  {showStatusFilter && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setSelectedStatus('All');
                            setShowStatusFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                            selectedStatus === 'All' ? 'bg-gray-100 font-medium' : ''
                          }`}
                          
                        >
                          All Status
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStatus('Paid');
                            setShowStatusFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                            selectedStatus === 'Paid' ? 'bg-gray-100 font-medium' : ''
                          }`}
                          
                        >
                          Paid
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStatus('Pending');
                            setShowStatusFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                            selectedStatus === 'Pending' ? 'bg-gray-100 font-medium' : ''
                          }`}
                          
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStatus('Refund');
                            setShowStatusFilter(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs hover:bg-gray-100 ${
                            selectedStatus === 'Refund' ? 'bg-gray-100 font-medium' : ''
                          }`}
                          
                        >
                          Refund
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={closeTransactionModal}
                  className='text-red-500 mt-1 me-1'
                >
                  x
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-120px)]">
              {/* Transaction Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Invoice
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Amount
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Status
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Date
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Service
                      </th>
                      <th className="text-left py-3 px-2 font-bold text-black" >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="text-sm py-3 px-2 text-black" >
                          {transaction.invoice}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {transaction.amount}
                        </td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : transaction.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`} >
                            {transaction.status === 'Paid' && <FaCheck className="w-3 h-3 mr-1" />}
                            {transaction.status === 'Pending' && <FaClock className="w-3 h-3 mr-1" />}
                            {transaction.status === 'Refund' && <FaUndo className="w-3 h-3 mr-1" />}
                            {transaction.status === 'Paid' ? 'Paid' : transaction.status === 'Pending' ? 'Pending' : 'Refund'}
                          </span>
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {transaction.date}
                        </td>
                        <td className="text-sm py-3 px-2 text-black" >
                          {transaction.service}
                        </td>
                        <td className="py-3 px-2">
                          <button className="p-2 hover:bg-gray-100 rounded">
                            <FaEllipsisH className="w-4 h-4 text-gray-600" />
                          </button>
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
      )}
    </AdminLayout>
  );
}
