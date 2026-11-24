/* =========================================================
   KIỂM ĐẾM CA ĐÊM – NHÀ B4
   Dữ liệu truyện MÀN 4: "CHỐT SỔ" (05:00 – 07:00) · màn cuối
   Gộp vào STORY (không ghi đè).
   ========================================================= */
(function () {
  'use strict';

  /* Điểm trung thực tích lũy suốt đêm: quyết định cái kết trọn vẹn */
  const honesty = (s) => {
    const f = s.flags;
    return (f.ghi_su_that ? 1 : 0) + (f.ban_ve_dung ? 1 : 0) + ((f.cong_khai || f.tram_tu_thu) ? 1 : 0)
      + (f.kha_viet_phieu ? 1 : 0) + (f.tra_bong ? 1 : 0) + ((!f.nhan_phan_chia || f.cong_khai) ? 1 : 0);
  };
  STORY.honesty = honesty;

  /* ---------- Mini-game: chọn mốc đo cố định ---------- */
  const F = 'Roboto Mono, monospace';
  let doors = '';
  for (let i = 0; i < 4; i++) {
    doors += `<rect x="${120 + i * 70}" y="96" width="44" height="14" fill="#3d7ab0"/><text x="${124 + i * 70}" y="90" fill="#cfe4ff" font-family="${F}" font-size="11">50${i * 2 + 2}</text>`;
    doors += `<rect x="${120 + i * 70}" y="170" width="44" height="14" fill="#3d7ab0"/><text x="${124 + i * 70}" y="198" fill="#cfe4ff" font-family="${F}" font-size="11">50${i * 2 + 1}</text>`;
  }
  const SVG_P10 = `
<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mặt bằng hành lang tầng 5">
<defs><pattern id="g10" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#1d4f7c" stroke-width="0.6"/></pattern>
<pattern id="h10" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#3a1520"/><line x1="0" y1="0" x2="0" y2="8" stroke="#ff7a7a" stroke-width="1.5"/></pattern></defs>
<rect width="100%" height="100%" fill="#0b2a4a"/><rect width="100%" height="100%" fill="url(#g10)"/>
<text x="20" y="28" fill="#cfe4ff" font-family="${F}" font-size="14">HÀNH LANG TẦNG 5 · MẶT BẰNG · đang dài ra</text>
<rect x="40" y="110" width="400" height="60" fill="#102f4f" stroke="#3d7ab0"/>
<rect x="440" y="110" width="150" height="60" fill="url(#h10)" stroke="#ff7a7a" stroke-dasharray="5 4"/>
<text x="446" y="226" fill="#ff9b9b" font-family="${F}" font-size="11">không có trong hồ sơ nào</text>
${doors}
<rect x="40" y="110" width="40" height="60" fill="#16426b" stroke="#9cc9ff"/><text x="44" y="250" fill="#7fa7cf" font-family="${F}" font-size="11">chiếu nghỉ</text>
<g class="hit" data-id="M2"><polygon points="60,150 50,134 70,134" fill="#ff5a4a" stroke="#ffd27a"/><circle cx="60" cy="140" r="16" fill="transparent"/></g>
<text x="52" y="128" fill="#ffd27a" font-family="${F}" font-size="12" pointer-events="none">M2</text>
<g class="hit" data-id="M4"><rect x="120" y="170" width="44" height="14" fill="#f3efe3"/></g>
<text x="128" y="214" fill="#ffd27a" font-family="${F}" font-size="12" pointer-events="none">M4</text>
<g class="hit" data-id="M3"><circle cx="520" cy="140" r="12" fill="#2f6fb0" stroke="#ffd27a"/></g>
<text x="508" y="128" fill="#ffd27a" font-family="${F}" font-size="12" pointer-events="none">M3 (bạn)</text>
<g class="hit" data-id="M1"><rect x="590" y="116" width="14" height="48" fill="#7a2a2a" stroke="#ffd27a"/></g>
<text x="584" y="106" fill="#ffd27a" font-family="${F}" font-size="12" pointer-events="none">M1 (509)</text>
<path d="M440 280 l150 0" stroke="#ff7a7a" stroke-width="1.5" marker-end="none"/><text x="470" y="274" fill="#ff7a7a" font-family="${F}" font-size="11">→ dài thêm sau mỗi lần chớp mắt</text>
</svg>`;

  /* ---------- Cảnh Màn 4 ---------- */
  Object.assign(STORY.scenes, {

    m4_mo: {
      act: 'Màn 4 · Chốt sổ',
      time: '05:00',
      title: 'Lần thứ ba',
      danger: true,
      text: (s) => {
        const t = ['Tablet trong tay bạn rung lên lần thứ ba.'];
        t.push(s.flags.ban_ve_thiet_ke
          ? 'Đồng bộ dữ liệu thất bại. Tổng diện tích sàn nhà B4: 1.871,4 m². Sai lệch so với hồ sơ: +28,8 m². Trạng thái: không thể chốt sổ.'
          : 'Đồng bộ dữ liệu thất bại. Tổng diện tích sàn nhà B4: 1.852,2 m². Sai lệch so với hồ sơ: +9,6 m². Trạng thái: không thể chốt sổ.');
        t.push(s.flags.ban_ve_thiet_ke
          ? 'Đúng những con số bạn đã thấy, sáu tiếng trước, trong một khoảnh khắc mà lúc ấy bạn chưa hiểu.'
          : 'Không phải con số bạn đã thấy sáu tiếng trước. Một phần ba của nó. Những gì bạn chọn đêm nay đã thay đổi buổi sáng này.');
        t.push(
          'Lần này bạn nhớ hết. Bạn biết mình đang đứng ở đâu: trong 9,6 m² không thuộc về bản vẽ nào. Phía sau, rất xa, Út Thơ vẫn giơ điện thoại. Bình luận: “Chị áo xanh đâu rồi?”',
          'Điện thoại của bạn rung. Tin nhắn của mẹ, 4:59: “Con về chưa?”'
        );
        return t;
      },
      choices: [
        { key: 'A', text: 'Gọi cho mẹ, dù chỉ một phút', next: 'm4_goi_me' },
        { key: 'B', text: 'Nhắn: “Con sắp xong rồi mẹ”', next: 'm4_nhan_me' }
      ]
    },

    m4_goi_me: {
      time: '05:01',
      title: 'Giọng mẹ',
      text: (s) => {
        const t = ['Chuông đổ một hồi, mẹ nghe máy. Sóng chập chờn như gọi từ rất xa.'];
        t.push(s.flags.goi_me
          ? '“Mẹ dặn rồi mà. Xong việc thì về luôn, đừng nán lại.” Mẹ cười, tiếng cười khàn vì thuốc. “Nhưng mà phải xong việc đã, con nhỉ. Mẹ biết tính con.”'
          : '“Con đang ở đâu đấy? Nghe như trong hang.” Mẹ im một lúc. “Con làm cho xong đi, cho đúng, rồi về. Mẹ chờ được.”');
        t.push('Cúp máy, tay bạn thôi run. Bạn nhìn lại hành lang bằng con mắt của một kỹ sư trắc địa: muốn ghi một khoảng không vào hồ sơ thì trước hết phải đo được nó.');
        return t;
      },
      effects: { TT: 15 },
      choices: [{ text: 'Đo', next: 'nut10' }]
    },

    m4_nhan_me: {
      time: '05:01',
      title: 'Sắp xong',
      text: [
        'Mẹ gửi lại một biểu tượng trái tim, rồi một dòng: “Làm cho đúng nhé con.”',
        'Bạn hít một hơi thật sâu. Muốn ghi một khoảng không vào hồ sơ thì trước hết phải đo được nó.'
      ],
      effects: { TT: 5 },
      choices: [{ text: 'Đo', next: 'nut10' }]
    },

    /* ===== NÚT 10 ===== */
    nut10: {
      time: '05:04',
      title: 'NÚT 10 · Mốc',
      checkpoint: true,
      danger: true,
      timer: { sec: 25, next: 'n10_sai', label: 'Hành lang đang dài ra' },
      text: [
        'Hành lang dài ra sau mỗi lần bạn chớp mắt. Cánh cửa 509 ở cuối trông gần mà không bao giờ tới.',
        'Một kỹ sư trắc địa không đo từ thứ đang chuyển động. Bạn cần một mốc.'
      ],
      choices: [
        { key: 'A', text: 'Đo từ cánh cửa 509 trước mặt: gần nhất, rõ nhất, ngắm một phát là xong', next: 'moc_troi' },
        { key: 'B', text: 'Mở bản vẽ, tìm một mốc cố định để đo', next: 'p10' },
        { key: 'C', text: 'Đo từ chính chỗ mình đứng, rồi cộng dần từng đoạn', next: 'n10_sai' }
      ]
    },

    n10_sai: {
      time: '05:06',
      title: 'Số không đứng yên',
      text: [
        'Bạn bấm laser. 3,20 m. Bấm lại: 3,74 m. Lần nữa: 4,31 m. Chỗ bạn đứng cũng đang trôi, cùng với cả đoạn hành lang.',
        'Đầu bạn quay cuồng. Bạn phải tìm một thứ đã đứng yên từ trước khi đêm nay bắt đầu.'
      ],
      effects: { TT: -15 },
      choices: [{ text: 'Mở bản vẽ', next: 'p10' }]
    },

    p10: {
      time: '05:07',
      title: 'Bốn mốc',
      type: 'puzzle',
      danger: true,
      timer: { sec: 45, next: 'n10_sai', label: 'Hành lang đang dài ra' },
      text: ['Chạm vào từng mốc để xem kết quả ba lần đo liên tiếp, rồi chọn mốc gốc.'],
      svg: SVG_P10,
      inspect: {
        M1: 'M1 · Cánh cửa 509. Ba lần đo: 14,2 m, rồi 15,8 m, rồi 17,1 m. Mốc này đang trôi.',
        M2: 'M2 · Mốc cao độ sơn đỏ ở chân tường chiếu nghỉ: “▽ +15,00 · 1979”. Có trong bản vẽ hoàn công. Ba lần đo tới mép đoạn lạ: 3,20 m, 3,20 m, 3,20 m.',
        M3: 'M3 · Chỗ bạn đang đứng. Không có trong bản vẽ nào. Đo từ đây, con số nào cũng vừa đúng vừa sai.',
        M4: 'M4 · Mã phấn KĐ-501 ✓ bạn viết lúc 2 giờ sáng. Cánh cửa có trong hoàn công, nhưng phấn thì quệt tay là mờ. Ba lần đo: 9,1 m, 9,3 m, 9,6 m.'
      },
      answers: [
        { text: 'Lấy M1 làm mốc', next: 'moc_troi' },
        { text: 'Lấy M2 làm mốc', next: 'n10_ok' },
        { text: 'Lấy M3 làm mốc', next: 'n10_sai' },
        { text: 'Lấy M4 làm mốc', next: 'n10_sai' }
      ]
    },

    n10_ok: {
      time: '05:09',
      title: 'Chín phẩy sáu, lần cuối',
      text: [
        'Bạn đặt chân máy ngay trên mốc sơn đỏ năm 1979, nơi những người thợ đầu tiên của nhà B4 đã đánh dấu. Bấm laser. Đoạn hành lang lạ dài đúng 3,20 m, rộng đúng 3,00 m.',
        'Chín phẩy sáu mét vuông. Lần này con số đứng yên.',
        'Hành lang thôi dài ra. Nó chờ bạn ghi.'
      ],
      effects: { TT: -5 },
      gain: { clues: ['Đo từ mốc cao độ 1979: đoạn hành lang không có trong hồ sơ rộng đúng 3,20 × 3,00 = 9,6 m².'] },
      choices: [{ text: 'Mở biên bản chốt sổ', next: 'nut11' }]
    },

    /* ===== NÚT 11 (không đồng hồ) ===== */
    nut11: {
      time: '05:10',
      title: 'NÚT 11 · Chốt sổ',
      checkpoint: true,
      text: (s) => {
        const t = ['Phần mềm mở ô cuối cùng: “Ghi chú cho phần diện tích chênh lệch: 9,6 m². Sau khi ký, số liệu sẽ được chốt và không thể sửa.”'];
        if (s.flags.ban_ve_thiet_ke) t.push('Trong hệ thống, căn 509 vẫn đang là một căn hộ hợp lệ, chưa có chủ hộ.');
        t.push('Từ rất xa, bạn nghe giọng anh Phát vọng lại: “Ghi vào 502 đi em, như cũ! Thế là khớp hết!” Rồi giọng chị Trâm, khẽ hơn: “Em cứ ghi điều em biết.”');
        t.push('Ngón tay bạn đặt trên màn hình. Đây là lần ký cuối cùng của đêm nay.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Ghi 9,6 m² vào căn 502 như phương án cũ: mọi con số khớp, không ai phải giải trình nữa', next: 'n11_khop' },
        { key: 'B', text: 'Ghi đúng: “9,6 m² sai lệch, không thuộc hộ nào, đề nghị loại khỏi phương án”, rồi ký với tư cách người lập biên bản', next: 'n11_that' },
        { key: 'C', text: 'Không ký: để phiên đồng bộ tự hủy, hoãn mọi thứ đến khi có người khác quyết', next: 'tat_den' }
      ]
    },

    n11_khop: {
      time: '05:12',
      title: 'Khớp',
      text: [
        'Bạn ghi 9,6 m² vào căn 502 và ký. Tablet hiện dấu tích xanh: “Đồng bộ thành công. Số liệu khớp hồ sơ.”',
        'Hành lang thôi dài ra. Nhưng nó cũng không ngắn lại. Bạn bước về phía cả nhóm, một bước, hai bước. Khoảng cách vẫn y nguyên.',
        'Bạn đã ghi đoạn hành lang này vào hồ sơ. Và bạn đang đứng trên nó.'
      ],
      flags: { chot_khop: true },
      choices: [{ text: 'Tiếp tục', next: 'ket_o_lai' }]
    },

    n11_that: {
      time: '05:13',
      title: 'Người lập biên bản',
      text: (s) => {
        const t = [
          'Bạn gõ từng chữ: “9,6 m² sai lệch, không thuộc hộ nào. Nguồn gốc: căn 509 trên bản thiết kế 1979, chưa từng được xây. Đề nghị loại khỏi phương án bồi thường.”',
          'Ô cuối cùng: “Người lập biên bản.” Bạn ký tên mình, kèm chức danh: kỹ sư trắc địa, người kiểm đếm ca đêm nhà B4. Lần đầu tiên trong đêm, bạn ghi chính mình vào hồ sơ.',
          'Đoạn hành lang co lại như một tấm thước dây được thả tay. Ba mét hai, hai mét, một mét. Bạn bước một bước và đã đứng ở chiếu nghỉ, ngay cạnh mốc sơn đỏ.',
          'Út Thơ hét lên: “Chị áo xanh kìa!” Trên livestream, hàng nghìn dòng bình luận cùng lúc: “Thấy chị rồi!!!”',
          'Tablet: “Đồng bộ thành công. Tổng diện tích sàn nhà B4: 1.842,6 m². Khớp hồ sơ.” Đúng con số lúc 22:47 tối qua.'
        ];
        if (s.flags.ban_ve_thiet_ke) t.splice(3, 0, 'Cánh cửa 509 ở cuối hành lang mờ dần như sương, rồi chỉ còn là một mảng tường vôi vàng.');
        return t;
      },
      effects: { DN: -20, TT: 10 },
      flags: { chot_that: true },
      choices: [{ text: 'Xuống sân', next: 'nut12' }]
    },

    /* ===== NÚT 12 ===== */
    nut12: {
      time: '06:52',
      title: 'NÚT 12 · Bàn giao chìa khóa',
      checkpoint: true,
      timer: { sec: 30, next: 'n12_thu_tuc', label: 'Lễ khởi công sắp bắt đầu' },
      text: (s) => {
        const t = [
          'Trời hửng sáng. Sân nhà B4 đã dựng xong rạp đỏ, loa đài, hàng ghế nhựa. Chiếc máy xúc màu vàng đỗ sát chân tường hồi. Người của ban quản lý dự án cầm sẵn tập hồ sơ.',
          '“Bác Kha bàn giao chùm chìa khóa là xong thủ tục, mình kịp giờ lễ,” anh ấy nói, mắt nhìn đồng hồ.',
          'Ông Kha đứng giữa sân, chùm bốn mươi chiếc chìa khóa trong tay. Ông không nhìn người của ban quản lý. Ông nhìn bạn.'
        ];
        if (s.flags.kha_viet_phieu) t.push('Trong túi áo ông là tờ phiếu bàn giao thứ bốn mươi, gấp làm tư.');
        if (s.flags.kha_thanh_do) t.push('Trong biên bản bắt buộc tối qua, ông vẫn đang được ghi là “Người: 00”.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Bàn giao đúng thủ tục: nhận chùm chìa khóa, ký biên bản, kịp giờ lễ', next: 'n12_thu_tuc' },
        { key: 'B', text: 'Xin ban tổ chức năm phút để ông Kha kể cho mọi người nghe về bốn mươi căn hộ trước khi trao chìa khóa', next: 'n12_ke' },
        { key: 'C', text: 'Lén giữ lại một chiếc chìa khóa cho ông Kha làm kỷ niệm: ông xứng đáng có nó', next: 'chia_khoa_giu_lai' }
      ]
    },

    n12_thu_tuc: {
      time: '06:58',
      title: 'Thủ tục',
      text: [
        'Ông Kha trao chùm chìa khóa. Người của ban quản lý đếm nhanh: bốn mươi. Ký. Đóng dấu. Kịp giờ.',
        'Ông Kha gật đầu với bạn, lịch sự như với một người lạ, rồi đi ra cổng, dáng thẳng như hồi còn trong quân ngũ.'
      ],
      flags: { ban_giao_thu_tuc: true },
      choices: [{ text: 'Lễ khởi công', next: 'ket_cuoi' }]
    },

    n12_ke: {
      time: '07:00',
      title: 'Năm phút',
      text: (s) => {
        const t = [
          'Người của ban quản lý ngần ngừ, rồi gật đầu. Ông Kha bước lên bục. Ông cầm từng chiếc chìa khóa lên, đọc số căn, và kể một chuyện ngắn.',
          '“101: nhà bà Tư, nấu chè bán cả khu. 207: thằng bé nhà ấy giờ là bác sĩ. 304: hai vợ chồng giáo viên, Tết nào cũng viết câu đối. 502: con bé Trâm, hay ngồi trong chuồng cọp xem pháo hoa…”'
        ];
        if (s.flags.tram_tu_thu || s.flags.tra_bong) t.push('Chị Trâm đứng ở hàng ghế cuối, khóc không thành tiếng.');
        t.push('Bốn mươi chiếc chìa khóa, bốn mươi câu chuyện. Út Thơ quay lại toàn bộ. Những người dự lễ đứng lặng. Người của ban quản lý gấp tập hồ sơ lại, lắng nghe.');
        t.push('Khi chiếc chìa khóa cuối cùng được trao, bạn nghe nhà B4 thở ra một hơi rất dài, nhẹ như gió sớm qua một khung cửa không còn cánh.');
        return t;
      },
      flags: { ban_giao_ke: true },
      choices: [{ text: 'Lễ khởi công', next: 'ket_cuoi' }]
    },

    /* ===== PHẦN KẾT ===== */
    ket_cuoi: {
      time: '07:30',
      title: 'Bàn giao',
      text: (s) => {
        const f = s.flags, h = honesty(s);
        const t = [];
        t.push(f.ban_giao_ke
          ? 'Lễ khởi công bắt đầu muộn mười phút. Không ai phàn nàn. Khi gầu máy xúc chạm vào bức tường hồi đầu tiên, có người vỗ tay, có người khóc, có người nhìn lên tầng 5 như chờ một ai đó vẫy tay.'
          : 'Lễ khởi công bắt đầu đúng 7 giờ. Phát biểu, cắt băng, tiếng gầu máy xúc chạm vào bức tường hồi đầu tiên. Bụi vôi vàng bay lên trong nắng sớm.');
        t.push('— Một năm sau —');
        // Người chơi và mẹ
        t.push(f.nhan_phan_chia && !f.cong_khai
          ? 'Mẹ được mổ vào thứ Tư, bằng khoản tiền bạn không bao giờ kể với ai. Ca mổ thành công. Nhưng đêm nào trong căn phòng trọ, bạn cũng nghe một tiếng tích tắc rất khẽ.'
          : 'Tiền thưởng hợp đồng về tài khoản sáng thứ Ba. Mẹ được mổ vào thứ Tư. Giờ mẹ đã đi chợ được, và lần nào bạn đi làm ca đêm, mẹ cũng nhắn: “Xong việc thì về luôn nhé.”');
        // Anh Phát
        t.push((f.hua_phat || f.phat_thu_nhan)
          ? 'Anh Phát bị đình chỉ công tác và hợp tác với đoàn thanh tra. Chiều hôm ấy anh vẫn kịp đi họp phụ huynh. Con bé được khen. Anh ngồi hàng cuối, lần đầu tiên không cần giả vờ gì cả.'
          : 'Anh Phát bị kỷ luật sau đợt thanh tra. Anh chuyển công tác. Thỉnh thoảng anh gửi cho bạn ảnh con gái mặc đồng phục, không kèm lời nào.');
        // Chị Trâm
        t.push(f.tram_tu_thu
          ? 'Chị Trâm xin thôi việc. Người xem buổi livestream hôm ấy đã giúp mẹ chị làm hồ sơ mua nhà ở xã hội. Căn hộ ba mươi mét vuông, có ban công. Không có chuồng cọp.'
          : f.cong_khai
            ? 'Chị Trâm bị kỷ luật cảnh cáo. Chị vẫn làm ở hội đồng bồi thường, và người ta bảo chị là cán bộ đọc hồ sơ kỹ nhất phường.'
            : 'Chị Trâm vẫn làm ở hội đồng bồi thường. Chị không bao giờ nhắc lại con số 9,6.');
        if (f.tra_bong) t.push('Con Bông nằm lại trên bậu cửa căn 502 khi máy xúc tới. Chị Trâm giữ một tấm ảnh chụp nó trong ánh đèn pin, và chị bảo thế là đủ.');
        // Út Thơ
        t.push((f.cong_khai || f.tram_tu_thu)
          ? 'Đoạn livestream đêm ấy có hơn hai triệu lượt xem. Người xem góp đủ học phí cho Út Thơ. Em đi học lại, và mở một kênh mới chuyên quay những khu nhà cũ trước khi được thay áo mới. Em luôn xin phép trước khi quay số nhà và mặt người.'
          : 'Út Thơ đi làm thêm hai việc để đủ học phí kỳ sau. Em không livestream nữa.');
        // Ông Kha
        t.push(f.ban_giao_ke
          ? (h >= 4
            ? 'Tòa tái định cư 30 tầng có thêm một hạng mục không ai đề xuất từ trước: phòng sinh hoạt chung rộng 9,6 m² ở tầng 5, tên là “Phòng B4”. Trên tường treo bốn mươi tờ phiếu bàn giao đóng khung. Ông Kha giữ chìa khóa phòng ấy, một chiếc chìa mới tinh, cấp đúng thủ tục.'
            : 'Ông Kha về ở với cháu ở ngoại thành. Đoạn video ông kể chuyện bốn mươi căn hộ được ban quản lý dự án lưu vào hồ sơ công trình, mục “tư liệu lịch sử”.')
          : 'Ông Kha về ở với cháu ở ngoại thành. Sáng nào ông cũng đạp chiếc xe Phượng Hoàng ra đứng ngoài hàng rào công trường, đếm từng tầng sàn mới đổ.');
        // Lời cuối
        t.push('Còn bạn vẫn đi đo đạc cho những khu nhà sắp được thay áo mới. Trước mỗi ca, bạn lật mặt sau của từng phiếu bàn giao và đọc kỹ mục “Lưu ý cho người đến sau”.');
        t.push('Đôi khi có phiếu để trống. Bạn luôn viết thêm một dòng: “Đo từ mốc cố định. Ghi điều mình biết. Xong việc thì về.”');
        return t;
      },
      choices: [{ text: 'Hết', next: 'het_man4' }]
    },

    ket_o_lai: {
      time: '07:30',
      title: 'Người ở lại',
      text: [
        'Lễ khởi công bắt đầu đúng 7 giờ. Không ai thấy một kỹ sư trắc địa mặc áo khoác xanh đứng ở cửa sổ tầng 5 vẫy tay.',
        'Khi gầu máy xúc chạm vào tầng 5, nó dừng lại ở một khoảng không rộng đúng 9,6 m². Máy xúc chết máy. Đổi máy khác, cũng chết máy.',
        'Tòa tái định cư 30 tầng được điều chỉnh thiết kế để chừa ra khoảng ấy. Trong hồ sơ, nó có diện tích, có chữ ký, có người lập biên bản. Chỉ không có ai bước vào được.',
        'Mỗi tối thứ Tư, mẹ bạn ra đứng dưới chân tòa nhà mới, nhìn lên tầng 5, và nhắn vào một số điện thoại không còn ai đọc: “Con về chưa?”'
      ],
      choices: [{ text: 'Hết', next: 'het_man4' }]
    },

    het_man4: {
      type: 'actend',
      final: true,
      title: 'Hết · Kiểm Đếm Ca Đêm',
      time: '07:30',
      next: 'Mùa 2',
      teaser: 'Nhà B4 đã được bàn giao. Nhưng thành phố còn hàng trăm khu nhà khác đang chờ được đo đếm, mỗi khu một lời dặn ở mặt sau phiếu bàn giao.',
      endOf: (s) => (s.flags.chot_khop ? 'ket4_nguoi_o_lai' : (s.flags.ban_giao_ke && honesty(s) >= 4) ? 'ket4_tron_ven' : s.flags.ban_giao_ke ? 'ket4_ky_uc' : 'ket4_ho_so_dung')
    },

    /* ===== KẾT THÚC THẤT BẠI MỚI ===== */
    moc_troi: {
      type: 'ending',
      title: 'Mốc trôi',
      text: [
        'Bạn ngắm laser vào cánh cửa 509. 14,2 m. Bạn bước tới, đo lại: 15,8 m. Bước tiếp: 17,1 m.',
        'Bạn đi mãi về phía một cánh cửa đang lùi xa, như người đuổi theo đường chân trời. Phía sau, chiếu nghỉ tầng 5 nhỏ dần thành một chấm sáng rồi tắt.',
        'Trong sổ tay của đội phá dỡ có một dòng ghi chú: “Hành lang tầng 5 nhà B4: không đo được chiều dài. Đề nghị không cử người vào.”'
      ]
    },

    chia_khoa_giu_lai: {
      type: 'ending',
      title: 'Chiếc chìa khóa giữ lại',
      text: [
        'Bạn lén tháo một chiếc chìa khóa khỏi chùm, nhét vào túi áo ông Kha. Ông không biết. Người của ban quản lý đếm vội rồi ký: “Bốn mươi.” Không ai đếm lại.',
        'Tối hôm ấy, ông Kha về nhà cháu ở ngoại thành, tra chìa vào ổ khóa căn phòng mới. Cánh cửa mở ra căn 301: tấm ván bốn mươi móc, chiếc ghế gỗ, chiếc xe đạp Phượng Hoàng.',
        'Đồ nhà nào trả về nhà nấy. Nhà B4 đã đi theo chiếc chìa khóa cuối cùng còn chưa được trả.'
      ]
    }
  });

  /* Đặt lại kết thúc "Tắt đèn" cho phù hợp Màn 4 */
  STORY.scenes.tat_den.text = [
    'Bạn không ký. Phiên đồng bộ đếm ngược về không, rồi tự hủy. Nấc pin cuối cùng tắt cùng lúc trên mọi chiếc đèn.',
    'Trong bóng tối, bạn nghe tiếng đồ đạc dịch đến, rất chậm, rất kiên nhẫn, như những người hàng xóm cũ kéo ghế ra ngồi chơi, chờ một người nào đó quyết.',
    'Sáng hôm sau, lễ khởi công bị hoãn. Trong phần mềm theo dõi, nhà B4 vẫn hiện trạng thái: “Đang kiểm đếm.” Năm năm sau vẫn thế.'
  ];
  STORY.endingsList.forEach((e) => { if (e.id === 'tat_den') { e.act = 4; e.hint = 'Không ai chịu ký vào con số cuối cùng.'; } });

  /* ---------- Nối Màn 3 sang Màn 4 ---------- */
  STORY.scenes.het_man3.nextScene = 'm4_mo';
  STORY.scenes.het_man3.next = 'Màn 4 · Chốt sổ';

  /* ---------- Bộ sưu tập kết thúc Màn 4 ---------- */
  STORY.endingsList.push(
    { id: 'ket4_tron_ven', title: 'Kết cuối: Bàn giao trọn vẹn', kind: 'act', act: 4, hint: 'Trung thực suốt đêm, và để người giữ nhà được kể câu chuyện cuối cùng.' },
    { id: 'ket4_ky_uc', title: 'Kết cuối: Ký ức được kể', kind: 'act', act: 4, hint: 'Cho ông Kha năm phút, dù đêm qua chưa trọn vẹn.' },
    { id: 'ket4_ho_so_dung', title: 'Kết cuối: Hồ sơ đúng', kind: 'act', act: 4, hint: 'Đúng con số, đúng thủ tục, kịp giờ.' },
    { id: 'ket4_nguoi_o_lai', title: 'Kết cuối: Người ở lại', kind: 'act', act: 4, hint: 'Cho mọi con số khớp nhau.' },
    { id: 'moc_troi', title: 'Mốc trôi', kind: 'fail', act: 4, hint: 'Đo từ thứ đang chuyển động.' },
    { id: 'chia_khoa_giu_lai', title: 'Chiếc chìa khóa giữ lại', kind: 'fail', act: 4, hint: 'Một món quà không ai đếm lại.' }
  );

  /* ---------- Dàn dựng 3D + âm thanh ---------- */
  Object.assign(STORY.staging, {
    m4_mo:       { view: 'corridor5', cast: [], fx: (s) => ['door509', 'longer', 'redlight', 'tablet'].concat(s.flags.ban_ve_thiet_ke ? ['chalk509'] : ['door509thin']), sfx: ['phone', 'heart'],
                   tablet: (s) => [{ t: 'Đồng bộ thất bại', s: 70, c: '#ff7a6a' }, { t: s.flags.ban_ve_thiet_ke ? '1.871,4 m²' : '1.852,2 m²', s: 120, c: '#ffffff', mono: true }, { t: s.flags.ban_ve_thiet_ke ? 'Sai lệch +28,8 m²' : 'Sai lệch +9,6 m²', s: 50, wt: 700, c: '#ffd27a' }] },
    m4_goi_me:   { view: 'corridor5', cast: [], fx: ['door509', 'longer'] },
    m4_nhan_me:  { view: 'corridor5', cast: [], fx: ['door509', 'longer'] },
    nut10:       { view: 'corridor5', cast: [], fx: ['door509', 'longer', 'alarm'], sfx: ['heart'] },
    n10_sai:     { view: 'corridor5', cast: [], fx: ['door509', 'longer', 'shake'], sfx: ['sting'] },
    p10:         { view: 'corridor5', cast: [], fx: ['door509', 'longer'] },
    n10_ok:      { view: 'corridor5', cast: [], fx: ['door509', 'long', 'tablet'], tablet: [{ t: 'Đo từ mốc ▽ +15,00 · 1979', s: 46, wt: 600, c: '#9fc3ff' }, { t: '3,20 × 3,00', s: 110, c: '#ffffff', mono: true }, { t: '= 9,6 m²', s: 60, wt: 700, c: '#8fe0a8' }] },
    nut11:       { view: 'corridor5', cast: [], fx: ['door509', 'long', 'tablet'], tablet: [{ t: 'Ghi chú phần chênh lệch', s: 46, wt: 600, c: '#9fc3ff' }, { t: '9,6 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Ký để chốt sổ', s: 50, wt: 700, c: '#ffd27a' }] },
    n11_khop:    { view: 'corridor5', cast: [], fx: ['door509', 'longer', 'chalk509', 'tablet'], sfx: ['thud'], tablet: [{ t: 'Đồng bộ thành công', s: 60, c: '#8fe0a8' }, { t: '1.852,2 m²', s: 120, c: '#ffffff', mono: true }, { t: '9,6 m² → căn 502', s: 50, wt: 700, c: '#ff7a6a' }] },
    n11_that:    { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['tablet'], sfx: ['door'], tablet: [{ t: 'Đồng bộ thành công', s: 60, c: '#8fe0a8' }, { t: '1.842,6 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Khớp hồ sơ', s: 56, wt: 700, c: '#8fe0a8' }] },
    nut12:       { view: 'exterior', cast: ['kha', 'tram', 'tho', 'phat'], fx: ['dawn', 'ceremony'], sfx: ['loa_click'] },
    n12_thu_tuc: { view: 'exterior', cast: ['kha', 'tram', 'tho', 'phat'], fx: ['dawn', 'ceremony'] },
    n12_ke:      { view: 'exterior', cast: ['kha', 'tram', 'tho', 'phat'], fx: ['dawn', 'ceremony', 'sunrise'] },
    ket_cuoi:    { view: 'exterior', cast: [], fx: ['dawn', 'ceremony', 'sunrise'] },
    ket_o_lai:   { view: 'exterior', cast: [], fx: ['dawn', 'ceremony'] },
    het_man4:    { view: 'exterior', cast: [], fx: ['dawn', 'sunrise', 'menu'] }
  });
})();
