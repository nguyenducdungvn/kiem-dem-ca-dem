# KIỂM ĐẾM CA ĐÊM · NHÀ B4
## Kịch bản Màn 1: BÀN GIAO (bản dựng v0.3.0)

> Tài liệu này được xuất tự động từ `js/story-act1.js`. Khi sửa truyện, hãy sửa file `.js` rồi chạy lại `node tools/export.js`.

---

## 1. Bối cảnh (cập nhật theo thực tế 2026)

| Yếu tố thực tế | Cách đưa vào game |
|---|---|
| Các thành phố lớn đang đẩy nhanh giải phóng mặt bằng và cải tạo hàng loạt khu tập thể cũ | Nhà B4 bị xếp nguy hiểm cấp D, 7 giờ sáng thứ Hai làm lễ khởi công tòa tái định cư 30 tầng |
| Hộ không phối hợp sẽ bị **cưỡng chế kiểm đếm bắt buộc** | Ông Kha là hộ cuối cùng. Đêm nay là đêm kiểm đếm bắt buộc |
| Bồi thường căn hộ chung cư theo **hệ số K** (tối đa 2 lần diện tích sử dụng hợp pháp) | Mỗi m² hợp pháp nhân đôi, nên **số đo là quyền lợi**. Đây là động cơ gian lận "cơi nới" (Màn 2) |
| Số liệu được cập nhật lên **phần mềm theo dõi GPMB** | Tablet tự đồng bộ diện tích. Hạn chốt dữ liệu là 5:00 sáng |
| Tái định cư tại chỗ, nhiều hình thức lựa chọn | Ông Kha ở lại không vì tiền. Ông muốn trí nhớ của tòa nhà được bàn giao đàng hoàng |

**Giọng điệu chủ đề:** Game không chống lại sự phát triển. Câu hỏi của nó là: *đi lên thì phải bàn giao trung thực.* Tòa nhà chỉ chịu buông khi mọi thứ được ghi nhận đúng.

## 2. Nhân vật

| Nhân vật | Vai trò | Bí mật / động cơ |
|---|---|---|
| **Lương Thục Anh** (người chơi) | Kỹ sư trắc địa, 26 tuổi | Cần tiền thưởng để trả viện phí cho mẹ. Đọc được bản vẽ, đo bằng laser |
| **Đoàn Vĩnh Phát** | Trưởng nhóm, 41 tuổi, cựu cán bộ phường | Lấy đồ ở các căn bỏ trống. Năm 2016 xác nhận khống phần cơi nới |
| **Mai Ngọc Thơ (Út Thơ)** | Sinh viên chụp ảnh hiện trạng, livestreamer | Camera ban đêm thấy được "trí nhớ" của căn phòng |
| **Nghiêm Bảo Trâm** | Cán bộ hội đồng bồi thường, 33 tuổi | Nhà cũ ở căn 502. Có liên quan đến con số 9,6 m² |
| **Tạ Hữu Kha** | Bảo vệ cũ, hộ cuối cùng, 63 tuổi | Giữ 40 chìa khóa nhưng chỉ có 39 phiếu. Thiếu phiếu của chính ông |

## 3. Chỉ số

| Chỉ số | Bắt đầu | Thua khi |
|---|---|---|
| Tỉnh táo | 70 | ≤ 0 → *Đo mãi* |
| Tin cậy | 50 | (≥ 60 mở lời thú nhận ở Nút 3) |
| Độ neo | 0 | ≥ 60 → *Ở lại* |
| Pin (chung) | 6 nấc | 0 → *Tắt đèn* |

## 4. Luật (phiếu bàn giao)

| Luật | Nội dung | Số hộ xác nhận |
|---|---|---|
| L1 | Đồ nhà nào để nguyên nhà nấy | 4 |
| L2 | Đừng để quên đồ của mình | 3 |
| L3 | Giờ dọn nhà: áp lưng vào tường chịu lực, đừng vào tủ | 3 |
| L4 | Đo lại phòng, lệch quá một gang tay thì đi | 2 |
| L5 | Đồng hồ còn chạy: đừng nhìn lâu, đừng lên dây | 2 |
| L6 | Ai gọi "dọn giúp một tay": đừng nhận lời | 2 |
| L7 | Muốn nhà tha thì để lại đồ của người khác | 1, không ký (của anh Phát) |
| L8 | Ai làm trái thì đèn cả nhà yếu đi | 2 |

## 5. Sơ đồ nhánh (v0.3.0)

