/* =========================================================
   KIỂM ĐẾM CA ĐÊM – NHÀ B4
   Dữ liệu truyện MÀN 2: "CƠI NỚI" (02:35 – 04:00)
   Gộp vào STORY của Màn 1 (không ghi đè).
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Luật mới ---------- */
  Object.assign(STORY.rules, {
    L9: { text: 'Cái gì không có trong sổ thì đừng đặt chân lên.', sources: ['501', '503'] },
    L10: { text: 'Muốn nhà cho đi thì phải kể cho nhà nghe.', sources: ['301'], note: 'Phiếu thứ 40, ông Kha tự tay viết.' }
  });

  /* ---------- Mini-game lưới: sàn chuồng cọp ----------
     9 cột x 6 hàng, mỗi ô 0,4 m x 0,5 m. Hồ sơ 2016 công nhận 3,2 m x 3,0 m (8 cột),
     TRỪ khối 2x2 chỗ bồn nước cũ (cột 3–4, hàng 2–3). Cột 8 nằm ngoài hồ sơ.
     Ô ngoài hồ sơ là khoảng không. Búp bê ở cột 7, hàng 5. */
  const COLS = 9, ROWS = 6, CW = 52, CH = 46, X0 = 90, Y0 = 70;
  const inRecord = (c, r) => c <= 7 && !(c >= 3 && c <= 4 && r >= 2 && r <= 3);
  const cellXY = (c, r) => [X0 + c * CW, Y0 + (ROWS - 1 - r) * CH];
  const center = (c, r) => { const [x, y] = cellXY(c, r); return [x + CW / 2, y + CH / 2]; };
  const PATHS = {
    1: [[0, 0], [1, 1], [2, 2], [3, 2], [4, 3], [5, 4], [6, 4], [7, 5]],
    2: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 1], [8, 2], [8, 3], [8, 4], [7, 5]],
    3: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5]]
  };
  const PATH_COLOR = { 1: '#ff9b6a', 2: '#9fe0ff', 3: '#d6a8ff' };
  let cells = '', inspect = {};
  for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) {
    const [x, y] = cellXY(c, r), id = 'c' + c + '_' + r;
    cells += `<rect class="hit" data-id="${id}" x="${x}" y="${y}" width="${CW - 2}" height="${CH - 2}" fill="#123a5e" stroke="#3d7ab0"/>`;
    inspect[id] = `Ô cột ${c + 1}, hàng ${r + 1} · Laser: ` + (inRecord(c, r) ? 'có phản xạ, mặt sàn sắt 0,0 cm.' : 'không phản xạ. Phía dưới là khoảng không cao năm tầng.');
  }
  inspect.ho_so = 'Hồ sơ cơi nới 2016 (A. Phát xác nhận): 3,2 m × 3,0 m tính từ mép cửa sổ, trừ khoảng 0,8 m × 1,0 m chỗ bồn nước cũ ở giữa. Tổng 9,6 m².';
  const pathSvg = Object.keys(PATHS).map((k) => {
    const pts = PATHS[k].map(([c, r]) => center(c, r).map((v, i) => v + (k - 2) * 4 * (i === 0 ? 1 : -1)).join(',')).join(' ');
    const [lx, ly] = center(...PATHS[k][Math.floor(PATHS[k].length / 2)]);
    return `<polyline points="${pts}" fill="none" stroke="${PATH_COLOR[k]}" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round" pointer-events="none"/>
      <circle cx="${lx + (k - 2) * 4}" cy="${ly}" r="11" fill="#0b2a4a" stroke="${PATH_COLOR[k]}" stroke-width="2" pointer-events="none"/>
      <text x="${lx + (k - 2) * 4}" y="${ly + 5}" text-anchor="middle" fill="${PATH_COLOR[k]}" font-family="Roboto Mono, monospace" font-size="14" font-weight="700" pointer-events="none">${k}</text>`;
  }).join('');
  const [dx, dy] = center(7, 5);
  const SVG_P4 = `
<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sàn chuồng cọp căn 502">
<defs><pattern id="g4" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#1d4f7c" stroke-width="0.6"/></pattern></defs>
<rect width="100%" height="100%" fill="#0b2a4a"/><rect width="100%" height="100%" fill="url(#g4)"/>
<text x="20" y="28" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="14">Chuồng cọp ngoài cửa sổ căn 502 · Mặt bằng sàn · ô 0,4 × 0,5 m</text>
<rect class="hit" data-id="ho_so" x="${X0}" y="${Y0 + ROWS * CH + 8}" width="${8 * CW - 2}" height="18" fill="#16426b" stroke="#ffd27a"/>
<text x="${X0 + 6}" y="${Y0 + ROWS * CH + 21}" fill="#ffd27a" font-family="Roboto Mono, monospace" font-size="11" pointer-events="none">bấm để đọc hồ sơ cơi nới 2016</text>
${cells}
<rect x="${X0 - 70}" y="${Y0 + (ROWS - 1) * CH}" width="64" height="${CH - 2}" fill="#0e2f50" stroke="#9cc9ff"/>
<text x="${X0 - 64}" y="${Y0 + (ROWS - 1) * CH + 27}" fill="#cfe4ff" font-family="Roboto Mono, monospace" font-size="11">cửa sổ</text>
${pathSvg}
<circle cx="${dx}" cy="${dy}" r="9" fill="#ff7a7a" pointer-events="none"/>
<text x="${dx + 14}" y="${dy - 12}" fill="#ff9b9b" font-family="Roboto Mono, monospace" font-size="12" pointer-events="none">búp bê</text>
<text x="${X0 + 8 * CW + 6}" y="${Y0 - 8}" fill="#7fa7cf" font-family="Roboto Mono, monospace" font-size="11">cột 9</text>
</svg>`;

  /* ---------- Cảnh Màn 2 ---------- */
  Object.assign(STORY.scenes, {

    m2_mo: {
      act: 'Màn 2 · Cơi nới',
      time: '02:35',
      title: 'Tầng 5',
      text: (s) => {
        const t = [
          'Cầu thang lên tầng 5 có mười một bậc chứ không phải mười. Bạn đo lại, vẫn là mười một.',
          'Hành lang tầng 5 có tám cánh cửa, đúng như bản vẽ. Nhưng qua ô cửa sổ cuối hành lang, bạn thấy ngoài căn 502 có một chuồng cọp sắt hoen gỉ bám vào tường, như một chiếc lồng chim khổng lồ. Theo biên bản, nó đã bị tháo từ năm 2016.',
          'Tablet hiện hồ sơ căn 502: diện tích sử dụng hợp pháp 31,2 m², cộng phần cơi nới được công nhận năm 2016 là 9,6 m². Người xác nhận: Đoàn Vĩnh Phát.'
        ];
        if (s.flags.phat_thu_nhan || s.flags.l7_cua_phat) t.push('Không ai quay sang nhìn anh Phát. Anh cũng không ngẩng lên.');
        else t.push('Anh Phát nhìn màn hình rồi quay mặt đi, giả vờ chỉnh lại quai mũ bảo hộ.');
        if (s.flags.phat_neo_nang && !s.flags.phat_thu_nhan) t.push('Tiếng tích tắc trong túi áo anh nhanh hơn lúc nãy.');
        t.push(
          'Út Thơ chĩa camera ra cửa sổ: “Trong cái lồng sắt có… một con búp bê.”',
          'Chị Trâm nói rất khẽ: “Đó là của tôi. Hồi bé tôi hay ngồi trong cái chuồng cọp ấy xem pháo hoa Tết. Mẹ tôi bảo nó là phần nhà đẹp nhất.”'
        );
        if (s.flags.tho_da_nhan_loi) t.push('Út Thơ đi chậm dần, cứ ngoái về phía cầu thang xuống tầng 4. Bạn gọi đến lần thứ hai em mới quay lại.');
        t.push('Kẹp trong xấp phiếu, phiếu căn 501 và 503 có cùng một lời dặn.');
        return t;
      },
      gain: { rules: ['L9'], clues: ['Hồ sơ 502: cơi nới 9,6 m² được anh Phát xác nhận năm 2016, dù chuồng cọp đã tháo cùng năm.'] },
      choices: [{ text: 'Vào căn 502', next: 'nut4' }]
    },

    /* ===== NÚT 4 ===== */
    nut4: {
      time: '02:40',
      title: 'Nút 4 · Chuồng cọp',
      checkpoint: true,
      danger: true,
      timer: { sec: 20, next: 'n4_het_gio', label: 'Giờ dọn nhà lần hai' },
      text: (s) => {
        const t = [
          'Loa phường khục lên: “Đề nghị các hộ chuẩn bị. Giờ dọn nhà lần hai sắp bắt đầu.”',
          'Cửa sổ căn 502 mở toang. Chiếc chuồng cọp kêu cót két trong gió như đang thở. Con búp bê vải ngồi ở góc xa nhất, váy đỏ bạc màu.',
          'Chị Trâm đã đứng sát bậu cửa, một chân nhấc lên. “Để tôi. Đồ của tôi thì tôi lấy.”'
        ];
        if (s.flags.tho_live) t.push('Trên livestream, người xem gõ liên tục: “Đừng bước ra!!!”, “Sàn đó có thật không vậy?”');
        return t;
      },
      choices: [
        { key: 'A', text: 'Để chị Trâm tự ra lấy: đồ của ai người nấy nhận, đúng luật L1 và L2', next: 'n4_tram' },
        { key: 'B', text: 'Mở hồ sơ cơi nới 2016, quét laser từng ô sàn trước khi bước', next: 'p4' },
        { key: 'C', text: 'Buộc dây đo vào khung cửa, tự trèo ra lấy cho nhanh, không để chị Trâm mạo hiểm', next: 'ban_cong_lo_lung' }
      ]
    },

    n4_het_gio: {
      time: '02:41',
      title: 'Lần hai',
      text: [
        'Bạn chưa kịp quyết thì nhạc hiệu đã vang lên. Cả căn 502 xô dạt, đồ đạc ồ ạt dồn về phía cửa sổ như nước rút qua cống. Cả nhóm bị đẩy bật ra hành lang.',
        'Khi mọi thứ lặng đi, chị Trâm đã trèo qua bậu cửa từ lúc nào.'
      ],
      effects: { TT: -15, DN: 10 },
      choices: [{ text: 'Chạy lại cửa sổ', next: 'n4_tram' }]
    },

    p4: {
      time: '02:42',
      title: 'Sàn chuồng cọp',
      type: 'puzzle',
      danger: true,
      timer: { sec: 40, next: 'n4_sai', label: 'Giờ dọn nhà lần hai' },
      text: ['Bấm vào ô hồ sơ để đọc số liệu năm 2016, bấm từng ô sàn để quét laser. Rồi chọn một lối đi tới con búp bê.'],
      svg: SVG_P4,
      inspect,
      answers: [
        { text: 'Đi theo lối 1 (cam): đường chéo ngắn nhất', next: 'n4_sai' },
        { text: 'Đi theo lối 2 (xanh): men theo mép ngoài', next: 'n4_sai' },
        { text: 'Đi theo lối 3 (tím): men theo tường rồi theo hàng trên cùng', next: 'n4_ok' }
      ]
    },

    n4_ok: {
      time: '02:45',
      title: 'Theo hồ sơ',
      text: [
        'Bạn bước đúng từng ô đã quét. Dưới đế giày, mặt sàn sắt rung lên nhưng vẫn đỡ được bạn. Ngay sát bên, những ô ngoài hồ sơ trông y hệt, nhưng gió lùa qua chúng như qua không khí.',
        'Bạn ôm được con búp bê. Trong túi váy nó có một tờ giấy gấp tư: “Biên bản tháo dỡ công trình cơi nới căn 502, ngày 14/3/2016. Diện tích tháo dỡ: 9,6 m². Người lập: Đoàn Vĩnh Phát.”',
        'Chuồng cọp đã bị tháo, chính anh Phát lập biên bản. Vậy mà cùng năm ấy, cũng chính anh ký công nhận nó là diện tích hợp pháp.',
        'Ai đã nhét tờ biên bản này vào búp bê?'
      ],
      effects: { TT: -10, DN: 10 },
      flags: { co_bien_ban: true },
      gain: { clues: ['Quy luật ẩn: tòa nhà thành hình theo hồ sơ. Sàn chỉ có thật ở phần đã được ký công nhận.', 'Biên bản tháo dỡ chuồng cọp 502 (14/3/2016, anh Phát lập) giấu trong túi váy búp bê.'] },
      choices: [{ text: 'Trèo vào trong', next: 'giua_45' }]
    },

    n4_sai: {
      time: '02:45',
      title: 'Hụt chân',
      text: [
        'Bước thứ năm, chân bạn sụt vào khoảng không. Bạn chỉ kịp vồ lấy một thanh sắt. Phía dưới là năm tầng gió lạnh.',
        'Út Thơ hét lên, chĩa camera xuống: “Chỗ có vệt mờ là có sàn! Chị bước sang trái!” Bạn lần theo vệt mờ trên màn hình em, từng ô một, rồi tới được góc lồng.',
        'Trong túi váy con búp bê có một tờ giấy gấp tư: biên bản tháo dỡ chuồng cọp căn 502, ngày 14/3/2016, người lập là Đoàn Vĩnh Phát.'
      ],
      effects: { TT: -20, DN: 10, TC: 5 },
      flags: { co_bien_ban: true },
      gain: { clues: ['Quy luật ẩn: tòa nhà thành hình theo hồ sơ. Sàn chỉ có thật ở phần đã được ký công nhận.', 'Biên bản tháo dỡ chuồng cọp 502 (14/3/2016, anh Phát lập) giấu trong túi váy búp bê.'] },
      choices: [{ text: 'Trèo vào trong', next: 'giua_45' }]
    },

    n4_tram: {
      time: '02:44',
      title: 'Vòng sắt',
      text: [
        'Chị Trâm bước ra, bước chân rất chắc, như người đã đi trên sàn ấy hàng nghìn lần. Chị nhặt con búp bê lên.',
        'Đúng lúc ấy, lan can sắt kêu rít, uốn cong lại thành nửa vòng tròn quanh chị. Bạn và Út Thơ túm được tay chị kéo vào. Một đoạn sắt gỉ đã quấn chặt quanh cổ tay chị như một chiếc vòng, không tháo ra được.',
        'Chị ôm con búp bê vào ngực. Bạn thấy chị lén rút từ túi váy nó ra một tờ giấy gấp tư rồi nhét vội vào túi áo mình. Bạn chỉ kịp đọc mấy chữ in đậm: “Biên bản tháo dỡ… 2016”.'
      ],
      effects: { TT: -10, TC: 10 },
      flags: { tram_vong_sat: true },
      gain: { clues: ['(Hiếm) Chị Trâm giấu một tờ “biên bản tháo dỡ… 2016” lấy từ búp bê. Cổ tay chị bị vòng sắt chuồng cọp quấn chặt.'] },
      choices: [{ text: 'Rời căn 502', next: 'giua_45' }]
    },

    /* ===== 03:00 – khoảnh khắc với chị Trâm ===== */
    giua_45: {
      time: '03:00',
      title: 'Con búp bê tên Bông',
      text: (s) => {
        const t = [
          'Cả nhóm ngồi nghỉ ở chiếu nghỉ tầng 5. Chị Trâm vuốt lại mái tóc len của con búp bê. “Nó tên là Bông. Năm 1998 nhà tôi chuyển đi, tôi cố ý để nó lại. Tôi nghĩ để nó ở lại thì nhà sẽ nhớ tôi, và tôi sẽ được quay về.”',
          '“Giờ mẹ tôi đang ở trọ. Phòng mười hai mét vuông, mùa nồm tường chảy nước.” Chị nhìn bạn. “Em có mẹ không?”'
        ];
        if (s.flags.tram_vong_sat) t.push('Vòng sắt trên cổ tay chị khẽ kêu lách cách mỗi khi chị cử động, như chiếc vòng bạc của trẻ con.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Kể với chị về mẹ đang nằm viện, thứ Tư mổ nếu đủ tiền', next: 'giua_45_ke' },
        { key: 'B', text: 'Lảng đi: “Mình làm tiếp thôi chị, còn hai tiếng nữa.”', next: 'giua_45_lang' }
      ]
    },

    giua_45_ke: {
      time: '03:04',
      title: 'Hai người mẹ',
      text: [
        'Chị Trâm nghe hết, không ngắt lời. Rồi chị nắm tay bạn, lòng bàn tay lạnh ngắt. “Vậy em hiểu chị.”',
        'Câu nói ấy nghe ấm áp. Nhưng sau này nghĩ lại, bạn mới thấy nó giống một lời mời hơn.'
      ],
      effects: { TC: 5 },
      flags: { ke_me: true },
      choices: [{ text: 'Tiếp tục', next: 'nut5' }]
    },

    giua_45_lang: {
      time: '03:02',
      title: 'Còn hai tiếng',
      text: [
        'Chị Trâm gật đầu, mắt vẫn nhìn con búp bê. “Ừ. Còn hai tiếng.”',
        'Bạn đứng dậy trước. Đầu óc bạn tỉnh hơn khi không phải nghĩ đến mẹ.'
      ],
      effects: { TT: 5 },
      choices: [{ text: 'Tiếp tục', next: 'nut5' }]
    },

    /* ===== NÚT 5 (nút chậm, không có đồng hồ) ===== */
    nut5: {
      time: '03:15',
      title: 'Nút 5 · Biên bản điện tử',
      checkpoint: true,
      text: (s) => {
        const t = ['Phần mềm yêu cầu xác nhận lại hồ sơ căn 502 trước 5 giờ. Trên màn hình, một ô nhấp nháy: “Diện tích cơi nới được công nhận: 9,6 m². Giữ nguyên hay điều chỉnh?”'];
        if (s.flags.phat_thu_nhan || s.flags.l7_cua_phat) {
          t.push('Anh Phát kéo bạn ra cầu thang, giọng khản đặc: “Anh biết em có bằng chứng về anh rồi. Anh xin em. Năm 2016 anh ký sai, giờ sửa thì anh mất việc, có khi còn bị khởi tố. Con bé nhà anh mới lớp Sáu…”');
        } else {
          t.push('Anh Phát kéo bạn ra cầu thang, giọng đều đều như bàn chuyện cơm nước: “Giữ nguyên đi em. Năm 2016 anh ký sai, giờ sửa thì anh mất việc, có khi còn bị khởi tố.”');
        }
        t.push('“Giữ nguyên thì nhà chị Trâm được thêm 19,2 m², tức 9,6 nhân hệ số K bằng 2. Phần chênh lệch anh chia em ba mươi phần trăm. Đủ cho mẹ em mổ thứ Tư.”');
        if (s.flags.ke_me) t.push('Bạn chưa từng kể chuyện mẹ với anh Phát. Bạn quay lại nhìn chị Trâm. Chị không tránh ánh mắt bạn.');
        t.push('Chị Trâm nói, giọng đều như đọc công văn: “Bản phương án bồi thường năm nay là tôi soạn. Tôi biết con số đó sai. Mẹ tôi đang ở trọ, em ạ.”');
        if (s.flags.tho_live) t.push('Út Thơ đứng ở cuối hành lang, điện thoại vẫn giơ cao. Mười hai nghìn người đang xem. Em quay camera đi chỗ khác, nhưng micro vẫn bật.');
        if (!s.flags.co_bien_ban) t.push('Bạn không có tờ biên bản tháo dỡ. Tờ giấy đang nằm trong túi áo chị Trâm.');
        return t;
      },
      choices: [
        { key: 'A', text: 'Xóa trắng bản ghi căn 502, để không ai phải chịu trách nhiệm', next: 'khong_co_trong_ho_so' },
        { key: 'B', text: 'Giữ nguyên số liệu và nhận phần chia: thứ Tư mẹ được mổ', next: 'n5_giu' },
        { key: 'C', text: 'Ghi đúng sự thật: cơi nới bằng 0, đính kèm ảnh hiện trạng và biên bản tháo dỡ', next: 'n5_that' }
      ]
    },

    n5_giu: {
      time: '03:20',
      title: 'Giữ nguyên',
      text: [
        'Bạn bấm “Giữ nguyên”. Màn hình hiện dấu tích xanh, nhẹ tênh như bấm thích một bài đăng.',
        'Anh Phát thở phào, vỗ vai bạn. Chị Trâm nhắm mắt lại. Ngoài cửa sổ, chiếc chuồng cọp kêu cót két rồi lặng im, như vừa được ai đó ký nhận.',
        'Điện thoại rung. Một số lạ chuyển khoản trước một phần. Ngay sau đó là tin nhắn của mẹ, chắc mẹ thức giấc vì tiếng báo: “Con chuyển tiền cho mẹ à? Con đừng làm gì quá sức nhé.”',
        'Cuối hành lang tầng 5, ngay sau căn 508, có một cánh cửa mà lúc nãy chưa có. Biển số còn mới tinh: 509.'
      ],
      effects: { DN: 25, TC: 10 },
      flags: { nhan_phan_chia: true },
      gain: { clues: ['(Hiếm) Sau khi giữ nguyên con số khống, cuối hành lang tầng 5 mọc thêm cửa căn 509.'] },
      choices: [{ text: 'Tiếp tục', next: 'giua_56' }]
    },

    n5_that: {
      time: '03:22',
      title: 'Điều chỉnh',
      text: (s) => {
        const t = [];
        if (s.flags.co_bien_ban) t.push('Bạn chụp tờ biên bản tháo dỡ, đính kèm cùng ảnh hiện trạng bức tường không còn dấu bu-lông. Ô số liệu: 0,0 m². Lý do: công trình cơi nới đã tháo dỡ ngày 14/3/2016.');
        else t.push('Bạn chỉ có ảnh hiện trạng. Chị Trâm nhìn bạn rất lâu, rồi chậm rãi rút từ túi áo ra tờ biên bản đã giấu, đặt vào tay bạn. Vòng sắt trên cổ tay chị kêu lách cách. Ô số liệu: 0,0 m².');
        t.push(
          'Bạn bấm “Điều chỉnh”. Ngoài cửa sổ, chiếc chuồng cọp rụng xuống như một lớp vỏ khô, tan vào bóng tối trước khi chạm đất.',
          'Anh Phát ngồi sụp xuống bậc thang, hai tay ôm đầu. Chị Trâm nhìn ra khoảng trống ngoài cửa sổ, nơi từng là phần nhà đẹp nhất. “Cảm ơn em,” chị nói, và bạn không biết chị có thật lòng hay không.',
          'Lần đầu tiên trong đêm, bạn thấy người nhẹ đi, như vừa trả lại một thứ không phải của mình.'
        );
        if (s.flags.tram_vong_sat) t.push('Vòng sắt trên cổ tay chị Trâm lỏng ra, rơi xuống sàn, vỡ vụn như gỉ.');
        return t;
      },
      effects: { DN: -15, TC: -10, TT: 5 },
      flags: { ghi_su_that: true },
      gain: { clues: ['Ghi trung thực làm tòa nhà buông ra: chuồng cọp ma biến mất, Độ neo giảm.'] },
      choices: [{ text: 'Tiếp tục', next: 'giua_56' }]
    },

    /* ===== 03:35 – khoảnh khắc với Út Thơ ===== */
    giua_56: {
      time: '03:35',
      title: 'Bình luận',
      text: (s) => {
        const t = ['Út Thơ ngồi xuống cạnh bạn, đưa điện thoại ra. “Chị coi nè. Từ lúc nãy ai cũng hỏi một câu.”'];
        t.push(s.flags.tho_live
          ? 'Livestream đang có hơn mười hai nghìn người xem. Dòng bình luận trôi nhanh tới mức không đọc kịp, nhưng câu nào cũng giống nhau: “Căn 509 là căn nào vậy?”'
          : 'Em đã tắt live từ đầu tối, nhưng tin nhắn chờ vẫn nhảy liên tục từ những tài khoản lạ: “Căn 509 là căn nào vậy?”');
        t.push('“Em nghỉ học kỳ này rồi chị ạ. Không đủ tiền đóng. Live cho vui thôi, chứ em sợ lắm.” Em cười, mắt đỏ hoe. “Xong đêm nay chị cho em đi ăn phở nha.”');
        if (s.flags.tho_da_nhan_loi) t.push('Nói xong, em quay sang bức tường trống và khẽ đáp “dạ”, như có ai vừa gọi.');
        t.push('Tablet báo: “Căn 301 chưa có biên bản kiểm đếm. Còn 70 phút.”');
        return t;
      },
      choices: [{ text: 'Xuống căn 301', next: 'nut6' }]
    },

    /* ===== NÚT 6 ===== */
    nut6: {
      time: '03:50',
      title: 'Nút 6 · Hộ cuối cùng',
      checkpoint: true,
      danger: true,
      timer: { sec: 25, next: 'n6_het_gio', label: 'Vòng đồ đạc đang khép' },
      text: (s) => {
        const t = [
          'Căn 301 của ông Kha. Bốn mươi chiếc chìa khóa treo kín một tấm ván trên tường, mỗi chiếc một móc, như quầy lễ tân của một nhà nghỉ đã đóng cửa. Ông ngồi trên chiếc ghế gỗ giữa phòng.',
          'Loa phát nhạc hiệu giờ dọn nhà. Lần này đồ đạc không trượt về phía các bạn mà xếp lại thành một vòng tròn quanh ông Kha, như che chắn cho ông.',
          '“Ở đây bốn mươi sáu năm,” ông nói. “Nó coi tôi là đồ nhà nó rồi.”',
          'Ông nhìn con búp bê trong tay chị Trâm. “Tờ biên bản trong túi váy con Bông là tôi nhét vào đấy. Năm 2016 tôi nhặt được trong sọt rác của phường. Tôi nghĩ một ngày nào đó sẽ có người cần đến nó.”'
        ];
        if (s.flags.ghi_su_that) t.push('“Cháu đã dùng nó rồi, phải không?” Ông mỉm cười, lần đầu tiên trong đêm.');
        if (s.flags.nhan_phan_chia) t.push('Ông nhìn sang cánh cửa 509 trên bản vẽ tablet của bạn, rồi nhìn bạn, không nói gì.');
        t.push('Tablet nhấp nháy: “Căn 301 chưa có biên bản. Hộ dân chưa ký.”');
        return t;
      },
      choices: [
        { key: 'A', text: 'Lập biên bản kiểm đếm bắt buộc đúng thủ tục: chụp ảnh, không cần ông ký', next: 'n6_thu_tuc' },
        { key: 'B', text: 'Gọi bảo vệ dự án khiêng ông ra ngoài cho an toàn', next: 'nguoi_giu_nha' },
        { key: 'C', text: 'Ngồi xuống cùng ông, kiểm đếm từng món trong căn 301 và đọc to cho ông nghe', next: 'n6_ke' }
      ]
    },

    n6_het_gio: {
      time: '03:52',
      title: 'Vòng khép',
      text: [
        'Vòng đồ đạc khép kín quanh ông Kha: tủ, rương, chiếc quạt bàn, chiếc xe đạp Phượng Hoàng. Không còn khe hở nào.',
        'Phải đợi hết nhạc các bạn mới chen vào được. Đèn pin tối đi một nấc. Đồng hồ trên tablet nhảy sang 03:58. Không còn thời gian để ngồi nói chuyện nữa.'
      ],
      effects: { TT: -10, PIN: -1 },
      choices: [{ text: 'Lập biên bản bắt buộc', next: 'n6_thu_tuc' }]
    },

    n6_thu_tuc: {
      time: '03:55',
      title: 'Ghế gỗ: 01',
      text: [
        'Bạn chụp ảnh căn 301 từ bốn góc, lập biên bản kiểm đếm bắt buộc. Đúng thủ tục, đúng mẫu.',
        'Ứng dụng tự nhận diện vật thể trong ảnh và gắn nhãn: “Ghế gỗ: 01. Tủ: 01. Chìa khóa: 40. Người: 00.”',
        'Ông Kha vẫn ngồi đó, nhưng trong hồ sơ ông đã là đồ đạc. Ông nhìn bạn, không giận, chỉ buồn.'
      ],
      effects: { TC: -10, DN: 5 },
      flags: { kha_thanh_do: true },
      gain: { clues: ['(Hiếm) Trong biên bản bắt buộc, ứng dụng ghi “Người: 00”. Ông Kha bị hồ sơ coi là đồ đạc.'] },
      choices: [{ text: 'Tiếp tục', next: 'ket_man2' }]
    },

    n6_ke: {
      time: '03:58',
      title: 'Kể cho nhà nghe',
      text: (s) => {
        const t = [
          'Bạn ngồi xuống sàn, mở biên bản, đọc to từng món. “Xe đạp Phượng Hoàng: 01.” Ông Kha tiếp lời: “Mua năm tám ba, chở vợ tôi đi đẻ thằng cả.” “Quạt bàn: 01.” “Mùa hè năm chín mươi, cả dãy kéo sang đây nằm.”',
          'Mỗi món được kể xong, vòng đồ đạc lại nới ra một chút, như người nghe chuyện đã yên lòng.',
          'Đến món cuối cùng, ông Kha lấy từ ngăn kéo ra tờ phiếu bàn giao thứ bốn mươi, tờ phiếu của chính ông, rồi tự tay viết vào mục lưu ý. Nét chữ run nhưng rõ.'
        ];
        if (s.flags.goi_me) t.push('Ông đưa tờ phiếu cho bạn, nói nhỏ: “Mẹ cháu dặn gì thì nhớ lấy. Xong việc thì về.”');
        return t;
      },
      effects: { TT: -5, TC: 15, DN: -5 },
      flags: { kha_viet_phieu: true },
      gain: { rules: ['L10'], clues: ['Ông Kha viết phiếu thứ 40 (căn 301). Kể cho nhà nghe thì nhà nới vòng giữ.'] },
      choices: [{ text: 'Tiếp tục', next: 'ket_man2' }]
    },

    /* ===== KẾT MÀN 2 ===== */
    ket_man2: {
      time: '04:00',
      title: 'Hệ số K',
      text: (s) => {
        const t = ['Tablet chạy thử đồng bộ trước giờ chốt.'];
        if (s.flags.nhan_phan_chia) {
          t.push('Tổng diện tích sàn nhà B4: 1.861,8 m². Tăng thêm 19,2 m² so với đầu đêm, đúng bằng 9,6 nhân 2.');
          t.push('Ông Kha bật cười, tiếng cười khô như vữa: “Nó học các anh chị đấy. Ai cũng nhân đôi.”');
        } else {
          t.push('Tổng diện tích sàn nhà B4: 1.852,2 m². Chuồng cọp ma đã biến mất khỏi số liệu, vậy mà vẫn còn dư đúng 9,6 m² không rõ nằm ở đâu.');
          t.push('Ông Kha nhìn lên trần nhà: “Nó vẫn còn thiếu một thứ. Nó đang dọn sẵn một chỗ cho ai đó.”');
        }
        if (s.flags.kha_thanh_do) t.push('Ông nói câu ấy mà không ai trong phòng quay sang nhìn ông, như người ta không quay sang nhìn một chiếc ghế.');
        t.push(s.flags.tho_live
          ? 'Út Thơ giơ điện thoại lên. Số người xem: 12.408. Dòng bình luận cuộn không ngừng: “Căn 509 là căn nào vậy?”'
          : 'Điện thoại Út Thơ tự bật livestream, dù em thề là không chạm vào. Số người xem: 12.408.');
        if (s.flags.goi_me) t.push('Một tin nhắn của mẹ: “Mẹ tỉnh rồi. Con xong chưa?”');
        t.push('Loa phường khục lên: “Còn sáu mươi phút nữa đến giờ chốt sổ.”');
        return t;
      },
      choices: [{ text: 'Kết thúc Màn 2', next: 'het_man2' }]
    },

    het_man2: {
      type: 'actend',
      title: 'Hết Màn 2 · Cơi nới',
      time: '04:00',
      next: 'Màn 3 · Căn 509',
      teaser: 'Mười hai nghìn người đang hỏi về một căn hộ không có trong bản vẽ. Còn sáu mươi phút, và tòa nhà đang dọn sẵn một chỗ cho ai đó.',
      endOf: (s) => (s.flags.nhan_phan_chia ? 'ket2_phan_chia' : (s.flags.ghi_su_that && s.flags.kha_viet_phieu) ? 'ket2_ban_giao' : 'ket2_ho_so_lanh')
    },

    /* ===== KẾT THÚC THẤT BẠI MỚI ===== */
    ban_cong_lo_lung: {
      type: 'ending',
      title: 'Ban công lơ lửng',
      text: [
        'Bước thứ ba, sàn sắt dưới chân bạn mềm đi như giấy ướt. Nhưng bạn không rơi. Chiếc chuồng cọp khép lại quanh bạn, nhẹ nhàng như một bàn tay.',
        'Sau khi nhà B4 bị phá dỡ, công nhân phát hiện một chiếc lồng sắt gỉ lơ lửng giữa không trung, đúng độ cao tầng 5, phía trên công trường. Những sáng sương mù, có người thấy bóng ai đó ngồi bên trong, tay ôm một con búp bê.',
        'Chủ đầu tư ghi nó vào danh mục “hạng mục chưa xử lý”.'
      ]
    },

    khong_co_trong_ho_so: {
      type: 'ending',
      title: 'Không có trong hồ sơ',
      text: [
        'Bạn bấm “Xóa bản ghi”. Căn 502 biến mất khỏi phần mềm. Rồi biến mất khỏi bản vẽ. Rồi cánh cửa 502 ngoài hành lang chỉ còn là một mảng tường phẳng.',
        'Sáng hôm sau bạn không đăng nhập được vào bất cứ thứ gì. Quét căn cước báo “Không tìm thấy dữ liệu”. Bệnh viện của mẹ không có tên người nhà nào.',
        'Nơi duy nhất còn ghi nhận bạn là một khoảng trống giữa căn 501 và 503 trên công trường, nơi máy xúc cứ đến gần là chết máy.'
      ]
    },

    nguoi_giu_nha: {
      type: 'ending',
      title: 'Người giữ nhà',
      text: [
        'Hai bảo vệ dự án xốc nách ông Kha khiêng ra cửa. Ông không chống cự. Ông chỉ nói: “Đồ nhà nào trả về nhà nấy.”',
        'Khiêng ông ra là mang “đồ” ra khỏi nhà. Cả tòa nhà đi theo ông. Sáng thứ Hai, móng nhà B4 đã trườn bốn mét về phía cổng, đè lên hàng cọc mốc của công trình mới.',
        'Lễ khởi công bị hoãn. Trong biên bản sự cố có tên bạn, ở dòng “người chỉ đạo di dời”.'
      ]
    }
  });

  /* ---------- Nối Màn 1 sang Màn 2 ---------- */
  STORY.scenes.het_man1.nextScene = 'm2_mo';
  STORY.scenes.het_man1.endOf = STORY.actEndingOf;

  /* ---------- Bộ sưu tập kết thúc Màn 2 ---------- */
  STORY.endingsList.push(
    { id: 'ket2_ban_giao', title: 'Kết Màn 2: Bàn giao trung thực', kind: 'act', act: 2, hint: 'Nói thật về con số, và để người già được kể chuyện.' },
    { id: 'ket2_ho_so_lanh', title: 'Kết Màn 2: Hồ sơ lạnh', kind: 'act', act: 2, hint: 'Đúng thủ tục nhưng thiếu một điều gì đó.' },
    { id: 'ket2_phan_chia', title: 'Kết Màn 2: Phần chia', kind: 'act', act: 2, hint: 'Khi lòng thương mẹ thắng một con số.' },
    { id: 'ban_cong_lo_lung', title: 'Ban công lơ lửng', kind: 'fail', act: 2, hint: 'Đặt chân lên thứ không có trong sổ.' },
    { id: 'khong_co_trong_ho_so', title: 'Không có trong hồ sơ', kind: 'fail', act: 2, hint: 'Xóa đi để không ai phải chịu trách nhiệm.' },
    { id: 'nguoi_giu_nha', title: 'Người giữ nhà', kind: 'fail', act: 2, hint: 'Mang người ra khỏi nơi đã coi họ là của mình.' }
  );

  /* ---------- Dàn dựng 3D + âm thanh ---------- */
  const TAB_502 = [{ t: 'Căn 502 · diện tích hợp pháp', s: 44, wt: 600, c: '#9fc3ff' }, { t: '31,2 + 9,6 m²', s: 100, c: '#ffffff', mono: true }, { t: 'Cơi nới công nhận 2016 · A. Phát', s: 42, wt: 600, c: '#ffd27a' }];
  const TAB_FORM = [{ t: 'Diện tích cơi nới được công nhận', s: 44, wt: 600, c: '#9fc3ff' }, { t: '9,6 m²', s: 120, c: '#ffffff', mono: true }, { t: 'Giữ nguyên  |  Điều chỉnh', s: 50, wt: 700, c: '#ffd27a' }];
  Object.assign(STORY.staging, {
    m2_mo:       { view: 'corridor5', cast: ['phat', 'tho', 'tram'], fx: ['tablet', 'cageview'], sfx: ['scrape_far'], tablet: TAB_502 },
    nut4:        { view: 'room502', cast: ['tram'], fx: ['cage', 'alarm'], sfx: ['loa_click', 'door'] },
    n4_het_gio:  { view: 'room502', cast: [], fx: ['cage', 'shake'], sfx: ['loa', 'scrape'] },
    p4:          { view: 'room502', cast: ['tram', 'tho'], fx: ['cage', 'alarm'], sfx: ['heart'] },
    n4_ok:       { view: 'room502', cast: ['tram', 'tho'], fx: ['cage', 'dollgone'] },
    n4_sai:      { view: 'room502', cast: ['tram', 'tho'], fx: ['cage', 'shake', 'dollgone'], sfx: ['thud'] },
    n4_tram:     { view: 'room502', cast: ['tram', 'tho'], fx: ['cage', 'dollgone', 'shake'], sfx: ['door'] },
    giua_45:     { view: 'stair', cast: ['tram', 'tho'], fx: [] },
    giua_45_ke:  { view: 'stair', cast: ['tram', 'tho'], fx: [] },
    giua_45_lang:{ view: 'stair', cast: ['tram', 'tho'], fx: [] },
    nut5:        { view: 'stair', cast: ['phat', 'tram', 'tho'], fx: ['tablet'], sfx: ['phone'], tablet: TAB_FORM },
    n5_giu:      { view: 'corridor5', cast: ['phat', 'tram'], fx: ['door509', 'redlight'], sfx: ['phone', 'door'] },
    n5_that:     { view: 'room502', cast: ['tram', 'phat'], fx: ['cagefade', 'dollgone'], sfx: ['thud'] },
    giua_56:     { view: 'corridor5', cast: ['tho'], fx: [] },
    nut6:        { view: 'room301', cast: ['kha', 'tram'], fx: ['ring', 'alarm'], sfx: ['loa', 'scrape'] },
    n6_het_gio:  { view: 'room301', cast: ['kha'], fx: ['ringclosed'], sfx: ['scrape', 'thud'] },
    n6_thu_tuc:  { view: 'room301', cast: ['kha', 'tram', 'tho'], fx: ['ringclosed', 'tablet'], tablet: [{ t: 'Nhận diện vật thể', s: 44, wt: 600, c: '#9fc3ff' }, { t: 'Người: 00', s: 110, c: '#ffffff', mono: true }, { t: 'Ghế gỗ: 01 · Chìa khóa: 40', s: 42, wt: 600, c: '#ffd27a' }] },
    n6_ke:       { view: 'room301', cast: ['kha', 'tram', 'tho'], fx: ['ringopen'] },
    ket_man2:    { view: 'corridor5', cast: ['tho', 'phat', 'tram', 'kha'], fx: ['tablet', 'door509'], sfx: ['loa_click'], tablet: [{ t: 'Chạy thử đồng bộ', s: 44, wt: 600, c: '#9fc3ff' }, { t: '04:00', s: 120, c: '#ffffff', mono: true }, { t: 'Còn 60 phút đến giờ chốt sổ', s: 44, wt: 700, c: '#ff7a6a' }] },
    het_man2:    { view: 'exterior', cast: [], fx: ['dawn'] }
  });
})();
