# ĐẶC TẢ USE CASE

## HỆ THỐNG QUẢN LÝ PHÒNG TRỌ / NHÀ CHO THUÊ

> Vai trò: Business Analyst (BA)\
> Mục đích: Đặc tả chi tiết các Use Case để làm cơ sở thiết kế UI,
> Database, API, lập trình và kiểm thử.

------------------------------------------------------------------------

## 1. TỔNG QUAN HỆ THỐNG

Hệ thống quản lý phòng trọ/nhà cho thuê hỗ trợ toàn bộ quá trình vận
hành: quản lý nhà, phòng, khách thuê, hợp đồng, điện nước, dịch vụ, hóa
đơn, thanh toán, sửa chữa, thông báo và báo cáo.

### Các nghiệp vụ trọng tâm

1.  Quản lý tài khoản và phân quyền.
2.  Quản lý nhà/khu trọ.
3.  Quản lý phòng.
4.  Quản lý khách thuê.
5.  Quản lý hợp đồng.
6.  Quản lý điện, nước và dịch vụ.
7.  Quản lý hóa đơn.
8.  Quản lý thanh toán.
9.  Quản lý sửa chữa.
10. Thông báo.
11. Dashboard và báo cáo.

------------------------------------------------------------------------

## 2. DANH SÁCH TÁC NHÂN (ACTORS)

  ------------------------------------------------------------------------
  STT               Actor              Loại              Mô tả
  ----------------- ------------------ ----------------- -----------------
  1                 **Chủ nhà          Human - Primary   Quản lý nhà,
                    (Owner)**                            phòng, khách
                                                         thuê, hợp đồng,
                                                         điện nước, hóa
                                                         đơn, thanh toán,
                                                         sửa chữa và báo
                                                         cáo.

  2                 **Nhân viên        Human - Primary   Thực hiện các
                    (Staff)**                            nghiệp vụ được
                                                         Chủ nhà phân
                                                         quyền.

  3                 **Khách thuê       Human - Primary   Theo dõi phòng,
                    (Tenant)**                           hợp đồng, hóa
                                                         đơn, thanh toán,
                                                         sửa chữa và thông
                                                         báo.

  4                 **Quản trị viên    Human - Primary   Quản lý tài
                    (Admin)**                            khoản, role,
                                                         quyền và cấu hình
                                                         hệ thống.

  5                 **Cổng thanh       System -          Xử lý giao dịch
                    toán**             Secondary         thanh toán trực
                                                         tuyến.

  6                 **Email/SMS/Push   System -          Gửi thông báo đến
                    Service**          Secondary         người dùng.
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 3. MA TRẬN ACTOR - USE CASE

  Mã     Use Case                 Owner     Staff        Tenant     Admin
  ------ ----------------------- ------- ------------ ------------ -------
  UC01   Đăng nhập                  X         X            X          X
  UC02   Đăng ký                                           X       
  UC03   Quản lý nhà                X     Theo quyền               
  UC04   Quản lý phòng              X     Theo quyền      Xem      
  UC05   Tìm kiếm/lọc phòng         X         X            X       
  UC06   Quản lý khách thuê         X     Theo quyền   Hồ sơ mình  
  UC07   Tạo hợp đồng               X     Theo quyền               
  UC08   Xem hợp đồng               X         X            X       
  UC09   Gia hạn hợp đồng           X     Theo quyền               
  UC10   Chấm dứt hợp đồng          X     Theo quyền               
  UC11   Cấu hình dịch vụ           X     Theo quyền               
  UC12   Nhập chỉ số điện           X         X                    
  UC13   Nhập chỉ số nước           X         X                    
  UC14   Tính tiền điện             X         X                    
  UC15   Tính tiền nước             X         X                    
  UC16   Tạo hóa đơn                X         X                    
  UC17   Xem hóa đơn                X         X            X       
  UC18   Ghi nhận thanh toán        X         X                    
  UC19   Thanh toán trực tuyến                             X       
  UC20   Gửi yêu cầu sửa chữa                              X       
  UC21   Xử lý sửa chữa             X         X                    
  UC22   Quản lý thông báo          X         X           Xem      
  UC23   Dashboard                  X     Theo quyền               
  UC24   Báo cáo doanh thu          X     Theo quyền               
  UC25   Báo cáo công nợ            X     Theo quyền               
  UC26   Báo cáo phòng              X     Theo quyền               
  UC27   Quản lý tài khoản                                            X
  UC28   Phân quyền                                                   X

