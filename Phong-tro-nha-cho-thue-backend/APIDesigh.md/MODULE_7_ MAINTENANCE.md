# MODULE 7: MAINTENANCE – QUẢN LÝ SỬA CHỮA VÀ BẢO TRÌ

**Dự án:** Hệ thống quản lý phòng trọ / nhà cho thuê  
**Module:** Maintenance  
**Phiên bản API:** v1  
**Base URL:** `/api/v1`  
**Đối tượng sử dụng:** Chủ nhà, nhân viên quản lý, người thuê (nếu hệ thống hỗ trợ tài khoản người thuê).

---

# 1. MỤC ĐÍCH MODULE

Module Maintenance dùng để quản lý toàn bộ hoạt động sửa chữa, bảo trì cơ sở vật chất trong nhà trọ.

Các chức năng chính:

- Người thuê gửi yêu cầu sửa chữa.
- Chủ nhà xem danh sách yêu cầu sửa chữa.
- Tạo yêu cầu bảo trì thủ công.
- Xem chi tiết yêu cầu sửa chữa.
- Cập nhật nội dung yêu cầu.
- Phân công nhân viên hoặc người phụ trách.
- Lên lịch sửa chữa.
- Cập nhật trạng thái xử lý.
- Ghi nhận chi phí sửa chữa.
- Quản lý bình luận và trao đổi.
- Lưu lịch sử thay đổi trạng thái.
- Đính kèm hình ảnh hoặc tài liệu nếu hệ thống hỗ trợ.
- Hủy yêu cầu sửa chữa.
- Thống kê tình trạng bảo trì.
- Gửi thông báo khi trạng thái yêu cầu thay đổi.

**Lưu ý:** Đây là thiết kế API đề xuất cho dự án. Cần đối chiếu với ERD và cấu trúc code thực tế trước khi triển khai.

---

# 2. QUY ƯỚC CHUNG

## 2.1. Định dạng dữ liệu

- Request và Response sử dụng JSON.
- Ngày giờ sử dụng ISO 8601.
- ID sử dụng UUID hoặc kiểu ID thống nhất trong Database.
- Tiền tệ sử dụng VND.
- API yêu cầu xác thực bằng Access Token.

## 2.2. Các trạng thái yêu cầu sửa chữa

| Trạng thái | Ý nghĩa |
|---|---|
| NEW | Yêu cầu mới |
| CONFIRMED | Đã xác nhận |
| SCHEDULED | Đã lên lịch |
| IN_PROGRESS | Đang sửa chữa |
| WAITING_FOR_PARTS | Đang chờ linh kiện |
| COMPLETED | Đã hoàn thành |
| CANCELLED | Đã hủy |
| REJECTED | Từ chối yêu cầu |

## 2.3. Mức độ ưu tiên

| Mức độ | Ý nghĩa |
|---|---|
| LOW | Thấp |
| MEDIUM | Bình thường |
| HIGH | Cao |
| URGENT | Khẩn cấp |

## 2.4. Loại yêu cầu sửa chữa

| Loại | Ý nghĩa |
|---|---|
| ELECTRICITY | Điện |
| WATER | Nước |
| INTERNET | Internet |
| FURNITURE | Nội thất |
| AIR_CONDITIONER | Máy lạnh |
| STRUCTURE | Cơ sở vật chất |
| CLEANING | Vệ sinh |
| OTHER | Khác |

---

# 3. DANH SÁCH API

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/maintenance` | Danh sách yêu cầu |
| 2 | GET | `/maintenance/{id}` | Chi tiết yêu cầu |
| 3 | POST | `/maintenance` | Tạo yêu cầu |
| 4 | PUT | `/maintenance/{id}` | Cập nhật yêu cầu |
| 5 | DELETE | `/maintenance/{id}` | Xóa yêu cầu theo chính sách |
| 6 | PATCH | `/maintenance/{id}/status` | Cập nhật trạng thái |
| 7 | PATCH | `/maintenance/{id}/priority` | Cập nhật ưu tiên |
| 8 | PATCH | `/maintenance/{id}/assign` | Phân công người xử lý |
| 9 | PATCH | `/maintenance/{id}/schedule` | Lên lịch sửa chữa |
| 10 | PATCH | `/maintenance/{id}/complete` | Hoàn thành sửa chữa |
| 11 | PATCH | `/maintenance/{id}/cancel` | Hủy yêu cầu |
| 12 | POST | `/maintenance/{id}/comments` | Thêm bình luận |
| 13 | GET | `/maintenance/{id}/comments` | Danh sách bình luận |
| 14 | POST | `/maintenance/{id}/attachments` | Thêm tệp đính kèm |
| 15 | GET | `/maintenance/{id}/attachments` | Danh sách tệp |
| 16 | DELETE | `/maintenance/{id}/attachments/{attachmentId}` | Xóa tệp |
| 17 | GET | `/maintenance/{id}/history` | Lịch sử xử lý |
| 18 | GET | `/maintenance/statistics` | Thống kê bảo trì |
| 19 | GET | `/maintenance/my-requests` | Yêu cầu của người dùng hiện tại |

---

# 4. CHI TIẾT REQUEST / RESPONSE

## API 01: Danh sách yêu cầu sửa chữa

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance`

