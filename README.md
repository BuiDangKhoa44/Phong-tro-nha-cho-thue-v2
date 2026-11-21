# Hệ Thống Quản Lý Phòng Trọ & Nhà Cho Thuê
> **Giải pháp quản lý tự động hóa thông minh với sự hỗ trợ của Trí Tuệ Nhân Tạo (AI)**
Thông Tin Thành Viên Thực Hiện

## Bùi Đăng Khoa - MSSV: 2613042003
## Nguyễn Đức Thống - MSSV: 2606042059
## Ngô Quốc Đại - MSVV: 2613042002
---

## 1. Mục tiêu và thời gian
> *Chúng ta muốn đạt điều gì, đo bằng số nào, trong bao lâu?*

### Mục tiêu cốt lõi
Tự động hóa hoàn toàn quy trình quản lý nhà cho thuê/phòng trọ, tối ưu hóa doanh thu, giảm thiểu sai sót trong tính toán chi phí (điện, nước, cọc, hóa đơn chu kỳ) và nâng cao trải nghiệm của cả chủ nhà lẫn người thuê.

### Chỉ số đo lường (KPIs)
* **Giảm 90% thời gian** tính toán hóa đơn hàng tháng (từ vài ngày xuống còn vài phút).
* **Đảm bảo 100% độ chính xác** trong tính tiền điện lũy tiến và tiền nước.
* **Tăng 95% tỷ lệ thu tiền đúng hạn** nhờ nhắc nhở tự động theo chu kỳ.
* **Giảm 80% tranh chấp** về tiền cọc và chi phí phát sinh nhờ lịch sử minh bạch.

### Khung thời gian
* **Hoàn thiện mô hình & nghiệm thu:** Trong vòng **3 - 6 tháng**.

---

## 2. Ai có thể giúp đạt mục tiêu và ai có thể cản trở?
Các bên liên quan đóng vai trò trực tiếp hoặc gián tiếp trong việc triển khai, vận hành và sử dụng hệ thống quản lý phòng trọ & nhà cho thuê.

### Những người có thể giúp đạt mục tiêu
* **Chủ nhà / Quản lý:** Cung cấp thông tin, phê duyệt quy trình và theo dõi hoạt động quản lý phòng trọ.
* **Khách thuê:** Cung cấp thông tin chính xác, thanh toán đúng hạn và phối hợp khi cần kiểm tra điện, nước.
* **Nhân viên quản lý:** Theo dõi hóa đơn, tiền cọc và xử lý các vấn đề phát sinh.
* **Đội ngũ kỹ thuật:** Xây dựng, vận hành và bảo trì hệ thống quản lý.


### Những người có thể cản trở mục tiêu

* **Chủ nhà / Quản lý:** Có thể không hợp tác hoặc không muốn thay đổi cách quản lý truyền thống.
* **Khách thuê:** Có thể cung cấp thông tin không chính xác hoặc thanh toán chậm.
* **Nhân viên quản lý:** Có thể nhập sai dữ liệu hoặc không thực hiện đúng quy trình.
* **Đội ngũ kỹ thuật:** Nếu triển khai hệ thống không ổn định hoặc xử lý lỗi chậm sẽ ảnh hưởng đến hoạt động chung.
---

## 3. Tác Động 
> *Hành vi của từng tác nhân cần thay đổi thế nào nhờ sự hỗ trợ của AI?*

* **Chủ nhà / Quản lý:** 
  * Chuyển sang **chỉ cần chụp ảnh công tơ** và xác nhận hóa đơn do AI tạo ra.
  * Theo dõi dòng tiền và trạng thái phòng tức thời qua bảng điều khiển dashboard.
  * <img width="400" height="250" alt="cubu" src="https://github.com/user-attachments/assets/5011635b-d0d8-40d3-8f8c-9bfd19a722f5" />



* **Khách thuê phòng:**
  * Chuyển từ việc nhận báo giá qua tin nhắn riêng lẻ sang **nhận hóa đơn điện tử minh bạch** có đính kèm ảnh chụp công tơ và công thức lũy tiến.
  * Tự động nhận nhắc nhở thanh toán chu kỳ đúng hạn mà không cảm thấy bị làm phiền.
  *<img width="400" height="250" alt="image" src="https://github.com/user-attachments/assets/72f63bdd-9b0e-4d9b-aadb-55b10485fa8b" />


* **Hệ thống AI & Đội ngũ kỹ thuật:**
  * Liên tục học hỏi và tự sửa lỗi từ các phản hồi (feedback loop) khi người dùng chỉnh sửa chỉ số OCR bị sai
  * <img width="400" height="250" alt="image" src="https://github.com/user-attachments/assets/aa04e625-01ab-4dc7-9639-3e540eb32b82" />

  * 

---

## 4. Bàn Giao 
> *Ta làm gì để tạo ra sự thay đổi hành vi đó?*

### 1. Module Tính Toán Điện Nước Lũy Tiến Tự Động
* Xây dựng thuật toán áp bảng giá điện lũy tiến theo bậc thang nhà nước hoặc giá thỏa thuận.
* Đọc chỉ số công tơ bằng AI (Computer Vision/OCR).

### 2. Hệ Thống Hóa Đơn & Thanh Toán Theo Chu Kỳ
* Đặt lịch tự động chốt sổ (ví dụ: ngày 25 hàng tháng).
* Tạo hóa đơn tự động gồm: Tiền nhà + Tiền điện lũy tiến + Tiền nước + Dịch vụ khác (Rác, Wifi, Xe).
* Tích hợp cổng thanh toán / Mã QR tĩnh chuyển khoản ngân hàng.

### 3. Quản Lý Tiền Cọc (Deposit Management)
* Quản lý trạng thái cọc: *Đã cọc giữ chỗ*, *Cọc hợp đồng*, *Trừ cọc vi phạm*, *Hoàn cọc khi thanh lý*.
* Cảnh báo tự động khi thời hạn hợp đồng sắp hết để xử lý cọc.

---

## Lời Cảm Ơn 

Cảm ơn bạn đã dành thời gian tham khảo tài liệu hướng dẫn và kiến trúc dự án **Quản Lý Phòng Trọ & Nhà Cho Thuê**. 

Hy vọng giải pháp này sẽ mang lại sự tiện lợi, tự động hóa tối đa và trải nghiệm quản lý tuyệt vời cho bạn và khách thuê!

Nếu bạn có bất kỳ đóng góp, câu hỏi hoặc muốn đóng góp mã nguồn (contribute), đừng ngần ngại mở một **Issue** hoặc **Pull Request**.
