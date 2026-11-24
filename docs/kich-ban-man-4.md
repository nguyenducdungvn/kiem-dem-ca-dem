# KIỂM ĐẾM CA ĐÊM · NHÀ B4
## Kịch bản Màn 4: CHỐT SỔ (05:00 – 07:30) · màn cuối · v1.0.0

> **Đã dựng vào game.** File này được xuất từ `js/story-act4.js`.

---

## Bước A: Đúc rút từ Màn 3

**Điểm cần cải thiện: Tỉnh táo bị rút quá mạnh.** Ở Màn 3, rất nhiều nhánh chết vì "Đo mãi" (cạn Tỉnh táo) chứ không vì một lựa chọn sai rõ ràng. Người chơi sẽ thấy cái chết ấy bất công.

**Cách áp dụng trong Màn 4:**
- Mở màn bằng cuộc gọi cho mẹ: Tỉnh táo +15 (hoặc +5 nếu chỉ nhắn tin). Đây vừa là nhịp thở, vừa là phần thưởng cảm xúc.
- Ở Màn 4, chỉ có lựa chọn sai rõ ràng mới dẫn tới chết. Chọn sai mốc đo chỉ bị trừ Tỉnh táo rồi cho làm lại.
- Màn cuối gom các mạch cảm xúc: mỗi nhân vật có một đoạn kết riêng, tùy theo cờ bạn đã bật.

## Bước B: Cái kết được đề xuất

**Ý tưởng chính: "Ghi chính mình vào hồ sơ".** Người chơi đang mắc kẹt trong 9,6 m² không thuộc bản vẽ nào. Cách duy nhất để ra là làm đúng nghề của mình:
1. đo khoảng không ấy từ một mốc cố định có từ năm 1979;
2. ghi trung thực rằng 9,6 m² là sai lệch, không thuộc hộ nào;
3. ký tên với tư cách người lập biên bản.

Đoạn hành lang co lại, và người chơi xuất hiện trở lại trên livestream. Tổng diện tích trở về đúng 1.842,6 m², con số lúc 22:47.

**Cái kết trọn vẹn:** tòa tái định cư mới có thêm một **phòng sinh hoạt chung 9,6 m² ở tầng 5, tên là "Phòng B4"**. Căn 509 năm 1979 chưa từng được xây cuối cùng cũng được xây, trên tường treo 40 tờ phiếu bàn giao, và ông Kha giữ chìa khóa. Chủ đề khép lại: *phát triển và ký ức không loại trừ nhau, nếu việc bàn giao được làm trung thực.*

**Điểm trung thực** (0–6) tính từ các cờ: `ghi_su_that`, `ban_ve_dung`, (`cong_khai` hoặc `tram_tu_thu`), `kha_viet_phieu`, `tra_bong`, (không `nhan_phan_chia` hoặc đã nói công khai). Cái kết trọn vẹn cần điểm ≥ 4 **và** cho ông Kha kể chuyện.

## Sơ đồ nhánh

```
het_man3 → m4_mo (05:00, con số thay theo nhánh: 1.871,4 hoặc 1.852,2)
   A gọi mẹ (+15 TT) | B nhắn mẹ (+5 TT)
→ NÚT 10 Mốc (⏱25 giây → n10_sai)
   A đo từ cửa 509 → 💀 Mốc trôi
   B bản vẽ → p10 (⏱45 giây): M2 mốc 1979 → n10_ok | M1 → 💀 Mốc trôi | M3/M4 → n10_sai → p10
   C đo từ chỗ đứng → n10_sai → p10
→ NÚT 11 Chốt sổ (không đồng hồ)
   A ghi 9,6 vào căn 502 → n11_khop → ket_o_lai → Kết cuối: Người ở lại
   B ghi đúng, ký là người lập biên bản → n11_that (1.842,6 m², xuất hiện lại trên livestream)
   C không ký → 💀 Tắt đèn
→ NÚT 12 Bàn giao chìa khóa (06:52, ⏱30 giây → thủ tục)
   A thủ tục → n12_thu_tuc
   B năm phút cho ông Kha kể 40 câu chuyện → n12_ke
   C lén giữ một chìa khóa → 💀 Chiếc chìa khóa giữ lại
→ ket_cuoi (07:30 + một năm sau: số phận mẹ, anh Phát, chị Trâm, con Bông, Út Thơ, ông Kha, người chơi)
→ het_man4: Bàn giao trọn vẹn / Ký ức được kể / Hồ sơ đúng / Người ở lại
→ Màn hình cảm ơn: góp ý (GitHub Issues điền sẵn), đăng ký nhận truyện mới, mời cà phê, chọn màn
```

