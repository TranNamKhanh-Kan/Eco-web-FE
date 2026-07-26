import h1 from "../assets/homepage/h1.jpg";
import h2 from "../assets/homepage/h2.jpg";
import h3 from "../assets/homepage/h3.jpg";
import h4 from "../assets/homepage/h4.jpg";

// Centralized forest content used across Home and detail pages
export const forests = [
  {
    slug: "mixed-hardwood",
    route: "/mixed-hardwood",
    image: h1,
   
    bigTitle1: "RỪNG NÚI ĐÁ VÔI ",
    description: "Hệ sinh thái đặc hữu trên địa hình karst",
    detail: {
      location: "Phổ biến ở các vùng trung du và miền núi phía Bắc, Bắc Trung Bộ và một phần Nam Trung Bộ, tiêu biểu tại Ninh Bình, Quảng Bình, Hòa Bình, Hà Giang, Cao Bằng.",
      formation: "Phát triển trên địa hình karst đá vôi phong hóa, với tầng đất mỏng, độ dốc lớn và khí hậu khô cục bộ. Thảm thực vật chủ yếu gồm cây gỗ thường xanh thân nhỏ, cùng nhiều loài dây leo, dương xỉ, phong lan đặc hữu thích nghi với môi trường khắc nghiệt.",
      ecological_role: "Rừng núi đá vôi bảo vệ đất, chống xói mòn, điều hòa nước ngầm, đồng thời là nơi cư trú của nhiều loài quý hiếm, có giá trị cao trong bảo tồn đa dạng sinh học quốc gia."
    },
  },
  {
    slug: "wetland",
    route: "/wetland",
    image: h2,
   
    bigTitle1: "RỪNG NGẬP MẶN",
    description: "Lá chắn xanh của vùng ven biển",
    detail: {
        location: "Tập trung dọc ven biển, cửa sông và đầm phá ở Bắc Bộ, miền Trung và đặc biệt là Nam Bộ, tiêu biểu tại Cần Giờ, Cà Mau, Bạc Liêu, Bến Tre.",
        formation: "Phát triển ở vùng giao thoa giữa nước mặn, nước lợ và đất bùn, chịu ảnh hưởng của thủy triều. Thảm thực vật chủ yếu gồm đước, mắm, bần, dà, cóc trắng và các loài chịu mặn khác.",
        ecological_role: "Rừng ngập mặn là tấm lá chắn tự nhiên chống xói lở, bão và triều cường, đồng thời là nôi sinh sản của sinh vật biển và nguồn hấp thụ carbon quan trọng, góp phần ứng phó biến đổi khí hậu và bảo vệ sinh kế cộng đồng ven biển."
      },
  },
  {
    slug: "bamboo-forest",
    route: "/bamboo-forest",
    image: h3,
   
    bigTitle1: "RỪNG TRE NỨA, RỪNG HỖN GIAO",
    description: "Rừng thứ sinh phục hồi sau canh tác",
    detail: {
      location:
        "Phổ biến ở các vùng trung du và miền núi trên cả nước, đặc biệt tại những khu vực từng bị khai thác hoặc canh tác nương rẫy.",
      formation:
        "Là dạng rừng phục hồi thứ sinh, phát triển trên đất bỏ hoang sau canh tác. Thành phần chính gồm tre Lồ ô (Bambusa blumeana), nứa (Neohouzeaua spp.), tre Mum, xen với các loài gỗ ưa sáng như Chòi mòi và đa, sung.",
      ecological_role:
        "Rừng tre nứa giúp giữ đất, chống xói mòn, ổn định nguồn nước và tạo nền cho quá trình tái sinh rừng tự nhiên, góp phần duy trì đa dạng sinh học và cải thiện môi trường địa phương.",
    },
  },
  {
    slug: "semi-deciduous-forest",
    route: "/semi-deciduous-forest",
    image: h4,
   
    bigTitle1: "RỪNG NGUYÊN SINH",
    description: "Kho báu tự nhiên của Việt Nam",
    detail: {
        location:
          "Tập trung ở vùng núi cao, địa hình hiểm trở như Tây Bắc, Bắc Trung Bộ, Tây Nguyên và Nam Bộ - tiêu biểu có Cúc Phương, Pù Mát, Yok Đôn, Cát Tiên.",
        formation:
          "Là rừng tự nhiên ít chịu tác động con người, có nhiều tầng tán, cây gỗ lớn, thảm thực vật dày và đa dạng loài - từ cây cổ thụ, dây leo, phong lan đến động vật quý hiếm như voi, voọc, tê tê, hổ.",
        ecological_role:
          "Giữ vai trò trung tâm trong bảo tồn đa dạng sinh học, điều hòa khí hậu, giữ đất – giữ nước, và là nguồn lưu trữ carbon tự nhiên quan trọng, nền tảng cho nghiên cứu và phục hồi rừng.",
      },
    
  },
];
