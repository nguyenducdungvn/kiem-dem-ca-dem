# KIỂM ĐẾM CA ĐÊM · NHÀ B4
## Kịch bản Màn 2: CƠI NỚI (02:35 – 04:00) · bản dựng v0.4.0

> **Đã dựng vào game.** File này được xuất từ `js/story-act2.js`. Khi sửa truyện, sửa file `.js` rồi chạy `node tools/export.js js/story-act1.js js/story-act2.js`.

---

## Bước A: Đúc rút từ Màn 1 (v0.3.0)

**Điểm cần cải thiện: phần dạo đầu của Màn 1 quá dài.** Phải qua 6 cảnh (mở đầu, ông Kha, tin nhắn mẹ, căn 304, Út Thơ…) mới tới nút nguy hiểm đầu tiên. Người chơi đã quen nhân vật từ Màn 1, nên Màn 2 không cần dạo đầu lại.

**Cách áp dụng trong Màn 2:**
- **Vào nút nguy hiểm sau đúng 1 cảnh** (`m2_mo` → `nut4`).
- **Khoảnh khắc nhân vật được rải giữa các nút**, không dồn ở đầu màn: chị Trâm và con búp bê (`giua_45`) nằm giữa Nút 4 và 5; Út Thơ nghỉ học (`giua_56`) nằm giữa Nút 5 và 6.
- **Nhịp nhanh, chậm, nhanh:** Nút 4 có đồng hồ 20 giây (puzzle 40 giây), Nút 5 cố ý không có đồng hồ, Nút 6 có đồng hồ 25 giây.
- **Phương án chết là phương án "tốt"** và được xáo vị trí: C (anh hùng), A (nhân từ), B (tử tế).

## Bước B: Tích hợp và nối manh mối

Người dùng chưa gửi ý tưởng mới, nên Màn 2 nối tiếp các mạch đã gieo ở Màn 1 v0.3.0:

| Mạch từ Màn 1 | Được dùng ở Màn 2 |
|---|---|
| Mẹ nằm viện, thứ Tư mổ nếu đủ tiền | Thành **cám dỗ chính** ở Nút 5: phần chia 30% vừa đủ tiền mổ. Chọn giữ nguyên thì mẹ nhắn "Con chuyển tiền cho mẹ à?" |
| Cờ `goi_me` (lời dặn "xong việc thì về") | Ông Kha nhắc lại ở `n6_ke`. Mẹ nhắn lúc 04:00 |
| Cờ `tho_live` | Người xem cảnh báo ở Nút 4; micro vẫn bật khi chị Trâm thú nhận ở Nút 5 |
| Cờ `phat_thu_nhan` / `l7_cua_phat` | Lời đề nghị của anh Phát đổi giọng: van xin thay vì ra lệnh |
| Cờ `tho_da_nhan_loi` | Út Thơ ngoái về cầu thang, đáp "dạ" với tường |
| Anh Phát phụ trách đợt tháo chuồng cọp 2016 | Biên bản tháo dỡ do chính anh lập, giấu trong búp bê. **Ông Kha là người giấu** (bẻ lái nhỏ ở Nút 6) |
| "Chín phẩy sáu" và vạch chiều cao năm 1998 | **Bẻ lái chính:** chị Trâm biết con số khống và tự soạn phương án bồi thường |
| Cảnh mở đầu: +28,8 m², 12 nghìn người xem | Giữ nguyên số liệu ra 1.861,8 m² (+19,2). Thêm 9,6 nữa ở Màn 3 sẽ thành 28,8. Livestream 12.408 người xem |

**Cơ chế mới:** *trung thực làm giảm Độ neo* (ghi đúng sự thật: Độ neo −15). Có thêm mini-game lưới quét laser: **tòa nhà thành hình theo hồ sơ.**

## Sơ đồ nhánh

