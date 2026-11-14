# MODULE 4: TENANT & CONTRACT MANAGEMENT
## QUẢN LÝ NGƯỜI THUÊ VÀ HỢP ĐỒNG

**Phiên bản:** 1.0  
**Module:** Tenant & Contract Management  
**API Prefix:** `/api/v1`  
**Đối tượng sử dụng:** Chủ nhà, quản trị viên được phân quyền.

---

# 1. MỤC ĐÍCH MODULE

Module Tenant & Contract dùng để quản lý thông tin người thuê và hợp đồng thuê phòng trong hệ thống quản lý phòng trọ.

### 1.1. Chức năng chính

- Thêm người thuê mới.
- Xem danh sách người thuê.
- Xem thông tin chi tiết người thuê.
- Cập nhật thông tin người thuê.
- Tìm kiếm người thuê.
- Xóa hoặc ngừng quản lý người thuê.
- Tạo hợp đồng thuê phòng.
- Xem danh sách hợp đồng.
- Xem chi tiết hợp đồng.
- Cập nhật thông tin hợp đồng.
- Gia hạn hợp đồng.
- Chấm dứt hợp đồng.
- Theo dõi trạng thái hợp đồng.
- Quản lý tiền đặt cọc.
- Theo dõi lịch sử thuê phòng.

### 1.2. Vai trò của module

Module này kết nối với Module 3 – Room Management và Module 5 – Rental Services & Billing.

Ví dụ:

- Khi tạo hợp đồng thành công, phòng được cập nhật thành trạng thái `RENTED`.
- Khi hợp đồng kết thúc, hệ thống xử lý trạng thái phòng theo tình trạng thực tế.
- Thông tin hợp đồng được sử dụng để tính tiền thuê và lập hóa đơn.
- Tiền đặt cọc được lưu lại để theo dõi khi kết thúc hợp đồng.

---

# 2. DANH SÁCH API ENDPOINT

## 2.1. Tenant Management – Quản lý người thuê

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/tenants` | Lấy danh sách người thuê |
| 2 | GET | `/tenants/{id}` | Xem chi tiết người thuê |
| 3 | POST | `/tenants` | Thêm người thuê |
| 4 | PUT | `/tenants/{id}` | Cập nhật người thuê |
| 5 | DELETE | `/tenants/{id}` | Ngừng quản lý người thuê |
| 6 | GET | `/tenants/search` | Tìm kiếm người thuê |
| 7 | GET | `/tenants/{id}/contracts` | Xem hợp đồng của người thuê |

## 2.2. Contract Management – Quản lý hợp đồng

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/contracts` | Lấy danh sách hợp đồng |
| 2 | GET | `/contracts/{id}` | Xem chi tiết hợp đồng |
| 3 | POST | `/contracts` | Tạo hợp đồng |
| 4 | PUT | `/contracts/{id}` | Cập nhật hợp đồng |
| 5 | PATCH | `/contracts/{id}/renew` | Gia hạn hợp đồng |
| 6 | PATCH | `/contracts/{id}/terminate` | Chấm dứt hợp đồng |
| 7 | GET | `/contracts/search` | Tìm kiếm hợp đồng |
| 8 | GET | `/contracts/room/{roomId}` | Xem hợp đồng theo phòng |

---

# 3. TENANT API – QUẢN LÝ NGƯỜI THUÊ

## API 3.1. Lấy danh sách người thuê

**Method:** `GET`

**Endpoint:** `/api/v1/tenants`

### Request

Query Parameters:

| Parameter | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| page | Integer | Không | Trang hiện tại |
| limit | Integer | Không | Số lượng mỗi trang |
| keyword | String | Không | Tìm theo tên hoặc số điện thoại |
| status | String | Không | Trạng thái người thuê |

Ví dụ:

