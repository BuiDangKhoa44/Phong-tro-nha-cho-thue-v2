# MODULE 1: AUTHENTICATION – XÁC THỰC

## 1. Giới thiệu Module

### 1.1. Mục đích

Module Authentication chịu trách nhiệm xác thực danh tính người dùng khi truy cập hệ thống quản lý phòng trọ/nhà cho thuê.

Module cung cấp các chức năng:
- Đăng nhập bằng email và mật khẩu.
- Đăng xuất khỏi hệ thống.
- Làm mới Access Token.
- Lấy thông tin tài khoản đang đăng nhập.
- Đổi mật khẩu.
- Yêu cầu đặt lại mật khẩu khi quên mật khẩu.
- Đặt lại mật khẩu thông qua token khôi phục.

### 1.2. Đối tượng sử dụng

- Chủ nhà (LANDLORD).
- Nhân viên quản lý (STAFF), nếu hệ thống có phân quyền nhân viên.

### 1.3. Base URL

```http
/api/v1
```

### 1.4. Quy ước chung

Các API cần xác thực sử dụng Header:

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 2. Yêu cầu chức năng

| Mã | Tên chức năng | Mô tả |
|---|---|---|
| AUTH01 | Đăng nhập | Cho phép người dùng đăng nhập bằng email và mật khẩu |
| AUTH02 | Đăng xuất | Kết thúc phiên đăng nhập hiện tại |
| AUTH03 | Làm mới Token | Cấp Access Token mới khi token cũ hết hạn |
| AUTH04 | Lấy thông tin tài khoản | Hiển thị thông tin người dùng hiện tại |
| AUTH05 | Đổi mật khẩu | Cho phép người dùng thay đổi mật khẩu |
| AUTH06 | Quên mật khẩu | Gửi yêu cầu khôi phục mật khẩu |
| AUTH07 | Đặt lại mật khẩu | Cập nhật mật khẩu mới bằng token khôi phục |

---

## 3. Preconditions – Tiền điều kiện

Trước khi sử dụng Module Authentication, hệ thống cần đáp ứng:

1. Hệ thống Backend đang hoạt động.
2. Cơ sở dữ liệu có thể kết nối bình thường.
3. Người dùng đã được tạo tài khoản trong hệ thống.
4. Email người dùng chưa bị trùng với tài khoản khác.
5. Tài khoản phải ở trạng thái hoạt động mới được phép đăng nhập.
6. Các API yêu cầu đăng nhập phải có Access Token hợp lệ.
7. Hệ thống đã cấu hình cơ chế tạo và xác thực token.

---

## 4. Danh sách API Endpoint

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | POST | `/auth/login` | Đăng nhập |
| 2 | POST | `/auth/logout` | Đăng xuất |
| 3 | POST | `/auth/refresh` | Làm mới Access Token |
| 4 | GET | `/auth/me` | Lấy thông tin tài khoản |
| 5 | PATCH | `/auth/change-password` | Đổi mật khẩu |
| 6 | POST | `/auth/forgot-password` | Yêu cầu đặt lại mật khẩu |
| 7 | POST | `/auth/reset-password` | Đặt lại mật khẩu |

---

# 5. Chi tiết API – Request & Response

## API 01: Đăng nhập

### Endpoint

```http
POST /api/v1/auth/login
```

### Mục đích

Cho phép người dùng đăng nhập vào hệ thống bằng email và mật khẩu.

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "email": "admin@gmail.com",
  "password": "Admin@123456"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| email | String | Có | Email tài khoản |