**Mục đích:** Lấy danh sách yêu cầu sửa chữa và bảo trì.

### Query Parameters

| Tham số | Kiểu dữ liệu | Bắt buộc | Mô tả |
|---|---|---|---|
| page | integer | Không | Trang hiện tại |
| limit | integer | Không | Số bản ghi mỗi trang |
| roomId | UUID | Không | Lọc theo phòng |
| status | string | Không | Lọc trạng thái |
| priority | string | Không | Lọc mức độ ưu tiên |
| category | string | Không | Lọc loại sửa chữa |
| assignedTo | UUID | Không | Người được phân công |
| fromDate | date | Không | Ngày bắt đầu |
| toDate | date | Không | Ngày kết thúc |
| keyword | string | Không | Tìm theo tiêu đề hoặc mô tả |
| sortBy | string | Không | Trường sắp xếp |
| sortOrder | string | Không | ASC hoặc DESC |

### Request

```http
GET /api/v1/maintenance?page=1&limit=10&status=NEW
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách yêu cầu thành công",
  "data": [
    {
      "id": "maintenance-001",
      "code": "MT-0001",
      "title": "Sửa chữa vòi nước",
      "description": "Vòi nước trong phòng bị rò rỉ",
      "room": {
        "id": "room-001",
        "roomNumber": "P101"
      },
      "category": "WATER",
      "priority": "HIGH",
      "status": "NEW",
      "requestedBy": {
        "id": "user-001",
        "name": "Nguyen Van A"
      },
      "assignedTo": null,
      "createdAt": "2026-11-02T08:30:00Z"
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

## API 02: Chi tiết yêu cầu sửa chữa

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/{id}`

### Request

```http
GET /api/v1/maintenance/maintenance-001
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy chi tiết yêu cầu thành công",
  "data": {
    "id": "maintenance-001",
    "code": "MT-0001",
    "title": "Sửa chữa vòi nước",
    "description": "Vòi nước trong phòng bị rò rỉ",
    "room": {
      "id": "room-001",
      "roomNumber": "P101"
    },
    "contractId": "contract-001",
    "category": "WATER",
    "priority": "HIGH",
    "status": "CONFIRMED",
    "requestedBy": {
      "id": "user-001",
      "name": "Nguyen Van A"
    },
    "assignedTo": {
      "id": "user-002",
      "name": "Tran Van B"
    },
    "scheduledAt": "2026-11-03T09:00:00Z",
    "completedAt": null,
    "estimatedCost": 200000,
    "actualCost": null,
    "createdAt": "2026-11-02T08:30:00Z",
    "updatedAt": "2026-11-02T10:00:00Z"
  }
}
```

---

## API 03: Tạo yêu cầu sửa chữa

**Method:** `POST`

**Endpoint:** `/api/v1/maintenance`

**Mục đích:** Tạo yêu cầu sửa chữa mới.

### Request

```json
{
  "roomId": "room-001",
  "contractId": "contract-001",
  "title": "Sửa chữa vòi nước",
  "description": "Vòi nước trong phòng bị rò rỉ",
  "category": "WATER",
  "priority": "HIGH",
  "estimatedCost": 200000
}
```

### Response – 201 Created

```json
{
  "success": true,
  "message": "Tạo yêu cầu sửa chữa thành công",
  "data": {
    "id": "maintenance-001",
    "code": "MT-0001",
    "roomId": "room-001",
    "title": "Sửa chữa vòi nước",
    "category": "WATER",
    "priority": "HIGH",
    "status": "NEW",
    "requestedBy": "user-001",
    "createdAt": "2026-11-02T08:30:00Z"
  }
}
```

**Quy tắc:**

- `roomId` phải tồn tại và thuộc quyền quản lý của chủ nhà.
- Người thuê chỉ được tạo yêu cầu cho phòng thuộc hợp đồng đang có hiệu lực của mình.
- `title` không được để trống.
- `description` phải có nội dung hợp lệ.
- `estimatedCost` không được âm.
- `status` mặc định là `NEW`.
- Người tạo được xác định từ Access Token, không nhận `requestedBy` tùy ý từ Client.

---

## API 04: Cập nhật yêu cầu sửa chữa

**Method:** `PUT`

**Endpoint:** `/api/v1/maintenance/{id}`

### Request

```json
{
  "title": "Sửa chữa vòi nước phòng P101",
  "description": "Vòi nước bị rò rỉ tại vị trí nối",
  "category": "WATER",
  "priority": "HIGH",
  "estimatedCost": 250000
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật yêu cầu thành công",
  "data": {
    "id": "maintenance-001",
    "title": "Sửa chữa vòi nước phòng P101",
    "description": "Vòi nước bị rò rỉ tại vị trí nối",
    "category": "WATER",
    "priority": "HIGH",
    "estimatedCost": 250000,
    "updatedAt": "2026-11-02T11:00:00Z"
  }
}
```

**Quy tắc:**

