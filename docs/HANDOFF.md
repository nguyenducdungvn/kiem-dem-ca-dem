# BÀN GIAO · Kiểm Đếm Ca Đêm (v1.1.0, 24/11/2026)

> Dán file này vào chat mới (hoặc bảo Claude đọc `claude/kiem-dem-ca-dem-handoff.md` trong Project "App GAME"), **kèm file `kiem-dem-ca-dem.zip` bản mới nhất**. Đọc file này là đủ để làm tiếp. Chỉ mở file code khi cần sửa.

## 1. Trạng thái
- **TRỌN BỘ 4 MÀN (v1.1.0), đã đẩy lên GitHub:** https://github.com/nguyenducdungvn/kiem-dem-ca-dem (nhánh `main`). Chơi tại https://kiemdem.hlvsuckhoe.com/ (GitHub Pages, tên miền riêng; link cũ nguyenducdungvn.github.io/kiem-dem-ca-dem/ tự chuyển về). Bản dự phòng: https://claude.ai/artifact/69y8DDznTGGFhhb8Vr9W6M
- Toàn game có 10 luật, 27 manh mối, 27 kết thúc (13 kết màn hoặc kết cuối, 14 kết thúc thất bại), tất cả đều tới được. `check.js` đã duyệt 4,26 triệu trạng thái, 0 lỗi.
- Có màn hình chính, Chọn màn, Bộ sưu tập kết thúc, Góp ý (GitHub Issue điền sẵn hoặc chép nội dung), Nhận truyện mới, Mời cà phê (BIDV 3210256468, NGUYEN DUC DUNG, VietQR), Miễn trừ, Giới thiệu & phiên bản.
- **v1.1.0:** chế độ đọc truyện (`kdcd_settings_v1.story`; clamp TT/PIN ≥1, DN ≤59, bỏ statFail và đồng hồ), thẻ minh họa SVG cho 27 kết thúc (`js/icons.js`, `EndingIcon(id)`), nhạc nền `SFX.setMood('night'|'tense'|'dawn')` gọi trong stage3D, phím tắt (1–4/A–D, Space/Enter, J, H, M), nút chia sẻ kết thúc (navigator.share hoặc chép), favicon + ảnh OG `images/og-cover.jpg`, giảm pixel ratio trên mobile. Rà soát: bỏ chữ hoa có dấu, gợi ý kết thúc đúng màn, miễn trừ nói rõ Cloudflare Web Analytics, chị Trâm 36 tuổi. Lịch sử: `CHANGELOG.md`.
- **Giữ nguyên:** file `CNAME` và thẻ script Cloudflare beacon cuối `index.html` (do tác giả thêm).
- **Còn trống trong `js/config.js`:** `feedback.email`, `feedback.formUrl`, `subscribe.links` (Facebook/Zalo). Điền khi tác giả gửi.
- Làm việc với repo: thư mục dự án chính là working copy của git. Commit theo đúng dòng attribution trong system-reminder.

## 2. Cấu trúc file
| File | Vai trò |
|---|---|
| `index.html` | Màn hình chính (giới thiệu, bộ sưu tập kết thúc, giới thiệu & phiên bản, miễn trừ, cà phê), HUD, khung lời kể. Thứ tự script: config, three, story-act1, story-act2, audio, scene3d, engine |
| `js/config.js` + `images/qr-cafe-bidv.jpg` | Thông tin tác giả và mời cà phê (đã điền). Trường nào để trống thì phần đó tự ẩn |
| `js/story-act1.js` | `STORY.meta` (version), `start`, `rules` L1–L8, `scenes`, `endingsList`, `actEndingOf`, `staging` |
| `js/story-act2.js` | Gộp thêm vào STORY: L9–L10, cảnh `m2_mo` → `het_man2`, puzzle lưới `p4` (tạo SVG bằng code), 6 kết thúc mới. Gắn `het_man1.nextScene = 'm2_mo'` |
| `js/story-act4.js` | Màn cuối: `m4_mo` → `ket_cuoi` / `ket_o_lai` → `het_man4` (`final: true`, không có nextScene). Puzzle chọn mốc `p10`, `STORY.honesty(S)` cho điểm 0–6, phần kết kể số phận nhân vật theo cờ |
| `js/story-act3.js` | Cảnh `m3_mo` → `het_man3`, puzzle đối chiếu hai bản vẽ `p8`, 6 kết thúc mới. Gắn `het_man2.nextScene = 'm3_mo'`. Trong staging, `fx` và `tablet` có thể là hàm `(S) => …` |
| `js/engine.js` | Màn hình chính, chỉ số, đồng hồ (`timer: {sec, next, label}`), lưu game, checkpoint, puzzle, kết thúc. Kết màn dùng `endOf(S)` và `nextScene`. Cảnh có `act` thì đổi nhãn màn trên HUD |
| `js/scene3d.js` | Three.js r128. Không gian (exterior có thêm fx `ceremony`, `sunrise` cho lễ khởi công): `exterior, room304, room207, stair, corridor, corridor5, room405, room502, room301, room509`. Nhân vật: `tho, phat, tram, kha` |
| `js/audio.js` | `SFX.play`: loa, loa_click, scrape, scrape_far, tick, tickfast, heart, thud, door, phone, click, sting |
| `tools/check.js` | `node tools/check.js js/story-act1.js js/story-act2.js js/story-act3.js` (gộp trạng thái trùng; báo kết thúc chưa tới được) |
| `tools/export.js` | `node tools/export.js js/story-act1.js js/story-act2.js > x.md` |
| `docs/` | `kich-ban-man-1..4.md` (có Bước A/B), `anh/` (ảnh cho README), HANDOFF.md |
| `.github/ISSUE_TEMPLATE/` | Mẫu Issue: góp ý (nhãn `gop-y`), báo lỗi (nhãn `loi`) |

