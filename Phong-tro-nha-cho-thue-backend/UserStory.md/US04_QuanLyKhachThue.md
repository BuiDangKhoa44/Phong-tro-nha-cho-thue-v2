# USER STORY: US04 - QUẢN LÝ KHÁCH THUÊ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ----------------------------------
  **Mã User Story**                    **US04**
  **Tên User Story**                   Quản lý Khách thuê
  **Phân hệ (Module)**                 Phân hệ 2: Khách thuê & Hợp đồng
  **Use Case liên quan**               **UC06** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-TEN-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Tạo mới, cập nhật, tra cứu hồ sơ khách
    thuê gồm thông tin cá nhân, liên hệ và trạng thái thuê.
-   **Để (So that):** Có dữ liệu khách thuê chính xác để lập hợp đồng,
    hóa đơn và liên hệ.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Quản lý Khách thuê** là
một phần của quy trình vận hành thực tế. Người dùng cần tạo mới, cập
nhật, tra cứu hồ sơ khách thuê gồm thông tin cá nhân, liên hệ và trạng
thái thuê. Mục tiêu là có dữ liệu khách thuê chính xác để lập hợp đồng,
hóa đơn và liên hệ.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Số điện thoại phải duy nhất theo chính sách hệ thống.
-   Thông tin bắt buộc: họ tên và số điện thoại.
-   Không xóa cứng khách thuê đã có hợp đồng; dùng trạng thái
    `INACTIVE`.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thêm khách thuê

-   **Given:** Nhân viên đang ở màn hình khách thuê.
-   **When:** Nhập họ tên `Nguyễn Văn A`, SĐT `0900000000` và lưu.
-   **Then:** Hồ sơ được tạo thành công.

### Kịch bản 2: Trùng số điện thoại

-   **When:** Nhập SĐT đã tồn tại.
-   **Then:** Hệ thống cảnh báo và không tạo bản ghi trùng.

### Kịch bản 3: Tra cứu

-   **When:** Tìm theo tên hoặc SĐT.
-   **Then:** Hệ thống trả đúng hồ sơ phù hợp.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `TENANTS`: `id`, `full_name`, `phone`, `email`, `id_number`,
    `address`, `status`, `note`.
-   Có index `phone`, `full_name`.
-   Có thể mở rộng bảng tài liệu/ảnh giấy tờ sau này.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** Có nhà/phòng từ US01-US02.
-   **Tiền đề cho:** US05.
-   **Liên quan:** UC06.
