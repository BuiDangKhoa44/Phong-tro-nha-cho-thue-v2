# USER STORY: US08 - TÍNH TIỀN ĐIỆN & NƯỚC

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ --------------------------------
  **Mã User Story**                    **US08**
  **Tên User Story**                   Tính tiền Điện & Nước
  **Phân hệ (Module)**                 Phân hệ 3: Điện nước & Dịch vụ
  **Use Case liên quan**               **UC14, UC15** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-UTL-02\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Hệ thống / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Hệ thống / Nhân viên
-   **Tôi muốn (I want to):** Tự động tính sản lượng và tiền điện, tiền
    nước từ chỉ số và đơn giá của kỳ.
-   **Để (So that):** Tạo số tiền dịch vụ chính xác, minh bạch và giảm
    tính toán thủ công.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Tính tiền Điện & Nước** là
một phần của quy trình vận hành thực tế. Người dùng cần tự động tính sản
lượng và tiền điện, tiền nước từ chỉ số và đơn giá của kỳ. Mục tiêu là
tạo số tiền dịch vụ chính xác, minh bạch và giảm tính toán thủ công.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   `SanLuong = ChiSoMoi - ChiSoCu`.
-   `TienDien = SanLuongDien × DonGiaDien`.
-   `TienNuoc = SanLuongNuoc × DonGiaNuoc`.
-   Không tính nếu thiếu chỉ số hoặc đơn giá hợp lệ.
-   Phải lưu snapshot đơn giá tại thời điểm lập hóa đơn để tránh thay
    đổi lịch sử.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Tính điện

-   **Given:** 50 kWh, giá `3.500đ/kWh`.
-   **Then:** Tiền điện = `175.000đ`.

### Kịch bản 2: Tính nước

-   **Given:** 10 m³, giá `20.000đ/m³`.
-   **Then:** Tiền nước = `200.000đ`.

### Kịch bản 3: Thiếu chỉ số

-   **When:** Kỳ chưa có chỉ số nước.
-   **Then:** Hệ thống đánh dấu chưa đủ dữ liệu và không tự chốt tiền
    nước.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   Có thể tính tại service layer/backend.
-   Kết quả nên lưu tại `INVOICE_ITEMS` hoặc bảng tính trung gian để
    truy vết.
-   Làm tròn tiền theo quy tắc tiền tệ của hệ thống.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US07.
-   **Được gọi bởi:** US09.
-   **Liên quan:** UC14, UC15.