**Kiểm thử tự động toàn game** (có gộp trạng thái trùng): 4.258.271 trạng thái, **27/27 kết thúc đều tới được**, 0 lỗi. Toàn game có 27 manh mối và 10 luật.

---

## Toàn văn kịch bản Màn 4

### Lần thứ ba · 05:00
<sub>`m4_mo`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Tablet trong tay bạn rung lên lần thứ ba.

Đồng bộ dữ liệu thất bại. Tổng diện tích sàn nhà B4: 1.852,2 m². Sai lệch so với hồ sơ: +9,6 m². Trạng thái: không thể chốt sổ.

Không phải con số bạn đã thấy sáu tiếng trước. Một phần ba của nó. Những gì bạn chọn đêm nay đã thay đổi buổi sáng này.

Lần này bạn nhớ hết. Bạn biết mình đang đứng ở đâu: trong 9,6 m² không thuộc về bản vẽ nào. Phía sau, rất xa, Út Thơ vẫn giơ điện thoại. Bình luận: “Chị áo xanh đâu rồi?”

Điện thoại của bạn rung. Tin nhắn của mẹ, 4:59: “Con về chưa?”

**Lựa chọn:**

- A. Gọi cho mẹ, dù chỉ một phút → `m4_goi_me`
- B. Nhắn: “Con sắp xong rồi mẹ” → `m4_nhan_me`

---

### Giọng mẹ · 05:01
<sub>`m4_goi_me`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Chuông đổ một hồi, mẹ nghe máy. Sóng chập chờn như gọi từ rất xa.

“Mẹ dặn rồi mà. Xong việc thì về luôn, đừng nán lại.” Mẹ cười, tiếng cười khàn vì thuốc. “Nhưng mà phải xong việc đã, con nhỉ. Mẹ biết tính con.”

Cúp máy, tay bạn thôi run. Bạn nhìn lại hành lang bằng con mắt của một kỹ sư trắc địa: muốn ghi một khoảng không vào hồ sơ thì trước hết phải đo được nó.

**Chỉ số:** Tỉnh táo +15

---

### Sắp xong · 05:01
<sub>`m4_nhan_me`</sub>

Mẹ gửi lại một biểu tượng trái tim, rồi một dòng: “Làm cho đúng nhé con.”

Bạn hít một hơi thật sâu. Muốn ghi một khoảng không vào hồ sơ thì trước hết phải đo được nó.

**Chỉ số:** Tỉnh táo +5

---

### NÚT 10 · Mốc · 05:04
<sub>`nut10`</sub>

Hành lang dài ra sau mỗi lần bạn chớp mắt. Cánh cửa 509 ở cuối trông gần mà không bao giờ tới.

Một kỹ sư trắc địa không đo từ thứ đang chuyển động. Bạn cần một mốc.

**Đồng hồ:** 25 giây (Hành lang đang dài ra). Hết giờ → `n10_sai`

**Lựa chọn:**

- A. Đo từ cánh cửa 509 trước mặt: gần nhất, rõ nhất, ngắm một phát là xong → `moc_troi`
- B. Mở bản vẽ, tìm một mốc cố định để đo → `p10`
- C. Đo từ chính chỗ mình đứng, rồi cộng dần từng đoạn → `n10_sai`

---

### Số không đứng yên · 05:06
<sub>`n10_sai`</sub>

Bạn bấm laser. 3,20 m. Bấm lại: 3,74 m. Lần nữa: 4,31 m. Chỗ bạn đứng cũng đang trôi, cùng với cả đoạn hành lang.

