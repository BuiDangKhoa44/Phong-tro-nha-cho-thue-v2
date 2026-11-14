# USER STORY: US06 - XEM, GIA HẠN & CHẤM DỨT HỢP ĐỒNG

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  Thuộc tính                           Chi tiết
  ------------------------------------ ----------------------------------
  **Mã User Story**                    **US06**
  **Tên User Story**                   Xem, Gia hạn & Chấm dứt Hợp đồng
  **Phân hệ (Module)**                 Phân hệ 2: Khách thuê & Hợp đồng
  **Use Case liên quan**               **UC08, UC09, UC10** (DacTa.md)
  **Yêu cầu SRS**                      **\[FR-CON-02\]** (SRS.md)
  **Độ ưu tiên (Priority)**            **Must-Have**
  **Tác nhân chính (Primary Actor)**   Chủ nhà / Nhân viên
  **Trạng thái (Status)**              Ready for Development

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên
-   **Tôi muốn (I want to):** Xem hợp đồng, gia hạn hợp đồng hoặc chấm
    dứt hợp đồng theo đúng quy trình.
-   **Để (So that):** Theo dõi vòng đời hợp đồng và cập nhật trạng thái
    phòng chính xác.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Xem, Gia hạn & Chấm dứt
Hợp đồng** là một phần của quy trình vận hành thực tế. Người dùng cần
xem hợp đồng, gia hạn hợp đồng hoặc chấm dứt hợp đồng theo đúng quy
trình. Mục tiêu là theo dõi vòng đời hợp đồng và cập nhật trạng thái
phòng chính xác.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Chỉ hợp đồng `ACTIVE` mới được gia hạn.
-   Gia hạn phải tạo mốc thời gian mới hợp lệ.
-   Chấm dứt phải ghi ngày và lý do.
-   Khi hợp đồng chấm dứt/expired, phòng có thể chuyển `AVAILABLE` nếu
    không có hợp đồng kế tiếp.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Gia hạn

-   **Given:** Hợp đồng `HD001` đang ACTIVE đến `30/09/2027`.
-   **When:** Chọn gia hạn đến `30/09/2028`.
-   **Then:** Hợp đồng được cập nhật ngày kết thúc và ghi lịch sử gia
    hạn.

### Kịch bản 2: Chấm dứt

-   **When:** Chủ nhà nhập ngày chấm dứt và lý do.
-   **Then:** Hợp đồng chuyển `TERMINATED`, lưu audit và cập nhật trạng
    thái phòng.

### Kịch bản 3: Xem lịch sử

-   **Then:** Hiển thị đầy đủ lần gia hạn/chấm dứt.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `CONTRACTS` và có thể bổ sung `CONTRACT_HISTORY`.
-   Lịch sử gồm `contract_id`, `action`, `old_value`, `new_value`,
    `actor_id`, `created_at`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US05.
-   **Cung cấp dữ liệu cho:** US09, US10, US14.
-   **Liên quan:** UC08, UC09, UC10.
