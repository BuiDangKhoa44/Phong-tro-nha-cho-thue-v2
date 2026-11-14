# USER STORY: US13 - GỬI & XỬ LÝ YÊU CẦU SỬA CHỮA

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  -----------------------------------------------------------------------
  Thuộc tính                          Chi tiết
  ----------------------------------- -----------------------------------
  **Mã User Story**                   **US13**

  **Tên User Story**                  Gửi & Xử lý Yêu cầu Sửa chữa

  **Phân hệ (Module)**                Phân hệ 5: Sửa chữa & Thông báo

  **Use Case liên quan**              **UC20, UC21** (DacTa.md)

  **Yêu cầu SRS**                     **\[FR-MTN-01\]** (SRS.md)

  **Độ ưu tiên (Priority)**           **Must-Have**

  **Tác nhân chính (Primary Actor)**  Khách thuê / Chủ nhà / Nhân viên

  **Trạng thái (Status)**             Ready for Development
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Khách thuê / Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Gửi yêu cầu sửa chữa và cho phép người
    quản lý tiếp nhận, cập nhật tiến độ, chi phí và hoàn tất yêu cầu.
-   **Để (So that):** Theo dõi sự cố phòng minh bạch và giảm thời gian
    xử lý.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Gửi & Xử lý Yêu cầu Sửa
chữa** là một phần của quy trình vận hành thực tế. Người dùng cần gửi
yêu cầu sửa chữa và cho phép người quản lý tiếp nhận, cập nhật tiến độ,
chi phí và hoàn tất yêu cầu. Mục tiêu là theo dõi sự cố phòng minh bạch
và giảm thời gian xử lý.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Yêu cầu phải gắn với phòng và người gửi.
-   Trạng thái: `NEW`, `ACCEPTED`, `IN_PROGRESS`, `WAITING`,
    `COMPLETED`, `CLOSED`.
-   Chỉ người có quyền mới được đóng yêu cầu.
-   Mọi thay đổi trạng thái phải lưu lịch sử.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Khách gửi yêu cầu

-   **When:** Khách chọn phòng của mình, nhập `Vòi nước bị rò` và gửi.
-   **Then:** Yêu cầu `NEW` được tạo và thông báo cho chủ nhà.

### Kịch bản 2: Tiếp nhận

-   **When:** Nhân viên nhận xử lý.
-   **Then:** Trạng thái `IN_PROGRESS`.

### Kịch bản 3: Hoàn tất

-   **When:** Người xử lý nhập kết quả và chi phí rồi hoàn tất.
-   **Then:** Trạng thái `COMPLETED/CLOSED` theo quy trình.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `MAINTENANCE_REQUESTS`: `id`, `room_id`, `tenant_id`, `title`,
    `description`, `priority`, `status`, `assigned_to`, `cost`,
    `created_at`, `completed_at`.
-   `MAINTENANCE_HISTORY`: lưu các lần đổi trạng thái.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US02.
-   **Liên quan:** UC20, UC21.
-   Có thể tích hợp US14 để gửi thông báo.