```
cold_open (05:00, mở đầu nhảy cóc) → mo_dau_1 (22:30) → tin_nhan_me ─┬ A goi_me (+TT, cờ goi_me)
                                                                   └ B nhan_me (−TT)
→ mo_dau_2 (304) ─┬ A tho_tat_live (−TC)
                  └ B tho_giu_live (+TC, cờ tho_live)
→ NÚT 1 (23:00, ⏱20 giây → n1_het_gio → n1B)
   A lao ra cửa → 💀 Bức tường mới       (phương án chết hấp dẫn: "chỉ hai bước")
   B bản vẽ 304 (⏱30 giây) → A n1A_ok | B n1A_sai | C 💀 | D n1B
   C tủ âm tường → n1B (manh mối hiếm)
→ banh_mi (00:10, anh Phát) ─┬ A hỏi chuyện (+TC, manh mối 2016)
                             └ B ăn vội (+TT)
→ NÚT 2 (00:20, không có đồng hồ: nút chậm)
   A ném đồng hồ (lời anh Phát) → 💀 Căn hộ đi theo
   B trả về 207 → mặt đứng → đinh 2 n2A_ok | đinh 1/3 n2A_sai
   C để anh Phát giữ → n2C (cờ phat_neo_nang, manh mối hiếm)
→ NÚT 3 (01:40, ⏱25 giây → n3_het_gio, cờ tho_da_nhan_loi)
   A bản vẽ tầng 4 (⏱30 giây) → V1 n3A_ok (l7_cua_phat) | V2/V3 n3A_sai → n3A_ok
   B đổi thẻ nhân viên → 💀 Đồ để quên
   C túm cổ áo anh Phát → Tin cậy ≥ 60 ? n3B_cao (phat_thu_nhan, manh mối hiếm) : n3B_thap
→ ket_man1 (02:30) → het_man1: 3 kết màn: Lời thú nhận / Nét chữ trên kẹp tóc / Tiếng “dạ”
```

**Kiểm thử tự động:** 1.400 đường đi (tính cả hết giờ). 1.080 đường tới cuối màn, chia theo kết màn: kẹp tóc 696, tiếng dạ 292, thú nhận 92. Kết thúc chết: đồ để quên 192, đo mãi (tỉnh táo cạn) 72, căn hộ đi theo 48, bức tường mới 8. Có 13 manh mối, 3 trong đó là manh mối hiếm.

---

## 6. Toàn văn kịch bản

### Không thể chốt sổ · 05:00
<sub>`cold_open`</sub>

Tablet trong tay bạn rung lên lần thứ ba.

Đồng bộ dữ liệu thất bại. Tổng diện tích sàn nhà B4: 1.871,4 m². Sai lệch so với hồ sơ: +28,8 m². Trạng thái: không thể chốt sổ.

Bạn không nhớ mình đã nhập con số ấy. Bạn không nhớ mình đang đứng ở tầng mấy. Hành lang trước mặt dài hơn bất cứ hành lang nào của một tòa nhà năm tầng.

Trên điện thoại, livestream của Út Thơ vẫn chạy, mười hai nghìn người đang xem, nhưng khung hình chỉ là một hành lang trống. Một dòng bình luận trôi qua: “Chị áo xanh đâu rồi?”

Rồi một tin nhắn của mẹ, gửi lúc 4:59: “Con về chưa?”

Sáu tiếng rưỡi trước, mọi chuyện bắt đầu bằng một chùm chìa khóa.

---

### Chùm chìa khóa · 22:30
<sub>`mo_dau_1`</sub>

Ông Kha ngồi trên chiếc ghế nhựa trước phòng bảo vệ, chiếc áo bộ đội cũ cài kín cổ. Ông không chửi bới, cũng không ngăn cản. Ông đặt vào tay bạn một chùm chìa khóa nặng trịch: bốn mươi chiếc, mỗi chiếc buộc một mẩu vải ghi số căn. Kèm theo là một xấp phiếu bàn giao đã quăn mép.

“Ba mươi chín nhà gửi lại tôi đấy,” ông nói. “Năm tám mươi tôi dọn vào đây, cả tầng góp gạo nấu chung một nồi cháo. Phiếu nhà nào thì vào nhà ấy hẵng đọc. Đồ nhà nào trả về nhà nấy.”

Ông ngước lên nhìn bạn, lần đầu tiên trong buổi tối. “Tối nay cháu đừng để quên cái gì nhé.”

Anh Phát, trưởng nhóm, đã lên tầng 2 từ sớm. Chị Trâm bên hội đồng bồi thường ngồi gõ laptop trong chiếc ô tô đậu ngoài cổng. Út Thơ, sinh viên làm thêm phụ trách chụp ảnh hiện trạng, giơ điện thoại quay một vòng: “Live nè mọi người, đêm cuối của khu tập thể bảy mươi chín!”

Bạn đã kiểm đếm xong tầng 1 và tầng 2. Mặt sau mỗi phiếu bàn giao có một mục in sẵn: “Lưu ý cho người đến sau”. Phần lớn để trống. Vài phiếu thì không.

**Nhận luật:** L1, L2

**Manh mối:** Ông Kha giữ 40 chìa khóa nhưng chỉ có 39 phiếu bàn giao: thiếu phiếu của chính ông (căn 301).

---

### Tin nhắn thoại · 22:41
<sub>`tin_nhan_me`</sub>