`GET /api/v1/tenants?page=1&limit=10&keyword=Nguyen&status=ACTIVE`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy danh sách người thuê thành công",
  "data": [
    {
      "id": 1,
      "fullName": "Nguyen Van A",
      "phone": "0901234567",
      "email": "a@gmail.com",
      "identityNumber": "079123456789",
      "address": "Ho Chi Minh City",
      "status": "ACTIVE",
      "createdAt": "2026-10-01T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

### Response – Thất bại (400 Bad Request)

```json
{
  "success": false,
  "message": "Tham số phân trang không hợp lệ",
  "errorCode": "INVALID_PAGINATION"
}
```

---

## API 3.2. Xem chi tiết người thuê

**Method:** `GET`

**Endpoint:** `/api/v1/tenants/{id}`

### Request

Path Parameter:

| Parameter | Kiểu | Mô tả |
|---|---|---|
| id | Integer | ID người thuê |

Ví dụ:

`GET /api/v1/tenants/1`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy thông tin người thuê thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyen Van A",
    "phone": "0901234567",
    "email": "a@gmail.com",
    "identityNumber": "079123456789",
    "dateOfBirth": "2000-05-20",
    "gender": "MALE",
    "address": "Ho Chi Minh City",
    "occupation": "Student",
    "emergencyContact": {
      "name": "Nguyen Van B",
      "phone": "0909876543",
      "relationship": "Relative"
    },
    "status": "ACTIVE"
  }
}
```

### Response – Không tìm thấy (404 Not Found)

```json
{
  "success": false,
  "message": "Không tìm thấy người thuê",
  "errorCode": "TENANT_NOT_FOUND"
}
```

---

## API 3.3. Thêm người thuê mới

**Method:** `POST`

**Endpoint:** `/api/v1/tenants`

### Request Body

| Field | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| fullName | String | Có | Họ và tên |
| phone | String | Có | Số điện thoại |
| email | String | Không | Email |
| identityNumber | String | Có | Số giấy tờ tùy thân |
| dateOfBirth | Date | Không | Ngày sinh |
| gender | String | Không | Giới tính |
| address | String | Không | Địa chỉ thường trú |
| occupation | String | Không | Nghề nghiệp |
| emergencyContactName | String | Không | Người liên hệ khẩn cấp |
| emergencyContactPhone | String | Không | Số điện thoại liên hệ |

### Request Body – Ví dụ

```json
{
  "fullName": "Nguyen Van A",
  "phone": "0901234567",
  "email": "a@gmail.com",
  "identityNumber": "079123456789",
  "dateOfBirth": "2000-05-20",
  "gender": "MALE",
  "address": "Ho Chi Minh City",
  "occupation": "Student",
  "emergencyContactName": "Nguyen Van B",
  "emergencyContactPhone": "0909876543"
}
```

### Response – Thành công (201 Created)

```json
{
  "success": true,
  "message": "Thêm người thuê thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyen Van A",
    "phone": "0901234567",
    "email": "a@gmail.com",
    "identityNumber": "079123456789",
    "status": "ACTIVE",
    "createdAt": "2026-10-01T08:00:00Z"
  }
}
```

### Response – Thất bại (409 Conflict)

```json
{
  "success": false,
  "message": "Số giấy tờ tùy thân đã tồn tại",
  "errorCode": "TENANT_IDENTITY_EXISTS"
}
```

---

## API 3.4. Cập nhật thông tin người thuê

**Method:** `PUT`

**Endpoint:** `/api/v1/tenants/{id}`

### Request Body

```json
{
  "fullName": "Nguyen Van A",
  "phone": "0911111111",
  "email": "newemail@gmail.com",
  "identityNumber": "079123456789",
  "dateOfBirth": "2000-05-20",
  "gender": "MALE",
  "address": "Thu Duc, Ho Chi Minh City",
  "occupation": "Employee",
  "emergencyContactName": "Nguyen Van B",
  "emergencyContactPhone": "0909876543"
}
```

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Cập nhật thông tin người thuê thành công",
  "data": {
    "id": 1,
    "fullName": "Nguyen Van A",
    "phone": "0911111111",
    "email": "newemail@gmail.com",
    "identityNumber": "079123456789",
    "status": "ACTIVE",
    "updatedAt": "2026-10-02T09:00:00Z"
  }
}
```

### Response – Thất bại (404 Not Found)

```json
{
  "success": false,
  "message": "Không tìm thấy người thuê",
  "errorCode": "TENANT_NOT_FOUND"
}
```

---

## API 3.5. Ngừng quản lý người thuê

**Method:** `DELETE`

**Endpoint:** `/api/v1/tenants/{id}`

### Request

Ví dụ:

`DELETE /api/v1/tenants/1`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Ngừng quản lý người thuê thành công",
  "data": {
    "id": 1,
    "status": "INACTIVE",
    "deletedAt": "2026-10-03T10:00:00Z"
  }
}
```

### Response – Thất bại (409 Conflict)

```json
{
  "success": false,
  "message": "Không thể ngừng quản lý người thuê đang có hợp đồng hiệu lực",
  "errorCode": "TENANT_HAS_ACTIVE_CONTRACT"
}
```

**Lưu ý:** Nên sử dụng Soft Delete hoặc chuyển trạng thái `INACTIVE`, không xóa dữ liệu người thuê khỏi cơ sở dữ liệu nếu đã phát sinh hợp đồng hoặc hóa đơn.

---

## API 3.6. Tìm kiếm người thuê

**Method:** `GET`

**Endpoint:** `/api/v1/tenants/search`

### Request

`GET /api/v1/tenants/search?keyword=0901234567`

Query Parameter:

| Field | Kiểu | Mô tả |
|---|---|---|
| keyword | String | Tên, số điện thoại hoặc số giấy tờ |

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Tìm kiếm thành công",
  "data": [
    {
      "id": 1,
      "fullName": "Nguyen Van A",
      "phone": "0901234567",
      "identityNumber": "079123456789",
      "status": "ACTIVE"
    }
  ]
}
```

