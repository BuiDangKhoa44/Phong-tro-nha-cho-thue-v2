# USER STORY: US15 - QUẢN LÝ TÀI KHOẢN & PHÂN QUYỀN RBAC

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ---------------------------------------
  **Mã User Story**                    **US15**
  **Tên User Story**                   Quản lý Tài khoản & Phân quyền RBAC
  **Phân hệ (Module)**                 Phân hệ 7: Quản trị & Bảo mật
  **Use Case liên quan**               **UC01, UC02, UC27, UC28** (DacTa.md)
  **Yêu cầu SRS**                      **\[NFR-SEC-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Quản trị viên / Chủ nhà
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Quản trị viên / Chủ nhà
-   **Tôi muốn (I want to):** Đăng nhập, tạo và quản lý tài khoản, gán
    vai trò, khóa tài khoản và kiểm soát quyền truy cập.
-   **Để (So that):** Bảo vệ dữ liệu và phân định rõ quyền của Chủ nhà,
    Nhân viên, Khách thuê và Quản trị viên.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Quản lý Tài khoản & Phân
quyền RBAC** là một phần của quy trình vận hành thực tế. Người dùng cần
đăng nhập, tạo và quản lý tài khoản, gán vai trò, khóa tài khoản và kiểm
soát quyền truy cập. Mục tiêu là bảo vệ dữ liệu và phân định rõ quyền
của chủ nhà, nhân viên, khách thuê và quản trị viên.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Mật khẩu không lưu dạng plain text.
-   Backend bắt buộc kiểm tra Authorization.
-   Role đề xuất: `ADMIN`, `OWNER`, `STAFF`, `TENANT`.
-   Tenant chỉ được truy cập dữ liệu thuộc chính mình.
-   Tài khoản bị khóa không được đăng nhập.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Đăng nhập thành công

-   **Given:** Tài khoản hợp lệ.
-   **When:** Nhập đúng username/password.
-   **Then:** Hệ thống cấp session/JWT và điều hướng theo role.

### Kịch bản 2: Sai mật khẩu

-   **When:** Nhập sai mật khẩu.
-   **Then:** Không đăng nhập và hiển thị lỗi chung.

### Kịch bản 3: Nhân viên truy cập chức năng bị cấm

-   **When:** Staff gọi trực tiếp API quản trị.
-   **Then:** Backend trả `403 Forbidden`.

### Kịch bản 4: Khóa tài khoản

-   **When:** Owner khóa tài khoản Staff.
-   **Then:** Các phiên/token của tài khoản phải được vô hiệu hóa theo
    cơ chế hệ thống.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `USERS`: `id`, `username`, `password_hash`, `full_name`, `phone`,
    `email`, `status`.
-   `ROLES`, `PERMISSIONS`, `USER_ROLES`, `ROLE_PERMISSIONS`.
-   `AUDIT_LOGS`: `actor_id`, `action`, `entity`, `entity_id`,
    `old_value`, `new_value`, `created_at`.
-   Mật khẩu nên dùng BCrypt/Argon2id; không lưu plaintext.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** Seed tài khoản Admin/Owner ban đầu.
-   **Bảo vệ:** US01-US14.
-   **Liên quan:** UC01, UC02, UC27, UC28.
-   Mọi API nghiệp vụ phải thực hiện authorization ở Backend.