------------------------------------------------------------------------

# 4. ĐẶC TẢ CHI TIẾT USE CASE

## 4.1. UC01 -- Đăng nhập

  Thuộc tính      Nội dung
  --------------- --------------------------------
  Primary Actor   Owner / Staff / Tenant / Admin
  Trigger         Người dùng mở trang đăng nhập
  Priority        Must

### Preconditions

-   Người dùng đã có tài khoản.
-   Tài khoản đang hoạt động.

### Main Flow

1.  Người dùng nhập email/tên đăng nhập.
2.  Nhập mật khẩu.
3.  Nhấn **Đăng nhập**.
4.  Hệ thống kiểm tra tài khoản.
5.  Hệ thống kiểm tra mật khẩu.
6.  Hệ thống xác định Role.
7.  Hệ thống tạo session/token.
8.  Chuyển đến màn hình phù hợp.

### Alternative / Exception

**A1 -- Sai thông tin:** Hiển thị lỗi và cho phép nhập lại.

**A2 -- Tài khoản bị khóa:** Từ chối đăng nhập.

### Acceptance Criteria

-   Đăng nhập đúng thành công.
-   Sai mật khẩu báo lỗi.
-   Tài khoản bị khóa không đăng nhập được.
-   Role được xác định đúng.

------------------------------------------------------------------------

## 4.2. UC02 -- Đăng ký tài khoản

**Primary Actor:** Khách thuê\
**Priority:** Must

### Main Flow

1.  Khách thuê mở trang đăng ký.
2.  Nhập họ tên.
3.  Nhập email/số điện thoại.
4.  Nhập mật khẩu.
5.  Xác nhận mật khẩu.
6.  Nhấn Đăng ký.
7.  Hệ thống validate.
8.  Tạo tài khoản với Role = TENANT.

### Exception

-   Email/số điện thoại đã tồn tại.
-   Mật khẩu không đạt yêu cầu.
-   Mật khẩu xác nhận không khớp.

### Business Rules

-   Người dùng không được tự đăng ký OWNER hoặc ADMIN.

------------------------------------------------------------------------

## 4.3. UC03 -- Quản lý nhà/khu trọ

**Primary Actor:** Chủ nhà\
**Priority:** Must

### Main Flow -- Thêm nhà

1.  Chủ nhà mở **Quản lý nhà**.
2.  Chọn **Thêm nhà**.
3.  Nhập tên nhà.
4.  Nhập địa chỉ.
5.  Nhập mô tả.
6.  Nhập thông tin liên hệ.
7.  Nhấn Lưu.
8.  Hệ thống kiểm tra dữ liệu.
9.  Tạo nhà và gắn với Owner.

### Alternative Flow

-   Thiếu dữ liệu bắt buộc → báo lỗi.
-   Dữ liệu không hợp lệ → không lưu.

### Business Rules

-   Nhà thuộc Owner tạo ra nó.
-   Nhà đã có dữ liệu nghiệp vụ không nên xóa vật lý.
-   Có thể chuyển nhà sang `INACTIVE`.

------------------------------------------------------------------------

## 4.4. UC04 -- Quản lý phòng

**Primary Actor:** Chủ nhà / Nhân viên có quyền\
**Priority:** Must

### Main Flow

1.  Chọn nhà.
2.  Chọn **Thêm phòng**.
3.  Nhập số phòng.
4.  Nhập diện tích.
5.  Nhập giá thuê.
6.  Nhấn Lưu.
7.  Hệ thống kiểm tra mã phòng.
8.  Tạo phòng.
9.  Trạng thái mặc định `AVAILABLE`.

### Business Rules

-   Không trùng mã phòng trong cùng một nhà.
-   Không tạo phòng mới trong nhà `INACTIVE`.

### Trạng thái phòng

``` text
AVAILABLE → RESERVED → RENTED → MAINTENANCE → AVAILABLE
```

Có thêm `INACTIVE`.

------------------------------------------------------------------------

## 4.5. UC05 -- Tìm kiếm/lọc phòng

**Actor:** Owner / Staff / Tenant\
**Priority:** Must

### Main Flow

1.  Mở danh sách phòng.
2.  Nhập từ khóa hoặc chọn bộ lọc.
3.  Hệ thống truy vấn dữ liệu.
4.  Hiển thị danh sách phù hợp.

