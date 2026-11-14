# MODULE 5: RENTAL SERVICES & BILLING
## QUẢN LÝ DỊCH VỤ, ĐIỆN NƯỚC, HÓA ĐƠN VÀ THANH TOÁN

**Phiên bản:** 1.0  
**API Prefix:** `/api/v1`  
**Phương thức xác thực:** Bearer Token (JWT)  
**Đối tượng sử dụng:** Chủ nhà và nhân viên được phân quyền.

---

# 1. MỤC ĐÍCH MODULE

Module này quản lý toàn bộ nghiệp vụ tài chính trong hệ thống phòng trọ, bao gồm:

- Quản lý dịch vụ phòng trọ.
- Gán dịch vụ cho từng phòng.
- Quản lý chỉ số điện, nước.
- Cấu hình giá điện, nước theo bậc lũy tiến.
- Tự động tính tiền dịch vụ.
- Tạo hóa đơn theo chu kỳ thuê.
- Quản lý thanh toán hóa đơn.
- Quản lý tiền đặt cọc.
- Xử lý hoàn tiền, điều chỉnh hóa đơn.
- Theo dõi công nợ và lịch sử giao dịch.

## 1.1. Các nhóm chức năng

| Nhóm | Chức năng |
|---|---|
| Service Management | Quản lý dịch vụ |
| Room Services | Gán dịch vụ cho phòng |
| Utility Management | Quản lý điện, nước |
| Utility Pricing | Quản lý bảng giá lũy tiến |
| Invoice Management | Quản lý hóa đơn |
| Payment Management | Quản lý thanh toán |
| Deposit Management | Quản lý tiền cọc |
| Billing Automation | Tạo hóa đơn định kỳ |
| Invoice Adjustment | Điều chỉnh hóa đơn |
| Refund Management | Quản lý hoàn tiền |
| Financial Reports | Tổng hợp tài chính |

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
  "errors": [
    {
      "field": "amount",
      "message": "Số tiền phải lớn hơn 0"
    }
  ]
}
```

## 2.3. Các quy tắc chung

- Tất cả API yêu cầu đăng nhập, trừ khi hệ thống quy định khác.
- Người dùng chỉ được thao tác dữ liệu thuộc nhà trọ mình quản lý.
- Tiền tệ sử dụng VND.
- Số tiền lưu dưới dạng số nguyên VND hoặc kiểu DECIMAL phù hợp, không dùng FLOAT.
- Không cho phép chỉ số điện, nước âm.
- Không sửa trực tiếp hóa đơn đã thanh toán; phải sử dụng chức năng điều chỉnh.
- Mọi giao dịch tiền phải có lịch sử.
- API danh sách hỗ trợ phân trang.
- Các thao tác tài chính quan trọng phải được ghi nhật ký.

---

# 3. SERVICE MANAGEMENT – QUẢN LÝ DỊCH VỤ

## 3.1. GET – Danh sách dịch vụ

**Endpoint:** `GET /api/v1/services`

**Mục đích:** Lấy danh sách dịch vụ của nhà trọ.

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| page | integer | Trang hiện tại |
| limit | integer | Số bản ghi mỗi trang |
| keyword | string | Tìm theo tên dịch vụ |
| status | string | ACTIVE / INACTIVE |
| serviceType | string | FIXED / USAGE_BASED |
| sortBy | string | Trường sắp xếp |
| sortOrder | string | ASC / DESC |

**Request:**

```http
GET /api/v1/services?page=1&limit=10&status=ACTIVE
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách dịch vụ thành công",
  "data": [
    {
      "id": 1,
      "name": "Internet",
      "serviceType": "FIXED",
      "unit": "Phòng",
      "price": 100000,
      "status": "ACTIVE",
      "description": "Phí internet hàng tháng"
    },
    {
      "id": 2,
      "name": "Vệ sinh",
      "serviceType": "FIXED",
      "unit": "Người",
      "price": 30000,
      "status": "ACTIVE",
      "description": "Phí vệ sinh hàng tháng"
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

## 3.2. GET – Chi tiết dịch vụ

**Endpoint:** `GET /api/v1/services/{id}`

**Request:**

```http
GET /api/v1/services/1
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy thông tin dịch vụ thành công",
  "data": {
    "id": 1,
    "name": "Internet",
    "serviceType": "FIXED",
    "unit": "Phòng",
    "price": 100000,
    "status": "ACTIVE",
    "description": "Phí internet hàng tháng",
    "createdAt": "2026-10-01T08:00:00Z",
    "updatedAt": "2026-10-01T08:00:00Z"
  }
}
```

## 3.3. POST – Thêm dịch vụ

**Endpoint:** `POST /api/v1/services`

**Request:**

```json
{
  "name": "Internet",
  "serviceType": "FIXED",
  "unit": "Phòng",
  "price": 100000,
  "description": "Phí internet hàng tháng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Thêm dịch vụ thành công",
  "data": {
    "id": 3,
    "name": "Internet",
    "serviceType": "FIXED",
    "unit": "Phòng",
    "price": 100000,
    "status": "ACTIVE"
  }
}
```

**Validation:**

- `name` bắt buộc, không được để trống.
- `serviceType` chỉ nhận `FIXED` hoặc `USAGE_BASED`.
- `unit` bắt buộc.
- `price` phải lớn hơn hoặc bằng 0.
- Không tạo hai dịch vụ trùng tên trong cùng phạm vi quản lý nếu hệ thống quy định tên phải duy nhất.

## 3.4. PUT – Cập nhật dịch vụ

**Endpoint:** `PUT /api/v1/services/{id}`

**Request:**

```json
{
  "name": "Internet tốc độ cao",
  "serviceType": "FIXED",
  "unit": "Phòng",
  "price": 120000,
  "description": "Phí internet hàng tháng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật dịch vụ thành công",
  "data": {
    "id": 3,
    "name": "Internet tốc độ cao",
    "price": 120000,
    "status": "ACTIVE"
  }
}
```

**Lưu ý:** Việc thay đổi giá dịch vụ không được tự động thay đổi các hóa đơn đã phát hành trước đó. Hóa đơn cần lưu lại giá tại thời điểm lập.

## 3.5. PATCH – Ngừng cung cấp dịch vụ

**Endpoint:** `PATCH /api/v1/services/{id}/status`

**Request:**

```json
{
  "status": "INACTIVE"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã ngừng cung cấp dịch vụ",
  "data": {
    "id": 3,
    "status": "INACTIVE"
  }
}
```

**Lưu ý:** Ưu tiên ngừng hoạt động thay vì xóa dịch vụ đã được sử dụng trong hóa đơn.

---

# 4. ROOM SERVICES – GÁN DỊCH VỤ CHO PHÒNG

## 4.1. GET – Danh sách dịch vụ của phòng

**Endpoint:** `GET /api/v1/rooms/{roomId}/services`

**Request:**

```http
GET /api/v1/rooms/101/services
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy dịch vụ phòng thành công",
  "data": [
    {
      "id": 1,
      "serviceId": 1,
      "serviceName": "Internet",
      "price": 100000,
      "quantity": 1,
      "billingType": "MONTHLY",
      "status": "ACTIVE"
    },
    {
      "id": 2,
      "serviceId": 2,
      "serviceName": "Vệ sinh",
      "price": 30000,
      "quantity": 2,
      "billingType": "PER_PERSON",
      "status": "ACTIVE"
    }
  ]
}
```

## 4.2. PUT – Cập nhật dịch vụ phòng

**Endpoint:** `PUT /api/v1/rooms/{roomId}/services`

**Request:**

```json
{
  "services": [
    {
      "serviceId": 1,
      "price": 100000,
      "quantity": 1,
      "billingType": "MONTHLY"
    },
    {
      "serviceId": 2,
      "price": 30000,
      "quantity": 2,
      "billingType": "PER_PERSON"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật dịch vụ phòng thành công",
  "data": {
    "roomId": 101,
    "services": [
      {
        "serviceId": 1,
        "serviceName": "Internet",
        "price": 100000,
        "quantity": 1
      },
      {
        "serviceId": 2,
        "serviceName": "Vệ sinh",
        "price": 30000,
        "quantity": 2
      }
    ]
  }
}
```

**Validation:**

- Phòng phải tồn tại và thuộc quyền quản lý.
- Dịch vụ phải tồn tại và đang hoạt động.
- `quantity` phải lớn hơn 0.
- Không được gán trùng một dịch vụ nếu thiết kế không hỗ trợ nhiều dòng cùng dịch vụ.
- Việc thay đổi dịch vụ chỉ áp dụng cho kỳ hóa đơn phù hợp tiếp theo, không tự sửa hóa đơn cũ.

---

# 5. UTILITY MANAGEMENT – QUẢN LÝ ĐIỆN NƯỚC

## 5.1. GET – Danh sách chỉ số điện nước

**Endpoint:** `GET /api/v1/utility-readings`

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| roomId | integer | Lọc theo phòng |
| utilityType | string | ELECTRICITY / WATER |
| fromDate | date | Từ ngày |
| toDate | date | Đến ngày |
| page | integer | Trang |
| limit | integer | Số bản ghi |

**Request:**

```http
GET /api/v1/utility-readings?roomId=101&utilityType=ELECTRICITY
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy chỉ số thành công",
  "data": [
    {
      "id": 1,
      "roomId": 101,
      "utilityType": "ELECTRICITY",
      "previousIndex": 1200,
      "currentIndex": 1350,
      "consumption": 150,
      "recordedDate": "2026-10-31",
      "period": "2026-10",
      "status": "CONFIRMED"
    }
  ]
}
```

## 5.2. POST – Ghi chỉ số điện nước

**Endpoint:** `POST /api/v1/utility-readings`

**Request:**

```json
{
  "roomId": 101,
  "utilityType": "ELECTRICITY",
  "meterId": 1,
  "previousIndex": 1200,
  "currentIndex": 1350,
  "recordedDate": "2026-10-31",
  "period": "2026-10",
  "note": "Ghi chỉ số cuối tháng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ghi chỉ số thành công",
  "data": {
    "id": 1,
    "roomId": 101,
    "utilityType": "ELECTRICITY",
    "previousIndex": 1200,
    "currentIndex": 1350,
    "consumption": 150,
    "period": "2026-10",
    "status": "CONFIRMED"
  }
}
```

**Công thức:**

```text
Lượng tiêu thụ = Chỉ số hiện tại - Chỉ số trước đó
```

Ví dụ:

```text
Chỉ số trước: 1200
Chỉ số hiện tại: 1350

Lượng điện tiêu thụ = 1350 - 1200 = 150 kWh
```

**Validation:**

- Phòng và đồng hồ phải tồn tại.
- Chỉ số không được âm.
- Chỉ số hiện tại không được nhỏ hơn chỉ số trước, trừ trường hợp thay đồng hồ hoặc có quy trình xử lý chỉ số đặc biệt.
- Không ghi trùng chỉ số cho cùng đồng hồ và kỳ ghi.
- Chỉ số đã được dùng để phát hành hóa đơn không được sửa trực tiếp; cần quy trình điều chỉnh có lưu lịch sử.

## 5.3. PUT – Cập nhật chỉ số

**Endpoint:** `PUT /api/v1/utility-readings/{id}`

**Request:**

```json
{
  "previousIndex": 1200,
  "currentIndex": 1360,
  "recordedDate": "2026-10-31",
  "note": "Điều chỉnh theo ảnh đồng hồ"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật chỉ số thành công",
  "data": {
    "id": 1,
    "previousIndex": 1200,
    "currentIndex": 1360,
    "consumption": 160,
    "status": "CONFIRMED"
  }
}
```

**Lưu ý:** Nếu chỉ số đã được đưa vào hóa đơn đã phát hành, API cần từ chối sửa trực tiếp hoặc yêu cầu thực hiện điều chỉnh hóa đơn theo quy trình.

## 5.4. GET – Lịch sử điện nước của phòng

**Endpoint:** `GET /api/v1/rooms/{roomId}/utility-readings`

**Request:**

```http
GET /api/v1/rooms/101/utility-readings?fromDate=2026-01-01&toDate=2026-12-31
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch sử điện nước thành công",
  "data": [
    {
      "period": "2026-09",
      "electricityConsumption": 140,
      "waterConsumption": 12
    },
    {
      "period": "2026-10",
      "electricityConsumption": 150,
      "waterConsumption": 15
    }
  ]
}
```

## 5.5. POST – Thay đồng hồ điện nước

**Endpoint:** `POST /api/v1/meters/{meterId}/replacement`

**Mục đích:** Lưu lịch sử thay đồng hồ, tránh tính sai lượng tiêu thụ khi chỉ số đồng hồ mới bắt đầu lại từ đầu.

**Request:**

```json
{
  "replacementDate": "2026-11-01",
  "oldMeterFinalIndex": 1500,
  "newMeterInitialIndex": 0,
  "reason": "Đồng hồ cũ bị hỏng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ghi nhận thay đồng hồ thành công",
  "data": {
    "meterId": 1,
    "replacementDate": "2026-11-01",
    "oldMeterFinalIndex": 1500,
    "newMeterInitialIndex": 0,
    "status": "REPLACED"
  }
}
```

**Quy tắc:**

- Lưu chỉ số chốt của đồng hồ cũ.
- Lưu chỉ số bắt đầu của đồng hồ mới.
- Không lấy chỉ số đồng hồ mới trừ trực tiếp chỉ số đồng hồ cũ.
- Lượng tiêu thụ phải được tính theo từng đồng hồ và từng khoảng thời gian.
- Việc thay đồng hồ phải có người thực hiện và lý do.

---

# 6. UTILITY PRICING – QUẢN LÝ GIÁ ĐIỆN NƯỚC LŨY TIẾN

## 6.1. GET – Lấy bảng giá điện nước

**Endpoint:** `GET /api/v1/utility-pricing`

**Request:**

```http
GET /api/v1/utility-pricing?utilityType=ELECTRICITY
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy bảng giá thành công",
  "data": {
    "id": 1,
    "utilityType": "ELECTRICITY",
    "effectiveFrom": "2026-01-01",
    "effectiveTo": null,
    "tiers": [
      {
        "fromUnit": 1,
        "toUnit": 50,
        "price": 1800
      },
      {
        "fromUnit": 51,
        "toUnit": 100,
        "price": 2000
      },
      {
        "fromUnit": 101,
        "toUnit": null,
        "price": 2500
      }
    ]
  }
}
```

## 6.2. POST – Tạo bảng giá lũy tiến

**Endpoint:** `POST /api/v1/utility-pricing`

**Request:**

```json
{
  "utilityType": "ELECTRICITY",
  "effectiveFrom": "2026-11-01",
  "tiers": [
    {
      "fromUnit": 1,
      "toUnit": 50,
      "price": 1800
    },
    {
      "fromUnit": 51,
      "toUnit": 100,
      "price": 2000
    },
    {
      "fromUnit": 101,
      "toUnit": null,
      "price": 2500
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo bảng giá thành công",
  "data": {
    "id": 2,
    "utilityType": "ELECTRICITY",
    "effectiveFrom": "2026-11-01",
    "tiers": [
      {
        "fromUnit": 1,
        "toUnit": 50,
        "price": 1800
      },
      {
        "fromUnit": 51,
        "toUnit": 100,
        "price": 2000
      },
      {
        "fromUnit": 101,
        "toUnit": null,
        "price": 2500
      }
    ]
  }
}
```

**Validation:**

- Giá phải lớn hơn hoặc bằng 0.
- Bậc đầu tiên bắt đầu từ đơn vị 1.
- Các bậc phải liên tục, không trùng và không bị chồng lấn.
- Chỉ bậc cuối cùng được phép không giới hạn đơn vị.
- Thời gian hiệu lực không được xung đột với bảng giá khác cùng loại, trừ khi hệ thống có quy tắc ưu tiên rõ ràng.

## 6.3. PUT – Cập nhật bảng giá

**Endpoint:** `PUT /api/v1/utility-pricing/{id}`

**Request:**

```json
{
  "effectiveFrom": "2026-11-01",
  "tiers": [
    {
      "fromUnit": 1,
      "toUnit": 50,
      "price": 1900
    },
    {
      "fromUnit": 51,
      "toUnit": 100,
      "price": 2100
    },
    {
      "fromUnit": 101,
      "toUnit": null,
      "price": 2600
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật bảng giá thành công",
  "data": {
    "id": 2,
    "status": "ACTIVE"
  }
}
```

**Lưu ý:** Không thay đổi đơn giá đã được lưu trong hóa đơn cũ. Bảng giá mới chỉ áp dụng cho kỳ có ngày hiệu lực phù hợp.

## 6.4. POST – Tính tiền điện nước lũy tiến

**Endpoint:** `POST /api/v1/utility-pricing/calculate`

**Request:**

```json
{
  "utilityType": "ELECTRICITY",
  "consumption": 120,
  "pricingId": 1
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tính tiền thành công",
  "data": {
    "utilityType": "ELECTRICITY",
    "consumption": 120,
    "breakdown": [
      {
        "fromUnit": 1,
        "toUnit": 50,
        "usedUnit": 50,
        "price": 1800,
        "amount": 90000
      },
      {
        "fromUnit": 51,
        "toUnit": 100,
        "usedUnit": 50,
        "price": 2000,
        "amount": 100000
      },
      {
        "fromUnit": 101,
        "toUnit": null,
        "usedUnit": 20,
        "price": 2500,
        "amount": 50000
      }
    ],
    "totalAmount": 240000
  }
}
```

**Cách tính:**

```text
50 x 1.800 = 90.000
50 x 2.000 = 100.000
20 x 2.500 = 50.000

Tổng tiền = 240.000 VND
```

**Lưu ý:** Đây là số liệu minh họa để kiểm thử thuật toán, không phải bảng giá bắt buộc hoặc giá chính thức.

---

# 7. INVOICE MANAGEMENT – QUẢN LÝ HÓA ĐƠN

## 7.1. GET – Danh sách hóa đơn

**Endpoint:** `GET /api/v1/invoices`

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| roomId | integer | Lọc theo phòng |
| contractId | integer | Lọc theo hợp đồng |
| status | string | UNPAID / PARTIAL / PAID / CANCELLED |
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| page | integer | Trang |
| limit | integer | Số bản ghi |

**Request:**

```http
GET /api/v1/invoices?roomId=101&status=UNPAID&page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách hóa đơn thành công",
  "data": [
    {
      "id": 1,
      "invoiceCode": "INV-2026-001",
      "roomId": 101,
      "contractId": 10,
      "period": "2026-10",
      "totalAmount": 2500000,
      "paidAmount": 0,
      "remainingAmount": 2500000,
      "status": "UNPAID",
      "dueDate": "2026-11-05"
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

## 7.2. GET – Chi tiết hóa đơn

**Endpoint:** `GET /api/v1/invoices/{id}`

**Request:**

```http
GET /api/v1/invoices/1
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy chi tiết hóa đơn thành công",
  "data": {
    "id": 1,
    "invoiceCode": "INV-2026-001",
    "roomId": 101,
    "contractId": 10,
    "period": "2026-10",
    "createdDate": "2026-10-31",
    "dueDate": "2026-11-05",
    "items": [
      {
        "name": "Tiền phòng",
        "quantity": 1,
        "unitPrice": 2000000,
        "amount": 2000000
      },
      {
        "name": "Tiền điện",
        "quantity": 120,
        "unitPrice": null,
        "amount": 240000
      },
      {
        "name": "Tiền nước",
        "quantity": 15,
        "unitPrice": 10000,
        "amount": 150000
      },
      {
        "name": "Internet",
        "quantity": 1,
        "unitPrice": 100000,
        "amount": 100000
      }
    ],
    "subtotal": 2490000,
    "discountAmount": 0,
    "adjustmentAmount": 0,
    "totalAmount": 2490000,
    "paidAmount": 0,
    "remainingAmount": 2490000,
    "status": "UNPAID"
  }
}
```

## 7.3. POST – Tạo hóa đơn

**Endpoint:** `POST /api/v1/invoices`

**Request:**

```json
{
  "roomId": 101,
  "contractId": 10,
  "period": "2026-10",
  "dueDate": "2026-11-05",
  "items": [
    {
      "itemType": "RENT",
      "description": "Tiền phòng tháng 10",
      "quantity": 1,
      "unitPrice": 2000000,
      "amount": 2000000
    },
    {
      "itemType": "ELECTRICITY",
      "description": "Tiền điện tháng 10",
      "quantity": 120,
      "unitPrice": null,
      "amount": 240000
    },
    {
      "itemType": "WATER",
      "description": "Tiền nước tháng 10",
      "quantity": 15,
      "unitPrice": 10000,
      "amount": 150000
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo hóa đơn thành công",
  "data": {
    "id": 1,
    "invoiceCode": "INV-2026-001",
    "roomId": 101,
    "period": "2026-10",
    "subtotal": 2390000,
    "discountAmount": 0,
    "adjustmentAmount": 0,
    "totalAmount": 2390000,
    "paidAmount": 0,
    "remainingAmount": 2390000,
    "status": "UNPAID"
  }
}
```

**Validation:**

- Phòng phải tồn tại.
- Hợp đồng phải hợp lệ và thuộc phòng đó.
- Kỳ hóa đơn phải phù hợp thời gian thuê.
- Không tạo hóa đơn trùng cho cùng hợp đồng và kỳ thanh toán, trừ khi có nghiệp vụ hóa đơn bổ sung được thiết kế riêng.
- Số lượng và đơn giá không được âm.
- Tổng tiền phải được hệ thống kiểm tra lại từ các dòng chi tiết.
- Không tin tưởng tổng tiền do client gửi lên; server phải tự tính và xác nhận.

## 7.4. PUT – Cập nhật hóa đơn

**Endpoint:** `PUT /api/v1/invoices/{id}`

**Request:**

```json
{
  "dueDate": "2026-11-10",
  "items": [
    {
      "itemType": "RENT",
      "description": "Tiền phòng tháng 10",
      "quantity": 1,
      "unitPrice": 2000000
    },
    {
      "itemType": "ELECTRICITY",
      "description": "Tiền điện tháng 10",
      "quantity": 120,
      "unitPrice": null
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Cập nhật hóa đơn thành công",
  "data": {
    "id": 1,
    "invoiceCode": "INV-2026-001",
    "totalAmount": 2240000,
    "status": "UNPAID"
  }
}
```

**Quy tắc:** Chỉ cho sửa hóa đơn ở trạng thái cho phép chỉnh sửa. Nếu hóa đơn đã phát hành hoặc đã có thanh toán, nên sử dụng API điều chỉnh thay vì ghi đè dữ liệu cũ.

## 7.5. PATCH – Hủy hóa đơn

**Endpoint:** `PATCH /api/v1/invoices/{id}/cancel`

**Request:**

```json
{
  "reason": "Tạo nhầm hóa đơn"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Hủy hóa đơn thành công",
  "data": {
    "id": 1,
    "status": "CANCELLED",
    "cancelReason": "Tạo nhầm hóa đơn"
  }
}
```

**Quy tắc:**

- Không hủy hóa đơn đã thanh toán nếu chưa xử lý giao dịch liên quan.
- Không xóa lịch sử hóa đơn.
- Lưu người hủy, thời gian và lý do.

## 7.6. GET – Hóa đơn theo phòng

**Endpoint:** `GET /api/v1/rooms/{roomId}/invoices`

**Response:**

```json
{
  "success": true,
  "message": "Lấy hóa đơn phòng thành công",
  "data": [
    {
      "id": 1,
      "invoiceCode": "INV-2026-001",
      "period": "2026-10",
      "totalAmount": 2390000,
      "status": "UNPAID"
    }
  ]
}
```

## 7.7. GET – Hóa đơn theo hợp đồng

**Endpoint:** `GET /api/v1/contracts/{contractId}/invoices`

**Response:**

```json
{
  "success": true,
  "message": "Lấy hóa đơn hợp đồng thành công",
  "data": [
    {
      "id": 1,
      "invoiceCode": "INV-2026-001",
      "period": "2026-10",
      "totalAmount": 2390000,
      "status": "UNPAID"
    }
  ]
}
```

---

# 8. BILLING AUTOMATION – TẠO HÓA ĐƠN ĐỊNH KỲ

## 8.1. POST – Tạo hóa đơn định kỳ

**Endpoint:** `POST /api/v1/invoices/generate`

**Mục đích:** Tự động tạo hóa đơn cho các hợp đồng đang có hiệu lực theo chu kỳ thanh toán.

**Request:**

```json
{
  "period": "2026-11",
  "dueDate": "2026-11-05",
  "roomIds": [101, 102],
  "includeUtilities": true,
  "includeServices": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Đã thực hiện tạo hóa đơn định kỳ",
  "data": {
    "generationRunId": 1001,
    "period": "2026-11",
    "totalRooms": 2,
    "successCount": 2,
    "failedCount": 0,
    "invoices": [
      {
        "roomId": 101,
        "invoiceId": 11,
        "invoiceCode": "INV-2026-011",
        "totalAmount": 2500000,
        "status": "CREATED"
      },
      {
        "roomId": 102,
        "invoiceId": 12,
        "invoiceCode": "INV-2026-012",
        "totalAmount": 1800000,
        "status": "CREATED"
      }
    ]
  }
}
```

## 8.2. GET – Kiểm tra lịch sử tạo hóa đơn

**Endpoint:** `GET /api/v1/invoice-generation-runs/{id}`

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch sử tạo hóa đơn thành công",
  "data": {
    "generationRunId": 1001,
    "period": "2026-11",
    "status": "COMPLETED",
    "totalRooms": 2,
    "successCount": 2,
    "failedCount": 0,
    "createdAt": "2026-11-01T01:00:00Z"
  }
}
```

## 8.3. Quy trình tạo hóa đơn tự động

```text
BẮT ĐẦU
   |
   v
Lấy danh sách hợp đồng còn hiệu lực
   |
   v
Kiểm tra kỳ thanh toán
   |
   v
Lấy tiền thuê phòng
   |
   v
Lấy chỉ số điện nước
   |
   v
Tính tiền điện nước lũy tiến
   |
   v
Lấy các dịch vụ đã gán cho phòng
   |
   v
Tính tổng tiền
   |
   v
Kiểm tra hóa đơn trùng
   |
   v
Tạo hóa đơn và chi tiết hóa đơn
   |
   v
Lưu lịch sử tạo hóa đơn
   |
   v
KẾT THÚC
```

**Quy tắc quan trọng:**

- Một hợp đồng không được có hai hóa đơn định kỳ trùng kỳ.
- Tạo hóa đơn và các dòng chi tiết trong cùng một transaction.
- Nếu tạo hóa đơn cho nhiều phòng, phải lưu kết quả thành công và thất bại của từng phòng.
- Có thể chạy lại quy trình mà không tạo hóa đơn trùng.
- Lưu bản chụp đơn giá, số lượng, kỳ tính tiền và công thức tính tại thời điểm phát hành.

---

# 9. MID-MONTH BILLING – TÍNH TIỀN KHI VÀO HOẶC TRẢ PHÒNG GIỮA THÁNG

## 9.1. Nguyên tắc

Khi người thuê bắt đầu hoặc kết thúc hợp đồng giữa tháng, hệ thống cần áp dụng chính sách tính tiền được quy định trong hợp đồng.

Có thể chọn một trong hai cách:

1. Tính theo số ngày thực tế trong tháng.
2. Tính theo quy ước tháng 30 ngày.

Dự án phải chọn và áp dụng thống nhất, không tự ý thay đổi cách tính giữa các hợp đồng.

## 9.2. POST – Tính tiền thuê theo ngày

**Endpoint:** `POST /api/v1/billing/calculate-proration`

**Request:**

```json
{
  "contractId": 10,
  "monthlyRent": 2000000,
  "periodStart": "2026-10-01",
  "periodEnd": "2026-10-31",
  "moveInDate": "2026-10-10",
  "moveOutDate": null,
  "prorationMethod": "CALENDAR_DAYS"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tính tiền thuê theo ngày thành công",
  "data": {
    "monthlyRent": 2000000,
    "totalDaysInPeriod": 31,
    "billableDays": 22,
    "dailyRate": 64516.13,
    "rentAmount": 1419355,
    "prorationMethod": "CALENDAR_DAYS"
  }
}
```

**Công thức minh họa:**

```text
Đơn giá ngày = Tiền thuê tháng / Số ngày của tháng

Tiền thuê phải trả =
Đơn giá ngày x Số ngày thực tế phải thanh toán
```

Kết quả làm tròn đến đơn vị VND theo quy tắc làm tròn được cấu hình trong hệ thống.

**Lưu ý:** Cách xác định ngày bắt đầu và kết thúc tính tiền phải thống nhất với hợp đồng. Ví dụ trên tính từ ngày 10 đến hết ngày 31, bao gồm cả hai ngày.

---

# 10. PAYMENT MANAGEMENT – QUẢN LÝ THANH TOÁN

## 10.1. GET – Danh sách thanh toán

**Endpoint:** `GET /api/v1/payments`

**Query Parameters:**

| Tham số | Kiểu | Mô tả |
|---|---|---|
| invoiceId | integer | Lọc theo hóa đơn |
| roomId | integer | Lọc theo phòng |
| paymentMethod | string | CASH / BANK_TRANSFER |
| fromDate | date | Từ ngày |
| toDate | date | Đến ngày |
| page | integer | Trang |
| limit | integer | Số bản ghi |

**Request:**

```http
GET /api/v1/payments?invoiceId=1&page=1&limit=10
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách thanh toán thành công",
  "data": [
    {
      "id": 1,
      "invoiceId": 1,
      "amount": 1000000,
      "paymentMethod": "BANK_TRANSFER",
      "transactionCode": "TXN001",
      "paymentDate": "2026-11-02T09:00:00Z",
      "status": "SUCCESS"
    }
  ]
}
```

## 10.2. POST – Ghi nhận thanh toán

**Endpoint:** `POST /api/v1/payments`

**Request:**

```json
{
  "invoiceId": 1,
  "amount": 1000000,
  "paymentMethod": "BANK_TRANSFER",
  "transactionCode": "TXN001",
  "note": "Thanh toán tiền phòng tháng 10"
}
```

**Header chống ghi nhận trùng:**

```http
Idempotency-Key: payment-invoice-1-txn001
```

**Response:**

```json
{
  "success": true,
  "message": "Ghi nhận thanh toán thành công",
  "data": {
    "id": 1,
    "invoiceId": 1,
    "amount": 1000000,
    "paymentMethod": "BANK_TRANSFER",
    "status": "SUCCESS",
    "invoice": {
      "totalAmount": 2390000,
      "paidAmount": 1000000,
      "remainingAmount": 1390000,
      "status": "PARTIAL"
    }
  }
}
```

**Validation:**

- Hóa đơn phải tồn tại và chưa bị hủy.
- Số tiền thanh toán phải lớn hơn 0.
- Không được thanh toán vượt số tiền còn nợ nếu hệ thống không hỗ trợ tiền trả trước.
- Mã giao dịch phải được kiểm tra trùng nếu có.
- Không được ghi nhận cùng một giao dịch ngân hàng hai lần.
- Phải lưu người ghi nhận và thời gian giao dịch.

## 10.3. GET – Lịch sử thanh toán hóa đơn

**Endpoint:** `GET /api/v1/invoices/{invoiceId}/payments`

**Response:**

```json
{
  "success": true,
  "message": "Lấy lịch sử thanh toán thành công",
  "data": [
    {
      "id": 1,
      "amount": 1000000,
      "paymentMethod": "BANK_TRANSFER",
      "paymentDate": "2026-11-02T09:00:00Z",
      "status": "SUCCESS"
    },
    {
      "id": 2,
      "amount": 1390000,
      "paymentMethod": "CASH",
      "paymentDate": "2026-11-03T10:00:00Z",
      "status": "SUCCESS"
    }
  ]
}
```

## 10.4. GET – Tổng hợp thanh toán

**Endpoint:** `GET /api/v1/payments/summary`

**Request:**

```http
GET /api/v1/payments/summary?fromDate=2026-11-01&toDate=2026-11-30
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy tổng hợp thanh toán thành công",
  "data": {
    "totalTransactions": 20,
    "totalAmount": 35000000,
    "cashAmount": 15000000,
    "bankTransferAmount": 20000000
  }
}
```

---

# 11. DEPOSIT MANAGEMENT – QUẢN LÝ TIỀN ĐẶT CỌC

## 11.1. GET – Danh sách tiền cọc

**Endpoint:** `GET /api/v1/deposits`

**Request:**

```http
GET /api/v1/deposits?status=HELD
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy danh sách tiền cọc thành công",
  "data": [
    {
      "id": 1,
      "contractId": 10,
      "roomId": 101,
      "agreedAmount": 4000000,
      "receivedAmount": 4000000,
      "status": "HELD",
      "receivedDate": "2026-10-01"
    }
  ]
}
```

## 11.2. GET – Chi tiết tiền cọc

**Endpoint:** `GET /api/v1/deposits/{id}`

**Response:**

```json
{
  "success": true,
  "message": "Lấy chi tiết tiền cọc thành công",
  "data": {
    "id": 1,
    "contractId": 10,
    "agreedAmount": 4000000,
    "receivedAmount": 4000000,
    "settledAmount": 0,
    "refundedAmount": 0,
    "remainingAmount": 4000000,
    "status": "HELD"
  }
}
```

## 11.3. POST – Ghi nhận nhận tiền cọc

**Endpoint:** `POST /api/v1/deposits`

**Request:**

```json
{
  "contractId": 10,
  "agreedAmount": 4000000,
  "receivedAmount": 4000000,
  "paymentMethod": "CASH",
  "receivedDate": "2026-10-01",
  "note": "Nhận tiền cọc khi ký hợp đồng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ghi nhận tiền cọc thành công",
  "data": {
    "id": 1,
    "contractId": 10,
    "agreedAmount": 4000000,
    "receivedAmount": 4000000,
    "status": "HELD"
  }
}
```

## 11.4. PATCH – Quyết toán tiền cọc

**Endpoint:** `PATCH /api/v1/deposits/{id}/settle`

**Mục đích:** Xử lý tiền cọc khi người thuê kết thúc hợp đồng.

**Request:**

```json
{
  "deductions": [
    {
      "type": "DAMAGE",
      "description": "Chi phí sửa chữa tài sản",
      "amount": 300000
    },
    {
      "type": "UNPAID_INVOICE",
      "description": "Hóa đơn còn nợ",
      "amount": 200000
    }
  ],
  "refundAmount": 3500000,
  "note": "Quyết toán tiền cọc khi trả phòng"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Quyết toán tiền cọc thành công",
  "data": {
    "depositId": 1,
    "receivedAmount": 4000000,
    "totalDeductions": 500000,
    "refundAmount": 3500000,
    "status": "SETTLED"
  }
}
```

**Công thức:**

```text
Tiền hoàn lại =
Tiền cọc đã nhận - Tổng khoản khấu trừ
```

**Validation:**

- Tổng khấu trừ không được lớn hơn số tiền cọc đã nhận.
- Tiền hoàn lại không được âm.
- Tiền hoàn lại cộng khoản khấu trừ phải bằng số tiền cọc được quyết toán.
- Không quyết toán lặp lại cùng một khoản cọc.
- Các khoản khấu trừ phải có lý do và lịch sử.

---

# 12. INVOICE ADJUSTMENT – ĐIỀU CHỈNH HÓA ĐƠN

## 12.1. POST – Tạo yêu cầu điều chỉnh hóa đơn

**Endpoint:** `POST /api/v1/invoices/{invoiceId}/adjustments`

**Mục đích:** Xử lý trường hợp hóa đơn sai tiền điện, nước, dịch vụ hoặc tiền phòng.

**Request:**

```json
{
  "adjustmentType": "DECREASE",
  "amount": 100000,
  "reason": "Ghi nhầm tiền nước",
  "description": "Điều chỉnh giảm tiền nước tháng 10"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo yêu cầu điều chỉnh thành công",
  "data": {
    "id": 1,
    "invoiceId": 1,
    "adjustmentType": "DECREASE",
    "amount": 100000,
    "reason": "Ghi nhầm tiền nước",
    "status": "PENDING"
  }
}
```

## 12.2. PATCH – Xác nhận điều chỉnh hóa đơn

**Endpoint:** `PATCH /api/v1/invoice-adjustments/{id}/approve`

**Request:**

```json
{
  "note": "Đã kiểm tra và xác nhận số tiền điều chỉnh"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Xác nhận điều chỉnh thành công",
  "data": {
    "id": 1,
    "status": "APPROVED",
    "adjustmentAmount": -100000
  }
}
```

**Quy tắc:**

- Không sửa trực tiếp dữ liệu lịch sử của hóa đơn đã phát hành.
- Lưu số tiền trước và sau điều chỉnh.
- Lưu lý do, người tạo và người xác nhận.
- Nếu hóa đơn đã thanh toán, phải tính lại số tiền còn phải thu hoặc số tiền cần hoàn.
- Việc điều chỉnh không được làm mất lịch sử thanh toán.

---

# 13. REFUND MANAGEMENT – QUẢN LÝ HOÀN TIỀN

## 13.1. POST – Tạo yêu cầu hoàn tiền

**Endpoint:** `POST /api/v1/payments/{paymentId}/refunds`

**Request:**

```json
{
  "amount": 200000,
  "reason": "Khách thanh toán thừa",
  "refundMethod": "BANK_TRANSFER"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Tạo yêu cầu hoàn tiền thành công",
  "data": {
    "id": 1,
    "paymentId": 1,
    "amount": 200000,
    "reason": "Khách thanh toán thừa",
    "status": "PENDING"
  }
}
```

## 13.2. PATCH – Xác nhận hoàn tiền

**Endpoint:** `PATCH /api/v1/refunds/{id}/complete`

**Request:**

```json
{
  "transactionCode": "REFUND001",
  "completedDate": "2026-11-05"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Hoàn tiền thành công",
  "data": {
    "id": 1,
    "paymentId": 1,
    "amount": 200000,
    "status": "COMPLETED",
    "transactionCode": "REFUND001"
  }
}
```

**Validation:**

- Không hoàn vượt số tiền đã thanh toán và chưa được hoàn.
- Không hoàn một giao dịch đã hoàn toàn bộ.
- Ghi nhận người thực hiện, thời gian và mã giao dịch.
- Nếu kết nối ngân hàng chưa được tích hợp, trạng thái hoàn tiền chỉ được chuyển thành hoàn tất sau khi người có quyền xác nhận giao dịch thực tế.

---

# 14. FINANCIAL REPORTS – BÁO CÁO TÀI CHÍNH

## 14.1. GET – Báo cáo doanh thu

**Endpoint:** `GET /api/v1/financial-reports/revenue`

**Request:**

```http
GET /api/v1/financial-reports/revenue?fromDate=2026-01-01&toDate=2026-12-31
```

**Response:**

```json
{
  "success": true,
  "message": "Lấy báo cáo doanh thu thành công",
  "data": {
    "totalRevenue": 150000000,
    "rentRevenue": 120000000,
    "serviceRevenue": 15000000,
    "utilityRevenue": 15000000,
    "totalPaid": 130000000,
    "totalUnpaid": 20000000
  }
}
```

## 14.2. GET – Báo cáo công nợ

**Endpoint:** `GET /api/v1/financial-reports/debts`

**Response:**

```json
{
  "success": true,
  "message": "Lấy báo cáo công nợ thành công",
  "data": [
    {
      "roomId": 101,
      "roomName": "P101",
      "tenantName": "Nguyễn Văn A",
      "totalInvoice": 2500000,
      "paidAmount": 1000000,
      "remainingAmount": 1500000,
      "status": "PARTIAL"
    }
  ]
}
```

## 14.3. GET – Báo cáo tiền cọc

**Endpoint:** `GET /api/v1/financial-reports/deposits`

**Response:**

```json
{
  "success": true,
  "message": "Lấy báo cáo tiền cọc thành công",
  "data": {
    "totalDepositReceived": 40000000,
    "totalDepositHeld": 30000000,
    "totalRefunded": 8000000,
    "totalDeducted": 2000000
  }
}
```

**Lưu ý:** Báo cáo doanh thu phải phân biệt số tiền đã lập hóa đơn và số tiền thực tế đã thu. Tiền cọc không mặc nhiên được tính là doanh thu tiền thuê.

---

# 15. DATABASE DESIGN – THIẾT KẾ CƠ SỞ DỮ LIỆU

## 15.1. Bảng Services

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| owner_id | BIGINT | Chủ nhà |
| name | VARCHAR(255) | Tên dịch vụ |
| service_type | VARCHAR(50) | FIXED / USAGE_BASED |
| unit | VARCHAR(50) | Đơn vị |
| price | DECIMAL(15,2) | Đơn giá |
| status | VARCHAR(30) | ACTIVE / INACTIVE |
| description | TEXT | Mô tả |
| created_at | DATETIME | Ngày tạo |
| updated_at | DATETIME | Ngày cập nhật |

## 15.2. Bảng Room_Services

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| room_id | BIGINT | Phòng |
| service_id | BIGINT | Dịch vụ |
| price | DECIMAL(15,2) | Giá áp dụng |
| quantity | DECIMAL(12,2) | Số lượng |
| billing_type | VARCHAR(50) | Cách tính phí |
| status | VARCHAR(30) | Trạng thái |
| effective_from | DATE | Ngày bắt đầu |
| effective_to | DATE | Ngày kết thúc |

## 15.3. Bảng Meters

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| room_id | BIGINT | Phòng |
| utility_type | VARCHAR(30) | ELECTRICITY / WATER |
| meter_code | VARCHAR(100) | Mã đồng hồ |
| installed_date | DATE | Ngày lắp |
| initial_index | DECIMAL(15,3) | Chỉ số ban đầu |
| status | VARCHAR(30) | ACTIVE / REPLACED |

## 15.4. Bảng Meter_Replacements

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| old_meter_id | BIGINT | Đồng hồ cũ |
| new_meter_id | BIGINT | Đồng hồ mới |
| replacement_date | DATE | Ngày thay |
| old_final_index | DECIMAL(15,3) | Chỉ số cuối |
| new_initial_index | DECIMAL(15,3) | Chỉ số đầu |
| reason | TEXT | Lý do |
| created_by | BIGINT | Người thực hiện |

## 15.5. Bảng Utility_Readings

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| meter_id | BIGINT | Đồng hồ |
| room_id | BIGINT | Phòng |
| utility_type | VARCHAR(30) | Loại |
| previous_index | DECIMAL(15,3) | Chỉ số cũ |
| current_index | DECIMAL(15,3) | Chỉ số mới |
| consumption | DECIMAL(15,3) | Lượng tiêu thụ |
| period | VARCHAR(7) | Kỳ |
| recorded_date | DATE | Ngày ghi |
| status | VARCHAR(30) | Trạng thái |

## 15.6. Bảng Utility_Pricing

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| owner_id | BIGINT | Chủ nhà |
| utility_type | VARCHAR(30) | Điện / nước |
| effective_from | DATE | Hiệu lực từ |
| effective_to | DATE | Hiệu lực đến |
| status | VARCHAR(30) | Trạng thái |

## 15.7. Bảng Utility_Pricing_Tiers

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| pricing_id | BIGINT | Bảng giá |
| from_unit | DECIMAL(15,3) | Bắt đầu |
| to_unit | DECIMAL(15,3) | Kết thúc |
| price | DECIMAL(15,2) | Đơn giá |

## 15.8. Bảng Invoices

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| invoice_code | VARCHAR(100) | Mã hóa đơn |
| contract_id | BIGINT | Hợp đồng |
| room_id | BIGINT | Phòng |
| period | VARCHAR(7) | Kỳ hóa đơn |
| subtotal | DECIMAL(15,2) | Tổng trước điều chỉnh |
| discount_amount | DECIMAL(15,2) | Giảm giá |
| adjustment_amount | DECIMAL(15,2) | Điều chỉnh |
| total_amount | DECIMAL(15,2) | Tổng tiền |
| paid_amount | DECIMAL(15,2) | Đã thanh toán |
| due_date | DATE | Hạn thanh toán |
| status | VARCHAR(30) | Trạng thái |
| created_at | DATETIME | Ngày tạo |

## 15.9. Bảng Invoice_Items

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| invoice_id | BIGINT | Hóa đơn |
| item_type | VARCHAR(50) | Loại khoản thu |
| description | TEXT | Mô tả |
| quantity | DECIMAL(12,3) | Số lượng |
| unit_price | DECIMAL(15,2) | Đơn giá |
| amount | DECIMAL(15,2) | Thành tiền |
| source_id | BIGINT | ID dữ liệu nguồn nếu có |

## 15.10. Bảng Payments

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| invoice_id | BIGINT | Hóa đơn |
| amount | DECIMAL(15,2) | Số tiền |
| payment_method | VARCHAR(50) | Phương thức |
| transaction_code | VARCHAR(150) | Mã giao dịch |
| idempotency_key | VARCHAR(150) | Khóa chống trùng |
| payment_date | DATETIME | Ngày thanh toán |
| status | VARCHAR(30) | Trạng thái |
| created_by | BIGINT | Người ghi nhận |

## 15.11. Bảng Deposits

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| contract_id | BIGINT | Hợp đồng |
| agreed_amount | DECIMAL(15,2) | Tiền cọc theo hợp đồng |
| received_amount | DECIMAL(15,2) | Tiền thực nhận |
| status | VARCHAR(30) | Trạng thái |
| received_date | DATE | Ngày nhận |

## 15.12. Bảng Deposit_Settlements

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| deposit_id | BIGINT | Khoản cọc |
| deduction_type | VARCHAR(50) | Loại khấu trừ |
| description | TEXT | Lý do |
| amount | DECIMAL(15,2) | Số tiền |
| refund_amount | DECIMAL(15,2) | Tiền hoàn |
| settled_date | DATE | Ngày quyết toán |
| created_by | BIGINT | Người xử lý |

## 15.13. Bảng Invoice_Generation_Runs

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| period | VARCHAR(7) | Kỳ tạo |
| status | VARCHAR(30) | RUNNING / COMPLETED / FAILED |
| total_rooms | INT | Tổng phòng |
| success_count | INT | Thành công |
| failed_count | INT | Thất bại |
| started_at | DATETIME | Bắt đầu |
| completed_at | DATETIME | Kết thúc |

## 15.14. Bảng Invoice_Adjustments

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| invoice_id | BIGINT | Hóa đơn |
| adjustment_type | VARCHAR(30) | INCREASE / DECREASE |
| amount | DECIMAL(15,2) | Số tiền |
| reason | TEXT | Lý do |
| status | VARCHAR(30) | PENDING / APPROVED / REJECTED |
| created_by | BIGINT | Người tạo |
| approved_by | BIGINT | Người xác nhận |

## 15.15. Bảng Refunds

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | BIGINT | Khóa chính |
| payment_id | BIGINT | Giao dịch gốc |
| amount | DECIMAL(15,2) | Tiền hoàn |
| reason | TEXT | Lý do |
| refund_method | VARCHAR(50) | Phương thức |
| transaction_code | VARCHAR(150) | Mã giao dịch hoàn |
| status | VARCHAR(30) | PENDING / COMPLETED / FAILED |
| completed_at | DATETIME | Thời gian hoàn tất |

---

# 16. DATABASE RELATIONSHIPS – QUAN HỆ GIỮA CÁC BẢNG

```text
ROOMS
  |
  | 1 - N
  v
ROOM_SERVICES
  |
  | N - 1
  v
SERVICES


ROOMS
  |
  | 1 - N
  v
METERS
  |
  | 1 - N
  v
UTILITY_READINGS


UTILITY_PRICING
  |
  | 1 - N
  v
UTILITY_PRICING_TIERS


CONTRACTS
  |
  | 1 - N
  v
INVOICES
  |
  | 1 - N
  v
INVOICE_ITEMS


INVOICES
  |
  | 1 - N
  v
PAYMENTS
  |
  | 1 - N
  v
REFUNDS


CONTRACTS
  |
  | 1 - N
  v
DEPOSITS
  |
  | 1 - N
  v
DEPOSIT_SETTLEMENTS
```

**Các khóa ngoại chính:**

- `Room_Services.room_id` → `Rooms.id`
- `Room_Services.service_id` → `Services.id`
- `Meters.room_id` → `Rooms.id`
- `Utility_Readings.meter_id` → `Meters.id`
- `Utility_Pricing_Tiers.pricing_id` → `Utility_Pricing.id`
- `Invoices.contract_id` → `Contracts.id`
- `Invoice_Items.invoice_id` → `Invoices.id`
- `Payments.invoice_id` → `Invoices.id`
- `Deposits.contract_id` → `Contracts.id`
- `Deposit_Settlements.deposit_id` → `Deposits.id`
- `Refunds.payment_id` → `Payments.id`

---

# 17. BUSINESS RULES – QUY TẮC NGHIỆP VỤ

## 17.1. Quy tắc hóa đơn

- Một hợp đồng không được có hai hóa đơn định kỳ trùng kỳ.
- Hóa đơn phải có ít nhất một dòng chi tiết.
- Tổng hóa đơn phải bằng tổng các dòng chi tiết sau khi áp dụng giảm giá và điều chỉnh.
- Hóa đơn đã thanh toán phải được bảo toàn lịch sử.
- Khi giá dịch vụ thay đổi, hóa đơn cũ không bị thay đổi.
- Hóa đơn quá hạn có thể được xác định dựa trên hạn thanh toán và số tiền còn nợ.

## 17.2. Quy tắc thanh toán

- Mỗi giao dịch thanh toán phải gắn với một hóa đơn hoặc một nghiệp vụ thu tiền được định nghĩa rõ.
- Không ghi nhận giao dịch trùng.
- Không xóa giao dịch tài chính đã thành công.
- Nếu cần hoàn tiền, tạo bản ghi hoàn tiền riêng.
- Số tiền đã thanh toán được tính từ các giao dịch thành công trừ các khoản hoàn tiền đã hoàn tất.

## 17.3. Quy tắc tiền cọc

- Tiền cọc phải gắn với hợp đồng.
- Tiền nhận thực tế không được lớn hơn số tiền đã thỏa thuận nếu hợp đồng không cho phép.
- Khoản khấu trừ phải có lý do.
- Không hoàn vượt số tiền cọc còn lại.
- Mỗi lần quyết toán phải được lưu lịch sử.

## 17.4. Quy tắc điện nước

- Chỉ số tiêu thụ phải được tính từ hai lần ghi chỉ số hợp lệ.
- Không cho phép ghi trùng kỳ cho cùng đồng hồ.
- Thay đồng hồ phải có lịch sử riêng.
- Bảng giá phải có thời gian hiệu lực.
- Hóa đơn lưu lại đơn giá đã sử dụng để tính tiền.

---

# 18. DATABASE CONSTRAINTS & INDEXES – RÀNG BUỘC VÀ CHỈ MỤC

Các ràng buộc nên có:

- `Invoices.invoice_code` là duy nhất trong phạm vi hệ thống.
- Cặp `Invoices.contract_id + Invoices.period` duy nhất đối với hóa đơn định kỳ.
- `Utility_Readings.meter_id + period` duy nhất nếu mỗi đồng hồ chỉ có một lần chốt chỉ số mỗi kỳ.
- `Payments.idempotency_key` duy nhất trong phạm vi phù hợp.
- Các trường tiền và số lượng không được âm.
- Khóa ngoại phải bảo đảm bản ghi liên quan tồn tại.
- Không xóa cứng dữ liệu đã phát sinh giao dịch tài chính.

**Các index nên có:**

```sql
CREATE INDEX idx_invoices_contract_period
ON Invoices(contract_id, period);

CREATE INDEX idx_invoices_room_status
ON Invoices(room_id, status);

CREATE INDEX idx_payments_invoice
ON Payments(invoice_id);

CREATE INDEX idx_utility_readings_room_period
ON Utility_Readings(room_id, period);

CREATE INDEX idx_deposits_contract
ON Deposits(contract_id);
```

Các lệnh SQL cần được điều chỉnh theo hệ quản trị cơ sở dữ liệu và cấu trúc thực tế của dự án.

---

# 19. TRANSACTION & DUPLICATE PREVENTION – GIAO DỊCH VÀ CHỐNG TRÙNG

## 19.1. Khi tạo hóa đơn

Các thao tác sau nên nằm trong một transaction:

1. Kiểm tra hợp đồng.
2. Kiểm tra kỳ hóa đơn.
3. Kiểm tra hóa đơn trùng.
4. Tính các khoản thu.
5. Tạo hóa đơn.
6. Tạo các dòng chi tiết.
7. Lưu lịch sử thao tác.

Nếu có lỗi giữa chừng, hệ thống phải rollback để tránh hóa đơn thiếu dữ liệu.

## 19.2. Khi thanh toán

Các thao tác sau cần được xử lý nguyên tử:

1. Kiểm tra hóa đơn.
2. Kiểm tra số tiền còn nợ.
3. Kiểm tra mã giao dịch và Idempotency-Key.
4. Tạo bản ghi thanh toán.
5. Cập nhật số tiền đã thanh toán.
6. Cập nhật trạng thái hóa đơn.
7. Ghi nhật ký.

Không chỉ dựa vào việc kiểm tra ở giao diện vì hai yêu cầu thanh toán có thể được gửi gần như đồng thời.

---

# 20. AUTHORIZATION – PHÂN QUYỀN

| Chức năng | Chủ nhà | Nhân viên được cấp quyền |
|---|---|---|
| Xem dịch vụ | Có | Có |
| Thêm dịch vụ | Có | Theo quyền |
| Sửa giá dịch vụ | Có | Theo quyền |
| Ghi chỉ số điện nước | Có | Có nếu được cấp quyền |
| Sửa bảng giá điện nước | Có | Theo quyền |
| Tạo hóa đơn | Có | Theo quyền |
| Hủy hóa đơn | Có | Theo quyền |
| Ghi nhận thanh toán | Có | Theo quyền |
| Hoàn tiền | Có | Theo quyền |
| Quyết toán tiền cọc | Có | Theo quyền |
| Xem báo cáo tài chính | Có | Theo quyền |

Mỗi API phải kiểm tra quyền ở phía server, không chỉ ẩn nút chức năng trên giao diện.

---

# 21. ERROR CODES – MÃ LỖI

| HTTP Status | Error Code | Ý nghĩa |
|---|---|---|
| 400 | INVALID_DATA | Dữ liệu không hợp lệ |
| 400 | INVALID_AMOUNT | Số tiền không hợp lệ |
| 400 | INVALID_READING | Chỉ số điện nước không hợp lệ |
| 400 | INVALID_PRICING_TIERS | Bậc giá không hợp lệ |
| 401 | UNAUTHORIZED | Chưa đăng nhập |
| 403 | FORBIDDEN | Không có quyền |
| 404 | SERVICE_NOT_FOUND | Không tìm thấy dịch vụ |
| 404 | INVOICE_NOT_FOUND | Không tìm thấy hóa đơn |
| 404 | PAYMENT_NOT_FOUND | Không tìm thấy giao dịch |
| 409 | DUPLICATE_INVOICE | Hóa đơn đã tồn tại |
| 409 | DUPLICATE_PAYMENT | Giao dịch bị trùng |
| 409 | INVOICE_ALREADY_PAID | Hóa đơn đã thanh toán |
| 409 | INVOICE_ALREADY_CANCELLED | Hóa đơn đã bị hủy |
| 409 | READING_ALREADY_BILLED | Chỉ số đã được đưa vào hóa đơn |
| 422 | PAYMENT_EXCEEDS_BALANCE | Thanh toán vượt số tiền còn nợ |
| 422 | DEPOSIT_SETTLEMENT_INVALID | Quyết toán cọc không hợp lệ |
| 422 | REFUND_EXCEEDS_PAYMENT | Hoàn tiền vượt số tiền được phép |
| 500 | INTERNAL_SERVER_ERROR | Lỗi hệ thống |

**Ví dụ Response lỗi:**

```json
{
  "success": false,
  "message": "Hóa đơn đã tồn tại trong kỳ này",
  "errorCode": "DUPLICATE_INVOICE"
}
```

---

# 22. TEST CASES – KIỂM THỬ API

| Mã | Chức năng | Dữ liệu kiểm thử | Kết quả mong đợi |
|---|---|---|---|
| TC01 | Thêm dịch vụ | Tên hợp lệ, giá 100000 | Thành công |
| TC02 | Thêm dịch vụ | Tên trống | Báo lỗi |
| TC03 | Gán dịch vụ phòng | Phòng và dịch vụ hợp lệ | Thành công |
| TC04 | Ghi chỉ số điện | Chỉ số mới lớn hơn chỉ số cũ | Thành công |
| TC05 | Ghi chỉ số điện | Chỉ số mới nhỏ hơn chỉ số cũ | Báo lỗi hoặc yêu cầu quy trình thay đồng hồ |
| TC06 | Tính điện lũy tiến | Tiêu thụ 120 kWh | Tổng tiền 240000 theo bảng giá ví dụ |
| TC07 | Tạo hóa đơn | Hợp đồng hợp lệ | Thành công |
| TC08 | Tạo hóa đơn | Trùng kỳ hợp đồng | Báo lỗi |
| TC09 | Thanh toán | Số tiền hợp lệ | Thành công |
| TC10 | Thanh toán | Số tiền lớn hơn số còn nợ | Báo lỗi |
| TC11 | Thanh toán | Gửi lại cùng Idempotency-Key | Không ghi nhận hai lần |
| TC12 | Tiền cọc | Nhận tiền hợp lệ | Thành công |
| TC13 | Quyết toán cọc | Tổng khấu trừ hợp lệ | Thành công |
| TC14 | Quyết toán cọc | Khấu trừ vượt tiền cọc | Báo lỗi |
| TC15 | Tạo hóa đơn định kỳ | Chạy lần đầu | Tạo hóa đơn |
| TC16 | Tạo hóa đơn định kỳ | Chạy lại cùng kỳ | Không tạo hóa đơn trùng |
| TC17 | Điều chỉnh hóa đơn | Lý do và số tiền hợp lệ | Tạo yêu cầu |
| TC18 | Hoàn tiền | Hoàn vượt tiền đã thanh toán | Báo lỗi |
| TC19 | Thay đồng hồ | Có chỉ số cuối và đầu hợp lệ | Thành công |
| TC20 | Tính tiền giữa tháng | Ngày vào phòng hợp lệ | Tính theo chính sách hợp đồng |

---

# 23. API WORKFLOW – LUỒNG HOẠT ĐỘNG TỔNG THỂ

## 23.1. Luồng quản lý dịch vụ

```text
Chủ nhà tạo dịch vụ
       |
       v
Lưu dịch vụ vào hệ thống
       |
       v
Gán dịch vụ cho phòng
       |
       v
Cập nhật số lượng và đơn giá áp dụng
       |
       v
Đến kỳ thanh toán
       |
       v
Tạo dòng dịch vụ trong hóa đơn
```

## 23.2. Luồng điện nước

```text
Ghi chỉ số cũ
       |
       v
Ghi chỉ số mới
       |
       v
Tính lượng tiêu thụ
       |
       v
Lấy bảng giá có hiệu lực
       |
       v
Tính tiền theo bậc lũy tiến
       |
       v
Lưu kết quả vào hóa đơn
```

## 23.3. Luồng thanh toán

```text
Người thuê nhận hóa đơn
       |
       v
Thực hiện thanh toán
       |
       v
Chủ nhà xác nhận giao dịch
       |
       v
Hệ thống kiểm tra giao dịch trùng
       |
       v
Lưu lịch sử thanh toán
       |
       v
Cập nhật số tiền còn nợ
       |
       v
Cập nhật trạng thái hóa đơn
```

## 23.4. Luồng quyết toán tiền cọc

```text
Người thuê trả phòng
       |
       v
Kiểm tra hóa đơn còn nợ
       |
       v
Kiểm tra tài sản và chi phí phát sinh
       |
       v
Tính tổng khoản khấu trừ
       |
       v
Tính số tiền được hoàn
       |
       v
Xác nhận quyết toán
       |
       v
Lưu lịch sử và kết quả
```

---

# 24. ACCEPTANCE CRITERIA – TIÊU CHÍ NGHIỆM THU

Module được xem là đáp ứng yêu cầu cơ bản khi:

- [ ] Thêm, sửa, xem và ngừng dịch vụ được.
- [ ] Gán và quản lý dịch vụ theo phòng được.
- [ ] Ghi nhận và xem lịch sử điện nước được.
- [ ] Tính điện nước theo bậc lũy tiến chính xác.
- [ ] Lưu được bảng giá theo thời gian hiệu lực.
- [ ] Tạo, xem và quản lý hóa đơn được.
- [ ] Tạo hóa đơn theo chu kỳ mà không bị trùng.
- [ ] Tính được tiền thuê khi người thuê vào hoặc trả phòng giữa tháng theo chính sách đã chọn.
- [ ] Ghi nhận thanh toán và lịch sử giao dịch được.
- [ ] Quản lý tiền đặt cọc và quyết toán được.
- [ ] Điều chỉnh hóa đơn có lưu lịch sử.
- [ ] Quản lý yêu cầu hoàn tiền được.
- [ ] Xem báo cáo doanh thu, công nợ và tiền cọc được.
- [ ] Có phân quyền và kiểm tra dữ liệu ở phía server.
- [ ] Có kiểm tra lỗi và các trường hợp dữ liệu trùng.
- [ ] Có kiểm thử các nghiệp vụ tài chính quan trọng.

---

# 25. KẾT LUẬN MODULE 5

Module RENTAL SERVICES & BILLING là phần nghiệp vụ tài chính quan trọng của hệ thống quản lý phòng trọ.

Module chịu trách nhiệm quản lý:

1. Dịch vụ phòng trọ.
2. Điện và nước.
3. Bảng giá lũy tiến.
4. Hóa đơn theo chu kỳ.
5. Thanh toán và công nợ.
6. Tiền đặt cọc.
7. Điều chỉnh hóa đơn và hoàn tiền.
8. Báo cáo tài chính.

**Nguyên tắc thiết kế quan trọng nhất:** Mọi dữ liệu tài chính đã phát sinh phải có lịch sử, có thể truy vết và không bị thay đổi âm thầm. Hóa đơn phải lưu đơn giá và cách tính tại thời điểm phát hành để bảo đảm tính chính xác khi giá dịch vụ thay đổi trong tương lai.

**Ghi chú triển khai:** Đây là tài liệu thiết kế API đề xuất cho dự án. Trước khi lập trình, cần đối chiếu với ERD, tên bảng, tên cột, trạng thái hợp đồng và cấu trúc code thực tế để thống nhất toàn bộ hệ thống.