**Thêm màn hoặc tập mới:** tạo file story mới theo mẫu story-act4.js, gồm IIFE, `Object.assign(STORY.scenes, …)`, `STORY.endingsList.push(…)`, `Object.assign(STORY.staging, …)`, và gắn `STORY.scenes.het_man3.nextScene = 'm4_mo'`. Cảnh đầu đặt `act: 'Màn 4 · Chốt sổ'`. Màn cuối thì `het_man4` không có `nextScene`. Thêm `<script>`, cập nhật mục phiên bản và chữ "x kết thúc" trong index.html. Không gian 3D mới thì thêm `BUILD.<ten>` (có `cam, spots, update`) và tên vào `VIEW_NAMES` trong engine.

**Hiệu ứng `fx` hiện có:** `ghost slide slid shake alarm cupboard clockhand clockfast clockhung door405 door502 dooropen redlight hole circle tablet dawn menu cage cagefade dollgone cageview door509 door509thin chalk509 long longer ring ringclosed ringopen assemble dissolve ghostlines phoneleft`.

## 3. Kinh thánh truyện (tóm tắt)
- **Bối cảnh:** tháng 11/2026, nhà B4 khu tập thể Tân Hòa (hư cấu), xếp nguy hiểm cấp D. Đêm kiểm đếm bắt buộc, hệ số K = 2, phần mềm GPMB chốt sổ lúc 05:00, lễ khởi công lúc 7:00.
- **Cơ chế:** "Nhà nhớ đồ": để quên đồ thì bị neo, mang đồ đi thì căn hộ đi theo, vách 110 trượt được. **Tòa nhà thành hình theo hồ sơ:** con số được ký thì thành không gian thật. **Trung thực làm giảm Độ neo.** "Kể cho nhà nghe" thì nhà nới vòng giữ.
- **Nhân vật:**
  - Thục Anh (người chơi): mẹ nằm viện, mổ thứ Tư.
  - Anh Phát: lấy đồ ở các căn bỏ trống; năm 2016 vừa lập biên bản tháo chuồng cọp vừa ký công nhận 9,6 m² khống; con gái học lớp Sáu.
  - Út Thơ: livestream, nghỉ học vì thiếu tiền.
  - Chị Trâm: nhà cũ ở căn 502, con búp bê tên Bông; **tự soạn phương án khống**; mẹ ở trọ.
  - Ông Kha: 46 năm ở B4, **giấu biên bản tháo dỡ trong búp bê**, viết phiếu thứ 40 (L10).
- **Cờ:**
  - Màn 1: `goi_me, tho_live, vi_pham_L3, vi_pham_L1, phat_neo_nang, l7_cua_phat, phat_thu_nhan, tho_da_nhan_loi`.
  - Màn 2: `co_bien_ban, tram_vong_sat, ke_me, nhan_phan_chia, ghi_su_that, kha_thanh_do, kha_viet_phieu`.
  - Màn 3: `tho_ra, tho_de_dien_thoai, tra_bong, hua_phat, ban_ve_dung, ban_ve_thiet_ke, cong_khai, tram_tu_thu`.
