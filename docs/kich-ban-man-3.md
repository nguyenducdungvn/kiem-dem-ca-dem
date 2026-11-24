# KIỂM ĐẾM CA ĐÊM · NHÀ B4
## Kịch bản Màn 3: CĂN 509 (04:00 – 04:40) · bản dựng v0.5.0

> **Đã dựng vào game.** File này được xuất từ `js/story-act3.js`.

---

## Bước A: Đúc rút từ Màn 2

**Điểm cần cải thiện: luật và manh mối đã thu gần như không được dùng để giải đố.** Ở Màn 2, người chơi nhận L9 và L10 nhưng không cần mở Sổ tay để vượt qua nút nào. Các manh mối chỉ để đọc.

**Cách áp dụng trong Màn 3:**
- **Nút 8 là câu đố suy luận thuần túy, không có đồng hồ.** Người chơi phải đối chiếu khung tên hai bản vẽ, nhật ký phần mềm (thiết bị KĐ-02) và manh mối cũ ("biên bản 207 do anh Phát ghi") để chọn đúng bản vẽ chuẩn.
- **Nút 7 thưởng cho người chơi nhớ luật:** đứng ở ngưỡng cửa, không bước vào (L9), và đọc to cho nhà nghe (L10, L1) là cách tốt nhất.
- **Nút 9 thưởng cho các mối quan hệ đã vun đắp:** phương án để chị Trâm tự thú chỉ mở nếu Tin cậy ≥ 70 và chị đã mở lòng (`ke_me` ở Màn 2 hoặc `tra_bong` ở Nút 7).

## Bước B: Tích hợp và nối manh mối

Người dùng gửi thông tin mời cà phê (VietQR BIDV). Thông tin này đã được đưa vào `js/config.js` và hiện ở hộp "Mời cà phê" cùng khung cảm ơn cuối mỗi màn.

Màn 3 khép các vòng của Màn 1 và Màn 2 như sau:

| Câu hỏi treo | Lời giải ở Màn 3 |
|---|---|
| 9,6 m² từ đâu ra? | Căn 509 có trên **bản thiết kế 1979** (phòng sinh hoạt chung) nhưng bị cắt vì thiếu vật tư. Khoảng ấy thành sân phơi chung, rồi bị quây thành chuồng cọp của căn 502. Con số 9,6 m² đi qua ba đời: thiết kế, chuồng cọp, hồ sơ khống |
| Căn 509 là gì? | Phần mềm đang đối chiếu theo bản thiết kế, nên tòa nhà dựng căn 509 bằng đồ bị bỏ quên đêm nay và dọn sẵn một chỗ ngồi kèm chiếc áo xanh |
| Ai tải bản thiết kế lên? | **Bẻ lái:** anh Phát dùng tablet KĐ-02 đăng nhập bằng tài khoản chị Trâm lúc 22:05 để con số khống "khớp thiết kế gốc" |
| Livestream 12.408 người | **Cơ chế mới:** tòa nhà tin vào điều nhiều người cùng nhìn thấy. Nói thật công khai làm Độ neo giảm mạnh |
| "Chị áo xanh đâu rồi?" | Người chơi đứng ở phần diện tích không có trong hồ sơ nào (đoạn hành lang đang dài ra), nên không xuất hiện trong khung hình nào. Cảnh mở đầu lúc 05:00 là tương lai của nhánh xấu nhất (giữ bản thiết kế: 1.871,4 m²) |

## Sơ đồ nhánh