Điện thoại rung trong túi áo. Một tin nhắn thoại dài 0:38 của mẹ.

“Con ăn gì chưa? Mẹ ổn, đừng lo. Bác sĩ bảo nếu đóng đủ tiền thì thứ Tư mổ được. Mà con làm đêm thì nhớ mặc áo khoác, nhà cũ lạnh lắm…” Tiếng máy đo nhịp tim tít tít đều đều ở phía sau.

Tiền thưởng hợp đồng đêm nay vừa đúng số tiền ấy.

**Lựa chọn:**

- A. Đứng lại ở chiếu nghỉ, gọi cho mẹ một phút → `goi_me`
- B. Nhắn lại: “Con đang làm, sáng con về”, rồi đi tiếp → `nhan_me`

---

### Một phút · 22:42
<sub>`goi_me`</sub>

Mẹ nghe máy ngay hồi chuông đầu, như thể đã cầm sẵn điện thoại. Hai mẹ con nói chuyện chẳng đâu vào đâu: cơm bệnh viện nhạt, bà giường bên ngáy to. Rồi mẹ dặn: “Xong việc thì về luôn, đừng nán lại.”

Cúp máy, bạn thấy lòng nhẹ hơn hẳn. Ở tầng trên, có tiếng ai đó kéo một chiếc ghế rất chậm, rồi dừng lại, như thể vừa nghe lén xong.

**Chỉ số:** Tỉnh táo +5

**Cờ:** goi_me

---

### Đã xem · 22:41
<sub>`nhan_me`</sub>

Tin nhắn hiện “Đã xem” gần như ngay lập tức. Ba dấu chấm hiện lên, biến mất, rồi lại hiện lên. Cuối cùng mẹ chỉ gửi một biểu tượng trái tim.

Bạn cất điện thoại. Lúc ngẩng lên, bạn thấy cầu thang lên tầng 3 có mười một bậc. Bạn đếm lại thì chỉ còn mười.

**Chỉ số:** Tỉnh táo -5

---

### Căn 304 · 22:47
<sub>`mo_dau_2`</sub>

Đèn pin quét qua căn 304. Có một tủ gỗ mọt, một quạt trần ba cánh và một khung ảnh gia đình đã bạc màu. Thước laser báo chiều dài phòng là 3,62 m, khớp bản vẽ hoàn công năm 1979. Bạn viết mã khảo sát bằng phấn trắng lên cửa: KĐ-304 ✓.

Tablet tự đồng bộ một dòng: Tổng diện tích sàn nhà B4: 1.842,6 m².

Út Thơ chĩa điện thoại vào góc phòng, chế độ ban đêm bật sẵn. “Chị ơi, cái tủ… trên màn hình em thấy có hai cái tủ, một cái mờ mờ nằm lệch sang bên.” Em cười gượng. “Em live để kiếm tiền trọ thôi, chứ em sợ ma lắm. Chị có tin mấy chuyện này không?”

Bạn lật phiếu bàn giao căn 304. Ở mục lưu ý, nét chữ run run dặn rằng khi nghe loa báo giờ dọn nhà thì phải áp lưng vào tường chịu lực.

**Nhận luật:** L3

**Manh mối:** Diện tích sàn ban đầu của B4: 1.842,6 m². / Camera ban đêm của Út Thơ hiện vệt mờ ở chỗ đồ đạc từng được đặt.

**Lựa chọn:**

- A. “Tắt live đi em, tập trung làm việc.” → `tho_tat_live`
- B. “Cứ live, nhưng đừng quay số nhà và mặt người. Camera của em có khi lại có ích.” → `tho_giu_live`

---

### Màn hình đen · 22:50
<sub>`tho_tat_live`</sub>

Út Thơ bĩu môi nhưng vẫn bấm tắt. “Dạ… mất hai trăm người xem rồi đó chị.” Em đút điện thoại vào túi, đi cách bạn hai bước, không nói thêm câu nào.

Chiếc loa phường ở đầu hồi khục lên một tiếng.

**Chỉ số:** Tin cậy -5

---

### Hai trăm người xem · 22:50
<sub>`tho_giu_live`</sub>

Út Thơ cười tít mắt. “Chị là người đầu tiên không chửi em vụ live đó.” Em quay camera xuống sàn gạch hoa, đọc cho người xem nghe tên từng món đồ bạn vừa kiểm đếm, giọng như dẫn chương trình.

Trên màn hình, một dòng bình luận trôi qua: “Sau lưng hai chị cái tủ vừa nhích kìa.” Út Thơ không để ý.

Chiếc loa phường ở đầu hồi khục lên một tiếng.

**Chỉ số:** Tin cậy +5

**Cờ:** tho_live

---

### NÚT 1 · Giờ dọn nhà · 23:00
<sub>`nut1`</sub>

Giọng phát thanh viên đều đều vang lên, dù dây loa đã bị cắt từ ba năm trước: “Thông báo: đã đến giờ dọn nhà. Đề nghị các hộ thu xếp đồ đạc.”

