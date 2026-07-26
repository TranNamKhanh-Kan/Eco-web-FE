import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="sticky top-0 z-30 w-full flex justify-center items-center select-none m-0">
        <Navbar />
      </div>

      <section className="bg-white py-10 md:py-16 2xl:py-[8vh]">
        <div className=" mx-auto px-6 md:px-12 lg:px-20 2xl:px-[8vw] max-w-7xl">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 2xl:mb-[6vh]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-[#D68C45] mb-4">
              CHÍNH SÁCH BẢO MẬT THÔNG TIN
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-800">
              E.C.O
            </h2>
            <p className="text-md 2xl:text-xl text-gray-600 mt-4">
              Cập nhật lần cuối: …/…/2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 2xl:p-[2.5vw] mb-8 md:mb-12">
            <p className="text-md 2xl:text-xl text-gray-800 mb-4">
              <span className="font-bold text-[#D68C45]">E.C.O</span> ("Chúng tôi") cam kết bảo vệ dữ liệu cá nhân và quyền riêng tư của người dùng khi truy cập và sử dụng Website E.C.O ("Website"). Chính sách này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ thông tin của bạn.
            </p>
            <p className="text-md 2xl:text-xl text-gray-800 font-semibold">
              Việc bạn tiếp tục truy cập hoặc sử dụng Website đồng nghĩa với việc bạn đã đọc và đồng ý với Chính sách này.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 md:space-y-12 2xl:space-y-[4vh]">
            
            {/* Section 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                1. Phạm vi áp dụng
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800">
                Chính sách này áp dụng đối với tất cả cá nhân truy cập, tương tác, đăng ký dịch vụ hoặc gửi thông tin qua Website E.C.O.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                2. Loại thông tin chúng tôi thu thập
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    2.1. Thông tin cá nhân do bạn cung cấp
                  </h4>
                  <p className="text-md 2xl:text-xl text-gray-700 mb-2">Bao gồm nhưng không giới hạn:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Họ tên</li>
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Địa chỉ</li>
                    <li>Thông tin đăng ký sự kiện, hoạt động trồng cây, đóng góp/tài trợ</li>
                    <li>Nội dung phản hồi, câu hỏi, yêu cầu hỗ trợ</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    2.2. Thông tin thu thập tự động
                  </h4>
                  <p className="text-md 2xl:text-xl text-gray-700 mb-2">Khi bạn truy cập Website, hệ thống có thể tự động thu thập:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Địa chỉ IP</li>
                    <li>Thông tin trình duyệt, thiết bị</li>
                    <li>Cookies và dữ liệu hành vi (thời gian truy cập, trang đã xem, lượt nhấp)</li>
                    <li>Dữ liệu phân tích (analytics) nhằm tối ưu trải nghiệm người dùng</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                3. Mục đích sử dụng thông tin
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-2">Chúng tôi sử dụng thông tin để:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Quản lý tài khoản và xử lý đăng ký của người dùng</li>
                <li>Liên hệ thông báo về hoạt động, sự kiện, thay đổi dịch vụ</li>
                <li>Hỗ trợ kỹ thuật và giải đáp yêu cầu</li>
                <li>Ghi nhận đóng góp, tài trợ và gửi xác nhận (nếu có)</li>
                <li>Phân tích, cải thiện chất lượng Website và nội dung</li>
                <li>Đảm bảo an toàn – bảo mật hệ thống</li>
                <li>Tuân thủ yêu cầu pháp luật khi cần thiết</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                4. Chia sẻ thông tin với bên thứ ba
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-4 font-semibold">
                E.C.O không bán hoặc trao đổi thông tin cá nhân cho bên thứ ba.
              </p>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">Thông tin chỉ có thể được chia sẻ trong các trường hợp:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Bên đối tác hỗ trợ vận hành (ví dụ: cổng thanh toán, đơn vị tổ chức sự kiện, nền tảng email)</li>
                <li>Cơ quan nhà nước theo yêu cầu pháp lý</li>
                <li>Khi bạn đồng ý rõ ràng cho phép chia sẻ</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4 italic">
                Tất cả đối tác nhận dữ liệu đều phải tuân thủ tiêu chuẩn bảo mật của E.C.O.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                5. Lưu trữ và bảo mật dữ liệu
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">Chúng tôi áp dụng các biện pháp bảo mật phù hợp bao gồm:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Mã hóa thông tin nhạy cảm</li>
                <li>Giới hạn quyền truy cập nội bộ</li>
                <li>Sao lưu dữ liệu định kỳ</li>
                <li>Sử dụng SSL/TLS cho mọi giao dịch truyền tải</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">
                Thông tin cá nhân chỉ được lưu trữ trong thời hạn cần thiết cho mục đích sử dụng đã nêu hoặc theo quy định pháp luật.
              </p>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                6. Quyền của người dùng
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">Bạn có quyền:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Yêu cầu truy cập thông tin cá nhân</li>
                <li>Yêu cầu chỉnh sửa hoặc cập nhật dữ liệu</li>
                <li>Yêu cầu xóa thông tin (trừ trường hợp phải lưu theo quy định)</li>
                <li>Từ chối nhận email thông báo hoặc nội dung tiếp thị</li>
                <li>Khiếu nại nếu bạn cho rằng thông tin bị sử dụng sai mục đích</li>
              </ul>
              <div className="mt-4 bg-[#D68C45]/10 rounded-lg p-4 border-l-4 border-[#D68C45]">
                <p className="text-md 2xl:text-xl text-gray-800">
                  <span className="font-semibold">Mọi yêu cầu liên hệ qua:</span>{" "}
                  <a href="mailto:treesforfuture.eco@gmail.com" className="text-[#D68C45] hover:underline font-medium">
                    treesforfuture.eco@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                7. Cookies và các công nghệ theo dõi
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">Website E.C.O sử dụng cookies để:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Ghi nhớ tùy chọn người dùng</li>
                <li>Phân tích hành vi truy cập</li>
                <li>Cá nhân hóa nội dung hiển thị</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">
                Bạn có thể tắt cookies trong phần cài đặt trình duyệt, tuy nhiên một số tính năng có thể hoạt động không đầy đủ.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                8. Liên kết ngoài
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">
                Website E.C.O có thể chứa liên kết đến Website của bên thứ ba.
              </p>
              <p className="text-md 2xl:text-xl text-gray-700">
                E.C.O không chịu trách nhiệm về nội dung, bảo mật hay hoạt động của các Website này.
              </p>
            </div>

            {/* Section 9 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                9. Thay đổi chính sách
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>E.C.O có quyền điều chỉnh chính sách bảo mật bất cứ lúc nào.</li>
                <li>Mọi thay đổi sẽ được cập nhật trên Website và có hiệu lực ngay lập tức.</li>
              </ul>
            </div>

            {/* Section 10 - Contact */}
            <div className="bg-gradient-to-br from-[#D68C45]/10 to-[#D68C45]/5 rounded-xl shadow-sm border border-[#D68C45]/30 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                10. Thông tin liên hệ
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-4">
                Nếu bạn có câu hỏi liên quan đến Chính sách bảo mật, vui lòng liên hệ:
              </p>
              <div className="space-y-2 text-md 2xl:text-xl text-gray-800">
                <p><span className="font-semibold">Email:</span> ………</p>
                <p><span className="font-semibold">Hotline:</span> ………</p>
                <p><span className="font-semibold">Địa chỉ:</span> ………</p>
              </div>
            </div>

          </div>

          {/* Footer note with icon */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D68C45]/10 via-[#D68C45]/5 to-[#D68C45]/10 px-8 py-4 rounded-full">
              <svg className="w-5 h-5 text-[#D68C45]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <p className="text-sm md:text-base 2xl:text-lg text-gray-800 font-medium">
                Thông tin của bạn luôn được bảo vệ an toàn cùng E.C.O
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

