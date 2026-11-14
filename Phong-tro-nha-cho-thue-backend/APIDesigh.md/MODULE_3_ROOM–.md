# MODULE 3: ROOM – QUẢN LÝ PHÒNG TRỌ

## 1. Giới thiệu Module

### 1.1. Mục đích

Module Room chịu trách nhiệm quản lý thông tin các phòng trọ trong hệ thống quản lý nhà trọ/nhà cho thuê.

Module cho phép chủ nhà theo dõi thông tin phòng, giá thuê, diện tích, trạng thái phòng và tình hình sử dụng phòng.

Các chức năng chính:
- Xem danh sách phòng trọ.
- Xem thông tin chi tiết của phòng.
- Thêm phòng trọ mới.
- Cập nhật thông tin phòng.
- Thay đổi trạng thái phòng.
- Xóa hoặc ngừng quản lý phòng.
- Tìm kiếm phòng theo mã phòng hoặc tên phòng.
- Lọc phòng theo trạng thái, giá thuê và diện tích.
- Quản lý thông tin tiện nghi và mô tả phòng.

### 1.2. Đối tượng sử dụng

| Vai trò | Quyền hạn |
|---|---|
| LANDLORD | Toàn quyền quản lý phòng thuộc phạm vi của mình |
| STAFF | Xem và thao tác với phòng theo quyền được cấp |

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
| ROOM01 | Xem danh sách phòng | Hiển thị danh sách phòng trọ |
| ROOM02 | Xem chi tiết phòng | Hiển thị thông tin chi tiết của một phòng |
| ROOM03 | Thêm phòng | Tạo phòng trọ mới |
| ROOM04 | Cập nhật phòng | Chỉnh sửa thông tin phòng |
| ROOM05 | Thay đổi trạng thái | Cập nhật trạng thái sử dụng của phòng |
| ROOM06 | Xóa phòng | Ngừng quản lý hoặc xóa phòng |
| ROOM07 | Tìm kiếm phòng | Tìm theo mã phòng hoặc tên phòng |
| ROOM08 | Lọc phòng | Lọc theo trạng thái, giá thuê, diện tích |
| ROOM09 | Quản lý tiện nghi | Cập nhật danh sách tiện nghi của phòng |

---

## 3. Preconditions – Tiền điều kiện

Trước khi sử dụng Module Room, hệ thống cần đáp ứng:

1. Backend đang hoạt động.
2. Cơ sở dữ liệu có thể kết nối.
3. Người thực hiện đã đăng nhập.
4. Access Token còn hiệu lực.
5. Người thực hiện có quyền quản lý phòng.
6. Phòng được thao tác phải thuộc phạm vi quản lý của chủ nhà.
7. Mã phòng phải duy nhất trong phạm vi nhà trọ tương ứng.
8. Giá thuê và diện tích phải là số dương.
9. Trạng thái phòng phải thuộc danh sách trạng thái được hệ thống hỗ trợ.
10. Không được xóa phòng đang có hợp đồng thuê còn hiệu lực nếu chưa xử lý nghiệp vụ liên quan.

---

