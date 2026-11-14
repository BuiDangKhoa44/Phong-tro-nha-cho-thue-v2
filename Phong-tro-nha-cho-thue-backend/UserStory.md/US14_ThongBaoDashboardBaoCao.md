# USER STORY: US14 - THÔNG BÁO, DASHBOARD & BÁO CÁO

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  -----------------------------------------------------------------------
  Thuộc tính                          Chi tiết
  ----------------------------------- -----------------------------------
  **Mã User Story**                   **US14**

  **Tên User Story**                  Thông báo, Dashboard & Báo cáo

  **Phân hệ (Module)**                Phân hệ 5: Sửa chữa & Thông báo;
                                      Phân hệ 6: Báo cáo

  **Use Case liên quan**              **UC22, UC23, UC24, UC25, UC26**
                                      (DacTa.md)

  **Yêu cầu SRS**                     **\[FR-REP-01\]** (SRS.md)

  **Độ ưu tiên (Priority)**           **Must-Have**

  **Tác nhân chính (Primary Actor)**  Chủ nhà / Nhân viên / Khách thuê /
                                      Hệ thống

  **Trạng thái (Status)**             Ready for Development
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên / Khách thuê / Hệ thống
-   **Tôi muốn (I want to):** Nhận thông báo, xem Dashboard và tạo các
    báo cáo doanh thu, công nợ, tình trạng phòng.
-   **Để (So that):** Theo dõi hoạt động kinh doanh và đưa ra quyết định
    nhanh dựa trên dữ liệu.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Thông báo, Dashboard & Báo
cáo** là một phần của quy trình vận hành thực tế. Người dùng cần nhận
thông báo, xem dashboard và tạo các báo cáo doanh thu, công nợ, tình
trạng phòng. Mục tiêu là theo dõi hoạt động kinh doanh và đưa ra quyết
định nhanh dựa trên dữ liệu.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Tenant chỉ nhận thông báo liên quan đến mình.
-   Dashboard doanh thu lấy từ payment/invoice đã hợp lệ.
-   Công nợ = tổng phải thu - tổng thanh toán hợp lệ.
-   Báo cáo phải lọc được theo thời gian, nhà/khu trọ và trạng thái.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Dashboard

-   **Then:** Hiển thị số phòng trống, đang thuê, doanh thu kỳ, công nợ
    và yêu cầu sửa chữa.

### Kịch bản 2: Báo cáo doanh thu

-   **When:** Chủ nhà chọn tháng 10/2026.
-   **Then:** Hệ thống tổng hợp các khoản thanh toán thành công trong
    kỳ.

### Kịch bản 3: Cảnh báo công nợ

-   **When:** Hóa đơn quá hạn.
-   **Then:** Dashboard và thông báo hiển thị số tiền còn nợ.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   `NOTIFICATIONS`, `NOTIFICATION_READS`, `AUDIT_LOGS`.
-   Báo cáo sử dụng `INVOICES`, `PAYMENTS`, `ROOMS`, `CONTRACTS`,
    `MAINTENANCE_REQUESTS`.
-   API báo cáo phải hỗ trợ filter theo `fromDate`, `toDate`,
    `propertyId`.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US02, US05, US09, US11, US13.
-   **Liên quan:** UC22-UC26.
-   Là tầng tổng hợp dữ liệu cho Dashboard/Report.
