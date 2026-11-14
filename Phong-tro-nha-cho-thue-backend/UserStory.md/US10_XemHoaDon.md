# USER STORY: US10 - TRA CỨU HÓA ĐƠN & CÔNG NỢ

------------------------------------------------------------------------

## 1. THÔNG TIN CHUNG (METADATA)

  -----------------------------------------------------------------------
  Thuộc tính                          Chi tiết
  ----------------------------------- -----------------------------------
  **Mã User Story**                   **US10**

  **Tên User Story**                  Tra cứu Hóa đơn & Công nợ

  **Phân hệ (Module)**                Phân hệ 4: Hóa đơn & Thanh toán

  **Use Case liên quan**              **UC17** (DacTa.md)

  **Yêu cầu SRS**                     **\[FR-INV-02\]** (SRS.md)

  **Độ ưu tiên (Priority)**           **Must-Have**

  **Tác nhân chính (Primary Actor)**  Chủ nhà / Nhân viên / Khách thuê

  **Trạng thái (Status)**             Ready for Development
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 2. NỘI DUNG USER STORY (STORY STATEMENT)

-   **Là một (As a):** Chủ nhà / Nhân viên / Khách thuê
-   **Tôi muốn (I want to):** Xem hóa đơn, chi tiết các khoản và số tiền
    còn nợ theo kỳ.
-   **Để (So that):** Minh bạch hóa tiền phải trả và hỗ trợ theo dõi
    công nợ.

------------------------------------------------------------------------

## 3. BỐI CẢNH & MÔ TẢ NGHIỆP VỤ (BUSINESS CONTEXT)

Trong hệ thống quản lý phòng trọ, nghiệp vụ **Tra cứu Hóa đơn & Công
nợ** là một phần của quy trình vận hành thực tế. Người dùng cần xem hóa
đơn, chi tiết các khoản và số tiền còn nợ theo kỳ. Mục tiêu là minh bạch
hóa tiền phải trả và hỗ trợ theo dõi công nợ.

------------------------------------------------------------------------

## 4. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

-   Khách thuê chỉ được xem hóa đơn của chính mình.
-   Tổng tiền, đã trả và còn nợ phải nhất quán.
-   Hóa đơn `PAID` không được chỉnh sửa số tiền tùy tiện.

------------------------------------------------------------------------

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA - AC)

### Kịch bản 1: Khách xem hóa đơn

-   **When:** Khách thuê mở kỳ tháng 10.
-   **Then:** Hiển thị tiền phòng, điện, nước, dịch vụ, tổng cộng và
    trạng thái thanh toán.

### Kịch bản 2: Lọc hóa đơn chưa thanh toán

-   **When:** Chủ nhà chọn `UNPAID/OVERDUE`.
-   **Then:** Hệ thống trả danh sách công nợ tương ứng.

### Kịch bản 3: Truy cập trái quyền

-   **When:** Tenant cố xem hóa đơn của người khác.
-   **Then:** API trả `403 Forbidden`.

------------------------------------------------------------------------

## 6. ĐẶC TẢ KỸ THUẬT & DỮ LIỆU LIÊN QUAN (TECHNICAL & DATA SPECS)

### 6.1. Thực thể CSDL liên quan

-   Query từ `INVOICES`, join `INVOICE_ITEMS`, `CONTRACTS`, `TENANTS`.
-   Có thể tạo view `V_TENANT_DEBT` cho báo cáo công nợ.

### 6.2. Yêu cầu kỹ thuật / UI-UX

-   API phải kiểm tra Authentication và Authorization ở Backend.
-   Các thao tác nghiệp vụ quan trọng phải ghi Audit Log.
-   Form phải hiển thị lỗi validation tại trường dữ liệu tương ứng.
-   Danh sách cần hỗ trợ tìm kiếm, lọc và phân trang khi số lượng bản
    ghi lớn.

------------------------------------------------------------------------

## 7. MỐI QUAN HỆ & ĐIỀU KIỆN TIÊN QUYẾT (TRACEABILITY & DEPENDENCIES)

-   **Điều kiện tiên quyết:** US09.
-   **Cung cấp dữ liệu cho:** US11, US12, US14.
-   **Liên quan:** UC17.