Đầu bạn quay cuồng. Bạn phải tìm một thứ đã đứng yên từ trước khi đêm nay bắt đầu.

**Chỉ số:** Tỉnh táo -15

---

### Bốn mốc · 05:07
<sub>`p10`</sub>

Chạm vào từng mốc để xem kết quả ba lần đo liên tiếp, rồi chọn mốc gốc.

**Đồng hồ:** 45 giây (Hành lang đang dài ra). Hết giờ → `n10_sai`

**Ký hiệu trên bản vẽ:**

- M1 · Cánh cửa 509. Ba lần đo: 14,2 m, rồi 15,8 m, rồi 17,1 m. Mốc này đang trôi.
- M2 · Mốc cao độ sơn đỏ ở chân tường chiếu nghỉ: “▽ +15,00 · 1979”. Có trong bản vẽ hoàn công. Ba lần đo tới mép đoạn lạ: 3,20 m, 3,20 m, 3,20 m.
- M3 · Chỗ bạn đang đứng. Không có trong bản vẽ nào. Đo từ đây, con số nào cũng vừa đúng vừa sai.
- M4 · Mã phấn KĐ-501 ✓ bạn viết lúc 2 giờ sáng. Cánh cửa có trong hoàn công, nhưng phấn thì quệt tay là mờ. Ba lần đo: 9,1 m, 9,3 m, 9,6 m.

**Lựa chọn:**

- Lấy M1 làm mốc → `moc_troi`
- Lấy M2 làm mốc → `n10_ok`
- Lấy M3 làm mốc → `n10_sai`
- Lấy M4 làm mốc → `n10_sai`

---

### Chín phẩy sáu, lần cuối · 05:09
<sub>`n10_ok`</sub>

Bạn đặt chân máy ngay trên mốc sơn đỏ năm 1979, nơi những người thợ đầu tiên của nhà B4 đã đánh dấu. Bấm laser. Đoạn hành lang lạ dài đúng 3,20 m, rộng đúng 3,00 m.

Chín phẩy sáu mét vuông. Lần này con số đứng yên.

Hành lang thôi dài ra. Nó chờ bạn ghi.

**Chỉ số:** Tỉnh táo -5

**Manh mối:** Đo từ mốc cao độ 1979: đoạn hành lang không có trong hồ sơ rộng đúng 3,20 × 3,00 = 9,6 m².

---

### NÚT 11 · Chốt sổ · 05:10
<sub>`nut11`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Phần mềm mở ô cuối cùng: “Ghi chú cho phần diện tích chênh lệch: 9,6 m². Sau khi ký, số liệu sẽ được chốt và không thể sửa.”

Từ rất xa, bạn nghe giọng anh Phát vọng lại: “Ghi vào 502 đi em, như cũ! Thế là khớp hết!” Rồi giọng chị Trâm, khẽ hơn: “Em cứ ghi điều em biết.”

Ngón tay bạn đặt trên màn hình. Đây là lần ký cuối cùng của đêm nay.

**Lựa chọn:**

- A. Ghi 9,6 m² vào căn 502 như phương án cũ: mọi con số khớp, không ai phải giải trình nữa → `n11_khop`
- B. Ghi đúng: “9,6 m² sai lệch, không thuộc hộ nào, đề nghị loại khỏi phương án”, rồi ký với tư cách người lập biên bản → `n11_that`
- C. Không ký: để phiên đồng bộ tự hủy, hoãn mọi thứ đến khi có người khác quyết → `tat_den`

---

### Khớp · 05:12
<sub>`n11_khop`</sub>

Bạn ghi 9,6 m² vào căn 502 và ký. Tablet hiện dấu tích xanh: “Đồng bộ thành công. Số liệu khớp hồ sơ.”

Hành lang thôi dài ra. Nhưng nó cũng không ngắn lại. Bạn bước về phía cả nhóm, một bước, hai bước. Khoảng cách vẫn y nguyên.

Bạn đã ghi đoạn hành lang này vào hồ sơ. Và bạn đang đứng trên nó.

**Cờ:** chot_khop

---