```
het_man2 → [Sang Màn 3] → m3_mo (04:01, Út Thơ ở trong căn 509, livestream)
→ NÚT 7 Căn hộ ấm cúng (⏱25 giây → n7_het_gio → n7B_nua)
   A Lao vào kéo em ra    → 💀 Căn hộ mẫu
   B Gọi qua livestream    → Tin cậy ≥ 55 ? n7B_ok : n7B_nua (điện thoại bị bỏ quên, manh mối hiếm)
   C Đọc to biên bản ở ngưỡng cửa → n7C (trả đồ, chị Trâm để con Bông lại 502: tra_bong)
→ giua_78 (anh Phát, buổi họp phụ huynh) ─ A hứa nói giúp (hua_phat, +TC) | B im lặng (+TT)
→ NÚT 8 Bản vẽ nào (không đồng hồ) → p8 đối chiếu
   Bản B hoàn công → n8_ok (ban_ve_dung; anh Phát thú nhận việc tải bản vẽ)
   Bản A thiết kế  → n8_thiet_ke (Độ neo +15, 509 hợp lệ, manh mối hiếm)
   Số đo của bạn   → 💀 Sai số
→ NÚT 9 Mười hai nghìn người xem (⏱30 giây → n9_het_gio → n9_cong_khai)
   A Tắt livestream  → 💀 Ngoài khung hình
   B Để chị Trâm tự nói → (Tin cậy ≥ 70 và (ke_me hoặc tra_bong)) ? n9_tram (tram_tu_thu) : n9_tram_im
   C Tự nói công khai  → n9_cong_khai (nếu đã nhận tiền thì trả lại trước ống kính)
→ ket_man3 (04:40, hành lang dài ra, "Chị áo xanh đâu rồi?")
→ het_man3: Lời tự thú / Trước mọi người / Bản vẽ trên giấy
```

**Kiểm thử tự động cả ba màn** (có gộp trạng thái trùng): 636.288 trạng thái khác nhau, mọi kết thúc đều tới được (trừ "Tắt đèn", để dành cho Màn 4), 0 lỗi. Toàn game có 26 manh mối, 10 luật, 21 kết thúc.

---

## Toàn văn kịch bản Màn 3

### Bữa cơm · 04:01
<sub>`m3_mo`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Loa vừa dứt, cả nhóm quay lại thì Út Thơ đã biến mất.

Livestream của em vẫn chạy, 12.408 người đang xem. Khung hình là một căn phòng nhỏ ấm cúng đến lạ: đèn bàn vàng, mâm cơm bày năm cái bát. Út Thơ ngồi giữa, cười với ống kính: “Nhà mới của em nè mọi người.”

Cuối hành lang tầng 5 có một cánh cửa mờ như vẽ bằng nước. Biển số đề 509. Nó không có trong hồ sơ của bạn, vậy mà nó vẫn đứng đó.

Tablet báo: “Bản vẽ đang dùng để đối chiếu: bản vẽ thiết kế năm 1979. Tải lên lúc 22:05.” Bạn chưa từng tải bản vẽ nào lên.

Ông Kha nhìn cánh cửa rất lâu. “Năm bảy chín, trên giấy có căn ấy. Thiếu gạch nên không xây. Cả tầng dùng chỗ ấy làm sân phơi chung.”

“Con bé đã đáp lời nó từ tối,” ông nói thêm. “Nó coi con bé là người nhà rồi.”

---

### NÚT 7 · Căn hộ ấm cúng · 04:06
<sub>`nut7`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Cánh cửa 509 hé mở. Bên trong là một căn phòng ghép từ những thứ bị bỏ quên đêm nay: chiếc tủ gỗ của căn 304, chiếc giường sắt của căn 207, chiếc quạt trần ba cánh. Tường mỗi mảng một màu vôi khác nhau.

Trên tường có treo chiếc đồng hồ quả lắc của căn 207, đang tích tắc.

Út Thơ ngồi bên mâm cơm, tay vẫn giơ điện thoại. Cạnh em có một chiếc ghế trống. Trên lưng ghế vắt một chiếc áo khoác xanh giống hệt áo bạn đang mặc.

“Chị vào ăn cơm đi chị,” em nói, mắt không chớp. “Ấm lắm.”

Cánh cửa từ từ khép lại, chậm như một hơi thở ra.

**Đồng hồ:** 25 giây (Cửa 509 đang khép). Hết giờ → `n7_het_gio`

**Lựa chọn:**

- A. Lao vào nắm tay Út Thơ kéo ra, chỉ ba bước là tới → `can_ho_mau`
- B. Gọi em qua livestream: bảo em nhìn màn hình, đi theo vệt mờ ra cửa → `n7B_ok` (Tin cậy ≥ 60) / `n7B_nua`
- C. Đứng ở ngưỡng cửa, mở biên bản, đọc to cho căn 509 nghe từng món đồ: của ai, phải trả về đâu → `n7C`

---