---

## API 3.7. Xem hợp đồng của người thuê

**Method:** `GET`

**Endpoint:** `/api/v1/tenants/{id}/contracts`

### Request

`GET /api/v1/tenants/1/contracts`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy danh sách hợp đồng thành công",
  "data": [
    {
      "contractId": 1,
      "contractCode": "HD0001",
      "roomId": 5,
      "roomName": "P.101",
      "startDate": "2026-10-01",
      "endDate": "2027-10-01",
      "monthlyRent": 3000000,
      "status": "ACTIVE"
    }
  ]
}
```

---

# 4. CONTRACT API – QUẢN LÝ HỢP ĐỒNG

## 4.1. Lấy danh sách hợp đồng

**Method:** `GET`

**Endpoint:** `/api/v1/contracts`

### Request

Query Parameters:

| Parameter | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| page | Integer | Không | Trang hiện tại |
| limit | Integer | Không | Số bản ghi mỗi trang |
| roomId | Integer | Không | Lọc theo phòng |
| tenantId | Integer | Không | Lọc theo người thuê |
| status | String | Không | Trạng thái hợp đồng |
| startDate | Date | Không | Ngày bắt đầu lọc |
| endDate | Date | Không | Ngày kết thúc lọc |

Ví dụ:

`GET /api/v1/contracts?page=1&limit=10&status=ACTIVE`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy danh sách hợp đồng thành công",
  "data": [
    {
      "id": 1,
      "contractCode": "HD0001",
      "roomId": 5,
      "roomName": "P.101",
      "tenantId": 1,
      "tenantName": "Nguyen Van A",
      "startDate": "2026-10-01",
      "endDate": "2027-10-01",
      "monthlyRent": 3000000,
      "depositAmount": 3000000,
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
```

---

## 4.2. Xem chi tiết hợp đồng

**Method:** `GET`

**Endpoint:** `/api/v1/contracts/{id}`

### Request