| password | String | Có | Mật khẩu đăng nhập |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "accessToken": "access_token_example",
    "refreshToken": "refresh_token_example",
    "tokenType": "Bearer",
    "expiresIn": 900,
    "user": {
      "id": 1,
      "fullName": "Nguyen Van A",
      "email": "admin@gmail.com",
      "role": "LANDLORD",
      "status": "ACTIVE"
    }
  }
}
```

### Giải thích Response

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| success | Boolean | Trạng thái xử lý |
| message | String | Thông báo kết quả |
| accessToken | String | Token truy cập API |
| refreshToken | String | Token làm mới Access Token |
| tokenType | String | Loại token |
| expiresIn | Number | Thời gian hết hạn Access Token (giây) |
| user.id | Number | ID người dùng |
| user.fullName | String | Họ và tên |
| user.email | String | Email |
| user.role | String | Vai trò tài khoản |
| user.status | String | Trạng thái tài khoản |

### Response thất bại

**Trường hợp 1: Sai email hoặc mật khẩu – 401 Unauthorized**

```json
{
  "success": false,
  "message": "Email hoặc mật khẩu không chính xác",
  "errorCode": "INVALID_CREDENTIALS"
}
```

**Trường hợp 2: Tài khoản bị khóa – 403 Forbidden**

```json
{
  "success": false,
  "message": "Tài khoản đã bị khóa",
  "errorCode": "ACCOUNT_DISABLED"
}
```

**Trường hợp 3: Thiếu dữ liệu – 400 Bad Request**

```json
{
  "success": false,
  "message": "Vui lòng nhập đầy đủ email và mật khẩu",
  "errorCode": "VALIDATION_ERROR"
}
```

### Quy trình xử lý

1. Người dùng nhập email và mật khẩu.
2. Frontend gửi Request đến Backend.
3. Backend kiểm tra dữ liệu đầu vào.
4. Backend tìm tài khoản theo email.
5. Backend kiểm tra mật khẩu với mật khẩu đã được mã hóa trong cơ sở dữ liệu.
6. Kiểm tra trạng thái tài khoản.
7. Nếu hợp lệ, Backend tạo Access Token và Refresh Token.
8. Trả Response về Frontend.
9. Frontend sử dụng Access Token để gọi các API cần xác thực.

### Preconditions

- Người dùng đã có tài khoản.
- Email và mật khẩu được nhập đầy đủ.
- Tài khoản không bị khóa.

### Postconditions

- Nếu thành công: Người dùng được xác thực và nhận token.
- Nếu thất bại: Không tạo phiên đăng nhập mới.

---

## API 02: Đăng xuất

### Endpoint

```http
POST /api/v1/auth/logout
```

### Mục đích

Cho phép người dùng kết thúc phiên đăng nhập hiện tại.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "refreshToken": "refresh_token_example"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| refreshToken | String | Có | Refresh Token của phiên cần đăng xuất |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Đăng xuất thành công",
  "data": null
}
```

### Response thất bại – 401 Unauthorized

```json
{
  "success": false,
  "message": "Phiên đăng nhập không hợp lệ",
  "errorCode": "INVALID_SESSION"
}
```

### Quy trình xử lý

1. Người dùng nhấn nút Đăng xuất.
2. Frontend gửi Access Token và Refresh Token đến Backend.
3. Backend xác thực phiên đăng nhập.
4. Backend thu hồi Refresh Token tương ứng.
5. Backend trả kết quả đăng xuất.
6. Frontend xóa thông tin phiên đăng nhập.

### Preconditions

- Người dùng đã đăng nhập.
- Phiên đăng nhập đang tồn tại.
- Refresh Token được gửi kèm phải thuộc phiên cần đăng xuất.

### Postconditions

- Refresh Token được thu hồi.
- Phiên đăng nhập không thể tiếp tục sử dụng để làm mới Access Token.
- Frontend chuyển người dùng về màn hình đăng nhập.

---

## API 03: Làm mới Access Token

### Endpoint

```http
POST /api/v1/auth/refresh
```

### Mục đích