## 4. Danh sách API Endpoint

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/rooms` | Lấy danh sách phòng |
| 2 | GET | `/rooms/{id}` | Lấy chi tiết phòng |
| 3 | POST | `/rooms` | Thêm phòng mới |
| 4 | PUT | `/rooms/{id}` | Cập nhật thông tin phòng |
| 5 | PATCH | `/rooms/{id}/status` | Thay đổi trạng thái phòng |
| 6 | DELETE | `/rooms/{id}` | Xóa hoặc ngừng quản lý phòng |
| 7 | GET | `/rooms/search` | Tìm kiếm phòng |
| 8 | GET | `/rooms/filter` | Lọc phòng |
| 9 | PUT | `/rooms/{id}/amenities` | Cập nhật tiện nghi phòng |

---

# 5. Chi tiết API – Request & Response

## API 01: Lấy danh sách phòng

### Endpoint

```http
GET /api/v1/rooms
```

### Mục đích

Lấy danh sách tất cả phòng trọ thuộc phạm vi quản lý của chủ nhà.

API hỗ trợ phân trang và lọc theo trạng thái phòng.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Request Parameters

Ví dụ:

```http
GET /api/v1/rooms?page=1&limit=10&status=AVAILABLE
```

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| page | Integer | Không | Trang hiện tại, mặc định 1 |
| limit | Integer | Không | Số phòng mỗi trang, mặc định 10 |
| status | String | Không | Trạng thái phòng |
| keyword | String | Không | Tìm theo mã hoặc tên phòng |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách phòng thành công",
  "data": {
    "items": [
      {
        "id": 1,
        "roomCode": "P101",
        "roomName": "Phòng 101",
        "area": 25,
        "price": 3000000,
        "floor": 1,
        "status": "AVAILABLE",
        "maxOccupants": 2
      },
      {
        "id": 2,
        "roomCode": "P102",
        "roomName": "Phòng 102",
        "area": 30,
        "price": 3500000,
        "floor": 1,
        "status": "RENTED",
        "maxOccupants": 3
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
| id | Number | ID phòng |
| roomCode | String | Mã phòng |
| roomName | String | Tên phòng |
| area | Number | Diện tích (m²) |
| price | Number | Giá thuê tháng (VNĐ) |
| floor | Number | Tầng |
| status | String | Trạng thái phòng |
| maxOccupants | Number | Số người tối đa |
| pagination | Object | Thông tin phân trang |

### Response thất bại – 403 Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền xem danh sách phòng",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Người dùng truy cập trang quản lý phòng.
2. Frontend gửi Request đến Backend.
3. Backend xác thực Access Token.
4. Backend kiểm tra quyền xem phòng.
5. Backend truy vấn danh sách phòng theo phạm vi quản lý.
6. Backend áp dụng điều kiện lọc và phân trang.
7. Backend trả danh sách phòng về Frontend.

### Preconditions

- Người dùng đã đăng nhập.
- Có quyền xem danh sách phòng.

### Postconditions

- Nếu thành công: Trả danh sách phòng theo điều kiện yêu cầu.
- Nếu thất bại: Không trả dữ liệu nếu không có quyền.

---

## API 02: Xem chi tiết phòng

### Endpoint

```http
GET /api/v1/rooms/{id}
```

### Mục đích

Lấy toàn bộ thông tin chi tiết của một phòng trọ.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID phòng cần xem |

### Ví dụ Request

```http
GET /api/v1/rooms/1
```

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lấy chi tiết phòng thành công",
  "data": {
    "id": 1,
    "roomCode": "P101",
    "roomName": "Phòng 101",
    "description": "Phòng có cửa sổ, nhà vệ sinh riêng",
    "area": 25,
    "price": 3000000,
    "floor": 1,
    "maxOccupants": 2,
    "status": "AVAILABLE",
    "amenities": [
      "AIR_CONDITIONER",
      "WIFI",
      "PRIVATE_BATHROOM"
    ],
    "createdAt": "2026-10-01T08:00:00Z",
    "updatedAt": "2026-10-05T09:00:00Z"
  }
}
```

### Giải thích Response

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | Number | ID phòng |
| roomCode | String | Mã phòng |
| roomName | String | Tên phòng |
| description | String | Mô tả phòng |
| area | Number | Diện tích |
| price | Number | Giá thuê |
| floor | Number | Tầng |
| maxOccupants | Number | Số người tối đa |
| status | String | Trạng thái phòng |
| amenities | Array | Danh sách tiện nghi |
| createdAt | DateTime | Ngày tạo |
| updatedAt | DateTime | Ngày cập nhật |

