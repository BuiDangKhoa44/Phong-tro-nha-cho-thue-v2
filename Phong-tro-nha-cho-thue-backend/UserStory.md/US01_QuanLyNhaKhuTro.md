# USER STORY: US01 - QUẢN LÝ NHÀ / KHU TRỌ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ----------------------------------
  **Mã User Story**                    **US01**
  **Tên User Story**                   Quản lý Nhà / Khu trọ
  **Phân hệ (Module)**                 Phân hệ 1: Quản lý Cơ sở & Phòng
  **Use Case liên quan**               **UC03** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-PROP-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Quản lý
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Quản lý
-   **Tôi muốn (I want to):** Tạo mới, cập nhật, xem và quản lý nhiều
    nhà/khu trọ, địa chỉ, mô tả và trạng thái hoạt động.
-   **Để (So that):** Tổ chức dữ liệu cơ sở cho phòng, hợp đồng, khách
    thuê và các nghiệp vụ phát sinh.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Quản lý Nhà / Khu trọ** là
một phần của quy trình vận hành thực tế. Người dùng cần tạo mới, cập
nhật, xem và quản lý nhiều nhà/khu trọ, địa chỉ, mô tả và trạng thái
hoạt động. Mục tiêu là tổ chức dữ liệu cơ sở cho phòng, hợp đồng, khách
thuê và các nghiệp vụ phát sinh.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

Mỗi nhà/khu trọ phải có mã duy nhất. Nhà đang Inactive không được tạo
nghiệp vụ mới. Không xóa cứng cơ sở đã phát sinh hợp đồng/hóa đơn.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Tạo nhà mới

-   **Given:** Chủ nhà đã đăng nhập và có quyền quản lý nhà.
-   **When:** Nhập mã `NT01`, tên `Khu trọ Miku`, địa chỉ và bấm `Lưu`.
-   **Then:** Hệ thống kiểm tra mã duy nhất, lưu trạng thái `ACTIVE` và
    hiển thị nhà trong danh sách.

### Kịch bản 2: Trùng mã nhà

-   **Given:** Đã tồn tại mã `NT01`.
-   **When:** Người dùng tạo nhà mới với mã `NT01`.
-   **Then:** Hệ thống không lưu và báo `Mã nhà đã tồn tại`.

### Kịch bản 3: Ngừng hoạt động

-   **Given:** Nhà đã có dữ liệu phòng.
-   **When:** Chủ nhà chuyển nhà sang `INACTIVE`.
-   **Then:** Hệ thống giữ nguyên lịch sử và không cho tạo nghiệp vụ mới
    tại nhà đó.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `PROPERTIES`: `id`, `code`, `name`, `address`, `description`,
    `status`, `created_at`.
-   `AUDIT_LOGS`: lưu người thao tác, thời gian, hành động và dữ liệu
    trước/sau.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** Có tài khoản có quyền quản lý.
-   **Là tiền đề cho:** **US02** Quản lý phòng và toàn bộ nghiệp vụ hợp
    đồng/hóa đơn.
-   **Liên quan:** UC03.