```
het_man1 → [Sang Màn 2] → m2_mo (02:35, nhận L9)
→ NÚT 4 Chuồng cọp (⏱20 giây → n4_het_gio → n4_tram)
   A Để chị Trâm tự lấy  → n4_tram (cờ tram_vong_sat; Trâm giấu biên bản; manh mối hiếm)
   B Quét laser hồ sơ    → p4 (⏱40 giây): lối 3 → n4_ok | lối 1/2 → n4_sai     (cờ co_bien_ban)
   C Tự trèo ra cho nhanh → 💀 Ban công lơ lửng
→ giua_45 (chị Trâm và con búp bê Bông) ─ A kể chuyện mẹ (ke_me, +TC) | B lảng đi (+TT)
→ NÚT 5 Biên bản điện tử (không có đồng hồ) · bẻ lái: chị Trâm soạn phương án khống
   A Xóa trắng bản ghi   → 💀 Không có trong hồ sơ
   B Giữ nguyên, nhận chia → n5_giu (Độ neo +25, cờ nhan_phan_chia, mọc cửa 509)
   C Ghi đúng sự thật     → n5_that (Độ neo −15, cờ ghi_su_that; chuồng cọp tan biến)
→ giua_56 (Út Thơ nghỉ học; câu hỏi "Căn 509 là căn nào?")
→ NÚT 6 Hộ cuối cùng (⏱25 giây → n6_het_gio → n6_thu_tuc) · bẻ lái: ông Kha giấu biên bản
   A Biên bản bắt buộc   → n6_thu_tuc ("Người: 00", cờ kha_thanh_do)
   B Khiêng ông ra ngoài  → 💀 Người giữ nhà
   C Kể cho nhà nghe      → n6_ke (nhận L10, cờ kha_viet_phieu)
→ ket_man2 (04:00): 1.861,8 m² nếu nhận chia, hoặc 1.852,2 m² (+9,6 chưa rõ nguồn)
→ het_man2: Bàn giao trung thực / Hồ sơ lạnh / Phần chia
```

**Kiểm thử tự động cả hai màn:** 65.446 đường đi, 33.886 đường tới hết Màn 2. Kết Màn 2: Hồ sơ lạnh 13.700, Phần chia 12.798, Bàn giao trung thực 7.388 (khó nhất). Kết thúc chết ở Màn 2: Người giữ nhà 13.032, Không có trong hồ sơ 7.388, Ban công lơ lửng 1.080. Ngoài ra có Ở lại (Độ neo ≥ 60) 3.404 và Đo mãi 6.408. Toàn game có 21 manh mối, 10 luật, 15 kết thúc.

---

## Toàn văn kịch bản Màn 2

### Tầng 5 · 02:35
<sub>`m2_mo`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Cầu thang lên tầng 5 có mười một bậc chứ không phải mười. Bạn đo lại, vẫn là mười một.

Hành lang tầng 5 có tám cánh cửa, đúng như bản vẽ. Nhưng qua ô cửa sổ cuối hành lang, bạn thấy ngoài căn 502 có một chuồng cọp sắt hoen gỉ bám vào tường, như một chiếc lồng chim khổng lồ. Theo biên bản, nó đã bị tháo từ năm 2016.

Tablet hiện hồ sơ căn 502: diện tích sử dụng hợp pháp 31,2 m², cộng phần cơi nới được công nhận năm 2016 là 9,6 m². Người xác nhận: Đoàn Vĩnh Phát.

Không ai quay sang nhìn anh Phát. Anh cũng không ngẩng lên.

Tiếng tích tắc trong túi áo anh nhanh hơn lúc nãy.

Út Thơ chĩa camera ra cửa sổ: “Trong cái lồng sắt có… một con búp bê.”

Chị Trâm nói rất khẽ: “Đó là của tôi. Hồi bé tôi hay ngồi trong cái chuồng cọp ấy xem pháo hoa Tết. Mẹ tôi bảo nó là phần nhà đẹp nhất.”

Út Thơ đi chậm dần, cứ ngoái về phía cầu thang xuống tầng 4. Bạn gọi đến lần thứ hai em mới quay lại.

Kẹp trong xấp phiếu, phiếu căn 501 và 503 có cùng một lời dặn.

**Nhận luật:** L9

**Manh mối:** Hồ sơ 502: cơi nới 9,6 m² được anh Phát xác nhận năm 2016, dù chuồng cọp đã tháo cùng năm.

---

### NÚT 4 · Chuồng cọp · 02:40
<sub>`nut4`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Loa phường khục lên: “Đề nghị các hộ chuẩn bị. Giờ dọn nhà lần hai sắp bắt đầu.”