### Response thất bại – 404 Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy phòng",
  "errorCode": "ROOM_NOT_FOUND"
}
```

### Response thất bại – 403 Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền xem phòng này",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Frontend gửi ID phòng cần xem.
2. Backend xác thực Access Token.
3. Backend kiểm tra quyền truy cập.
4. Backend tìm phòng theo ID và phạm vi quản lý.
5. Nếu tồn tại, Backend lấy thông tin phòng và tiện nghi.
6. Backend trả Response về Frontend.

### Preconditions

- Người dùng đã đăng nhập.
- ID phòng hợp lệ.
- Người dùng có quyền xem phòng.

### Postconditions

- Nếu thành công: Trả đầy đủ thông tin phòng.
- Nếu thất bại: Không trả thông tin phòng ngoài phạm vi quản lý.

---

## API 03: Thêm phòng mới

### Endpoint

```http
POST /api/v1/rooms
```

### Mục đích

Cho phép chủ nhà thêm phòng trọ mới vào hệ thống.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "roomCode": "P103",
  "roomName": "Phòng 103",
  "description": "Phòng có cửa sổ và nhà vệ sinh riêng",
  "area": 28,
  "price": 3200000,
  "floor": 1,
  "maxOccupants": 2,
  "status": "AVAILABLE",
  "amenities": [
    "AIR_CONDITIONER",
    "WIFI",
    "PRIVATE_BATHROOM"
  ]
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| roomCode | String | Có | Mã phòng duy nhất |
| roomName | String | Có | Tên phòng |
| description | String | Không | Mô tả phòng |
| area | Number | Có | Diện tích (m²) |
| price | Number | Có | Giá thuê tháng (VNĐ) |
| floor | Integer | Không | Tầng |
| maxOccupants | Integer | Có | Số người tối đa |
| status | String | Có | Trạng thái ban đầu |
| amenities | Array | Không | Danh sách tiện nghi |

### Response thành công – 201 Created

```json
{
  "success": true,
  "message": "Thêm phòng thành công",
  "data": {
    "id": 3,
    "roomCode": "P103",
    "roomName": "Phòng 103",
    "description": "Phòng có cửa sổ và nhà vệ sinh riêng",
    "area": 28,
    "price": 3200000,
    "floor": 1,
    "maxOccupants": 2,
    "status": "AVAILABLE",
    "amenities": [
      "AIR_CONDITIONER",
      "WIFI",
      "PRIVATE_BATHROOM"
    ],
    "createdAt": "2026-11-02T08:00:00Z"
  }
}
```

### Response thất bại

**Mã phòng đã tồn tại – 409 Conflict**

```json
{
  "success": false,
  "message": "Mã phòng đã tồn tại",
  "errorCode": "ROOM_CODE_ALREADY_EXISTS"
}
```

**Dữ liệu không hợp lệ – 400 Bad Request**

```json
{
  "success": false,
  "message": "Diện tích và giá thuê phải lớn hơn 0",
  "errorCode": "VALIDATION_ERROR"
}
```

**Không có quyền thêm phòng – 403 Forbidden**

```json
{
  "success": false,
  "message": "Bạn không có quyền thêm phòng",
  "errorCode": "FORBIDDEN"
}
```

### Quy trình xử lý

1. Chủ nhà mở chức năng thêm phòng.
2. Nhập mã phòng, tên phòng, diện tích, giá thuê và các thông tin khác.
3. Frontend gửi Request đến Backend.
4. Backend xác thực Access Token.
5. Backend kiểm tra quyền thêm phòng.
6. Backend kiểm tra mã phòng đã tồn tại chưa.
7. Backend kiểm tra dữ liệu đầu vào.
8. Backend lưu thông tin phòng vào cơ sở dữ liệu.
9. Backend lưu các tiện nghi nếu có.
10. Backend trả thông tin phòng mới về Frontend.

### Preconditions

- Người thực hiện đã đăng nhập.
- Có quyền thêm phòng.
- Mã phòng chưa tồn tại trong phạm vi nhà trọ.
- Diện tích, giá thuê và số người tối đa hợp lệ.

### Postconditions

- Nếu thành công: Phòng mới được tạo với trạng thái ban đầu.
- Nếu thất bại: Không tạo phòng mới.
- Phòng mới xuất hiện trong danh sách quản lý.

---

## API 04: Cập nhật thông tin phòng

### Endpoint

```http
PUT /api/v1/rooms/{id}
```

### Mục đích

Cho phép chủ nhà chỉnh sửa thông tin phòng khi có thay đổi về giá thuê, diện tích, mô tả hoặc số người tối đa.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID phòng cần cập nhật |

### Request Body

```json
{
  "roomName": "Phòng 103 - Tầng 1",
  "description": "Phòng rộng, có cửa sổ và nhà vệ sinh riêng",
  "area": 30,
  "price": 3500000,
  "floor": 1,
  "maxOccupants": 3
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| roomName | String | Có | Tên phòng mới |
| description | String | Không | Mô tả mới |
| area | Number | Có | Diện tích mới |
| price | Number | Có | Giá thuê mới |
| floor | Integer | Không | Tầng |
| maxOccupants | Integer | Có | Số người tối đa |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật thông tin phòng thành công",
  "data": {
    "id": 3,
    "roomCode": "P103",
    "roomName": "Phòng 103 - Tầng 1",
    "description": "Phòng rộng, có cửa sổ và nhà vệ sinh riêng",
    "area": 30,
    "price": 3500000,
    "floor": 1,
    "maxOccupants": 3,
    "status": "AVAILABLE",
    "updatedAt": "2026-11-02T09:00:00Z"
  }
}
```

### Response thất bại – 404 Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy phòng cần cập nhật",
  "errorCode": "ROOM_NOT_FOUND"
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Dữ liệu cập nhật không hợp lệ",
  "errorCode": "VALIDATION_ERROR"
}
```

### Quy trình xử lý

1. Người dùng chọn phòng cần chỉnh sửa.
2. Frontend hiển thị thông tin hiện tại.
3. Người dùng cập nhật các trường thông tin.
4. Frontend gửi Request đến Backend.
5. Backend xác thực Access Token và quyền truy cập.
6. Backend kiểm tra phòng có tồn tại không.
7. Backend kiểm tra dữ liệu mới.
8. Backend cập nhật cơ sở dữ liệu.
9. Backend trả thông tin mới về Frontend.

### Preconditions

