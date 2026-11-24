/* =========================================================
   KIỂM ĐẾM CA ĐÊM – NHÀ B4
   Dữ liệu truyện MÀN 3: "CĂN 509" (04:00 – 04:40)
   Gộp vào STORY (không ghi đè).
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Mini-game: hai bản vẽ tầng 5 ---------- */
  const F = 'Roboto Mono, monospace';
  const plan = (x0, title, with509) => {
    let g = `<text x="${x0}" y="64" fill="#cfe4ff" font-family="${F}" font-size="13">${title}</text>`;
    g += `<rect x="${x0}" y="78" width="270" height="34" fill="#102f4f" stroke="#3d7ab0"/><text x="${x0 + 96}" y="100" fill="#7fa7cf" font-family="${F}" font-size="11">hành lang</text>`;
    for (let i = 0; i < 4; i++) {
      g += `<rect x="${x0 + i * 60}" y="112" width="58" height="66" fill="#0e2f50" stroke="#3d7ab0"/><text x="${x0 + i * 60 + 14}" y="150" fill="#cfe4ff" font-family="${F}" font-size="12">50${i * 2 + 1}</text>`;
      g += `<rect x="${x0 + i * 60}" y="12" width="58" height="66" fill="#0e2f50" stroke="#3d7ab0" transform="translate(0,0)"/>`;
    }
    for (let i = 0; i < 4; i++) g += `<text x="${x0 + i * 60 + 14}" y="50" fill="#cfe4ff" font-family="${F}" font-size="12">50${i * 2 + 2}</text>`;
    if (with509) {
      g += `<rect class="hit" data-id="r509" x="${x0 + 240}" y="78" width="30" height="100" fill="#3a1520" stroke="#ff7a7a" stroke-dasharray="4 3"/>`;
      g += `<line x1="${x0 + 240}" y1="78" x2="${x0 + 270}" y2="178" stroke="#ff7a7a" stroke-width="2" pointer-events="none"/><line x1="${x0 + 270}" y1="78" x2="${x0 + 240}" y2="178" stroke="#ff7a7a" stroke-width="2" pointer-events="none"/>`;
      g += `<text x="${x0 + 242}" y="196" fill="#ff9b9b" font-family="${F}" font-size="11" pointer-events="none">509?</text>`;
    }
    return g;
  };
  const SVG_P8 = `
<svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hai bản vẽ tầng 5">
<defs><pattern id="g8" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#1d4f7c" stroke-width="0.6"/></pattern></defs>
<rect width="100%" height="100%" fill="#0b2a4a"/><rect width="100%" height="100%" fill="url(#g8)"/>
<text x="20" y="28" fill="#cfe4ff" font-family="${F}" font-size="14">Tầng 5 · Đối chiếu hai bản vẽ cùng năm 1979</text>
<g transform="translate(0,40)">${plan(24, 'Bản A', true)}</g>
<g transform="translate(0,40)">${plan(340, 'Bản B', false)}</g>
<rect class="hit" data-id="stampA" x="24" y="250" width="270" height="34" fill="#16426b" stroke="#ffd27a"/>
<text x="34" y="272" fill="#ffd27a" font-family="${F}" font-size="11" pointer-events="none">khung tên bản A (bấm để đọc)</text>
<rect class="hit" data-id="stampB" x="340" y="250" width="270" height="34" fill="#16426b" stroke="#ffd27a"/>
<text x="350" y="272" fill="#ffd27a" font-family="${F}" font-size="11" pointer-events="none">khung tên bản B (bấm để đọc)</text>
<rect class="hit" data-id="log" x="24" y="300" width="586" height="30" fill="#2a1a10" stroke="#ff9b6a"/>
<text x="34" y="320" fill="#ff9b6a" font-family="${F}" font-size="11" pointer-events="none">nhật ký phần mềm: bản vẽ đang dùng để đối chiếu (bấm để đọc)</text>
<rect class="hit" data-id="mine" x="24" y="344" width="586" height="30" fill="#14321f" stroke="#8fe0a8"/>
<text x="34" y="364" fill="#8fe0a8" font-family="${F}" font-size="11" pointer-events="none">số đo đêm nay của bạn (bấm để đọc)</text>
</svg>`;

  /* ---------- Cảnh Màn 3 ---------- */
  Object.assign(STORY.scenes, {

    m3_mo: {
      act: 'Màn 3 · Căn 509',
      time: '04:01',
      title: 'Bữa cơm',
      text: (s) => {
        const t = [
          'Loa vừa dứt, cả nhóm quay lại thì Út Thơ đã biến mất.',
          'Livestream của em vẫn chạy, 12.408 người đang xem. Khung hình là một căn phòng nhỏ ấm cúng đến lạ: đèn bàn vàng, mâm cơm bày năm cái bát. Út Thơ ngồi giữa, cười với ống kính: “Nhà mới của em nè mọi người.”'
        ];
        t.push(s.flags.nhan_phan_chia
          ? 'Cuối hành lang tầng 5, cánh cửa 509 giờ đã rắn chắc như mọi cánh cửa khác. Trên cánh cửa có mã khảo sát viết bằng phấn trắng, KĐ-509 ✓, và đó là nét phấn của chính bạn.'
          : 'Cuối hành lang tầng 5 có một cánh cửa mờ như vẽ bằng nước. Biển số đề 509. Nó không có trong hồ sơ của bạn, vậy mà nó vẫn đứng đó.');
        t.push('Tablet báo: “Bản vẽ đang dùng để đối chiếu: bản vẽ thiết kế năm 1979. Tải lên lúc 22:05.” Bạn chưa từng tải bản vẽ nào lên.');
        t.push('Ông Kha nhìn cánh cửa rất lâu. “Năm bảy chín, trên giấy có căn ấy. Thiếu gạch nên không xây. Cả tầng dùng chỗ ấy làm sân phơi chung.”');
        if (s.flags.tho_da_nhan_loi) t.push('“Con bé đã đáp lời nó từ tối,” ông nói thêm. “Nó coi con bé là người nhà rồi.”');
        return t;
      },
      choices: [{ text: 'Chạy tới cửa 509', next: 'nut7' }]
    },

    /* ===== NÚT 7 ===== */
    nut7: {
      time: '04:06',
      title: 'Nút 7 · Căn hộ ấm cúng',
      checkpoint: true,
      danger: true,
      timer: { sec: 25, next: 'n7_het_gio', label: 'Cửa 509 đang khép' },
      text: (s) => {
        const t = [
          'Cánh cửa 509 hé mở. Bên trong là một căn phòng ghép từ những thứ bị bỏ quên đêm nay: chiếc tủ gỗ của căn 304, chiếc giường sắt của căn 207, chiếc quạt trần ba cánh. Tường mỗi mảng một màu vôi khác nhau.',
          'Út Thơ ngồi bên mâm cơm, tay vẫn giơ điện thoại. Cạnh em có một chiếc ghế trống. Trên lưng ghế vắt một chiếc áo khoác xanh giống hệt áo bạn đang mặc.',
          '“Chị vào ăn cơm đi chị,” em nói, mắt không chớp. “Ấm lắm.”'
        ];
        if (s.flags.phat_neo_nang && !s.flags.phat_thu_nhan) t.splice(1, 0, 'Trên tường có treo chiếc đồng hồ quả lắc của căn 207, đang tích tắc.');
        t.push('Cánh cửa từ từ khép lại, chậm như một hơi thở ra.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Lao vào nắm tay Út Thơ kéo ra, chỉ ba bước là tới', next: 'can_ho_mau' },
        { key: 'B', text: 'Gọi em qua livestream: bảo em nhìn màn hình, đi theo vệt mờ ra cửa', next: (s) => (s.TC >= 55 ? 'n7B_ok' : 'n7B_nua'), hint: 'Cần Tin cậy ≥ 55' },
        { key: 'C', text: 'Đứng ở ngưỡng cửa, mở biên bản, đọc to cho căn 509 nghe từng món đồ: của ai, phải trả về đâu', next: 'n7C' }
      ]
    },

    n7_het_gio: {
      time: '04:08',
      title: 'Khép',
      text: [
        'Cánh cửa khép lại chỉ còn một khe hẹp. Qua khe cửa, bạn nghe tiếng bát đũa lách cách và tiếng Út Thơ cười, cười như đang ăn Tết.',
        'Bạn gào tên em, đập cửa. Phải gần một phút sau em mới ngoái lại.'
      ],
      effects: { TT: -15 },
      choices: [{ text: 'Gọi em qua livestream', next: 'n7B_nua' }]
    },

    n7B_ok: {
      time: '04:09',
      title: 'Vệt mờ',
      text: [
        'Bạn gõ vào ô bình luận: “Thơ ơi, nhìn màn hình của em. Nhìn những vệt mờ.” Mười hai nghìn người gõ theo cùng một câu.',
        'Út Thơ cúi xuống màn hình. Qua chế độ ban đêm, căn phòng hiện ra đúng bản chất của nó: những vệt mờ của đồ đạc nhà người khác, xếp chồng lên một khoảng sân phơi trống trơn.',
        'Em đứng dậy, bước theo giọng bạn, từng bước một, ra khỏi cửa. Rồi em ôm chặt lấy bạn, run bần bật.'
      ],
      effects: { TT: -10, TC: 10 },
      flags: { tho_ra: true },
      choices: [{ text: 'Tiếp tục', next: 'giua_78' }]
    },

    n7B_nua: {
      time: '04:10',
      title: 'Chiếc điện thoại ở lại',
      text: [
        'Út Thơ nghe thấy bạn, nhưng chậm, như người đang mơ. Em đứng dậy, đi ra, và để quên chiếc điện thoại trên mâm cơm.',
        'Cửa 509 đóng lại sau lưng em. Livestream vẫn chạy, giờ quay từ bên trong căn phòng: năm cái bát, một chiếc ghế trống, một chiếc áo xanh.',
        'Út Thơ sờ túi quần, mặt tái mét. “Đồ của em… em để quên rồi.”'
      ],
      effects: { TT: -15, TC: -5 },
      flags: { tho_ra: true, tho_de_dien_thoai: true },
      gain: { clues: ['(Hiếm) Điện thoại của Út Thơ bị bỏ quên trong căn 509 và vẫn livestream từ bên trong.'] },
      choices: [{ text: 'Tiếp tục', next: 'giua_78' }]
    },

    n7C: {
      time: '04:12',
      title: 'Trả đồ',
      text: (s) => {
        const t = [
          'Bạn đứng ở ngưỡng cửa, không bước qua, mở biên bản và đọc to. “Tủ gỗ: 01, của căn 304. Giường sắt: 01, của căn 207. Quạt trần: 01, của căn 304.”',
          'Mỗi món được đọc tên, nó lại khẽ rung rồi trượt ra cửa, như người khách nhớ ra đường về.'
        ];
        if (s.flags.kha_viet_phieu) t.push('Ông Kha đứng cạnh bạn, đọc tiếp những món bạn không biết: “Mâm nhôm này của nhà bà Tư. Cái đèn bàn của thằng Hải 402.” Giọng ông đều đều như kể chuyện. Căn phòng trống đi nhanh gấp đôi.');
        t.push(
          '“Kẹp tóc ngôi sao: 01, của Út Thơ. Em ấy chỉ ở tạm, không phải người nhà này.” Út Thơ chớp mắt như vừa tỉnh ngủ, rồi bước ra.',
          'Còn một món. Bạn nhìn sang chị Trâm. “Búp bê vải: 01, của căn 502.”',
          'Chị Trâm ôm chặt con Bông rất lâu. Rồi chị bước sang căn 502, đặt nó lên bậu cửa sổ, đúng chỗ năm 1998 chị để nó lại. “Lần này chị đi thật đấy, Bông.”'
        );
        return t;
      },
      flags: { tho_ra: true, tra_bong: true },
      gain: { clues: ['Đọc to biên bản cho căn 509 nghe, đồ đạc tự trả về chủ. Chị Trâm để con Bông lại căn 502.'] },
      choices: [{ text: 'Tiếp tục', next: 'giua_78' }]
    },

    /* ===== 04:15 – khoảnh khắc với anh Phát ===== */
    giua_78: {
      time: '04:15',
      title: 'Họp phụ huynh',
      text: (s) => {
        const t = ['Anh Phát ngồi bệt ở đầu cầu thang, điện thoại sáng trên tay. Tin nhắn của con gái gửi từ tối qua: “Bố ơi mai bố đi họp phụ huynh cho con nha. Cô bảo con được khen.”'];
        t.push(s.flags.phat_thu_nhan || s.flags.l7_cua_phat
          ? '“Em biết hết về anh rồi,” anh nói, không ngẩng lên. “Nếu sáng nay anh bị gọi lên làm việc thì ai đi họp cho con bé?”'
          : '“Sáng nay xong việc anh còn kịp đi họp,” anh nói, rồi im lặng rất lâu. “Nếu mọi chuyện vẫn êm.”');
        return t;
      },
      choices: [
        { key: 'A', text: '“Anh tự khai đi. Em hứa sẽ nói rõ hoàn cảnh của anh.”', next: 'giua_78_hua' },
        { key: 'B', text: 'Ngồi xuống cạnh anh, không nói gì', next: 'giua_78_im' }
      ]
    },

    giua_78_hua: {
      time: '04:17',
      title: 'Lời hứa',
      text: ['Anh Phát nhìn bạn, gật đầu rất chậm. “Ừ. Để anh nghĩ.” Anh tắt màn hình. Ảnh con bé vụt tắt, nhưng anh vẫn nắm chặt điện thoại như nắm tay con.'],
      effects: { TC: 5 },
      flags: { hua_phat: true },
      choices: [{ text: 'Tiếp tục', next: 'nut8' }]
    },

    giua_78_im: {
      time: '04:16',
      title: 'Im lặng',
      text: ['Hai người ngồi cạnh nhau một lúc. Ở dưới sân, đèn xe của đội phá dỡ quét qua ô cửa cầu thang. Bạn thấy đầu óc tỉnh táo lại, như vừa được thở.'],
      effects: { TT: 5 },
      choices: [{ text: 'Tiếp tục', next: 'nut8' }]
    },

    /* ===== NÚT 8 (nút chậm: suy luận) ===== */
    nut8: {
      time: '04:20',
      title: 'Nút 8 · Bản vẽ nào',
      checkpoint: true,
      text: (s) => {
        const t = [
          'Ông Kha kể, giọng chậm rãi: “Năm bảy chín có hai bản vẽ. Bản thiết kế có căn 509, phòng sinh hoạt chung, chín mét rưỡi. Thiếu gạch nên cắt đi. Bản hoàn công thì không có. Sau này nhà 502 quây khoảng sân phơi ấy lại thành chuồng cọp.”',
          'Bạn chợt hiểu: chiếc chuồng cọp 9,6 m² chính là chỗ của căn 509 chưa từng được xây.',
          'Phần mềm đang đối chiếu toàn bộ nhà B4 theo bản thiết kế, bản có căn 509. Trước giờ chốt sổ, bạn phải chọn bản vẽ chuẩn.'
        ];
        if (s.flags.tho_de_dien_thoai) t.push('Trên điện thoại của bạn, livestream từ trong căn 509 vẫn chiếu chiếc ghế trống và chiếc áo xanh.');
        return t;
      },
      choices: [{ text: 'Mở hai bản vẽ và nhật ký phần mềm', next: 'p8' }]
    },

    p8: {
      time: '04:22',
      title: 'Đối chiếu',
      type: 'puzzle',
      text: ['Không có đồng hồ. Hãy đọc kỹ từng khung tên, nhật ký phần mềm và số đo của chính bạn. Mở Sổ tay nếu cần đối chiếu manh mối cũ.'],
      svg: SVG_P8,
      inspect: {
        stampA: 'Khung tên bản A: “Bản vẽ thiết kế kỹ thuật, tháng 3/1979. Chưa thi công.” Có dấu đỏ của viện thiết kế.',
        stampB: 'Khung tên bản B: “Bản vẽ hoàn công, tháng 12/1979. Đã nghiệm thu, đưa vào sử dụng.” Có chữ ký của ban nghiệm thu.',
        r509: 'Căn 509 trên bản A: “Phòng sinh hoạt chung, 9,6 m².” Bị gạch chéo đỏ, ghi chú tay: “cắt giảm, thiếu vật tư”.',
        log: 'Nhật ký: bản A được tải lên lúc 22:05, từ thiết bị KĐ-02, đăng nhập bằng tài khoản Nghiêm Bảo Trâm. (Theo biên bản căn 207, máy KĐ-02 là tablet của trưởng nhóm.)',
        mine: 'Số đo đêm nay của bạn: tổng 1.852,2 m². Có 9,6 m² không khớp với bất kỳ bản vẽ nào. Mọi số đo đều có chữ ký số của bạn.'
      },
      answers: [
        { text: 'Đặt bản B (hoàn công 1979) làm chuẩn', next: 'n8_ok' },
        { text: 'Giữ bản A (thiết kế): căn 509 hợp lệ, không ai phải giải trình', next: 'n8_thiet_ke' },
        { text: 'Dùng số đo đêm nay của bạn: mới nhất, chính xác nhất, có chữ ký của bạn', next: 'sai_so' }
      ]
    },

    n8_ok: {
      time: '04:26',
      title: 'Hoàn công',
      text: [
        'Bạn đặt bản hoàn công làm chuẩn. Phần mềm chạy lại phép đối chiếu: “Căn 509: không tồn tại.” Cuối hành lang, cánh cửa 509 mỏng đi như tờ giấy can, nhìn xuyên qua được.',
        'Bạn quay sang anh Phát. Không cần hỏi. Anh tự nói: “Máy KĐ-02 là của anh. Anh đăng nhập bằng tài khoản chị Trâm vì máy chị ấy để quên mật khẩu trên giấy nhớ. Bản thiết kế có căn 509 chín mét sáu, thì con số chuồng cọp anh ký năm 2016 sẽ khớp với thiết kế gốc. Anh chỉ muốn số liệu khớp.”',
        'Chị Trâm nhắm mắt. “Tôi soạn phương án dựa trên con số ấy. Tôi không hỏi nó từ đâu ra. Tôi không muốn biết.”'
      ],
      effects: { DN: -10, TT: -5 },
      flags: { ban_ve_dung: true },
      gain: { clues: ['Anh Phát tải bản thiết kế 1979 lên lúc 22:05 bằng tablet KĐ-02, dùng tài khoản của chị Trâm, để con số 9,6 m² "khớp thiết kế gốc".'] },
      choices: [{ text: 'Tiếp tục', next: 'nut9' }]
    },

    n8_thiet_ke: {
      time: '04:25',
      title: 'Thiết kế',
      text: [
        'Bạn giữ nguyên bản thiết kế. Phần mềm chạy lại: “Căn 509: hợp lệ. 9,6 m². Chưa có chủ hộ.”',
        'Anh Phát thở phào. Chị Trâm không nói gì. Cuối hành lang, cánh cửa 509 dày thêm, sơn xanh mới tinh, ổ khóa sáng loáng. Bên trong vọng ra tiếng ai đó dọn thêm một cái bát.',
        'Bạn nhận ra mình vừa ký một thứ, dù không cầm bút.'
      ],
      effects: { DN: 15, TC: 5 },
      flags: { ban_ve_thiet_ke: true },
      gain: { clues: ['(Hiếm) Giữ bản thiết kế 1979: căn 509 trở thành căn hộ hợp lệ, "chưa có chủ hộ".'] },
      choices: [{ text: 'Tiếp tục', next: 'nut9' }]
    },

    /* ===== NÚT 9 ===== */
    nut9: {
      time: '04:32',
      title: 'Nút 9 · Mười hai nghìn người xem',
      checkpoint: true,
      danger: true,
      timer: { sec: 30, next: 'n9_het_gio', label: 'Hành lang đang dài ra' },
      text: (s) => {
        const t = [
          'Hành lang tầng 5 bắt đầu dài ra. Mỗi lần bạn chớp mắt, cánh cửa 509 lại lùi xa thêm một bước. Bóng đèn trần nối nhau tắt dần.',
          s.flags.tho_de_dien_thoai
            ? 'Bạn mở livestream bằng điện thoại của mình rồi ghép vào phòng live của Út Thơ. Màn hình chia đôi: một bên là các bạn, một bên là căn 509 với chiếc ghế trống.'
            : 'Út Thơ giơ điện thoại lên. Số người xem nhảy liên tục: 12.408, rồi 15.000, rồi 21.000.',
          'Bình luận chạy dày đặc: “Bản vẽ nào đúng?”, “Ai ký 9,6 mét vuông?”, “Nói đi chị ơi!!!”',
          'Ông Kha nói khẽ: “Nhà này tin cái gì nhiều người cùng nhìn thấy. Hồi xưa cả dãy cùng ký một tờ giấy là nó đứng vững bốn mươi năm.”'
        ];
        if (s.flags.nhan_phan_chia) t.push('Trong túi bạn, điện thoại rung: một khoản chuyển tiền nữa, đúng như lời hứa.');
        if (s.flags.tra_bong) t.push('Chị Trâm đứng thẳng, hai tay trống trơn, lần đầu tiên trong đêm không ôm thứ gì.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Tắt livestream để giữ thể diện cho anh Phát, chị Trâm, và cho chính bạn', next: 'ngoai_khung_hinh' },
        { key: 'B', text: 'Đưa điện thoại cho chị Trâm, để chị tự nói ra', next: (s) => ((s.TC >= 70 && (s.flags.ke_me || s.flags.tra_bong)) ? 'n9_tram' : 'n9_tram_im'), hint: 'Cần Tin cậy ≥ 70 và chị Trâm đã mở lòng' },
        { key: 'C', text: 'Cầm điện thoại, nói rõ trước mọi người: bản vẽ nào đúng, con số nào sai, ai đã ký', next: 'n9_cong_khai' }
      ]
    },

    n9_het_gio: {
      time: '04:34',
      title: 'Nhiễu',
      text: [
        'Bạn chần chừ quá lâu. Màn hình livestream nhiễu sọc, số người xem nhảy lung tung, bình luận biến thành những dãy ký tự vô nghĩa.',
        'Đèn pin tối thêm một nấc. Bạn giật lấy điện thoại, giọng khàn đặc.'
      ],
      effects: { TT: -10, PIN: -1 },
      choices: [{ text: 'Nói', next: 'n9_cong_khai' }]
    },

    n9_cong_khai: {
      time: '04:36',
      title: 'Trước mọi người',
      text: (s) => {
        const t = ['Bạn nhìn thẳng vào ống kính và nói chậm, rõ từng con số. Chuồng cọp đã tháo năm 2016. Con số 9,6 m² được ký khống. Bản thiết kế 1979 bị tải lên lúc 22:05 từ tablet KĐ-02.'];
        if (s.flags.nhan_phan_chia) t.push('Rồi bạn nói cả phần của mình: bạn đã bấm “Giữ nguyên”, đã nhận tiền ứng trước. Bạn chuyển trả lại ngay trước ống kính. Tay bạn run đến mức bấm sai mã OTP hai lần.');
        if (s.flags.hua_phat) t.push('Bạn giữ lời hứa: bạn kể về đứa con gái lớp Sáu, về học phí, về hai mươi năm anh Phát làm ở phường. Anh Phát đứng cạnh, gật đầu với ống kính.');
        t.push(
          'Bình luận chậm lại. Rồi một dòng: “Cảm ơn chị đã nói thật.” Rồi hàng trăm dòng giống thế.',
          'Cánh cửa 509 ở cuối hành lang rung lên như một tấm phông bị gió thổi.'
        );
        return t;
      },
      effects: { DN: -20, TC: -10 },
      flags: { cong_khai: true },
      choices: [{ text: 'Tiếp tục', next: 'ket_man3' }]
    },

    n9_tram: {
      time: '04:36',
      title: 'Lời tự thú',
      text: [
        'Chị Trâm cầm điện thoại, hít một hơi thật sâu. “Tôi là cán bộ hội đồng bồi thường. Tôi đã soạn một phương án có con số sai. Tôi biết nó sai. Tôi làm vậy vì mẹ tôi đang ở một phòng trọ mười hai mét vuông.”',
        'Chị kể về con búp bê, về chiếc chuồng cọp, về những đêm Tết ngồi xem pháo hoa. Chị không khóc. Người xem khóc thay chị.',
        'Bình luận không còn hỏi “Ai ký?” nữa. Chúng hỏi: “Mẹ chị ở đâu? Em giúp được không?”',
        'Cánh cửa 509 ở cuối hành lang mỏng dần, như một lời nói dối không còn ai tin.'
      ],
      effects: { DN: -25, TC: 10 },
      flags: { tram_tu_thu: true },
      gain: { clues: ['(Hiếm) Chị Trâm tự thú trên livestream. Người xem quay sang hỏi cách giúp mẹ chị.'] },
      choices: [{ text: 'Tiếp tục', next: 'ket_man3' }]
    },

    n9_tram_im: {
      time: '04:37',
      title: 'Không nói được',
      text: [
        'Chị Trâm cầm điện thoại, môi mấp máy, nhưng không ra tiếng. Mười mấy nghìn ánh mắt đè lên chị như một bức tường.',
        '“Tôi… không làm được,” chị thì thào, rồi trả điện thoại cho bạn.',
        'Bạn nói thay chị, từng con số một. Phải nói hai lần mới đủ, vì lần đầu giọng bạn vỡ.'
      ],
      effects: { DN: -15, TT: -5, TC: -5 },
      flags: { cong_khai: true },
      choices: [{ text: 'Tiếp tục', next: 'ket_man3' }]
    },

    /* ===== KẾT MÀN 3 ===== */
    ket_man3: {
      time: '04:40',
      title: 'Phần không có trong hồ sơ',
      text: (s) => {
        const t = ['Bạn bước lên một bước để nhìn rõ cánh cửa 509. Rồi một bước nữa. Khi bạn quay lại, cả nhóm đã ở rất xa phía sau, nhỏ như những con số trên bản vẽ.'];
        if (s.flags.ban_ve_thiet_ke) t.push('Tablet báo: “Tổng diện tích sàn: 1.871,4 m². Căn 509: hợp lệ, chưa có chủ hộ.” Đúng con số bạn sẽ thấy lúc 5 giờ.');
        else t.push('Tablet báo: “Tổng diện tích sàn: 1.852,2 m².” Căn 509 đã mỏng như tờ giấy can, nhưng vẫn còn dư 9,6 m², và bạn hiểu ra đó là gì: chính đoạn hành lang bạn đang đứng. Nó đang dài ra.');
        t.push(
          'Phía xa, Út Thơ giơ điện thoại về phía bạn. Trên màn hình livestream, hành lang trống trơn. Một dòng bình luận trôi qua: “Chị áo xanh đâu rồi?”',
          'Bạn không xuất hiện trong khung hình nào, vì bạn đang đứng ở phần diện tích không có trong bất kỳ hồ sơ nào.'
        );
        if (s.flags.goi_me) t.push('Bạn nhớ lời mẹ: xong việc thì về luôn, đừng nán lại. Bạn chưa xong việc.');
        t.push('Hai mươi phút nữa, tablet sẽ rung lần thứ ba.');
        return t;
      },
      choices: [{ text: 'Kết thúc Màn 3', next: 'het_man3' }]
    },

    het_man3: {
      type: 'actend',
      title: 'Hết Màn 3 · Căn 509',
      time: '04:40',
      next: 'Màn 4 · Chốt sổ',
      teaser: '05:00. Tablet rung lần thứ ba. Lần này bạn biết mình đang đứng ở đâu, và bạn có hai mươi phút để quyết định con số cuối cùng của nhà B4, kể cả phần của chính bạn.',
      endOf: (s) => (s.flags.ban_ve_thiet_ke ? 'ket3_thiet_ke' : s.flags.tram_tu_thu ? 'ket3_tu_thu' : 'ket3_cong_khai')
    },

    /* ===== KẾT THÚC THẤT BẠI MỚI ===== */
    can_ho_mau: {
      type: 'ending',
      title: 'Căn hộ mẫu',
      text: [
        'Ba bước. Sàn ấm, đèn vàng, mùi cơm mới. Út Thơ đưa cho bạn một cái bát. Bạn ngồi xuống chiếc ghế có vắt áo xanh, và nó vừa khít.',
        'Một năm sau, nhà mẫu của tòa tái định cư 30 tầng mở cửa đón khách. Ở góc trưng bày “Căn hộ hoài cổ, phong cách tập thể 9,6 m²” có hai ma-nơ-canh ngồi bên mâm cơm, một mặc áo khoác xanh.',
        'Khách tham quan khen người làm mô hình khéo tay quá, trông cứ như người thật.'
      ]
    },

    sai_so: {
      type: 'ending',
      title: 'Sai số',
      text: [
        'Phần mềm nhận số đo của bạn làm chuẩn: mới nhất, chính xác nhất, có chữ ký số. Nhà B4 được chốt sổ theo đúng từng milimét bạn đo đêm nay, kể cả 9,6 m² không thuộc về đâu.',
        'Tòa tái định cư 30 tầng được thiết kế lại từ bộ số liệu ấy. Tầng nào cũng có một khoảng 9,6 m² không cửa, không lối vào, không ai mua được.',
        'Trên bản vẽ, khoảng trống ấy được đánh dấu bằng mã khảo sát của bạn. Kỹ sư đời sau gọi nó là “sai số đêm cuối”.'
      ]
    },

    ngoai_khung_hinh: {
      type: 'ending',
      title: 'Ngoài khung hình',
      text: [
        'Màn hình tắt. Không còn ai nhìn. Anh Phát thở phào, chị Trâm cúi đầu cảm ơn bạn. Hành lang thôi dài ra.',
        'Nhưng khi mọi người quay lưng đi xuống cầu thang, không ai gọi bạn theo. Không ai nhớ ra là thiếu một người.',
        'Lúc 5 giờ, Út Thơ mở lại livestream để chào khán giả. Khung hình là một hành lang trống. Dòng bình luận cuối cùng: “Chị áo xanh đâu rồi?”'
      ]
    }
  });

  STORY.scenes.n7C.effects = { TT: -10, TC: 15, DN: -10 };

  /* ---------- Nối Màn 2 sang Màn 3 ---------- */
  STORY.scenes.het_man2.nextScene = 'm3_mo';

  /* ---------- Bộ sưu tập kết thúc Màn 3 ---------- */
  STORY.endingsList.push(
    { id: 'ket3_tu_thu', title: 'Kết Màn 3: Lời tự thú', kind: 'act', act: 3, hint: 'Để một người tự nói ra sự thật của mình, khi họ đã đủ tin bạn.' },
    { id: 'ket3_cong_khai', title: 'Kết Màn 3: Trước mọi người', kind: 'act', act: 3, hint: 'Nói rõ con số trước những người đang nhìn.' },
    { id: 'ket3_thiet_ke', title: 'Kết Màn 3: Bản vẽ trên giấy', kind: 'act', act: 3, hint: 'Chọn bản vẽ để không ai phải giải trình.' },
    { id: 'can_ho_mau', title: 'Căn hộ mẫu', kind: 'fail', act: 3, hint: 'Ba bước vào một căn phòng quá ấm cúng.' },
    { id: 'sai_so', title: 'Sai số', kind: 'fail', act: 3, hint: 'Tin số đo của chính mình hơn mọi bản vẽ.' },
    { id: 'ngoai_khung_hinh', title: 'Ngoài khung hình', kind: 'fail', act: 3, hint: 'Tắt đi những con mắt đang nhìn.' }
  );

  /* ---------- Dàn dựng 3D + âm thanh ---------- */
  const TAB_LOG = [{ t: 'Bản vẽ đối chiếu', s: 46, wt: 600, c: '#9fc3ff' }, { t: 'Thiết kế 1979', s: 96, c: '#ffffff' }, { t: 'Tải lên 22:05 · KĐ-02', s: 46, wt: 700, c: '#ffd27a', mono: true }];
  Object.assign(STORY.staging, {
    m3_mo:       { view: 'corridor5', cast: ['phat', 'tram', 'kha'], fx: (s) => ['door509', 'tablet'].concat(s.flags.nhan_phan_chia ? ['chalk509'] : ['door509thin']), sfx: ['loa_click', 'heart'], tablet: TAB_LOG },
    nut7:        { view: 'room509', cast: ['tho'], fx: ['assemble', 'alarm'], sfx: ['door', 'tick'] },
    n7_het_gio:  { view: 'room509', cast: ['tho'], fx: ['assemble', 'shake'], sfx: ['thud'] },
    n7B_ok:      { view: 'room509', cast: ['tho'], fx: ['ghostlines'] },
    n7B_nua:     { view: 'room509', cast: [], fx: ['phoneleft'], sfx: ['door'] },
    n7C:         { view: 'room509', cast: ['tho', 'tram'], fx: ['dissolve'], sfx: ['scrape_far'] },
    giua_78:     { view: 'stair', cast: ['phat'], fx: [] },
    giua_78_hua: { view: 'stair', cast: ['phat'], fx: [] },
    giua_78_im:  { view: 'stair', cast: ['phat'], fx: [] },
    nut8:        { view: 'corridor5', cast: ['kha', 'tram', 'phat'], fx: ['door509', 'tablet'], tablet: TAB_LOG },
    p8:          { view: 'corridor5', cast: ['kha', 'tram', 'phat'], fx: ['door509'] },
    n8_ok:       { view: 'corridor5', cast: ['kha', 'tram', 'phat'], fx: ['door509', 'door509thin', 'tablet'], tablet: [{ t: 'Đối chiếu theo hoàn công', s: 46, wt: 600, c: '#9fc3ff' }, { t: 'Căn 509', s: 100, c: '#ffffff' }, { t: 'Không tồn tại', s: 56, wt: 700, c: '#8fe0a8' }] },
    n8_thiet_ke: { view: 'corridor5', cast: ['kha', 'tram', 'phat'], fx: ['door509', 'chalk509', 'redlight'], sfx: ['scrape_far'] },
    nut9:        { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['door509', 'long', 'alarm'], sfx: ['heart'] },
    n9_het_gio:  { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['door509', 'long', 'shake', 'redlight'], sfx: ['sting'] },
    n9_cong_khai:{ view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['door509', 'door509thin', 'long'] },
    n9_tram:     { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['door509', 'door509thin'] },
    n9_tram_im:  { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['door509', 'door509thin', 'long'] },
    ket_man3:    { view: 'corridor5', cast: [], fx: (s) => ['door509', 'longer', 'tablet'].concat(s.flags.ban_ve_thiet_ke ? ['chalk509'] : ['door509thin']), sfx: ['heart'],
                   tablet: (s) => s.flags.ban_ve_thiet_ke
                     ? [{ t: 'Tổng diện tích sàn', s: 46, wt: 600, c: '#9fc3ff' }, { t: '1.871,4 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Căn 509: hợp lệ', s: 50, wt: 700, c: '#ff7a6a' }]
                     : [{ t: 'Tổng diện tích sàn', s: 46, wt: 600, c: '#9fc3ff' }, { t: '1.852,2 m²', s: 120, c: '#ffffff', mono: true }, { t: '9,6 m² chưa rõ: hành lang', s: 46, wt: 700, c: '#ffd27a' }] },
    het_man3:    { view: 'exterior', cast: [], fx: ['dawn'] }
  });
})();