- Chỉ người có quyền quản lý mới được cập nhật các trường quản trị.
- Không cho sửa tùy tiện yêu cầu đã hoàn thành hoặc đã hủy.
- Không được thay đổi người tạo hoặc thời điểm tạo.
- Nếu chỉ cập nhật một vài trường, có thể thiết kế thêm `PATCH` thay cho `PUT`.

---

## API 05: Xóa yêu cầu sửa chữa

**Method:** `DELETE`

**Endpoint:** `/api/v1/maintenance/{id}`

### Request

```http
DELETE /api/v1/maintenance/maintenance-001
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Xóa yêu cầu thành công",
  "data": {
    "id": "maintenance-001",
    "deleted": true
  }
}
```

**Quy tắc:**

- Chỉ chủ nhà hoặc người có quyền quản lý mới được xóa.
- Không xóa yêu cầu đã phát sinh chi phí hoặc đã hoàn thành theo chính sách lưu trữ.
- Ưu tiên xóa mềm (`deletedAt`) để giữ lịch sử.
- Không xóa cứng dữ liệu đang được tham chiếu bởi hóa đơn hoặc báo cáo.

---

## API 06: Cập nhật trạng thái

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/status`

### Request

```json
{
  "status": "IN_PROGRESS",
  "note": "Đã bắt đầu kiểm tra và sửa chữa"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật trạng thái thành công",
  "data": {
    "id": "maintenance-001",
    "oldStatus": "SCHEDULED",
    "newStatus": "IN_PROGRESS",
    "updatedAt": "2026-11-03T09:15:00Z"
  }
}
```

**Quy tắc chuyển trạng thái đề xuất:**

| Trạng thái hiện tại | Trạng thái tiếp theo hợp lệ |
|---|---|
| NEW | CONFIRMED, REJECTED, CANCELLED |
| CONFIRMED | SCHEDULED, IN_PROGRESS, CANCELLED |
| SCHEDULED | IN_PROGRESS, CANCELLED |
| IN_PROGRESS | WAITING_FOR_PARTS, COMPLETED, CANCELLED |
| WAITING_FOR_PARTS | IN_PROGRESS, CANCELLED |
| COMPLETED | Không chuyển trạng thái thông thường |
| CANCELLED | Không chuyển trạng thái thông thường |
| REJECTED | Không chuyển trạng thái thông thường |

Mọi lần thay đổi trạng thái phải được ghi vào bảng lịch sử.

---

## API 07: Cập nhật mức độ ưu tiên

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/priority`

### Request

```json
{
  "priority": "URGENT",
  "reason": "Sự cố ảnh hưởng đến việc sử dụng nước"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Cập nhật mức độ ưu tiên thành công",
  "data": {
    "id": "maintenance-001",
    "priority": "URGENT"
  }
}
```

**Quy tắc:** Chỉ chủ nhà hoặc người được phân quyền mới được thay đổi mức độ ưu tiên.

---

## API 08: Phân công người xử lý

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/assign`

### Request

```json
{
  "assignedTo": "user-002",
  "note": "Phân công kiểm tra và sửa vòi nước"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Phân công thành công",
  "data": {
    "id": "maintenance-001",
    "assignedTo": {
      "id": "user-002",
      "name": "Tran Van B"
    },
    "assignedAt": "2026-11-02T12:00:00Z"
  }
}
```

**Quy tắc:**

- Người được phân công phải tồn tại và thuộc phạm vi quản lý.
- Không cho phân công cho tài khoản bị khóa.
- Ghi nhận người phân công và thời điểm phân công.
- Gửi thông báo cho người được phân công nếu hệ thống đã tích hợp Module Notification.

---

## API 09: Lên lịch sửa chữa

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/schedule`

### Request

```json
{
  "scheduledAt": "2026-11-03T09:00:00Z",
  "scheduledEndAt": "2026-11-03T11:00:00Z",
  "note": "Kiểm tra và thay vòi nước"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lên lịch sửa chữa thành công",
  "data": {
    "id": "maintenance-001",
    "scheduledAt": "2026-11-03T09:00:00Z",
    "scheduledEndAt": "2026-11-03T11:00:00Z",
    "status": "SCHEDULED"
  }
}
```

**Quy tắc:**

- Thời gian kết thúc phải sau thời gian bắt đầu.
- Không nhận lịch đã qua nếu không có quyền nhập lịch sử.
- Cần thông báo cho người thuê về thời gian dự kiến nếu có tích hợp Notification.
- Nếu thay đổi lịch, cần lưu lại lịch sử thay đổi.

---