Cấp Access Token mới khi Access Token hiện tại hết hạn nhưng Refresh Token vẫn còn hiệu lực.

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "refreshToken": "refresh_token_example"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| refreshToken | String | Có | Refresh Token hiện tại |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Làm mới token thành công",
  "data": {
    "accessToken": "new_access_token_example",
    "refreshToken": "new_refresh_token_example",
    "tokenType": "Bearer",
    "expiresIn": 900
  }
}
```

### Response thất bại – 401 Unauthorized

```json
{
  "success": false,
  "message": "Refresh Token không hợp lệ hoặc đã hết hạn",
  "errorCode": "INVALID_REFRESH_TOKEN"
}
```

### Quy trình xử lý

1. Frontend phát hiện Access Token hết hạn.
2. Frontend gửi Refresh Token đến Backend.
3. Backend kiểm tra tính hợp lệ và thời hạn của Refresh Token.
4. Nếu hợp lệ, Backend cấp Access Token mới.
5. Backend có thể thay Refresh Token cũ bằng Refresh Token mới.
6. Frontend cập nhật token và tiếp tục sử dụng hệ thống.

### Preconditions

- Refresh Token đã được cấp trước đó.
- Refresh Token chưa hết hạn.
- Refresh Token chưa bị thu hồi.

### Postconditions

- Nếu thành công: Access Token mới được cấp.
- Nếu áp dụng cơ chế xoay vòng token: Refresh Token cũ bị vô hiệu hóa và token mới được cấp.
- Nếu thất bại: Người dùng cần đăng nhập lại.

---

## API 04: Lấy thông tin tài khoản đang đăng nhập

### Endpoint

```http
GET /api/v1/auth/me
```

### Mục đích

Lấy thông tin tài khoản của người dùng hiện đang đăng nhập.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Request Body

Không cần Request Body.

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lấy thông tin tài khoản thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyen Van A",
    "email": "admin@gmail.com",
    "phone": "0901234567",
    "role": "LANDLORD",
    "status": "ACTIVE",
    "createdAt": "2026-10-01T08:00:00Z"
  }
}
```

### Giải thích Response

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | Number | ID người dùng |
| fullName | String | Họ tên |
| email | String | Email đăng nhập |
| phone | String | Số điện thoại |
| role | String | Vai trò |
| status | String | Trạng thái tài khoản |
| createdAt | DateTime | Ngày tạo tài khoản |

### Response thất bại – 401 Unauthorized

```json
{
  "success": false,
  "message": "Bạn chưa đăng nhập hoặc phiên đã hết hạn",
  "errorCode": "UNAUTHORIZED"
}
```

### Quy trình xử lý

1. Frontend gửi yêu cầu lấy thông tin tài khoản.
2. Backend kiểm tra Access Token.
3. Backend xác định người dùng từ token.
4. Backend truy vấn dữ liệu tài khoản.
5. Backend trả thông tin tài khoản về Frontend.

### Preconditions

- Người dùng đã đăng nhập.
- Access Token hợp lệ và chưa hết hạn.

### Postconditions

- Nếu thành công: Frontend nhận được thông tin tài khoản hiện tại.
- Nếu thất bại: Không trả dữ liệu tài khoản riêng tư.

---

## API 05: Đổi mật khẩu

### Endpoint

```http
PATCH /api/v1/auth/change-password
```

### Mục đích

Cho phép người dùng đang đăng nhập thay đổi mật khẩu tài khoản.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "currentPassword": "Admin@123456",
  "newPassword": "NewAdmin@123456",
  "confirmPassword": "NewAdmin@123456"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| currentPassword | String | Có | Mật khẩu hiện tại |
| newPassword | String | Có | Mật khẩu mới |
| confirmPassword | String | Có | Xác nhận mật khẩu mới |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Đổi mật khẩu thành công",
  "data": null
}
```

### Response thất bại

**Mật khẩu hiện tại không đúng – 400 Bad Request**

```json
{
  "success": false,
  "message": "Mật khẩu hiện tại không chính xác",
  "errorCode": "INCORRECT_CURRENT_PASSWORD"
}
```

**Mật khẩu xác nhận không khớp – 400 Bad Request**

```json
{
  "success": false,
  "message": "Mật khẩu xác nhận không khớp",
  "errorCode": "PASSWORD_CONFIRMATION_MISMATCH"
}
```

### Quy trình xử lý

1. Người dùng nhập mật khẩu hiện tại.
2. Nhập mật khẩu mới và xác nhận mật khẩu mới.
3. Frontend gửi Request đến Backend.
4. Backend xác thực Access Token.
5. Backend kiểm tra mật khẩu hiện tại.
6. Backend kiểm tra mật khẩu mới và xác nhận.
7. Backend mã hóa mật khẩu mới bằng thuật toán băm phù hợp.
8. Cập nhật mật khẩu trong cơ sở dữ liệu.
9. Thu hồi các phiên đăng nhập cũ theo chính sách bảo mật.
10. Trả kết quả về Frontend.

### Preconditions

- Người dùng đã đăng nhập.
- Access Token hợp lệ.
- Mật khẩu hiện tại chính xác.
- Mật khẩu mới đáp ứng chính sách bảo mật.

### Postconditions

- Nếu thành công: Mật khẩu mới được lưu dưới dạng đã băm.
- Mật khẩu cũ không còn được sử dụng.
- Các phiên đăng nhập khác có thể bị thu hồi theo chính sách hệ thống.

---

## API 06: Yêu cầu đặt lại mật khẩu

### Endpoint

```http
POST /api/v1/auth/forgot-password
```

### Mục đích

Cho phép người dùng yêu cầu đặt lại mật khẩu khi quên mật khẩu.

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "email": "admin@gmail.com"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| email | String | Có | Email tài khoản cần khôi phục |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Nếu email tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến email đó",
  "data": null
}
```