`GET /api/v1/contracts/1`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy chi tiết hợp đồng thành công",
  "data": {
    "id": 1,
    "contractCode": "HD0001",
    "room": {
      "id": 5,
      "roomName": "P.101"
    },
    "tenant": {
      "id": 1,
      "fullName": "Nguyen Van A",
      "phone": "0901234567",
      "identityNumber": "079123456789"
    },
    "startDate": "2026-10-01",
    "endDate": "2027-10-01",
    "monthlyRent": 3000000,
    "depositAmount": 3000000,
    "paymentDueDay": 5,
    "paymentCycle": "MONTHLY",
    "terms": "Thanh toán tiền phòng trước ngày 5 hàng tháng",
    "status": "ACTIVE",
    "createdAt": "2026-10-01T08:00:00Z"
  }
}
```

---

## 4.3. Tạo hợp đồng thuê phòng

**Method:** `POST`

**Endpoint:** `/api/v1/contracts`

### Request Body

| Field | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| roomId | Integer | Có | ID phòng thuê |
| tenantId | Integer | Có | ID người thuê chính |
| contractCode | String | Không | Mã hợp đồng, hệ thống có thể tự tạo |
| startDate | Date | Có | Ngày bắt đầu |
| endDate | Date | Có | Ngày kết thúc |
| monthlyRent | Number | Có | Giá thuê hàng tháng |
| depositAmount | Number | Có | Tiền đặt cọc |
| paymentDueDay | Integer | Có | Ngày đến hạn thanh toán |
| paymentCycle | String | Có | Chu kỳ thanh toán |
| terms | String | Không | Điều khoản hợp đồng |

### Request Body – Ví dụ

```json
{
  "roomId": 5,
  "tenantId": 1,
  "startDate": "2026-10-01",
  "endDate": "2027-10-01",
  "monthlyRent": 3000000,
  "depositAmount": 3000000,
  "paymentDueDay": 5,
  "paymentCycle": "MONTHLY",
  "terms": "Thanh toán tiền phòng trước ngày 5 hàng tháng"
}
```

### Response – Thành công (201 Created)

```json
{
  "success": true,
  "message": "Tạo hợp đồng thuê phòng thành công",
  "data": {
    "id": 1,
    "contractCode": "HD0001",
    "roomId": 5,
    "tenantId": 1,
    "startDate": "2026-10-01",
    "endDate": "2027-10-01",
    "monthlyRent": 3000000,
    "depositAmount": 3000000,
    "paymentDueDay": 5,
    "paymentCycle": "MONTHLY",
    "status": "ACTIVE",
    "createdAt": "2026-10-01T08:00:00Z"
  }
}
```

### Response – Thất bại (409 Conflict)

```json
{
  "success": false,
  "message": "Phòng hiện đã có hợp đồng đang hiệu lực",
  "errorCode": "ROOM_ALREADY_RENTED"
}
```

### Quy tắc xử lý

Khi tạo hợp đồng thành công, hệ thống cần:

1. Kiểm tra người thuê có tồn tại không.
2. Kiểm tra phòng có tồn tại không.
3. Kiểm tra phòng có sẵn sàng cho thuê không.
4. Kiểm tra phòng có hợp đồng đang hiệu lực trong khoảng thời gian đó không.
5. Kiểm tra ngày bắt đầu và ngày kết thúc hợp lệ.
6. Tạo hợp đồng.
7. Cập nhật trạng thái phòng thành `RENTED` nếu hợp đồng bắt đầu có hiệu lực ngay.
8. Ghi nhận khoản tiền đặt cọc theo nghiệp vụ của Module 5.
9. Ghi nhật ký hoạt động.

Các thao tác liên quan cần được thực hiện trong một database transaction để tránh tạo hợp đồng thành công nhưng trạng thái phòng không được cập nhật.

---

## 4.4. Cập nhật hợp đồng

**Method:** `PUT`

**Endpoint:** `/api/v1/contracts/{id}`

### Request Body

```json
{
  "monthlyRent": 3200000,
  "depositAmount": 3000000,
  "paymentDueDay": 10,
  "paymentCycle": "MONTHLY",
  "terms": "Thanh toán tiền phòng trước ngày 10 hàng tháng"
}
```

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Cập nhật hợp đồng thành công",
  "data": {
    "id": 1,
    "contractCode": "HD0001",
    "monthlyRent": 3200000,
    "depositAmount": 3000000,
    "paymentDueDay": 10,
    "paymentCycle": "MONTHLY",
    "status": "ACTIVE",
    "updatedAt": "2026-10-02T09:00:00Z"
  }
}
```

### Response – Thất bại (400 Bad Request)

```json
{
  "success": false,
  "message": "Giá thuê phải lớn hơn 0",
  "errorCode": "INVALID_RENT_PRICE"
}
```

**Lưu ý nghiệp vụ:** Không nên cho phép tùy ý sửa giá thuê của các kỳ hóa đơn đã được tạo. Nếu thay đổi giá thuê, cần lưu lịch sử thay đổi và xác định thời điểm áp dụng.

---

## 4.5. Gia hạn hợp đồng

**Method:** `PATCH`

**Endpoint:** `/api/v1/contracts/{id}/renew`

### Request Body

| Field | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| newEndDate | Date | Có | Ngày kết thúc mới |
| newMonthlyRent | Number | Không | Giá thuê mới |
| note | String | Không | Ghi chú gia hạn |

### Request Body – Ví dụ

```json
{
  "newEndDate": "2028-10-01",
  "newMonthlyRent": 3300000,
  "note": "Gia hạn hợp đồng thêm một năm"
}
```

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Gia hạn hợp đồng thành công",
  "data": {
    "contractId": 1,
    "contractCode": "HD0001",
    "oldEndDate": "2027-10-01",
    "newEndDate": "2028-10-01",
    "oldMonthlyRent": 3200000,
    "newMonthlyRent": 3300000,
    "status": "ACTIVE",
    "updatedAt": "2027-09-20T09:00:00Z"
  }
}
```

### Response – Thất bại (409 Conflict)

```json
{
  "success": false,
  "message": "Không thể gia hạn hợp đồng đã chấm dứt",
  "errorCode": "CONTRACT_ALREADY_TERMINATED"
}
```

---

## 4.6. Chấm dứt hợp đồng

**Method:** `PATCH`

**Endpoint:** `/api/v1/contracts/{id}/terminate`

### Request Body

| Field | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| terminationDate | Date | Có | Ngày chấm dứt |
| reason | String | Có | Lý do chấm dứt |
| note | String | Không | Ghi chú |
| depositSettlementStatus | String | Không | Trạng thái xử lý cọc |

### Request Body – Ví dụ

```json
{
  "terminationDate": "2027-09-30",
  "reason": "Tenant moves out",
  "note": "Đã kiểm tra tình trạng phòng",
  "depositSettlementStatus": "PENDING"
}
```

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Chấm dứt hợp đồng thành công",
  "data": {
    "contractId": 1,
    "contractCode": "HD0001",
    "terminationDate": "2027-09-30",
    "reason": "Tenant moves out",
    "status": "TERMINATED",
    "depositSettlementStatus": "PENDING",
    "updatedAt": "2027-09-30T10:00:00Z"
  }
}
```