## API 10: Hoàn thành sửa chữa

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/complete`

### Request

```json
{
  "completionNote": "Đã thay vòi nước mới và kiểm tra hoạt động bình thường",
  "actualCost": 250000,
  "completedAt": "2026-11-03T10:30:00Z"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Hoàn thành yêu cầu sửa chữa",
  "data": {
    "id": "maintenance-001",
    "status": "COMPLETED",
    "actualCost": 250000,
    "completedAt": "2026-11-03T10:30:00Z"
  }
}
```

**Quy tắc:**

- Chỉ yêu cầu đang xử lý hoặc chờ linh kiện mới được hoàn thành.
- Chi phí thực tế không được âm.
- Lưu người xác nhận hoàn thành.
- Lưu thời gian hoàn thành.
- Không tự động cộng chi phí sửa chữa vào hóa đơn tiền phòng nếu chưa có quy tắc nghiệp vụ và sự chấp thuận phù hợp.
- Nếu cần tính vào chi phí chủ nhà, lưu riêng trong dữ liệu chi phí.

---

## API 11: Hủy yêu cầu sửa chữa

**Method:** `PATCH`

**Endpoint:** `/api/v1/maintenance/{id}/cancel`

### Request

```json
{
  "reason": "Người thuê không còn nhu cầu sửa chữa"
}
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Hủy yêu cầu thành công",
  "data": {
    "id": "maintenance-001",
    "status": "CANCELLED",
    "cancelReason": "Người thuê không còn nhu cầu sửa chữa"
  }
}
```

**Quy tắc:**

- Phải có lý do hủy.
- Chỉ người có quyền mới được hủy.
- Nếu đã phát sinh chi phí, phải xử lý theo quy trình nghiệp vụ trước khi hủy.
- Lưu người hủy và thời gian hủy.

---

## API 12: Thêm bình luận

**Method:** `POST`

**Endpoint:** `/api/v1/maintenance/{id}/comments`

### Request

```json
{
  "content": "Tôi sẽ đến kiểm tra vào sáng mai"
}
```

### Response – 201 Created

```json
{
  "success": true,
  "message": "Thêm bình luận thành công",
  "data": {
    "id": "comment-001",
    "maintenanceId": "maintenance-001",
    "content": "Tôi sẽ đến kiểm tra vào sáng mai",
    "createdBy": {
      "id": "user-002",
      "name": "Tran Van B"
    },
    "createdAt": "2026-11-02T13:00:00Z"
  }
}
```

**Quy tắc:**

- Nội dung bình luận không được để trống.
- Người bình luận phải có quyền xem yêu cầu.
- Không cho phép sửa bình luận của người khác nếu không có quyền.
- Có thể dùng xóa mềm khi cần kiểm duyệt nội dung.

---

## API 13: Danh sách bình luận

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/{id}/comments`

### Request

```http
GET /api/v1/maintenance/maintenance-001/comments?page=1&limit=10
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách bình luận thành công",
  "data": [
    {
      "id": "comment-001",
      "content": "Tôi sẽ đến kiểm tra vào sáng mai",
      "createdBy": "Tran Van B",
      "createdAt": "2026-11-02T13:00:00Z"
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

## API 14: Thêm tệp đính kèm

**Method:** `POST`

**Endpoint:** `/api/v1/maintenance/{id}/attachments`

**Content-Type:** `multipart/form-data`

### Request

| Field | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| file | File | Có | Hình ảnh hoặc tài liệu |
| description | String | Không | Mô tả tệp |

### Response – 201 Created

```json
{
  "success": true,
  "message": "Tải tệp lên thành công",
  "data": {
    "id": "attachment-001",
    "maintenanceId": "maintenance-001",
    "fileName": "voinuoc.jpg",
    "fileUrl": "/uploads/maintenance/voinuoc.jpg",
    "uploadedBy": "user-001",
    "createdAt": "2026-11-02T13:30:00Z"
  }
}
```

**Quy tắc bảo mật:**

- Chỉ cho phép định dạng tệp được hệ thống hỗ trợ.
- Giới hạn dung lượng tệp.
- Kiểm tra loại tệp thực tế, không chỉ dựa vào phần mở rộng.
- Không cho truy cập tệp của yêu cầu ngoài phạm vi quyền.
- Lưu tệp bằng dịch vụ lưu trữ phù hợp, không tin tưởng đường dẫn do Client tự gửi.

---

## API 15: Danh sách tệp đính kèm

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/{id}/attachments`

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách tệp thành công",
  "data": [
    {
      "id": "attachment-001",
      "fileName": "voinuoc.jpg",
      "fileUrl": "/uploads/maintenance/voinuoc.jpg",
      "description": "Hình ảnh vòi nước bị rò rỉ",
      "uploadedBy": "user-001",
      "createdAt": "2026-11-02T13:30:00Z"
    }
  ]
}
```

---

## API 16: Xóa tệp đính kèm

**Method:** `DELETE`

**Endpoint:** `/api/v1/maintenance/{id}/attachments/{attachmentId}`

### Response – 200 OK

```json
{
  "success": true,
  "message": "Xóa tệp đính kèm thành công",
  "data": {
    "id": "attachment-001",
    "deleted": true
  }
}
```

**Quy tắc:** Chỉ người có quyền quản lý hoặc người tải lên (theo chính sách) mới được xóa tệp.

---

## API 17: Lịch sử xử lý

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/{id}/history`

### Request

```http
GET /api/v1/maintenance/maintenance-001/history
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy lịch sử xử lý thành công",
  "data": [
    {
      "id": "history-001",
      "oldStatus": null,
      "newStatus": "NEW",
      "note": "Tạo yêu cầu sửa chữa",
      "changedBy": "user-001",
      "createdAt": "2026-11-02T08:30:00Z"
    },
    {
      "id": "history-002",
      "oldStatus": "NEW",
      "newStatus": "CONFIRMED",
      "note": "Chủ nhà xác nhận yêu cầu",
      "changedBy": "owner-001",
      "createdAt": "2026-11-02T10:00:00Z"
    }
  ]
}
```