### Người lập biên bản · 05:13
<sub>`n11_that`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Bạn gõ từng chữ: “9,6 m² sai lệch, không thuộc hộ nào. Nguồn gốc: căn 509 trên bản thiết kế 1979, chưa từng được xây. Đề nghị loại khỏi phương án bồi thường.”

Ô cuối cùng: “Người lập biên bản.” Bạn ký tên mình, kèm chức danh: kỹ sư trắc địa, người kiểm đếm ca đêm nhà B4. Lần đầu tiên trong đêm, bạn ghi chính mình vào hồ sơ.

Đoạn hành lang co lại như một tấm thước dây được thả tay. Ba mét hai, hai mét, một mét. Bạn bước một bước và đã đứng ở chiếu nghỉ, ngay cạnh mốc sơn đỏ.

Út Thơ hét lên: “Chị áo xanh kìa!” Trên livestream, hàng nghìn dòng bình luận cùng lúc: “Thấy chị rồi!!!”

Tablet: “Đồng bộ thành công. Tổng diện tích sàn nhà B4: 1.842,6 m². Khớp hồ sơ.” Đúng con số lúc 22:47 tối qua.

**Chỉ số:** Độ neo -20 · Tỉnh táo +10

**Cờ:** chot_that

---

### NÚT 12 · Bàn giao chìa khóa · 06:52
<sub>`nut12`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Trời hửng sáng. Sân nhà B4 đã dựng xong rạp đỏ, loa đài, hàng ghế nhựa. Chiếc máy xúc màu vàng đỗ sát chân tường hồi. Người của ban quản lý dự án cầm sẵn tập hồ sơ.

“Bác Kha bàn giao chùm chìa khóa là xong thủ tục, mình kịp giờ lễ,” anh ấy nói, mắt nhìn đồng hồ.

Ông Kha đứng giữa sân, chùm bốn mươi chiếc chìa khóa trong tay. Ông không nhìn người của ban quản lý. Ông nhìn bạn.

**Đồng hồ:** 30 giây (Lễ khởi công sắp bắt đầu). Hết giờ → `n12_thu_tuc`

**Lựa chọn:**

- A. Bàn giao đúng thủ tục: nhận chùm chìa khóa, ký biên bản, kịp giờ lễ → `n12_thu_tuc`
- B. Xin ban tổ chức năm phút để ông Kha kể cho mọi người nghe về bốn mươi căn hộ trước khi trao chìa khóa → `n12_ke`
- C. Lén giữ lại một chiếc chìa khóa cho ông Kha làm kỷ niệm: ông xứng đáng có nó → `chia_khoa_giu_lai`

---

### Thủ tục · 06:58
<sub>`n12_thu_tuc`</sub>

Ông Kha trao chùm chìa khóa. Người của ban quản lý đếm nhanh: bốn mươi. Ký. Đóng dấu. Kịp giờ.

Ông Kha gật đầu với bạn, lịch sự như với một người lạ, rồi đi ra cổng, dáng thẳng như hồi còn trong quân ngũ.

**Cờ:** ban_giao_thu_tuc

---

### Năm phút · 07:00
<sub>`n12_ke`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Người của ban quản lý ngần ngừ, rồi gật đầu. Ông Kha bước lên bục. Ông cầm từng chiếc chìa khóa lên, đọc số căn, và kể một chuyện ngắn.

“101: nhà bà Tư, nấu chè bán cả khu. 207: thằng bé nhà ấy giờ là bác sĩ. 304: hai vợ chồng giáo viên, Tết nào cũng viết câu đối. 502: con bé Trâm, hay ngồi trong chuồng cọp xem pháo hoa…”

Bốn mươi chiếc chìa khóa, bốn mươi câu chuyện. Út Thơ quay lại toàn bộ. Những người dự lễ đứng lặng. Người của ban quản lý gấp tập hồ sơ lại, lắng nghe.

Khi chiếc chìa khóa cuối cùng được trao, bạn nghe nhà B4 thở ra một hơi rất dài, nhẹ như gió sớm qua một khung cửa không còn cánh.

**Cờ:** ban_giao_ke

