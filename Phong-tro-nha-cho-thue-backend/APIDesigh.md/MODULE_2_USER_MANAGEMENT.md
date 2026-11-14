# MODULE 2: USER MANAGEMENT – QUẢN LÝ NGƯỜI DÙNG

## 1. Giới thiệu Module

### 1.1. Mục đích

Module User Management chịu trách nhiệm quản lý thông tin và tài khoản của những người được phép sử dụng hệ thống quản lý phòng trọ/nhà cho thuê.

Module cho phép chủ nhà quản lý tài khoản của mình và các tài khoản nhân viên được cấp quyền truy cập hệ thống.

Các chức năng chính:
- Xem danh sách người dùng.
- Xem chi tiết thông tin người dùng.
- Thêm tài khoản người dùng mới.
- Cập nhật thông tin người dùng.
- Xóa hoặc vô hiệu hóa tài khoản.
- Phân quyền người dùng.
- Khóa tài khoản.
- Mở khóa tài khoản.
- Tìm kiếm và lọc người dùng.

### 1.2. Đối tượng sử dụng

| Vai trò | Quyền hạn |
|---|---|
| LANDLORD | Quản lý các tài khoản thuộc phạm vi nhà trọ của mình |
| STAFF | Chỉ được xem và sử dụng các chức năng được chủ nhà cấp quyền |

**Lưu ý:** Nhân viên không được tự ý cấp quyền cao hơn quyền hiện tại của mình. Chủ nhà không được thao tác lên tài khoản thuộc phạm vi quản lý của chủ nhà khác.

### 1.3. Base URL

```http
/api/v1
```

### 1.4. Quy ước xác thực

Các API trong Module này yêu cầu Access Token hợp lệ.

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 2. Yêu cầu chức năng

| Mã | Tên chức năng | Mô tả |
|---|---|---|
| USER01 | Xem danh sách người dùng | Hiển thị danh sách tài khoản trong phạm vi quản lý |
| USER02 | Xem chi tiết người dùng | Xem thông tin chi tiết của một tài khoản |
| USER03 | Thêm người dùng | Tạo tài khoản nhân viên mới |
| USER04 | Cập nhật người dùng | Chỉnh sửa thông tin tài khoản |
| USER05 | Xóa người dùng | Xóa hoặc vô hiệu hóa tài khoản theo chính sách hệ thống |
| USER06 | Phân quyền người dùng | Gán vai trò hoặc quyền sử dụng chức năng |
| USER07 | Khóa tài khoản | Ngăn tài khoản đăng nhập hệ thống |
| USER08 | Mở khóa tài khoản | Cho phép tài khoản hoạt động trở lại |
| USER09 | Tìm kiếm người dùng | Tìm kiếm theo tên, email hoặc số điện thoại |
| USER10 | Lọc người dùng | Lọc theo vai trò và trạng thái tài khoản |

---

## 3. Preconditions – Tiền điều kiện

Trước khi sử dụng Module User Management, hệ thống cần đáp ứng:

1. Backend đang hoạt động bình thường.
2. Cơ sở dữ liệu có thể kết nối.
3. Người thực hiện thao tác đã đăng nhập.
4. Access Token còn hiệu lực.
5. Người thực hiện có quyền quản lý người dùng.
6. Tài khoản được thao tác phải thuộc phạm vi quản lý của chủ nhà.
7. Email của tài khoản mới chưa được sử dụng nếu hệ thống yêu cầu email duy nhất.
8. Vai trò được gán phải tồn tại trong hệ thống.
9. Không cho phép người dùng tự cấp quyền cao hơn quyền của mình.

---