### Khép · 04:08
<sub>`n7_het_gio`</sub>

Cánh cửa khép lại chỉ còn một khe hẹp. Qua khe cửa, bạn nghe tiếng bát đũa lách cách và tiếng Út Thơ cười, cười như đang ăn Tết.

Bạn gào tên em, đập cửa. Phải gần một phút sau em mới ngoái lại.

**Chỉ số:** Tỉnh táo -15

---

### Vệt mờ · 04:09
<sub>`n7B_ok`</sub>

Bạn gõ vào ô bình luận: “Thơ ơi, nhìn màn hình của em. Nhìn những vệt mờ.” Mười hai nghìn người gõ theo cùng một câu.

Út Thơ cúi xuống màn hình. Qua chế độ ban đêm, căn phòng hiện ra đúng bản chất của nó: những vệt mờ của đồ đạc nhà người khác, xếp chồng lên một khoảng sân phơi trống trơn.

Em đứng dậy, bước theo giọng bạn, từng bước một, ra khỏi cửa. Rồi em ôm chặt lấy bạn, run bần bật.

**Chỉ số:** Tỉnh táo -10 · Tin cậy +10

**Cờ:** tho_ra

---

### Chiếc điện thoại ở lại · 04:10
<sub>`n7B_nua`</sub>

Út Thơ nghe thấy bạn, nhưng chậm, như người đang mơ. Em đứng dậy, đi ra, và để quên chiếc điện thoại trên mâm cơm.

Cửa 509 đóng lại sau lưng em. Livestream vẫn chạy, giờ quay từ bên trong căn phòng: năm cái bát, một chiếc ghế trống, một chiếc áo xanh.

Út Thơ sờ túi quần, mặt tái mét. “Đồ của em… em để quên rồi.”

**Chỉ số:** Tỉnh táo -15 · Tin cậy -5

**Manh mối:** (Hiếm) Điện thoại của Út Thơ bị bỏ quên trong căn 509 và vẫn livestream từ bên trong.

**Cờ:** tho_ra, tho_de_dien_thoai

---

### Trả đồ · 04:12
<sub>`n7C`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn đứng ở ngưỡng cửa, không bước qua, mở biên bản và đọc to. “Tủ gỗ: 01, của căn 304. Giường sắt: 01, của căn 207. Quạt trần: 01, của căn 304.”

Mỗi món được đọc tên, nó lại khẽ rung rồi trượt ra cửa, như người khách nhớ ra đường về.

“Kẹp tóc ngôi sao: 01, của Út Thơ. Em ấy chỉ ở tạm, không phải người nhà này.” Út Thơ chớp mắt như vừa tỉnh ngủ, rồi bước ra.

Còn một món. Bạn nhìn sang chị Trâm. “Búp bê vải: 01, của căn 502.”

Chị Trâm ôm chặt con Bông rất lâu. Rồi chị bước sang căn 502, đặt nó lên bậu cửa sổ, đúng chỗ năm 1998 chị để nó lại. “Lần này chị đi thật đấy, Bông.”

**Chỉ số:** Tỉnh táo -10 · Tin cậy +15 · Độ neo -10

**Manh mối:** Đọc to biên bản cho căn 509 nghe, đồ đạc tự trả về chủ. Chị Trâm để con Bông lại căn 502.

**Cờ:** tho_ra, tra_bong

---

### Họp phụ huynh · 04:15
<sub>`giua_78`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Anh Phát ngồi bệt ở đầu cầu thang, điện thoại sáng trên tay. Tin nhắn của con gái gửi từ tối qua: “Bố ơi mai bố đi họp phụ huynh cho con nha. Cô bảo con được khen.”

“Em biết hết về anh rồi,” anh nói, không ngẩng lên. “Nếu sáng nay anh bị gọi lên làm việc thì ai đi họp cho con bé?”

**Lựa chọn:**

- A. “Anh tự khai đi. Em hứa sẽ nói rõ hoàn cảnh của anh.” → `giua_78_hua`
- B. Ngồi xuống cạnh anh, không nói gì → `giua_78_im`

---

### Lời hứa · 04:17
<sub>`giua_78_hua`</sub>

