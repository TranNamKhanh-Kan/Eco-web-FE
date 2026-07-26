import React, { useEffect, useState, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Chart, registerables } from 'chart.js';
import api from '../../utils/api';
import { FaUsers, FaHandshake, FaChartLine, FaArrowUp, FaArrowDown, FaCalendarAlt } from 'react-icons/fa';

// Đăng ký các components của Chart.js
Chart.register(...registerables);

// Format currency helper function
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' vnđ';
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Hàm để gọi API lấy dữ liệu dashboard
  const fetchDashboardData = async (from = null, to = null) => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      // Format date để backend nhận diện đúng (ISO 8601 format)
      if (from) {
        // Nếu chỉ có date (YYYY-MM-DD), thêm time để đảm bảo timezone đúng
        params.fromDate = from.includes('T') ? from : `${from}T00:00:00Z`;
      }
      if (to) {
        params.toDate = to.includes('T') ? to : `${to}T23:59:59Z`;
      }

      const response = await api.get('/api/dashboard', { params });
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load dữ liệu lần đầu (mặc định 7 ngày gần nhất)
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Vẽ biểu đồ khi có dữ liệu
  useEffect(() => {
    // Sau khi backend trả về camelCase, chỉ cần dùng camelCase
    const chartData = dashboardData?.revenueChart;
    if (!chartData || !chartRef.current) return;

    // Xóa chart cũ nếu có
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const chartDataConfig = {
      labels: chartData.map(point => point.label),
      datasets: [{
        label: 'Doanh thu',
        data: chartData.map(point => point.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Doanh thu: ' + formatCurrency(context.parsed.y);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
              }
              return value;
            }
          }
        }
      }
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: chartDataConfig,
      options: chartOptions,
    });

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [dashboardData]);

  // Xử lý filter theo ngày
  const handleFilter = () => {
    // Nếu có ít nhất một ngày thì gọi API với params
    if (fromDate || toDate) {
      fetchDashboardData(fromDate || null, toDate || null);
    } else {
      // Nếu không có ngày nào, reset về mặc định (7 ngày gần nhất)
      fetchDashboardData();
    }
  };

  // Reset filter
  const handleResetFilter = () => {
    setFromDate('');
    setToDate('');
    fetchDashboardData();
  };

  // Component hiển thị Metric Card
  const MetricCard = ({ title, value, previousValue, growthPercent, icon: Icon, formatValue = (v) => v }) => {
    const isPositive = growthPercent >= 0;
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#797979] mb-1">{title}</p>
            <p className="text-2xl font-bold text-black mb-2">
              {formatValue(value)}
            </p>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <FaArrowUp className="w-3 h-3" />
              ) : (
                <FaArrowDown className="w-3 h-3" />
              )}
              <span className="font-medium">
                {Math.abs(growthPercent).toFixed(2)}%
              </span>
              <span className="text-gray-500 text-xs ml-1">vs kỳ trước</span>
            </div>
          </div>
          <div className="ml-4">
            <Icon className="w-12 h-12 text-gray-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        {/* Date Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Lọc theo ngày:</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Từ ngày:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Đến ngày:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={handleFilter}
              className="bg-[#2C2C2C] text-white px-4 py-1 rounded-lg text-sm hover:text-[#2C2C2C] hover:bg-white hover:border-[#2C2C2C] hover:border transition-colors"
            >
              Áp dụng
            </button>
            {(fromDate || toDate) && (
              <button
                onClick={handleResetFilter}
                className="bg-gray-200 text-gray-700 px-4 py-1 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Đang tải dữ liệu...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">
              {error}
            </p>
            <button
              onClick={() => fetchDashboardData(fromDate || null, toDate || null)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && dashboardData && (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="Tổng doanh thu"
                value={dashboardData.totalRevenue?.value || 0}
                previousValue={dashboardData.totalRevenue?.previousValue || 0}
                growthPercent={dashboardData.totalRevenue?.growthPercent || 0}
                icon={FaChartLine}
                formatValue={formatCurrency}
              />
              <MetricCard
                title="Người dùng mới"
                value={dashboardData.newUsers?.value || 0}
                previousValue={dashboardData.newUsers?.previousValue || 0}
                growthPercent={dashboardData.newUsers?.growthPercent || 0}
                icon={FaUsers}
              />
              <MetricCard
                title="Phản hồi đã xử lý"
                value={dashboardData.processedContacts?.value || 0}
                previousValue={dashboardData.processedContacts?.previousValue || 0}
                growthPercent={dashboardData.processedContacts?.growthPercent || 0}
                icon={FaHandshake}
              />
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-4">
                Biểu đồ doanh thu
              </h2>
              <div className="h-80">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
