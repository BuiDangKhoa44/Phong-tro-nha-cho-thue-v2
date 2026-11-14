# MODULE 6: NOTIFICATION – QUẢN LÝ THÔNG BÁO

**Phiên bản:** 1.0  
**API Prefix:** `/api/v1`  
**Phương thức xác thực:** Bearer Token (JWT)  
**Đối tượng sử dụng:** Chủ nhà, nhân viên được phân quyền và người thuê phòng (nếu hệ thống có tài khoản người thuê).

---

# 1. MỤC ĐÍCH MODULE

Module Notification chịu trách nhiệm quản lý và gửi thông báo trong hệ thống quản lý phòng trọ.

Các thông báo giúp chủ nhà, nhân viên và người thuê cập nhật kịp thời những thông tin liên quan đến hoạt động thuê phòng.

## 1.1. Chức năng chính

- Gửi thông báo đến người dùng.
- Gửi thông báo cho một người cụ thể.
- Gửi thông báo cho nhiều người.
- Gửi thông báo theo phòng hoặc hợp đồng.
- Tự động thông báo khi có hóa đơn mới.
- Nhắc nhở khi hóa đơn sắp đến hạn.
- Thông báo khi hóa đơn quá hạn.
- Thông báo khi thanh toán thành công.
- Thông báo khi hợp đồng sắp hết hạn.
- Thông báo khi hợp đồng được tạo, gia hạn hoặc chấm dứt.
- Thông báo khi có yêu cầu sửa chữa.
- Thông báo khi trạng thái sửa chữa thay đổi.
- Đánh dấu thông báo đã đọc hoặc chưa đọc.
- Xóa hoặc lưu trữ thông báo.
- Quản lý mẫu thông báo.
- Quản lý tùy chọn nhận thông báo.
- Quản lý lịch sử gửi và trạng thái gửi.
- Hỗ trợ gửi thông báo qua nhiều kênh nếu hệ thống tích hợp.

## 1.2. Các nhóm thông báo

| Nhóm | Nội dung |
|---|---|
| INVOICE | Hóa đơn mới |
| PAYMENT | Thanh toán thành công hoặc thất bại |
| DEBT | Nhắc nhở công nợ |
| CONTRACT | Hợp đồng mới, gia hạn, sắp hết hạn |
| ROOM | Thay đổi thông tin hoặc trạng thái phòng |
| UTILITY | Thông báo chỉ số điện nước |
| MAINTENANCE | Yêu cầu sửa chữa, bảo trì |
| SYSTEM | Thông báo hệ thống |
| ANNOUNCEMENT | Thông báo chung từ chủ nhà |

## 1.3. Các kênh gửi thông báo

| Kênh | Mô tả |
|---|---|
| IN_APP | Hiển thị trong ứng dụng |
| EMAIL | Gửi qua email |
| SMS | Gửi tin nhắn điện thoại |
| PUSH | Thông báo đẩy trên thiết bị |

**Lưu ý:** IN_APP có thể triển khai trước. EMAIL, SMS và PUSH cần tích hợp dịch vụ tương ứng. Không được báo gửi thành công nếu nhà cung cấp chưa xác nhận hoặc hệ thống chưa thực hiện gửi.

---

# 2. QUY ƯỚC CHUNG

## 2.1. Cấu trúc Response thành công

```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": {},
  "meta": null
}
```

## 2.2. Cấu trúc Response lỗi

```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errorCode": "INVALID_DATA",
  "errors": [
    {
      "field": "title",
      "message": "Tiêu đề không được để trống"
    }
  ]
}
```

## 2.3. Quy ước trạng thái

**Trạng thái thông báo:**

| Trạng thái | Ý nghĩa |
|---|---|
| UNREAD | Chưa đọc |
| READ | Đã đọc |
| ARCHIVED | Đã lưu trữ |

**Trạng thái gửi:**

| Trạng thái | Ý nghĩa |
|---|---|
| PENDING | Đang chờ gửi |
| PROCESSING | Đang xử lý |
| SENT | Nhà cung cấp đã chấp nhận gửi hoặc hệ thống đã gửi thành công theo kênh |
| DELIVERED | Đã được xác nhận phát đến thiết bị/người nhận nếu kênh hỗ trợ |
| FAILED | Gửi thất bại |
| CANCELLED | Đã hủy |

**Lưu ý:** `READ` và `DELIVERED` là hai trạng thái khác nhau. Một thông báo được gửi thành công không có nghĩa là người dùng đã đọc.

---

# 3. NOTIFICATION MANAGEMENT – QUẢN LÝ THÔNG BÁO

## 3.1. GET – Danh sách thông báo của người dùng

**Endpoint:** `GET /api/v1/notifications`

**Mục đích:** Lấy danh sách thông báo của tài khoản đang đăng nhập.

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| page | integer | Trang hiện tại |
| limit | integer | Số thông báo mỗi trang |
| status | string | UNREAD / READ / ARCHIVED |
| type | string | Loại thông báo |
| priority | string | LOW / NORMAL / HIGH / URGENT |
| fromDate | datetime | Ngày bắt đầu |
| toDate | datetime | Ngày kết thúc |
| sortBy | string | createdAt |
| sortOrder | string | ASC / DESC |

**Request:**