**Quy tắc:** Lịch sử phải được lưu tự động khi có thay đổi trạng thái. Người dùng thông thường không được chỉnh sửa hoặc xóa lịch sử.

---

## API 18: Thống kê sửa chữa

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/statistics`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| roomId | UUID | Lọc theo phòng |
| category | string | Lọc theo loại sửa chữa |

### Request

```http
GET /api/v1/maintenance/statistics?fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Thống kê bảo trì thành công",
  "data": {
    "totalRequests": 20,
    "newRequests": 3,
    "inProgressRequests": 5,
    "completedRequests": 10,
    "cancelledRequests": 2,
    "totalEstimatedCost": 5000000,
    "totalActualCost": 4200000,
    "averageCompletionHours": 24.5,
    "categoryStatistics": [
      {
        "category": "WATER",
        "count": 8
      },
      {
        "category": "ELECTRICITY",
        "count": 5
      },
      {
        "category": "FURNITURE",
        "count": 7
      }
    ]
  }
}
```

**Quy tắc:** Chỉ thống kê dữ liệu thuộc phạm vi nhà trọ mà tài khoản được phép quản lý.

---

## API 19: Yêu cầu sửa chữa của tôi

**Method:** `GET`

**Endpoint:** `/api/v1/maintenance/my-requests`

**Mục đích:** Người thuê xem những yêu cầu do chính mình tạo.

### Request

```http
GET /api/v1/maintenance/my-requests?page=1&limit=10
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy yêu cầu của tôi thành công",
  "data": [
    {
      "id": "maintenance-001",
      "code": "MT-0001",
      "title": "Sửa chữa vòi nước",
      "roomNumber": "P101",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "createdAt": "2026-11-02T08:30:00Z"
    }
  ]
}
```

**Quy tắc:** Người thuê chỉ được xem yêu cầu của chính mình hoặc các yêu cầu thuộc phạm vi hợp đồng được cấp quyền.

---

# 5. DATABASE DESIGN

## 5.1. Bảng `Maintenance_Requests`

Lưu thông tin chính của yêu cầu sửa chữa.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| code | VARCHAR(50) | Mã yêu cầu |
| room_id | UUID / BIGINT | Phòng cần sửa |
| contract_id | UUID / BIGINT | Hợp đồng liên quan, có thể NULL |
| requested_by | UUID / BIGINT | Người tạo |
| assigned_to | UUID / BIGINT | Người xử lý, có thể NULL |
| title | VARCHAR(255) | Tiêu đề |
| description | TEXT | Mô tả |
| category | VARCHAR(50) | Loại sửa chữa |
| priority | VARCHAR(20) | Mức độ ưu tiên |
| status | VARCHAR(30) | Trạng thái |
| estimated_cost | DECIMAL(15,2) | Chi phí dự kiến |
| actual_cost | DECIMAL(15,2) | Chi phí thực tế |
| scheduled_at | DATETIME | Thời gian bắt đầu dự kiến |
| scheduled_end_at | DATETIME | Thời gian kết thúc dự kiến |
| completed_at | DATETIME | Thời gian hoàn thành |
| completion_note | TEXT | Ghi chú hoàn thành |
| cancel_reason | TEXT | Lý do hủy |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| deleted_at | DATETIME | Ngày xóa mềm |

## 5.2. Bảng `Maintenance_History`

Lưu lịch sử thay đổi trạng thái và quá trình xử lý.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| maintenance_id | UUID / BIGINT | Yêu cầu sửa chữa |
| old_status | VARCHAR(30) | Trạng thái cũ |
| new_status | VARCHAR(30) | Trạng thái mới |
| note | TEXT | Nội dung thay đổi |
| changed_by | UUID / BIGINT | Người thực hiện |
| created_at | DATETIME | Thời điểm thay đổi |

## 5.3. Bảng `Maintenance_Comments`

Lưu nội dung trao đổi.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| maintenance_id | UUID / BIGINT | Yêu cầu sửa chữa |
| user_id | UUID / BIGINT | Người bình luận |
| content | TEXT | Nội dung |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |
| deleted_at | DATETIME | Xóa mềm |

## 5.4. Bảng `Maintenance_Attachments`

Lưu thông tin tệp đính kèm.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| maintenance_id | UUID / BIGINT | Yêu cầu sửa chữa |
| uploaded_by | UUID / BIGINT | Người tải lên |
| file_name | VARCHAR(255) | Tên tệp |
| file_path | TEXT | Đường dẫn lưu trữ |
| file_type | VARCHAR(100) | Loại tệp |
| file_size | BIGINT | Dung lượng |
| description | TEXT | Mô tả |
| created_at | DATETIME | Ngày tải lên |
| deleted_at | DATETIME | Xóa mềm |

## 5.5. Bảng `Maintenance_Assignments`

Lưu lịch sử phân công người xử lý.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| maintenance_id | UUID / BIGINT | Yêu cầu sửa chữa |
| assigned_to | UUID / BIGINT | Người được giao |
| assigned_by | UUID / BIGINT | Người phân công |
| note | TEXT | Ghi chú |
| assigned_at | DATETIME | Thời điểm phân công |
| ended_at | DATETIME | Thời điểm kết thúc phân công |

## 5.6. Quan hệ giữa các bảng

```text
Rooms
  |
  | 1 - N
  |