- Người thực hiện có quyền cập nhật phòng.
- Phòng tồn tại trong phạm vi quản lý.
- Các dữ liệu mới hợp lệ.

### Postconditions

- Nếu thành công: Thông tin phòng được cập nhật.
- Nếu thất bại: Thông tin cũ được giữ nguyên.
- Nếu giá thuê thay đổi, các hợp đồng đang có hiệu lực không tự động thay đổi giá thuê đã thỏa thuận; việc thay đổi cần tuân theo nghiệp vụ hợp đồng.

---

## API 05: Thay đổi trạng thái phòng

### Endpoint

```http
PATCH /api/v1/rooms/{id}/status
```

### Mục đích

Cho phép chủ nhà thay đổi trạng thái sử dụng của phòng.

### Các trạng thái phòng đề xuất

| Status | Mô tả |
|---|---|
| AVAILABLE | Phòng trống, có thể cho thuê |
| RENTED | Phòng đang được thuê |
| MAINTENANCE | Phòng đang sửa chữa hoặc bảo trì |
| INACTIVE | Phòng tạm ngừng kinh doanh |

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

Ví dụ chuyển phòng sang trạng thái bảo trì:

```json
{
  "status": "MAINTENANCE",
  "reason": "Phòng cần sửa chữa hệ thống điện"
}
```

Ví dụ chuyển phòng sang trạng thái trống:

```json
{
  "status": "AVAILABLE",
  "reason": "Đã hoàn tất sửa chữa"
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| status | String | Có | Trạng thái mới |
| reason | String | Không | Lý do thay đổi trạng thái |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật trạng thái phòng thành công",
  "data": {
    "id": 3,
    "roomCode": "P103",
    "status": "MAINTENANCE",
    "reason": "Phòng cần sửa chữa hệ thống điện",
    "updatedAt": "2026-11-02T09:30:00Z"
  }
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Trạng thái phòng không hợp lệ",
  "errorCode": "INVALID_ROOM_STATUS"
}
```

### Response thất bại – 409 Conflict

```json
{
  "success": false,
  "message": "Không thể chuyển phòng đang có hợp đồng hiệu lực sang trạng thái AVAILABLE",
  "errorCode": "ROOM_HAS_ACTIVE_CONTRACT"
}
```

### Quy trình xử lý

1. Chủ nhà chọn phòng cần thay đổi trạng thái.
2. Chọn trạng thái mới.
3. Nhập lý do nếu cần.
4. Frontend gửi Request đến Backend.
5. Backend xác thực và kiểm tra quyền.
6. Backend kiểm tra trạng thái hiện tại và trạng thái mới.
7. Backend kiểm tra hợp đồng thuê đang hiệu lực và các ràng buộc nghiệp vụ.
8. Backend cập nhật trạng thái phòng.
9. Backend ghi nhận lịch sử thay đổi.
10. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền thay đổi trạng thái.
- Phòng tồn tại.
- Trạng thái mới hợp lệ.
- Việc chuyển trạng thái không vi phạm ràng buộc hợp đồng.

### Postconditions

- Trạng thái phòng được cập nhật nếu hợp lệ.
- Lịch sử thay đổi trạng thái được ghi nhận.
- Nếu thất bại, trạng thái cũ được giữ nguyên.

---

## API 06: Xóa hoặc ngừng quản lý phòng

### Endpoint

```http
DELETE /api/v1/rooms/{id}
```

### Mục đích

Cho phép chủ nhà ngừng quản lý một phòng không còn sử dụng.

**Quy ước đề xuất:** Ưu tiên xóa mềm để giữ lại lịch sử hợp đồng, hóa đơn và thanh toán liên quan đến phòng.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Path Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| id | BIGINT | Có | ID phòng cần ngừng quản lý |

### Ví dụ Request