### Quy trình xử lý

1. Người dùng nhập email.
2. Frontend gửi email đến Backend.
3. Backend kiểm tra email.
4. Nếu tài khoản tồn tại, Backend tạo token đặt lại mật khẩu có thời hạn.
5. Backend gửi hướng dẫn đến email người dùng.
6. Backend trả thông báo chung, không tiết lộ email có tồn tại hay không.

### Preconditions

- Người dùng có email đã đăng ký.
- Hệ thống có cấu hình dịch vụ gửi email.
- Chức năng khôi phục mật khẩu đã được triển khai.

### Postconditions

- Nếu email tồn tại: Hệ thống tạo yêu cầu khôi phục hợp lệ và gửi hướng dẫn.
- Nếu email không tồn tại: Vẫn trả thông báo chung.
- Không thay đổi mật khẩu tại bước này.

---

## API 07: Đặt lại mật khẩu

### Endpoint

```http
POST /api/v1/auth/reset-password
```

### Mục đích

Cho phép người dùng đặt mật khẩu mới thông qua token khôi phục hợp lệ.

### Request Headers

```http
Content-Type: application/json
```

### Request Body

```json
{
  "resetToken": "password_reset_token_example",
  "newPassword": "NewAdmin@123456",
  "confirmPassword": "NewAdmin@123456"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| resetToken | String | Có | Token đặt lại mật khẩu |
| newPassword | String | Có | Mật khẩu mới |
| confirmPassword | String | Có | Xác nhận mật khẩu mới |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Đặt lại mật khẩu thành công",
  "data": null
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn",
  "errorCode": "INVALID_RESET_TOKEN"
}
```

### Quy trình xử lý

1. Người dùng mở liên kết khôi phục mật khẩu.
2. Người dùng nhập mật khẩu mới và xác nhận.
3. Frontend gửi resetToken và mật khẩu mới đến Backend.
4. Backend xác thực token và thời hạn.
5. Backend kiểm tra hai mật khẩu có khớp không.
6. Backend mã hóa mật khẩu mới và cập nhật tài khoản.
7. Backend đánh dấu token khôi phục đã sử dụng.
8. Thu hồi các phiên đăng nhập cũ theo chính sách.
9. Trả kết quả về Frontend.

### Preconditions

- Người dùng đã yêu cầu khôi phục mật khẩu.
- Reset Token hợp lệ và chưa hết hạn.
- Reset Token chưa được sử dụng.

### Postconditions

- Nếu thành công: Mật khẩu mới được cập nhật.
- Reset Token không thể sử dụng lại.
- Các phiên đăng nhập cũ được xử lý theo chính sách bảo mật.

---

# 6. Validation – Quy tắc kiểm tra dữ liệu

| Trường | Quy tắc kiểm tra |
|---|---|
| email | Bắt buộc, đúng định dạng email |
| password | Bắt buộc, không được để trống |
| currentPassword | Phải khớp mật khẩu hiện tại |
| newPassword | Đáp ứng chính sách độ dài và độ phức tạp |
| confirmPassword | Phải trùng newPassword |
| refreshToken | Phải hợp lệ, chưa hết hạn và chưa bị thu hồi |
| resetToken | Phải hợp lệ, còn hạn và chưa sử dụng |

---

# 7. Postconditions – Kết quả sau khi xử lý

