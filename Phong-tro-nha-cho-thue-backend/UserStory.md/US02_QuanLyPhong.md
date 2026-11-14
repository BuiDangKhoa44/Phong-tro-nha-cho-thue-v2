[US02_QuanLyPhong.md](https://github.com/user-attachments/files/32998488/US02_QuanLyPhong.md)
# USER STORY: US02 - QUẢN LÝ PHÒNG TRỌ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ----------------------------------
  **Mã User Story**                    **US02**
  **Tên User Story**                   Quản lý Phòng trọ
  **Phân hệ (Module)**                 Phân hệ 1: Quản lý Cơ sở & Phòng
  **Use Case liên quan**               **UC04** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-ROOM-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Thêm, sửa, xem trạng thái và cập nhật
    thông tin từng phòng thuộc một nhà/khu trọ.
-   **Để (So that):** Quản lý chính xác nguồn phòng cho thuê và biết
    phòng đang trống, đã thuê hay đang bảo trì.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Quản lý Phòng trọ** là một
phần của quy trình vận hành thực tế. Người dùng cần thêm, sửa, xem trạng
thái và cập nhật thông tin từng phòng thuộc một nhà/khu trọ. Mục tiêu là
quản lý chính xác nguồn phòng cho thuê và biết phòng đang trống, đã thuê
hay đang bảo trì.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Mã phòng phải duy nhất trong phạm vi một nhà/khu trọ.
-   Phòng phải thuộc một nhà hợp lệ.
-   Trạng thái chuẩn: `AVAILABLE`, `RESERVED`, `RENTED`, `MAINTENANCE`,
    `INACTIVE`.
-   Không được chuyển sang `RENTED` nếu chưa có hợp đồng Active.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Thêm phòng

-   **Given:** Nhà `NT01` đang ACTIVE.
-   **When:** Tạo phòng `P101`, giá thuê `3.000.000`, sức chứa `2`.
-   **Then:** Phòng được tạo với trạng thái `AVAILABLE`.

### Kịch bản 2: Không cho thuê phòng đang bảo trì

-   **Given:** `P101` có trạng thái `MAINTENANCE`.
-   **When:** Người dùng tạo hợp đồng cho `P101`.
-   **Then:** Hệ thống từ chối và báo phòng chưa sẵn sàng cho thuê.

### Kịch bản 3: Đổi trạng thái theo hợp đồng

-   **Given:** Hợp đồng của `P101` chuyển sang `ACTIVE`.
-   **Then:** Phòng tự động chuyển `RENTED`.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `ROOMS`: `id`, `property_id`, `code`, `name`, `floor`, `area`,
    `rent_price`, `capacity`, `status`, `description`.
-   Khóa duy nhất: `(property_id, code)`.
-   Foreign Key `property_id -> PROPERTIES.id`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US01.
-   **Phụ thuộc:** US05/US06.
-   **Cung cấp dữ liệu cho:** US03, US09, US14.