```http
DELETE /api/v1/rooms/3
```

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Ngừng quản lý phòng thành công",
  "data": {
    "id": 3,
    "roomCode": "P103",
    "status": "INACTIVE",
    "deletedAt": "2026-11-02T10:00:00Z"
  }
}
```

### Response thất bại – 409 Conflict

```json
{
  "success": false,
  "message": "Không thể xóa phòng đang có hợp đồng thuê hiệu lực",
  "errorCode": "ROOM_HAS_ACTIVE_CONTRACT"
}
```

### Quy trình xử lý

1. Chủ nhà chọn phòng cần ngừng quản lý.
2. Hệ thống yêu cầu xác nhận thao tác.
3. Frontend gửi Request đến Backend.
4. Backend xác thực và kiểm tra quyền.
5. Backend kiểm tra phòng có tồn tại không.
6. Backend kiểm tra hợp đồng, hóa đơn và các dữ liệu liên quan.
7. Nếu đủ điều kiện, Backend chuyển phòng sang trạng thái INACTIVE hoặc đánh dấu xóa mềm.
8. Backend ghi nhận hoạt động.
9. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền quản lý phòng.
- Phòng tồn tại.
- Không còn hợp đồng thuê hiệu lực hoặc các ràng buộc chưa được xử lý.

### Postconditions

- Phòng không còn xuất hiện trong danh sách phòng đang hoạt động.
- Dữ liệu lịch sử liên quan vẫn được bảo toàn.
- Không cho phép tạo hợp đồng mới cho phòng đã ngừng quản lý.

---

## API 07: Tìm kiếm phòng

### Endpoint

```http
GET /api/v1/rooms/search
```

### Mục đích

Cho phép chủ nhà tìm kiếm phòng theo mã phòng hoặc tên phòng.

### Request Headers

```http
Authorization: Bearer <access_token>
```

### Request Parameters

Ví dụ:

```http
GET /api/v1/rooms/search?keyword=P101
```

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| keyword | String | Có | Mã phòng hoặc tên phòng |
| page | Integer | Không | Trang hiện tại |
| limit | Integer | Không | Số kết quả mỗi trang |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Tìm kiếm phòng thành công",
  "data": {
    "items": [
      {
        "id": 1,
        "roomCode": "P101",
        "roomName": "Phòng 101",
        "area": 25,
        "price": 3000000,
        "status": "AVAILABLE"
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

1. Người dùng nhập mã hoặc tên phòng.
2. Frontend gửi Request đến Backend.
3. Backend xác thực và kiểm tra quyền.
4. Backend tìm kiếm trong phạm vi quản lý.
5. Backend trả danh sách kết quả phù hợp.

### Preconditions

- Người dùng đã đăng nhập.
- Có quyền xem phòng.
- Từ khóa tìm kiếm không được để trống.

### Postconditions

- Nếu tìm thấy: Trả danh sách phòng phù hợp.
- Nếu không tìm thấy: Trả danh sách rỗng.

---

## API 08: Lọc phòng

### Endpoint

```http
GET /api/v1/rooms/filter
```

### Mục đích

Cho phép chủ nhà lọc phòng theo trạng thái, mức giá và diện tích.

### Request Parameters

Ví dụ:

```http
GET /api/v1/rooms/filter?status=AVAILABLE&minPrice=2000000&maxPrice=4000000&minArea=20&maxArea=35
```

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| status | String | Không | Trạng thái phòng |
| minPrice | Number | Không | Giá thuê tối thiểu |
| maxPrice | Number | Không | Giá thuê tối đa |
| minArea | Number | Không | Diện tích tối thiểu |
| maxArea | Number | Không | Diện tích tối đa |
| page | Integer | Không | Trang hiện tại |
| limit | Integer | Không | Số bản ghi mỗi trang |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Lọc phòng thành công",
  "data": {
    "items": [
      {
        "id": 1,
        "roomCode": "P101",
        "roomName": "Phòng 101",
        "area": 25,
        "price": 3000000,
        "status": "AVAILABLE"
      },
      {
        "id": 3,
        "roomCode": "P103",
        "roomName": "Phòng 103",
        "area": 28,
        "price": 3200000,
        "status": "AVAILABLE"
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

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Khoảng giá hoặc diện tích không hợp lệ",
  "errorCode": "INVALID_FILTER_RANGE"
}
```

### Quy trình xử lý

1. Người dùng chọn điều kiện lọc.
2. Frontend gửi các tham số lọc đến Backend.
3. Backend kiểm tra dữ liệu.
4. Backend truy vấn phòng theo điều kiện.
5. Backend trả kết quả đã lọc.

### Preconditions

- Người dùng đã đăng nhập.
- Có quyền xem danh sách phòng.
- Các khoảng giá và diện tích hợp lệ.

### Postconditions

- Trả về danh sách phòng thỏa mãn các điều kiện lọc.
- Không thay đổi dữ liệu phòng trong cơ sở dữ liệu.

---

## API 09: Cập nhật tiện nghi phòng

### Endpoint

```http
PUT /api/v1/rooms/{id}/amenities
```

### Mục đích

Cho phép chủ nhà cập nhật danh sách tiện nghi có trong phòng.

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Request Body

```json
{
  "amenities": [
    "AIR_CONDITIONER",
    "WIFI",
    "PRIVATE_BATHROOM",
    "WATER_HEATER",
    "PARKING"
  ]
}
```

### Giải thích Request

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| amenities | Array | Có | Danh sách mã tiện nghi |

### Danh sách tiện nghi đề xuất