### Bộ lọc

-   Nhà/khu trọ.
-   Mã phòng.
-   Giá thuê.
-   Diện tích.
-   Trạng thái.

------------------------------------------------------------------------

## 4.6. UC06 -- Quản lý khách thuê

**Actor:** Owner / Staff\
**Priority:** Must

### Main Flow

1.  Mở **Khách thuê**.
2.  Chọn **Thêm khách thuê**.
3.  Nhập họ tên.
4.  Nhập số điện thoại.
5.  Nhập email.
6.  Nhập thông tin giấy tờ.
7.  Nhấn Lưu.
8.  Hệ thống validate.
9.  Tạo hồ sơ.

### Acceptance Criteria

-   Họ tên bắt buộc.
-   Số điện thoại hợp lệ.
-   Hồ sơ có thể liên kết với tài khoản Tenant.
-   Có thể tìm kiếm và xem lịch sử thuê.

------------------------------------------------------------------------

## 4.7. UC07 -- Tạo hợp đồng thuê

**Actor:** Owner / Staff có quyền\
**Priority:** Must

### Preconditions

-   Phòng tồn tại.
-   Phòng đang khả dụng.
-   Khách thuê tồn tại.
-   Phòng chưa có hợp đồng Active trùng thời gian.

### Main Flow

1.  Chọn phòng.
2.  Chọn khách thuê.
3.  Nhập ngày bắt đầu.
4.  Nhập ngày kết thúc.
5.  Nhập giá thuê.
6.  Nhập tiền cọc.
7.  Chọn dịch vụ.
8.  Nhập điều khoản.
9.  Nhấn Tạo.
10. Hệ thống kiểm tra.
11. Tạo hợp đồng.
12. Phòng chuyển `RENTED`.

### Exception

**A1 -- Phòng đang thuê:** Không cho tạo hợp đồng.

**A2 -- Ngày không hợp lệ:** Không cho lưu.

### Business Rules

-   Một phòng không có hai hợp đồng Active cùng thời điểm.
-   Không xóa vật lý hợp đồng đã phát sinh.

------------------------------------------------------------------------

## 4.8. UC08 -- Xem hợp đồng

**Actor:** Owner / Staff / Tenant\
**Priority:** Must

### Main Flow

1.  Mở danh sách hợp đồng.
2.  Chọn hợp đồng.
3.  Hệ thống kiểm tra quyền.
4.  Hiển thị chi tiết.

### Security Rule

Tenant chỉ được xem hợp đồng của chính mình.

------------------------------------------------------------------------

## 4.9. UC09 -- Gia hạn hợp đồng

**Actor:** Owner / Staff\
**Priority:** Should

### Main Flow

1.  Chọn hợp đồng.
2.  Chọn **Gia hạn**.
3.  Nhập ngày kết thúc mới.
4.  Validate.
5.  Lưu.
6.  Cập nhật hợp đồng.

### Rule

Ngày kết thúc mới phải sau ngày kết thúc hiện tại.

------------------------------------------------------------------------

## 4.10. UC10 -- Chấm dứt hợp đồng

**Actor:** Owner / Staff\
**Priority:** Must

### Main Flow

1.  Chọn hợp đồng.
2.  Chọn **Chấm dứt**.
3.  Nhập ngày.
4.  Nhập lý do.
5.  Hệ thống kiểm tra công nợ.
6.  Xác nhận.
7.  Hợp đồng chuyển `TERMINATED`.
8.  Hoàn tất trả phòng.
9.  Phòng có thể chuyển `AVAILABLE`.

### Exception

Nếu còn công nợ, hệ thống phải cảnh báo trước khi hoàn tất theo chính
sách nghiệp vụ.

------------------------------------------------------------------------

# 5. ĐẶC TẢ ĐIỆN -- NƯỚC -- DỊCH VỤ

## 5.1. UC11 -- Cấu hình dịch vụ

**Actor:** Owner\
**Priority:** Should

### Main Flow

1.  Mở Quản lý dịch vụ.
2.  Chọn Thêm.
3.  Nhập tên dịch vụ.
4.  Nhập đơn giá.
5.  Chọn đơn vị tính.
6.  Lưu.

### Ví dụ

-   Internet.
-   Rác.
-   Gửi xe.
-   Phí quản lý.

------------------------------------------------------------------------