Maintenance_Requests
  |
  |------ N - 1 ------ Users (requested_by)
  |
  |------ N - 1 ------ Users (assigned_to)
  |
  |------ 1 - N ------ Maintenance_History
  |
  |------ 1 - N ------ Maintenance_Comments
  |
  |------ 1 - N ------ Maintenance_Attachments
  |
  |------ 1 - N ------ Maintenance_Assignments
  |
  |------ N - 1 ------ Contracts (contract_id)
```

**Giải thích:**

- Một phòng có thể có nhiều yêu cầu sửa chữa.
- Một yêu cầu thuộc về một phòng.
- Một người có thể tạo nhiều yêu cầu.
- Một yêu cầu có thể có nhiều bình luận.
- Một yêu cầu có thể có nhiều tệp đính kèm.
- Một yêu cầu có thể có nhiều lần phân công.
- Một yêu cầu có nhiều bản ghi lịch sử xử lý.

---

# 6. VALIDATION – KIỂM TRA DỮ LIỆU

| Trường | Điều kiện |
|---|---|
| roomId | Bắt buộc khi tạo yêu cầu |
| title | Không được rỗng |
| description | Không được rỗng |
| category | Phải thuộc danh sách hợp lệ |
| priority | LOW, MEDIUM, HIGH, URGENT |
| status | Phải thuộc danh sách trạng thái |
| estimatedCost | Không được âm |
| actualCost | Không được âm |
| scheduledAt | Phải là ngày giờ hợp lệ |
| scheduledEndAt | Phải sau scheduledAt |
| assignedTo | Phải là tài khoản hợp lệ và có quyền |
| comment.content | Không được rỗng |
| attachment.file | Phải đáp ứng quy định loại và dung lượng tệp |

---

# 7. PHÂN QUYỀN

| Chức năng | Chủ nhà | Nhân viên | Người thuê |
|---|---|---|---|
| Xem tất cả yêu cầu trong phạm vi quản lý | Có | Theo quyền | Không |
| Tạo yêu cầu | Có | Theo quyền | Có, trong phạm vi phòng thuê |
| Xem chi tiết | Có | Theo quyền | Yêu cầu được cấp quyền |
| Cập nhật nội dung | Có | Theo quyền | Chỉ yêu cầu của mình, theo chính sách |
| Phân công | Có | Theo quyền | Không |
| Cập nhật trạng thái | Có | Theo quyền | Không |
| Lên lịch | Có | Theo quyền | Không |
| Hoàn thành | Có | Theo quyền | Không |
| Hủy yêu cầu | Có | Theo quyền | Chỉ yêu cầu của mình, theo chính sách |
| Bình luận | Có | Có | Có quyền |
| Xem thống kê | Có | Theo quyền | Không |
| Xem lịch sử | Có | Theo quyền | Lịch sử được phép xem |

**Lưu ý:** Phân quyền phải được kiểm tra ở Backend. Không chỉ ẩn nút trên giao diện để bảo vệ API.

---

# 8. QUY TRÌNH NGHIỆP VỤ

## 8.1. Người thuê gửi yêu cầu

1. Người thuê đăng nhập.
2. Chọn phòng đang thuê.
3. Nhập tiêu đề sự cố.
4. Nhập mô tả.
5. Chọn loại sự cố.
6. Chọn mức độ ưu tiên.
7. Gửi yêu cầu.
8. Backend kiểm tra hợp đồng và quyền truy cập.
9. Backend tạo yêu cầu với trạng thái `NEW`.
10. Hệ thống ghi lịch sử.
11. Hệ thống gửi thông báo cho chủ nhà nếu Notification đã được tích hợp.

## 8.2. Chủ nhà xử lý yêu cầu

1. Chủ nhà đăng nhập.
2. Xem danh sách yêu cầu mới.
3. Chọn một yêu cầu.
4. Xem chi tiết phòng và nội dung.
5. Xác nhận yêu cầu.
6. Phân công người xử lý.
7. Lên lịch sửa chữa.
8. Cập nhật trạng thái `IN_PROGRESS`.
9. Ghi nhận chi phí thực tế.
10. Xác nhận hoàn thành.
11. Hệ thống cập nhật `COMPLETED`.
12. Lưu lịch sử.
13. Gửi thông báo kết quả cho người thuê.

## 8.3. Sơ đồ trạng thái

```text
             +------> REJECTED
             |
NEW ---------+------> CONFIRMED
             |            |
             |            v
             |        SCHEDULED
             |            |
             |            v
             |        IN_PROGRESS
             |          /     \
             |         v       v
             |  WAITING_FOR   COMPLETED
             |     _PARTS
             |         |
             |         v
             |    IN_PROGRESS
             |
             +------> CANCELLED