Khắp tòa nhà vang lên tiếng kéo lê đồ đạc. Ở căn 304, bức vách giáp căn 305 bắt đầu trượt về phía bạn. Gạch cọ vào nền ken két.

Cửa ra hành lang chỉ cách hai bước chân. Út Thơ đứng chết trân giữa phòng.

**Lựa chọn:**

- A. Kéo Út Thơ lao ra cửa, chỉ hai bước là thoát → `buc_tuong_moi`
- B. Mở bản vẽ hoàn công, tìm tường chịu lực để đứng → `p1`
- C. Đẩy Út Thơ vào tủ âm tường, gỗ dày trông chắc chắn nhất → `n1B`

---

### Chần chừ · 23:01
<sub>`n1_het_gio`</sub>

Bạn đứng chết lặng thêm một giây, một giây quá lâu. Bức vách ép tới sát vai. Út Thơ hét lên, giật tay bạn lôi tuột vào chiếc tủ âm tường gần nhất.

**Chỉ số:** Tỉnh táo -5

---

### Bản vẽ căn 304 · 23:00
<sub>`p1`</sub>

Vách phía đông đang trượt tới. Chạm vào từng ký hiệu để xem, rồi chọn chỗ đứng. Hãy đọc kỹ phần chú thích.

**Ký hiệu trên bản vẽ:**

- A · Tường hồi phía tây. Ký hiệu gạch chéo, dày 220.
- B · Tường giáp hành lang, có cửa ra vào. Nét đơn, dày 110.
- C · Vách giáp căn 305. Nét đơn, dày 110. Đang trượt.
- D · Tủ âm tường. Cửa gỗ, bên trong tối om.

**Lựa chọn:**

- Áp lưng vào A → `n1A_ok`
- Áp lưng vào B → `n1A_sai`
- Áp lưng vào C → `buc_tuong_moi`
- Chui vào D → `n1B`

---

### Tường hồi · 23:02
<sub>`n1A_ok`</sub>

Bạn kéo Út Thơ áp lưng vào bức tường hồi. Vữa lạnh buốt qua lớp áo. Bức vách trượt tới sát mũi giày thì dừng lại, rung lên một nhịp rồi nằm im.

Khi tiếng kéo đồ tắt hẳn, bạn đo lại căn phòng: 3,40 m. Căn phòng đã hẹp đi 22 cm. Chiếc tủ gỗ giờ nằm đúng chỗ vệt mờ trên camera của Út Thơ lúc nãy.

“Chị… sao chị biết?” Út Thơ thở dốc. “Em cứ tưởng chạy ra cửa là xong.”

Bạn lật thêm một phiếu trong xấp, phiếu căn 306. Mục lưu ý dặn phải đo lại phòng trước khi nghỉ.

**Chỉ số:** Tỉnh táo -10 · Tin cậy +10

**Nhận luật:** L4

**Manh mối:** Tòa nhà đang tự xếp đồ đạc về đúng vị trí cũ. Camera của Út Thơ báo trước được vị trí ấy.

---

### Hai bức vách · 23:02
<sub>`n1A_sai`</sub>

Bạn áp lưng vào bức tường giáp hành lang. Ngay lập tức nó cũng rung lên dưới lưng bạn, vì nó chỉ là vách 110.

Hai bức vách khép dần về một góc. Trong giây cuối, bạn kéo được Út Thơ lách sang bức tường hồi phía tây. Vai bạn trầy toạc một mảng.

Khi mọi thứ lặng đi, căn phòng chỉ còn 3,40 m. Chiếc tủ gỗ nằm đúng chỗ vệt mờ trên camera lúc nãy.

Bạn lật thêm một phiếu trong xấp, phiếu căn 306. Mục lưu ý dặn phải đo lại phòng trước khi nghỉ.

**Chỉ số:** Tỉnh táo -20 · Độ neo +5 · Tin cậy +5

**Nhận luật:** L4

**Manh mối:** Tòa nhà đang tự xếp đồ đạc về đúng vị trí cũ. Camera của Út Thơ báo trước được vị trí ấy.

---

### Tủ âm tường · 23:02
<sub>`n1B`</sub>

Hai người chen vào tủ. Cánh cửa gỗ tự khép lại sau lưng. Trong bóng tối, vai bạn cọ vào những bộ quần áo cũ còn treo sẵn, thơm mùi băng phiến và ấm như vừa có người mặc.

Ngoài kia, tiếng kéo đồ dừng ngay trước cửa tủ. Có tiếng thở rất khẽ, không phải của bạn, cũng không phải của Út Thơ. Phải ba lần cả hai cùng đạp, cánh tủ mới bật ra.

Đèn pin tối đi một nấc. Dán ở mặt trong cánh tủ là một bức tranh trẻ con vẽ cả gia đình bằng bút sáp. Bên cạnh có thêm một hình người mới, mới tô màu được một nửa. Hình người ấy mặc áo xanh giống bạn.