## 5.2. UC12 -- Nhập chỉ số điện

**Actor:** Owner / Staff\
**Priority:** Must

### Main Flow

1.  Chọn phòng.
2.  Chọn kỳ.
3.  Hệ thống hiển thị chỉ số cũ.
4.  Nhập chỉ số mới.
5.  Hệ thống kiểm tra.
6.  Lưu.
7.  Tính lượng tiêu thụ.

### Công thức

``` text
Sản lượng điện = Chỉ số mới - Chỉ số cũ
```

### Business Rules

``` text
Chỉ số mới >= Chỉ số cũ
```

Không được tạo hai bản ghi cùng phòng và cùng kỳ.

------------------------------------------------------------------------

## 5.3. UC13 -- Nhập chỉ số nước

Tương tự UC12.

``` text
Sản lượng nước = Chỉ số mới - Chỉ số cũ
```

------------------------------------------------------------------------

## 5.4. UC14 -- Tính tiền điện

**Actor:** Hệ thống\
**Priority:** Must

### Công thức

``` text
Tiền điện = Sản lượng điện × Đơn giá điện
```

Hệ thống phải dùng đơn giá có hiệu lực cho kỳ đang tính.

------------------------------------------------------------------------

## 5.5. UC15 -- Tính tiền nước

**Actor:** Hệ thống\
**Priority:** Must

``` text
Tiền nước = Sản lượng nước × Đơn giá nước
```

------------------------------------------------------------------------

# 6. ĐẶC TẢ HÓA ĐƠN -- THANH TOÁN

## 6.1. UC16 -- Tạo hóa đơn

**Actor:** Owner / Staff\
**Priority:** Must

### Preconditions

-   Hợp đồng Active.
-   Có kỳ hóa đơn.
-   Dữ liệu điện/nước cần thiết đã có theo quy định.

### Main Flow

1.  Chọn phòng/hợp đồng.
2.  Chọn kỳ.
3.  Lấy tiền phòng.
4.  Lấy tiền điện.
5.  Lấy tiền nước.
6.  Lấy phí dịch vụ.
7.  Thêm phát sinh/giảm trừ.
8.  Tính tổng.
9.  Tạo hóa đơn.
10. Trạng thái = `UNPAID`.

### Công thức

``` text
Tổng tiền =
Tiền phòng
+ Tiền điện
+ Tiền nước
+ Phí dịch vụ
+ Phát sinh
- Giảm trừ
```

### Business Rules

-   Không tạo trùng hóa đơn cùng hợp đồng và kỳ.
-   Hóa đơn đã thanh toán không được sửa tùy ý.

------------------------------------------------------------------------

## 6.2. UC17 -- Xem hóa đơn

**Actor:** Owner / Staff / Tenant\
**Priority:** Must

### Thông tin hiển thị

-   Tiền phòng.
-   Điện.
-   Nước.
-   Dịch vụ.
-   Phát sinh.
-   Giảm trừ.
-   Tổng tiền.
-   Đã thanh toán.
-   Còn lại.
-   Trạng thái.

Tenant chỉ được xem hóa đơn của mình.

------------------------------------------------------------------------

## 6.3. UC18 -- Ghi nhận thanh toán

**Actor:** Owner / Staff\
**Priority:** Must

### Main Flow

1.  Chọn hóa đơn.
2.  Chọn Ghi nhận thanh toán.
3.  Nhập số tiền.
4.  Chọn phương thức.
5.  Nhập ngày.
6.  Nhập ghi chú.
7.  Validate.
8.  Tạo Payment.
9.  Cập nhật số tiền còn lại.
10. Cập nhật trạng thái hóa đơn.

### Trạng thái

``` text
UNPAID → PARTIAL → PAID
```

------------------------------------------------------------------------

## 6.4. UC19 -- Thanh toán trực tuyến

**Actor:** Tenant\
**Secondary Actor:** Cổng thanh toán\
**Priority:** Could

### Main Flow

1.  Tenant mở hóa đơn.
2.  Chọn Thanh toán.
3.  Hệ thống tạo payment request.
4.  Chuyển đến cổng thanh toán.
5.  Tenant thực hiện giao dịch.
6.  Gateway xử lý.
7.  Gateway trả callback/webhook.
8.  Hệ thống xác thực kết quả.
9.  Cập nhật Payment.
10. Cập nhật Invoice.

### Exception