Anh Phát nhìn bạn, gật đầu rất chậm. “Ừ. Để anh nghĩ.” Anh tắt màn hình. Ảnh con bé vụt tắt, nhưng anh vẫn nắm chặt điện thoại như nắm tay con.

**Chỉ số:** Tin cậy +5

**Cờ:** hua_phat

---

### Im lặng · 04:16
<sub>`giua_78_im`</sub>

Hai người ngồi cạnh nhau một lúc. Ở dưới sân, đèn xe của đội phá dỡ quét qua ô cửa cầu thang. Bạn thấy đầu óc tỉnh táo lại, như vừa được thở.

**Chỉ số:** Tỉnh táo +5

---

### NÚT 8 · Bản vẽ nào · 04:20
<sub>`nut8`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Ông Kha kể, giọng chậm rãi: “Năm bảy chín có hai bản vẽ. Bản thiết kế có căn 509, phòng sinh hoạt chung, chín mét rưỡi. Thiếu gạch nên cắt đi. Bản hoàn công thì không có. Sau này nhà 502 quây khoảng sân phơi ấy lại thành chuồng cọp.”

Bạn chợt hiểu: chiếc chuồng cọp 9,6 m² chính là chỗ của căn 509 chưa từng được xây.

Phần mềm đang đối chiếu toàn bộ nhà B4 theo bản thiết kế, bản có căn 509. Trước giờ chốt sổ, bạn phải chọn bản vẽ chuẩn.

---

### Đối chiếu · 04:22
<sub>`p8`</sub>

Không có đồng hồ. Hãy đọc kỹ từng khung tên, nhật ký phần mềm và số đo của chính bạn. Mở Sổ tay nếu cần đối chiếu manh mối cũ.

**Ký hiệu trên bản vẽ:**

- Khung tên bản A: “Bản vẽ thiết kế kỹ thuật, tháng 3/1979. Chưa thi công.” Có dấu đỏ của viện thiết kế.
- Khung tên bản B: “Bản vẽ hoàn công, tháng 12/1979. Đã nghiệm thu, đưa vào sử dụng.” Có chữ ký của ban nghiệm thu.
- Căn 509 trên bản A: “Phòng sinh hoạt chung, 9,6 m².” Bị gạch chéo đỏ, ghi chú tay: “cắt giảm, thiếu vật tư”.
- Nhật ký: bản A được tải lên lúc 22:05, từ thiết bị KĐ-02, đăng nhập bằng tài khoản Nghiêm Bảo Trâm. (Theo biên bản căn 207, máy KĐ-02 là tablet của trưởng nhóm.)
- Số đo đêm nay của bạn: tổng 1.852,2 m². Có 9,6 m² không khớp với bất kỳ bản vẽ nào. Mọi số đo đều có chữ ký số của bạn.

**Lựa chọn:**

- Đặt bản B (hoàn công 1979) làm chuẩn → `n8_ok`
- Giữ bản A (thiết kế): căn 509 hợp lệ, không ai phải giải trình → `n8_thiet_ke`
- Dùng số đo đêm nay của bạn: mới nhất, chính xác nhất, có chữ ký của bạn → `sai_so`

---

### Hoàn công · 04:26
<sub>`n8_ok`</sub>

Bạn đặt bản hoàn công làm chuẩn. Phần mềm chạy lại phép đối chiếu: “Căn 509: không tồn tại.” Cuối hành lang, cánh cửa 509 mỏng đi như tờ giấy can, nhìn xuyên qua được.

Bạn quay sang anh Phát. Không cần hỏi. Anh tự nói: “Máy KĐ-02 là của anh. Anh đăng nhập bằng tài khoản chị Trâm vì máy chị ấy để quên mật khẩu trên giấy nhớ. Bản thiết kế có căn 509 chín mét sáu, thì con số chuồng cọp anh ký năm 2016 sẽ khớp với thiết kế gốc. Anh chỉ muốn số liệu khớp.”

Chị Trâm nhắm mắt. “Tôi soạn phương án dựa trên con số ấy. Tôi không hỏi nó từ đâu ra. Tôi không muốn biết.”

**Chỉ số:** Độ neo -10 · Tỉnh táo -5

**Manh mối:** Anh Phát tải bản thiết kế 1979 lên lúc 22:05 bằng tablet KĐ-02, dùng tài khoản của chị Trâm, để con số 9,6 m² "khớp thiết kế gốc".