## 4. Danh sách API Endpoint

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/users` | Lấy danh sách người dùng |
| 2 | GET | `/users/{id}` | Lấy chi tiết người dùng |
| 3 | POST | `/users` | Thêm người dùng mới |
| 4 | PUT | `/users/{id}` | Cập nhật thông tin người dùng |
| 5 | DELETE | `/users/{id}` | Xóa hoặc vô hiệu hóa người dùng |
| 6 | PATCH | `/users/{id}/role` | Thay đổi vai trò người dùng |
| 7 | PATCH | `/users/{id}/status` | Thay đổi trạng thái tài khoản |
| 8 | GET | `/users/search` | Tìm kiếm người dùng |

---

# 5. Chi tiết API – Request & Response

## API 01: Lấy danh sách người dùng

### Endpoint

```http
GET /api/v1/users
```

### Mục đích

Lấy danh sách các tài khoản người dùng thuộc phạm vi quản lý của chủ nhà.

API hỗ trợ phân trang, tìm kiếm và lọc dữ liệu.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Request Parameters

Ví dụ:

```http
GET /api/v1/users?page=1&limit=10&role=STAFF&status=ACTIVE
```

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| page | Integer | Không | Số trang, mặc định 1 |
| limit | Integer | Không | Số bản ghi mỗi trang, mặc định 10 |
| role | String | Không | Lọc theo vai trò |
| status | String | Không | Lọc theo trạng thái |
| keyword | String | Không | Tìm theo tên, email hoặc số điện thoại |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách người dùng thành công",
  "data": {
    "items": [
      {
        "id": 1,
        "fullName": "Nguyen Van A",
        "email": "admin@gmail.com",
        "phone": "0901234567",
        "role": "LANDLORD",
        "status": "ACTIVE",
        "createdAt": "2026-10-01T08:00:00Z"
      },
      {
        "id": 2,
        "fullName": "Tran Van B",
        "email": "staff@gmail.com",
        "phone": "0912345678",
        "role": "STAFF",
        "status": "ACTIVE",
        "createdAt": "2026-10-05T09:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 2,
      "totalPages": 1
    }
  }
}
```

### Giải thích Response

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| items | Array | Danh sách người dùng |
| id | Number | ID người dùng |
| fullName | String | Họ và tên |
| email | String | Email tài khoản |
| phone | String | Số điện thoại |
| role | String | Vai trò |
| status | String | Trạng thái |
| createdAt | DateTime | Ngày tạo |
| pagination.page | Number | Trang hiện tại |
| pagination.limit | Number | Số bản ghi mỗi trang |
| pagination.totalItems | Number | Tổng số người dùng |
| pagination.totalPages | Number | Tổng số trang |

### Response thất bại – 403 Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền xem danh sách người dùng",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Người dùng truy cập chức năng quản lý người dùng.
2. Frontend gửi Request đến Backend.
3. Backend xác thực Access Token.
4. Backend kiểm tra quyền quản lý người dùng.
5. Backend truy vấn danh sách theo phạm vi quản lý.
6. Backend áp dụng điều kiện tìm kiếm, lọc và phân trang.
7. Backend trả danh sách người dùng về Frontend.

### Preconditions

- Người thực hiện đã đăng nhập.
- Có quyền xem danh sách người dùng.

### Postconditions

- Nếu thành công: Trả danh sách tài khoản theo điều kiện yêu cầu.
- Nếu thất bại: Không trả dữ liệu nếu người dùng không có quyền truy cập.

---

## API 02: Xem chi tiết người dùng

### Endpoint

```http
GET /api/v1/users/{id}
```

### Mục đích

Lấy thông tin chi tiết của một người dùng cụ thể.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID người dùng cần xem |

### Ví dụ Request

```http
GET /api/v1/users/2
```

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lấy thông tin người dùng thành công",
  "data": {
    "id": 2,
    "fullName": "Tran Van B",
    "email": "staff@gmail.com",
    "phone": "0912345678",
    "role": "STAFF",
    "status": "ACTIVE",
    "createdAt": "2026-10-05T09:00:00Z",
    "updatedAt": "2026-10-10T10:00:00Z"
  }
}
```

### Response thất bại – 404 Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy người dùng",
  "errorCode": "USER_NOT_FOUND"
}
```

### Response thất bại – 403 Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền xem tài khoản này",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Frontend gửi ID người dùng cần xem.
2. Backend xác thực Access Token.
3. Backend kiểm tra quyền truy cập.
4. Backend tìm người dùng theo ID và phạm vi quản lý.
5. Nếu tồn tại, Backend trả thông tin chi tiết.
6. Nếu không tồn tại, trả lỗi phù hợp.

