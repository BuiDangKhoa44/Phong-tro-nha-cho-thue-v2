[Uploading US03_TimKiemLocPhong.md…]()
# USER STORY: US03 - TÌM KIẾM & LỌC PHÒNG

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  -----------------------------------------------------------------------
  Thuộc tính                          Chi tiết
  ----------------------------------- -----------------------------------
  **Mã User Story**                   **US03**

  **Tên User Story**                  Tìm kiếm & Lọc Phòng

  **Phân hệ (Module)**                Phân hệ 1: Quản lý Cơ sở & Phòng

  **Use Case liên quan**              **UC05** (DacTa.md)

  **Yêu cầu SRS**                     **\[FR-ROOM-02\]** (SRS.md)

  **Độ ưu tiên (Priority)**           **Must-Have**

  **Tác nhân chính (Primary Actor)**  Chủ nhà / Nhân viên / Khách thuê

  **Trạng thái (Status)**             Ready for Development
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên / Khách thuê
-   **Tôi muốn (I want to):** Tìm kiếm và lọc phòng theo nhà, giá, diện
    tích, sức chứa và trạng thái.
-   **Để (So that):** Nhanh chóng xác định phòng phù hợp hoặc phòng đang
    còn trống.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Tìm kiếm & Lọc Phòng** là
một phần của quy trình vận hành thực tế. Người dùng cần tìm kiếm và lọc
phòng theo nhà, giá, diện tích, sức chứa và trạng thái. Mục tiêu là
nhanh chóng xác định phòng phù hợp hoặc phòng đang còn trống.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Chỉ hiển thị các phòng mà actor được phép xem.
-   Bộ lọc giá phải xử lý khoảng `min/max`.
-   Tìm kiếm theo mã/tên phòng không phân biệt hoa thường.
-   Kết quả phải phản ánh trạng thái hiện tại.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Tìm phòng trống

-   **Given:** Có nhiều phòng với các trạng thái khác nhau.
-   **When:** Chọn `Trạng thái = AVAILABLE`.
-   **Then:** Chỉ các phòng đang trống được hiển thị.

### Kịch bản 2: Lọc theo giá

-   **When:** Nhập giá từ `2.500.000` đến `4.000.000`.
-   **Then:** Danh sách chỉ chứa phòng trong khoảng giá.

### Kịch bản 3: Không có kết quả

-   **When:** Bộ lọc không khớp phòng nào.
-   **Then:** Hiển thị `Không tìm thấy phòng phù hợp`.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   Query chính trên `ROOMS`.
-   Có index đề xuất cho `property_id`, `status`, `rent_price`.
-   API hỗ trợ `keyword`, `status`, `propertyId`, `minPrice`,
    `maxPrice`, `page`, `pageSize`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US02.
-   **Liên quan:** UC05.
-   **Được sử dụng bởi:** màn hình tìm phòng và Dashboard.
