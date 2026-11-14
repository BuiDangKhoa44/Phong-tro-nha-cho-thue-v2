# USER STORY: US07 - QUẢN LÝ ĐIỆN, NƯỚC & DỊCH VỤ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ---------------------------------
  **Mã User Story**                    **US07**
  **Tên User Story**                   Quản lý Điện, Nước & Dịch vụ
  **Phân hệ (Module)**                 Phân hệ 3: Điện nước & Dịch vụ
  **Use Case liên quan**               **UC11, UC12, UC13** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-UTL-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Cấu hình đơn giá điện, nước và các dịch
    vụ; nhập chỉ số điện/nước theo kỳ.
-   **Để (So that):** Có dữ liệu đầu vào chuẩn để tính hóa đơn hàng
    tháng.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Quản lý Điện, Nước & Dịch
vụ** là một phần của quy trình vận hành thực tế. Người dùng cần cấu hình
đơn giá điện, nước và các dịch vụ; nhập chỉ số điện/nước theo kỳ. Mục
tiêu là có dữ liệu đầu vào chuẩn để tính hóa đơn hàng tháng.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Mỗi dịch vụ có mã và đơn giá.
-   Chỉ số mới không được nhỏ hơn chỉ số cũ.
-   Mỗi phòng/kỳ chỉ có một bộ chỉ số hợp lệ cho từng loại.
-   Sửa chỉ số đã chốt phải có quyền và ghi audit.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Nhập chỉ số điện

-   **Given:** Chỉ số cũ `1200`.
-   **When:** Nhập chỉ số mới `1250`.
-   **Then:** Sản lượng được xác định là `50 kWh`.

### Kịch bản 2: Chỉ số giảm

-   **When:** Nhập `1190`.
-   **Then:** Hệ thống từ chối và báo chỉ số mới phải lớn hơn hoặc bằng
    chỉ số cũ.

### Kịch bản 3: Cấu hình giá

-   **When:** Quản lý đổi đơn giá điện.
-   **Then:** Giá mới áp dụng từ kỳ hiệu lực được cấu hình.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `SERVICES`: `id`, `code`, `name`, `unit`, `type`, `status`.
-   `SERVICE_PRICES`: `service_id`, `price`, `effective_from`,
    `effective_to`.
-   `ELECTRIC_READINGS`: `room_id`, `period`, `old_value`, `new_value`,
    `recorded_at`.
-   `WATER_READINGS`: tương tự điện.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US02.
-   **Là tiền đề cho:** US08 và US09.
-   **Liên quan:** UC11, UC12, UC13.