### Preconditions

- Người dùng đã đăng nhập.
- Có quyền xem tài khoản.
- ID người dùng hợp lệ.

### Postconditions

- Nếu thành công: Trả thông tin người dùng.
- Nếu thất bại: Không trả thông tin ngoài phạm vi quản lý.

---

## API 03: Thêm người dùng mới

### Endpoint

```http
POST /api/v1/users
```

### Mục đích

Cho phép chủ nhà tạo tài khoản mới cho nhân viên quản lý phòng trọ.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "fullName": "Le Van C",
  "email": "staff2@gmail.com",
  "phone": "0987654321",
  "password": "Staff@123456",
  "role": "STAFF"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| fullName | String | Có | Họ và tên người dùng |
| email | String | Có | Email đăng nhập |
| phone | String | Không | Số điện thoại |
| password | String | Có | Mật khẩu ban đầu |
| role | String | Có | Vai trò tài khoản |

### Response thành công – 201 Created

```json
{
  "success": true,
  "message": "Tạo người dùng thành công",
  "data": {
    "id": 3,
    "fullName": "Le Van C",
    "email": "staff2@gmail.com",
    "phone": "0987654321",
    "role": "STAFF",
    "status": "ACTIVE",
    "createdAt": "2026-11-02T08:00:00Z"
  }
}
```

### Response thất bại

**Email đã tồn tại – 409 Conflict**

```json
{
  "success": false,
  "message": "Email đã được sử dụng",
  "errorCode": "EMAIL_ALREADY_EXISTS"
}
```

**Không có quyền tạo tài khoản – 403 Forbidden**

```json
{
  "success": false,
  "message": "Bạn không có quyền tạo người dùng",
  "errorCode": "FORBIDDEN"
}
```

**Dữ liệu không hợp lệ – 400 Bad Request**

```json
{
  "success": false,
  "message": "Dữ liệu người dùng không hợp lệ",
  "errorCode": "VALIDATION_ERROR"
}
```

### Quy trình xử lý

1. Chủ nhà mở chức năng thêm người dùng.
2. Nhập họ tên, email, số điện thoại, mật khẩu và vai trò.
3. Frontend gửi Request đến Backend.
4. Backend xác thực Access Token.
5. Backend kiểm tra quyền tạo tài khoản.
6. Backend kiểm tra email đã tồn tại hay chưa.
7. Backend kiểm tra dữ liệu đầu vào.
8. Backend mã hóa mật khẩu bằng thuật toán băm chuyên dụng.
9. Backend tạo tài khoản mới và gắn tài khoản với chủ nhà quản lý.
10. Backend trả thông tin tài khoản mới về Frontend.

### Preconditions

- Người thực hiện đã đăng nhập.
- Người thực hiện có quyền tạo tài khoản.
- Email chưa được sử dụng.
- Vai trò được gán hợp lệ.

### Postconditions

- Nếu thành công: Tài khoản mới được lưu trong cơ sở dữ liệu.
- Nếu thất bại: Không tạo tài khoản mới.
- Mật khẩu không được trả về trong Response.

---

## API 04: Cập nhật thông tin người dùng

### Endpoint

```http
PUT /api/v1/users/{id}
```

### Mục đích

Cho phép người có quyền cập nhật thông tin cá nhân của một tài khoản.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID người dùng cần cập nhật |

### Request Body

```json
{
  "fullName": "Le Van C Updated",
  "phone": "0977777777"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| fullName | String | Có | Họ tên mới |
| phone | String | Không | Số điện thoại mới |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật người dùng thành công",
  "data": {
    "id": 3,
    "fullName": "Le Van C Updated",
    "email": "staff2@gmail.com",
    "phone": "0977777777",
    "role": "STAFF",
    "status": "ACTIVE",
    "updatedAt": "2026-11-02T09:00:00Z"
  }
}
```

