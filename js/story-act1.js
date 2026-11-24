/* =========================================================
   KIỂM ĐẾM CA ĐÊM – NHÀ B4
   Dữ liệu truyện MÀN 1: "BÀN GIAO"
   Mỗi cảnh (scene) gồm: time, title, text (mảng đoạn văn hoặc hàm(state) trả về mảng),
   gain (luật/manh mối nhận được khi vào cảnh), checkpoint (lưu điểm chơi lại),
   choices (lựa chọn) hoặc puzzle (mini-game bản vẽ) hoặc ending.
   ========================================================= */

window.STORY = window.STORY || {};

STORY.meta = {
  title: 'Kiểm Đếm Ca Đêm',
  subtitle: 'Nhà B4',
  act: 'Màn 1 · Bàn giao',
  version: '1.1.0'
};

/* ---------- Bộ luật: Phiếu bàn giao căn hộ ---------- */
STORY.rules = {
  L1: { text: 'Đồ nhà nào để nguyên nhà nấy. Đừng mang bất cứ thứ gì ra khỏi căn của nó, kể cả để kiểm đếm.', sources: ['101', '203', '304', '407'] },
  L2: { text: 'Đừng để quên đồ của mình. Ra khỏi căn nào cũng sờ lại túi.', sources: ['102', '205', '305'] },
  L3: { text: 'Khi loa báo “giờ dọn nhà”, áp lưng vào tường chịu lực. Đừng đứng giữa phòng, đừng chui vào tủ.', sources: ['201', '304', '407'] },
  L4: { text: 'Đo lại phòng trước khi nghỉ. Số đo lệch quá một gang tay so với bản vẽ thì đừng ở lại.', sources: ['306', '208'] },
  L5: { text: 'Đồng hồ trong căn bỏ trống mà còn chạy thì đừng nhìn lâu, đừng lên dây.', sources: ['207', '408'] },
  L6: { text: 'Có ai gọi “dọn giúp một tay” thì đừng nhận lời. Hãy đáp: “Nhà tôi ở chỗ khác.”', sources: ['204', '405'] },
  L7: { text: 'Muốn nhà tha cho mình thì để lại đồ của người khác.', sources: ['?'], note: 'Không số căn, không chữ ký.' },
  L8: { text: 'Ai làm trái thì đèn cả nhà yếu đi.', sources: ['206', '302'] }
};

/* ---------- Kết thúc thất bại theo chỉ số ---------- */
STORY.statEndings = {
  DN:  'o_lai',            // Độ neo >= 60
  TT:  'do_mai',           // Tỉnh táo <= 0
  PIN: 'tat_den'           // Pin <= 0
};

/* ---------- Các bản vẽ SVG cho mini-game ---------- */
const BP_DEFS = `
<defs>
  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
    <path d="M20 0H0V20" fill="none" stroke="#1d4f7c" stroke-width="0.6"/>
  </pattern>
  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="8" height="8" fill="#123a5e"/>
    <line x1="0" y1="0" x2="0" y2="8" stroke="#9cc9ff" stroke-width="2.4"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#0b2a4a"/>
<rect width="100%" height="100%" fill="url(#grid)"/>`;

const BP_LEGEND = (x, y) => `
<g font-family="Roboto Mono, monospace" font-size="12" fill="#cfe4ff">
  <rect x="${x}" y="${y}" width="26" height="12" fill="url(#hatch)" stroke="#9cc9ff"/>
  <text x="${x + 34}" y="${y + 11}">Tường chịu lực – gạch 220</text>
  <rect x="${x}" y="${y + 20}" width="26" height="6" fill="#0b2a4a" stroke="#9cc9ff"/>
  <text x="${x + 34}" y="${y + 28}">Vách ngăn – gạch 110</text>
</g>`;

const SVG_P1 = `
<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bản vẽ căn 304">
${BP_DEFS}
<text x="20" y="28" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="14">Bản vẽ hoàn công 1979 · Nhà B4 · Căn 304</text>
<!-- sàn -->
<rect x="140" y="70" width="380" height="250" fill="none" stroke="#3d7ab0" stroke-dasharray="4 4"/>
<!-- A: tường hồi phía tây (chịu lực) -->
<rect class="hit" data-id="A" x="116" y="58" width="24" height="274" fill="url(#hatch)" stroke="#9cc9ff"/>
<text x="92" y="200" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="16">A</text>
<!-- B: tường hành lang phía bắc (vách 110) -->
<rect class="hit" data-id="B" x="140" y="58" width="380" height="12" fill="#0b2a4a" stroke="#9cc9ff"/>
<rect x="300" y="58" width="60" height="12" fill="#0b2a4a" stroke="#ffd27a"/>
<text x="322" y="50" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="16">B</text>
<text x="366" y="52" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">cửa ra hành lang</text>
<!-- C: vách 304/305 phía đông, đang trượt -->
<rect class="hit" data-id="C" x="520" y="58" width="12" height="274" fill="#0b2a4a" stroke="#9cc9ff"/>
<text x="546" y="200" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="16">C</text>
<path d="M512 150 l-28 0 m8 -8 l-8 8 l8 8 M512 250 l-28 0 m8 -8 l-8 8 l8 8" stroke="#ff7a7a" stroke-width="2" fill="none"/>
<text x="420" y="300" fill="#ff7a7a" font-family="Roboto Mono, monospace" font-size="11">đang trượt</text>
<!-- tường bao phía nam có cửa sổ (vách 110) -->
<rect x="140" y="320" width="380" height="12" fill="#0b2a4a" stroke="#9cc9ff"/>
<rect x="250" y="320" width="120" height="12" fill="#0b2a4a" stroke="#7fa7cf" stroke-dasharray="3 3"/>
<text x="268" y="352" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">cửa sổ</text>
<!-- D: tủ âm tường -->
<rect class="hit" data-id="D" x="146" y="76" width="70" height="56" fill="#16426b" stroke="#9cc9ff"/>
<text x="166" y="110" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="16">D</text>
<text x="222" y="98" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">tủ âm tường</text>
${BP_LEGEND(400, 370)}
</svg>`;