### Response – Thất bại (404 Not Found)

```json
{
  "success": false,
  "message": "Không tìm thấy hợp đồng",
  "errorCode": "CONTRACT_NOT_FOUND"
}
```

### Quy tắc xử lý

Khi chấm dứt hợp đồng, hệ thống cần:

1. Kiểm tra hợp đồng tồn tại.
2. Kiểm tra hợp đồng có thể chấm dứt hay không.
3. Ghi nhận ngày và lý do chấm dứt.
4. Cập nhật trạng thái hợp đồng thành `TERMINATED`.
5. Ghi nhận tình trạng thanh toán các hóa đơn còn lại.
6. Chuyển việc xử lý tiền cọc sang Module 5.
7. Cập nhật trạng thái phòng theo tình trạng thực tế.
8. Ghi nhật ký hoạt động.

**Lưu ý:** Không tự động chuyển phòng thành `AVAILABLE` nếu phòng chưa được kiểm tra hoặc còn người ở. Trạng thái phòng cần được cập nhật theo quy trình trả phòng.

---

## 4.7. Tìm kiếm hợp đồng

**Method:** `GET`

**Endpoint:** `/api/v1/contracts/search`

### Request

`GET /api/v1/contracts/search?keyword=HD0001`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Tìm kiếm hợp đồng thành công",
  "data": [
    {
      "id": 1,
      "contractCode": "HD0001",
      "tenantName": "Nguyen Van A",
      "roomName": "P.101",
      "startDate": "2026-10-01",
      "endDate": "2027-10-01",
      "status": "ACTIVE"
    }
  ]
}
```

---

## 4.8. Xem hợp đồng theo phòng

**Method:** `GET`

**Endpoint:** `/api/v1/contracts/room/{roomId}`

### Request

`GET /api/v1/contracts/room/5`

### Response – Thành công (200 OK)

```json
{
  "success": true,
  "message": "Lấy danh sách hợp đồng theo phòng thành công",
  "data": [
    {
      "id": 1,
      "contractCode": "HD0001",
      "tenantId": 1,
      "tenantName": "Nguyen Van A",
      "startDate": "2026-10-01",
      "endDate": "2027-10-01",
      "monthlyRent": 3000000,
      "status": "ACTIVE"
    }
  ]
}
```

---

# 5. VALIDATION – KIỂM TRA DỮ LIỆU

## 5.1. Kiểm tra người thuê

| Field | Điều kiện |
|---|---|
| fullName | Không được để trống |
| phone | Bắt buộc, đúng định dạng số điện thoại |
| email | Phải đúng định dạng email nếu có |
| identityNumber | Bắt buộc, không trùng theo quy tắc hệ thống |
| dateOfBirth | Không được là ngày không hợp lệ |
| gender | Chỉ nhận giá trị được hệ thống quy định |

## 5.2. Kiểm tra hợp đồng

| Field | Điều kiện |
|---|---|
| roomId | Phòng phải tồn tại |
| tenantId | Người thuê phải tồn tại |
| startDate | Phải là ngày hợp lệ |
| endDate | Phải lớn hơn startDate |
| monthlyRent | Phải lớn hơn 0 |
| depositAmount | Phải lớn hơn hoặc bằng 0 |
| paymentDueDay | Từ 1 đến 31 |
| paymentCycle | Chỉ nhận chu kỳ được hỗ trợ |
| contractCode | Không được trùng |

## 5.3. Kiểm tra nghiệp vụ

- Một phòng không được có hai hợp đồng đang hiệu lực trùng thời gian.
- Người thuê phải tồn tại trước khi tạo hợp đồng.
- Không được gia hạn hợp đồng đã chấm dứt.
- Không được xóa người thuê đang có hợp đồng hiệu lực.
- Không được chấm dứt hợp đồng hai lần.
- Việc xử lý tiền cọc phải được ghi nhận riêng.
- Hợp đồng đã phát sinh hóa đơn cần được giữ lại để đối chiếu.

---

# 6. CONTRACT STATUS – TRẠNG THÁI HỢP ĐỒNG

| Status | Ý nghĩa |
|---|---|
| DRAFT | Bản nháp |
| ACTIVE | Đang hiệu lực |
| EXPIRED | Đã hết hạn |
| TERMINATED | Đã chấm dứt |
| PENDING | Chờ hiệu lực hoặc xác nhận |

**Quy tắc:** Trạng thái `ACTIVE` chỉ được sử dụng khi hợp đồng đã bắt đầu có hiệu lực và chưa kết thúc.

# 7. TENANT STATUS – TRẠNG THÁI NGƯỜI THUÊ

| Status | Ý nghĩa |
|---|---|
| ACTIVE | Đang hoạt động |
| INACTIVE | Ngừng quản lý |
| BLACKLISTED | Bị hạn chế theo chính sách quản lý của chủ nhà |

Trạng thái `BLACKLISTED` chỉ nên sử dụng nếu hệ thống thực sự có nghiệp vụ này và có quy định rõ ràng.

---

# 8. DATABASE DESIGN – THIẾT KẾ CƠ SỞ DỮ LIỆU

## 8.1. Bảng Tenants

| Column | Data Type | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| full_name | VARCHAR(255) | Họ tên |
| phone | VARCHAR(20) | Số điện thoại |
| email | VARCHAR(255) | Email |
| identity_number | VARCHAR(50) | Số giấy tờ tùy thân |
| date_of_birth | DATE | Ngày sinh |
| gender | VARCHAR(20) | Giới tính |
| address | TEXT | Địa chỉ |
| occupation | VARCHAR(255) | Nghề nghiệp |
| emergency_contact_name | VARCHAR(255) | Người liên hệ khẩn cấp |
| emergency_contact_phone | VARCHAR(20) | Số liên hệ |
| status | VARCHAR(30) | Trạng thái |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| deleted_at | DATETIME | Ngày ngừng quản lý |

## 8.2. Bảng Contracts

| Column | Data Type | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| contract_code | VARCHAR(50) | Mã hợp đồng |
| room_id | BIGINT | Khóa ngoại đến Rooms |
| tenant_id | BIGINT | Khóa ngoại đến Tenants |
| start_date | DATE | Ngày bắt đầu |
| end_date | DATE | Ngày kết thúc |
| monthly_rent | DECIMAL(15,2) | Giá thuê |
| deposit_amount | DECIMAL(15,2) | Tiền cọc |
| payment_due_day | INT | Ngày đến hạn |
| payment_cycle | VARCHAR(30) | Chu kỳ thanh toán |
| terms | TEXT | Điều khoản |
| status | VARCHAR(30) | Trạng thái |
| termination_date | DATE | Ngày chấm dứt |
| termination_reason | TEXT | Lý do chấm dứt |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## 8.3. Bảng Contract_Tenants

Bảng này dùng khi một hợp đồng có nhiều người cùng thuê.

| Column | Data Type | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| contract_id | BIGINT | ID hợp đồng |
| tenant_id | BIGINT | ID người thuê |
| is_primary | BOOLEAN | Người thuê đại diện |
| joined_at | DATE | Ngày tham gia hợp đồng |
| left_at | DATE | Ngày rời hợp đồng |

Nếu hệ thống chỉ cho phép một người thuê đại diện và không quản lý người ở cùng, có thể bỏ bảng này ở phiên bản đầu.

## 8.4. Bảng Contract_History

| Column | Data Type | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| contract_id | BIGINT | ID hợp đồng |
| old_value | JSON | Giá trị cũ |
| new_value | JSON | Giá trị mới |
| action | VARCHAR(50) | Loại thay đổi |
| changed_by | BIGINT | Người thực hiện |
| changed_at | DATETIME | Thời gian thay đổi |
| note | TEXT | Ghi chú |

Bảng này dùng để lưu lịch sử gia hạn, thay đổi giá thuê hoặc thay đổi điều khoản hợp đồng.

---

# 9. DATABASE RELATIONSHIP – QUAN HỆ BẢNG

```text
ROOMS
  |
  | 1 - N
  |