### Response thất bại – 404 Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy người dùng cần cập nhật",
  "errorCode": "USER_NOT_FOUND"
}
```

### Quy trình xử lý

1. Người dùng chọn tài khoản cần cập nhật.
2. Frontend hiển thị thông tin hiện tại.
3. Người có quyền chỉnh sửa thông tin.
4. Frontend gửi Request đến Backend.
5. Backend xác thực và kiểm tra quyền.
6. Backend kiểm tra ID người dùng.
7. Backend kiểm tra dữ liệu cập nhật.
8. Backend cập nhật thông tin trong cơ sở dữ liệu.
9. Backend trả dữ liệu mới về Frontend.

### Preconditions

- Người thực hiện đã đăng nhập.
- Người thực hiện có quyền cập nhật thông tin.
- Tài khoản cần cập nhật tồn tại trong phạm vi quản lý.

### Postconditions

- Nếu thành công: Thông tin người dùng được cập nhật.
- Nếu thất bại: Dữ liệu cũ được giữ nguyên.

---

## API 05: Xóa hoặc vô hiệu hóa người dùng

### Endpoint

```http
DELETE /api/v1/users/{id}
```

### Mục đích

Cho phép chủ nhà loại bỏ tài khoản không còn được phép sử dụng hệ thống.

**Quy ước đề xuất:** Ưu tiên xóa mềm (soft delete) hoặc vô hiệu hóa tài khoản thay vì xóa dữ liệu vật lý, nhằm bảo toàn lịch sử hóa đơn, hợp đồng và nhật ký hoạt động.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID người dùng cần vô hiệu hóa |

### Ví dụ Request

```http
DELETE /api/v1/users/3
```

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Vô hiệu hóa tài khoản thành công",
  "data": {
    "id": 3,
    "status": "DELETED"
  }
}
```

### Response thất bại – 404 Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy người dùng",
  "errorCode": "USER_NOT_FOUND"
}
```

### Response thất bại – 409 Conflict

```json
{
  "success": false,
  "message": "Không thể xóa tài khoản đang thực hiện nghiệp vụ quan trọng",
  "errorCode": "USER_HAS_ACTIVE_ASSIGNMENTS"
}
```

### Quy trình xử lý

1. Chủ nhà chọn tài khoản cần loại bỏ.
2. Hệ thống hiển thị thông tin xác nhận.
3. Chủ nhà xác nhận thao tác.
4. Frontend gửi Request đến Backend.
5. Backend xác thực và kiểm tra quyền.
6. Backend kiểm tra tài khoản có tồn tại hay không.
7. Backend kiểm tra các ràng buộc dữ liệu liên quan.
8. Backend vô hiệu hóa tài khoản và thu hồi các phiên đăng nhập.
9. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền quản lý tài khoản.
- Tài khoản cần xử lý tồn tại.
- Không phải tài khoản hiện tại đang thực hiện thao tác.
- Các ràng buộc nghiệp vụ cho phép vô hiệu hóa.

### Postconditions

- Tài khoản không thể đăng nhập.
- Các phiên đăng nhập bị thu hồi.
- Lịch sử nghiệp vụ liên quan vẫn được bảo toàn.
- Tài khoản không còn xuất hiện trong danh sách mặc định nếu đã bị xóa mềm.

---

## API 06: Thay đổi vai trò người dùng

### Endpoint

```http
PATCH /api/v1/users/{id}/role
```

### Mục đích

Cho phép chủ nhà thay đổi vai trò của người dùng trong hệ thống.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "role": "STAFF"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| role | String | Có | Vai trò mới của tài khoản |

### Các vai trò đề xuất

| Role | Mô tả |
|---|---|
| LANDLORD | Chủ nhà, quản lý hệ thống |
| STAFF | Nhân viên được chủ nhà cấp quyền |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật vai trò thành công",
  "data": {
    "id": 3,
    "fullName": "Le Van C",
    "role": "STAFF",
    "updatedAt": "2026-11-02T09:30:00Z"
  }
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Vai trò không hợp lệ",
  "errorCode": "INVALID_ROLE"
}
```

