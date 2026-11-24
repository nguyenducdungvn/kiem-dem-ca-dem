/* =========================================================
   CẤU HÌNH TÁC GIẢ – sửa file này để đổi thông tin của bạn.
   Để trống trường nào thì phần đó tự ẩn.
   ========================================================= */
window.GAME_CONFIG = {
  author: 'Nguyễn Đức Dũng',         // Tên tác giả hiển thị
  contact: '',                      // Email hoặc trang cá nhân (không bắt buộc)
  gameUrl: 'https://nguyenducdungvn.github.io/kiem-dem-ca-dem/',   // Đường dẫn chơi game (GitHub Pages)
  repoUrl: 'https://github.com/nguyenducdungvn/kiem-dem-ca-dem',    // Kho mã nguồn

  /* Góp ý của người chơi: mở GitHub Issues với nội dung điền sẵn, hoặc chép để gửi nơi khác */
  feedback: {
    github: true,                   // mở trang tạo Issue điền sẵn nội dung
    email: '',                      // ví dụ 'tacgia@gmail.com' – để trống thì ẩn nút gửi email
    formUrl: ''                     // ví dụ link Google Form – để trống thì ẩn
  },

  /* Đăng ký nhận màn mới / câu chuyện tiếp theo */
  subscribe: {
    issueUrl: 'https://github.com/nguyenducdungvn/kiem-dem-ca-dem/issues/1',   // Issue "Đăng ký nhận truyện mới" (bấm Subscribe để nhận thông báo)
    links: [
      // { label: 'Trang Facebook', url: 'https://facebook.com/...' },
      // { label: 'Nhóm Zalo', url: 'https://zalo.me/g/...' }
    ]
  },

  coffee: {
    message: 'Nếu câu chuyện này làm bạn thức khuya thêm một chút, mời mình một ly cà phê để mình viết tiếp các màn sau nhé.',
    links: [
      // { label: 'Ko-fi', url: 'https://ko-fi.com/ten-cua-ban' }
    ],
    bank: {
      name: 'BIDV · Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
      number: '3210256468',
      owner: 'NGUYEN DUC DUNG',
      note: 'cafe kiem dem'
    },
    qr: 'images/qr-cafe-bidv.jpg'    // Mã VietQR, quét bằng mọi ứng dụng ngân hàng
  }
};
