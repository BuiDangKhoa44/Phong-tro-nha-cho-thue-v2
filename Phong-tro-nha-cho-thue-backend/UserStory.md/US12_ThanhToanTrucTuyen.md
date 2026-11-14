# USER STORY: US12 - THANH TOÁN TRỰC TUYẾN

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ---------------------------------
  **Mã User Story**                    **US12**
  **Tên User Story**                   Thanh toán Trực tuyến
  **Phân hệ (Module)**                 Phân hệ 4: Hóa đơn & Thanh toán
  **Use Case liên quan**               **UC19** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-PAY-02\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Khách thuê / Cổng thanh toán
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Khách thuê / Cổng thanh toán
-   **Tôi muốn (I want to):** Thanh toán hóa đơn bằng phương thức trực
    tuyến và nhận kết quả giao dịch.
-   **Để (So that):** Cho phép khách trả tiền thuận tiện mà không cần
    thao tác thủ công từ chủ nhà.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Thanh toán Trực tuyến** là
một phần của quy trình vận hành thực tế. Người dùng cần thanh toán hóa
đơn bằng phương thức trực tuyến và nhận kết quả giao dịch. Mục tiêu là
cho phép khách trả tiền thuận tiện mà không cần thao tác thủ công từ chủ
nhà.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Mỗi yêu cầu thanh toán phải có mã giao dịch duy nhất.
-   Chỉ cập nhật `SUCCESS` khi xác minh callback/webhook hợp lệ.
-   Webhook phải idempotent, nhận lặp không tạo thanh toán trùng.
-   Không tin số tiền từ client nếu khác số tiền hóa đơn.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thanh toán thành công

-   **Given:** Hóa đơn còn nợ `3.475.000đ`.
-   **When:** Khách thanh toán qua QR/cổng thanh toán.
-   **Then:** Gateway callback hợp lệ, payment `SUCCESS`, invoice
    `PAID`.

### Kịch bản 2: Thanh toán thất bại

-   **Then:** Payment `FAILED`, hóa đơn vẫn còn công nợ.

### Kịch bản 3: Webhook gửi lại

-   **When:** Cùng transaction callback lần 2.
-   **Then:** Hệ thống không tạo giao dịch thứ hai.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `PAYMENTS` lưu `provider`, `provider_transaction_id`, `amount`,
    `status`, `raw_reference`.
-   Endpoint webhook cần xác thực chữ ký theo cổng thanh toán được tích
    hợp.
-   Frontend hiển thị QR/deep link nếu provider hỗ trợ.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US09.
-   **Gọi US11** để ghi nhận kết quả thanh toán.
-   **Liên quan:** UC19.