| Chức năng | Kết quả khi thành công | Kết quả khi thất bại |
|---|---|---|
| Đăng nhập | Tạo phiên đăng nhập, cấp token | Không tạo phiên mới |
| Đăng xuất | Thu hồi Refresh Token | Giữ nguyên phiên nếu yêu cầu không hợp lệ |
| Làm mới Token | Cấp token mới | Yêu cầu đăng nhập lại |
| Lấy thông tin | Trả thông tin tài khoản | Không trả dữ liệu riêng tư |
| Đổi mật khẩu | Cập nhật mật khẩu mới | Giữ nguyên mật khẩu cũ |
| Quên mật khẩu | Tạo yêu cầu khôi phục nếu tài khoản tồn tại | Không tiết lộ email có tồn tại hay không |
| Đặt lại mật khẩu | Cập nhật mật khẩu và vô hiệu hóa token khôi phục | Không thay đổi mật khẩu |

---

# 8. Test Cases – Trường hợp kiểm thử

| Test Case | Chức năng | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC_AUTH_01 | Đăng nhập | Email và mật khẩu đúng | Đăng nhập thành công, nhận token |
| TC_AUTH_02 | Đăng nhập | Email không tồn tại | Trả lỗi 401 |
| TC_AUTH_03 | Đăng nhập | Mật khẩu sai | Trả lỗi 401 |
| TC_AUTH_04 | Đăng nhập | Thiếu email | Trả lỗi 400 |
| TC_AUTH_05 | Đăng nhập | Tài khoản bị khóa | Trả lỗi 403 |
| TC_AUTH_06 | Đăng xuất | Refresh Token hợp lệ | Đăng xuất thành công |
| TC_AUTH_07 | Đăng xuất | Refresh Token không hợp lệ | Trả lỗi phiên đăng nhập |
| TC_AUTH_08 | Làm mới Token | Refresh Token hợp lệ | Cấp token mới |
| TC_AUTH_09 | Làm mới Token | Refresh Token hết hạn | Trả lỗi 401 |
| TC_AUTH_10 | Lấy thông tin | Access Token hợp lệ | Trả thông tin tài khoản |
| TC_AUTH_11 | Lấy thông tin | Không gửi Access Token | Trả lỗi 401 |
| TC_AUTH_12 | Đổi mật khẩu | Mật khẩu hiện tại đúng | Đổi mật khẩu thành công |
| TC_AUTH_13 | Đổi mật khẩu | Mật khẩu hiện tại sai | Trả lỗi 400 |
| TC_AUTH_14 | Đổi mật khẩu | Xác nhận mật khẩu không khớp | Trả lỗi 400 |
| TC_AUTH_15 | Quên mật khẩu | Email hợp lệ | Trả thông báo chung |
| TC_AUTH_16 | Đặt lại mật khẩu | Reset Token hợp lệ | Đặt lại mật khẩu thành công |
| TC_AUTH_17 | Đặt lại mật khẩu | Reset Token hết hạn | Trả lỗi 400 |

---

# 9. Error Codes – Danh sách mã lỗi

| HTTP Status | Error Code | Ý nghĩa |
|---|---|---|
| 200 | SUCCESS | Thành công |
| 400 | VALIDATION_ERROR | Dữ liệu không hợp lệ |
| 400 | INCORRECT_CURRENT_PASSWORD | Sai mật khẩu hiện tại |
| 400 | PASSWORD_CONFIRMATION_MISMATCH | Xác nhận mật khẩu không khớp |
| 400 | INVALID_RESET_TOKEN | Reset Token không hợp lệ |
| 401 | INVALID_CREDENTIALS | Sai email hoặc mật khẩu |
| 401 | UNAUTHORIZED | Chưa xác thực |
| 401 | INVALID_REFRESH_TOKEN | Refresh Token không hợp lệ |
| 403 | ACCOUNT_DISABLED | Tài khoản bị khóa |
| 404 | USER_NOT_FOUND | Không tìm thấy tài khoản |
| 429 | TOO_MANY_REQUESTS | Gửi yêu cầu quá nhiều lần |
| 500 | INTERNAL_SERVER_ERROR | Lỗi máy chủ |

---

# 10. Security – Yêu cầu bảo mật