CONTRACTS
  |
  | N - 1
  |
TENANTS

CONTRACTS
  |
  | 1 - N
  |
CONTRACT_HISTORY

CONTRACTS
  |
  | 1 - N
  |
CONTRACT_TENANTS
  |
  | N - 1
  |
TENANTS
```

**Giải thích:**

- Một phòng có thể có nhiều hợp đồng qua các thời kỳ.
- Một người thuê có thể có nhiều hợp đồng theo thời gian.
- Một hợp đồng có thể lưu nhiều người thuê nếu hệ thống hỗ trợ nhóm người thuê.
- Một hợp đồng có nhiều bản ghi lịch sử thay đổi.

---

# 10. AUTHORIZATION – PHÂN QUYỀN

| Chức năng | Chủ nhà | Nhân viên được cấp quyền |
|---|---|---|
| Xem danh sách người thuê | Có | Theo quyền |
| Thêm người thuê | Có | Theo quyền |
| Cập nhật người thuê | Có | Theo quyền |
| Ngừng quản lý người thuê | Có | Theo quyền |
| Xem hợp đồng | Có | Theo quyền |
| Tạo hợp đồng | Có | Theo quyền |
| Cập nhật hợp đồng | Có | Theo quyền |
| Gia hạn hợp đồng | Có | Theo quyền |
| Chấm dứt hợp đồng | Có | Theo quyền |

### Yêu cầu bảo mật

- Các API quản lý phải yêu cầu đăng nhập.
- Kiểm tra quyền trước khi thực hiện thao tác.
- Người dùng chỉ được truy cập dữ liệu thuộc phạm vi được phân quyền.
- Không trả về dữ liệu giấy tờ tùy thân đầy đủ nếu màn hình không cần thiết.
- Không lưu mật khẩu hoặc thông tin xác thực trong bảng Tenants.
- Ghi nhật ký các thao tác quan trọng.

---

# 11. ERROR CODES – DANH SÁCH MÃ LỖI

| HTTP Status | Error Code | Mô tả |
|---|---|---|
| 400 | INVALID_REQUEST | Dữ liệu gửi lên không hợp lệ |
| 400 | INVALID_PHONE | Số điện thoại không hợp lệ |
| 400 | INVALID_EMAIL | Email không hợp lệ |
| 400 | INVALID_RENT_PRICE | Giá thuê không hợp lệ |
| 401 | UNAUTHORIZED | Chưa đăng nhập |
| 403 | FORBIDDEN | Không có quyền truy cập |
| 404 | TENANT_NOT_FOUND | Không tìm thấy người thuê |
| 404 | CONTRACT_NOT_FOUND | Không tìm thấy hợp đồng |
| 404 | ROOM_NOT_FOUND | Không tìm thấy phòng |
| 409 | TENANT_IDENTITY_EXISTS | Giấy tờ tùy thân đã tồn tại |
| 409 | ROOM_ALREADY_RENTED | Phòng đã được thuê |
| 409 | CONTRACT_ALREADY_TERMINATED | Hợp đồng đã chấm dứt |
| 409 | TENANT_HAS_ACTIVE_CONTRACT | Người thuê đang có hợp đồng hiệu lực |
| 500 | INTERNAL_SERVER_ERROR | Lỗi hệ thống |

### Ví dụ Response lỗi

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errorCode": "INVALID_REQUEST",
  "errors": [
    {
      "field": "monthlyRent",
      "message": "Giá thuê phải lớn hơn 0"
    },
    {
      "field": "endDate",
      "message": "Ngày kết thúc phải lớn hơn ngày bắt đầu"
    }
  ]
}
```