| Mã tiện nghi | Mô tả |
|---|---|
| AIR_CONDITIONER | Máy lạnh |
| WIFI | Internet |
| PRIVATE_BATHROOM | Nhà vệ sinh riêng |
| WATER_HEATER | Máy nước nóng |
| PARKING | Chỗ để xe |
| BALCONY | Ban công |
| WARDROBE | Tủ quần áo |
| BED | Giường |
| KITCHEN | Khu vực bếp |

### Response thành công – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật tiện nghi phòng thành công",
  "data": {
    "roomId": 1,
    "amenities": [
      "AIR_CONDITIONER",
      "WIFI",
      "PRIVATE_BATHROOM",
      "WATER_HEATER",
      "PARKING"
    ],
    "updatedAt": "2026-11-02T11:00:00Z"
  }
}
```

### Response thất bại – 400 Bad Request

```json
{
  "success": false,
  "message": "Danh sách tiện nghi chứa mã không hợp lệ",
  "errorCode": "INVALID_AMENITY"
}
```

### Quy trình xử lý

1. Chủ nhà chọn phòng cần cập nhật.
2. Chọn các tiện nghi có trong phòng.
3. Frontend gửi danh sách tiện nghi đến Backend.
4. Backend xác thực Access Token và quyền truy cập.
5. Backend kiểm tra phòng tồn tại.
6. Backend kiểm tra mã tiện nghi.
7. Backend cập nhật danh sách tiện nghi.
8. Backend trả kết quả về Frontend.

### Preconditions

- Người thực hiện có quyền cập nhật phòng.
- Phòng tồn tại.
- Danh sách tiện nghi hợp lệ.

### Postconditions

- Danh sách tiện nghi mới được lưu.
- Thông tin tiện nghi cũ được thay thế theo Request.

---

# 6. Validation – Quy tắc kiểm tra dữ liệu

| Trường | Quy tắc kiểm tra |
|---|---|
| roomCode | Bắt buộc, không trùng trong cùng phạm vi nhà trọ |
| roomName | Bắt buộc, không được để trống |
| description | Không vượt quá giới hạn độ dài hệ thống |
| area | Phải là số dương |
| price | Phải lớn hơn 0 |
| floor | Phải là số nguyên hợp lệ |
| maxOccupants | Phải là số nguyên lớn hơn 0 |
| status | Phải thuộc danh sách trạng thái hợp lệ |
| amenities | Mỗi mã tiện nghi phải tồn tại trong danh sách hỗ trợ |
| minPrice | Không được âm |
| maxPrice | Phải lớn hơn hoặc bằng minPrice |
| minArea | Không được âm |
| maxArea | Phải lớn hơn hoặc bằng minArea |

---

# 7. Phân quyền – Authorization

| Chức năng | LANDLORD | STAFF |
|---|---|---|
| Xem danh sách phòng | Có | Theo quyền được cấp |
| Xem chi tiết phòng | Có | Theo quyền được cấp |
| Thêm phòng | Có | Theo quyền được cấp |
| Cập nhật phòng | Có | Theo quyền được cấp |
| Thay đổi trạng thái | Có | Theo quyền được cấp |
| Xóa/ngừng quản lý phòng | Có | Không |
| Tìm kiếm phòng | Có | Theo quyền được cấp |
| Lọc phòng | Có | Theo quyền được cấp |
| Cập nhật tiện nghi | Có | Theo quyền được cấp |

**Nguyên tắc phân quyền:**

1. LANDLORD quản lý phòng thuộc phạm vi của mình.
2. STAFF chỉ được thao tác theo quyền được cấp.
3. Backend phải kiểm tra quyền ở từng API.
4. Không cho phép truy cập phòng thuộc chủ nhà khác.
5. Không cho phép xóa phòng đang có hợp đồng thuê hiệu lực nếu chưa xử lý nghiệp vụ liên quan.

---

# 8. Postconditions – Kết quả sau khi xử lý

| Chức năng | Kết quả khi thành công | Kết quả khi thất bại |
|---|---|---|
| Xem danh sách | Trả danh sách phòng | Không trả dữ liệu nếu không có quyền |
| Xem chi tiết | Trả thông tin phòng | Trả lỗi nếu phòng không tồn tại |
| Thêm phòng | Tạo phòng mới | Không tạo nếu dữ liệu sai |
| Cập nhật | Lưu thông tin mới | Giữ thông tin cũ |
| Thay đổi trạng thái | Cập nhật trạng thái phòng | Giữ trạng thái cũ |
| Xóa phòng | Ngừng quản lý phòng | Không xóa nếu còn ràng buộc |
| Tìm kiếm | Trả phòng phù hợp | Trả danh sách rỗng |
| Lọc phòng | Trả danh sách đã lọc | Trả lỗi nếu điều kiện lọc sai |
| Cập nhật tiện nghi | Lưu danh sách tiện nghi mới | Giữ danh sách cũ |

---

# 9. Test Cases – Trường hợp kiểm thử

| Test Case | Chức năng | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC_ROOM_01 | Xem danh sách | Access Token hợp lệ | Hiển thị danh sách phòng |
| TC_ROOM_02 | Xem danh sách | Không có quyền | Trả lỗi 403 |
| TC_ROOM_03 | Xem chi tiết | ID phòng tồn tại | Trả thông tin phòng |
| TC_ROOM_04 | Xem chi tiết | ID không tồn tại | Trả lỗi 404 |
| TC_ROOM_05 | Thêm phòng | Dữ liệu hợp lệ | Tạo phòng thành công |
| TC_ROOM_06 | Thêm phòng | Mã phòng bị trùng | Trả lỗi 409 |
| TC_ROOM_07 | Thêm phòng | Giá thuê âm | Trả lỗi 400 |
| TC_ROOM_08 | Thêm phòng | Diện tích bằng 0 | Trả lỗi 400 |
| TC_ROOM_09 | Cập nhật | ID hợp lệ, dữ liệu đúng | Cập nhật thành công |
| TC_ROOM_10 | Cập nhật | ID không tồn tại | Trả lỗi 404 |
| TC_ROOM_11 | Thay đổi trạng thái | Trạng thái hợp lệ | Cập nhật thành công |
| TC_ROOM_12 | Thay đổi trạng thái | Trạng thái không hợp lệ | Trả lỗi 400 |
| TC_ROOM_13 | Xóa phòng | Phòng không có hợp đồng hiệu lực | Ngừng quản lý thành công |
| TC_ROOM_14 | Xóa phòng | Phòng có hợp đồng hiệu lực | Trả lỗi 409 |
| TC_ROOM_15 | Tìm kiếm | Mã phòng tồn tại | Trả phòng phù hợp |
| TC_ROOM_16 | Tìm kiếm | Không tìm thấy phòng | Trả danh sách rỗng |
| TC_ROOM_17 | Lọc phòng | Điều kiện lọc hợp lệ | Trả danh sách phù hợp |
| TC_ROOM_18 | Lọc phòng | Giá tối đa nhỏ hơn giá tối thiểu | Trả lỗi 400 |
| TC_ROOM_19 | Tiện nghi | Danh sách mã hợp lệ | Cập nhật thành công |
| TC_ROOM_20 | Tiện nghi | Mã tiện nghi không hợp lệ | Trả lỗi 400 |
| TC_ROOM_21 | Phân quyền | STAFF không có quyền sửa phòng | Trả lỗi 403 |
| TC_ROOM_22 | Phạm vi dữ liệu | Truy cập phòng chủ nhà khác | Từ chối truy cập |

---

# 10. Error Codes – Danh sách mã lỗi

| HTTP Status | Error Code | Ý nghĩa |
|---|---|---|
| 200 | SUCCESS | Thành công |
| 201 | ROOM_CREATED | Tạo phòng thành công |
| 400 | VALIDATION_ERROR | Dữ liệu không hợp lệ |
| 400 | INVALID_ROOM_STATUS | Trạng thái phòng không hợp lệ |
| 400 | KEYWORD_REQUIRED | Thiếu từ khóa tìm kiếm |
| 400 | INVALID_FILTER_RANGE | Khoảng lọc không hợp lệ |
| 400 | INVALID_AMENITY | Mã tiện nghi không hợp lệ |
| 401 | UNAUTHORIZED | Chưa xác thực |
| 403 | FORBIDDEN | Không có quyền thực hiện |
| 404 | ROOM_NOT_FOUND | Không tìm thấy phòng |
| 409 | ROOM_CODE_ALREADY_EXISTS | Mã phòng đã tồn tại |
| 409 | ROOM_HAS_ACTIVE_CONTRACT | Phòng có hợp đồng đang hiệu lực |
| 500 | INTERNAL_SERVER_ERROR | Lỗi máy chủ |

---

# 11. Security – Yêu cầu bảo mật

1. Các API quản lý phòng phải xác thực Access Token.
2. Kiểm tra quyền người dùng ở Backend.
3. Kiểm tra phạm vi quản lý trước khi truy vấn hoặc cập nhật phòng.
4. Không cho phép người dùng thao tác lên phòng thuộc chủ nhà khác.
5. Kiểm tra dữ liệu đầu vào để tránh dữ liệu không hợp lệ.
6. Không tin tưởng giá thuê hoặc trạng thái phòng do Frontend tự gửi mà chưa kiểm tra.
7. Không cho phép xóa phòng đang có hợp đồng thuê hiệu lực.
8. Ghi nhận lịch sử thêm, sửa, xóa và thay đổi trạng thái phòng.
9. Sử dụng HTTPS khi truyền dữ liệu.
10. Áp dụng xóa mềm để bảo toàn dữ liệu nghiệp vụ liên quan.

---

# 12. Database – Cơ sở dữ liệu liên quan

## 12.1. Bảng Rooms

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| landlord_id | BIGINT | ID chủ nhà quản lý |
| room_code | VARCHAR(50) | Mã phòng |
| room_name | VARCHAR(255) | Tên phòng |
| description | TEXT | Mô tả phòng |
| area | DECIMAL(10,2) | Diện tích phòng |
| price | DECIMAL(15,2) | Giá thuê tháng |
| floor | INT | Tầng |
| max_occupants | INT | Số người tối đa |
| status | VARCHAR(30) | Trạng thái phòng |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| deleted_at | DATETIME | Thời điểm xóa mềm |

## 12.2. Bảng Amenities

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| amenity_code | VARCHAR(100) | Mã tiện nghi |
| amenity_name | VARCHAR(255) | Tên tiện nghi |
| description | TEXT | Mô tả |

## 12.3. Bảng RoomAmenities

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| room_id | BIGINT | ID phòng |
| amenity_id | BIGINT | ID tiện nghi |

## 12.4. Bảng RoomStatusHistory

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| room_id | BIGINT | ID phòng |
| old_status | VARCHAR(30) | Trạng thái cũ |
| new_status | VARCHAR(30) | Trạng thái mới |
| reason | TEXT | Lý do thay đổi |
| changed_by | BIGINT | Người thực hiện |
| created_at | DATETIME | Thời điểm thay đổi |

## 12.5. Quan hệ dữ liệu

- Một chủ nhà có nhiều phòng.
- Một phòng có thể có nhiều tiện nghi.
- Một tiện nghi có thể thuộc nhiều phòng.
- Một phòng có nhiều bản ghi lịch sử trạng thái.
- Một phòng có thể liên kết với nhiều hợp đồng thuê theo thời gian.
- Một phòng có thể có nhiều hóa đơn theo các chu kỳ thuê.

---

# 13. Luồng hoạt động tổng thể

```text
                  CHỦ NHÀ
                     |
                     v
                QUẢN LÝ PHÒNG
                     |
       +-------------+-------------+
       |             |             |
       v             v             v
    Thêm phòng   Xem danh sách   Tìm kiếm/Lọc
       |             |             |
       v             v             v
   Nhập thông tin  Chọn phòng   Nhập điều kiện
       |             |             |
       +-------------+-------------+
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
         Xử lý nghiệp    Trả lỗi 403
         vụ phòng
              |
              v
          Database
              |
              v
       Ghi lịch sử thay đổi
              |
              v
         Trả Response
              |
              v
            FRONTEND