---

### Bàn giao · 07:30
<sub>`ket_cuoi`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Lễ khởi công bắt đầu đúng 7 giờ. Phát biểu, cắt băng, tiếng gầu máy xúc chạm vào bức tường hồi đầu tiên. Bụi vôi vàng bay lên trong nắng sớm.

— Một năm sau —

Tiền thưởng hợp đồng về tài khoản sáng thứ Ba. Mẹ được mổ vào thứ Tư. Giờ mẹ đã đi chợ được, và lần nào bạn đi làm ca đêm, mẹ cũng nhắn: “Xong việc thì về luôn nhé.”

Anh Phát bị kỷ luật sau đợt thanh tra. Anh chuyển công tác. Thỉnh thoảng anh gửi cho bạn ảnh con gái mặc đồng phục, không kèm lời nào.

Chị Trâm vẫn làm ở hội đồng bồi thường. Chị không bao giờ nhắc lại con số 9,6.

Út Thơ đi làm thêm hai việc để đủ học phí kỳ sau. Em không livestream nữa.

Ông Kha về ở với cháu ở ngoại thành. Sáng nào ông cũng đạp chiếc xe Phượng Hoàng ra đứng ngoài hàng rào công trường, đếm từng tầng sàn mới đổ.

Còn bạn vẫn đi đo đạc cho những khu nhà sắp được thay áo mới. Trước mỗi ca, bạn lật mặt sau của từng phiếu bàn giao và đọc kỹ mục “Lưu ý cho người đến sau”.

Đôi khi có phiếu để trống. Bạn luôn viết thêm một dòng: “Đo từ mốc cố định. Ghi điều mình biết. Xong việc thì về.”

---

### Người ở lại · 07:30
<sub>`ket_o_lai`</sub>

Lễ khởi công bắt đầu đúng 7 giờ. Không ai thấy một kỹ sư trắc địa mặc áo khoác xanh đứng ở cửa sổ tầng 5 vẫy tay.

Khi gầu máy xúc chạm vào tầng 5, nó dừng lại ở một khoảng không rộng đúng 9,6 m². Máy xúc chết máy. Đổi máy khác, cũng chết máy.

Tòa tái định cư 30 tầng được điều chỉnh thiết kế để chừa ra khoảng ấy. Trong hồ sơ, nó có diện tích, có chữ ký, có người lập biên bản. Chỉ không có ai bước vào được.

Mỗi tối thứ Tư, mẹ bạn ra đứng dưới chân tòa nhà mới, nhìn lên tầng 5, và nhắn vào một số điện thoại không còn ai đọc: “Con về chưa?”

---

### 💀 KẾT THÚC: Mốc trôi
<sub>`moc_troi`</sub>

Bạn ngắm laser vào cánh cửa 509. 14,2 m. Bạn bước tới, đo lại: 15,8 m. Bước tiếp: 17,1 m.

Bạn đi mãi về phía một cánh cửa đang lùi xa, như người đuổi theo đường chân trời. Phía sau, chiếu nghỉ tầng 5 nhỏ dần thành một chấm sáng rồi tắt.

Trong sổ tay của đội phá dỡ có một dòng ghi chú: “Hành lang tầng 5 nhà B4: không đo được chiều dài. Đề nghị không cử người vào.”

---

### 💀 KẾT THÚC: Chiếc chìa khóa giữ lại
<sub>`chia_khoa_giu_lai`</sub>

Bạn lén tháo một chiếc chìa khóa khỏi chùm, nhét vào túi áo ông Kha. Ông không biết. Người của ban quản lý đếm vội rồi ký: “Bốn mươi.” Không ai đếm lại.

Tối hôm ấy, ông Kha về nhà cháu ở ngoại thành, tra chìa vào ổ khóa căn phòng mới. Cánh cửa mở ra căn 301: tấm ván bốn mươi móc, chiếc ghế gỗ, chiếc xe đạp Phượng Hoàng.

Đồ nhà nào trả về nhà nấy. Nhà B4 đã đi theo chiếc chìa khóa cuối cùng còn chưa được trả.

---