---

# 12. TEST CASES – KIỂM THỬ API

## 12.1. Tenant Test Cases

| Test ID | Trường hợp kiểm thử | Kết quả mong đợi |
|---|---|---|
| TEN-01 | Thêm người thuê hợp lệ | 201 Created |
| TEN-02 | Thiếu họ tên | 400 Bad Request |
| TEN-03 | Thiếu số điện thoại | 400 Bad Request |
| TEN-04 | Số giấy tờ đã tồn tại | 409 Conflict |
| TEN-05 | Xem người thuê không tồn tại | 404 Not Found |
| TEN-06 | Cập nhật người thuê hợp lệ | 200 OK |
| TEN-07 | Xóa người thuê đang có hợp đồng | 409 Conflict |
| TEN-08 | Tìm kiếm người thuê | Trả về kết quả phù hợp |

## 12.2. Contract Test Cases

| Test ID | Trường hợp kiểm thử | Kết quả mong đợi |
|---|---|---|
| CON-01 | Tạo hợp đồng hợp lệ | 201 Created |
| CON-02 | Tạo hợp đồng với phòng không tồn tại | 404 Not Found |
| CON-03 | Tạo hợp đồng với người thuê không tồn tại | 404 Not Found |
| CON-04 | Tạo hợp đồng với phòng đã được thuê trong cùng thời gian | 409 Conflict |
| CON-05 | Ngày kết thúc nhỏ hơn ngày bắt đầu | 400 Bad Request |
| CON-06 | Giá thuê bằng 0 | 400 Bad Request |
| CON-07 | Gia hạn hợp đồng hợp lệ | 200 OK |
| CON-08 | Gia hạn hợp đồng đã chấm dứt | 409 Conflict |
| CON-09 | Chấm dứt hợp đồng hợp lệ | 200 OK |
| CON-10 | Chấm dứt hợp đồng không tồn tại | 404 Not Found |
| CON-11 | Xem hợp đồng theo phòng | Trả về danh sách phù hợp |
| CON-12 | Người không có quyền tạo hợp đồng | 403 Forbidden |