```http
GET /api/v1/notifications?page=1&limit=10&status=UNREAD
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách thông báo thành công",
  "data": [
    {
      "id": 1,
      "title": "Hóa đơn tháng 11",
      "content": "Hóa đơn tiền phòng tháng 11 đã được tạo.",
      "type": "INVOICE",
      "priority": "NORMAL",
      "status": "UNREAD",
      "createdAt": "2026-11-01T08:00:00Z",
      "readAt": null,
      "actionUrl": "/invoices/101",
      "relatedEntity": {
        "type": "INVOICE",
        "id": 101
      }
    },
    {
      "id": 2,
      "title": "Nhắc nhở thanh toán",
      "content": "Hóa đơn tháng 10 sắp đến hạn thanh toán.",
      "type": "DEBT",
      "priority": "HIGH",
      "status": "UNREAD",
      "createdAt": "2026-11-02T08:00:00Z",
      "readAt": null,
      "actionUrl": "/invoices/100",
      "relatedEntity": {
        "type": "INVOICE",
        "id": 100
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

**Quy tắc:**

- Người dùng chỉ xem được thông báo thuộc tài khoản của mình hoặc thông báo chung được phép nhận.
- Không trả về thông báo riêng tư của tài khoản khác.
- Danh sách mặc định sắp xếp thông báo mới nhất trước.

## 3.2. GET – Chi tiết thông báo

**Endpoint:** `GET /api/v1/notifications/{id}`

**Request:**

```http
GET /api/v1/notifications/1
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy chi tiết thông báo thành công",
  "data": {
    "id": 1,
    "title": "Hóa đơn tháng 11",
    "content": "Hóa đơn tiền phòng tháng 11 đã được tạo.",
    "type": "INVOICE",
    "priority": "NORMAL",
    "status": "UNREAD",
    "createdAt": "2026-11-01T08:00:00Z",
    "readAt": null,
    "actionUrl": "/invoices/101",
    "relatedEntity": {
      "type": "INVOICE",
      "id": 101
    }
  }
}
```

**Lưu ý:** API chi tiết chỉ trả về thông báo nếu người dùng có quyền truy cập thông báo đó và dữ liệu liên quan.

## 3.3. POST – Tạo thông báo thủ công

**Endpoint:** `POST /api/v1/notifications`

**Mục đích:** Chủ nhà hoặc nhân viên có quyền tạo thông báo cho người thuê.

**Request:**

```json
{
  "title": "Thông báo bảo trì hệ thống nước",
  "content": "Nhà trọ sẽ tiến hành bảo trì hệ thống nước vào ngày 05/11/2026.",
  "type": "ANNOUNCEMENT",
  "priority": "HIGH",
  "recipientType": "ROOM",
  "recipientIds": [101],
  "channels": ["IN_APP"],
  "actionUrl": null,
  "scheduledAt": null
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo thông báo thành công",
  "data": {
    "id": 10,
    "title": "Thông báo bảo trì hệ thống nước",
    "type": "ANNOUNCEMENT",
    "priority": "HIGH",
    "recipientCount": 2,
    "status": "PENDING",
    "createdAt": "2026-11-02T08:00:00Z"
  }
}
```

**Quy tắc:**

- Người tạo phải có quyền gửi thông báo.
- Tiêu đề và nội dung không được để trống.
- Phải kiểm tra người nhận thuộc nhà trọ đang quản lý.
- `recipientType` phải thuộc danh sách được hỗ trợ.
- Nếu gửi theo phòng, hệ thống xác định những tài khoản người thuê có liên quan tại thời điểm gửi.
- Nếu đặt lịch gửi, hệ thống chưa gửi ngay mà tạo lịch chờ.

## 3.4. PUT – Cập nhật thông báo

**Endpoint:** `PUT /api/v1/notifications/{id}`

**Mục đích:** Cập nhật thông báo thủ công khi chưa được gửi.

**Request:**

```json
{
  "title": "Thông báo bảo trì hệ thống nước",
  "content": "Thời gian bảo trì được đổi sang ngày 06/11/2026.",
  "priority": "HIGH"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật thông báo thành công",
  "data": {
    "id": 10,
    "title": "Thông báo bảo trì hệ thống nước",
    "status": "PENDING"
  }
}
```

**Quy tắc:**

- Chỉ người tạo hoặc người có quyền quản lý mới được sửa.
- Không sửa nội dung của thông báo đã gửi.
- Nếu cần thay đổi nội dung sau khi gửi, tạo thông báo mới hoặc thông báo đính chính.

## 3.5. DELETE – Xóa thông báo

**Endpoint:** `DELETE /api/v1/notifications/{id}`

**Request:**

```http
DELETE /api/v1/notifications/1
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Xóa thông báo thành công",
  "data": {
    "id": 1,
    "status": "ARCHIVED"
  }
}
```

**Lưu ý:** Đối với thông báo đã gửi, nên lưu trữ hoặc ẩn khỏi danh sách người dùng thay vì xóa cứng dữ liệu lịch sử. Việc ẩn thông báo của một người không được xóa thông báo của những người nhận khác.

---

# 4. NOTIFICATION RECIPIENTS – QUẢN LÝ NGƯỜI NHẬN

## 4.1. GET – Danh sách người nhận thông báo

**Endpoint:** `GET /api/v1/notifications/{id}/recipients`

**Mục đích:** Chủ nhà kiểm tra những người được gửi một thông báo.

**Request:**

```http
GET /api/v1/notifications/10/recipients?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách người nhận thành công",
  "data": [
    {
      "id": 1,
      "userId": 20,
      "fullName": "Nguyễn Văn A",
      "roomName": "P101",
      "status": "SENT",
      "readAt": null
    },
    {
      "id": 2,
      "userId": 21,
      "fullName": "Trần Văn B",
      "roomName": "P102",
      "status": "SENT",
      "readAt": null
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

## 4.2. POST – Gửi thông báo cho một người

**Endpoint:** `POST /api/v1/notifications/send-to-user`

**Request:**

```json
{
  "userId": 20,
  "title": "Nhắc nhở thanh toán",
  "content": "Bạn vui lòng thanh toán hóa đơn tháng 11 trước ngày 05/11.",
  "type": "DEBT",
  "priority": "HIGH",
  "channels": ["IN_APP"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã tạo yêu cầu gửi thông báo",
  "data": {
    "notificationId": 11,
    "recipientId": 20,
    "status": "PENDING"
  }
}
```

## 4.3. POST – Gửi thông báo cho nhiều người

**Endpoint:** `POST /api/v1/notifications/send-to-users`

**Request:**

```json
{
  "userIds": [20, 21, 22],
  "title": "Thông báo chung",
  "content": "Nhà trọ sẽ kiểm tra hệ thống điện vào ngày 07/11.",
  "type": "ANNOUNCEMENT",
  "priority": "NORMAL",
  "channels": ["IN_APP"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã tạo yêu cầu gửi thông báo",
  "data": {
    "notificationId": 12,
    "totalRecipients": 3,
    "status": "PENDING"
  }
}
```

## 4.4. POST – Gửi thông báo theo phòng

**Endpoint:** `POST /api/v1/notifications/send-to-room`

**Request:**

```json
{
  "roomId": 101,
  "title": "Thông báo kiểm tra phòng",
  "content": "Chủ nhà sẽ kiểm tra tình trạng phòng vào ngày 08/11.",
  "type": "ROOM",
  "priority": "NORMAL",
  "channels": ["IN_APP"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã tạo yêu cầu gửi thông báo theo phòng",
  "data": {
    "notificationId": 13,
    "roomId": 101,
    "recipientCount": 1,
    "status": "PENDING"
  }
}
```

**Quy tắc người nhận:**

- Chỉ lấy người thuê có hợp đồng còn hiệu lực tại thời điểm xác định người nhận.
- Không gửi thông tin riêng tư của người thuê khác.
- Nếu phòng có nhiều người thuê, cần xác định rõ gửi cho một người đại diện hay tất cả tài khoản người thuê.
- Các endpoint gửi thông báo phải kiểm tra quyền quản lý phòng.

## 4.5. POST – Gửi thông báo theo hợp đồng

**Endpoint:** `POST /api/v1/notifications/send-to-contract`

**Request:**

```json
{
  "contractId": 10,
  "title": "Thông báo hợp đồng",
  "content": "Hợp đồng thuê phòng của bạn sắp đến thời hạn kết thúc.",
  "type": "CONTRACT",
  "priority": "HIGH",
  "channels": ["IN_APP"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã tạo yêu cầu gửi thông báo theo hợp đồng",
  "data": {
    "notificationId": 14,
    "contractId": 10,
    "recipientCount": 1,
    "status": "PENDING"
  }
}
```

---

# 5. READ STATUS – TRẠNG THÁI ĐỌC THÔNG BÁO

## 5.1. PATCH – Đánh dấu đã đọc

**Endpoint:** `PATCH /api/v1/notifications/{id}/read`

**Request:**

```http
PATCH /api/v1/notifications/1/read
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Đánh dấu đã đọc thành công",
  "data": {
    "id": 1,
    "status": "READ",
    "readAt": "2026-11-02T09:00:00Z"
  }
}
```

**Quy tắc:**

- Chỉ người nhận được đánh dấu thông báo của chính mình.
- Nếu đã đọc, gọi lại API không tạo thêm dữ liệu đọc.
- Ghi thời điểm đọc lần đầu.

## 5.2. PATCH – Đánh dấu tất cả đã đọc

**Endpoint:** `PATCH /api/v1/notifications/read-all`

**Request:**

```json
{
  "type": "ALL"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã đánh dấu tất cả thông báo là đã đọc",
  "data": {
    "updatedCount": 15
  }
}
```

Có thể truyền `type` để chỉ đánh dấu đã đọc một nhóm thông báo cụ thể nếu hệ thống hỗ trợ.

## 5.3. PATCH – Đánh dấu chưa đọc

**Endpoint:** `PATCH /api/v1/notifications/{id}/unread`

**Request:**

```http
PATCH /api/v1/notifications/1/unread
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Đã đánh dấu thông báo chưa đọc",
  "data": {
    "id": 1,
    "status": "UNREAD"
  }
}
```

## 5.4. GET – Số lượng thông báo chưa đọc

**Endpoint:** `GET /api/v1/notifications/unread-count`

**Request:**

```http
GET /api/v1/notifications/unread-count
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy số thông báo chưa đọc thành công",
  "data": {
    "unreadCount": 5
  }
}
```

API này có thể được sử dụng để hiển thị số thông báo trên biểu tượng chuông ở giao diện.

---

# 6. NOTIFICATION PREFERENCES – CÀI ĐẶT NHẬN THÔNG BÁO

## 6.1. GET – Lấy cài đặt thông báo

**Endpoint:** `GET /api/v1/notification-preferences`

**Mục đích:** Người dùng xem các tùy chọn nhận thông báo của tài khoản.

**Request:**

```http
GET /api/v1/notification-preferences
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy cài đặt thông báo thành công",
  "data": {
    "userId": 20,
    "channels": {
      "inApp": true,
      "email": false,
      "sms": false,
      "push": true
    },
    "categories": {
      "invoice": true,
      "payment": true,
      "debt": true,
      "contract": true,
      "room": true,
      "utility": true,
      "maintenance": true,
      "announcement": true
    },
    "quietHours": {
      "enabled": false,
      "start": "22:00",
      "end": "07:00"
    }
  }
}
```

## 6.2. PUT – Cập nhật cài đặt thông báo

**Endpoint:** `PUT /api/v1/notification-preferences`

**Request:**

```json
{
  "channels": {
    "inApp": true,
    "email": true,
    "sms": false,
    "push": true
  },
  "categories": {
    "invoice": true,
    "payment": true,
    "debt": true,
    "contract": true,
    "room": true,
    "utility": true,
    "maintenance": true,
    "announcement": false
  },
  "quietHours": {
    "enabled": true,
    "start": "22:00",
    "end": "07:00"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật cài đặt thông báo thành công",
  "data": {
    "userId": 20,
    "updatedAt": "2026-11-02T10:00:00Z"
  }
}
```

**Quy tắc:**

- Người dùng chỉ được sửa cài đặt của tài khoản mình.
- Thời gian yên lặng phải đúng định dạng `HH:mm`.
- Các thông báo quan trọng liên quan đến bảo mật hoặc giao dịch có thể tuân theo chính sách riêng của hệ thống.
- Tùy chọn tắt một kênh không đồng nghĩa với xóa thông báo IN_APP đã được tạo.

---

# 7. NOTIFICATION TEMPLATES – QUẢN LÝ MẪU THÔNG BÁO

## 7.1. GET – Danh sách mẫu thông báo

**Endpoint:** `GET /api/v1/notification-templates`

**Request:**

```http
GET /api/v1/notification-templates?type=INVOICE
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách mẫu thành công",
  "data": [
    {
      "id": 1,
      "code": "NEW_INVOICE",
      "name": "Thông báo hóa đơn mới",
      "type": "INVOICE",
      "titleTemplate": "Hóa đơn {{period}} đã được tạo",
      "contentTemplate": "Phòng {{roomName}} có hóa đơn {{invoiceCode}} với tổng tiền {{totalAmount}} VND.",
      "status": "ACTIVE"
    }
  ]
}
```

## 7.2. POST – Tạo mẫu thông báo

**Endpoint:** `POST /api/v1/notification-templates`

**Request:**

```json
{
  "code": "CONTRACT_EXPIRING",
  "name": "Nhắc hợp đồng sắp hết hạn",
  "type": "CONTRACT",
  "titleTemplate": "Hợp đồng sắp hết hạn",
  "contentTemplate": "Hợp đồng phòng {{roomName}} sẽ hết hạn vào ngày {{endDate}}.",
  "status": "ACTIVE"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo mẫu thông báo thành công",
  "data": {
    "id": 2,
    "code": "CONTRACT_EXPIRING",
    "status": "ACTIVE"
  }
}
```

## 7.3. PUT – Cập nhật mẫu thông báo

**Endpoint:** `PUT /api/v1/notification-templates/{id}`

**Request:**

```json
{
  "name": "Nhắc hợp đồng sắp hết hạn",
  "titleTemplate": "Thông báo thời hạn hợp đồng",
  "contentTemplate": "Hợp đồng phòng {{roomName}} sẽ hết hạn vào ngày {{endDate}}.",
  "status": "ACTIVE"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật mẫu thông báo thành công",
  "data": {
    "id": 2,
    "status": "ACTIVE"
  }
}
```

## 7.4. POST – Xem trước nội dung mẫu

**Endpoint:** `POST /api/v1/notification-templates/{id}/preview`

**Request:**

```json
{
  "variables": {
    "roomName": "P101",
    "endDate": "2026-12-31"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo bản xem trước thành công",
  "data": {
    "title": "Thông báo thời hạn hợp đồng",
    "content": "Hợp đồng phòng P101 sẽ hết hạn vào ngày 2026-12-31."
  }
}
```

**Quy tắc:**

- Biến trong mẫu phải được khai báo và kiểm tra.
- Không thực thi mã lệnh được chèn trong nội dung mẫu.
- Không để lộ thông tin của người thuê khác khi thay biến.
- Chỉ người có quyền quản lý mới được tạo hoặc chỉnh sửa mẫu dùng chung.

---

# 8. AUTOMATIC NOTIFICATIONS – THÔNG BÁO TỰ ĐỘNG

Đây là chức năng quan trọng của module. Hệ thống tự tạo thông báo khi một sự kiện nghiệp vụ xảy ra.

## 8.1. Danh sách sự kiện tự động

| Sự kiện | Người nhận | Nội dung |
|---|---|---|
| Hóa đơn mới | Người thuê | Hóa đơn đã được tạo |
| Hóa đơn sắp đến hạn | Người thuê | Nhắc thanh toán |
| Hóa đơn quá hạn | Người thuê, chủ nhà theo cấu hình | Thông báo công nợ |
| Thanh toán thành công | Người thuê, chủ nhà | Xác nhận thanh toán |
| Thanh toán thất bại | Người thực hiện, chủ nhà | Thông báo giao dịch thất bại |
| Hợp đồng sắp hết hạn | Người thuê, chủ nhà | Nhắc thời hạn hợp đồng |
| Hợp đồng được tạo | Người thuê liên quan | Thông báo hợp đồng |
| Hợp đồng gia hạn | Người thuê liên quan | Thông báo gia hạn |
| Yêu cầu sửa chữa mới | Chủ nhà/nhân viên | Có yêu cầu sửa chữa |
| Trạng thái sửa chữa thay đổi | Người gửi yêu cầu | Cập nhật tiến độ |
| Chỉ số điện nước được ghi | Chủ nhà, người thuê theo cấu hình | Thông báo chỉ số |
| Thay đổi lịch bảo trì | Người thuê liên quan | Thông báo lịch bảo trì |

## 8.2. POST – Kích hoạt tạo thông báo từ sự kiện

**Endpoint:** `POST /api/v1/notification-events`

API này thường được gọi nội bộ bởi các module khác, không phải endpoint công khai cho người dùng thông thường.

**Request:**

```json
{
  "eventType": "INVOICE_CREATED",
  "entityType": "INVOICE",
  "entityId": 101,
  "data": {
    "invoiceCode": "INV-2026-011",
    "roomName": "P101",
    "period": "2026-11",
    "totalAmount": 2500000,
    "dueDate": "2026-11-05"
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã tiếp nhận sự kiện thông báo",
  "data": {
    "eventId": 1001,
    "eventType": "INVOICE_CREATED",
    "status": "ACCEPTED"
  }
}
```

**Quy tắc:**

- Sự kiện phải xuất phát từ module có quyền gọi.
- Kiểm tra sự kiện đã được xử lý trước đó hay chưa.
- Không tin tưởng dữ liệu sự kiện do người dùng thông thường tự gửi.
- Ưu tiên tạo thông báo sau khi nghiệp vụ gốc được lưu thành công.
- Nếu tạo thông báo thất bại, không được làm mất dữ liệu hóa đơn hoặc giao dịch gốc.

## 8.3. Luồng tự động thông báo hóa đơn mới

```text
Module Billing tạo hóa đơn
          |
          v
Lưu hóa đơn thành công
          |
          v
Phát sự kiện INVOICE_CREATED
          |
          v
Module Notification tiếp nhận
          |
          v
Xác định người nhận
          |
          v
Lấy mẫu thông báo
          |
          v
Tạo thông báo IN_APP
          |
          v
Đưa yêu cầu gửi vào hàng đợi
          |
          v
Cập nhật trạng thái xử lý
```

## 8.4. POST – Tạo lịch nhắc tự động

**Endpoint:** `POST /api/v1/notification-rules`

**Mục đích:** Cấu hình quy tắc gửi thông báo tự động, ví dụ nhắc thanh toán trước hạn 3 ngày.

**Request:**

```json
{
  "name": "Nhắc thanh toán trước hạn",
  "eventType": "INVOICE_DUE",
  "daysBeforeDue": 3,
  "channels": ["IN_APP"],
  "templateCode": "INVOICE_REMINDER",
  "status": "ACTIVE"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo quy tắc thông báo thành công",
  "data": {
    "id": 1,
    "name": "Nhắc thanh toán trước hạn",
    "eventType": "INVOICE_DUE",
    "daysBeforeDue": 3,
    "status": "ACTIVE"
  }
}
```

## 8.5. GET – Danh sách quy tắc thông báo

**Endpoint:** `GET /api/v1/notification-rules`

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách quy tắc thành công",
  "data": [
    {
      "id": 1,
      "name": "Nhắc thanh toán trước hạn",
      "eventType": "INVOICE_DUE",
      "daysBeforeDue": 3,
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "name": "Nhắc hợp đồng sắp hết hạn",
      "eventType": "CONTRACT_EXPIRING",
      "daysBeforeDue": 15,
      "status": "ACTIVE"
    }
  ]
}
```

## 8.6. PUT – Cập nhật quy tắc thông báo

**Endpoint:** `PUT /api/v1/notification-rules/{id}`

**Request:**

```json
{
  "name": "Nhắc thanh toán trước hạn",
  "daysBeforeDue": 5,
  "channels": ["IN_APP"],
  "status": "ACTIVE"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật quy tắc thành công",
  "data": {
    "id": 1,
    "daysBeforeDue": 5,
    "status": "ACTIVE"
  }
}
```

**Lưu ý:** Việc chạy quy tắc theo ngày cần một tác vụ nền (scheduler/cron job). Chỉ tạo API cấu hình không tự động khiến thông báo được gửi nếu chưa có bộ xử lý lịch.

---

# 9. SCHEDULED NOTIFICATIONS – QUẢN LÝ LỊCH GỬI

## 9.1. POST – Lên lịch gửi thông báo

**Endpoint:** `POST /api/v1/notifications/schedule`

**Request:**

```json
{
  "title": "Thông báo bảo trì",
  "content": "Hệ thống điện sẽ được bảo trì vào ngày mai.",
  "type": "ANNOUNCEMENT",
  "priority": "NORMAL",
  "recipientType": "ALL_TENANTS",
  "channels": ["IN_APP"],
  "scheduledAt": "2026-11-05T08:00:00+07:00"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Lên lịch thông báo thành công",
  "data": {
    "id": 20,
    "scheduledAt": "2026-11-05T08:00:00+07:00",
    "status": "PENDING"
  }
}
```

## 9.2. GET – Danh sách lịch gửi

**Endpoint:** `GET /api/v1/notifications/scheduled`

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch gửi thông báo thành công",
  "data": [
    {
      "id": 20,
      "title": "Thông báo bảo trì",
      "scheduledAt": "2026-11-05T08:00:00+07:00",
      "status": "PENDING"
    }
  ]
}
```

## 9.3. PATCH – Hủy lịch gửi

**Endpoint:** `PATCH /api/v1/notifications/{id}/cancel-schedule`

**Request:**

```json
{
  "reason": "Thay đổi thời gian bảo trì"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Hủy lịch gửi thành công",
  "data": {
    "id": 20,
    "status": "CANCELLED"
  }
}
```

**Quy tắc:**

- Không cho hủy lịch đã gửi xong.
- Không cho sửa lịch đã bắt đầu xử lý nếu không có cơ chế hủy an toàn.
- Thời gian phải được lưu kèm múi giờ hoặc quy ước múi giờ thống nhất.
- Tác vụ nền cần kiểm tra lịch đến hạn và trạng thái trước khi gửi.

---

# 10. DELIVERY MANAGEMENT – QUẢN LÝ TRẠNG THÁI GỬI

## 10.1. GET – Lịch sử gửi thông báo

**Endpoint:** `GET /api/v1/notification-deliveries`

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| notificationId | integer | Lọc theo thông báo |
| userId | integer | Lọc theo người nhận |
| channel | string | IN_APP / EMAIL / SMS / PUSH |
| status | string | SENT / DELIVERED / FAILED |
| fromDate | datetime | Từ ngày |
| toDate | datetime | Đến ngày |
| page | integer | Trang |
| limit | integer | Số bản ghi |

**Request:**

```http
GET /api/v1/notification-deliveries?notificationId=10&page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch sử gửi thành công",
  "data": [
    {
      "id": 1,
      "notificationId": 10,
      "userId": 20,
      "channel": "IN_APP",
      "status": "DELIVERED",
      "sentAt": "2026-11-02T08:00:00Z",
      "deliveredAt": "2026-11-02T08:00:01Z",
      "errorMessage": null
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## 10.2. GET – Chi tiết một lần gửi

**Endpoint:** `GET /api/v1/notification-deliveries/{id}`

**Response:**

```json
{
  "success": true,
  "message": "Lấy chi tiết lần gửi thành công",
  "data": {
    "id": 1,
    "notificationId": 10,
    "userId": 20,
    "channel": "EMAIL",
    "status": "FAILED",
    "attemptCount": 2,
    "lastAttemptAt": "2026-11-02T08:05:00Z",
    "errorCode": "PROVIDER_UNAVAILABLE",
    "errorMessage": "Dịch vụ gửi email tạm thời không khả dụng"
  }
}
```

## 10.3. POST – Gửi lại thông báo thất bại

**Endpoint:** `POST /api/v1/notification-deliveries/{id}/retry`

**Request:**

```json
{
  "reason": "Thử gửi lại sau khi kiểm tra lỗi"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã đưa yêu cầu gửi lại vào hàng đợi",
  "data": {
    "deliveryId": 1,
    "status": "PENDING",
    "attemptCount": 3
  }
}
```

**Quy tắc:**

- Chỉ người có quyền mới được gửi lại thủ công.
- Không gửi lại bản ghi đã gửi thành công.
- Phải giới hạn số lần thử.
- Lỗi tạm thời có thể tự động thử lại.
- Lỗi dữ liệu người nhận không hợp lệ cần được sửa trước khi gửi lại.
- Mỗi lần thử phải có bản ghi lịch sử riêng hoặc cập nhật lịch sử thử gửi đầy đủ.

---

# 11. DEVICE MANAGEMENT – QUẢN LÝ THIẾT BỊ NHẬN PUSH

Chức năng này chỉ cần triển khai nếu hệ thống có ứng dụng hỗ trợ thông báo đẩy.

## 11.1. POST – Đăng ký thiết bị

**Endpoint:** `POST /api/v1/devices/register`

**Request:**

```json
{
  "deviceToken": "DEVICE_PUSH_TOKEN",
  "platform": "ANDROID",
  "deviceName": "Android Phone"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đăng ký thiết bị thành công",
  "data": {
    "id": 1,
    "platform": "ANDROID",
    "status": "ACTIVE"
  }
}
```

## 11.2. GET – Danh sách thiết bị

**Endpoint:** `GET /api/v1/devices`

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách thiết bị thành công",
  "data": [
    {
      "id": 1,
      "platform": "ANDROID",
      "deviceName": "Android Phone",
      "status": "ACTIVE",
      "lastUsedAt": "2026-11-02T08:00:00Z"
    }
  ]
}
```

## 11.3. DELETE – Hủy đăng ký thiết bị

**Endpoint:** `DELETE /api/v1/devices/{id}`

**Response:**

```json
{
  "success": true,
  "message": "Hủy đăng ký thiết bị thành công",
  "data": {
    "id": 1,
    "status": "INACTIVE"
  }
}
```

**Quy tắc bảo mật:**

- Token thiết bị phải được bảo vệ.
- Không trả token đầy đủ trong API danh sách.
- Người dùng chỉ được quản lý thiết bị thuộc tài khoản của mình.
- Khi đăng xuất hoặc thiết bị không còn hợp lệ, cần hủy hoặc vô hiệu hóa token tương ứng.

---

# 12. NOTIFICATION STATISTICS – THỐNG KÊ THÔNG BÁO

## 12.1. GET – Thống kê thông báo

**Endpoint:** `GET /api/v1/notification-statistics`

**Request:**

```http
GET /api/v1/notification-statistics?fromDate=2026-11-01&toDate=2026-11-30
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy thống kê thông báo thành công",
  "data": {
    "totalNotifications": 100,
    "totalRecipients": 150,
    "unreadCount": 20,
    "readCount": 130,
    "sentCount": 145,
    "failedCount": 5,
    "byType": {
      "INVOICE": 30,
      "PAYMENT": 20,
      "CONTRACT": 15,
      "MAINTENANCE": 10,
      "ANNOUNCEMENT": 25
    }
  }
}
```

## 12.2. GET – Thống kê trạng thái gửi theo kênh

**Endpoint:** `GET /api/v1/notification-statistics/delivery-channels`

**Response:**

```json
{
  "success": true,
  "message": "Lấy thống kê kênh gửi thành công",
  "data": [
    {
      "channel": "IN_APP",
      "total": 100,
      "success": 100,
      "failed": 0
    },
    {
      "channel": "EMAIL",
      "total": 30,
      "success": 28,
      "failed": 2
    }
  ]
}
```

**Lưu ý:** Chỉ thống kê dữ liệu thực tế có trong hệ thống. Không hiển thị số liệu giả khi chưa tích hợp kênh gửi tương ứng.

---

# 13. DATABASE DESIGN – THIẾT KẾ CƠ SỞ DỮ LIỆU

## 13.1. Bảng Notifications

Lưu nội dung thông báo chung.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| owner_id | BIGINT | Chủ nhà sở hữu dữ liệu |
| title | VARCHAR(255) | Tiêu đề |
| content | TEXT | Nội dung |
| type | VARCHAR(50) | Loại thông báo |
| priority | VARCHAR(30) | Mức độ ưu tiên |
| action_url | VARCHAR(500) | Đường dẫn điều hướng |
| related_entity_type | VARCHAR(50) | Loại dữ liệu liên quan |
| related_entity_id | BIGINT | ID dữ liệu liên quan |
| created_by | BIGINT | Người tạo |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## 13.2. Bảng Notification_Recipients

Lưu người nhận và trạng thái đọc riêng của từng người.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| notification_id | BIGINT | Thông báo |
| user_id | BIGINT | Người nhận |
| status | VARCHAR(30) | UNREAD / READ / ARCHIVED |
| received_at | DATETIME | Thời điểm tạo người nhận |
| read_at | DATETIME | Thời điểm đọc |
| archived_at | DATETIME | Thời điểm lưu trữ |

**Lưu ý:** Trạng thái đọc phải nằm ở bảng người nhận vì cùng một thông báo có thể được nhiều người nhận và mỗi người có trạng thái đọc khác nhau.

## 13.3. Bảng Notification_Deliveries

Lưu trạng thái gửi qua từng kênh.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| notification_id | BIGINT | Thông báo |
| recipient_id | BIGINT | Người nhận |
| channel | VARCHAR(30) | Kênh gửi |
| status | VARCHAR(30) | Trạng thái gửi |
| attempt_count | INT | Số lần thử |
| provider_message_id | VARCHAR(255) | Mã từ nhà cung cấp |
| error_code | VARCHAR(100) | Mã lỗi |
| error_message | TEXT | Nội dung lỗi |
| sent_at | DATETIME | Thời điểm gửi |
| delivered_at | DATETIME | Thời điểm phát thành công |
| created_at | DATETIME | Ngày tạo |

## 13.4. Bảng Notification_Templates

Lưu các mẫu thông báo.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| owner_id | BIGINT | Chủ nhà |
| code | VARCHAR(100) | Mã mẫu |
| name | VARCHAR(255) | Tên mẫu |
| type | VARCHAR(50) | Loại |
| title_template | VARCHAR(255) | Mẫu tiêu đề |
| content_template | TEXT | Mẫu nội dung |
| status | VARCHAR(30) | ACTIVE / INACTIVE |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## 13.5. Bảng Notification_Preferences

Lưu tùy chọn nhận thông báo của người dùng.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| user_id | BIGINT | Người dùng |
| channel | VARCHAR(30) | Kênh nhận |
| notification_type | VARCHAR(50) | Loại thông báo |
| enabled | BOOLEAN | Bật/tắt |
| updated_at | DATETIME | Ngày cập nhật |

## 13.6. Bảng Notification_Rules

Lưu quy tắc thông báo tự động.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| owner_id | BIGINT | Chủ nhà |
| name | VARCHAR(255) | Tên quy tắc |
| event_type | VARCHAR(100) | Sự kiện |
| days_before_due | INT | Số ngày trước hạn |
| template_id | BIGINT | Mẫu thông báo |
| channels | JSON | Các kênh gửi |
| status | VARCHAR(30) | ACTIVE / INACTIVE |
| created_at | DATETIME | Ngày tạo |

## 13.7. Bảng Notification_Schedules

Lưu lịch gửi thông báo.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| notification_id | BIGINT | Thông báo |
| scheduled_at | DATETIME | Thời điểm gửi |
| status | VARCHAR(30) | PENDING / PROCESSING / SENT / CANCELLED |
| processed_at | DATETIME | Thời điểm xử lý |
| created_by | BIGINT | Người tạo |

## 13.8. Bảng Notification_Events

Lưu sự kiện nghiệp vụ đã tiếp nhận.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| event_key | VARCHAR(150) | Mã chống trùng |
| event_type | VARCHAR(100) | Loại sự kiện |
| entity_type | VARCHAR(50) | Loại dữ liệu |
| entity_id | BIGINT | ID dữ liệu |
| payload | JSON | Dữ liệu sự kiện |
| status | VARCHAR(30) | RECEIVED / PROCESSED / FAILED |
| created_at | DATETIME | Ngày nhận |
| processed_at | DATETIME | Ngày xử lý |

## 13.9. Bảng User_Devices

Lưu thiết bị nhận thông báo đẩy.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| user_id | BIGINT | Người dùng |
| device_token | VARCHAR(500) | Token thiết bị |
| platform | VARCHAR(30) | ANDROID / IOS / WEB |
| device_name | VARCHAR(255) | Tên thiết bị |
| status | VARCHAR(30) | ACTIVE / INACTIVE |
| last_used_at | DATETIME | Lần sử dụng cuối |
| created_at | DATETIME | Ngày đăng ký |

---

# 14. DATABASE RELATIONSHIPS – QUAN HỆ CÁC BẢNG

```text
USERS
  |
  | 1 - N
  v
NOTIFICATION_RECIPIENTS
  |
  | N - 1
  v
NOTIFICATIONS
  |
  | 1 - N
  v
NOTIFICATION_DELIVERIES


NOTIFICATION_TEMPLATES
  |
  | 1 - N
  v
NOTIFICATION_RULES


USERS
  |
  | 1 - N
  v
NOTIFICATION_PREFERENCES


NOTIFICATIONS
  |
  | 1 - N
  v
NOTIFICATION_SCHEDULES


USERS
  |
  | 1 - N
  v
USER_DEVICES


NOTIFICATION_EVENTS
  |
  | được xử lý bởi
  v
NOTIFICATIONS
```

**Khóa ngoại chính:**

- `Notification_Recipients.notification_id` → `Notifications.id`
- `Notification_Recipients.user_id` → `Users.id`
- `Notification_Deliveries.notification_id` → `Notifications.id`
- `Notification_Deliveries.recipient_id` → `Notification_Recipients.id`
- `Notification_Templates.owner_id` → `Users.id` hoặc bảng chủ nhà tương ứng
- `Notification_Rules.template_id` → `Notification_Templates.id`
- `Notification_Preferences.user_id` → `Users.id`
- `Notification_Schedules.notification_id` → `Notifications.id`
- `User_Devices.user_id` → `Users.id`

Tên bảng và khóa ngoại cần đồng bộ với ERD thực tế của dự án.

---

# 15. NOTIFICATION WORKFLOW – LUỒNG HOẠT ĐỘNG

## 15.1. Luồng gửi thông báo thủ công

```text
Chủ nhà đăng nhập
       |
       v
Mở chức năng thông báo
       |
       v
Nhập tiêu đề và nội dung
       |
       v
Chọn người nhận
       |
       v
Chọn kênh gửi
       |
       v
Kiểm tra quyền và dữ liệu
       |
       v
Tạo thông báo
       |
       v
Tạo danh sách người nhận
       |
       v
Đưa yêu cầu gửi vào hàng đợi
       |
       v
Cập nhật trạng thái gửi
       |
       v
Người nhận xem thông báo
       |
       v
Đánh dấu đã đọc
```

## 15.2. Luồng nhắc thanh toán tự động

```text
Scheduler chạy theo lịch
       |
       v
Lấy hóa đơn sắp đến hạn
       |
       v
Kiểm tra hóa đơn còn nợ
       |
       v
Kiểm tra đã nhắc trong khoảng thời gian này chưa
       |
       v
Xác định người thuê liên quan
       |
       v
Tạo thông báo nhắc thanh toán
       |
       v
Gửi thông báo
       |
       v
Lưu lịch sử
```

## 15.3. Luồng thông báo sửa chữa

```text
Người thuê gửi yêu cầu sửa chữa
       |
       v
Module Maintenance lưu yêu cầu
       |
       v
Phát sự kiện MAINTENANCE_CREATED
       |
       v
Notification tiếp nhận sự kiện
       |
       v
Gửi thông báo cho chủ nhà
       |
       v
Chủ nhà cập nhật trạng thái
       |
       v
Phát sự kiện MAINTENANCE_STATUS_CHANGED
       |
       v
Gửi thông báo cho người thuê
```

---

# 16. BACKGROUND JOB & QUEUE – TÁC VỤ NỀN VÀ HÀNG ĐỢI

Để gửi nhiều thông báo mà không làm chậm API nghiệp vụ, nên sử dụng hàng đợi hoặc tác vụ nền.

## 16.1. Các tác vụ nền

| Tác vụ | Chức năng |
|---|---|
| Notification Worker | Xử lý yêu cầu gửi |
| Scheduled Notification Worker | Gửi thông báo đến lịch |
| Invoice Reminder Job | Kiểm tra hóa đơn sắp đến hạn |
| Overdue Reminder Job | Kiểm tra hóa đơn quá hạn |
| Contract Expiry Job | Kiểm tra hợp đồng sắp hết hạn |
| Retry Failed Delivery Job | Thử lại các lần gửi lỗi |
| Cleanup Job | Dọn dữ liệu tạm theo chính sách lưu trữ |

## 16.2. Quy tắc xử lý hàng đợi

- API chỉ cần tạo yêu cầu gửi và trả về mã thông báo hoặc mã công việc.
- Worker xử lý gửi ở phía nền.
- Mỗi công việc phải có mã định danh để tránh xử lý trùng.
- Lỗi tạm thời có thể thử lại theo khoảng thời gian tăng dần.
- Lỗi vĩnh viễn cần chuyển sang trạng thái FAILED.
- Giới hạn số lần thử gửi.
- Không để một thông báo lỗi làm dừng toàn bộ hàng đợi.
- Ghi lại thời điểm thử, kết quả và mã lỗi.

**Ví dụ chính sách thử lại:**

```text
Lần 1: Gửi ngay
Lần 2: Sau 1 phút
Lần 3: Sau 5 phút
Lần 4: Sau 15 phút
Sau đó: Đánh dấu FAILED và chờ xử lý
```

Đây là lịch thử lại minh họa, có thể điều chỉnh theo dịch vụ gửi thực tế.

---

# 17. SECURITY & AUTHORIZATION – BẢO MẬT VÀ PHÂN QUYỀN

## 17.1. Phân quyền chức năng

| Chức năng | Chủ nhà | Nhân viên | Người thuê |
|---|---|---|---|
| Xem thông báo của mình | Có | Có | Có |
| Đánh dấu đã đọc | Có | Có | Có |
| Xóa/lưu trữ thông báo của mình | Có | Có | Có |
| Tạo thông báo chung | Có | Theo quyền | Không |
| Gửi thông báo theo phòng | Có | Theo quyền | Không |
| Quản lý mẫu thông báo | Có | Theo quyền | Không |
| Cấu hình quy tắc tự động | Có | Theo quyền | Không |
| Xem lịch sử gửi toàn nhà trọ | Có | Theo quyền | Không |
| Quản lý thiết bị của mình | Có | Có | Có |
| Cập nhật cài đặt của mình | Có | Có | Có |

## 17.2. Yêu cầu bảo mật

- API phải xác thực bằng JWT.
- Kiểm tra quyền tại server.
- Kiểm tra phạm vi dữ liệu thuộc nhà trọ của người dùng.
- Không cho phép sửa hoặc đọc thông báo của người khác.
- Không để lộ email, số điện thoại hoặc nội dung riêng tư của người nhận.
- Kiểm tra dữ liệu đầu vào để tránh nội dung độc hại.
- Không cho phép chèn mã HTML hoặc script nguy hiểm vào nội dung hiển thị.
- Không đưa token thiết bị hoặc thông tin xác thực vào log công khai.
- Giới hạn số lượng thông báo được gửi trong một khoảng thời gian để tránh spam.
- Lưu nhật ký thao tác quản trị.

---

# 18. DATABASE CONSTRAINTS & INDEXES – RÀNG BUỘC VÀ CHỈ MỤC

## 18.1. Ràng buộc dữ liệu

- `Notifications.title` không được rỗng.
- `Notifications.content` không được rỗng.
- `Notification_Recipients.notification_id` phải tồn tại.
- `Notification_Recipients.user_id` phải tồn tại.
- Mỗi cặp `notification_id + user_id` chỉ có một bản ghi người nhận nếu không hỗ trợ nhiều lần gửi riêng.
- `Notification_Deliveries` phải liên kết đúng người nhận.
- `Notification_Preferences.user_id + channel + notification_type` nên duy nhất.
- `Notification_Templates.code` cần duy nhất trong phạm vi chủ nhà.
- `Notification_Events.event_key` phải duy nhất để chống xử lý sự kiện trùng.
- Thời điểm gửi theo lịch phải hợp lệ.
- `attempt_count` không được âm.

## 18.2. Index đề xuất

```sql
CREATE INDEX idx_notification_recipients_user_status
ON Notification_Recipients(user_id, status);

CREATE INDEX idx_notifications_created_at
ON Notifications(created_at);

CREATE INDEX idx_notification_deliveries_status
ON Notification_Deliveries(status);

CREATE INDEX idx_notification_deliveries_notification
ON Notification_Deliveries(notification_id);

CREATE INDEX idx_notification_schedules_status_time
ON Notification_Schedules(status, scheduled_at);

CREATE UNIQUE INDEX uq_notification_events_event_key
ON Notification_Events(event_key);
```

Các câu lệnh cần điều chỉnh theo hệ quản trị cơ sở dữ liệu đang sử dụng.

---

# 19. ERROR CODES – MÃ LỖI

| HTTP Status | Error Code | Ý nghĩa |
|---|---|---|
| 400 | INVALID_DATA | Dữ liệu không hợp lệ |
| 400 | EMPTY_TITLE | Tiêu đề trống |
| 400 | EMPTY_CONTENT | Nội dung trống |
| 400 | INVALID_RECIPIENT | Người nhận không hợp lệ |
| 400 | INVALID_CHANNEL | Kênh gửi không hợp lệ |
| 401 | UNAUTHORIZED | Chưa đăng nhập |
| 403 | FORBIDDEN | Không có quyền |
| 404 | NOTIFICATION_NOT_FOUND | Không tìm thấy thông báo |
| 404 | TEMPLATE_NOT_FOUND | Không tìm thấy mẫu |
| 404 | RECIPIENT_NOT_FOUND | Không tìm thấy người nhận |
| 409 | DUPLICATE_NOTIFICATION | Thông báo bị trùng |
| 409 | EVENT_ALREADY_PROCESSED | Sự kiện đã xử lý |
| 409 | SCHEDULE_ALREADY_CANCELLED | Lịch gửi đã bị hủy |
| 409 | NOTIFICATION_ALREADY_SENT | Thông báo đã được gửi |
| 422 | INVALID_SCHEDULE_TIME | Thời gian gửi không hợp lệ |
| 422 | TEMPLATE_VARIABLE_MISSING | Thiếu biến trong mẫu |
| 422 | RECIPIENT_NOT_IN_SCOPE | Người nhận không thuộc phạm vi quản lý |
| 429 | RATE_LIMIT_EXCEEDED | Gửi quá nhiều yêu cầu |
| 500 | INTERNAL_SERVER_ERROR | Lỗi hệ thống |
| 503 | NOTIFICATION_PROVIDER_UNAVAILABLE | Dịch vụ gửi tạm thời không khả dụng |

**Ví dụ Response lỗi:**

```json
{
  "success": false,
  "message": "Người nhận không thuộc nhà trọ đang quản lý",
  "errorCode": "RECIPIENT_NOT_IN_SCOPE"
}
```

---

# 20. TEST CASES – KIỂM THỬ API

| Mã | Chức năng | Dữ liệu kiểm thử | Kết quả mong đợi |
|---|---|---|---|
| TC01 | Tạo thông báo | Tiêu đề và nội dung hợp lệ | Thành công |
| TC02 | Tạo thông báo | Tiêu đề trống | Báo lỗi |
| TC03 | Tạo thông báo | Nội dung trống | Báo lỗi |
| TC04 | Gửi cho một người | Người nhận hợp lệ | Thành công |
| TC05 | Gửi cho nhiều người | Danh sách hợp lệ | Tạo đúng danh sách người nhận |
| TC06 | Gửi theo phòng | Phòng có người thuê | Gửi đúng người thuê liên quan |
| TC07 | Gửi theo phòng | Phòng không thuộc chủ nhà | Báo lỗi |
| TC08 | Xem thông báo | Người nhận hợp lệ | Hiển thị dữ liệu |
| TC09 | Xem thông báo | Người không có quyền | Báo lỗi |
| TC10 | Đánh dấu đã đọc | Thông báo chưa đọc | Chuyển READ |
| TC11 | Đánh dấu đã đọc | Gọi lại API | Không tạo dữ liệu đọc trùng |
| TC12 | Đánh dấu tất cả đã đọc | Có nhiều thông báo chưa đọc | Cập nhật đúng số lượng |
| TC13 | Lấy số chưa đọc | Có 5 thông báo chưa đọc | Trả về 5 |
| TC14 | Cài đặt thông báo | Dữ liệu hợp lệ | Cập nhật thành công |
| TC15 | Tạo mẫu | Mã mẫu hợp lệ | Thành công |
| TC16 | Xem trước mẫu | Đủ biến | Hiển thị đúng nội dung |
| TC17 | Xem trước mẫu | Thiếu biến | Báo lỗi |
| TC18 | Tạo thông báo tự động | Sự kiện hợp lệ | Tạo thông báo |
| TC19 | Xử lý sự kiện | Gửi lại cùng eventKey | Không xử lý trùng |
| TC20 | Lên lịch gửi | Thời gian hợp lệ | Tạo lịch |
| TC21 | Lên lịch gửi | Thời gian không hợp lệ | Báo lỗi |
| TC22 | Hủy lịch | Lịch đang PENDING | Hủy thành công |
| TC23 | Gửi thất bại | Nhà cung cấp lỗi tạm thời | Đưa vào hàng đợi thử lại |
| TC24 | Gửi lại | Bản ghi đã gửi thành công | Từ chối gửi trùng |
| TC25 | Đăng ký thiết bị | Token hợp lệ | Thành công |
| TC26 | Xóa thiết bị | Thiết bị thuộc tài khoản | Vô hiệu hóa |
| TC27 | Nhắc hóa đơn | Hóa đơn còn nợ và sắp đến hạn | Tạo thông báo |
| TC28 | Nhắc hóa đơn | Hóa đơn đã thanh toán | Không gửi nhắc nợ |
| TC29 | Nhắc hợp đồng | Hợp đồng sắp hết hạn | Tạo thông báo |
| TC30 | Thông báo sửa chữa | Có yêu cầu mới | Chủ nhà nhận thông báo |

---

# 21. ACCEPTANCE CRITERIA – TIÊU CHÍ NGHIỆM THU

Module được xem là đáp ứng yêu cầu cơ bản khi:

- [ ] Tạo được thông báo thủ công.
- [ ] Gửi thông báo đến một người.
- [ ] Gửi thông báo đến nhiều người.
- [ ] Gửi thông báo theo phòng.
- [ ] Gửi thông báo theo hợp đồng.
- [ ] Người dùng xem được danh sách thông báo của mình.
- [ ] Người dùng xem được chi tiết thông báo.
- [ ] Đánh dấu đã đọc và chưa đọc được.
- [ ] Đánh dấu tất cả đã đọc được.
- [ ] Đếm được số thông báo chưa đọc.
- [ ] Lưu trữ thông báo mà không làm mất lịch sử.
- [ ] Cấu hình được tùy chọn nhận thông báo.
- [ ] Quản lý được mẫu thông báo.
- [ ] Tự động tạo thông báo khi có sự kiện hóa đơn.
- [ ] Tự động nhắc hóa đơn sắp đến hạn.
- [ ] Tự động thông báo hợp đồng sắp hết hạn.
- [ ] Tự động thông báo khi có yêu cầu sửa chữa.
- [ ] Lên lịch gửi và hủy lịch gửi được.
- [ ] Theo dõi được lịch sử gửi và lỗi gửi.
- [ ] Có cơ chế thử lại khi gửi thất bại.
- [ ] Có phân quyền và chống gửi trùng.
- [ ] Có kiểm thử các trường hợp hợp lệ và không hợp lệ.

---

# 22. API SUMMARY – TỔNG HỢP ENDPOINT

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/notifications` | Danh sách thông báo |
| 2 | GET | `/notifications/{id}` | Chi tiết thông báo |
| 3 | POST | `/notifications` | Tạo thông báo |
| 4 | PUT | `/notifications/{id}` | Cập nhật thông báo chờ gửi |
| 5 | DELETE | `/notifications/{id}` | Lưu trữ thông báo |
| 6 | GET | `/notifications/{id}/recipients` | Danh sách người nhận |
| 7 | POST | `/notifications/send-to-user` | Gửi cho một người |
| 8 | POST | `/notifications/send-to-users` | Gửi cho nhiều người |
| 9 | POST | `/notifications/send-to-room` | Gửi theo phòng |
| 10 | POST | `/notifications/send-to-contract` | Gửi theo hợp đồng |
| 11 | PATCH | `/notifications/{id}/read` | Đánh dấu đã đọc |
| 12 | PATCH | `/notifications/{id}/unread` | Đánh dấu chưa đọc |
| 13 | PATCH | `/notifications/read-all` | Đánh dấu tất cả đã đọc |
| 14 | GET | `/notifications/unread-count` | Đếm chưa đọc |
| 15 | GET | `/notification-preferences` | Xem cài đặt |
| 16 | PUT | `/notification-preferences` | Cập nhật cài đặt |
| 17 | GET | `/notification-templates` | Danh sách mẫu |
| 18 | POST | `/notification-templates` | Tạo mẫu |
| 19 | PUT | `/notification-templates/{id}` | Sửa mẫu |
| 20 | POST | `/notification-templates/{id}/preview` | Xem trước mẫu |
| 21 | POST | `/notification-events` | Tiếp nhận sự kiện nội bộ |
| 22 | POST | `/notification-rules` | Tạo quy tắc tự động |
| 23 | GET | `/notification-rules` | Danh sách quy tắc |
| 24 | PUT | `/notification-rules/{id}` | Sửa quy tắc |
| 25 | POST | `/notifications/schedule` | Lên lịch gửi |
| 26 | GET | `/notifications/scheduled` | Danh sách lịch gửi |
| 27 | PATCH | `/notifications/{id}/cancel-schedule` | Hủy lịch gửi |
| 28 | GET | `/notification-deliveries` | Lịch sử gửi |
| 29 | GET | `/notification-deliveries/{id}` | Chi tiết lần gửi |
| 30 | POST | `/notification-deliveries/{id}/retry` | Gửi lại |
| 31 | POST | `/devices/register` | Đăng ký thiết bị |
| 32 | GET | `/devices` | Danh sách thiết bị |
| 33 | DELETE | `/devices/{id}` | Hủy đăng ký thiết bị |
| 34 | GET | `/notification-statistics` | Thống kê thông báo |
| 35 | GET | `/notification-statistics/delivery-channels` | Thống kê kênh gửi |

---

# 23. KẾT LUẬN MODULE 6

Module NOTIFICATION là thành phần giúp hệ thống quản lý phòng trọ chủ động thông báo các hoạt động quan trọng đến chủ nhà, nhân viên và người thuê.

Các chức năng trọng tâm:

1. Quản lý thông báo.
2. Quản lý người nhận.
3. Theo dõi đã đọc và chưa đọc.
4. Gửi thông báo thủ công.
5. Tự động thông báo từ các module khác.
6. Nhắc nhở hóa đơn và hợp đồng.
7. Quản lý mẫu thông báo.
8. Lên lịch gửi.
9. Theo dõi trạng thái gửi và xử lý lỗi.
10. Quản lý thiết bị nhận thông báo đẩy.
11. Thống kê thông báo.

**Nguyên tắc thiết kế quan trọng:**

- Nội dung thông báo và trạng thái đọc của từng người phải được lưu riêng.
- Trạng thái gửi và trạng thái đọc không được đánh đồng.
- Một sự kiện nghiệp vụ không được tạo thông báo trùng.
- Lỗi gửi thông báo không được làm mất dữ liệu nghiệp vụ gốc.
- Người dùng chỉ được xem thông báo thuộc phạm vi được phép.
- Các kênh EMAIL, SMS và PUSH chỉ được đánh dấu đã tích hợp khi có dịch vụ thực tế.

**Ghi chú triển khai:** Đây là tài liệu thiết kế API đề xuất. Khi triển khai cần đối chiếu với bảng Users, Rooms, Contracts, Invoices và Maintenance trong ERD của dự án để thống nhất khóa ngoại, quyền truy cập và luồng sự kiện.
