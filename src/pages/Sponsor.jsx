import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import sponsorBg from "../assets/get_involved/Sponsor/img.png";
import api from "../utils/api";

export default function Sponsor() {
  // --- STATE TỪ CODE MỚI ---
  const [selectedAmount, setSelectedAmount] = useState("20.000");
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [description, setDescription] = useState("");

  const amounts = [
    "10.000",
    "20.000",
    "50.000",
    "100.000",
    "200.000",
    "500.000",
  ];

  // --- LOGIC FETCH API TỪ CODE MỚI ---
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/donations/history");
      setTransactions(response.data || []);
    } catch (err) {
      setError("Failed to fetch transactions");
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " vnđ";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "---";
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --- LOGIC PHÂN TRANG ---
  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageTransactions = transactions.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [transactions, currentPage, totalPages]);

  // --- HÀM XỬ LÝ THANH TOÁN ---
  const handleSponsor = async (e) => {
    e.stopPropagation();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const raw =
        customAmount && customAmount.trim().length > 0
          ? customAmount
          : selectedAmount;
      const normalized = parseInt(raw.replace(/\D/g, ""), 10) || 0;
      if (normalized <= 0) {
        alert("Vui lòng nhập số tiền hợp lệ");
        setIsLoading(false);
        return;
      }

      const response = await api.post("/api/donations", {
        amount: normalized,
        description: description.trim() || "Ung ho quy moi truong",
      });

      const data = response.data;
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Không nhận được đường dẫn thanh toán");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Tạo liên kết thanh toán thất bại. Vui lòng thử lại.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* --- HERO SECTION: CẤU TRÚC CŨ (Desktop) + RESPONSIVE (Mobile) --- */}
      {/* Mobile: h-auto py-20, Desktop: h-[90vh] như cũ */}
      <section className="relative w-full flex flex-col lg:block items-center justify-center min-h-screen lg:min-h-0 lg:h-[90vh] 2xl:h-[90vh] select-none">
        {/* Navbar sticky bên trong section như code cũ */}
        <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
          <Navbar />
        </div>

        {/* Background Image */}
        <img
          src={sponsorBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div>
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Main Content Wrapper: Mobile dùng flex-col, Desktop dùng flex-row như cũ */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-6 lg:px-[4vw] 2xl:px-[5vw] 2xl:pt-15 xl:pt-7 pt-24 lg:pt-10 pb-10 lg:pb-0">
            {/* Left Content */}
            {/* Mobile: w-full text-center, Desktop: w-1/2 text-left */}
            <div className="text-white w-full lg:w-1/2 flex flex-col items-center lg:block mb-10 lg:mb-0">
              <p className="text-xl lg:text-xl 2xl:text-3xl mb-1 mt-0 lg:-mt-20 lg:ms-15">
                Cùng gieo mầm xanh
              </p>
              <h1 className="text-5xl lg:text-5xl 2xl:text-7xl font-bold mb-1 lg:ms-15">
                SPONSOR
              </h1>
              {/* Class ms-86 của desktop rất lớn, mobile phải reset về 0 */}
              <h2 className="text-5xl lg:text-5xl 2xl:text-7xl font-bold mb-1 lg:ms-86 text-[#D68C45] 2xl:ms-102">
                A TREE
              </h2>
              <p className="text-xl lg:text-xl 2xl:text-3xl mb-10 lg:ms-57 mt-2 lg:mt-0">
                Hành động nhỏ - Thay đổi lớn.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center">
                <SocialLinks
                  iconSize="w-4 h-4 lg:w-[1.2vw] lg:h-[1.2vw] 2xl:w-[1.1vw] 2xl:h-[1.1vw]"
                  iconColor="text-white"
                  hoverColor="hover:scale-110"
                  className="gap-4"
                  customWrapper={(children) => (
                    <div className="w-9 h-9 lg:w-[2.2vw] lg:h-[2.2vw] 2xl:w-[2.3vw] 2xl:h-[2.3vw] bg-[#D68C45] rounded-full flex items-center justify-center hover:bg-[#B87A3A] transition-colors duration-300">
                      {children}
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Right Content - Sponsorship Box */}
            {/* Mobile: w-full, Desktop: w-4/9 (Code cũ) */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl 2xl:rounded-3xl px-6 py-6 lg:px-[2.2vw] 2xl:px-[2.5vw] lg:py-[3vh] 2xl:py-[2.5vh] shadow-lg w-full max-w-md lg:max-w-none lg:w-4/9 lg:w-[45vw] 2xl:w-[41vw] border border-white/60 lg:mt-[4vh] lg:me-10 lg:me-[4vw]">
              <div className="mb-6 text-center">
                <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[#D68C45]">
                  Cùng hành động, tạo khác biệt.
                </h3>
                <p className="text-sm lg:text-md 2xl:text-xl text-gray-800 lg:text-inherit">
                  Mỗi cây được trồng là một hi vọng được nuôi dưỡng.
                </p>
              </div>

              {/* Amount Selection Box */}
              <div className="bg-white rounded-xl p-4 lg:p-1.5vw lg:p-[1.6vw] 2xl:p-[1.8vw] shadow-lg mb-6">
                <p className="text-lg lg:text-lg 2xl:text-xl mb-4 text-gray-700">
                  Chọn mức gieo mầm
                </p>
                <div className="grid grid-cols-3 gap-3 lg:gap-[1vw] 2xl:gap-[1.2vw] mb-4">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-2 lg:py-2.5 lg:py-[1vh] 2xl:py-[1vh] px-2 lg:px-3.5 lg:px-[0.8vw] 2xl:px-[0.8vw] rounded-lg text-sm lg:text-sm 2xl:text-lg border transition-all duration-300 truncate ${
                        selectedAmount === amount
                          ? "bg-[#D68C45] text-white border-[#D68C45]"
                          : "bg-white text-gray-700 border-[#D68C45] hover:bg-[#D68C45] hover:text-white"
                      }`}
                    >
                      {amount} VND
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex items-center border border-[#D68C45] rounded-lg p-2.5 lg:p-[0.8vw] 2xl:p-[0.9vw] bg-white mb-4">
                  <span className="text-gray-700 mr-2 whitespace-nowrap">
                    Khác
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="flex-1 w-full bg-transparent outline-none text-gray-700 text-sm lg:text-base 2xl:text-lg"
                    placeholder="Nhập giá trị"
                  />
                  <span className="text-gray-700 ml-2 whitespace-nowrap">
                    VND
                  </span>
                </div>

                {/* Lời nhắn (Thêm vào design cũ) */}
                <div className="mt-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nhập tên của bạn hoặc lời nhắn gửi..."
                    rows="2"
                    className="w-full p-2.5 lg:p-[0.8vw] rounded-lg border border-[#D68C45] focus:outline-none focus:bg-gray-50 resize-none text-gray-700 text-sm lg:text-base 2xl:text-lg"
                  />
                </div>
              </div>

              {/* Sponsor Now Button */}
              <button
                onClick={handleSponsor}
                disabled={isLoading}
                className="bg-white text-black font-bold py-3 lg:py-2 lg:py-[1vh] 2xl:py-[1.1vh] rounded-full lg:rounded-[15px] 2xl:rounded-[20px] w-full lg:w-[310px] lg:w-[22vw] 2xl:w-[18vw] hover:bg-black hover:text-white transition-colors duration-300 shadow-lg text-xl lg:text-xl 2xl:text-2xl flex items-center justify-center mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Đang xử lý..." : "Gieo Mầm Ngay"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- HISTORY SECTION: GIỮ NGUYÊN TỪ CODE MỚI --- */}
      <section className="bg-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  Minh bạch giao dịch
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Tất cả các giao dịch đóng góp được công khai minh bạch
                </p>
              </div>
              {!loading && !error && transactions.length > 0 && (
                <div className="text-sm text-gray-500">
                  Hiển thị {startIndex + 1}-{Math.min(endIndex, totalItems)}{" "}
                  trong {totalItems} giao dịch
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">Đang tải giao dịch...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={fetchTransactions}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Thử lại
              </button>
            </div>
          )}

          {!loading && !error && transactions.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap">
                      Mã đóng góp
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">
                      Mô tả
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap">
                      Số tiền
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap">
                      Ngày giao dịch
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageTransactions.map((transaction, index) => (
                    <tr
                      key={transaction.orderCode || index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900">
                        #{transaction.orderCode}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {transaction.description || "Giao dịch đóng góp"}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {formatCurrency(transaction.amount || 0)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {formatDate(transaction.paidAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && transactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Chưa có giao dịch nào</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? "bg-[#D68C45] text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