Cửa sổ căn 502 mở toang. Chiếc chuồng cọp kêu cót két trong gió như đang thở. Con búp bê vải ngồi ở góc xa nhất, váy đỏ bạc màu.

Chị Trâm đã đứng sát bậu cửa, một chân nhấc lên. “Để tôi. Đồ của tôi thì tôi lấy.”

Trên livestream, người xem gõ liên tục: “Đừng bước ra!!!”, “Sàn đó có thật không vậy?”

**Đồng hồ:** 20 giây (Giờ dọn nhà lần hai). Hết giờ → `n4_het_gio`

**Lựa chọn:**

- A. Để chị Trâm tự ra lấy: đồ của ai người nấy nhận, đúng luật L1 và L2 → `n4_tram`
- B. Mở hồ sơ cơi nới 2016, quét laser từng ô sàn trước khi bước → `p4`
- C. Buộc dây đo vào khung cửa, tự trèo ra lấy cho nhanh, không để chị Trâm mạo hiểm → `ban_cong_lo_lung`

---

### Lần hai · 02:41
<sub>`n4_het_gio`</sub>

Bạn chưa kịp quyết thì nhạc hiệu đã vang lên. Cả căn 502 xô dạt, đồ đạc ồ ạt dồn về phía cửa sổ như nước rút qua cống. Cả nhóm bị đẩy bật ra hành lang.

Khi mọi thứ lặng đi, chị Trâm đã trèo qua bậu cửa từ lúc nào.

**Chỉ số:** Tỉnh táo -15 · Độ neo +10

---

### Sàn chuồng cọp · 02:42
<sub>`p4`</sub>

Bấm vào ô hồ sơ để đọc số liệu năm 2016, bấm từng ô sàn để quét laser. Rồi chọn một lối đi tới con búp bê.

**Đồng hồ:** 40 giây (Giờ dọn nhà lần hai). Hết giờ → `n4_sai`

**Ký hiệu trên bản vẽ:**

- Ô cột 1, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 1, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 1, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 1, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 1, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 1, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 2, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 3, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 4, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 4, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 4, hàng 3 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 4, hàng 4 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 4, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 4, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 5, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 5, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 5, hàng 3 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 5, hàng 4 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 5, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 5, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 6, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 7, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 1 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 2 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 3 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 4 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 5 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 8, hàng 6 · Laser: có phản xạ, mặt sàn sắt 0,0 cm.
- Ô cột 9, hàng 1 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 9, hàng 2 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 9, hàng 3 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 9, hàng 4 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 9, hàng 5 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Ô cột 9, hàng 6 · Laser: KHÔNG phản xạ. Phía dưới là khoảng không cao năm tầng.
- Hồ sơ cơi nới 2016 (A. Phát xác nhận): 3,2 m × 3,0 m tính từ mép cửa sổ, trừ khoảng 0,8 m × 1,0 m chỗ bồn nước cũ ở giữa. Tổng 9,6 m².

**Lựa chọn:**

- Đi theo lối 1 (cam): đường chéo ngắn nhất → `n4_sai`
- Đi theo lối 2 (xanh): men theo mép ngoài → `n4_sai`
- Đi theo lối 3 (tím): men theo tường rồi theo hàng trên cùng → `n4_ok`

---

### Theo hồ sơ · 02:45
<sub>`n4_ok`</sub>

Bạn bước đúng từng ô đã quét. Dưới đế giày, mặt sàn sắt rung lên nhưng vẫn đỡ được bạn. Ngay sát bên, những ô ngoài hồ sơ trông y hệt, nhưng gió lùa qua chúng như qua không khí.

Bạn ôm được con búp bê. Trong túi váy nó có một tờ giấy gấp tư: “Biên bản tháo dỡ công trình cơi nới căn 502, ngày 14/3/2016. Diện tích tháo dỡ: 9,6 m². Người lập: Đoàn Vĩnh Phát.”

Chuồng cọp đã bị tháo, chính anh Phát lập biên bản. Vậy mà cùng năm ấy, cũng chính anh ký công nhận nó là diện tích hợp pháp.

Ai đã nhét tờ biên bản này vào búp bê?

**Chỉ số:** Tỉnh táo -10 · Độ neo +10