```

Sơ đồ trên là luồng đề xuất; Backend phải kiểm tra trạng thái hiện tại trước khi chấp nhận chuyển đổi.

---

# 9. TÍCH HỢP VỚI MODULE KHÁC

## 9.1. Module 3 – Room Management

- Maintenance sử dụng `room_id` để xác định phòng xảy ra sự cố.
- Khi xem chi tiết yêu cầu, có thể lấy số phòng và trạng thái phòng.
- Không tự ý thay đổi trạng thái phòng chỉ vì có yêu cầu sửa chữa.

## 9.2. Module 4 – Tenant & Contract

- Xác định người thuê có quyền gửi yêu cầu hay không.
- Kiểm tra hợp đồng và phòng đang thuê.
- Lưu `contract_id` nếu yêu cầu liên quan đến hợp đồng cụ thể.

## 9.3. Module 5 – Rental Services & Billing

- Có thể ghi nhận chi phí sửa chữa để chủ nhà theo dõi.
- Nếu cần đưa chi phí vào hóa đơn, phải có quy tắc tính tiền rõ ràng và được phê duyệt.
- Không tự động cộng mọi chi phí sửa chữa vào tiền thuê của người thuê.

## 9.4. Module 6 – Notification

Các sự kiện có thể gửi thông báo:

| Sự kiện | Người nhận |
|---|---|
| Có yêu cầu mới | Chủ nhà |
| Yêu cầu được xác nhận | Người thuê |
| Có người được phân công | Người xử lý |
| Lịch sửa chữa thay đổi | Người thuê và người xử lý |
| Bắt đầu sửa chữa | Người thuê |
| Chờ linh kiện | Người thuê |
| Hoàn thành | Người thuê |
| Yêu cầu bị hủy | Những người liên quan |

Notification chỉ được gửi sau khi thao tác nghiệp vụ chính được lưu thành công. Lỗi gửi thông báo không được làm mất yêu cầu sửa chữa.

---

# 10. ERROR RESPONSE

## 400 – Bad Request

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": [
    {
      "field": "title",
      "message": "Tiêu đề không được để trống"
    }
  ]
}
```

## 401 – Unauthorized

```json
{
  "success": false,
  "message": "Bạn chưa đăng nhập hoặc Token không hợp lệ"
}
```

## 403 – Forbidden

```json
{
  "success": false,
  "message": "Bạn không có quyền thực hiện thao tác này"
}
```

