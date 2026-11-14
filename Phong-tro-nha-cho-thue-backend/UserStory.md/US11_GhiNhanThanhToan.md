# USER STORY: US11 - GHI NHẬN & ĐỐI SOÁT THANH TOÁN

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ---------------------------------
  **Mã User Story**                    **US11**
  **Tên User Story**                   Ghi nhận & Đối soát Thanh toán
  **Phân hệ (Module)**                 Phân hệ 4: Hóa đơn & Thanh toán
  **Use Case liên quan**               **UC18** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-PAY-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Ghi nhận khoản thanh toán tiền mặt/chuyển
    khoản và cập nhật trạng thái hóa đơn.
-   **Để (So that):** Đối soát được số tiền khách đã thanh toán và số dư
    còn lại.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Ghi nhận & Đối soát Thanh
toán** là một phần của quy trình vận hành thực tế. Người dùng cần ghi
nhận khoản thanh toán tiền mặt/chuyển khoản và cập nhật trạng thái hóa
đơn. Mục tiêu là đối soát được số tiền khách đã thanh toán và số dư còn
lại.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Không ghi nhận thanh toán vượt số tiền còn phải trả nếu hệ thống
    không cho phép.
-   Mỗi giao dịch có mã tham chiếu duy nhất.
-   Thanh toán thành công phải cập nhật trạng thái hóa đơn: `PAID`,
    `PARTIAL` hoặc `OVERDUE` theo số dư.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thanh toán đủ

-   **Given:** Hóa đơn `3.475.000đ`.
-   **When:** Ghi nhận thanh toán đủ.
-   **Then:** Payment = `SUCCESS`, Invoice = `PAID`.

### Kịch bản 2: Thanh toán một phần

-   **When:** Khách trả `2.000.000đ`.
-   **Then:** Hóa đơn chuyển `PARTIAL`, còn nợ `1.475.000đ`.

### Kịch bản 3: Vượt tiền

-   **When:** Nhập `4.000.000đ`.
-   **Then:** Hệ thống cảnh báo và từ chối nếu cấu hình không cho phép
    overpayment.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `PAYMENTS`: `id`, `invoice_id`, `amount`, `method`,
    `transaction_ref`, `paid_at`, `status`, `created_by`.
-   Unique `transaction_ref`.
-   Giao dịch không xóa cứng; hoàn tiền dùng trạng thái `REFUNDED`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US09.
-   **Phối hợp với:** US10 và US12.
-   **Liên quan:** UC18.