**Chỉ số:** Tỉnh táo -20 · Tin cậy -5 · Độ neo +15 · Pin -1

**Manh mối:** (Hiếm) Tranh sáp trong tủ căn 304: một gia đình, và một “thành viên mới” mặc áo xanh đang tô dở.

**Cờ:** vi_pham_L3

---

### Ổ bánh mì · 00:10
<sub>`banh_mi`</sub>

Anh Phát ngồi ở chiếu nghỉ tầng 2, chìa cho bạn một ổ bánh mì pa-tê đã nguội. “Ăn đi em, đêm còn dài.” Màn hình khóa điện thoại của anh là ảnh một bé gái mặc đồng phục tiểu học.

“Con bé lên lớp Sáu năm nay, trường điểm, học phí cũng điểm.” Anh cười, nếp nhăn hằn sâu dưới ánh đèn pin. “Anh ở phường hai mươi năm, khu này anh thuộc từng cái lỗ khóa.”

Túi áo khoác của anh phồng lên một cục vuông vức. Anh cứ vô thức đặt tay lên đó.

**Lựa chọn:**

- A. Hỏi anh về khu B4 ngày trước → `banh_mi_hoi`
- B. Ăn vội rồi đứng dậy làm tiếp → `banh_mi_an`

---

### Hai mươi năm · 00:14
<sub>`banh_mi_hoi`</sub>

Anh Phát kể về những cái Tết cả dãy chung nồi bánh chưng, về trận lụt năm tám lăm nước ngập tới tầng 1, về đợt phường đi tháo chuồng cọp năm 2016. “Đợt đó anh phụ trách, ký biên bản mỏi tay.”

Nói tới đó anh im bặt, như vừa lỡ lời. “Thôi, làm tiếp.”

**Chỉ số:** Tin cậy +5

**Manh mối:** Năm 2016, anh Phát phụ trách đợt tháo dỡ chuồng cọp ở B4 và ký các biên bản.

---

### Bánh mì nguội · 00:12
<sub>`banh_mi_an`</sub>

Ổ bánh mì nguội nhưng vẫn ngon. Lần đầu tiên trong đêm, tay bạn thôi run.

Anh Phát đứng dậy trước, phủi quần. Một tiếng tích tắc rất khẽ phát ra từ túi áo anh.

**Chỉ số:** Tỉnh táo +5

---

### NÚT 2 · Chiếc đồng hồ còn chạy · 00:20
<sub>`nut2`</sub>

Anh Phát lôi từ túi áo ra một chiếc đồng hồ quả lắc nhỏ lấy từ căn 207. “Đồ cổ đấy. Mang về văn phòng làm bằng chứng hộ này ở từ thời bao cấp, đền bù cao hơn cho người ta.”

Chiếc đồng hồ vẫn tích tắc. Từ lúc anh lên đây, tiếng kéo đồ đạc ở tầng 2 cũng theo lên cầu thang, mỗi lúc một gần.

Út Thơ nói khẽ: “Anh Phát ơi… áo khoác của anh có vệt mờ, y như cái tủ lúc nãy.”

Biên bản điện tử căn 207 do anh Phát nhập lúc 22:15 ghi: “Đồng hồ quả lắc treo tường: 01. Vị trí: tường đông, cách mép cửa sổ 1,20 m.”

Trong xấp phiếu, bạn thấy phiếu căn 207 và 206 có ghi lưu ý. Kẹp giữa chúng là một mẩu giấy không ghi số căn, không chữ ký. Bạn không nhớ nó có ở đó từ lúc nào.

Anh Phát nghiến răng: “Đồ đã ra khỏi căn rồi thì vứt quách ra ngoài, cho cái nhà nó khỏi theo!”

**Nhận luật:** L5, L8, L7

**Manh mối:** Biên bản 207 (anh Phát ghi): đồng hồ treo cách mép cửa sổ 1,20 m. / Diện tích sàn tăng 0,5 m² dù không ai cơi nới gì.

**Lựa chọn:**

- A. Nghe anh Phát: ném chiếc đồng hồ qua cửa sổ, cắt đứt thứ đang bám theo → `can_ho_di_theo`
- B. Mang chiếc đồng hồ trả về đúng chỗ cũ ở căn 207 → `p2`
- C. Để anh Phát giữ, cả nhóm khẩn trương làm cho xong → `n2C`

---

### Tường đông căn 207 · 00:26
<sub>`p2`</sub>

Trên tường đông có ba cái đinh. Chiếc đồng hồ trong tay bạn tích tắc nhanh dần. Hãy đo trước khi treo.

**Ký hiệu trên bản vẽ:**

- Đinh 1 · Laser: cách mép cửa sổ 0,85 m. Đinh còn mới, không gỉ.
- Đinh 2 · Laser: cách mép cửa sổ 1,20 m. Quanh đinh có một vòng sơn sáng màu hơn.
- Đinh 3 · Laser: cách mép cửa sổ 1,55 m. Có vệt bụi hình chữ nhật, giống chỗ treo một khung ảnh.