### Response thất bại – 403 Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền thay đổi vai trò này",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Chủ nhà chọn người dùng cần thay đổi vai trò.
2. Chọn vai trò mới.
3. Frontend gửi Request đến Backend.
4. Backend xác thực Access Token.
5. Backend kiểm tra quyền phân quyền.
6. Backend kiểm tra vai trò mới có hợp lệ hay không.
7. Backend cập nhật vai trò.
8. Backend ghi nhận hoạt động thay đổi quyền.
9. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền phân quyền.
- Người dùng cần thay đổi vai trò tồn tại.
- Vai trò mới thuộc danh sách vai trò hợp lệ.

### Postconditions

- Vai trò mới được cập nhật.
- Quyền truy cập được áp dụng theo vai trò mới.
- Các phiên hoặc token cũ cần được xử lý theo chính sách thay đổi quyền.

---

## API 07: Khóa hoặc mở khóa tài khoản

### Endpoint

```http
PATCH /api/v1/users/{id}/status
```

### Mục đích

Cho phép chủ nhà thay đổi trạng thái hoạt động của tài khoản.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body – Khóa tài khoản

```json
{
  "status": "LOCKED"
}
```

### Request Body – Mở khóa tài khoản

```json
{
  "status": "ACTIVE"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| status | String | Có | Trạng thái mới của tài khoản |

### Các trạng thái tài khoản

| Status | Mô tả |
|---|---|
| ACTIVE | Tài khoản đang hoạt động |
| LOCKED | Tài khoản bị khóa |
| DELETED | Tài khoản đã bị vô hiệu hóa |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật trạng thái tài khoản thành công",
  "data": {
    "id": 3,
    "fullName": "Le Van C",
    "status": "LOCKED",
    "updatedAt": "2026-11-02T10:00:00Z"
  }
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Trạng thái tài khoản không hợp lệ",
  "errorCode": "INVALID_STATUS"
}
```

### Quy trình xử lý

1. Chủ nhà chọn tài khoản cần thay đổi trạng thái.
2. Chọn khóa hoặc mở khóa.
3. Frontend gửi Request đến Backend.
4. Backend xác thực Access Token.
5. Backend kiểm tra quyền quản lý.
6. Backend kiểm tra tài khoản cần thao tác.
7. Backend cập nhật trạng thái.
8. Nếu khóa tài khoản, Backend thu hồi các phiên đăng nhập đang hoạt động.
9. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền quản lý tài khoản.
- Tài khoản cần thao tác tồn tại.
- Trạng thái mới hợp lệ.

### Postconditions

- Nếu LOCKED: Người dùng không thể đăng nhập hoặc tiếp tục sử dụng phiên bị thu hồi.
- Nếu ACTIVE: Người dùng được phép đăng nhập nếu các điều kiện khác đều hợp lệ.
- Nếu DELETED: Tài khoản không thể được mở khóa bằng API này; cần quy trình khôi phục riêng nếu hệ thống hỗ trợ.

---

## API 08: Tìm kiếm người dùng

### Endpoint

```http
GET /api/v1/users/search
```

### Mục đích

Cho phép chủ nhà tìm kiếm người dùng theo tên, email hoặc số điện thoại.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Request Parameters

Ví dụ:

