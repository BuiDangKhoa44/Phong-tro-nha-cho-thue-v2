[Phan_tich_Actors_Use_Case_Quan_ly_Phong_Tro.md](https://github.com/user-attachments/files/32992862/Phan_tich_Actors_Use_Case_Quan_ly_Phong_Tro.md)
# PHÂN TÍCH ACTORS VÀ USE CASE
## Công nghệ cơ sở dữ liệu

- **Hệ quản trị cơ sở dữ liệu (DBMS):** MySQL.
- **Tên cơ sở dữ liệu:** `rental_management`.
- **Mục đích:** Lưu trữ và quản lý dữ liệu về nhà trọ, phòng thuê, khách thuê, hợp đồng, chỉ số điện nước, hóa đơn, thanh toán và tiền cọc.
- **Yêu cầu:** Đảm bảo tính toàn vẹn dữ liệu, hỗ trợ truy vấn và liên kết dữ liệu giữa các nghiệp vụ.
## Hệ thống quản lý phòng trọ và nhà cho thuê

> **Vai trò tài liệu:** Business Analyst (BA)\
> **Mục tiêu:** Xác định các tác nhân (Actors), các chức năng nghiệp vụ
> (Use Cases) và phạm vi của hệ thống quản lý phòng trọ/nhà cho thuê.

------------------------------------------------------------------------

## 1. Tổng quan hệ thống

### 1.1. Mục tiêu

Hệ thống quản lý phòng trọ và nhà cho thuê hỗ trợ chủ nhà hoặc đơn vị
quản lý trong việc quản lý nhà, phòng, khách thuê, hợp đồng, điện nước,
hóa đơn, thanh toán, yêu cầu sửa chữa và báo cáo.

Hệ thống đồng thời cung cấp cổng chức năng cho khách thuê để theo dõi
hợp đồng, hóa đơn, thanh toán và gửi yêu cầu hỗ trợ.

### 1.2. Phạm vi

Hệ thống bao gồm các nhóm nghiệp vụ chính:

1.  Quản lý tài khoản và phân quyền.
2.  Quản lý nhà/khu trọ.
3.  Quản lý phòng.
4.  Quản lý khách thuê.
5.  Quản lý hợp đồng thuê.
6.  Quản lý điện, nước và dịch vụ.
7.  Quản lý hóa đơn.
8.  Quản lý thanh toán.
9.  Quản lý yêu cầu sửa chữa.
10. Quản lý thông báo.
11. Tra cứu thông tin phòng.
12. Báo cáo và thống kê.

### 1.3. Ngoài phạm vi ở phiên bản đầu

Các chức năng sau có thể để ở phiên bản mở rộng:

-   Quản lý môi giới/bên trung gian.
-   Tích hợp cổng thanh toán thực tế.
-   Tích hợp căn cước công dân điện tử.
-   Tích hợp hóa đơn điện tử của bên thứ ba.
-   Tích hợp IoT để tự động đọc công tơ.
-   Quản lý nhiều công ty/chuỗi bất động sản ở cấp Enterprise.

------------------------------------------------------------------------

# 2. Xác định Actors

## 2.1. Actor chính

### Actor 01 -- Chủ nhà (Owner)

**Mô tả:** Người sở hữu nhà/khu trọ và chịu trách nhiệm quản lý hoạt
động cho thuê.

**Mục tiêu:** - Theo dõi tình trạng phòng. - Quản lý khách thuê và hợp
đồng. - Theo dõi doanh thu, công nợ. - Quản lý điện nước và hóa đơn. -
Theo dõi yêu cầu sửa chữa. - Xem báo cáo hoạt động.

**Các Use Case chính:** - Đăng nhập/đăng xuất. - Quản lý thông tin
nhà. - Quản lý phòng. - Quản lý khách thuê. - Quản lý hợp đồng. - Quản
lý giá thuê và dịch vụ. - Xem/chỉnh sửa chỉ số điện nước. - Quản lý hóa
đơn. - Ghi nhận thanh toán. - Quản lý yêu cầu sửa chữa. - Quản lý thông
báo. - Xem báo cáo thống kê.

------------------------------------------------------------------------

### Actor 02 -- Nhân viên quản lý (Property Manager/Staff)

**Mô tả:** Người được chủ nhà phân quyền để thực hiện các nghiệp vụ quản
lý hằng ngày.

**Mục tiêu:** - Thực hiện nghiệp vụ vận hành thay cho chủ nhà. - Cập
nhật dữ liệu phòng, khách thuê và hóa đơn. - Tiếp nhận và xử lý yêu cầu
của khách thuê.

**Các Use Case chính:** - Đăng nhập/đăng xuất. - Xem danh sách phòng. -
Quản lý khách thuê. - Quản lý hợp đồng theo quyền được cấp. - Nhập chỉ
số điện/nước. - Lập và cập nhật hóa đơn. - Ghi nhận thanh toán. - Tiếp
nhận yêu cầu sửa chữa. - Cập nhật trạng thái sửa chữa. - Gửi thông báo.

> **Lưu ý BA:** Quyền của Nhân viên phải được cấu hình bằng phân quyền;
> không mặc định có toàn bộ quyền của Chủ nhà.

------------------------------------------------------------------------

### Actor 03 -- Khách thuê (Tenant)

**Mô tả:** Người đang thuê phòng/nhà và sử dụng các dịch vụ của hệ
thống.

**Mục tiêu:** - Theo dõi thông tin thuê. - Xem hợp đồng. - Xem hóa
đơn. - Theo dõi thanh toán. - Gửi yêu cầu sửa chữa. - Nhận thông báo từ
chủ nhà/quản lý.

**Các Use Case chính:** - Đăng ký tài khoản. - Đăng nhập/đăng xuất. -
Cập nhật hồ sơ cá nhân. - Xem thông tin phòng. - Xem hợp đồng. - Xem hóa
đơn. - Xem lịch sử thanh toán. - Thực hiện/yêu cầu thanh toán. - Gửi yêu
cầu sửa chữa. - Theo dõi trạng thái yêu cầu sửa chữa. - Xem thông báo.

------------------------------------------------------------------------

### Actor 04 -- Quản trị viên hệ thống (System Administrator)

**Mô tả:** Người quản trị kỹ thuật của hệ thống, chịu trách nhiệm tài
khoản, phân quyền và cấu hình hệ thống.

**Mục tiêu:** - Quản lý tài khoản người dùng. - Phân quyền. - Quản lý
các cấu hình dùng chung. - Theo dõi hoạt động và bảo đảm hệ thống vận
hành.

**Các Use Case chính:** - Đăng nhập. - Quản lý tài khoản. - Khóa/mở khóa
tài khoản. - Phân quyền người dùng. - Quản lý vai trò. - Quản lý cấu
hình hệ thống. - Xem nhật ký hoạt động.

------------------------------------------------------------------------

## 2.2. Actor phụ / Actor hệ thống bên ngoài

### Actor 05 -- Cổng thanh toán (Payment Gateway)

**Mô tả:** Hệ thống bên ngoài dùng để xử lý thanh toán trực tuyến.

**Tương tác:** - Nhận yêu cầu thanh toán. - Xử lý giao dịch. - Trả kết
quả giao dịch. - Cập nhật trạng thái thanh toán.

> Nếu phiên bản đầu chỉ ghi nhận thanh toán tiền mặt/chuyển khoản thủ
> công thì Actor này có thể chưa cần triển khai.

------------------------------------------------------------------------

### Actor 06 -- Dịch vụ Email/SMS/Push Notification

**Mô tả:** Dịch vụ bên ngoài dùng để gửi thông báo.

**Tương tác:** - Nhận yêu cầu gửi thông báo. - Gửi thông báo đến người
dùng. - Trả trạng thái gửi nếu hệ thống hỗ trợ theo dõi.

------------------------------------------------------------------------

# 3. Danh sách Use Case

## UC01 -- Đăng ký tài khoản

**Actor:** Khách thuê

**Mục đích:** Tạo tài khoản để sử dụng hệ thống.

**Kết quả:** Tài khoản được tạo thành công.

------------------------------------------------------------------------

## UC02 -- Đăng nhập

**Actor:** Chủ nhà, Nhân viên, Khách thuê, Quản trị viên

**Mục đích:** Xác thực người dùng và xác định quyền truy cập.

**Kết quả:** Người dùng được chuyển đến màn hình phù hợp với vai trò.

------------------------------------------------------------------------

## UC03 -- Đăng xuất

**Actor:** Tất cả người dùng đã đăng nhập

**Mục đích:** Kết thúc phiên đăng nhập.

------------------------------------------------------------------------

## UC04 -- Quản lý tài khoản

**Actor:** Quản trị viên

**Chức năng:** - Xem tài khoản. - Tạo tài khoản. - Chỉnh sửa tài
khoản. - Khóa/mở khóa tài khoản. - Xóa tài khoản theo chính sách hệ
thống.

------------------------------------------------------------------------

## UC05 -- Phân quyền người dùng

**Actor:** Quản trị viên

**Mục đích:** Gán vai trò/quyền cho người dùng.

**Ví dụ vai trò:** - Administrator. - Owner. - Staff. - Tenant.

------------------------------------------------------------------------

## UC06 -- Quản lý thông tin cá nhân

**Actor:** Chủ nhà, Nhân viên, Khách thuê

**Chức năng:** - Xem hồ sơ. - Cập nhật họ tên. - Cập nhật số điện
thoại. - Cập nhật email. - Đổi mật khẩu.

------------------------------------------------------------------------

# 4. Nhóm Use Case: Quản lý nhà/khu trọ

## UC07 -- Thêm nhà/khu trọ

**Actor:** Chủ nhà

**Mục đích:** Khai báo nhà/khu trọ thuộc quyền quản lý.

**Thông tin chính:** - Tên nhà/khu trọ. - Địa chỉ. - Mô tả. - Thông tin
liên hệ.

------------------------------------------------------------------------

## UC08 -- Cập nhật nhà/khu trọ

**Actor:** Chủ nhà

**Mục đích:** Chỉnh sửa thông tin nhà/khu trọ.

------------------------------------------------------------------------

## UC09 -- Xem thông tin nhà/khu trọ

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC10 -- Xóa/ngừng quản lý nhà/khu trọ

**Actor:** Chủ nhà

> BA nên quy định không xóa vật lý nếu nhà đã phát sinh hợp đồng/hóa
> đơn; có thể dùng trạng thái **Ngừng hoạt động** để bảo toàn lịch sử.

------------------------------------------------------------------------

# 5. Nhóm Use Case: Quản lý phòng

## UC11 -- Thêm phòng

**Actor:** Chủ nhà, Nhân viên có quyền

**Thông tin chính:** - Mã/số phòng. - Tên phòng. - Diện tích. - Giá
thuê. - Tầng. - Trạng thái. - Tiện ích.

------------------------------------------------------------------------

## UC12 -- Cập nhật phòng

**Actor:** Chủ nhà, Nhân viên có quyền

------------------------------------------------------------------------

## UC13 -- Xem danh sách phòng

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

## UC14 -- Xem chi tiết phòng

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

## UC15 -- Cập nhật trạng thái phòng

**Actor:** Chủ nhà, Nhân viên có quyền

**Trạng thái đề xuất:** - Trống. - Đang đặt. - Đang thuê. - Đang sửa
chữa. - Ngừng kinh doanh.

------------------------------------------------------------------------

## UC16 -- Tìm kiếm/lọc phòng

**Actor:** Chủ nhà, Nhân viên, Khách thuê

**Tiêu chí có thể gồm:** - Mã phòng. - Giá. - Diện tích. - Trạng thái. -
Khu vực/nhà.

------------------------------------------------------------------------

# 6. Nhóm Use Case: Quản lý khách thuê

## UC17 -- Thêm khách thuê

**Actor:** Chủ nhà, Nhân viên

**Thông tin chính:** - Họ tên. - Số điện thoại. - Email. - CCCD/giấy tờ
tùy thân. - Địa chỉ. - Thông tin liên hệ khẩn cấp.

------------------------------------------------------------------------

## UC18 -- Cập nhật khách thuê

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC19 -- Xem hồ sơ khách thuê

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC20 -- Tìm kiếm khách thuê

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC21 -- Xem lịch sử thuê

**Actor:** Chủ nhà, Nhân viên

**Mục đích:** Tra cứu phòng đã thuê, thời gian thuê và các hợp đồng
trước đây.

------------------------------------------------------------------------

# 7. Nhóm Use Case: Quản lý hợp đồng

## UC22 -- Tạo hợp đồng thuê

**Actor:** Chủ nhà, Nhân viên có quyền

**Thông tin chính:** - Khách thuê. - Phòng. - Ngày bắt đầu. - Ngày kết
thúc. - Giá thuê. - Tiền cọc. - Chu kỳ thanh toán. - Điều khoản. - Dịch
vụ áp dụng.

------------------------------------------------------------------------

## UC23 -- Xem hợp đồng

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

## UC24 -- Cập nhật hợp đồng

**Actor:** Chủ nhà, Nhân viên có quyền

------------------------------------------------------------------------

## UC25 -- Gia hạn hợp đồng

**Actor:** Chủ nhà, Nhân viên có quyền

------------------------------------------------------------------------

## UC26 -- Chấm dứt hợp đồng

**Actor:** Chủ nhà, Nhân viên có quyền

**Kết quả:** - Hợp đồng chuyển sang trạng thái kết thúc. - Phòng có thể
chuyển về trạng thái trống sau khi hoàn tất quy trình trả phòng.

------------------------------------------------------------------------

## UC27 -- Theo dõi hợp đồng sắp hết hạn

**Actor:** Chủ nhà, Nhân viên

**Mục đích:** Phát hiện hợp đồng sắp hết hạn để liên hệ khách thuê.

------------------------------------------------------------------------

# 8. Nhóm Use Case: Quản lý điện, nước và dịch vụ

## UC28 -- Khai báo loại dịch vụ

**Actor:** Chủ nhà

**Ví dụ:** - Internet. - Rác. - Gửi xe. - Phí quản lý. - Dịch vụ khác.

------------------------------------------------------------------------

## UC29 -- Cấu hình đơn giá điện

**Actor:** Chủ nhà

------------------------------------------------------------------------

## UC30 -- Cấu hình đơn giá nước

**Actor:** Chủ nhà

------------------------------------------------------------------------

## UC31 -- Nhập chỉ số điện

**Actor:** Chủ nhà, Nhân viên

**Thông tin:** - Phòng. - Kỳ ghi. - Chỉ số cũ. - Chỉ số mới. - Ngày ghi.

------------------------------------------------------------------------

## UC32 -- Nhập chỉ số nước

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC33 -- Tính tiền điện

**Actor:** Hệ thống

**Mô tả:** Hệ thống tính lượng điện tiêu thụ và số tiền theo đơn giá/cấu
hình.

------------------------------------------------------------------------

## UC34 -- Tính tiền nước

**Actor:** Hệ thống

------------------------------------------------------------------------

# 9. Nhóm Use Case: Quản lý hóa đơn

## UC35 -- Tạo hóa đơn

**Actor:** Chủ nhà, Nhân viên

**Bao gồm:** - Tiền phòng. - Tiền điện. - Tiền nước. - Phí dịch vụ. -
Khoản phát sinh. - Giảm trừ nếu có.

------------------------------------------------------------------------

## UC36 -- Tính tổng tiền hóa đơn

**Actor:** Hệ thống

**Công thức khái quát:**

`Tổng tiền = Tiền phòng + Tiền điện + Tiền nước + Phí dịch vụ + Phát sinh - Giảm trừ`

------------------------------------------------------------------------

## UC37 -- Xem hóa đơn

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

## UC38 -- Cập nhật hóa đơn

**Actor:** Chủ nhà, Nhân viên có quyền

------------------------------------------------------------------------

## UC39 -- Gửi thông báo hóa đơn

**Actor:** Chủ nhà, Nhân viên

**Actor ngoài:** Dịch vụ Email/SMS/Push

------------------------------------------------------------------------

# 10. Nhóm Use Case: Thanh toán

## UC40 -- Ghi nhận thanh toán

**Actor:** Chủ nhà, Nhân viên

**Thông tin:** - Hóa đơn. - Số tiền. - Thời gian. - Phương thức. - Người
thực hiện. - Ghi chú.

------------------------------------------------------------------------

## UC41 -- Thanh toán trực tuyến

**Actor:** Khách thuê

**Actor ngoài:** Cổng thanh toán

------------------------------------------------------------------------

## UC42 -- Xử lý giao dịch thanh toán

**Actor:** Cổng thanh toán

**Mục đích:** Xử lý giao dịch và trả kết quả.

------------------------------------------------------------------------

## UC43 -- Cập nhật trạng thái thanh toán

**Actor:** Hệ thống

**Trạng thái đề xuất:** - Chưa thanh toán. - Thanh toán một phần. - Đã
thanh toán. - Quá hạn. - Giao dịch thất bại.

------------------------------------------------------------------------

## UC44 -- Xem lịch sử thanh toán

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

# 11. Nhóm Use Case: Quản lý sửa chữa

## UC45 -- Gửi yêu cầu sửa chữa

**Actor:** Khách thuê

**Thông tin:** - Phòng. - Loại sự cố. - Mô tả. - Hình ảnh nếu có. - Thời
gian gửi.

------------------------------------------------------------------------

## UC46 -- Tiếp nhận yêu cầu sửa chữa

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC47 -- Phân công xử lý sửa chữa

**Actor:** Chủ nhà, Nhân viên có quyền

------------------------------------------------------------------------

## UC48 -- Cập nhật trạng thái sửa chữa

**Actor:** Chủ nhà, Nhân viên

**Trạng thái:** - Mới tạo. - Đã tiếp nhận. - Đang xử lý. - Chờ xử lý. -
Hoàn thành. - Đã đóng.

------------------------------------------------------------------------

## UC49 -- Theo dõi yêu cầu sửa chữa

**Actor:** Khách thuê, Chủ nhà, Nhân viên

------------------------------------------------------------------------

# 12. Nhóm Use Case: Thông báo

## UC50 -- Tạo thông báo

**Actor:** Chủ nhà, Nhân viên

------------------------------------------------------------------------

## UC51 -- Gửi thông báo

**Actor:** Hệ thống

**Actor ngoài:** Dịch vụ Email/SMS/Push

------------------------------------------------------------------------

## UC52 -- Xem thông báo

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

## UC53 -- Đánh dấu đã đọc

**Actor:** Chủ nhà, Nhân viên, Khách thuê

------------------------------------------------------------------------

# 13. Nhóm Use Case: Báo cáo và thống kê

## UC54 -- Xem tổng quan dashboard

**Actor:** Chủ nhà, Nhân viên theo quyền

**Thông tin có thể gồm:** - Tổng số phòng. - Phòng trống. - Phòng đang
thuê. - Hợp đồng sắp hết hạn. - Hóa đơn chưa thanh toán. - Doanh thu. -
Yêu cầu sửa chữa.

------------------------------------------------------------------------

## UC55 -- Báo cáo doanh thu

**Actor:** Chủ nhà

**Có thể lọc theo:** - Ngày. - Tháng. - Quý. - Năm. - Nhà/khu trọ.

------------------------------------------------------------------------

## UC56 -- Báo cáo công nợ

**Actor:** Chủ nhà, Nhân viên theo quyền

------------------------------------------------------------------------

## UC57 -- Báo cáo tình trạng phòng

**Actor:** Chủ nhà

------------------------------------------------------------------------

## UC58 -- Báo cáo khách thuê

**Actor:** Chủ nhà

------------------------------------------------------------------------

# 14. Use Case tổng hợp theo Actor

  -----------------------------------------------------------------------
  Actor                               Các Use Case tiêu biểu
  ----------------------------------- -----------------------------------
  **Chủ nhà**                         Quản lý nhà, phòng, khách thuê, hợp
                                      đồng, điện nước, hóa đơn, thanh
                                      toán, sửa chữa, thông báo, báo cáo

  **Nhân viên**                       Quản lý phòng, khách thuê, hợp đồng
                                      theo quyền, điện nước, hóa đơn,
                                      thanh toán, sửa chữa, thông báo

  **Khách thuê**                      Đăng ký, đăng nhập, hồ sơ, xem
                                      phòng, hợp đồng, hóa đơn, thanh
                                      toán, sửa chữa, thông báo

  **Quản trị viên**                   Tài khoản, phân quyền, vai trò, cấu
                                      hình, nhật ký hệ thống

  **Cổng thanh toán**                 Xử lý và trả kết quả giao dịch

  **Dịch vụ Email/SMS/Push**          Gửi thông báo
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 15. Quan hệ Include/Extend đề xuất

## 15.1. Quan hệ `<<include>>`

`<<include>>` dùng khi một Use Case luôn cần thực hiện Use Case khác.

### Đề xuất

-   **Tạo hóa đơn** `<<include>>` **Tính tổng tiền hóa đơn**
-   **Tạo hóa đơn** `<<include>>` **Tính tiền điện**
-   **Tạo hóa đơn** `<<include>>` **Tính tiền nước**
-   **Thanh toán trực tuyến** `<<include>>` **Xử lý giao dịch thanh
    toán**
-   **Ghi nhận thanh toán** `<<include>>` **Cập nhật trạng thái thanh
    toán**
-   **Tạo hợp đồng** `<<include>>` **Kiểm tra phòng khả dụng**
-   **Đăng nhập** `<<include>>` **Xác thực tài khoản**

------------------------------------------------------------------------

## 15.2. Quan hệ `<<extend>>`

`<<extend>>` dùng khi một hành vi chỉ xảy ra trong điều kiện nhất định.

### Đề xuất

-   **Thanh toán trực tuyến** `<<extend>>` **Xem hóa đơn**
-   **Gửi thông báo hóa đơn** `<<extend>>` **Tạo hóa đơn**
-   **Theo dõi hợp đồng sắp hết hạn** `<<extend>>` **Quản lý hợp đồng**
-   **Gửi yêu cầu sửa chữa** `<<extend>>` **Quản lý yêu cầu sửa chữa**

> Khi vẽ UML chính thức, cần xem xét lại từng quan hệ dựa trên đặc tả
> nghiệp vụ cuối cùng; không nên lạm dụng `include/extend`.

------------------------------------------------------------------------

# 16. Sơ đồ Use Case tổng quát -- Mermaid

Có thể dán đoạn mã dưới đây vào công cụ hỗ trợ Mermaid để xem sơ đồ:

``` mermaid
flowchart LR

    Owner["Chủ nhà"]
    Staff["Nhân viên"]
    Tenant["Khách thuê"]
    Admin["Quản trị viên"]
    PG["Cổng thanh toán"]
    Notify["Email / SMS / Push"]

    subgraph SYS["HỆ THỐNG QUẢN LÝ PHÒNG TRỌ / NHÀ CHO THUÊ"]

        UC1(("Đăng nhập"))
        UC2(("Quản lý nhà"))
        UC3(("Quản lý phòng"))
        UC4(("Quản lý khách thuê"))
        UC5(("Quản lý hợp đồng"))
        UC6(("Quản lý điện nước"))
        UC7(("Quản lý hóa đơn"))
        UC8(("Quản lý thanh toán"))
        UC9(("Quản lý sửa chữa"))
        UC10(("Quản lý thông báo"))
        UC11(("Báo cáo & thống kê"))
        UC12(("Quản lý tài khoản"))
        UC13(("Phân quyền"))
        UC14(("Đăng ký tài khoản"))
        UC15(("Xem hợp đồng"))
        UC16(("Xem hóa đơn"))
        UC17(("Thanh toán trực tuyến"))
        UC18(("Gửi yêu cầu sửa chữa"))

    end

    Owner --> UC1
    Owner --> UC2
    Owner --> UC3
    Owner --> UC4
    Owner --> UC5
    Owner --> UC6
    Owner --> UC7
    Owner --> UC8
    Owner --> UC9
    Owner --> UC10
    Owner --> UC11

    Staff --> UC1
    Staff --> UC3
    Staff --> UC4
    Staff --> UC5
    Staff --> UC6
    Staff --> UC7
    Staff --> UC8
    Staff --> UC9
    Staff --> UC10

    Tenant --> UC14
    Tenant --> UC1
    Tenant --> UC15
    Tenant --> UC16
    Tenant --> UC17
    Tenant --> UC18
    Tenant --> UC10

    Admin --> UC1
    Admin --> UC12
    Admin --> UC13

    UC17 --> PG
    UC10 --> Notify
```

------------------------------------------------------------------------

# 17. Quy tắc phân quyền nghiệp vụ đề xuất

  Chức năng                Chủ nhà   Nhân viên    Khách thuê   Admin
  ----------------------- --------- ------------ ------------ -------
  Quản lý nhà                 ✓      Theo quyền       \-        \-
  Quản lý phòng               ✓      Theo quyền      Xem        \-
  Quản lý khách thuê          ✓      Theo quyền   Hồ sơ mình    \-
  Quản lý hợp đồng            ✓      Theo quyền      Xem        \-
  Nhập điện nước              ✓          ✓            \-        \-
  Quản lý hóa đơn             ✓          ✓           Xem        \-
  Ghi nhận thanh toán         ✓          ✓            \-        \-
  Thanh toán trực tuyến      \-          \-           ✓         \-
  Yêu cầu sửa chữa            ✓          ✓            ✓         \-
  Báo cáo                     ✓      Theo quyền       \-        \-
  Quản lý tài khoản          \-          \-           \-         ✓
  Phân quyền                 \-          \-           \-         ✓

------------------------------------------------------------------------

# 18. Danh sách Use Case ưu tiên cho phiên bản MVP

Nếu đây là đồ án sinh viên và cần giới hạn phạm vi, nên triển khai trước
các Use Case cốt lõi:

### Nhóm 1 -- Tài khoản

-   UC02 Đăng nhập
-   UC03 Đăng xuất
-   UC06 Quản lý thông tin cá nhân

### Nhóm 2 -- Phòng

-   UC11 Thêm phòng
-   UC12 Cập nhật phòng
-   UC13 Xem danh sách phòng
-   UC15 Cập nhật trạng thái phòng

### Nhóm 3 -- Khách thuê

-   UC17 Thêm khách thuê
-   UC18 Cập nhật khách thuê
-   UC19 Xem hồ sơ khách thuê

### Nhóm 4 -- Hợp đồng

-   UC22 Tạo hợp đồng
-   UC23 Xem hợp đồng
-   UC25 Gia hạn hợp đồng
-   UC26 Chấm dứt hợp đồng

### Nhóm 5 -- Điện nước

-   UC31 Nhập chỉ số điện
-   UC32 Nhập chỉ số nước
-   UC33 Tính tiền điện
-   UC34 Tính tiền nước

### Nhóm 6 -- Hóa đơn

-   UC35 Tạo hóa đơn
-   UC36 Tính tổng tiền
-   UC37 Xem hóa đơn

### Nhóm 7 -- Thanh toán

-   UC40 Ghi nhận thanh toán
-   UC43 Cập nhật trạng thái thanh toán
-   UC44 Xem lịch sử thanh toán

### Nhóm 8 -- Sửa chữa

-   UC45 Gửi yêu cầu sửa chữa
-   UC46 Tiếp nhận yêu cầu
-   UC48 Cập nhật trạng thái
-   UC49 Theo dõi yêu cầu

### Nhóm 9 -- Báo cáo

-   UC54 Dashboard
-   UC55 Báo cáo doanh thu
-   UC56 Báo cáo công nợ
-   UC57 Báo cáo tình trạng phòng

------------------------------------------------------------------------

# 19. Kết luận phân tích BA

Hệ thống có **6 Actors chính/phụ**:

1.  **Chủ nhà**
2.  **Nhân viên quản lý**
3.  **Khách thuê**
4.  **Quản trị viên hệ thống**
5.  **Cổng thanh toán**
6.  **Dịch vụ Email/SMS/Push Notification**

Các Use Case được tổ chức thành **9 nhóm nghiệp vụ lớn**:

1.  Tài khoản & phân quyền.
2.  Nhà/khu trọ.
3.  Phòng.
4.  Khách thuê.
5.  Hợp đồng.
6.  Điện nước & dịch vụ.
7.  Hóa đơn & thanh toán.
8.  Sửa chữa & thông báo.
9.  Báo cáo & thống kê.

Đây là nền tảng để thực hiện các bước phân tích tiếp theo:

**Actors & Use Cases → Use Case Diagram → Use Case Specification →
Activity Diagram → Sequence Diagram → Class Diagram → ERD → Thiết kế
giao diện → Thiết kế hệ thống → Code → Test.**