- **Diện tích:** đầu đêm 1.842,6 → cuối Màn 1 1.852,2 (+9,6) → cuối Màn 2 là 1.861,8 nếu nhận chia, hoặc 1.852,2 nếu trung thực → cuối Màn 3 là 1.871,4 nếu giữ bản thiết kế (khớp cảnh mở đầu), hoặc 1.852,2 nếu chọn hoàn công (9,6 còn dư chính là đoạn hành lang đang dài ra).
- **Lời giải của Màn 3:** 9,6 m² là căn 509 trên bản thiết kế 1979, bị cắt khi xây; khoảng ấy thành sân phơi rồi thành chuồng cọp 502. Anh Phát tải bản thiết kế lên lúc 22:05 bằng tablet KĐ-02, đăng nhập tài khoản chị Trâm. Tòa nhà tin điều nhiều người cùng nhìn thấy, nên livestream là hồ sơ công khai. Người chơi lúc 04:40 đứng trong phần diện tích không có trong hồ sơ, vì vậy livestream không thấy họ ("Chị áo xanh đâu rồi?").
- **Câu hỏi treo cho Màn 4:** người chơi ra khỏi đoạn hành lang không có trong hồ sơ bằng cách nào? Con số chốt sổ cuối cùng là bao nhiêu? Số phận anh Phát, chị Trâm, Út Thơ, ông Kha ra sao? Ca mổ của mẹ thế nào? Lễ khởi công lúc 7:00?

## 4. Quy trình mỗi màn (bắt buộc)
1. **Bước A:** rút 1 bài học về nhịp độ hoặc độ khó từ màn trước.
2. **Bước B:** tích hợp ý tưởng của người dùng, nối khớp manh mối cũ.
3. **Bước C:** viết rồi dựng (dữ liệu + 3D), chạy `check.js`, chụp màn hình ở 1366 px và 390 px.
4. **Cuối màn:** bảng tổng hợp (Trạng thái & Chỉ số · Sợi dây liên kết · Bài học thiết kế), cập nhật HANDOFF (file này và Project), tăng version, đóng zip, publish lại artifact cùng slug `29be3b36-afb4-49e7-acc1-c16a7c6875da`.

## 5. Quy tắc cố định
- **Tiếng Việt:** xem `claude/quy-tac-tieng-viet.md` (font tự host, line-height, không viết hoa chữ có dấu, NFC, chữ trên canvas phải đợi `document.fonts`).
- **Độc bản:** không dùng các mô-típ của tác phẩm gốc đã phân tích (gọi tên đầy đủ, điểm danh hay sĩ số thừa, quan tài, nấm, siêu luật đếm số điều, kẻ giả mạo đồng minh, luật kéo dài thời hạn tập thể). Màn 3 **không** dùng mô-típ "ghi tên người để giết".
- **Thiết kế:** phương án chết là phương án hấp dẫn hoặc tử tế nhất; xáo vị trí A/B/C; đồng hồ chỉ đặt ở nút hành động; khoảnh khắc nhân vật rải giữa các nút; vào nút đầu tiên sau tối đa 1–2 cảnh.
- **Lỗi đã sửa, cần nhớ:** `[hidden]{display:none!important}` (CSS display ghi đè thuộc tính hidden). typeParagraphs dùng token để chặn handler cũ. Timer tự dừng khi đổi cảnh.

## 6. Việc tiếp theo (đề xuất cho tác giả)
1. **Bản 1.2:** bản tiếng Anh (tách chuỗi ra `lang/en.js`); PWA cài lên điện thoại, chơi offline; trang thống kê "bao nhiêu % người chơi chọn…" (cần backend nhẹ). Phát hành GitHub Release v1.1.0 bằng tay (phiên Claude không tạo được Release).
2. **Mùa 2 · "Phiếu bàn giao"** (tuyển tập độc lập, mỗi tập 1 khu nhà, 2–3 màn, dùng chung engine): một làng ven sông trong diện di dời; một chợ cũ sắp thành trung tâm thương mại; một nhà máy cũ thành khu đô thị; một nghĩa trang làng cần quy tập. Thục Anh là nhân vật xuyên suốt, mỗi tập một bộ luật mới, cùng chủ đề "bàn giao trung thực".
3. **Kết nối người đọc:** tạo Facebook/Zalo và Google Form để điền vào config; viết Discussions "Bạn được kết thúc nào?"; phát hành bản Release cho mỗi tập để người theo dõi nhận thông báo.
4. **Mở rộng giá trị:** bản cho lớp học (giáo dục công dân, kỹ năng đọc hồ sơ và kiểm chứng thông tin) kèm phiếu thảo luận; bản cho đào tạo nội bộ ngành trắc địa/GPMB về quy trình kiểm đếm minh bạch.
5. Khi thêm tập mới: tạo `js/story-s2e1.js`… và tách `STORY` theo tập, hoặc thêm `?tap=` vào đường dẫn.