-   Giao dịch thất bại → `FAILED`.
-   Callback không hợp lệ → không đánh dấu `PAID`.
-   Timeout → chờ kiểm tra trạng thái.

> MVP có thể chưa tích hợp cổng thanh toán và chỉ dùng ghi nhận tiền
> mặt/chuyển khoản.

------------------------------------------------------------------------

# 7. ĐẶC TẢ SỬA CHỮA

## 7.1. UC20 -- Gửi yêu cầu sửa chữa

**Actor:** Tenant\
**Priority:** Must

### Main Flow

1.  Tenant mở Yêu cầu sửa chữa.
2.  Chọn loại sự cố.
3.  Nhập mô tả.
4.  Đính kèm ảnh nếu có.
5.  Nhấn Gửi.
6.  Hệ thống xác định phòng.
7.  Tạo request.
8.  Status = `NEW`.
9.  Thông báo cho Owner/Staff.

------------------------------------------------------------------------

## 7.2. UC21 -- Xử lý yêu cầu sửa chữa

**Actor:** Owner / Staff\
**Priority:** Must

### Main Flow

1.  Mở danh sách yêu cầu.
2.  Chọn yêu cầu.
3.  Tiếp nhận.
4.  Phân công nếu cần.
5.  Chuyển `IN_PROGRESS`.
6.  Xử lý.
7.  Chuyển `COMPLETED`.
8.  Đóng yêu cầu.

### Trạng thái

``` text
NEW
 ↓
ACCEPTED
 ↓
IN_PROGRESS
 ↓
COMPLETED
 ↓
CLOSED
```

------------------------------------------------------------------------

# 8. ĐẶC TẢ THÔNG BÁO

## UC22 -- Quản lý thông báo

**Actor:** Owner / Staff / Tenant / System\
**Priority:** Should

### Các chức năng

-   Tạo thông báo.
-   Gửi thông báo.
-   Xem thông báo.
-   Đánh dấu đã đọc.

### Ví dụ

-   Hóa đơn mới.
-   Hợp đồng sắp hết hạn.
-   Yêu cầu sửa chữa được tiếp nhận.
-   Thông báo chung.

------------------------------------------------------------------------

# 9. ĐẶC TẢ DASHBOARD & BÁO CÁO

## UC23 -- Dashboard

**Actor:** Owner / Staff\
**Priority:** Must

### Thông tin

-   Tổng số nhà.
-   Tổng số phòng.
-   Phòng trống.
-   Phòng đang thuê.
-   Phòng đang sửa.
-   Doanh thu.
-   Công nợ.
-   Hợp đồng sắp hết hạn.
-   Yêu cầu sửa chữa đang mở.

------------------------------------------------------------------------

## UC24 -- Báo cáo doanh thu

**Actor:** Owner\
**Priority:** Should

### Bộ lọc

-   Ngày.
-   Tháng.
-   Quý.
-   Năm.
-   Nhà/khu trọ.

### Kết quả

-   Tổng doanh thu.
-   Doanh thu theo thời gian.
-   Doanh thu theo nhà.
-   Tiền phòng.
-   Tiền dịch vụ.

------------------------------------------------------------------------

## UC25 -- Báo cáo công nợ

**Actor:** Owner / Staff\
**Priority:** Should

  Khách thuê   Phòng   Hóa đơn     Tổng   Đã trả   Còn nợ Trạng thái
  ------------ ------- --------- ------ -------- -------- ------------

------------------------------------------------------------------------

## UC26 -- Báo cáo tình trạng phòng

**Actor:** Owner\
**Priority:** Should

Thống kê:

-   Available.
-   Reserved.
-   Rented.
-   Maintenance.
-   Inactive.

------------------------------------------------------------------------

# 10. ĐẶC TẢ QUẢN TRỊ HỆ THỐNG

## UC27 -- Quản lý tài khoản

**Actor:** Admin\
**Priority:** Should

### Main Flow

1.  Admin mở Quản lý tài khoản.
2.  Xem danh sách.
3.  Tìm kiếm.
4.  Tạo tài khoản.
5.  Cập nhật.
6.  Khóa/mở khóa.
7.  Gán Role.

------------------------------------------------------------------------

## UC28 -- Phân quyền

**Actor:** Admin\
**Priority:** Must

### Role

``` text
ADMIN
OWNER
STAFF
TENANT
```

### Business Rules