1. Không lưu mật khẩu dạng văn bản thuần trong cơ sở dữ liệu.
2. Sử dụng thuật toán băm mật khẩu chuyên dụng như Argon2id hoặc bcrypt.
3. Access Token phải có thời hạn sử dụng.
4. Refresh Token phải có cơ chế thu hồi khi đăng xuất.
5. Không trả mật khẩu hoặc thông tin bí mật trong Response.
6. Giới hạn số lần thử đăng nhập để giảm nguy cơ dò mật khẩu.
7. Các API yêu cầu đăng nhập phải kiểm tra Access Token.
8. Không tiết lộ email có tồn tại trong chức năng quên mật khẩu.
9. Sử dụng HTTPS khi truyền dữ liệu.
10. Không ghi token hoặc mật khẩu vào log hệ thống.
11. Token khôi phục mật khẩu chỉ được sử dụng một lần.
12. Kiểm soát quyền truy cập theo vai trò tài khoản.

---

# 11. Database – Cơ sở dữ liệu liên quan

## 11.1. Bảng Users

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| full_name | VARCHAR(255) | Họ và tên |
| email | VARCHAR(255) | Email, duy nhất |
| password_hash | VARCHAR(255) | Mật khẩu đã băm |
| phone | VARCHAR(20) | Số điện thoại |
| role | VARCHAR(50) | Vai trò người dùng |
| status | VARCHAR(30) | Trạng thái tài khoản |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## 11.2. Bảng RefreshTokens

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| user_id | BIGINT | ID người dùng |
| token_hash | VARCHAR(255) | Token được lưu an toàn dưới dạng băm |
| expires_at | DATETIME | Thời điểm hết hạn |
| revoked_at | DATETIME | Thời điểm thu hồi |
| created_at | DATETIME | Ngày tạo |

## 11.3. Bảng PasswordResetTokens

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| user_id | BIGINT | ID người dùng |
| token_hash | VARCHAR(255) | Token khôi phục được lưu dưới dạng băm |
| expires_at | DATETIME | Thời điểm hết hạn |
| used_at | DATETIME | Thời điểm đã sử dụng |
| created_at | DATETIME | Ngày tạo |

---

# 12. Luồng hoạt động tổng thể

```text
             NGƯỜI DÙNG
                  |
                  v
              ĐĂNG NHẬP
                  |
                  v
          Gửi Email + Password
                  |
                  v
               BACKEND
                  |
                  v
          Kiểm tra tài khoản
                  |
          +-------+-------+
          |               |
        Không            Hợp lệ
          |               |
          v               v
       Trả lỗi       Tạo Access Token
                     + Refresh Token
                           |
                           v
                  Đăng nhập thành công
                           |
                           v
                   Sử dụng hệ thống
                           |
                 +---------+---------+
                 |                   |
             Token hết hạn         Đăng xuất
                 |                   |
                 v                   v
             Refresh Token      Thu hồi phiên
                 |                   |
                 v                   v
             Cấp token mới       Kết thúc phiên
```

---

# 13. Kết quả đầu ra của Module

Sau khi hoàn thành Module Authentication, hệ thống cần đáp ứng:

- Người dùng đăng nhập được bằng tài khoản hợp lệ.
- Người dùng không thể đăng nhập nếu tài khoản bị khóa.
- Hệ thống cấp và kiểm tra Access Token.
- Người dùng có thể làm mới token.
- Người dùng có thể đăng xuất.
- Người dùng xem được thông tin tài khoản đang đăng nhập.
- Người dùng có thể đổi mật khẩu.
- Người dùng có thể khôi phục mật khẩu nếu chức năng được triển khai.
- Các API riêng tư được bảo vệ bằng cơ chế xác thực.

---

# 14. Ghi chú triển khai

- Các JSON Request và Response trong tài liệu là dữ liệu mẫu để mô tả hợp đồng API.
- Các endpoint cần được thống nhất với cấu trúc Backend thực tế.
- Tên trường trong API cần thống nhất với mô hình dữ liệu và ERD.
- Các bảng RefreshTokens và PasswordResetTokens là đề xuất thiết kế, có thể điều chỉnh theo công nghệ xác thực được lựa chọn.
- Chức năng quên mật khẩu cần cấu hình dịch vụ gửi email trước khi đưa vào sử dụng.
- Cần kiểm thử các trường hợp thành công, thất bại và dữ liệu không hợp lệ trước khi nghiệm thu.

**Trạng thái tài liệu:** API Design – Proposed

**Module:** Authentication – Xác thực

**Dự án:** Phòng trọ / Nhà cho thuê