```

---

# 14. Kết quả đầu ra của Module

Sau khi hoàn thành Module Room, hệ thống cần đáp ứng:

- Chủ nhà xem được danh sách phòng.
- Chủ nhà xem được chi tiết từng phòng.
- Chủ nhà thêm được phòng mới.
- Chủ nhà cập nhật được thông tin và giá thuê phòng.
- Chủ nhà thay đổi được trạng thái phòng.
- Chủ nhà ngừng quản lý phòng không còn sử dụng.
- Hệ thống hỗ trợ tìm kiếm phòng.
- Hệ thống hỗ trợ lọc phòng theo trạng thái, giá thuê và diện tích.
- Chủ nhà quản lý được tiện nghi của từng phòng.
- Hệ thống ghi nhận lịch sử thay đổi thông tin và trạng thái phòng.
- Thông tin phòng được liên kết với hợp đồng thuê và hóa đơn.

---

# 15. Ghi chú triển khai

1. Request và Response JSON là dữ liệu mẫu mô tả hợp đồng API.
2. Các endpoint cần được thống nhất với Backend thực tế.
3. Mã phòng phải duy nhất trong phạm vi nhà trọ.
4. Giá thuê phòng là giá niêm yết hiện tại; giá đã ghi trong hợp đồng đang hiệu lực không tự động thay đổi khi cập nhật giá phòng.
5. Không nên xóa vật lý phòng có lịch sử hợp đồng hoặc hóa đơn.
6. Việc chuyển trạng thái phòng cần đồng bộ với tình trạng hợp đồng.
7. Danh sách tiện nghi có thể được quản lý bằng bảng riêng hoặc danh sách mã cố định tùy kiến trúc hệ thống.
8. Cần kiểm thử các trường hợp phòng trống, phòng đang thuê, phòng bảo trì và phòng ngừng hoạt động.

**Trạng thái tài liệu:** API Design – Proposed

**Module:** Room – Quản lý phòng trọ

**Dự án:** Phòng trọ / Nhà cho thuê