```http
GET /api/v1/users/search?keyword=Tran
```

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| keyword | String | Có | Từ khóa tìm kiếm |
| page | Integer | Không | Trang hiện tại |
| limit | Integer | Không | Số bản ghi mỗi trang |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Tìm kiếm người dùng thành công",
  "data": {
    "items": [
      {
        "id": 2,
        "fullName": "Tran Van B",
        "email": "staff@gmail.com",
        "phone": "0912345678",
        "role": "STAFF",
        "status": "ACTIVE"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 1,
      "totalPages": 1
    }
  }
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Vui lòng nhập từ khóa tìm kiếm",
  "errorCode": "KEYWORD_REQUIRED"
}
```

### Quy trình xử lý

1. Chủ nhà nhập từ khóa tìm kiếm.
2. Frontend gửi Request đến Backend.
3. Backend xác thực và kiểm tra quyền.
4. Backend tìm kiếm theo họ tên, email hoặc số điện thoại.
5. Backend giới hạn kết quả theo phạm vi quản lý.
6. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện đã đăng nhập.
- Có quyền xem danh sách người dùng.
- Từ khóa tìm kiếm không được để trống.

### Postconditions

- Nếu có kết quả: Trả danh sách người dùng phù hợp.
- Nếu không có kết quả: Trả danh sách rỗng.
- Không trả dữ liệu người dùng ngoài phạm vi quản lý.

---

# 6. Validation – Quy tắc kiểm tra dữ liệu

| Trường | Quy tắc kiểm tra |
|---|---|
| fullName | Bắt buộc, không được để trống |
| email | Bắt buộc khi tạo tài khoản, đúng định dạng và duy nhất |
| phone | Đúng định dạng số điện thoại nếu được nhập |
| password | Bắt buộc khi tạo tài khoản, đáp ứng chính sách mật khẩu |
| role | Phải thuộc danh sách vai trò hợp lệ |
| status | Phải thuộc danh sách trạng thái hợp lệ |
| id | Phải là ID hợp lệ và tồn tại |
| keyword | Không được để trống khi tìm kiếm |
| page | Số nguyên lớn hơn hoặc bằng 1 |
| limit | Số nguyên dương, không vượt quá giới hạn hệ thống |

---

# 7. Phân quyền – Authorization

| Chức năng | LANDLORD | STAFF |
|---|---|---|
| Xem danh sách người dùng | Có | Theo quyền được cấp |
| Xem chi tiết người dùng | Có | Theo quyền được cấp |
| Thêm người dùng | Có | Không |
| Cập nhật người dùng | Có | Theo quyền được cấp |
| Xóa/vô hiệu hóa người dùng | Có | Không |
| Thay đổi vai trò | Có | Không |
| Khóa tài khoản | Có | Không |
| Mở khóa tài khoản | Có | Không |
| Tìm kiếm người dùng | Có | Theo quyền được cấp |

**Nguyên tắc phân quyền:**

1. LANDLORD có quyền quản lý tài khoản thuộc phạm vi nhà trọ của mình.
2. STAFF chỉ được thực hiện các chức năng được cấp.
3. STAFF không được tự thay đổi vai trò của mình.
4. Không được truy cập tài khoản thuộc chủ nhà khác.
5. Không được vô hiệu hóa tài khoản chủ nhà chính.
6. Backend phải kiểm tra quyền ở từng API, không chỉ ẩn nút chức năng trên giao diện.

---

# 8. Postconditions – Kết quả sau khi xử lý

| Chức năng | Kết quả khi thành công | Kết quả khi thất bại |
|---|---|---|
| Xem danh sách | Trả danh sách người dùng | Không trả dữ liệu nếu không có quyền |
| Xem chi tiết | Trả thông tin tài khoản | Trả lỗi nếu không tồn tại |
| Thêm người dùng | Tạo tài khoản mới | Không tạo nếu dữ liệu sai |
| Cập nhật | Lưu thông tin mới | Giữ dữ liệu cũ |
| Xóa/vô hiệu hóa | Tài khoản bị vô hiệu hóa | Không thay đổi nếu bị ràng buộc |
| Phân quyền | Cập nhật vai trò | Giữ vai trò cũ |
| Khóa tài khoản | Tài khoản bị khóa | Giữ trạng thái cũ |
| Mở khóa | Tài khoản hoạt động trở lại | Giữ trạng thái cũ |
| Tìm kiếm | Trả danh sách phù hợp | Trả danh sách rỗng hoặc lỗi dữ liệu |

---

# 9. Test Cases – Trường hợp kiểm thử

| Test Case | Chức năng | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC_USER_01 | Xem danh sách | Access Token hợp lệ | Hiển thị danh sách người dùng |
| TC_USER_02 | Xem danh sách | Không có quyền | Trả lỗi 403 |
| TC_USER_03 | Xem chi tiết | ID tồn tại | Trả thông tin người dùng |
| TC_USER_04 | Xem chi tiết | ID không tồn tại | Trả lỗi 404 |
| TC_USER_05 | Thêm người dùng | Dữ liệu hợp lệ | Tạo tài khoản thành công |
| TC_USER_06 | Thêm người dùng | Email đã tồn tại | Trả lỗi 409 |
| TC_USER_07 | Thêm người dùng | Thiếu họ tên | Trả lỗi 400 |
| TC_USER_08 | Thêm người dùng | Người thực hiện không có quyền | Trả lỗi 403 |
| TC_USER_09 | Cập nhật | ID hợp lệ, dữ liệu đúng | Cập nhật thành công |
| TC_USER_10 | Cập nhật | ID không tồn tại | Trả lỗi 404 |
| TC_USER_11 | Xóa | Tài khoản hợp lệ | Vô hiệu hóa tài khoản |
| TC_USER_12 | Xóa | Không có quyền | Trả lỗi 403 |
| TC_USER_13 | Phân quyền | Vai trò hợp lệ | Cập nhật vai trò |
| TC_USER_14 | Phân quyền | Vai trò không hợp lệ | Trả lỗi 400 |
| TC_USER_15 | Khóa tài khoản | Trạng thái LOCKED | Khóa tài khoản thành công |
| TC_USER_16 | Mở khóa | Trạng thái ACTIVE | Mở khóa thành công |
| TC_USER_17 | Tìm kiếm | Keyword tồn tại | Trả danh sách phù hợp |
| TC_USER_18 | Tìm kiếm | Keyword không có kết quả | Trả danh sách rỗng |
| TC_USER_19 | Phân quyền | STAFF tự nâng quyền | Trả lỗi 403 |
| TC_USER_20 | Phạm vi dữ liệu | Truy cập tài khoản chủ nhà khác | Từ chối truy cập |

---

# 10. Error Codes – Danh sách mã lỗi

| HTTP Status | Error Code | Ý nghĩa |
|---|---|---|
| 200 | SUCCESS | Thành công |
| 201 | USER_CREATED | Tạo tài khoản thành công |
| 400 | VALIDATION_ERROR | Dữ liệu không hợp lệ |
| 400 | INVALID_ROLE | Vai trò không hợp lệ |
| 400 | INVALID_STATUS | Trạng thái không hợp lệ |
| 400 | KEYWORD_REQUIRED | Thiếu từ khóa tìm kiếm |
| 401 | UNAUTHORIZED | Chưa xác thực |
| 403 | FORBIDDEN | Không có quyền thực hiện |
| 404 | USER_NOT_FOUND | Không tìm thấy người dùng |
| 409 | EMAIL_ALREADY_EXISTS | Email đã tồn tại |
| 409 | USER_HAS_ACTIVE_ASSIGNMENTS | Người dùng còn liên kết nghiệp vụ cần xử lý |
| 429 | TOO_MANY_REQUESTS | Gửi yêu cầu quá nhiều lần |
| 500 | INTERNAL_SERVER_ERROR | Lỗi máy chủ |

---

# 11. Security – Yêu cầu bảo mật

1. Không lưu mật khẩu dưới dạng văn bản thuần.
2. Sử dụng Argon2id hoặc bcrypt để băm mật khẩu.
3. Kiểm tra Access Token trên các API cần xác thực.
4. Kiểm tra quyền người dùng ở Backend.
5. Không cho phép STAFF tự nâng quyền.
6. Không cho phép truy cập dữ liệu thuộc chủ nhà khác.
7. Khi khóa tài khoản phải thu hồi các phiên đăng nhập phù hợp.
8. Không trả mật khẩu hoặc token trong Response.
9. Ghi nhận các thao tác quan trọng như thêm, sửa, xóa và thay đổi quyền.
10. Sử dụng HTTPS khi truyền dữ liệu.
11. Không xóa vật lý tài khoản có liên kết với lịch sử nghiệp vụ nếu chưa xử lý các ràng buộc dữ liệu.

---

# 12. Database – Cơ sở dữ liệu liên quan

## 12.1. Bảng Users

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| landlord_id | BIGINT | ID chủ nhà quản lý tài khoản |
| full_name | VARCHAR(255) | Họ và tên |
| email | VARCHAR(255) | Email đăng nhập |
| password_hash | VARCHAR(255) | Mật khẩu đã băm |
| phone | VARCHAR(20) | Số điện thoại |
| role | VARCHAR(50) | Vai trò người dùng |
| status | VARCHAR(30) | Trạng thái tài khoản |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| deleted_at | DATETIME | Thời điểm vô hiệu hóa/xóa mềm |

## 12.2. Quan hệ dữ liệu

- Một chủ nhà có thể quản lý nhiều tài khoản nhân viên.
- Một tài khoản người dùng thuộc phạm vi quản lý của một chủ nhà.
- Người dùng có thể có nhiều phiên đăng nhập.
- Người dùng có thể phát sinh nhiều bản ghi nhật ký hoạt động.

## 12.3. Bảng Roles (nếu hệ thống tách vai trò thành bảng riêng)

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| role_name | VARCHAR(100) | Tên vai trò |
| description | TEXT | Mô tả vai trò |
| created_at | DATETIME | Ngày tạo |

## 12.4. Bảng UserPermissions (nếu hệ thống phân quyền chi tiết)

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| user_id | BIGINT | ID người dùng |
| permission_code | VARCHAR(100) | Mã quyền |
| created_at | DATETIME | Ngày tạo |

**Lưu ý:** Roles và UserPermissions là thiết kế mở rộng. Nếu dự án chỉ có hai vai trò LANDLORD và STAFF với quyền cố định, có thể lưu role trực tiếp trong bảng Users.

---

# 13. Luồng hoạt động tổng thể

```text
                  CHỦ NHÀ
                     |
                     v
             QUẢN LÝ NGƯỜI DÙNG
                     |
          +----------+----------+
          |          |          |
          v          v          v
       Thêm mới    Cập nhật   Xem danh sách
          |          |          |
          v          v          v
       Nhập dữ    Chỉnh sửa   Tìm kiếm/
       liệu mới   thông tin     lọc
          |          |          |
          +----------+----------+
                     |
                     v
                  BACKEND
                     |
                     v
            Kiểm tra xác thực
                     |
                     v
              Kiểm tra quyền
                     |
              +------+------+
              |             |
            Hợp lệ       Không hợp lệ
              |             |
              v             v
         Thực hiện       Trả lỗi 403
         thao tác
              |
              v
       Cập nhật Database
              |
              v
        Ghi Activity Log
              |
              v
        Trả Response
              |
              v
          FRONTEND
