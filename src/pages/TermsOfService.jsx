import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
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
              ĐIỀU KHOẢN SỬ DỤNG
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-gray-800">
              Website E.C.O
            </h2>
            <p className="text-md 2xl:text-xl text-gray-600 mt-4">
              Cập nhật lần cuối: …/…/2025
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 2xl:p-[2.5vw] mb-8 md:mb-12">
            <p className="text-md 2xl:text-xl text-gray-800 mb-4">
              Chào mừng bạn đến với <span className="font-bold text-[#D68C45]">Website E.C.O</span> ("Website").
            </p>
            <p className="text-md 2xl:text-xl text-gray-800 mb-4">
              Bằng việc truy cập, đăng ký tài khoản, sử dụng chức năng thanh toán, đăng bài, bình luận hoặc tương tác trên Website, bạn mặc nhiên đồng ý với toàn bộ Điều khoản sử dụng dưới đây.
            </p>
            <p className="text-md 2xl:text-xl text-gray-800 font-semibold">
              Nếu bạn không đồng ý, vui lòng ngừng sử dụng Website.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 md:space-y-12 2xl:space-y-[4vh]">
            
            {/* Section 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                1. Mục đích và Phạm vi Hoạt động của Website
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-4">
                Website E.C.O được xây dựng và vận hành với các mục đích sau:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    1.1. Cung cấp thông tin chính thức
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Giới thiệu về dự án E.C.O, tầm nhìn, giá trị và các hoạt động bảo tồn môi trường, trồng cây, giáo dục cộng đồng.</li>
                    <li>Cập nhật tin tức, bài viết, báo cáo hoạt động, blog chuyên môn và các tài liệu truyền thông của E.C.O.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    1.2. Cung cấp dịch vụ trực tuyến
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Cho phép người dùng đăng ký tham gia chương trình, sự kiện, hoạt động trải nghiệm hoặc các dịch vụ liên quan.</li>
                    <li>Cung cấp chức năng thanh toán trực tuyến, chuyển khoản hoặc đóng góp/tài trợ cho các chương trình của E.C.O.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    1.3. Vận hành cộng đồng kết nối người dùng
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Cung cấp không gian chia sẻ bài viết cá nhân, cảm nhận, hình ảnh, câu chuyện liên quan đến môi trường.</li>
                    <li>Cho phép người dùng bình luận, tương tác, thảo luận với nhau trong khu vực cộng đồng.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    1.4. Kết nối và hỗ trợ người dùng
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Cung cấp kênh liên hệ để tiếp nhận câu hỏi, góp ý, hỗ trợ kỹ thuật, phản hồi dịch vụ.</li>
                    <li>Gửi email/SMS thông báo về chương trình, lịch hoạt động, xác nhận dịch vụ hoặc thanh toán.</li>
                  </ul>
                </div>
              </div>

              <p className="text-md 2xl:text-xl text-gray-800 mt-4 italic">
                Website E.C.O không phải là sàn giao dịch thương mại điện tử. Tất cả dịch vụ được cung cấp trực tiếp bởi đơn vị vận hành E.C.O.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                2. Quyền và Nghĩa Vụ của Người Dùng
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-4">
                Khi truy cập hoặc sử dụng Website E.C.O, người dùng đồng ý tuân thủ các quy định sau:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    2.1 Nghĩa vụ của người dùng
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký tài khoản, đăng ký dịch vụ hoặc gửi liên hệ.</li>
                    <li>Chịu trách nhiệm về toàn bộ nội dung mà bạn đăng tải trên Website, bao gồm bài viết, hình ảnh, bình luận và chia sẻ.</li>
                    <li>Không sử dụng Website cho các mục đích vi phạm pháp luật, bao gồm nhưng không giới hạn:
                      <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                        <li>Gian lận, lừa đảo, mạo danh tổ chức/cá nhân khác.</li>
                        <li>Đăng tải nội dung độc hại, kích động, phản cảm, thù hằn, bạo lực, vi phạm thuần phong mỹ tục.</li>
                        <li>Phát tán mã độc, virus, phần mềm gây hại hoặc thực hiện các hành vi tấn công mạng.</li>
                      </ul>
                    </li>
                    <li>Không được:
                      <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                        <li>Thu thập, sử dụng hoặc chia sẻ thông tin cá nhân của người dùng khác khi chưa có sự đồng ý.</li>
                        <li>Gây gián đoạn hoạt động của Website hoặc cố gắng truy cập trái phép hệ thống.</li>
                        <li>Sao chép, chỉnh sửa, phân phối, khai thác thương mại bất kỳ nội dung nào thuộc E.C.O khi chưa được chấp thuận bằng văn bản.</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    2.2. Quyền của E.C.O đối với nội dung người dùng
                  </h4>
                  <p className="text-md 2xl:text-xl text-gray-700 mb-2">
                    E.C.O có quyền xem xét, kiểm duyệt hoặc gỡ bỏ bất kỳ nội dung nào được đăng tải bởi người dùng nếu nội dung đó:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Vi phạm pháp luật hoặc Điều khoản sử dụng.</li>
                    <li>Không phù hợp với định hướng phát triển cộng đồng của E.C.O.</li>
                    <li>Gây nguy cơ ảnh hưởng tới an toàn thông tin hoặc trải nghiệm người dùng khác.</li>
                  </ul>
                  <p className="text-md 2xl:text-xl text-gray-700 mt-2">
                    E.C.O có quyền:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Tạm khóa hoặc chấm dứt tài khoản vi phạm.</li>
                    <li>Từ chối cung cấp dịch vụ khi phát hiện dấu hiệu gian lận hoặc vi phạm.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                3. Quyền và Trách Nhiệm của E.C.O
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    3.1. Cam kết của E.C.O
                  </h4>
                  <p className="text-md 2xl:text-xl text-gray-700 mb-2">E.C.O cam kết:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Cung cấp thông tin trung thực, rõ ràng về dịch vụ, chương trình và hoạt động.</li>
                    <li>Bảo vệ dữ liệu cá nhân người dùng theo Chính sách Bảo mật Thông tin.</li>
                    <li>Duy trì hoạt động ổn định, an toàn và liên tục của Website trong phạm vi khả năng kỹ thuật.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg 2xl:text-2xl font-semibold text-gray-800 mb-2">
                    3.2. Giới hạn trách nhiệm
                  </h4>
                  <p className="text-md 2xl:text-xl text-gray-700 mb-2">E.C.O không chịu trách nhiệm đối với:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                    <li>Các sự cố kỹ thuật ngoài khả năng kiểm soát (mất điện, mạng lỗi, thiên tai, tấn công mạng…).</li>
                    <li>Hành vi hoặc nội dung do người dùng đăng tải.</li>
                    <li>Thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng Website.</li>
                    <li>Các giao dịch hoặc tương tác giữa người dùng với bên thứ ba (nếu có).</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                4. Quy trình Đăng ký Dịch vụ / Tham gia Chương trình
              </h3>
              <p className="text-md 2xl:text-xl text-gray-800 mb-4">
                Áp dụng cho các dịch vụ E.C.O cung cấp (ví dụ: trải nghiệm, trồng cây, hoạt động môi trường, sự kiện…):
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Người dùng đăng ký thông qua biểu mẫu trên Website.</li>
                <li>E.C.O gửi thông báo xác nhận qua email hoặc số điện thoại.</li>
                <li>Người dùng tiến hành thanh toán (nếu dịch vụ yêu cầu phí).</li>
                <li>E.C.O xác nhận thanh toán và cung cấp thông tin chi tiết về lịch trình, địa điểm, điều kiện tham gia.</li>
                <li>E.C.O triển khai dịch vụ/hoạt động theo đúng nội dung đã công bố.</li>
              </ol>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4 italic">
                Trong trường hợp có thay đổi hoặc hủy bỏ: E.C.O sẽ thông báo cho người dùng theo chính sách cụ thể từng dịch vụ.
              </p>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                5. Tài khoản Người dùng
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Người dùng chịu trách nhiệm bảo mật tên đăng nhập và mật khẩu.</li>
                <li>Không chia sẻ tài khoản với người khác.</li>
                <li>Người dùng phải thông báo ngay cho E.C.O khi phát hiện truy cập trái phép hoặc bất thường.</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">E.C.O có quyền:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Khóa tạm thời hoặc vĩnh viễn tài khoản vi phạm.</li>
                <li>Thu hồi tài khoản khi phát hiện hành vi gian lận, bất hợp pháp hoặc gây hại cho cộng đồng.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                6. Thanh toán và Tài trợ
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Website hỗ trợ các hình thức thanh toán được E.C.O công bố (chuyển khoản ngân hàng, ví điện tử, v.v.).</li>
                <li>Mọi giao dịch cho mục đích quyên góp, thông qua trang quyên góp của Website sẽ được công khai một số thông tin cần thiết như nội dung chuyển khoản, số tiền, ngày giao dịch ngay trên Website để đảm bảo được tính minh bạch của dự án.</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">Nếu thanh toán qua cổng trung gian:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>E.C.O không lưu trữ số thẻ, mã CVV hoặc bất kỳ dữ liệu ngân hàng nào của người dùng.</li>
                <li>Người dùng phải đảm bảo cung cấp đầy đủ thông tin thanh toán để E.C.O xử lý giao dịch đúng thời gian.</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">Với các khoản "tài trợ/đóng góp":</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>E.C.O cam kết sử dụng đúng mục đích và công khai minh bạch theo từng chương trình.</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                7. Liên kết đến Website bên thứ ba
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-4">
                Website có thể chứa liên kết sang các trang ngoài E.C.O (ví dụ: cổng thanh toán, mạng xã hội, Website đối tác).
              </p>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">E.C.O không quản lý và không chịu trách nhiệm về:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Nội dung, tính bảo mật, độ chính xác của thông tin ở các Website đó.</li>
                <li>Các rủi ro phát sinh khi người dùng truy cập trang ngoài.</li>
              </ul>
              <p className="text-md 2xl:text-xl text-gray-700 mt-4">
                Người dùng nên cân nhắc và xem kỹ chính sách của từng trang trước khi sử dụng.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                8. Quyền sở hữu trí tuệ
              </h3>
              <p className="text-md 2xl:text-xl text-gray-700 mb-4">
                Mọi nội dung trên Website bao gồm: logo, hình ảnh, video, chữ viết, đồ họa, thiết kế, mã nguồn, tài liệu… đều thuộc quyền sở hữu của E.C.O hoặc được sử dụng theo giấy phép hợp pháp.
              </p>
              <p className="text-md 2xl:text-xl text-gray-700 mb-4">
                Người dùng không được sao chép, chỉnh sửa, trích xuất, phân phối hay sử dụng vào mục đích thương mại khi chưa có sự đồng ý bằng văn bản từ E.C.O.
              </p>
              <p className="text-md 2xl:text-xl text-gray-700 mb-2">Nội dung do người dùng đăng tải:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>Người dùng vẫn giữ quyền sở hữu.</li>
                <li>Tuy nhiên, khi đăng lên Website, người dùng đồng ý cấp cho E.C.O quyền sử dụng không độc quyền để hiển thị, lưu trữ và quản lý nội dung đó nhằm vận hành cộng đồng.</li>
              </ul>
            </div>

            {/* Section 9 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                9. Thay đổi điều khoản
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-md 2xl:text-xl text-gray-700">
                <li>E.C.O có quyền cập nhật Điều khoản sử dụng bất kỳ lúc nào.</li>
                <li>Mọi thay đổi sẽ được công bố trên Website và có hiệu lực ngay khi đăng tải.</li>
              </ul>
            </div>

            {/* Section 10 - Contact */}
            <div className="bg-gradient-to-br from-[#D68C45]/10 to-[#D68C45]/5 rounded-xl shadow-sm border border-[#D68C45]/30 p-6 md:p-8 2xl:p-[2.5vw]">
              <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-[#D68C45] mb-4">
                10. Liên hệ
              </h3>
              <div className="space-y-2 text-md 2xl:text-xl text-gray-800">
                <p><span className="font-semibold">Đơn vị quản lý:</span> E.C.O</p>
                <p><span className="font-semibold">Địa chỉ:</span> …</p>
                <p><span className="font-semibold">Email hỗ trợ:</span> …</p>
                <p><span className="font-semibold">Hotline:</span> …</p>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="text-sm md:text-base 2xl:text-lg text-gray-600 italic">
              Cảm ơn bạn đã tin tưởng và đồng hành cùng E.C.O trong hành trình bảo vệ môi trường!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