**Manh mối:** Quy luật ẩn: tòa nhà thành hình theo hồ sơ. Sàn chỉ có thật ở phần đã được ký công nhận. / Biên bản tháo dỡ chuồng cọp 502 (14/3/2016, anh Phát lập) giấu trong túi váy búp bê.

**Cờ:** co_bien_ban

---

### Hụt chân · 02:45
<sub>`n4_sai`</sub>

Bước thứ năm, chân bạn sụt vào khoảng không. Bạn chỉ kịp vồ lấy một thanh sắt. Phía dưới là năm tầng gió lạnh.

Út Thơ hét lên, chĩa camera xuống: “Chỗ có vệt mờ là có sàn! Chị bước sang trái!” Bạn lần theo vệt mờ trên màn hình em, từng ô một, rồi tới được góc lồng.

Trong túi váy con búp bê có một tờ giấy gấp tư: biên bản tháo dỡ chuồng cọp căn 502, ngày 14/3/2016, người lập là Đoàn Vĩnh Phát.

**Chỉ số:** Tỉnh táo -20 · Độ neo +10 · Tin cậy +5

**Manh mối:** Quy luật ẩn: tòa nhà thành hình theo hồ sơ. Sàn chỉ có thật ở phần đã được ký công nhận. / Biên bản tháo dỡ chuồng cọp 502 (14/3/2016, anh Phát lập) giấu trong túi váy búp bê.

**Cờ:** co_bien_ban

---

### Vòng sắt · 02:44
<sub>`n4_tram`</sub>

Chị Trâm bước ra, bước chân rất chắc, như người đã đi trên sàn ấy hàng nghìn lần. Chị nhặt con búp bê lên.

Đúng lúc ấy, lan can sắt kêu rít, uốn cong lại thành nửa vòng tròn quanh chị. Bạn và Út Thơ túm được tay chị kéo vào. Một đoạn sắt gỉ đã quấn chặt quanh cổ tay chị như một chiếc vòng, không tháo ra được.

Chị ôm con búp bê vào ngực. Bạn thấy chị lén rút từ túi váy nó ra một tờ giấy gấp tư rồi nhét vội vào túi áo mình. Bạn chỉ kịp đọc mấy chữ in đậm: “Biên bản tháo dỡ… 2016”.

**Chỉ số:** Tỉnh táo -10 · Tin cậy +10

**Manh mối:** (Hiếm) Chị Trâm giấu một tờ “biên bản tháo dỡ… 2016” lấy từ búp bê. Cổ tay chị bị vòng sắt chuồng cọp quấn chặt.

**Cờ:** tram_vong_sat

---

### Con búp bê tên Bông · 03:00
<sub>`giua_45`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Cả nhóm ngồi nghỉ ở chiếu nghỉ tầng 5. Chị Trâm vuốt lại mái tóc len của con búp bê. “Nó tên là Bông. Năm 1998 nhà tôi chuyển đi, tôi cố ý để nó lại. Tôi nghĩ để nó ở lại thì nhà sẽ nhớ tôi, và tôi sẽ được quay về.”

“Giờ mẹ tôi đang ở trọ. Phòng mười hai mét vuông, mùa nồm tường chảy nước.” Chị nhìn bạn. “Em có mẹ không?”

**Lựa chọn:**

- A. Kể với chị về mẹ đang nằm viện, thứ Tư mổ nếu đủ tiền → `giua_45_ke`
- B. Lảng đi: “Mình làm tiếp thôi chị, còn hai tiếng nữa.” → `giua_45_lang`

---

### Hai người mẹ · 03:04
<sub>`giua_45_ke`</sub>

Chị Trâm nghe hết, không ngắt lời. Rồi chị nắm tay bạn, lòng bàn tay lạnh ngắt. “Vậy em hiểu chị.”

Câu nói ấy nghe ấm áp. Nhưng sau này nghĩ lại, bạn mới thấy nó giống một lời mời hơn.

**Chỉ số:** Tin cậy +5

**Cờ:** ke_me

---

### Còn hai tiếng · 03:02
<sub>`giua_45_lang`</sub>

Chị Trâm gật đầu, mắt vẫn nhìn con búp bê. “Ừ. Còn hai tiếng.”

Bạn đứng dậy trước. Đầu óc bạn tỉnh hơn khi không phải nghĩ đến mẹ.