**Lựa chọn:**

- Treo vào đinh 1 → `n2A_sai`
- Treo vào đinh 2 → `n2A_ok`
- Treo vào đinh 3 → `n2A_sai`

---

### Về chỗ cũ · 00:28
<sub>`n2A_ok`</sub>

Chiếc đồng hồ vừa được treo lên là tiếng tích tắc chậm lại, đều như nhịp thở của người đang ngủ. Tiếng kéo đồ dưới cầu thang ngừng hẳn.

Anh Phát hậm hực: “Mất cái bằng chứng ngon.” Nhưng anh thở ra một hơi dài, như vừa đặt được một gánh nặng xuống.

Soi đèn sát chỗ treo đồng hồ, bạn thấy những vạch khắc chiều cao trẻ con trên tường. Các cái tên đều đã bị cạo. Vạch cuối cùng chỉ còn đọc được năm 1998.

**Chỉ số:** Tỉnh táo -10 · Tin cậy +5 · Độ neo +5

**Manh mối:** Vạch đo chiều cao trẻ con ở căn 207, tên đã bị cạo, vạch cuối năm 1998.

---

### Sai đinh · 00:28
<sub>`n2A_sai`</sub>

Đồng hồ vừa treo lên thì tiếng tích tắc dồn dập như mưa đá. Chiếc giường sắt trong góc nghiến xuống nền, trườn từng gang về phía bạn.

“Không phải chỗ đó!” Út Thơ hét lên, chĩa camera vào tường. “Vệt mờ ở cái đinh giữa!”

Bạn giật đồng hồ xuống, treo sang đinh 2. Mọi thứ khựng lại. Chân giường dừng cách đầu gối bạn một nắm tay.

Sau chỗ treo đồng hồ là những vạch khắc chiều cao trẻ con. Các cái tên đều đã bị cạo. Vạch cuối cùng ghi năm 1998.

**Chỉ số:** Tỉnh táo -20 · Độ neo +10 · Tin cậy +5

**Manh mối:** Vạch đo chiều cao trẻ con ở căn 207, tên đã bị cạo, vạch cuối năm 1998.

---

### Lệnh trưởng nhóm · 00:24
<sub>`n2C`</sub>

“Đúng rồi, làm cho xong đi,” anh Phát nói, nhét chiếc đồng hồ vào túi áo trong.

Cả nhóm leo lên tầng 4. Đèn pin của mọi người tối đi một nấc cùng lúc, như có ai đó vặn nhỏ.

Anh Phát đi cuối hàng. Cứ mỗi bậc cầu thang, anh lại sờ túi áo một lần. Tiếng tích tắc trong túi áo nghe như đang đếm ngược.

**Chỉ số:** Tỉnh táo -5 · Pin -1

**Manh mối:** (Hiếm) Anh Phát giữ đồ căn 207, vi phạm luật L1. Tiếng tích tắc trong túi áo nghe như đếm ngược.

**Cờ:** phat_neo_nang, vi_pham_L1

---

### NÚT 3 · Chiếc kẹp tóc dưới gầm giường · 01:40
<sub>`nut3`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Út Thơ vào căn 405 chụp ảnh hiện trạng thì cánh cửa đóng sầm lại. Từ bên trong vọng ra tiếng kéo đồ, rồi một giọng phụ nữ ngọt ngào: “Con ơi, dọn giúp mẹ một tay.”

Rồi giọng ấy đổi thành giọng Út Thơ, đang khóc: “Chị ơi… cứu em…”

Bạn chợt nhớ ra: lúc kiểm đếm căn 405 một tiếng trước, bạn đã thấy chiếc kẹp tóc hình ngôi sao của Út Thơ dưới gầm giường. Khi ấy em chưa từng bước vào căn này.

Anh Phát đứng lùi ra xa, không dám nhìn ai. “Chìa căn 405… anh làm rơi đâu mất rồi.”

Túi áo anh vẫn tích tắc.

Mẩu giấy không chữ ký trong túi bạn viết: muốn nhà tha cho mình thì để lại đồ của người khác.

**Nhận luật:** L6

**Lựa chọn:**

- A. Sang căn 406, mở bản vẽ tìm bức vách có thể phá → `p3`
- B. Nhét thẻ nhân viên của bạn qua khe cửa: đổi đồ của mình lấy Út Thơ, ngay lập tức → `do_de_quen`
- C. Túm cổ áo anh Phát, buộc anh đưa chìa khóa → `n3B_cao` (Tin cậy ≥ 60) / `n3B_thap`

---

### Tiếng “dạ” · 01:44
<sub>`n3_het_gio`</sub>

Bạn chần chừ quá lâu. Tiếng khóc trong phòng ngừng bặt. Rồi bạn nghe rõ giọng Út Thơ, rất ngoan: “Dạ.”