-   Backend phải kiểm tra quyền.
-   Frontend chỉ hỗ trợ hiển thị chức năng.
-   Ẩn button không được xem là cơ chế bảo mật.
-   User không được tự nâng quyền.

------------------------------------------------------------------------

# 11. QUY TẮC NGHIỆP VỤ (BUSINESS RULES)

  -----------------------------------------------------------------------
  Mã                                  Quy tắc
  ----------------------------------- -----------------------------------
  BR01                                Một phòng chỉ có tối đa một hợp
                                      đồng Active tại cùng thời điểm.

  BR02                                Ngày kết thúc hợp đồng phải sau
                                      ngày bắt đầu.

  BR03                                Chỉ số điện mới không nhỏ hơn chỉ
                                      số cũ.

  BR04                                Chỉ số nước mới không nhỏ hơn chỉ
                                      số cũ.

  BR05                                Không tạo hai hóa đơn cho cùng hợp
                                      đồng và cùng kỳ.

  BR06                                Không cho thanh toán vượt số tiền
                                      còn phải trả nếu nghiệp vụ không
                                      cho phép.

  BR07                                Backend phải kiểm tra
                                      Authorization.

  BR08                                Không xóa vật lý tùy tiện dữ liệu
                                      hợp đồng, hóa đơn, thanh toán đã
                                      phát sinh.

  BR09                                Nhà Inactive không được tạo nghiệp
                                      vụ mới.

  BR10                                Tenant chỉ được xem dữ liệu của
                                      chính mình.
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 12. TRẠNG THÁI ĐỐI TƯỢNG

## Room

``` text
AVAILABLE
RESERVED
RENTED
MAINTENANCE
INACTIVE
```

## Contract

``` text
DRAFT
ACTIVE
EXPIRED
TERMINATED
```

## Invoice

``` text
DRAFT
UNPAID
PARTIAL
PAID
OVERDUE
CANCELLED
```

## Payment

``` text
PENDING
SUCCESS
FAILED
REFUNDED
```

## Maintenance Request

``` text
NEW
ACCEPTED
IN_PROGRESS
WAITING
COMPLETED
CLOSED
```

------------------------------------------------------------------------

# 13. DỮ LIỆU ĐẦU VÀO / ĐẦU RA CHÍNH

  Module         Input                           Output
  -------------- ------------------------------- ----------------------
  Auth           Email, Password                 Token, User, Role
  Property       Tên, địa chỉ                    Property
  Room           Nhà, mã phòng, giá              Room
  Tenant         Họ tên, SĐT, email              Tenant
  Contract       Room, Tenant, ngày, giá         Contract
  Electricity    Chỉ số cũ/mới                   Sản lượng, tiền điện
  Water          Chỉ số cũ/mới                   Sản lượng, tiền nước
  Invoice        Contract, kỳ, các khoản         Invoice
  Payment        Invoice, số tiền, phương thức   Payment
  Maintenance    Loại, mô tả, ảnh                Request
  Notification   Nội dung, người nhận            Notification

------------------------------------------------------------------------

# 14. DATABASE ENTITY DỰ KIẾN

``` text
users
roles
permissions
user_roles

properties
rooms

tenants
contracts

services
service_prices

electric_readings
water_readings

invoices
invoice_items

payments

maintenance_requests

notifications
notification_reads

audit_logs
```

------------------------------------------------------------------------

# 15. API DỰ KIẾN

``` text
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout

GET    /api/properties
POST   /api/properties
GET    /api/properties/:id
PUT    /api/properties/:id
PATCH  /api/properties/:id/status

GET    /api/rooms
POST   /api/rooms
GET    /api/rooms/:id
PUT    /api/rooms/:id
PATCH  /api/rooms/:id/status

GET    /api/tenants
POST   /api/tenants
GET    /api/tenants/:id
PUT    /api/tenants/:id

GET    /api/contracts
POST   /api/contracts
GET    /api/contracts/:id
PUT    /api/contracts/:id
POST   /api/contracts/:id/renew
POST   /api/contracts/:id/terminate

GET    /api/electric-readings
POST   /api/electric-readings

GET    /api/water-readings
POST   /api/water-readings

GET    /api/invoices
POST   /api/invoices
GET    /api/invoices/:id
PUT    /api/invoices/:id

GET    /api/payments
POST   /api/payments

GET    /api/maintenance
POST   /api/maintenance
GET    /api/maintenance/:id
PATCH  /api/maintenance/:id/status

GET    /api/notifications
POST   /api/notifications
PATCH  /api/notifications/:id/read

GET    /api/dashboard
GET    /api/reports/revenue
GET    /api/reports/debt
GET    /api/reports/rooms
```