**Cờ:** ban_ve_dung

---

### Thiết kế · 04:25
<sub>`n8_thiet_ke`</sub>

Bạn giữ nguyên bản thiết kế. Phần mềm chạy lại: “Căn 509: hợp lệ. 9,6 m². Chưa có chủ hộ.”

Anh Phát thở phào. Chị Trâm không nói gì. Cuối hành lang, cánh cửa 509 dày thêm, sơn xanh mới tinh, ổ khóa sáng loáng. Bên trong vọng ra tiếng ai đó dọn thêm một cái bát.

Bạn nhận ra mình vừa ký một thứ, dù không cầm bút.

**Chỉ số:** Độ neo +15 · Tin cậy +5

**Manh mối:** (Hiếm) Giữ bản thiết kế 1979: căn 509 trở thành căn hộ hợp lệ, "chưa có chủ hộ".

**Cờ:** ban_ve_thiet_ke

---

### NÚT 9 · Mười hai nghìn người xem · 04:32
<sub>`nut9`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Hành lang tầng 5 bắt đầu dài ra. Mỗi lần bạn chớp mắt, cánh cửa 509 lại lùi xa thêm một bước. Bóng đèn trần nối nhau tắt dần.

Út Thơ giơ điện thoại lên. Số người xem nhảy liên tục: 12.408, rồi 15.000, rồi 21.000.

Bình luận chạy dày đặc: “Bản vẽ nào đúng?”, “Ai ký 9,6 mét vuông?”, “Nói đi chị ơi!!!”

Ông Kha nói khẽ: “Nhà này tin cái gì nhiều người cùng nhìn thấy. Hồi xưa cả dãy cùng ký một tờ giấy là nó đứng vững bốn mươi năm.”

**Đồng hồ:** 30 giây (Hành lang đang dài ra). Hết giờ → `n9_het_gio`

**Lựa chọn:**

- A. Tắt livestream để giữ thể diện cho anh Phát, chị Trâm, và cho chính bạn → `ngoai_khung_hinh`
- B. Đưa điện thoại cho chị Trâm, để chị tự nói ra → `n9_tram_im` (Tin cậy ≥ 60) / `n9_tram_im`
- C. Cầm điện thoại, nói rõ trước mọi người: bản vẽ nào đúng, con số nào sai, ai đã ký → `n9_cong_khai`

---

### Nhiễu · 04:34
<sub>`n9_het_gio`</sub>

Bạn chần chừ quá lâu. Màn hình livestream nhiễu sọc, số người xem nhảy lung tung, bình luận biến thành những dãy ký tự vô nghĩa.

Đèn pin tối thêm một nấc. Bạn giật lấy điện thoại, giọng khàn đặc.

**Chỉ số:** Tỉnh táo -10 · Pin -1

---

### Trước mọi người · 04:36
<sub>`n9_cong_khai`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn nhìn thẳng vào ống kính và nói chậm, rõ từng con số. Chuồng cọp đã tháo năm 2016. Con số 9,6 m² được ký khống. Bản thiết kế 1979 bị tải lên lúc 22:05 từ tablet KĐ-02.

Bình luận chậm lại. Rồi một dòng: “Cảm ơn chị đã nói thật.” Rồi hàng trăm dòng giống thế.

Cánh cửa 509 ở cuối hành lang rung lên như một tấm phông bị gió thổi.

**Chỉ số:** Độ neo -20 · Tin cậy -10

**Cờ:** cong_khai

---

### Lời tự thú · 04:36
<sub>`n9_tram`</sub>

Chị Trâm cầm điện thoại, hít một hơi thật sâu. “Tôi là cán bộ hội đồng bồi thường. Tôi đã soạn một phương án có con số sai. Tôi biết nó sai. Tôi làm vậy vì mẹ tôi đang ở một phòng trọ mười hai mét vuông.”

Chị kể về con búp bê, về chiếc chuồng cọp, về những đêm Tết ngồi xem pháo hoa. Chị không khóc. Người xem khóc thay chị.

Bình luận không còn hỏi “Ai ký?” nữa. Chúng hỏi: “Mẹ chị ở đâu? Em giúp được không?”