const SVG_P2 = `
<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mặt đứng tường đông căn 207">
${BP_DEFS}
<text x="20" y="28" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="14">Căn 207 · Mặt đứng tường đông · Thước laser</text>
<rect x="40" y="60" width="560" height="280" fill="#102f4f" stroke="#9cc9ff"/>
<!-- cửa sổ -->
<rect x="60" y="110" width="110" height="150" fill="#0b2a4a" stroke="#9cc9ff"/>
<line x1="115" y1="110" x2="115" y2="260" stroke="#9cc9ff"/>
<text x="74" y="280" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">mép cửa sổ</text>
<line x1="170" y1="300" x2="560" y2="300" stroke="#3d7ab0" stroke-dasharray="4 4"/>
<!-- đinh -->
<g class="hit" data-id="N1"><circle cx="270" cy="150" r="14" fill="#16426b" stroke="#ffd27a"/><circle cx="270" cy="150" r="3" fill="#cfe4ff"/></g>
<text x="262" y="128" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">1</text>
<g class="hit" data-id="N2"><circle cx="370" cy="150" r="14" fill="#16426b" stroke="#ffd27a"/><circle cx="370" cy="150" r="3" fill="#cfe4ff"/></g>
<text x="362" y="128" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">2</text>
<g class="hit" data-id="N3"><circle cx="470" cy="150" r="14" fill="#16426b" stroke="#ffd27a"/><circle cx="470" cy="150" r="3" fill="#cfe4ff"/></g>
<text x="462" y="128" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">3</text>
<rect x="440" y="170" width="60" height="80" fill="none" stroke="#3d7ab0" stroke-dasharray="2 3"/>
<!-- vạch khắc chiều cao -->
<g stroke="#7fa7cf"><line x1="560" y1="200" x2="580" y2="200"/><line x1="560" y1="220" x2="580" y2="220"/><line x1="560" y1="245" x2="580" y2="245"/><line x1="560" y1="268" x2="580" y2="268"/></g>
<text x="20" y="366" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">Chạm vào từng đinh để đo khoảng cách tới mép cửa sổ.</text>
</svg>`;

const SVG_P3 = `
<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bản vẽ căn 405 và 406">
${BP_DEFS}
<text x="20" y="28" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="14">Bản vẽ hoàn công 1979 · Tầng 4 · Căn 405 – 406</text>
<!-- hành lang -->
<rect x="60" y="60" width="520" height="40" fill="#102f4f" stroke="#3d7ab0"/>
<text x="270" y="86" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="12">Hành lang</text>
<!-- V2: tường giữa 406 và hành lang (chịu lực) -->
<rect class="hit" data-id="V2" x="330" y="100" width="250" height="20" fill="url(#hatch)" stroke="#9cc9ff"/>
<text x="440" y="96" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">V2</text>
<!-- tường giữa 405 và hành lang -->
<rect x="60" y="100" width="258" height="20" fill="url(#hatch)" stroke="#9cc9ff"/>
<rect x="150" y="100" width="50" height="20" fill="#0b2a4a" stroke="#ff7a7a"/>
<text x="140" y="140" fill="#ff7a7a" font-family="Roboto Mono, monospace" font-size="11">cửa 405 – KHÓA</text>
<!-- phòng 405 -->
<rect x="60" y="120" width="258" height="220" fill="#0e2f50" stroke="#3d7ab0"/>
<text x="160" y="240" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="18">405</text>
<!-- V1: vách 405/406 (110) -->
<rect class="hit" data-id="V1" x="318" y="120" width="12" height="220" fill="#0b2a4a" stroke="#9cc9ff"/>
<text x="296" y="360" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">V1</text>
<!-- phòng 406 -->
<rect x="330" y="120" width="226" height="220" fill="#0e2f50" stroke="#3d7ab0"/>
<text x="420" y="240" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="18">406</text>
<text x="400" y="262" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">(bạn đang ở đây)</text>
<!-- V3: tường hồi phía đông 406 -->
<rect class="hit" data-id="V3" x="556" y="120" width="24" height="220" fill="url(#hatch)" stroke="#9cc9ff"/>
<text x="590" y="240" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="14">V3</text>
${BP_LEGEND(60, 370)}
</svg>`;

/* ---------- Cảnh ---------- */
STORY.start = 'cold_open';