------------------------------------------------------------------------

# 16. TRACEABILITY MATRIX

  Requirement     Use Case   User Story            Module
  --------------- ---------- --------------------- --------------
  Đăng nhập       UC01       US-001                Auth
  Đăng ký         UC02       US-003                Auth
  Quản lý nhà     UC03       US-007--010           Property
  Quản lý phòng   UC04--05   US-011--016           Room
  Khách thuê      UC06       US-017--021           Tenant
  Hợp đồng        UC07--10   US-022--027           Contract
  Điện nước       UC11--15   US-028--034           Utility
  Hóa đơn         UC16--17   US-035--038           Invoice
  Thanh toán      UC18--19   US-040--043           Payment
  Sửa chữa        UC20--21   US-044--048           Maintenance
  Thông báo       UC22       US-039, US-049--051   Notification
  Dashboard       UC23       US-052                Dashboard
  Báo cáo         UC24--26   US-053--055           Report
  Quản trị        UC27--28   US-005--006           Admin

------------------------------------------------------------------------

# 17. LUỒNG NGHIỆP VỤ TRUNG TÂM

## 17.1. Cho thuê phòng

``` text
Chủ nhà đăng nhập
       ↓
Tạo nhà
       ↓
Tạo phòng
       ↓
Thêm khách thuê
       ↓
Tạo hợp đồng
       ↓
Phòng = RENTED
```

## 17.2. Lập hóa đơn

``` text
Chọn kỳ
   ↓
Nhập điện
   ↓
Nhập nước
   ↓
Tính điện
   ↓
Tính nước
   ↓
Lấy tiền phòng
   ↓
Lấy phí dịch vụ
   ↓
Tạo hóa đơn
   ↓
Khách xem hóa đơn
```

## 17.3. Thanh toán

``` text
Khách xem hóa đơn
       ↓
Thanh toán
       ↓
Ghi nhận Payment
       ↓
Cập nhật Invoice
       ↓
PAID
```

## 17.4. Sửa chữa

``` text
Tenant gửi yêu cầu
       ↓
NEW
       ↓
Owner/Staff tiếp nhận
       ↓
ACCEPTED
       ↓
IN_PROGRESS
       ↓
COMPLETED
       ↓
CLOSED
```

------------------------------------------------------------------------

# 18. THỨ TỰ TRIỂN KHAI

``` text
01. Authentication
        ↓
02. User + Role
        ↓
03. Property
        ↓
04. Room
        ↓
05. Tenant
        ↓
06. Contract
        ↓
07. Utility
        ↓
08. Invoice
        ↓
09. Payment
        ↓
10. Maintenance
        ↓
11. Notification
        ↓
12. Dashboard
        ↓
13. Report
```

------------------------------------------------------------------------

# 19. DEFINITION OF DONE

Một Use Case được xem là hoàn thành khi:

-   [ ] UI hoàn thành.
-   [ ] API hoàn thành.
-   [ ] Database đáp ứng.
-   [ ] Validation Frontend.
-   [ ] Validation Backend.
-   [ ] Authorization.
-   [ ] Error handling.
-   [ ] Loading/Empty state.
-   [ ] Test Case.
-   [ ] Test thành công.
-   [ ] Không còn lỗi Critical/High.
-   [ ] Có thể demo theo Main Flow.

------------------------------------------------------------------------

# 20. KẾT LUẬN

Tài liệu này đóng vai trò cầu nối:

``` text
SRS
 ↓
Actors
 ↓
Use Case Diagram
 ↓
Đặc tả Use Case
 ↓
User Stories
 ↓
ERD / Database
 ↓
API Specification
 ↓
UI Design
 ↓
Frontend + Backend
 ↓
Test Case
 ↓
UAT
```

**Luồng MVP ưu tiên:**

``` text
Đăng nhập
   ↓
Quản lý nhà
   ↓
Quản lý phòng
   ↓
Khách thuê
   ↓
Hợp đồng
   ↓
Điện / Nước
   ↓
Hóa đơn
   ↓
Thanh toán
   ↓
Sửa chữa
   ↓
Dashboard
```