**Chỉ số:** Tỉnh táo +5

---

### NÚT 5 · Biên bản điện tử · 03:15
<sub>`nut5`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Phần mềm yêu cầu xác nhận lại hồ sơ căn 502 trước 5 giờ. Trên màn hình, một ô nhấp nháy: “Diện tích cơi nới được công nhận: 9,6 m². Giữ nguyên hay điều chỉnh?”

Anh Phát kéo bạn ra cầu thang, giọng khản đặc: “Anh biết em có bằng chứng về anh rồi. Anh xin em. Năm 2016 anh ký sai, giờ sửa thì anh mất việc, có khi còn bị khởi tố. Con bé nhà anh mới lớp Sáu…”

“Giữ nguyên thì nhà chị Trâm được thêm 19,2 m², tức 9,6 nhân hệ số K bằng 2. Phần chênh lệch anh chia em ba mươi phần trăm. Đủ cho mẹ em mổ thứ Tư.”

Bạn chưa từng kể chuyện mẹ với anh Phát. Bạn quay lại nhìn chị Trâm. Chị không tránh ánh mắt bạn.

Chị Trâm nói, giọng đều như đọc công văn: “Bản phương án bồi thường năm nay là tôi soạn. Tôi biết con số đó sai. Mẹ tôi đang ở trọ, em ạ.”

Út Thơ đứng ở cuối hành lang, điện thoại vẫn giơ cao. Mười hai nghìn người đang xem. Em quay camera đi chỗ khác, nhưng micro vẫn bật.

**Lựa chọn:**

- A. Xóa trắng bản ghi căn 502, để không ai phải chịu trách nhiệm → `khong_co_trong_ho_so`
- B. Giữ nguyên số liệu và nhận phần chia: thứ Tư mẹ được mổ → `n5_giu`
- C. Ghi đúng sự thật: cơi nới bằng 0, đính kèm ảnh hiện trạng và biên bản tháo dỡ → `n5_that`

---

### Giữ nguyên · 03:20
<sub>`n5_giu`</sub>

Bạn bấm “Giữ nguyên”. Màn hình hiện dấu tích xanh, nhẹ tênh như bấm thích một bài đăng.

Anh Phát thở phào, vỗ vai bạn. Chị Trâm nhắm mắt lại. Ngoài cửa sổ, chiếc chuồng cọp kêu cót két rồi lặng im, như vừa được ai đó ký nhận.

Điện thoại rung. Một số lạ chuyển khoản trước một phần. Ngay sau đó là tin nhắn của mẹ, chắc mẹ thức giấc vì tiếng báo: “Con chuyển tiền cho mẹ à? Con đừng làm gì quá sức nhé.”

Cuối hành lang tầng 5, ngay sau căn 508, có một cánh cửa mà lúc nãy chưa có. Biển số còn mới tinh: 509.

**Chỉ số:** Độ neo +25 · Tin cậy +10

**Manh mối:** (Hiếm) Sau khi giữ nguyên con số khống, cuối hành lang tầng 5 mọc thêm cửa căn 509.

**Cờ:** nhan_phan_chia

---

### Điều chỉnh · 03:22
<sub>`n5_that`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn chụp tờ biên bản tháo dỡ, đính kèm cùng ảnh hiện trạng bức tường không còn dấu bu-lông. Ô số liệu: 0,0 m². Lý do: công trình cơi nới đã tháo dỡ ngày 14/3/2016.

Bạn bấm “Điều chỉnh”. Ngoài cửa sổ, chiếc chuồng cọp rụng xuống như một lớp vỏ khô, tan vào bóng tối trước khi chạm đất.

Anh Phát ngồi sụp xuống bậc thang, hai tay ôm đầu. Chị Trâm nhìn ra khoảng trống ngoài cửa sổ, nơi từng là phần nhà đẹp nhất. “Cảm ơn em,” chị nói, và bạn không biết chị có thật lòng hay không.

Lần đầu tiên trong đêm, bạn thấy người nhẹ đi, như vừa trả lại một thứ không phải của mình.

**Chỉ số:** Độ neo -15 · Tin cậy -10 · Tỉnh táo +5

**Manh mối:** Ghi trung thực làm tòa nhà buông ra: chuồng cọp ma biến mất, Độ neo giảm.