STORY.scenes = {

  /* ===== MỞ ĐẦU NHẢY CÓC: 05:00 ===== */
  cold_open: {
    time: '05:00',
    title: 'Không thể chốt sổ',
    danger: true,
    text: [
      'Tablet trong tay bạn rung lên lần thứ ba.',
      'Đồng bộ dữ liệu thất bại. Tổng diện tích sàn nhà B4: 1.871,4 m². Sai lệch so với hồ sơ: +28,8 m². Trạng thái: không thể chốt sổ.',
      'Bạn không nhớ mình đã nhập con số ấy. Bạn không nhớ mình đang đứng ở tầng mấy. Hành lang trước mặt dài hơn bất cứ hành lang nào của một tòa nhà năm tầng.',
      'Trên điện thoại, livestream của Út Thơ vẫn chạy, mười hai nghìn người đang xem, nhưng khung hình chỉ là một hành lang trống. Một dòng bình luận trôi qua: “Chị áo xanh đâu rồi?”',
      'Rồi một tin nhắn của mẹ, gửi lúc 4:59: “Con về chưa?”',
      'Sáu tiếng rưỡi trước, mọi chuyện bắt đầu bằng một chùm chìa khóa.'
    ],
    choices: [{ text: 'Quay lại 22:30', next: 'mo_dau_1' }]
  },

  /* ===== 22:30 ===== */
  mo_dau_1: {
    time: '22:30',
    title: 'Chùm chìa khóa',
    text: [
      'Ông Kha ngồi trên chiếc ghế nhựa trước phòng bảo vệ, chiếc áo bộ đội cũ cài kín cổ. Ông không chửi bới, cũng không ngăn cản. Ông đặt vào tay bạn một chùm chìa khóa nặng trịch: bốn mươi chiếc, mỗi chiếc buộc một mẩu vải ghi số căn. Kèm theo là một xấp phiếu bàn giao đã quăn mép.',
      '“Ba mươi chín nhà gửi lại tôi đấy,” ông nói. “Năm tám mươi tôi dọn vào đây, cả tầng góp gạo nấu chung một nồi cháo. Phiếu nhà nào thì vào nhà ấy hẵng đọc. Đồ nhà nào trả về nhà nấy.”',
      'Ông ngước lên nhìn bạn, lần đầu tiên trong buổi tối. “Tối nay cháu đừng để quên cái gì nhé.”',
      'Anh Phát, trưởng nhóm, đã lên tầng 2 từ sớm. Chị Trâm bên hội đồng bồi thường ngồi gõ laptop trong chiếc ô tô đậu ngoài cổng. Út Thơ, sinh viên làm thêm phụ trách chụp ảnh hiện trạng, giơ điện thoại quay một vòng: “Live nè mọi người, đêm cuối của khu tập thể bảy mươi chín!”',
      'Bạn đã kiểm đếm xong tầng 1 và tầng 2. Mặt sau mỗi phiếu bàn giao có một mục in sẵn: “Lưu ý cho người đến sau”. Phần lớn để trống. Vài phiếu thì không.'
    ],
    gain: { rules: ['L1', 'L2'], clues: ['Ông Kha giữ 40 chìa khóa nhưng chỉ có 39 phiếu bàn giao: thiếu phiếu của chính ông (căn 301).'] },
    choices: [{ text: 'Đi lên cầu thang', next: 'tin_nhan_me' }]
  },

  tin_nhan_me: {
    time: '22:41',
    title: 'Tin nhắn thoại',
    text: [
      'Điện thoại rung trong túi áo. Một tin nhắn thoại dài 0:38 của mẹ.',
      '“Con ăn gì chưa? Mẹ ổn, đừng lo. Bác sĩ bảo nếu đóng đủ tiền thì thứ Tư mổ được. Mà con làm đêm thì nhớ mặc áo khoác, nhà cũ lạnh lắm…” Tiếng máy đo nhịp tim tít tít đều đều ở phía sau.',
      'Tiền thưởng hợp đồng đêm nay vừa đúng số tiền ấy.'
    ],
    choices: [
      { key: 'A', text: 'Đứng lại ở chiếu nghỉ, gọi cho mẹ một phút', next: 'goi_me' },
      { key: 'B', text: 'Nhắn lại: “Con đang làm, sáng con về”, rồi đi tiếp', next: 'nhan_me' }
    ]
  },

  goi_me: {
    time: '22:42',
    title: 'Một phút',
    text: [
      'Mẹ nghe máy ngay hồi chuông đầu, như thể đã cầm sẵn điện thoại. Hai mẹ con nói chuyện chẳng đâu vào đâu: cơm bệnh viện nhạt, bà giường bên ngáy to. Rồi mẹ dặn: “Xong việc thì về luôn, đừng nán lại.”',
      'Cúp máy, bạn thấy lòng nhẹ hơn hẳn. Ở tầng trên, có tiếng ai đó kéo một chiếc ghế rất chậm, rồi dừng lại, như thể vừa nghe lén xong.'
    ],
    effects: { TT: 5 },
    flags: { goi_me: true },
    choices: [{ text: 'Lên tầng 3', next: 'mo_dau_2' }]
  },

  nhan_me: {
    time: '22:41',
    title: 'Đã xem',
    text: [
      'Tin nhắn hiện “Đã xem” gần như ngay lập tức. Ba dấu chấm hiện lên, biến mất, rồi lại hiện lên. Cuối cùng mẹ chỉ gửi một biểu tượng trái tim.',
      'Bạn cất điện thoại. Lúc ngẩng lên, bạn thấy cầu thang lên tầng 3 có mười một bậc. Bạn đếm lại thì chỉ còn mười.'
    ],
    effects: { TT: -5 },
    choices: [{ text: 'Lên tầng 3', next: 'mo_dau_2' }]
  },

  mo_dau_2: {
    time: '22:47',
    title: 'Căn 304',
    text: [
      'Đèn pin quét qua căn 304. Có một tủ gỗ mọt, một quạt trần ba cánh và một khung ảnh gia đình đã bạc màu. Thước laser báo chiều dài phòng là 3,62 m, khớp bản vẽ hoàn công năm 1979. Bạn viết mã khảo sát bằng phấn trắng lên cửa: KĐ-304 ✓.',
      'Tablet tự đồng bộ một dòng: Tổng diện tích sàn nhà B4: 1.842,6 m².',
      'Út Thơ chĩa điện thoại vào góc phòng, chế độ ban đêm bật sẵn. “Chị ơi, cái tủ… trên màn hình em thấy có hai cái tủ, một cái mờ mờ nằm lệch sang bên.” Em cười gượng. “Em live để kiếm tiền trọ thôi, chứ em sợ ma lắm. Chị có tin mấy chuyện này không?”',
      'Bạn lật phiếu bàn giao căn 304. Ở mục lưu ý, nét chữ run run dặn rằng khi nghe loa báo giờ dọn nhà thì phải áp lưng vào tường chịu lực.'
    ],
    gain: { rules: ['L3'], clues: ['Diện tích sàn ban đầu của B4: 1.842,6 m².', 'Camera ban đêm của Út Thơ hiện vệt mờ ở chỗ đồ đạc từng được đặt.'] },
    choices: [
      { key: 'A', text: '“Tắt live đi em, tập trung làm việc.”', next: 'tho_tat_live' },
      { key: 'B', text: '“Cứ live, nhưng đừng quay số nhà và mặt người. Camera của em có khi lại có ích.”', next: 'tho_giu_live' }
    ]
  },

  tho_tat_live: {
    time: '22:50',
    title: 'Màn hình đen',
    text: [
      'Út Thơ bĩu môi nhưng vẫn bấm tắt. “Dạ… mất hai trăm người xem rồi đó chị.” Em đút điện thoại vào túi, đi cách bạn hai bước, không nói thêm câu nào.',
      'Chiếc loa phường ở đầu hồi khục lên một tiếng.'
    ],
    effects: { TC: -5 },
    choices: [{ text: '…', next: 'nut1' }]
  },

  tho_giu_live: {
    time: '22:50',
    title: 'Hai trăm người xem',
    text: [
      'Út Thơ cười tít mắt. “Chị là người đầu tiên không chửi em vụ live đó.” Em quay camera xuống sàn gạch hoa, đọc cho người xem nghe tên từng món đồ bạn vừa kiểm đếm, giọng như dẫn chương trình.',
      'Trên màn hình, một dòng bình luận trôi qua: “Sau lưng hai chị cái tủ vừa nhích kìa.” Út Thơ không để ý.',
      'Chiếc loa phường ở đầu hồi khục lên một tiếng.'
    ],
    effects: { TC: 5 },
    flags: { tho_live: true },
    choices: [{ text: '…', next: 'nut1' }]
  },

  /* ===== NÚT 1 ===== */
  nut1: {
    time: '23:00',
    title: 'Nút 1 · Giờ dọn nhà',
    checkpoint: true,
    danger: true,
    timer: { sec: 20, next: 'n1_het_gio', label: 'Vách đang trượt' },
    text: [
      'Giọng phát thanh viên đều đều vang lên, dù dây loa đã bị cắt từ ba năm trước: “Thông báo: đã đến giờ dọn nhà. Đề nghị các hộ thu xếp đồ đạc.”',
      'Khắp tòa nhà vang lên tiếng kéo lê đồ đạc. Ở căn 304, bức vách giáp căn 305 bắt đầu trượt về phía bạn. Gạch cọ vào nền ken két.',
      'Cửa ra hành lang chỉ cách hai bước chân. Út Thơ đứng chết trân giữa phòng.'
    ],
    choices: [
      { key: 'A', text: 'Kéo Út Thơ lao ra cửa, chỉ hai bước là thoát', next: 'buc_tuong_moi' },
      { key: 'B', text: 'Mở bản vẽ hoàn công, tìm tường chịu lực để đứng', next: 'p1' },
      { key: 'C', text: 'Đẩy Út Thơ vào tủ âm tường, gỗ dày trông chắc chắn nhất', next: 'n1B' }
    ]
  },

  n1_het_gio: {
    time: '23:01',
    title: 'Chần chừ',
    text: [
      'Bạn đứng chết lặng thêm một giây, một giây quá lâu. Bức vách ép tới sát vai. Út Thơ hét lên, giật tay bạn lôi tuột vào chiếc tủ âm tường gần nhất.'
    ],
    effects: { TT: -5 },
    choices: [{ text: 'Trong tủ…', next: 'n1B' }]
  },

  p1: {
    time: '23:00',
    title: 'Bản vẽ căn 304',
    type: 'puzzle',
    danger: true,
    timer: { sec: 30, next: 'n1A_sai', label: 'Vách đang trượt' },
    text: ['Vách phía đông đang trượt tới. Chạm vào từng ký hiệu để xem, rồi chọn chỗ đứng. Hãy đọc kỹ phần chú thích.'],
    svg: SVG_P1,
    inspect: {
      A: 'A · Tường hồi phía tây. Ký hiệu gạch chéo, dày 220.',
      B: 'B · Tường giáp hành lang, có cửa ra vào. Nét đơn, dày 110.',
      C: 'C · Vách giáp căn 305. Nét đơn, dày 110. Đang trượt.',
      D: 'D · Tủ âm tường. Cửa gỗ, bên trong tối om.'
    },
    answers: [
      { text: 'Áp lưng vào A', next: 'n1A_ok' },
      { text: 'Áp lưng vào B', next: 'n1A_sai' },
      { text: 'Áp lưng vào C', next: 'buc_tuong_moi' },
      { text: 'Chui vào D', next: 'n1B' }
    ]
  },

  n1A_ok: {
    time: '23:02',
    title: 'Tường hồi',
    text: [
      'Bạn kéo Út Thơ áp lưng vào bức tường hồi. Vữa lạnh buốt qua lớp áo. Bức vách trượt tới sát mũi giày thì dừng lại, rung lên một nhịp rồi nằm im.',
      'Khi tiếng kéo đồ tắt hẳn, bạn đo lại căn phòng: 3,40 m. Căn phòng đã hẹp đi 22 cm. Chiếc tủ gỗ giờ nằm đúng chỗ vệt mờ trên camera của Út Thơ lúc nãy.',
      '“Chị… sao chị biết?” Út Thơ thở dốc. “Em cứ tưởng chạy ra cửa là xong.”',
      'Bạn lật thêm một phiếu trong xấp, phiếu căn 306. Mục lưu ý dặn phải đo lại phòng trước khi nghỉ.'
    ],
    effects: { TT: -10, TC: 10 },
    gain: { rules: ['L4'], clues: ['Tòa nhà đang tự xếp đồ đạc về đúng vị trí cũ. Camera của Út Thơ báo trước được vị trí ấy.'] },
    choices: [{ text: 'Tiếp tục kiểm đếm', next: 'banh_mi' }]
  },

  n1A_sai: {
    time: '23:02',
    title: 'Hai bức vách',
    text: [
      'Bạn áp lưng vào bức tường giáp hành lang. Ngay lập tức nó cũng rung lên dưới lưng bạn, vì nó chỉ là vách 110.',
      'Hai bức vách khép dần về một góc. Trong giây cuối, bạn kéo được Út Thơ lách sang bức tường hồi phía tây. Vai bạn trầy toạc một mảng.',
      'Khi mọi thứ lặng đi, căn phòng chỉ còn 3,40 m. Chiếc tủ gỗ nằm đúng chỗ vệt mờ trên camera lúc nãy.',
      'Bạn lật thêm một phiếu trong xấp, phiếu căn 306. Mục lưu ý dặn phải đo lại phòng trước khi nghỉ.'
    ],
    effects: { TT: -20, DN: 5, TC: 5 },
    gain: { rules: ['L4'], clues: ['Tòa nhà đang tự xếp đồ đạc về đúng vị trí cũ. Camera của Út Thơ báo trước được vị trí ấy.'] },
    choices: [{ text: 'Tiếp tục kiểm đếm', next: 'banh_mi' }]
  },

  n1B: {
    time: '23:02',
    title: 'Tủ âm tường',
    text: [
      'Hai người chen vào tủ. Cánh cửa gỗ tự khép lại sau lưng. Trong bóng tối, vai bạn cọ vào những bộ quần áo cũ còn treo sẵn, thơm mùi băng phiến và ấm như vừa có người mặc.',
      'Ngoài kia, tiếng kéo đồ dừng ngay trước cửa tủ. Có tiếng thở rất khẽ, không phải của bạn, cũng không phải của Út Thơ. Phải ba lần cả hai cùng đạp, cánh tủ mới bật ra.',
      'Đèn pin tối đi một nấc. Dán ở mặt trong cánh tủ là một bức tranh trẻ con vẽ cả gia đình bằng bút sáp. Bên cạnh có thêm một hình người mới, mới tô màu được một nửa. Hình người ấy mặc áo xanh giống bạn.'
    ],
    effects: { TT: -20, TC: -5, DN: 15, PIN: -1 },
    flags: { vi_pham_L3: true },
    gain: { clues: ['(Hiếm) Tranh sáp trong tủ căn 304: một gia đình, và một “thành viên mới” mặc áo xanh đang tô dở.'] },
    choices: [{ text: 'Tiếp tục kiểm đếm', next: 'banh_mi' }]
  },

  /* ===== 00:10 – khoảnh khắc với anh Phát ===== */
  banh_mi: {
    time: '00:10',
    title: 'Ổ bánh mì',
    text: [
      'Anh Phát ngồi ở chiếu nghỉ tầng 2, chìa cho bạn một ổ bánh mì pa-tê đã nguội. “Ăn đi em, đêm còn dài.” Màn hình khóa điện thoại của anh là ảnh một bé gái mặc đồng phục tiểu học.',
      '“Con bé lên lớp Sáu năm nay, trường điểm, học phí cũng điểm.” Anh cười, nếp nhăn hằn sâu dưới ánh đèn pin. “Anh ở phường hai mươi năm, khu này anh thuộc từng cái lỗ khóa.”',
      'Túi áo khoác của anh phồng lên một cục vuông vức. Anh cứ vô thức đặt tay lên đó.'
    ],
    choices: [
      { key: 'A', text: 'Hỏi anh về khu B4 ngày trước', next: 'banh_mi_hoi' },
      { key: 'B', text: 'Ăn vội rồi đứng dậy làm tiếp', next: 'banh_mi_an' }
    ]
  },

  banh_mi_hoi: {
    time: '00:14',
    title: 'Hai mươi năm',
    text: [
      'Anh Phát kể về những cái Tết cả dãy chung nồi bánh chưng, về trận lụt năm tám lăm nước ngập tới tầng 1, về đợt phường đi tháo chuồng cọp năm 2016. “Đợt đó anh phụ trách, ký biên bản mỏi tay.”',
      'Nói tới đó anh im bặt, như vừa lỡ lời. “Thôi, làm tiếp.”'
    ],
    effects: { TC: 5 },
    gain: { clues: ['Năm 2016, anh Phát phụ trách đợt tháo dỡ chuồng cọp ở B4 và ký các biên bản.'] },
    choices: [{ text: 'Tiếp tục', next: 'nut2' }]
  },

  banh_mi_an: {
    time: '00:12',
    title: 'Bánh mì nguội',
    text: [
      'Ổ bánh mì nguội nhưng vẫn ngon. Lần đầu tiên trong đêm, tay bạn thôi run.',
      'Anh Phát đứng dậy trước, phủi quần. Một tiếng tích tắc rất khẽ phát ra từ túi áo anh.'
    ],
    effects: { TT: 5 },
    choices: [{ text: 'Tiếp tục', next: 'nut2' }]
  },

  /* ===== NÚT 2 ===== */
  nut2: {
    time: '00:20',
    title: 'Nút 2 · Chiếc đồng hồ còn chạy',
    checkpoint: true,
    danger: true,
    text: [
      'Anh Phát lôi từ túi áo ra một chiếc đồng hồ quả lắc nhỏ lấy từ căn 207. “Đồ cổ đấy. Mang về văn phòng làm bằng chứng hộ này ở từ thời bao cấp, đền bù cao hơn cho người ta.”',
      'Chiếc đồng hồ vẫn tích tắc. Từ lúc anh lên đây, tiếng kéo đồ đạc ở tầng 2 cũng theo lên cầu thang, mỗi lúc một gần.',
      'Út Thơ nói khẽ: “Anh Phát ơi… áo khoác của anh có vệt mờ, y như cái tủ lúc nãy.”',
      'Biên bản điện tử căn 207 do anh Phát nhập lúc 22:15 ghi: “Đồng hồ quả lắc treo tường: 01. Vị trí: tường đông, cách mép cửa sổ 1,20 m.”',
      'Trong xấp phiếu, bạn thấy phiếu căn 207 và 206 có ghi lưu ý. Kẹp giữa chúng là một mẩu giấy không ghi số căn, không chữ ký. Bạn không nhớ nó có ở đó từ lúc nào.',
      'Anh Phát nghiến răng: “Đồ đã ra khỏi căn rồi thì vứt quách ra ngoài, cho cái nhà nó khỏi theo!”'
    ],
    gain: { rules: ['L5', 'L8', 'L7'], clues: ['Biên bản 207 (anh Phát ghi): đồng hồ treo cách mép cửa sổ 1,20 m.', 'Diện tích sàn tăng 0,5 m² dù không ai cơi nới gì.'] },
    choices: [
      { key: 'A', text: 'Nghe anh Phát: ném chiếc đồng hồ qua cửa sổ, cắt đứt thứ đang bám theo', next: 'can_ho_di_theo' },
      { key: 'B', text: 'Mang chiếc đồng hồ trả về đúng chỗ cũ ở căn 207', next: 'p2' },
      { key: 'C', text: 'Để anh Phát giữ, cả nhóm khẩn trương làm cho xong', next: 'n2C' }
    ]
  },

  p2: {
    time: '00:26',
    title: 'Tường đông căn 207',
    type: 'puzzle',
    danger: true,
    text: ['Trên tường đông có ba cái đinh. Chiếc đồng hồ trong tay bạn tích tắc nhanh dần. Hãy đo trước khi treo.'],
    svg: SVG_P2,
    inspect: {
      N1: 'Đinh 1 · Laser: cách mép cửa sổ 0,85 m. Đinh còn mới, không gỉ.',
      N2: 'Đinh 2 · Laser: cách mép cửa sổ 1,20 m. Quanh đinh có một vòng sơn sáng màu hơn.',
      N3: 'Đinh 3 · Laser: cách mép cửa sổ 1,55 m. Có vệt bụi hình chữ nhật, giống chỗ treo một khung ảnh.'
    },
    answers: [
      { text: 'Treo vào đinh 1', next: 'n2A_sai' },
      { text: 'Treo vào đinh 2', next: 'n2A_ok' },
      { text: 'Treo vào đinh 3', next: 'n2A_sai' }
    ]
  },

  n2A_ok: {
    time: '00:28',
    title: 'Về chỗ cũ',
    text: [
      'Chiếc đồng hồ vừa được treo lên là tiếng tích tắc chậm lại, đều như nhịp thở của người đang ngủ. Tiếng kéo đồ dưới cầu thang ngừng hẳn.',
      'Anh Phát hậm hực: “Mất cái bằng chứng ngon.” Nhưng anh thở ra một hơi dài, như vừa đặt được một gánh nặng xuống.',
      'Soi đèn sát chỗ treo đồng hồ, bạn thấy những vạch khắc chiều cao trẻ con trên tường. Các cái tên đều đã bị cạo. Vạch cuối cùng chỉ còn đọc được năm 1998.'
    ],
    effects: { TT: -10, TC: 5, DN: 5 },
    gain: { clues: ['Vạch đo chiều cao trẻ con ở căn 207, tên đã bị cạo, vạch cuối năm 1998.'] },
    choices: [{ text: 'Tiếp tục', next: 'nut3' }]
  },

  n2A_sai: {
    time: '00:28',
    title: 'Sai đinh',
    text: [
      'Đồng hồ vừa treo lên thì tiếng tích tắc dồn dập như mưa đá. Chiếc giường sắt trong góc nghiến xuống nền, trườn từng gang về phía bạn.',
      '“Không phải chỗ đó!” Út Thơ hét lên, chĩa camera vào tường. “Vệt mờ ở cái đinh giữa!”',
      'Bạn giật đồng hồ xuống, treo sang đinh 2. Mọi thứ khựng lại. Chân giường dừng cách đầu gối bạn một nắm tay.',
      'Sau chỗ treo đồng hồ là những vạch khắc chiều cao trẻ con. Các cái tên đều đã bị cạo. Vạch cuối cùng ghi năm 1998.'
    ],
    effects: { TT: -20, DN: 10, TC: 5 },
    gain: { clues: ['Vạch đo chiều cao trẻ con ở căn 207, tên đã bị cạo, vạch cuối năm 1998.'] },
    choices: [{ text: 'Tiếp tục', next: 'nut3' }]
  },

  n2C: {
    time: '00:24',
    title: 'Lệnh trưởng nhóm',
    text: [
      '“Đúng rồi, làm cho xong đi,” anh Phát nói, nhét chiếc đồng hồ vào túi áo trong.',
      'Cả nhóm leo lên tầng 4. Đèn pin của mọi người tối đi một nấc cùng lúc, như có ai đó vặn nhỏ.',
      'Anh Phát đi cuối hàng. Cứ mỗi bậc cầu thang, anh lại sờ túi áo một lần. Tiếng tích tắc trong túi áo nghe như đang đếm ngược.'
    ],
    effects: { TT: -5, PIN: -1 },
    flags: { phat_neo_nang: true, vi_pham_L1: true },
    gain: { clues: ['(Hiếm) Anh Phát giữ đồ căn 207, vi phạm luật L1. Tiếng tích tắc trong túi áo nghe như đếm ngược.'] },
    choices: [{ text: 'Tiếp tục', next: 'nut3' }]
  },

  /* ===== NÚT 3 ===== */
  nut3: {
    time: '01:40',
    title: 'Nút 3 · Chiếc kẹp tóc dưới gầm giường',
    checkpoint: true,
    danger: true,
    timer: { sec: 25, next: 'n3_het_gio', label: 'Út Thơ sắp đáp lời' },
    text: (s) => {
      const t = [
        'Út Thơ vào căn 405 chụp ảnh hiện trạng thì cánh cửa đóng sầm lại. Từ bên trong vọng ra tiếng kéo đồ, rồi một giọng phụ nữ ngọt ngào: “Con ơi, dọn giúp mẹ một tay.”',
        'Rồi giọng ấy đổi thành giọng Út Thơ, đang khóc: “Chị ơi… cứu em…”',
        'Bạn chợt nhớ ra: lúc kiểm đếm căn 405 một tiếng trước, bạn đã thấy chiếc kẹp tóc hình ngôi sao của Út Thơ dưới gầm giường. Khi ấy em chưa từng bước vào căn này.',
        'Anh Phát đứng lùi ra xa, không dám nhìn ai. “Chìa căn 405… anh làm rơi đâu mất rồi.”',
        'Mẩu giấy không chữ ký trong túi bạn viết: muốn nhà tha cho mình thì để lại đồ của người khác.'
      ];
      if (s.flags.phat_neo_nang) t.splice(4, 0, 'Túi áo anh vẫn tích tắc.');
      if (s.flags.tho_live) t.push('Trên điện thoại bạn, livestream của Út Thơ vẫn chạy từ bên trong căn 405. Khung hình rung lắc, quay một vòng đồ đạc đang dồn lại.');
      return t;
    },
    gain: { rules: ['L6'] },
    choices: [
      { key: 'A', text: 'Sang căn 406, mở bản vẽ tìm bức vách có thể phá', next: 'p3' },
      { key: 'B', text: 'Nhét thẻ nhân viên của bạn qua khe cửa: đổi đồ của mình lấy Út Thơ, ngay lập tức', next: 'do_de_quen' },
      { key: 'C', text: 'Túm cổ áo anh Phát, buộc anh đưa chìa khóa', next: (s) => (s.TC >= 60 ? 'n3B_cao' : 'n3B_thap'), hint: 'Cần Tin cậy ≥ 60' }
    ]
  },

  n3_het_gio: {
    time: '01:44',
    title: 'Tiếng “dạ”',
    text: [
      'Bạn chần chừ quá lâu. Tiếng khóc trong phòng ngừng bặt. Rồi bạn nghe rõ giọng Út Thơ, rất ngoan: “Dạ.”',
      'Cánh cửa căn 405 tự mở. Út Thơ bước ra, mắt nhìn vô định, tay vẫn ôm một chiếc ghế đẩu không phải của em.',
      'Đèn pin của cả nhóm tối thêm một nấc.'
    ],
    effects: { TT: -10, TC: -10, PIN: -1 },
    flags: { tho_da_nhan_loi: true },
    gain: { clues: ['Út Thơ đã đáp lời giọng nói trong căn 405.'] },
    choices: [{ text: 'Tiếp tục', next: 'ket_man1' }]
  },

  p3: {
    time: '01:44',
    title: 'Bản vẽ tầng 4',
    type: 'puzzle',
    danger: true,
    timer: { sec: 30, next: 'n3A_sai', label: 'Út Thơ sắp đáp lời' },
    text: ['Bạn đang đứng trong căn 406, tay cầm chiếc xà beng đội tháo dỡ để quên. Phải chọn đúng bức tường phá được.'],
    svg: SVG_P3,
    inspect: {
      V1: 'V1 · Vách giữa 405 và 406. Nét đơn, gạch 110.',
      V2: 'V2 · Tường giữa 406 và hành lang. Gạch chéo, 220.',
      V3: 'V3 · Tường hồi phía đông. Gạch chéo, 220. Phía sau là khoảng không cao bốn tầng.'
    },
    answers: [
      { text: 'Phá V1', next: 'n3A_ok' },
      { text: 'Phá V2', next: 'n3A_sai' },
      { text: 'Phá V3', next: 'n3A_sai' }
    ]
  },

  n3A_sai: {
    time: '01:49',
    title: 'Tường 220',
    text: [
      'Xà beng nảy bật lại, tê dại cả hai cổ tay. Bức tường chỉ tróc ra một mảng vữa nhỏ.',
      'Năm phút trôi qua trong tiếng kéo đồ và giọng ngọt ngào kia. Đèn pin tối thêm một nấc. Bạn nhìn lại bản vẽ, nhận ra mình đọc nhầm, rồi quay sang bức vách mỏng.'
    ],
    effects: { TT: -10, PIN: -1 },
    choices: [{ text: 'Phá vách V1', next: 'n3A_ok' }]
  },

  n3A_ok: {
    time: '01:52',
    title: 'Vách 110',
    text: [
      'Gạch 110 vỡ sau bốn nhát xà beng, bụi vữa mù mịt. Bạn bò qua lỗ hổng. Trong căn 405, đồ đạc đã xếp thành một vòng tròn quanh Út Thơ. Em đứng giữa, mắt mở to, môi mấp máy như sắp đáp lời.',
      'Bạn thò tay xuống gầm giường. Chiếc kẹp tóc hình ngôi sao được gói trong một mảnh giấy xé từ sổ tay. Nét chữ trên đó giống hệt nét chữ của mẩu giấy không chữ ký, và giống hệt nét chữ trong cuốn sổ anh Phát vẫn kẹp ở nách.',
      'Kẹp tóc vừa rời khỏi căn phòng, vòng đồ đạc dạt ra như nước rút. Út Thơ khuỵu xuống, ôm chặt lấy bạn, khóc không ra tiếng.'
    ],
    effects: { TT: -15, TC: 15, DN: 10 },
    flags: { l7_cua_phat: true },
    gain: { clues: ['Bằng chứng: dòng luật không chữ ký và mảnh giấy gói kẹp tóc cùng một nét chữ, nét chữ của anh Phát.'] },
    choices: [{ text: 'Tiếp tục', next: 'ket_man1' }]
  },

  n3B_cao: {
    time: '01:46',
    title: 'Lời thú nhận',
    text: [
      'Anh Phát nhìn bạn rất lâu, rồi gục xuống bậc cầu thang. “Mấy năm nay… nhà bỏ trống, đồ người ta để lại… anh có lấy vài món. Học phí con bé… Giờ cái nhà nó không cho anh đi. Đọc mẩu giấy kia anh tưởng… đổi đứa khác vào thì…”',
      'Anh móc chìa khóa căn 405 từ túi quần ra. Hóa ra nó chưa bao giờ bị mất.',
      'Cửa vừa mở, Út Thơ lao ra ôm chầm lấy bạn. Trong lúc bạn cúi nhặt chiếc kẹp tóc dưới gầm giường, anh Phát lẩm bẩm như nói với chính mình: “…cả cái chuồng cọp năm 2016 nữa…”'
    ],
    effects: { TT: -10, TC: 5 },
    flags: { phat_thu_nhan: true },
    gain: { clues: ['(Hiếm) Anh Phát thú nhận đã lấy đồ ở các căn bỏ trống. Anh nhắc tới “cái chuồng cọp năm 2016”.'] },
    choices: [{ text: 'Tiếp tục', next: 'ket_man1' }]
  },

  n3B_thap: {
    time: '01:50',
    title: 'Chối',
    text: [
      '“Cô nghi tôi à? Tôi làm cái nghề này hai mươi năm rồi!” Anh Phát gạt tay bạn ra. Hai bên giằng co mất mấy phút.',
      'Rồi cánh cửa căn 405 tự mở. Út Thơ bước ra, mắt nhìn vô định. Ngay trước khi cửa mở, bạn nghe rõ em đáp một tiếng “dạ”.',
      'Đèn pin của cả nhóm tối thêm một nấc.'
    ],
    effects: { TT: -10, TC: -10, PIN: -1 },
    flags: { tho_da_nhan_loi: true },
    gain: { clues: ['Út Thơ đã đáp lời giọng nói trong căn 405.'] },
    choices: [{ text: 'Tiếp tục', next: 'ket_man1' }]
  },

  /* ===== KẾT MÀN 1 ===== */
  ket_man1: {
    time: '02:30',
    title: 'Chín phẩy sáu',
    text: (s) => {
      const t = ['Cả nhóm tập trung ở chiếu nghỉ tầng 4. Chị Trâm từ ngoài xe lên, tay ôm laptop, mặt tái đi vì gió đêm.'];
      if (s.flags.l7_cua_phat || s.flags.phat_thu_nhan) t.push('Anh Phát đứng tách ra một góc. Không ai nói gì với anh, và anh cũng không nói gì. Màn hình khóa điện thoại của anh sáng lên: ảnh bé gái mặc đồng phục.');
      if (s.flags.tho_da_nhan_loi) t.push('Út Thơ ngồi bó gối, thỉnh thoảng lại khe khẽ đáp “dạ” với khoảng không.');
      if (s.flags.phat_neo_nang && !s.flags.phat_thu_nhan) t.push('Trong túi áo anh Phát, tiếng tích tắc vẫn chưa dừng.');
      t.push(
        'Bạn cộng lại toàn bộ số đo của đêm nay. Tổng diện tích sàn nhà B4 đã tăng thêm 9,6 m², vừa đúng diện tích một căn phòng nhỏ. Nhưng căn nào bạn cũng đã đo lại, và không căn nào rộng ra.',
        'Chị Trâm nhìn con số trên tablet và lặp lại rất khẽ: “Chín phẩy sáu.” Giọng chị như vừa gặp lại một người quen.',
        'Chị nhìn trân trân vào bản vẽ tầng 5. “Căn 502 là nhà tôi ngày trước. Năm tôi tám tuổi… tôi đã cố ý để quên một thứ ở đó.”'
      );
      if (s.flags.goi_me) t.push('Điện thoại rung. Tin nhắn của mẹ: “Mẹ ngủ đây. Con nhớ lời mẹ dặn nhé.” Bạn nhớ: xong việc thì về luôn, đừng nán lại.');
      t.push('Chiếc loa phường khục lên một tiếng: “Đề nghị hộ 502 lên nhận lại đồ.”');
      return t;
    },
    choices: [{ text: 'Kết thúc Màn 1', next: 'het_man1' }]
  },

  het_man1: { type: 'actend', title: 'Hết Màn 1 · Bàn giao', time: '02:30', next: 'Màn 2 · Cơi nới', teaser: 'Một chiếc chuồng cọp đã tháo từ năm 2016 đang bám ngoài cửa sổ căn 502. Bên trong có một con búp bê vải, và một con số mà ai đó đã ký khống.' },

  /* ===== KẾT THÚC THẤT BẠI ===== */
  buc_tuong_moi: {
    type: 'ending',
    title: 'Bức tường mới',
    text: [
      'Hai bước chân dài hơn bạn tưởng. Cánh cửa lùi ra xa, còn các bức vách khép lại gần nhau. Vệt đèn pin hẹp dần thành một khe sáng, rồi tắt.',
      'Một tuần sau, kỹ sư của đội phá dỡ quét laser toàn bộ nhà B4 và phát hiện thêm một bức vách dày 22 cm mà bản vẽ không có. Bức vách ấm như người.',
      'Trên bản vẽ hoàn công mới, có ai đó ghi chú bằng bút chì: “Vách không chịu lực. Đừng đập. Có người tựa.”'
    ]
  },

  can_ho_di_theo: {
    type: 'ending',
    title: 'Căn hộ đi theo',
    text: [
      'Chiếc đồng hồ vỡ tan dưới sân. Tiếng kéo đồ im bặt. Mọi người thở phào và làm nốt việc cho tới sáng. Biên bản được nộp đúng giờ.',
      'Bạn về phòng trọ, tra chìa vào ổ khóa và mở cửa.',
      'Bên trong là căn 207: ba cái đinh trên tường, mùi vữa ẩm, và chiếc đồng hồ quả lắc treo ở đinh giữa, đang tích tắc. Đồ của căn đó bị mang ra ngoài thì căn đó đi theo. Nó đã dọn đến ở với bạn.'
    ]
  },

  do_de_quen: {
    type: 'ending',
    title: 'Đồ để quên',
    text: [
      'Cửa bật mở, Út Thơ ngã nhào ra ngoài hành lang. Cánh cửa đóng lại sau lưng em, và lúc ấy bạn mới nhận ra mình đang đứng ở phía bên trong.',
      'Sáng thứ Hai, đội phá dỡ kiểm tra lần cuối căn 405. Trên bàn có một tấm thẻ nhân viên.',
      'Trên tường treo một khung ảnh gia đình đã bạc màu. Trong ảnh có thêm một cô gái mặc áo xanh, đứng mỉm cười giữa mọi người như thể từ trước đến nay vẫn đứng đó.'
    ]
  },

  o_lai: {
    type: 'ending',
    title: 'Ở lại',
    text: [
      'Bạn không còn nhớ mình định đi đâu. Căn phòng này vừa vặn quá: chiếc ghế đúng tầm, khung cửa đúng tầm vai.',
      'Biên bản kiểm đếm nộp lúc 5 giờ sáng ghi thiếu một kỹ sư trắc địa. Biên bản tài sản thì ghi thừa một chiếc ghế nhựa, còn ấm.'
    ]
  },

  do_mai: {
    type: 'ending',
    title: 'Đo mãi',
    text: [
      'Bạn đo lại bức tường lần thứ một trăm. 3,62 m. 3,40 m. 3,62 m. Con số không chịu đứng yên, nên bạn không thể dừng lại.',
      'Đội phá dỡ tìm thấy bạn ngồi trong căn 304, tay bấm thước laser liên tục, miệng đọc số. Không ai nỡ cắt ngang.'
    ]
  },

  tat_den: {
    type: 'ending',
    title: 'Tắt đèn',
    text: [
      'Nấc pin cuối cùng tắt cùng lúc trên mọi chiếc đèn. Trong bóng tối, bạn nghe tiếng đồ đạc dịch đến, rất chậm, rất kiên nhẫn, như những người hàng xóm cũ kéo ghế ra ngồi chơi.',
      'Sáng hôm sau, trong phần mềm theo dõi, nhà B4 vẫn hiện trạng thái: “Đang kiểm đếm.”'
    ]
  }
};

