# USER STORY: US05 - LẬP HỢP ĐỒNG THUÊ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ----------------------------------
  **Mã User Story**                    **US05**
  **Tên User Story**                   Lập Hợp đồng Thuê
  **Phân hệ (Module)**                 Phân hệ 2: Khách thuê & Hợp đồng
  **Use Case liên quan**               **UC07** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-CON-01\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Lập hợp đồng thuê cho một khách thuê và
    một phòng, thiết lập giá thuê, tiền cọc, ngày bắt đầu và ngày kết
    thúc.
-   **Để (So that):** Ghi nhận quan hệ thuê hợp lệ và làm cơ sở tính
    tiền phòng hàng kỳ.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Lập Hợp đồng Thuê** là một
phần của quy trình vận hành thực tế. Người dùng cần lập hợp đồng thuê
cho một khách thuê và một phòng, thiết lập giá thuê, tiền cọc, ngày bắt
đầu và ngày kết thúc. Mục tiêu là ghi nhận quan hệ thuê hợp lệ và làm cơ
sở tính tiền phòng hàng kỳ.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Một phòng chỉ có tối đa một hợp đồng `ACTIVE` tại cùng thời điểm.
-   Ngày kết thúc phải sau ngày bắt đầu.
-   Tiền thuê và tiền cọc không âm.
-   Phòng phải `AVAILABLE` hoặc trạng thái phù hợp theo chính sách trước
    khi ký hợp đồng.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Tạo hợp đồng

-   **Given:** `P101` đang AVAILABLE và khách thuê đã tồn tại.
-   **When:** Nhập ngày thuê `01/10/2026`, kết thúc `01/10/2027`, giá
    `3.000.000`, cọc `3.000.000`.
-   **Then:** Hợp đồng được tạo `ACTIVE`, phòng chuyển `RENTED`.

### Kịch bản 2: Ngày không hợp lệ

-   **When:** Ngày kết thúc nhỏ hơn hoặc bằng ngày bắt đầu.
-   **Then:** Không cho lưu.

### Kịch bản 3: Phòng đã có hợp đồng Active

-   **When:** Tạo hợp đồng mới cho phòng đang `RENTED`.
-   **Then:** Hệ thống từ chối.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `CONTRACTS`: `id`, `contract_no`, `room_id`, `tenant_id`,
    `start_date`, `end_date`, `rent_price`, `deposit`, `status`,
    `terms`.
-   Unique/index cho `contract_no`, `room_id + status`.
-   Có liên kết tới `ROOMS` và `TENANTS`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US02 và US04.
-   **Là tiền đề cho:** US06-US12 và US14.
-   **Liên quan:** UC07.