**Cờ:** ghi_su_that

---

### Bình luận · 03:35
<sub>`giua_56`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Út Thơ ngồi xuống cạnh bạn, đưa điện thoại ra. “Chị coi nè. Từ lúc nãy ai cũng hỏi một câu.”

Livestream đang có hơn mười hai nghìn người xem. Dòng bình luận trôi nhanh tới mức không đọc kịp, nhưng câu nào cũng giống nhau: “Căn 509 là căn nào vậy?”

“Em nghỉ học kỳ này rồi chị ạ. Không đủ tiền đóng. Live cho vui thôi, chứ em sợ lắm.” Em cười, mắt đỏ hoe. “Xong đêm nay chị cho em đi ăn phở nha.”

Nói xong, em quay sang bức tường trống và khẽ đáp “dạ”, như có ai vừa gọi.

Tablet báo: “Căn 301 chưa có biên bản kiểm đếm. Còn 70 phút.”

---

### NÚT 6 · Hộ cuối cùng · 03:50
<sub>`nut6`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Căn 301 của ông Kha. Bốn mươi chiếc chìa khóa treo kín một tấm ván trên tường, mỗi chiếc một móc, như quầy lễ tân của một nhà nghỉ đã đóng cửa. Ông ngồi trên chiếc ghế gỗ giữa phòng.

Loa phát nhạc hiệu giờ dọn nhà. Lần này đồ đạc không trượt về phía các bạn mà xếp lại thành một vòng tròn quanh ông Kha, như che chắn cho ông.

“Ở đây bốn mươi sáu năm,” ông nói. “Nó coi tôi là đồ nhà nó rồi.”

Ông nhìn con búp bê trong tay chị Trâm. “Tờ biên bản trong túi váy con Bông là tôi nhét vào đấy. Năm 2016 tôi nhặt được trong sọt rác của phường. Tôi nghĩ một ngày nào đó sẽ có người cần đến nó.”

“Cháu đã dùng nó rồi, phải không?” Ông mỉm cười, lần đầu tiên trong đêm.

Tablet nhấp nháy: “Căn 301 chưa có biên bản. Hộ dân chưa ký.”

**Đồng hồ:** 25 giây (Vòng đồ đạc đang khép). Hết giờ → `n6_het_gio`

**Lựa chọn:**

- A. Lập biên bản kiểm đếm bắt buộc đúng thủ tục: chụp ảnh, không cần ông ký → `n6_thu_tuc`
- B. Gọi bảo vệ dự án khiêng ông ra ngoài cho an toàn → `nguoi_giu_nha`
- C. Ngồi xuống cùng ông, kiểm đếm từng món trong căn 301 và đọc to cho ông nghe → `n6_ke`

---

### Vòng khép · 03:52
<sub>`n6_het_gio`</sub>

Vòng đồ đạc khép kín quanh ông Kha: tủ, rương, chiếc quạt bàn, chiếc xe đạp Phượng Hoàng. Không còn khe hở nào.

Phải đợi hết nhạc các bạn mới chen vào được. Đèn pin tối đi một nấc. Đồng hồ trên tablet nhảy sang 03:58. Không còn thời gian để ngồi nói chuyện nữa.

**Chỉ số:** Tỉnh táo -10 · Pin -1

---

### Ghế gỗ: 01 · 03:55
<sub>`n6_thu_tuc`</sub>

Bạn chụp ảnh căn 301 từ bốn góc, lập biên bản kiểm đếm bắt buộc. Đúng thủ tục, đúng mẫu.

Ứng dụng tự nhận diện vật thể trong ảnh và gắn nhãn: “Ghế gỗ: 01. Tủ: 01. Chìa khóa: 40. Người: 00.”

Ông Kha vẫn ngồi đó, nhưng trong hồ sơ ông đã là đồ đạc. Ông nhìn bạn, không giận, chỉ buồn.

**Chỉ số:** Tin cậy -10 · Độ neo +5

**Manh mối:** (Hiếm) Trong biên bản bắt buộc, ứng dụng ghi “Người: 00”. Ông Kha bị hồ sơ coi là đồ đạc.

**Cờ:** kha_thanh_do

---

