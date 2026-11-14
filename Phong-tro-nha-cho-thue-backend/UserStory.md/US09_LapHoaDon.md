# USER STORY: US09 - LẬP HÓA ĐƠN TIỀN PHÒNG

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ---------------------------------
  **Mã User Story**                    **US09**
  **Tên User Story**                   Lập Hóa đơn Tiền phòng
  **Phân hệ (Module)**                 Phân hệ 4: Hóa đơn & Thanh toán
  **Use Case liên quan**               **UC16** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-INV-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên / Hệ thống
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên / Hệ thống
-   **Tôi muốn (I want to):** Tạo hóa đơn định kỳ cho hợp đồng gồm tiền
    phòng, điện, nước, dịch vụ, giảm trừ và phát sinh.
-   **Để (So that):** Thu tiền thuê đúng kỳ và có chứng từ tài chính rõ
    ràng.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Lập Hóa đơn Tiền phòng**
là một phần của quy trình vận hành thực tế. Người dùng cần tạo hóa đơn
định kỳ cho hợp đồng gồm tiền phòng, điện, nước, dịch vụ, giảm trừ và
phát sinh. Mục tiêu là thu tiền thuê đúng kỳ và có chứng từ tài chính rõ
ràng.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Không tạo hai hóa đơn cho cùng hợp đồng và cùng kỳ.
-   Tổng hóa đơn = tiền phòng + điện + nước + dịch vụ + phát sinh - giảm
    trừ.
-   Hóa đơn phải lưu snapshot số tiền tại thời điểm phát hành.
-   Hủy hóa đơn phải ghi lý do và không xóa lịch sử.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Lập hóa đơn tháng

-   **Given:** Tiền phòng `3.000.000`, điện `175.000`, nước `200.000`,
    dịch vụ `100.000`.
-   **Then:** Tổng = `3.475.000đ`.

### Kịch bản 2: Trùng kỳ

-   **When:** Lập lại hóa đơn tháng 10 cho cùng hợp đồng.
-   **Then:** Hệ thống báo đã tồn tại hóa đơn kỳ này.

### Kịch bản 3: Phát hành

-   **Then:** Hóa đơn chuyển `UNPAID` và gửi thông báo cho khách thuê
    nếu cấu hình bật.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `INVOICES`: `id`, `invoice_no`, `contract_id`, `billing_period`,
    `issue_date`, `due_date`, `subtotal`, `discount`, `total`, `status`.
-   `INVOICE_ITEMS`: `invoice_id`, `item_type`, `description`,
    `quantity`, `unit_price`, `amount`.
-   Unique `(contract_id, billing_period)`.
-   Snapshot đơn giá nằm trong invoice item.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US05, US07, US08.
-   **Là tiền đề cho:** US10-US12.
-   **Liên quan:** UC16.