```

---

# 14. Kết quả đầu ra của Module

Sau khi hoàn thành Module User Management, hệ thống cần đáp ứng:

- Chủ nhà xem được danh sách người dùng.
- Chủ nhà xem được thông tin chi tiết tài khoản.
- Chủ nhà tạo được tài khoản nhân viên.
- Chủ nhà cập nhật được thông tin người dùng.
- Chủ nhà có thể vô hiệu hóa tài khoản không còn sử dụng.
- Chủ nhà có thể phân quyền cho nhân viên.
- Chủ nhà có thể khóa và mở khóa tài khoản.
- Hệ thống hỗ trợ tìm kiếm và lọc người dùng.
- Nhân viên chỉ được sử dụng các chức năng đã được cấp quyền.
- Mọi thao tác quản lý tài khoản quan trọng được ghi nhận trong Activity Logs.

---

# 15. Ghi chú triển khai

1. Các Request và Response JSON là dữ liệu mẫu dùng để mô tả hợp đồng API.
2. Endpoint cần được thống nhất với cấu trúc Backend thực tế.
3. Các quyền của STAFF cần được thống nhất với yêu cầu nghiệp vụ của dự án.
4. Nếu hệ thống chỉ có một chủ nhà và không có nhân viên, có thể giữ các API xem thông tin tài khoản và cập nhật thông tin, đồng thời chưa triển khai các API quản lý nhân viên.
5. API xóa người dùng đề xuất sử dụng xóa mềm để bảo toàn lịch sử nghiệp vụ.
6. Cần kiểm thử quyền truy cập để tránh việc người dùng thao tác lên tài khoản thuộc chủ nhà khác.
7. Các thay đổi quan trọng cần được ghi vào Activity Logs.

**Trạng thái tài liệu:** API Design – Proposed

**Module:** User Management – Quản lý người dùng

**Dự án:** Phòng trọ / Nhà cho thuê