### Kể cho nhà nghe · 03:58
<sub>`n6_ke`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn ngồi xuống sàn, mở biên bản, đọc to từng món. “Xe đạp Phượng Hoàng: 01.” Ông Kha tiếp lời: “Mua năm tám ba, chở vợ tôi đi đẻ thằng cả.” “Quạt bàn: 01.” “Mùa hè năm chín mươi, cả dãy kéo sang đây nằm.”

Mỗi món được kể xong, vòng đồ đạc lại nới ra một chút, như người nghe chuyện đã yên lòng.

Đến món cuối cùng, ông Kha lấy từ ngăn kéo ra tờ phiếu bàn giao thứ bốn mươi, tờ phiếu của chính ông, rồi tự tay viết vào mục lưu ý. Nét chữ run nhưng rõ.

Ông đưa tờ phiếu cho bạn, nói nhỏ: “Mẹ cháu dặn gì thì nhớ lấy. Xong việc thì về.”

**Chỉ số:** Tỉnh táo -5 · Tin cậy +15 · Độ neo -5

**Nhận luật:** L10

**Manh mối:** Ông Kha viết phiếu thứ 40 (căn 301). Kể cho nhà nghe thì nhà nới vòng giữ.

**Cờ:** kha_viet_phieu

---

### Hệ số K · 04:00
<sub>`ket_man2`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Tablet chạy thử đồng bộ trước giờ chốt.

Tổng diện tích sàn nhà B4: 1.852,2 m². Chuồng cọp ma đã biến mất khỏi số liệu, vậy mà vẫn còn dư đúng 9,6 m² không rõ nằm ở đâu.

Ông Kha nhìn lên trần nhà: “Nó vẫn còn thiếu một thứ. Nó đang dọn sẵn một chỗ cho ai đó.”

Út Thơ giơ điện thoại lên. Số người xem: 12.408. Dòng bình luận cuộn không ngừng: “Căn 509 là căn nào vậy?”

Một tin nhắn của mẹ: “Mẹ tỉnh rồi. Con xong chưa?”

Loa phường khục lên: “Còn sáu mươi phút nữa đến giờ chốt sổ.”

---

### 💀 KẾT THÚC: Ban công lơ lửng
<sub>`ban_cong_lo_lung`</sub>

Bước thứ ba, sàn sắt dưới chân bạn mềm đi như giấy ướt. Nhưng bạn không rơi. Chiếc chuồng cọp khép lại quanh bạn, nhẹ nhàng như một bàn tay.

Sau khi nhà B4 bị phá dỡ, công nhân phát hiện một chiếc lồng sắt gỉ lơ lửng giữa không trung, đúng độ cao tầng 5, phía trên công trường. Những sáng sương mù, có người thấy bóng ai đó ngồi bên trong, tay ôm một con búp bê.

Chủ đầu tư ghi nó vào danh mục “hạng mục chưa xử lý”.

---

### 💀 KẾT THÚC: Không có trong hồ sơ
<sub>`khong_co_trong_ho_so`</sub>

Bạn bấm “Xóa bản ghi”. Căn 502 biến mất khỏi phần mềm. Rồi biến mất khỏi bản vẽ. Rồi cánh cửa 502 ngoài hành lang chỉ còn là một mảng tường phẳng.

Sáng hôm sau bạn không đăng nhập được vào bất cứ thứ gì. Quét căn cước báo “Không tìm thấy dữ liệu”. Bệnh viện của mẹ không có tên người nhà nào.

Nơi duy nhất còn ghi nhận bạn là một khoảng trống giữa căn 501 và 503 trên công trường, nơi máy xúc cứ đến gần là chết máy.

---

### 💀 KẾT THÚC: Người giữ nhà
<sub>`nguoi_giu_nha`</sub>

Hai bảo vệ dự án xốc nách ông Kha khiêng ra cửa. Ông không chống cự. Ông chỉ nói: “Đồ nhà nào trả về nhà nấy.”

Khiêng ông ra là mang “đồ” ra khỏi nhà. Cả tòa nhà đi theo ông. Sáng thứ Hai, móng nhà B4 đã trườn bốn mét về phía cổng, đè lên hàng cọc mốc của công trình mới.

Lễ khởi công bị hoãn. Trong biên bản sự cố có tên bạn, ở dòng “người chỉ đạo di dời”.

---