## 404 – Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy yêu cầu sửa chữa"
}
```

## 409 – Conflict

```json
{
  "success": false,
  "message": "Không thể chuyển trạng thái từ COMPLETED sang IN_PROGRESS"
}
```

## 413 – Payload Too Large

```json
{
  "success": false,
  "message": "Tệp tải lên vượt quá dung lượng cho phép"
}
```

## 500 – Internal Server Error

```json
{
  "success": false,
  "message": "Đã xảy ra lỗi hệ thống"
}
```

---

# 11. TEST CASE

| STT | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| 1 | Tạo yêu cầu hợp lệ | Đủ dữ liệu | Tạo thành công |
| 2 | Thiếu tiêu đề | title rỗng | Báo lỗi 400 |
| 3 | Phòng không tồn tại | roomId sai | Báo lỗi 404 |
| 4 | Người thuê không thuộc phòng | roomId ngoài hợp đồng | Báo lỗi 403 |
| 5 | Chi phí âm | estimatedCost = -100 | Báo lỗi 400 |
| 6 | Xem yêu cầu tồn tại | ID hợp lệ | Trả về chi tiết |
| 7 | Xem yêu cầu không tồn tại | ID sai | Báo lỗi 404 |
| 8 | Phân công hợp lệ | assignedTo hợp lệ | Phân công thành công |
| 9 | Phân công tài khoản không hợp lệ | assignedTo sai | Báo lỗi |
| 10 | Lên lịch hợp lệ | Ngày giờ đúng | Lên lịch thành công |
| 11 | Ngày kết thúc trước ngày bắt đầu | scheduledEndAt nhỏ hơn scheduledAt | Báo lỗi 400 |
| 12 | Chuyển NEW sang CONFIRMED | Trạng thái hợp lệ | Thành công |
| 13 | Chuyển COMPLETED sang IN_PROGRESS | Trạng thái không hợp lệ | Báo lỗi 409 |
| 14 | Hoàn thành yêu cầu | actualCost hợp lệ | Cập nhật COMPLETED |
| 15 | Hủy yêu cầu | Có lý do | Cập nhật CANCELLED |
| 16 | Bình luận hợp lệ | content có nội dung | Thêm thành công |
| 17 | Bình luận rỗng | content rỗng | Báo lỗi 400 |
| 18 | Tải tệp hợp lệ | Tệp được phép | Tải lên thành công |
| 19 | Tải tệp không hợp lệ | Tệp không được hỗ trợ | Báo lỗi |
| 20 | Xem thống kê | Khoảng ngày hợp lệ | Trả về số liệu |
| 21 | Người thuê xem yêu cầu người khác | ID ngoài phạm vi | Báo lỗi 403 hoặc 404 theo chính sách |
| 22 | Gửi yêu cầu mới | Dữ liệu hợp lệ | Tạo yêu cầu và ghi lịch sử |

---

# 12. QUY TẮC DATABASE VÀ TÍNH TOÀN VẸN

1. Mỗi yêu cầu phải có một phòng hợp lệ.
2. Mỗi yêu cầu phải có người tạo hợp lệ.
3. `room_id`, `requested_by`, `assigned_to`, `contract_id` phải có khóa ngoại phù hợp.
4. `estimated_cost` và `actual_cost` không được âm.
5. `scheduled_end_at` phải lớn hơn `scheduled_at` khi cả hai được nhập.
6. Mã yêu cầu phải duy nhất trong phạm vi hệ thống hoặc chủ nhà.
7. Không cho phép chuyển trạng thái tùy ý.
8. Lưu lịch sử khi thay đổi trạng thái.
9. Xóa mềm đối với dữ liệu cần lưu lịch sử.
10. Dùng transaction khi cập nhật yêu cầu và ghi lịch sử để tránh dữ liệu không đồng bộ.
11. Phân trang danh sách để tránh truy vấn quá nhiều dữ liệu.
12. Tạo index cho các trường thường lọc: `room_id`, `status`, `priority`, `created_at`, `assigned_to`.
13. Kiểm tra quyền truy cập theo chủ nhà và phòng thuê ở Backend.
14. Không cho Client tự gửi các trường nhạy cảm như `requested_by`, `created_at`, `completed_by` để ghi đè dữ liệu.

---

# 13. BẢO MẬT VÀ HIỆU NĂNG

- Xác thực Access Token cho API cần đăng nhập.
- Kiểm tra quyền trên từng yêu cầu sửa chữa.
- Giới hạn số lần gửi yêu cầu trong khoảng thời gian phù hợp để tránh spam.
- Kiểm tra và làm sạch nội dung bình luận.
- Kiểm tra tệp tải lên.
- Không công khai đường dẫn lưu trữ nội bộ.
- Không trả về thông tin cá nhân không cần thiết.
- Dùng phân trang cho danh sách và bình luận.
- Có thể cache số liệu thống kê nếu dữ liệu lớn.
- Ghi log thao tác quản trị quan trọng.
- Có thể sử dụng optimistic locking hoặc trường `version` để tránh hai người cập nhật đè dữ liệu của nhau.

---

# 14. ACCEPTANCE CRITERIA – TIÊU CHÍ NGHIỆM THU

Module Maintenance được xem là đáp ứng yêu cầu cơ bản khi:

- [ ] Chủ nhà xem được danh sách yêu cầu sửa chữa.
- [ ] Chủ nhà xem được chi tiết từng yêu cầu.
- [ ] Người thuê gửi được yêu cầu trong phạm vi phòng đang thuê.
- [ ] Chủ nhà tạo được yêu cầu thủ công.
- [ ] Chủ nhà cập nhật được thông tin yêu cầu.
- [ ] Chủ nhà phân công được người xử lý.
- [ ] Chủ nhà lên lịch sửa chữa được.
- [ ] Hệ thống kiểm soát chuyển trạng thái hợp lệ.
- [ ] Có thể ghi nhận chi phí sửa chữa.
- [ ] Có thể hoàn thành hoặc hủy yêu cầu.
- [ ] Có thể trao đổi bằng bình luận.
- [ ] Có thể lưu tệp đính kèm nếu đã triển khai chức năng upload.
- [ ] Hệ thống lưu lịch sử xử lý.
- [ ] Có thống kê yêu cầu sửa chữa.
- [ ] Phân quyền đúng giữa chủ nhà, nhân viên và người thuê.
- [ ] Có thể tích hợp thông báo với Module 6.

---

# 15. THỨ TỰ TRIỂN KHAI ĐỀ XUẤT

**Giai đoạn 1 – Chức năng cốt lõi**

1. Tạo bảng `Maintenance_Requests`.
2. Tạo API tạo yêu cầu.
3. Tạo API danh sách yêu cầu.
4. Tạo API chi tiết yêu cầu.
5. Tạo API cập nhật yêu cầu.
6. Tạo API cập nhật trạng thái.
7. Tạo bảng và API lịch sử xử lý.

**Giai đoạn 2 – Quản lý xử lý**

8. Phân công người xử lý.
9. Lên lịch sửa chữa.
10. Hoàn thành và hủy yêu cầu.
11. Ghi nhận chi phí.

**Giai đoạn 3 – Chức năng mở rộng**

12. Bình luận.
13. Tệp đính kèm.
14. Thống kê.
15. Tích hợp Notification.
16. Tối ưu Database và bảo mật.

---

# 16. KẾT LUẬN

Module Maintenance giúp chủ nhà quản lý tập trung các yêu cầu sửa chữa và bảo trì trong khu nhà trọ.

Module hỗ trợ theo dõi toàn bộ vòng đời của một yêu cầu, từ lúc người thuê báo sự cố, chủ nhà xác nhận, phân công người xử lý, lên lịch, tiến hành sửa chữa cho đến khi hoàn thành.