Cánh cửa 509 ở cuối hành lang mỏng dần, như một lời nói dối không còn ai tin.

**Chỉ số:** Độ neo -25 · Tin cậy +10

**Manh mối:** (Hiếm) Chị Trâm tự thú trên livestream. Người xem quay sang hỏi cách giúp mẹ chị.

**Cờ:** tram_tu_thu

---

### Không nói được · 04:37
<sub>`n9_tram_im`</sub>

Chị Trâm cầm điện thoại, môi mấp máy, nhưng không ra tiếng. Mười mấy nghìn ánh mắt đè lên chị như một bức tường.

“Tôi… không làm được,” chị thì thào, rồi trả điện thoại cho bạn.

Bạn nói thay chị, từng con số một. Phải nói hai lần mới đủ, vì lần đầu giọng bạn vỡ.

**Chỉ số:** Độ neo -15 · Tỉnh táo -5 · Tin cậy -5

**Cờ:** cong_khai

---

### Phần không có trong hồ sơ · 04:40
<sub>`ket_man3`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn bước lên một bước để nhìn rõ cánh cửa 509. Rồi một bước nữa. Khi bạn quay lại, cả nhóm đã ở rất xa phía sau, nhỏ như những con số trên bản vẽ.

Tablet báo: “Tổng diện tích sàn: 1.852,2 m².” Căn 509 đã mỏng như tờ giấy can, nhưng vẫn còn dư 9,6 m², và bạn hiểu ra đó là gì: chính đoạn hành lang bạn đang đứng. Nó đang dài ra.

Phía xa, Út Thơ giơ điện thoại về phía bạn. Trên màn hình livestream, hành lang trống trơn. Một dòng bình luận trôi qua: “Chị áo xanh đâu rồi?”

Bạn không xuất hiện trong khung hình nào, vì bạn đang đứng ở phần diện tích không có trong bất kỳ hồ sơ nào.

Bạn nhớ lời mẹ: xong việc thì về luôn, đừng nán lại. Bạn chưa xong việc.

Hai mươi phút nữa, tablet sẽ rung lần thứ ba.

---

### 💀 KẾT THÚC: Căn hộ mẫu
<sub>`can_ho_mau`</sub>

Ba bước. Sàn ấm, đèn vàng, mùi cơm mới. Út Thơ đưa cho bạn một cái bát. Bạn ngồi xuống chiếc ghế có vắt áo xanh, và nó vừa khít.

Một năm sau, nhà mẫu của tòa tái định cư 30 tầng mở cửa đón khách. Ở góc trưng bày “Căn hộ hoài cổ, phong cách tập thể 9,6 m²” có hai ma-nơ-canh ngồi bên mâm cơm, một mặc áo khoác xanh.

Khách tham quan khen người làm mô hình khéo tay quá, trông cứ như người thật.

---

### 💀 KẾT THÚC: Sai số
<sub>`sai_so`</sub>

Phần mềm nhận số đo của bạn làm chuẩn: mới nhất, chính xác nhất, có chữ ký số. Nhà B4 được chốt sổ theo đúng từng milimét bạn đo đêm nay, kể cả 9,6 m² không thuộc về đâu.

Tòa tái định cư 30 tầng được thiết kế lại từ bộ số liệu ấy. Tầng nào cũng có một khoảng 9,6 m² không cửa, không lối vào, không ai mua được.

Trên bản vẽ, khoảng trống ấy được đánh dấu bằng mã khảo sát của bạn. Kỹ sư đời sau gọi nó là “sai số đêm cuối”.

---

### 💀 KẾT THÚC: Ngoài khung hình
<sub>`ngoai_khung_hinh`</sub>

Màn hình tắt. Không còn ai nhìn. Anh Phát thở phào, chị Trâm cúi đầu cảm ơn bạn. Hành lang thôi dài ra.

Nhưng khi mọi người quay lưng đi xuống cầu thang, không ai gọi bạn theo. Không ai nhớ ra là thiếu một người.

Lúc 5 giờ, Út Thơ mở lại livestream để chào khán giả. Khung hình là một hành lang trống. Dòng bình luận cuối cùng: “Chị áo xanh đâu rồi?”

---