Cánh cửa căn 405 tự mở. Út Thơ bước ra, mắt nhìn vô định, tay vẫn ôm một chiếc ghế đẩu không phải của em.

Đèn pin của cả nhóm tối thêm một nấc.

**Chỉ số:** Tỉnh táo -10 · Tin cậy -10 · Pin -1

**Manh mối:** Út Thơ đã đáp lời giọng nói trong căn 405.

**Cờ:** tho_da_nhan_loi

---

### Bản vẽ tầng 4 · 01:44
<sub>`p3`</sub>

Bạn đang đứng trong căn 406, tay cầm chiếc xà beng đội tháo dỡ để quên. Phải chọn đúng bức tường phá được.

**Ký hiệu trên bản vẽ:**

- V1 · Vách giữa 405 và 406. Nét đơn, gạch 110.
- V2 · Tường giữa 406 và hành lang. Gạch chéo, 220.
- V3 · Tường hồi phía đông. Gạch chéo, 220. Phía sau là khoảng không cao bốn tầng.

**Lựa chọn:**

- Phá V1 → `n3A_ok`
- Phá V2 → `n3A_sai`
- Phá V3 → `n3A_sai`

---

### Tường 220 · 01:49
<sub>`n3A_sai`</sub>

Xà beng nảy bật lại, tê dại cả hai cổ tay. Bức tường chỉ tróc ra một mảng vữa nhỏ.

Năm phút trôi qua trong tiếng kéo đồ và giọng ngọt ngào kia. Đèn pin tối thêm một nấc. Bạn nhìn lại bản vẽ, nhận ra mình đọc nhầm, rồi quay sang bức vách mỏng.

**Chỉ số:** Tỉnh táo -10 · Pin -1

---

### Vách 110 · 01:52
<sub>`n3A_ok`</sub>

Gạch 110 vỡ sau bốn nhát xà beng, bụi vữa mù mịt. Bạn bò qua lỗ hổng. Trong căn 405, đồ đạc đã xếp thành một vòng tròn quanh Út Thơ. Em đứng giữa, mắt mở to, môi mấp máy như sắp đáp lời.

Bạn thò tay xuống gầm giường. Chiếc kẹp tóc hình ngôi sao được gói trong một mảnh giấy xé từ sổ tay. Nét chữ trên đó giống hệt nét chữ của mẩu giấy không chữ ký, và giống hệt nét chữ trong cuốn sổ anh Phát vẫn kẹp ở nách.

Kẹp tóc vừa rời khỏi căn phòng, vòng đồ đạc dạt ra như nước rút. Út Thơ khuỵu xuống, ôm chặt lấy bạn, khóc không ra tiếng.

**Chỉ số:** Tỉnh táo -15 · Tin cậy +15 · Độ neo +10

**Manh mối:** Bằng chứng: dòng luật không chữ ký và mảnh giấy gói kẹp tóc cùng một nét chữ, nét chữ của anh Phát.

**Cờ:** l7_cua_phat

---

### Lời thú nhận · 01:46
<sub>`n3B_cao`</sub>

Anh Phát nhìn bạn rất lâu, rồi gục xuống bậc cầu thang. “Mấy năm nay… nhà bỏ trống, đồ người ta để lại… anh có lấy vài món. Học phí con bé… Giờ cái nhà nó không cho anh đi. Đọc mẩu giấy kia anh tưởng… đổi đứa khác vào thì…”

Anh móc chìa khóa căn 405 từ túi quần ra. Hóa ra nó chưa bao giờ bị mất.

Cửa vừa mở, Út Thơ lao ra ôm chầm lấy bạn. Trong lúc bạn cúi nhặt chiếc kẹp tóc dưới gầm giường, anh Phát lẩm bẩm như nói với chính mình: “…cả cái chuồng cọp năm 2016 nữa…”

**Chỉ số:** Tỉnh táo -10 · Tin cậy +5

**Manh mối:** (Hiếm) Anh Phát thú nhận đã lấy đồ ở các căn bỏ trống. Anh nhắc tới “cái chuồng cọp năm 2016”.

**Cờ:** phat_thu_nhan

---

### Chối · 01:50
<sub>`n3B_thap`</sub>

“Cô nghi tôi à? Tôi làm cái nghề này hai mươi năm rồi!” Anh Phát gạt tay bạn ra. Hai bên giằng co mất mấy phút.

Rồi cánh cửa căn 405 tự mở. Út Thơ bước ra, mắt nhìn vô định. Ngay trước khi cửa mở, bạn nghe rõ em đáp một tiếng “dạ”.

Đèn pin của cả nhóm tối thêm một nấc.

**Chỉ số:** Tỉnh táo -10 · Tin cậy -10 · Pin -1

**Manh mối:** Út Thơ đã đáp lời giọng nói trong căn 405.

**Cờ:** tho_da_nhan_loi

---

### Chín phẩy sáu · 02:30
<sub>`ket_man1`</sub>