/* ---------- Bộ sưu tập kết thúc ---------- */
STORY.endingsList = [
  { id: 'ket_thu_nhan', title: 'Kết Màn 1: Lời thú nhận', kind: 'act', act: 1, hint: 'Đủ tin cậy để một người tự nói ra sự thật.' },
  { id: 'ket_kep_toc', title: 'Kết Màn 1: Nét chữ trên kẹp tóc', kind: 'act', act: 1, hint: 'Đọc bản vẽ để mở một lối không có cửa.' },
  { id: 'ket_tieng_da', title: 'Kết Màn 1: Tiếng “dạ”', kind: 'act', act: 1, hint: 'Có những lời không nên đáp.' },
  { id: 'buc_tuong_moi', title: 'Bức tường mới', kind: 'fail', hint: 'Hai bước chân dài hơn bạn tưởng.' },
  { id: 'can_ho_di_theo', title: 'Căn hộ đi theo', kind: 'fail', hint: 'Có thứ không nên mang ra khỏi nhà.' },
  { id: 'do_de_quen', title: 'Đồ để quên', kind: 'fail', hint: 'Một cuộc đổi chác quá dễ dàng.' },
  { id: 'o_lai', title: 'Ở lại', kind: 'fail', act: 2, hint: 'Khi tòa nhà neo bạn quá chặt: Độ neo chạm 60.' },
  { id: 'do_mai', title: 'Đo mãi', kind: 'fail', act: 1, hint: 'Khi tỉnh táo cạn kiệt vì quá nhiều lựa chọn sai.' },
  { id: 'tat_den', title: 'Tắt đèn', kind: 'fail', act: 4, hint: 'Không ai chịu ký vào con số cuối cùng.' }
];
STORY.actEndingOf = (s) => (s.flags.phat_thu_nhan ? 'ket_thu_nhan' : s.flags.l7_cua_phat ? 'ket_kep_toc' : 'ket_tieng_da');