---

# 13. BUSINESS WORKFLOW – QUY TRÌNH NGHIỆP VỤ

## 13.1. Quy trình tạo hợp đồng

```text
BẮT ĐẦU
   |
   v
Chọn phòng cần cho thuê
   |
   v
Kiểm tra trạng thái phòng
   |
   v
Chọn hoặc thêm người thuê
   |
   v
Nhập thông tin hợp đồng
   |
   v
Kiểm tra dữ liệu
   |
   v
Phòng có thể cho thuê?
   |
   +---- KHÔNG ----> Thông báo lỗi
   |
   +---- CÓ
          |
          v
     Tạo hợp đồng
          |
          v
     Ghi nhận tiền cọc
          |
          v
     Cập nhật trạng thái phòng
          |
          v
     Lưu lịch sử hoạt động
          |
          v
        KẾT THÚC
```

## 13.2. Quy trình kết thúc hợp đồng

```text
BẮT ĐẦU
   |
   v
Chọn hợp đồng
   |
   v
Kiểm tra trạng thái hợp đồng
   |
   v
Xác nhận chấm dứt
   |
   v
Ghi nhận ngày và lý do
   |
   v
Kiểm tra hóa đơn còn nợ
   |
   v
Xử lý tiền đặt cọc
   |
   v
Hoàn tất thủ tục trả phòng
   |
   v
Cập nhật trạng thái phòng
   |
   v
Lưu lịch sử
   |
   v
KẾT THÚC
```

---

# 14. API INTEGRATION – KẾT NỐI VỚI CÁC MODULE KHÁC

| Module | Dữ liệu kết nối | Mục đích |
|---|---|---|
| Module 2 – User Management | User ID | Xác định người thực hiện thao tác |
| Module 3 – Room Management | Room ID, Room Status | Kiểm tra và cập nhật phòng |
| Module 5 – Services & Billing | Contract ID, Tenant ID | Tạo hóa đơn và theo dõi thanh toán |
| Module 6 – Notification | Tenant ID, Contract ID | Gửi thông báo hợp đồng |
| Module 7 – Maintenance | Room ID, Contract ID | Liên kết yêu cầu sửa chữa |
| Module 8 – Reports & Activity Logs | Contract ID, Tenant ID | Thống kê và lưu lịch sử |

---

# 15. BUSINESS RULES – QUY TẮC NGHIỆP VỤ QUAN TRỌNG

1. Người thuê phải tồn tại trước khi tạo hợp đồng.
2. Phòng phải tồn tại và đủ điều kiện cho thuê.
3. Một phòng không được có hai hợp đồng hiệu lực trùng khoảng thời gian.
4. Hợp đồng phải có ngày bắt đầu và ngày kết thúc hợp lệ.
5. Giá thuê không được nhỏ hơn hoặc bằng 0.
6. Tiền cọc không được nhỏ hơn 0.
7. Khi hợp đồng có hiệu lực, trạng thái phòng phải được đồng bộ.
8. Khi chấm dứt hợp đồng, phải kiểm tra hóa đơn và tiền cọc.
9. Không xóa cứng dữ liệu hợp đồng đã phát sinh giao dịch.
10. Mọi thay đổi quan trọng của hợp đồng phải được lưu lịch sử.

---

# 16. KẾT LUẬN MODULE

Module Tenant & Contract Management là module quan trọng trong hệ thống quản lý phòng trọ.

Module giúp chủ nhà:

- Quản lý thông tin người thuê.
- Theo dõi hợp đồng thuê phòng.
- Kiểm soát thời hạn hợp đồng.
- Gia hạn hoặc chấm dứt hợp đồng.
- Quản lý thông tin giá thuê và tiền đặt cọc.
- Kết nối dữ liệu với quản lý phòng và lập hóa đơn.

**Kết quả:** Module cung cấp đầy đủ các API cơ bản để quản lý người thuê và hợp đồng thuê phòng trong hệ thống.

---

**Ghi chú triển khai:** Đây là tài liệu thiết kế API đề xuất cho dự án. Khi lập trình cần đối chiếu với ERD, tên bảng, cấu trúc dữ liệu và nghiệp vụ thực tế của dự án để thống nhất. Các API về tiền cọc chỉ ghi nhận thông tin và kết nối sang Module 5; việc thu, hoàn hoặc khấu trừ tiền cọc nên được xử lý tại module thanh toán.