*(Một số đoạn chỉ hiện ra tùy vào lựa chọn trước đó.)*

Cả nhóm tập trung ở chiếu nghỉ tầng 4. Chị Trâm từ ngoài xe lên, tay ôm laptop, mặt tái đi vì gió đêm.

Anh Phát đứng tách ra một góc. Không ai nói gì với anh, và anh cũng không nói gì. Màn hình khóa điện thoại của anh sáng lên: ảnh bé gái mặc đồng phục.

Út Thơ ngồi bó gối, thỉnh thoảng lại khe khẽ đáp “dạ” với khoảng không.

Trong túi áo anh Phát, tiếng tích tắc vẫn chưa dừng.

Bạn cộng lại toàn bộ số đo của đêm nay. Tổng diện tích sàn nhà B4 đã tăng thêm 9,6 m², vừa đúng diện tích một căn phòng nhỏ. Nhưng căn nào bạn cũng đã đo lại, và không căn nào rộng ra.

Chị Trâm nhìn con số trên tablet và lặp lại rất khẽ: “Chín phẩy sáu.” Giọng chị như vừa gặp lại một người quen.

Chị nhìn trân trân vào bản vẽ tầng 5. “Căn 502 là nhà tôi ngày trước. Năm tôi tám tuổi… tôi đã cố ý để quên một thứ ở đó.”

Chiếc loa phường khục lên một tiếng: “Đề nghị hộ 502 lên nhận lại đồ.”

---

### 💀 KẾT THÚC: Bức tường mới
<sub>`buc_tuong_moi`</sub>

Hai bước chân dài hơn bạn tưởng. Cánh cửa lùi ra xa, còn các bức vách khép lại gần nhau. Vệt đèn pin hẹp dần thành một khe sáng, rồi tắt.

Một tuần sau, kỹ sư của đội phá dỡ quét laser toàn bộ nhà B4 và phát hiện thêm một bức vách dày 22 cm mà bản vẽ không có. Bức vách ấm như người.

Trên bản vẽ hoàn công mới, có ai đó ghi chú bằng bút chì: “Vách không chịu lực. Đừng đập. Có người tựa.”

---

### 💀 KẾT THÚC: Căn hộ đi theo
<sub>`can_ho_di_theo`</sub>

Chiếc đồng hồ vỡ tan dưới sân. Tiếng kéo đồ im bặt. Mọi người thở phào và làm nốt việc cho tới sáng. Biên bản được nộp đúng giờ.

Bạn về phòng trọ, tra chìa vào ổ khóa và mở cửa.

Bên trong là căn 207: ba cái đinh trên tường, mùi vữa ẩm, và chiếc đồng hồ quả lắc treo ở đinh giữa, đang tích tắc. Đồ của căn đó bị mang ra ngoài thì căn đó đi theo. Nó đã dọn đến ở với bạn.

---

### 💀 KẾT THÚC: Đồ để quên
<sub>`do_de_quen`</sub>

Cửa bật mở, Út Thơ ngã nhào ra ngoài hành lang. Cánh cửa đóng lại sau lưng em, và lúc ấy bạn mới nhận ra mình đang đứng ở phía bên trong.

Sáng thứ Hai, đội phá dỡ kiểm tra lần cuối căn 405. Trên bàn có một tấm thẻ nhân viên.

Trên tường treo một khung ảnh gia đình đã bạc màu. Trong ảnh có thêm một cô gái mặc áo xanh, đứng mỉm cười giữa mọi người như thể từ trước đến nay vẫn đứng đó.

---

### 💀 KẾT THÚC: Ở lại
<sub>`o_lai`</sub>

Bạn không còn nhớ mình định đi đâu. Căn phòng này vừa vặn quá: chiếc ghế đúng tầm, khung cửa đúng tầm vai.

Biên bản kiểm đếm nộp lúc 5 giờ sáng ghi thiếu một kỹ sư trắc địa. Biên bản tài sản thì ghi thừa một chiếc ghế nhựa, còn ấm.

---

### 💀 KẾT THÚC: Đo mãi
<sub>`do_mai`</sub>

Bạn đo lại bức tường lần thứ một trăm. 3,62 m. 3,40 m. 3,62 m. Con số không chịu đứng yên, nên bạn không thể dừng lại.

Đội phá dỡ tìm thấy bạn ngồi trong căn 304, tay bấm thước laser liên tục, miệng đọc số. Không ai nỡ cắt ngang.

---

### 💀 KẾT THÚC: Tắt đèn
<sub>`tat_den`</sub>

Nấc pin cuối cùng tắt cùng lúc trên mọi chiếc đèn. Trong bóng tối, bạn nghe tiếng đồ đạc dịch đến, rất chậm, rất kiên nhẫn, như những người hàng xóm cũ kéo ghế ra ngồi chơi.

Sáng hôm sau, trong phần mềm theo dõi, nhà B4 vẫn hiện trạng thái: “Đang kiểm đếm.”

---