/* ---------- Dàn dựng 3D + âm thanh cho từng cảnh ----------
   view: không gian · cast: nhân vật · fx: hiệu ứng hình · sfx: âm thanh · tablet: chữ trên tablet */
const TAB_START = [{ t: 'Tổng diện tích sàn nhà B4', s: 46, wt: 600, c: '#9fc3ff' }, { t: '1.842,6 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Khớp hồ sơ', s: 48, wt: 700, c: '#8fe0a8' }];
STORY.staging = {
  cold_open:   { view: 'corridor', cast: [], fx: ['redlight', 'tablet', 'long'], sfx: ['heart'], tablet: [{ t: 'Đồng bộ thất bại', s: 70, c: '#ff7a6a' }, { t: '1.871,4 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Sai lệch +28,8 m²', s: 50, wt: 700, c: '#ffd27a' }] },
  mo_dau_1:    { view: 'exterior', cast: ['kha', 'tho'], fx: [] },
  tin_nhan_me: { view: 'stair', cast: [], fx: [], sfx: ['phone'] },
  goi_me:      { view: 'stair', cast: [], fx: [], sfx: ['scrape_far'] },
  nhan_me:     { view: 'stair', cast: [], fx: [] },
  mo_dau_2:    { view: 'room304', cast: ['tho'], fx: ['ghost', 'tablet'], tablet: TAB_START },
  tho_tat_live:{ view: 'room304', cast: ['tho'], fx: ['ghost'], sfx: ['loa_click'] },
  tho_giu_live:{ view: 'room304', cast: ['tho'], fx: ['ghost'], sfx: ['loa_click'] },
  nut1:        { view: 'room304', cast: ['tho'], fx: ['slide', 'shake', 'alarm'], sfx: ['loa', 'scrape'] },
  n1_het_gio:  { view: 'room304', cast: ['tho'], fx: ['slide', 'shake'], sfx: ['scrape'] },
  p1:          { view: 'room304', cast: ['tho'], fx: ['slide', 'alarm'] },
  n1A_ok:      { view: 'room304', cast: ['tho'], fx: ['slid'] },
  n1A_sai:     { view: 'room304', cast: ['tho'], fx: ['slid'], sfx: ['thud'] },
  n1B:         { view: 'room304', cast: ['tho'], fx: ['slid', 'cupboard'], sfx: ['thud'] },
  banh_mi:     { view: 'stair', cast: ['phat'], fx: [] },
  banh_mi_hoi: { view: 'stair', cast: ['phat'], fx: [] },
  banh_mi_an:  { view: 'stair', cast: ['phat'], fx: [], sfx: ['tick'] },
  nut2:        { view: 'stair', cast: ['phat', 'tho'], fx: ['clockhand', 'alarm'], sfx: ['tick', 'scrape_far'] },
  p2:          { view: 'room207', cast: ['tho'], fx: ['clockhand', 'clockfast'], sfx: ['tickfast'] },
  n2A_ok:      { view: 'room207', cast: ['tho', 'phat'], fx: ['clockhung'], sfx: ['tick'] },
  n2A_sai:     { view: 'room207', cast: ['tho', 'phat'], fx: ['clockhung', 'shake'], sfx: ['scrape', 'tickfast'] },
  n2C:         { view: 'stair', cast: ['phat', 'tho'], fx: ['clockhand'], sfx: ['tick'] },
  nut3:        { view: 'corridor', cast: ['phat'], fx: ['door405', 'redlight'], sfx: ['scrape', 'heart'] },
  n3_het_gio:  { view: 'corridor', cast: ['phat', 'tho'], fx: ['dooropen', 'redlight'], sfx: ['door'] },
  p3:          { view: 'corridor', cast: ['phat'], fx: ['door405', 'redlight'], sfx: ['heart'] },
  n3A_sai:     { view: 'corridor', cast: ['phat'], fx: ['door405', 'shake'], sfx: ['thud'] },
  n3A_ok:      { view: 'room405', cast: ['tho'], fx: ['hole', 'circle'], sfx: ['thud'] },
  n3B_cao:     { view: 'corridor', cast: ['phat', 'tho'], fx: ['dooropen'], sfx: ['door'] },
  n3B_thap:    { view: 'corridor', cast: ['phat', 'tho'], fx: ['dooropen', 'redlight'], sfx: ['door'] },
  ket_man1:    { view: 'stair', cast: ['tho', 'phat', 'tram'], fx: ['tablet'], sfx: ['loa_click'], tablet: [{ t: 'Tổng diện tích sàn nhà B4', s: 46, wt: 600, c: '#9fc3ff' }, { t: '1.852,2 m²', s: 120, c: '#ffffff', mono: true }, { t: '+9,6 m² so với 22:47', s: 48, wt: 700, c: '#ff7a6a' }] },
  het_man1:    { view: 'exterior', cast: [], fx: ['dawn'] },
  menu:        { view: 'exterior', cast: [], fx: ['menu'] }
};
