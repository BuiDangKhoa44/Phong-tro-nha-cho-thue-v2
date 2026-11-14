# MODULE 8: REPORTS & ACTIVITY LOGS – BÁO CÁO, THỐNG KÊ VÀ NHẬT KÝ HOẠT ĐỘNG

**Dự án:** Hệ thống quản lý phòng trọ / nhà cho thuê  
**Module:** Reports & Activity Logs  
**Phiên bản API:** v1  
**Base URL:** `/api/v1`  
**Đối tượng sử dụng:** Chủ nhà, nhân viên quản lý được phân quyền.

---

# PHẦN A. REPORTS – BÁO CÁO VÀ THỐNG KÊ

# 1. MỤC ĐÍCH MODULE REPORTS

Module Reports dùng để tổng hợp dữ liệu hoạt động của hệ thống, giúp chủ nhà theo dõi tình hình kinh doanh và quản lý khu nhà trọ.

Các chức năng chính:

1. Báo cáo tổng quan.
2. Thống kê số lượng phòng.
3. Thống kê tỷ lệ lấp đầy phòng.
4. Báo cáo doanh thu.
5. Báo cáo hóa đơn.
6. Báo cáo công nợ.
7. Báo cáo thanh toán.
8. Báo cáo tiền đặt cọc.
9. Báo cáo điện nước.
10. Báo cáo dịch vụ.
11. Báo cáo sửa chữa và bảo trì.
12. Báo cáo người thuê và hợp đồng.
13. So sánh doanh thu theo tháng.
14. Xuất báo cáo Excel, CSV hoặc PDF nếu hệ thống hỗ trợ.
15. Lọc báo cáo theo khoảng thời gian và phòng.

**Nguyên tắc:** Báo cáo phải được tính từ dữ liệu nghiệp vụ đã lưu trong các module liên quan, không tự tạo hoặc suy đoán số liệu.

---

# 2. QUY ƯỚC CHUNG

## 2.1. Định dạng dữ liệu

| Thành phần | Quy ước |
|---|---|
| Request | JSON hoặc Query Parameters |
| Response | JSON |
| Tiền tệ | VND |
| Ngày | YYYY-MM-DD |
| Ngày giờ | ISO 8601 |
| ID | UUID hoặc kiểu ID thống nhất |
| Phân trang | page, limit |
| Sắp xếp | sortBy, sortOrder |

## 2.2. Khoảng thời gian báo cáo

| Tham số | Ý nghĩa |
|---|---|
| fromDate | Ngày bắt đầu |
| toDate | Ngày kết thúc |
| month | Tháng cần báo cáo |
| year | Năm cần báo cáo |
| groupBy | Cách nhóm dữ liệu |

Các giá trị `groupBy` đề xuất:

- DAY: Theo ngày.
- WEEK: Theo tuần.
- MONTH: Theo tháng.
- QUARTER: Theo quý.
- YEAR: Theo năm.

## 2.3. Quy ước tính toán

- Doanh thu thực thu phải dựa trên các khoản thanh toán hợp lệ đã ghi nhận.
- Tổng tiền hóa đơn không đồng nghĩa với tiền đã thu.
- Công nợ phải dựa trên số tiền phải trả còn lại của hóa đơn.
- Tiền đặt cọc không được tự động tính thành doanh thu tiền thuê.
- Khoản tiền hoàn trả phải được ghi nhận riêng.
- Chi phí sửa chữa phải được thống kê riêng với doanh thu.
- Báo cáo phải sử dụng cùng quy tắc làm tròn với Module 5.

---

# 3. DANH SÁCH API REPORTS

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/reports/overview` | Báo cáo tổng quan |
| 2 | GET | `/reports/rooms` | Báo cáo phòng |
| 3 | GET | `/reports/occupancy` | Báo cáo tỷ lệ lấp đầy |
| 4 | GET | `/reports/revenue` | Báo cáo doanh thu |
| 5 | GET | `/reports/revenue/monthly` | Doanh thu theo tháng |
| 6 | GET | `/reports/revenue/comparison` | So sánh doanh thu |
| 7 | GET | `/reports/invoices` | Báo cáo hóa đơn |
| 8 | GET | `/reports/debts` | Báo cáo công nợ |
| 9 | GET | `/reports/payments` | Báo cáo thanh toán |
| 10 | GET | `/reports/deposits` | Báo cáo tiền cọc |
| 11 | GET | `/reports/utilities` | Báo cáo điện nước |
| 12 | GET | `/reports/services` | Báo cáo dịch vụ |
| 13 | GET | `/reports/maintenance` | Báo cáo bảo trì |
| 14 | GET | `/reports/tenants` | Báo cáo người thuê |
| 15 | GET | `/reports/contracts` | Báo cáo hợp đồng |
| 16 | GET | `/reports/export` | Xuất báo cáo |
| 17 | GET | `/reports/available-types` | Danh sách loại báo cáo hỗ trợ |

---

# 4. CHI TIẾT REQUEST / RESPONSE REPORTS

## API 01: Báo cáo tổng quan

**Method:** GET

**Endpoint:** `/api/v1/reports/overview`

**Mục đích:** Tổng hợp những chỉ số quan trọng nhất của khu nhà trọ.

### Query Parameters

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| fromDate | date | Không | Ngày bắt đầu |
| toDate | date | Không | Ngày kết thúc |

### Request

```http
GET /api/v1/reports/overview?fromDate=2026-11-01&toDate=2026-11-30
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo tổng quan thành công",
  "data": {
    "period": {
      "fromDate": "2026-11-01",
      "toDate": "2026-11-30"
    },
    "rooms": {
      "total": 30,
      "occupied": 24,
      "vacant": 4,
      "maintenance": 2,
      "occupancyRate": 80
    },
    "tenants": {
      "total": 24,
      "active": 24,
      "newTenants": 3
    },
    "contracts": {
      "active": 24,
      "expiring": 2,
      "expired": 1
    },
    "revenue": {
      "invoicedAmount": 120000000,
      "collectedAmount": 105000000,
      "outstandingAmount": 15000000
    },
    "payments": {
      "totalTransactions": 35,
      "successfulTransactions": 33,
      "refundedAmount": 0
    },
    "deposits": {
      "heldAmount": 48000000,
      "refundedAmount": 2000000
    },
    "maintenance": {
      "totalRequests": 12,
      "completed": 9,
      "pending": 3,
      "actualCost": 3500000
    }
  }
}
```

**Quy tắc:**

- `total` phòng là số phòng thuộc phạm vi quản lý.
- `occupied` là số phòng có người thuê theo quy tắc trạng thái phòng.
- `occupancyRate = occupied / total × 100`.
- `invoicedAmount` là tổng tiền hóa đơn phát hành trong kỳ.
- `collectedAmount` là tiền thanh toán hợp lệ được ghi nhận trong kỳ.
- `outstandingAmount` là số dư còn phải thu của các hóa đơn thuộc phạm vi báo cáo.
- Các chỉ số phải thống nhất với dữ liệu của Module 3, 4, 5, 6 và 7.

---

## API 02: Báo cáo phòng

**Method:** GET

**Endpoint:** `/api/v1/reports/rooms`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| status | string | Trạng thái phòng |
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| page | integer | Trang |
| limit | integer | Số bản ghi |

### Request

```http
GET /api/v1/reports/rooms?status=OCCUPIED&page=1&limit=10
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo phòng thành công",
  "data": [
    {
      "roomId": "room-001",
      "roomNumber": "P101",
      "status": "OCCUPIED",
      "rentalPrice": 3500000,
      "tenantName": "Nguyen Van A",
      "contractStatus": "ACTIVE",
      "monthlyInvoiceAmount": 4200000
    },
    {
      "roomId": "room-002",
      "roomNumber": "P102",
      "status": "OCCUPIED",
      "rentalPrice": 3000000,
      "tenantName": "Tran Van B",
      "contractStatus": "ACTIVE",
      "monthlyInvoiceAmount": 3700000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

---

## API 03: Báo cáo tỷ lệ lấp đầy

**Method:** GET

**Endpoint:** `/api/v1/reports/occupancy`

### Request

```http
GET /api/v1/reports/occupancy?fromDate=2026-01-01&toDate=2026-11-30&groupBy=MONTH
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo tỷ lệ lấp đầy thành công",
  "data": {
    "totalRooms": 30,
    "averageOccupancyRate": 85.5,
    "items": [
      {
        "period": "2026-09",
        "occupiedRooms": 24,
        "vacantRooms": 6,
        "occupancyRate": 80
      },
      {
        "period": "2026-10",
        "occupiedRooms": 26,
        "vacantRooms": 4,
        "occupancyRate": 86.67
      },
      {
        "period": "2026-11",
        "occupiedRooms": 27,
        "vacantRooms": 3,
        "occupancyRate": 90
      }
    ]
  }
}
```

**Công thức:**

`Tỷ lệ lấp đầy = Số phòng đang được thuê / Tổng số phòng có thể cho thuê × 100`

**Lưu ý:** Phòng đang sửa chữa, phòng không được đưa vào khai thác hoặc phòng ngừng kinh doanh cần có quy tắc riêng. Không nên mặc định tính tất cả các phòng đó vào mẫu số.

---

## API 04: Báo cáo doanh thu

**Method:** GET

**Endpoint:** `/api/v1/reports/revenue`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| groupBy | string | DAY, WEEK, MONTH, QUARTER, YEAR |
| roomId | UUID | Lọc theo phòng |

### Request

```http
GET /api/v1/reports/revenue?fromDate=2026-11-01&toDate=2026-11-30&groupBy=DAY
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo doanh thu thành công",
  "data": {
    "totalInvoiced": 120000000,
    "totalCollected": 105000000,
    "totalOutstanding": 15000000,
    "totalRefunded": 0,
    "items": [
      {
        "date": "2026-11-01",
        "invoicedAmount": 4000000,
        "collectedAmount": 3500000
      },
      {
        "date": "2026-11-02",
        "invoicedAmount": 5000000,
        "collectedAmount": 5000000
      }
    ]
  }
}
```

**Quy tắc:**

- Phân biệt số tiền đã lập hóa đơn và số tiền thực thu.
- Giao dịch thanh toán bị hủy hoặc thất bại không được tính là tiền thu.
- Hoàn tiền phải được thống kê riêng.
- Nếu thanh toán một hóa đơn thành nhiều lần, phải cộng các giao dịch hợp lệ.
- Báo cáo phải xác định rõ đang nhóm theo ngày lập hóa đơn hay ngày nhận thanh toán.

---

## API 05: Doanh thu theo tháng

**Method:** GET

**Endpoint:** `/api/v1/reports/revenue/monthly`

### Request

```http
GET /api/v1/reports/revenue/monthly?year=2026
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy doanh thu theo tháng thành công",
  "data": [
    {
      "month": 1,
      "invoicedAmount": 100000000,
      "collectedAmount": 95000000
    },
    {
      "month": 2,
      "invoicedAmount": 105000000,
      "collectedAmount": 100000000
    },
    {
      "month": 3,
      "invoicedAmount": 110000000,
      "collectedAmount": 103000000
    }
  ],
  "summary": {
    "year": 2026,
    "totalInvoiced": 315000000,
    "totalCollected": 298000000
  }
}
```

---

## API 06: So sánh doanh thu

**Method:** GET

**Endpoint:** `/api/v1/reports/revenue/comparison`

### Request

```http
GET /api/v1/reports/revenue/comparison?period1From=2026-10-01&period1To=2026-10-31&period2From=2026-11-01&period2To=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "So sánh doanh thu thành công",
  "data": {
    "period1": {
      "fromDate": "2026-10-01",
      "toDate": "2026-10-31",
      "collectedAmount": 95000000
    },
    "period2": {
      "fromDate": "2026-11-01",
      "toDate": "2026-11-30",
      "collectedAmount": 105000000
    },
    "difference": 10000000,
    "percentageChange": 10.53,
    "trend": "INCREASE"
  }
}
```

**Quy tắc:** Nếu kỳ trước có doanh thu bằng 0 thì không thực hiện phép chia phần trăm thông thường; cần trả về `percentageChange: null` hoặc một trạng thái phù hợp.

---

## API 07: Báo cáo hóa đơn

**Method:** GET

**Endpoint:** `/api/v1/reports/invoices`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| status | string | Trạng thái hóa đơn |
| roomId | UUID | Phòng |
| page | integer | Trang |
| limit | integer | Số bản ghi |

### Request

```http
GET /api/v1/reports/invoices?fromDate=2026-11-01&toDate=2026-11-30&status=UNPAID
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo hóa đơn thành công",
  "data": {
    "totalInvoices": 30,
    "paidInvoices": 20,
    "partiallyPaidInvoices": 5,
    "unpaidInvoices": 5,
    "totalAmount": 120000000,
    "paidAmount": 90000000,
    "remainingAmount": 30000000,
    "items": [
      {
        "invoiceId": "invoice-001",
        "invoiceCode": "INV-0001",
        "roomNumber": "P101",
        "totalAmount": 4000000,
        "paidAmount": 2500000,
        "remainingAmount": 1500000,
        "status": "PARTIALLY_PAID",
        "dueDate": "2026-11-10"
      }
    ]
  }
}
```

---

## API 08: Báo cáo công nợ

**Method:** GET

**Endpoint:** `/api/v1/reports/debts`

### Request

```http
GET /api/v1/reports/debts?fromDate=2026-11-01&toDate=2026-11-30&page=1&limit=10
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo công nợ thành công",
  "data": {
    "totalOutstanding": 15000000,
    "overdueAmount": 5000000,
    "notYetDueAmount": 10000000,
    "items": [
      {
        "invoiceId": "invoice-001",
        "invoiceCode": "INV-0001",
        "roomNumber": "P101",
        "tenantName": "Nguyen Van A",
        "totalAmount": 4000000,
        "paidAmount": 2500000,
        "remainingAmount": 1500000,
        "dueDate": "2026-11-10",
        "daysOverdue": 5,
        "status": "OVERDUE"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPages": 1
  }
}
```

**Quy tắc:**

- Công nợ = Số tiền phải trả hợp lệ - Số tiền đã thanh toán được ghi nhận.
- Không tính hóa đơn đã hủy.
- Hóa đơn quá hạn được xác định dựa trên ngày đến hạn và số dư còn phải trả.
- Không cộng trùng một hóa đơn vào nhiều nhóm.
- Cần phân biệt công nợ tại thời điểm hiện tại và công nợ phát sinh trong một kỳ.

---

## API 09: Báo cáo thanh toán

**Method:** GET

**Endpoint:** `/api/v1/reports/payments`

### Request

```http
GET /api/v1/reports/payments?fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo thanh toán thành công",
  "data": {
    "totalTransactions": 35,
    "successfulTransactions": 33,
    "failedTransactions": 2,
    "totalCollected": 105000000,
    "totalRefunded": 2000000,
    "items": [
      {
        "paymentId": "payment-001",
        "invoiceCode": "INV-0001",
        "roomNumber": "P101",
        "amount": 4000000,
        "method": "BANK_TRANSFER",
        "status": "SUCCESS",
        "paidAt": "2026-11-05T10:00:00Z"
      }
    ]
  }
}
```

**Quy tắc:** Phân biệt số giao dịch, số tiền thanh toán thành công và số tiền hoàn trả. Không cộng giao dịch thất bại vào tiền đã thu.

---

## API 10: Báo cáo tiền đặt cọc

**Method:** GET

**Endpoint:** `/api/v1/reports/deposits`

### Request

```http
GET /api/v1/reports/deposits?fromDate=2026-01-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo tiền cọc thành công",
  "data": {
    "totalDepositsReceived": 60000000,
    "currentlyHeld": 48000000,
    "totalRefunded": 10000000,
    "totalDeducted": 2000000,
    "items": [
      {
        "depositId": "deposit-001",
        "contractId": "contract-001",
        "roomNumber": "P101",
        "tenantName": "Nguyen Van A",
        "receivedAmount": 2000000,
        "refundedAmount": 0,
        "deductedAmount": 0,
        "remainingAmount": 2000000,
        "status": "HELD"
      }
    ]
  }
}
```

**Quy tắc:**

- Tiền cọc đang giữ phải tách khỏi doanh thu tiền thuê.
- Tiền hoàn trả phải được thống kê riêng.
- Tiền khấu trừ cọc phải có lý do và dữ liệu đối chiếu.
- Không được tính trùng tiền cọc khi hợp đồng được gia hạn.
- Đối chiếu với Module 5 – Deposits và Deposit Settlements.

---

## API 11: Báo cáo điện nước

**Method:** GET

**Endpoint:** `/api/v1/reports/utilities`

### Request

```http
GET /api/v1/reports/utilities?fromDate=2026-11-01&toDate=2026-11-30&roomId=room-001
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo điện nước thành công",
  "data": {
    "totalElectricityUsage": 1200,
    "totalWaterUsage": 350,
    "totalElectricityAmount": 2400000,
    "totalWaterAmount": 1050000,
    "items": [
      {
        "roomId": "room-001",
        "roomNumber": "P101",
        "electricity": {
          "previousReading": 1000,
          "currentReading": 1120,
          "consumption": 120,
          "amount": 240000
        },
        "water": {
          "previousReading": 100,
          "currentReading": 115,
          "consumption": 15,
          "amount": 45000
        }
      }
    ]
  }
}
```

**Quy tắc:**

- Lượng tiêu thụ = Chỉ số mới - Chỉ số cũ.
- Không chấp nhận chỉ số mới nhỏ hơn chỉ số cũ nếu chưa xử lý trường hợp thay đồng hồ hoặc điều chỉnh.
- Giá điện nước phải lấy theo biểu giá có hiệu lực trong kỳ.
- Nếu tính lũy tiến, phải sử dụng đúng các bậc giá trong Module 5.
- Báo cáo lịch sử không được tính lại bằng biểu giá hiện tại làm thay đổi dữ liệu cũ.

---

## API 12: Báo cáo dịch vụ

**Method:** GET

**Endpoint:** `/api/v1/reports/services`

### Request

```http
GET /api/v1/reports/services?fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo dịch vụ thành công",
  "data": {
    "totalServiceAmount": 15000000,
    "items": [
      {
        "serviceId": "service-001",
        "serviceName": "Internet",
        "roomsUsing": 20,
        "totalAmount": 6000000
      },
      {
        "serviceId": "service-002",
        "serviceName": "Vệ sinh",
        "roomsUsing": 15,
        "totalAmount": 9000000
      }
    ]
  }
}
```

---

## API 13: Báo cáo sửa chữa và bảo trì

**Method:** GET

**Endpoint:** `/api/v1/reports/maintenance`

### Request

```http
GET /api/v1/reports/maintenance?fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo bảo trì thành công",
  "data": {
    "totalRequests": 20,
    "newRequests": 3,
    "inProgressRequests": 5,
    "completedRequests": 10,
    "cancelledRequests": 2,
    "totalEstimatedCost": 5000000,
    "totalActualCost": 4200000,
    "averageCompletionHours": 24.5,
    "items": [
      {
        "maintenanceId": "maintenance-001",
        "roomNumber": "P101",
        "category": "WATER",
        "status": "COMPLETED",
        "actualCost": 250000,
        "completedAt": "2026-11-03T10:30:00Z"
      }
    ]
  }
}
```

---

## API 14: Báo cáo người thuê

**Method:** GET

**Endpoint:** `/api/v1/reports/tenants`

### Request

```http
GET /api/v1/reports/tenants?fromDate=2026-01-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo người thuê thành công",
  "data": {
    "totalActiveTenants": 24,
    "newTenants": 8,
    "movedOutTenants": 3,
    "items": [
      {
        "tenantId": "tenant-001",
        "tenantName": "Nguyen Van A",
        "roomNumber": "P101",
        "contractStatus": "ACTIVE",
        "moveInDate": "2026-01-01"
      }
    ]
  }
}
```

**Quy tắc:** Chỉ trả về dữ liệu cá nhân cần thiết cho báo cáo. Không xuất thông tin nhạy cảm nếu không có mục đích và quyền truy cập phù hợp.

---

## API 15: Báo cáo hợp đồng

**Method:** GET

**Endpoint:** `/api/v1/reports/contracts`

### Request

```http
GET /api/v1/reports/contracts?status=ACTIVE&fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy báo cáo hợp đồng thành công",
  "data": {
    "totalContracts": 24,
    "activeContracts": 20,
    "expiringContracts": 3,
    "expiredContracts": 1,
    "items": [
      {
        "contractId": "contract-001",
        "roomNumber": "P101",
        "tenantName": "Nguyen Van A",
        "startDate": "2026-01-01",
        "endDate": "2026-12-31",
        "status": "ACTIVE",
        "daysUntilExpiry": 59
      }
    ]
  }
}
```

---

## API 16: Xuất báo cáo

**Method:** GET

**Endpoint:** `/api/v1/reports/export`

### Query Parameters

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| type | string | Có | Loại báo cáo |
| format | string | Có | XLSX, CSV, PDF |
| fromDate | date | Không | Ngày bắt đầu |
| toDate | date | Không | Ngày kết thúc |
| roomId | UUID | Không | Lọc phòng |

### Request

```http
GET /api/v1/reports/export?type=revenue&format=xlsx&fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Xuất báo cáo thành công",
  "data": {
    "fileName": "revenue-report-2026-11.xlsx",
    "fileUrl": "/exports/revenue-report-2026-11.xlsx",
    "format": "XLSX",
    "generatedAt": "2026-11-30T10:00:00Z"
  }
}
```

**Lưu ý triển khai:**

- API có thể trả file trực tiếp bằng HTTP response thay vì trả JSON.
- Nếu xuất báo cáo mất nhiều thời gian, nên tạo tác vụ nền và trả về mã công việc.
- Chỉ người có quyền mới được xuất dữ liệu.
- File xuất phải kiểm soát thời hạn truy cập.
- Ghi nhận việc xuất dữ liệu vào Activity Logs.

---

## API 17: Danh sách loại báo cáo

**Method:** GET

**Endpoint:** `/api/v1/reports/available-types`

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách loại báo cáo thành công",
  "data": [
    {
      "type": "OVERVIEW",
      "name": "Báo cáo tổng quan"
    },
    {
      "type": "ROOMS",
      "name": "Báo cáo phòng"
    },
    {
      "type": "REVENUE",
      "name": "Báo cáo doanh thu"
    },
    {
      "type": "DEBTS",
      "name": "Báo cáo công nợ"
    },
    {
      "type": "PAYMENTS",
      "name": "Báo cáo thanh toán"
    },
    {
      "type": "DEPOSITS",
      "name": "Báo cáo tiền cọc"
    },
    {
      "type": "UTILITIES",
      "name": "Báo cáo điện nước"
    },
    {
      "type": "MAINTENANCE",
      "name": "Báo cáo bảo trì"
    }
  ]
}
```

---

# 5. DATABASE DESIGN – REPORTS

Thông thường, Reports không cần một bảng lưu riêng cho từng loại báo cáo. Dữ liệu được tổng hợp từ các bảng nghiệp vụ.

Các nguồn dữ liệu chính:

| Bảng nguồn | Dữ liệu sử dụng |
|---|---|
| Rooms | Số phòng, tình trạng phòng |
| Tenants | Thông tin người thuê |
| Contracts | Thời hạn hợp đồng |
| Invoices | Tổng tiền hóa đơn |
| Invoice_Items | Chi tiết hóa đơn |
| Payments | Tiền đã thanh toán |
| Deposits | Tiền đặt cọc |
| Deposit_Settlements | Hoàn trả và khấu trừ cọc |
| Utility_Readings | Chỉ số điện nước |
| Utility_Pricing_Tiers | Biểu giá lũy tiến |
| Services | Dịch vụ |
| Room_Services | Dịch vụ từng phòng |
| Maintenance_Requests | Yêu cầu bảo trì |
| Maintenance_History | Lịch sử bảo trì |

## 5.1. Bảng tùy chọn `Report_Exports`

Dùng khi hệ thống cần quản lý lịch sử xuất báo cáo.

| Cột | Kiểu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| owner_id | UUID / BIGINT | Chủ sở hữu dữ liệu |
| requested_by | UUID / BIGINT | Người yêu cầu |
| report_type | VARCHAR(50) | Loại báo cáo |
| export_format | VARCHAR(10) | XLSX, CSV, PDF |
| filters | JSON | Bộ lọc báo cáo |
| file_path | TEXT | Đường dẫn tệp |
| status | VARCHAR(20) | PENDING, PROCESSING, COMPLETED, FAILED |
| error_message | TEXT | Lỗi nếu có |
| created_at | DATETIME | Ngày tạo |
| completed_at | DATETIME | Ngày hoàn thành |
| expires_at | DATETIME | Thời điểm hết hạn tệp |

## 5.2. Quan hệ

```text
Rooms --------------------+
Tenants ------------------|
Contracts ----------------|
Invoices -----------------|
Invoice_Items ------------|
Payments -----------------|
Deposits -----------------|
Deposit_Settlements ------|----> REPORTS
Utility_Readings ---------|
Services ----------------|
Room_Services ------------|
Maintenance_Requests -----|
Maintenance_History ------+
                              |
                              v
                         Report_Exports
```

---

# PHẦN B. ACTIVITY LOGS – NHẬT KÝ HOẠT ĐỘNG

# 6. MỤC ĐÍCH MODULE ACTIVITY LOGS

Activity Logs ghi lại những hành động quan trọng được thực hiện trong hệ thống.

Mục tiêu:

- Biết ai đã thực hiện thao tác.
- Biết thao tác nào đã được thực hiện.
- Biết dữ liệu nào đã bị thay đổi.
- Biết thời điểm thực hiện.
- Biết đối tượng dữ liệu bị tác động.
- Hỗ trợ kiểm tra khi có sai sót.
- Theo dõi hoạt động của chủ nhà và nhân viên.
- Hỗ trợ truy vết các thao tác liên quan đến tài chính và quản lý phòng.

Ví dụ:

- Chủ nhà thêm phòng P101.
- Nhân viên thay đổi giá thuê phòng P102.
- Chủ nhà tạo hóa đơn tháng 11.
- Người thuê thanh toán hóa đơn.
- Chủ nhà cập nhật trạng thái phòng.
- Nhân viên hoàn thành yêu cầu sửa chữa.
- Chủ nhà thay đổi thông tin hợp đồng.
- Người dùng đăng nhập hoặc đăng xuất.
- Người quản lý xuất báo cáo doanh thu.

**Nguyên tắc quan trọng:** Activity Logs là dữ liệu kiểm toán. Người dùng thông thường không được sửa hoặc xóa lịch sử hoạt động.

---

# 7. QUY ƯỚC ACTIVITY LOGS

## 7.1. Các loại hành động

| Action | Ý nghĩa |
|---|---|
| CREATE | Tạo dữ liệu |
| UPDATE | Cập nhật dữ liệu |
| DELETE | Xóa dữ liệu |
| LOGIN | Đăng nhập |
| LOGOUT | Đăng xuất |
| VIEW | Xem dữ liệu quan trọng nếu chính sách yêu cầu ghi nhận |
| APPROVE | Phê duyệt |
| REJECT | Từ chối |
| CANCEL | Hủy |
| PAYMENT | Ghi nhận thanh toán |
| REFUND | Hoàn tiền |
| EXPORT | Xuất dữ liệu |
| ASSIGN | Phân công |
| STATUS_CHANGE | Thay đổi trạng thái |
| RESTORE | Khôi phục dữ liệu |

## 7.2. Các nhóm đối tượng

| Entity | Ý nghĩa |
|---|---|
| USER | Người dùng |
| ROOM | Phòng trọ |
| TENANT | Người thuê |
| CONTRACT | Hợp đồng |
| SERVICE | Dịch vụ |
| INVOICE | Hóa đơn |
| PAYMENT | Thanh toán |
| DEPOSIT | Tiền cọc |
| UTILITY | Điện nước |
| MAINTENANCE | Bảo trì |
| NOTIFICATION | Thông báo |
| REPORT | Báo cáo |

## 7.3. Các thông tin cần ghi nhận

Mỗi bản ghi Activity Log nên chứa:

- ID nhật ký.
- ID người thực hiện.
- Tên hành động.
- Loại đối tượng.
- ID đối tượng.
- Mô tả thao tác.
- Dữ liệu trước khi thay đổi.
- Dữ liệu sau khi thay đổi.
- Thời điểm thực hiện.
- IP nguồn nếu có và được phép thu thập.
- User-Agent hoặc thông tin thiết bị ở mức cần thiết.
- Kết quả thao tác.
- Mã tương quan Request ID để truy vết.

Không lưu mật khẩu, Access Token, Refresh Token, mã OTP hoặc thông tin xác thực nhạy cảm trong nhật ký.

---

# 8. DANH SÁCH API ACTIVITY LOGS

| STT | Method | Endpoint | Chức năng |
|---|---|---|---|
| 1 | GET | `/activity-logs` | Danh sách nhật ký |
| 2 | GET | `/activity-logs/{id}` | Chi tiết nhật ký |
| 3 | GET | `/activity-logs/user/{userId}` | Nhật ký theo người dùng |
| 4 | GET | `/activity-logs/entity/{entityType}/{entityId}` | Nhật ký theo đối tượng |
| 5 | GET | `/activity-logs/my-activities` | Hoạt động của tôi |
| 6 | GET | `/activity-logs/statistics` | Thống kê hoạt động |
| 7 | GET | `/activity-logs/actions` | Danh sách loại hành động |
| 8 | GET | `/activity-logs/export` | Xuất nhật ký |
| 9 | GET | `/activity-logs/security-events` | Sự kiện bảo mật |
| 10 | GET | `/activity-logs/recent` | Hoạt động gần đây |

Không cung cấp API sửa hoặc xóa nhật ký cho người dùng thông thường.

---

# 9. CHI TIẾT REQUEST / RESPONSE ACTIVITY LOGS

## API 01: Danh sách nhật ký hoạt động

**Method:** GET

**Endpoint:** `/api/v1/activity-logs`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| page | integer | Trang |
| limit | integer | Số bản ghi |
| userId | UUID | Người thực hiện |
| action | string | Loại hành động |
| entityType | string | Loại đối tượng |
| entityId | UUID | ID đối tượng |
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| status | string | SUCCESS hoặc FAILED |
| keyword | string | Từ khóa |
| sortOrder | string | ASC hoặc DESC |

### Request

```http
GET /api/v1/activity-logs?page=1&limit=10&action=UPDATE
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy nhật ký hoạt động thành công",
  "data": [
    {
      "id": "log-001",
      "user": {
        "id": "user-001",
        "name": "Nguyen Van A"
      },
      "action": "UPDATE",
      "entityType": "ROOM",
      "entityId": "room-001",
      "description": "Cập nhật giá thuê phòng P101",
      "status": "SUCCESS",
      "createdAt": "2026-11-02T10:30:00Z"
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

**Quy tắc:**

- Chỉ chủ nhà hoặc nhân viên có quyền kiểm toán được xem toàn bộ nhật ký trong phạm vi quản lý.
- Phải lọc dữ liệu theo chủ sở hữu.
- Không trả về dữ liệu nhạy cảm.
- Mặc định sắp xếp mới nhất trước.

---

## API 02: Chi tiết nhật ký

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/{id}`

### Request

```http
GET /api/v1/activity-logs/log-001
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy chi tiết nhật ký thành công",
  "data": {
    "id": "log-001",
    "user": {
      "id": "user-001",
      "name": "Nguyen Van A"
    },
    "action": "UPDATE",
    "entityType": "ROOM",
    "entityId": "room-001",
    "description": "Cập nhật giá thuê phòng P101",
    "oldValues": {
      "rentalPrice": 3000000
    },
    "newValues": {
      "rentalPrice": 3500000
    },
    "status": "SUCCESS",
    "requestId": "req-abc123",
    "ipAddress": "192.0.2.10",
    "userAgent": "Example Browser",
    "createdAt": "2026-11-02T10:30:00Z"
  }
}
```

IP và User-Agent chỉ được lưu khi cần thiết, có chính sách phù hợp và không thu thập vượt quá mục đích quản lý.

---

## API 03: Nhật ký theo người dùng

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/user/{userId}`

### Request

```http
GET /api/v1/activity-logs/user/user-001?page=1&limit=10
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy nhật ký theo người dùng thành công",
  "data": [
    {
      "id": "log-001",
      "action": "UPDATE",
      "entityType": "ROOM",
      "entityId": "room-001",
      "description": "Cập nhật giá thuê phòng",
      "status": "SUCCESS",
      "createdAt": "2026-11-02T10:30:00Z"
    },
    {
      "id": "log-002",
      "action": "CREATE",
      "entityType": "INVOICE",
      "entityId": "invoice-001",
      "description": "Tạo hóa đơn tháng 11",
      "status": "SUCCESS",
      "createdAt": "2026-11-02T11:00:00Z"
    }
  ]
}
```

**Quy tắc:** Chỉ người có quyền quản lý mới được xem nhật ký của tài khoản khác.

---

## API 04: Nhật ký theo đối tượng

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/entity/{entityType}/{entityId}`

### Request

```http
GET /api/v1/activity-logs/entity/ROOM/room-001
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy lịch sử đối tượng thành công",
  "data": [
    {
      "id": "log-001",
      "action": "CREATE",
      "description": "Tạo phòng P101",
      "userName": "Nguyen Van A",
      "createdAt": "2026-01-01T08:00:00Z"
    },
    {
      "id": "log-002",
      "action": "UPDATE",
      "description": "Thay đổi giá thuê phòng P101",
      "userName": "Nguyen Van A",
      "createdAt": "2026-11-02T10:30:00Z"
    }
  ]
}
```

---

## API 05: Hoạt động của tôi

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/my-activities`

### Request

```http
GET /api/v1/activity-logs/my-activities?page=1&limit=10
Authorization: Bearer <access_token>
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy hoạt động của tôi thành công",
  "data": [
    {
      "id": "log-001",
      "action": "UPDATE",
      "entityType": "ROOM",
      "description": "Cập nhật thông tin phòng P101",
      "status": "SUCCESS",
      "createdAt": "2026-11-02T10:30:00Z"
    }
  ]
}
```

---

## API 06: Thống kê hoạt động

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/statistics`

### Query Parameters

| Tham số | Kiểu | Mô tả |
|---|---|---|
| fromDate | date | Ngày bắt đầu |
| toDate | date | Ngày kết thúc |
| groupBy | string | DAY, WEEK, MONTH |
| userId | UUID | Lọc theo người dùng |

### Request

```http
GET /api/v1/activity-logs/statistics?fromDate=2026-11-01&toDate=2026-11-30&groupBy=DAY
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Thống kê hoạt động thành công",
  "data": {
    "totalActivities": 250,
    "successfulActivities": 240,
    "failedActivities": 10,
    "byAction": [
      {
        "action": "CREATE",
        "count": 50
      },
      {
        "action": "UPDATE",
        "count": 120
      },
      {
        "action": "DELETE",
        "count": 10
      },
      {
        "action": "LOGIN",
        "count": 70
      }
    ],
    "byDay": [
      {
        "date": "2026-11-01",
        "count": 30
      },
      {
        "date": "2026-11-02",
        "count": 45
      }
    ]
  }
}
```

---

## API 07: Danh sách hành động

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/actions`

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy danh sách hành động thành công",
  "data": [
    {
      "code": "CREATE",
      "name": "Tạo dữ liệu"
    },
    {
      "code": "UPDATE",
      "name": "Cập nhật dữ liệu"
    },
    {
      "code": "DELETE",
      "name": "Xóa dữ liệu"
    },
    {
      "code": "LOGIN",
      "name": "Đăng nhập"
    },
    {
      "code": "LOGOUT",
      "name": "Đăng xuất"
    },
    {
      "code": "PAYMENT",
      "name": "Thanh toán"
    },
    {
      "code": "EXPORT",
      "name": "Xuất dữ liệu"
    },
    {
      "code": "STATUS_CHANGE",
      "name": "Thay đổi trạng thái"
    }
  ]
}
```

---

## API 08: Xuất nhật ký hoạt động

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/export`

### Request

```http
GET /api/v1/activity-logs/export?format=xlsx&fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Xuất nhật ký thành công",
  "data": {
    "fileName": "activity-logs-2026-11.xlsx",
    "fileUrl": "/exports/activity-logs-2026-11.xlsx",
    "format": "XLSX",
    "generatedAt": "2026-11-30T10:00:00Z"
  }
}
```

**Quy tắc:**

- Chỉ tài khoản được phân quyền mới được xuất.
- Ghi nhận chính thao tác xuất nhật ký vào Activity Logs.
- Không đưa mật khẩu, token hoặc dữ liệu xác thực vào file.
- Giới hạn khoảng thời gian hoặc số lượng bản ghi xuất.
- Có thể yêu cầu xác nhận quyền trước khi xuất dữ liệu lớn.

---

## API 09: Sự kiện bảo mật

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/security-events`

**Mục đích:** Xem các sự kiện liên quan đến bảo mật tài khoản.

### Request

```http
GET /api/v1/activity-logs/security-events?fromDate=2026-11-01&toDate=2026-11-30
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy sự kiện bảo mật thành công",
  "data": [
    {
      "id": "log-101",
      "eventType": "LOGIN_FAILED",
      "userId": "user-001",
      "description": "Đăng nhập không thành công",
      "status": "FAILED",
      "createdAt": "2026-11-02T09:00:00Z"
    },
    {
      "id": "log-102",
      "eventType": "LOGIN_SUCCESS",
      "userId": "user-001",
      "description": "Đăng nhập thành công",
      "status": "SUCCESS",
      "createdAt": "2026-11-02T09:05:00Z"
    }
  ]
}
```

**Lưu ý:** Không lưu mật khẩu người dùng hoặc nội dung thông tin xác thực thất bại vào nhật ký.

---

## API 10: Hoạt động gần đây

**Method:** GET

**Endpoint:** `/api/v1/activity-logs/recent`

### Request

```http
GET /api/v1/activity-logs/recent?limit=10
```

### Response – 200 OK

```json
{
  "success": true,
  "message": "Lấy hoạt động gần đây thành công",
  "data": [
    {
      "id": "log-001",
      "userName": "Nguyen Van A",
      "action": "CREATE",
      "description": "Tạo phòng P101",
      "createdAt": "2026-11-02T10:00:00Z"
    },
    {
      "id": "log-002",
      "userName": "Tran Van B",
      "action": "PAYMENT",
      "description": "Ghi nhận thanh toán hóa đơn INV-0001",
      "createdAt": "2026-11-02T10:30:00Z"
    }
  ]
}
```

---

# 10. DATABASE DESIGN – ACTIVITY LOGS

## 10.1. Bảng `Activity_Logs`

Đây là bảng trung tâm lưu nhật ký hoạt động.

| Tên cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| owner_id | UUID / BIGINT | Chủ sở hữu phạm vi dữ liệu |
| user_id | UUID / BIGINT | Người thực hiện, có thể NULL với tác vụ hệ thống |
| action | VARCHAR(50) | Hành động |
| entity_type | VARCHAR(50) | Loại đối tượng |
| entity_id | VARCHAR(100) | ID đối tượng |
| description | TEXT | Mô tả thao tác |
| old_values | JSON | Dữ liệu trước thay đổi |
| new_values | JSON | Dữ liệu sau thay đổi |
| status | VARCHAR(20) | SUCCESS hoặc FAILED |
| request_id | VARCHAR(100) | Mã truy vết yêu cầu |
| ip_address | VARCHAR(45) | IP nếu cần |
| user_agent | TEXT | Thiết bị/trình duyệt ở mức cần thiết |
| created_at | DATETIME | Thời điểm thực hiện |

## 10.2. Bảng tùy chọn `Activity_Log_Metadata`

Dùng khi muốn tách thông tin bổ sung khỏi bảng chính.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| activity_log_id | UUID / BIGINT | Nhật ký liên quan |
| metadata_key | VARCHAR(100) | Tên thuộc tính |
| metadata_value | TEXT | Giá trị |

Bảng này không bắt buộc nếu đã lưu dữ liệu phù hợp trong `old_values` và `new_values`.

## 10.3. Bảng tùy chọn `Audit_Log_Archives`

Có thể dùng khi cần lưu trữ nhật ký dài hạn.

| Cột | Kiểu dữ liệu | Mô tả |
|---|---|---|
| id | UUID / BIGINT | Khóa chính |
| archive_period | VARCHAR(20) | Kỳ lưu trữ |
| file_path | TEXT | Vị trí lưu trữ |
| record_count | BIGINT | Số bản ghi |
| checksum | VARCHAR(255) | Giá trị kiểm tra toàn vẹn |
| created_at | DATETIME | Ngày tạo |

## 10.4. Quan hệ dữ liệu

```text
Users
  |
  | 1 - N
  |
Activity_Logs
  |
  |------ N - 1 ------ Users (user_id)
  |
  |------ 1 - N ------ Activity_Log_Metadata

Report_Exports
  |
  |------ N - 1 ------ Users (requested_by)
```

`entity_type` và `entity_id` là tham chiếu đa hình đến nhiều bảng nghiệp vụ. Cách này linh hoạt nhưng không có khóa ngoại trực tiếp đến tất cả bảng. Backend phải kiểm tra đối tượng tồn tại và quyền truy cập trước khi hiển thị chi tiết.

---

# 11. CÁC HOẠT ĐỘNG BẮT BUỘC GHI LOG

| Module | Hành động | Ví dụ |
|---|---|---|
| Authentication | LOGIN | Người dùng đăng nhập |
| Authentication | LOGOUT | Người dùng đăng xuất |
| Authentication | LOGIN_FAILED | Đăng nhập thất bại |
| User Management | CREATE | Tạo tài khoản |
| User Management | UPDATE | Sửa thông tin |
| User Management | DELETE | Xóa hoặc khóa tài khoản |
| Room | CREATE | Tạo phòng |
| Room | UPDATE | Sửa thông tin phòng |
| Room | DELETE | Xóa phòng |
| Room | STATUS_CHANGE | Thay đổi trạng thái phòng |
| Tenant | CREATE | Thêm người thuê |
| Tenant | UPDATE | Sửa người thuê |
| Contract | CREATE | Tạo hợp đồng |
| Contract | UPDATE | Sửa hợp đồng |
| Contract | CANCEL | Hủy hợp đồng |
| Invoice | CREATE | Tạo hóa đơn |
| Invoice | UPDATE | Cập nhật hóa đơn |
| Invoice | CANCEL | Hủy hóa đơn |
| Payment | PAYMENT | Ghi nhận thanh toán |
| Payment | REFUND | Hoàn tiền |
| Deposit | CREATE | Nhận tiền cọc |
| Deposit | UPDATE | Cập nhật tiền cọc |
| Deposit | REFUND | Hoàn trả tiền cọc |
| Utility | CREATE | Ghi chỉ số điện nước |
| Utility | UPDATE | Điều chỉnh chỉ số |
| Maintenance | CREATE | Tạo yêu cầu sửa chữa |
| Maintenance | ASSIGN | Phân công |
| Maintenance | STATUS_CHANGE | Cập nhật trạng thái |
| Maintenance | COMPLETE | Hoàn thành sửa chữa |
| Notification | CREATE | Tạo thông báo |
| Reports | EXPORT | Xuất báo cáo |

Không nhất thiết phải ghi log mọi thao tác đọc thông thường. Những lần xem dữ liệu nhạy cảm hoặc xuất dữ liệu có thể được ghi nhận theo chính sách kiểm toán.

---

# 12. QUY TRÌNH GHI NHẬT KÝ

## 12.1. Khi tạo dữ liệu

1. Người dùng gửi Request.
2. Backend xác thực Token.
3. Backend kiểm tra quyền.
4. Backend kiểm tra dữ liệu.
5. Backend tạo bản ghi nghiệp vụ.
6. Backend ghi Activity Log.
7. Trả Response cho Client.

## 12.2. Khi cập nhật dữ liệu

1. Nhận Request cập nhật.
2. Kiểm tra người dùng.
3. Kiểm tra quyền truy cập.
4. Lấy dữ liệu hiện tại.
5. Lưu lại các trường cũ cần kiểm toán.
6. Kiểm tra và cập nhật dữ liệu mới.
7. Ghi `old_values` và `new_values`.
8. Ghi Activity Log.
9. Trả kết quả.

**Quan trọng:** Thao tác nghiệp vụ và ghi log cần được thiết kế để không tạo ra tình trạng dữ liệu đã đổi nhưng không có nhật ký tương ứng. Với cơ sở dữ liệu quan hệ, nên thực hiện trong cùng transaction khi phù hợp. Nếu sử dụng hàng đợi, có thể áp dụng Transactional Outbox.

## 12.3. Khi xóa dữ liệu

1. Kiểm tra quyền.
2. Xác định bản ghi cần xóa.
3. Lưu thông tin cần thiết vào nhật ký.
4. Thực hiện xóa mềm hoặc xóa theo chính sách.
5. Ghi Activity Log.
6. Trả kết quả.

## 12.4. Khi xuất báo cáo

1. Người dùng chọn loại báo cáo.
2. Backend kiểm tra quyền.
3. Backend kiểm tra bộ lọc.
4. Backend tổng hợp dữ liệu.
5. Backend tạo file.
6. Backend ghi nhật ký `EXPORT`.
7. Trả file hoặc thông tin tải file.

---

# 13. VALIDATION – KIỂM TRA DỮ LIỆU

## 13.1. Reports

| Trường | Điều kiện |
|---|---|
| fromDate | Ngày hợp lệ |
| toDate | Ngày hợp lệ |
| fromDate và toDate | fromDate không được sau toDate |
| groupBy | DAY, WEEK, MONTH, QUARTER, YEAR |
| roomId | Phải tồn tại và thuộc quyền truy cập |
| year | Năm hợp lệ |
| month | Từ 1 đến 12 |
| format | XLSX, CSV hoặc PDF |
| type | Loại báo cáo được hỗ trợ |
| page | Số nguyên dương |
| limit | Số nguyên dương trong giới hạn hệ thống |

## 13.2. Activity Logs

| Trường | Điều kiện |
|---|---|
| userId | Người dùng phải thuộc phạm vi quản lý |
| action | Thuộc danh sách hành động hợp lệ |
| entityType | Thuộc danh sách đối tượng hợp lệ |
| entityId | ID đối tượng hợp lệ |
| fromDate | Ngày hợp lệ |
| toDate | Ngày hợp lệ |
| status | SUCCESS hoặc FAILED |
| page | Số nguyên dương |
| limit | Trong giới hạn cho phép |

Activity Logs do Backend tạo. Client không được gửi `user_id`, `created_at`, `old_values` hoặc `new_values` để tự ghi đè nhật ký.

---

# 14. PHÂN QUYỀN

| Chức năng | Chủ nhà | Nhân viên | Người thuê |
|---|---|---|---|
| Xem báo cáo tổng quan | Có | Theo quyền | Không |
| Xem doanh thu | Có | Theo quyền | Không |
| Xem công nợ | Có | Theo quyền | Chỉ dữ liệu của mình nếu có chức năng riêng |
| Xem tiền cọc | Có | Theo quyền | Chỉ thông tin cọc của mình nếu được phép |
| Xem điện nước | Có | Theo quyền | Chỉ phòng mình thuê |
| Xem bảo trì | Có | Theo quyền | Chỉ yêu cầu có liên quan |
| Xuất báo cáo | Có | Theo quyền | Không |
| Xem nhật ký toàn hệ thống | Có | Theo quyền kiểm toán | Không |
| Xem hoạt động của mình | Có | Có | Có thể có |
| Xem nhật ký người khác | Có | Theo quyền | Không |
| Xuất nhật ký | Có | Theo quyền kiểm toán | Không |
| Sửa nhật ký | Không | Không | Không |
| Xóa nhật ký | Không | Không | Không |

**Lưu ý:** Quyền quản lý phải được giới hạn theo chủ nhà hoặc khu nhà trọ được giao. Không được để một chủ nhà xem dữ liệu của chủ nhà khác.

---

# 15. ERROR RESPONSE

## 400 – Bad Request

```json
{
  "success": false,
  "message": "Tham số báo cáo không hợp lệ",
  "errors": [
    {
      "field": "fromDate",
      "message": "Ngày bắt đầu không được lớn hơn ngày kết thúc"
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
  "message": "Bạn không có quyền xem báo cáo này"
}
```

## 404 – Not Found

```json
{
  "success": false,
  "message": "Không tìm thấy dữ liệu"
}
```

## 409 – Conflict

```json
{
  "success": false,
  "message": "Không thể tạo báo cáo do dữ liệu đang được xử lý"
}
```

## 422 – Unprocessable Entity

```json
{
  "success": false,
  "message": "Loại báo cáo hoặc định dạng xuất không được hỗ trợ"
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

# 16. TEST CASE – REPORTS

| STT | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| 1 | Xem tổng quan | Token hợp lệ | Trả số liệu tổng quan |
| 2 | Xem báo cáo phòng | Không có bộ lọc | Trả danh sách phòng |
| 3 | Lọc phòng theo trạng thái | status hợp lệ | Trả phòng phù hợp |
| 4 | Tính tỷ lệ lấp đầy | Dữ liệu phòng hợp lệ | Tính đúng tỷ lệ |
| 5 | Xem doanh thu | Khoảng ngày hợp lệ | Trả doanh thu |
| 6 | Doanh thu theo tháng | year hợp lệ | Trả dữ liệu theo tháng |
| 7 | So sánh doanh thu | Hai kỳ hợp lệ | Trả chênh lệch |
| 8 | Xem hóa đơn | Bộ lọc hợp lệ | Trả thống kê hóa đơn |
| 9 | Xem công nợ | Dữ liệu hóa đơn | Tính đúng số dư |
| 10 | Xem thanh toán | Dữ liệu giao dịch | Chỉ tính giao dịch hợp lệ |
| 11 | Xem tiền cọc | Dữ liệu cọc | Phân biệt giữ, hoàn, khấu trừ |
| 12 | Xem điện nước | Dữ liệu chỉ số | Tính đúng lượng tiêu thụ |
| 13 | Xem dịch vụ | Khoảng ngày hợp lệ | Tổng hợp dịch vụ |
| 14 | Xem bảo trì | Khoảng ngày hợp lệ | Tổng hợp yêu cầu |
| 15 | Xuất Excel | format=XLSX | Tạo file hợp lệ |
| 16 | Xuất PDF | format=PDF | Tạo file hợp lệ |
| 17 | Ngày bắt đầu lớn hơn ngày kết thúc | Khoảng ngày sai | Báo lỗi 400 |
| 18 | Chủ nhà xem dữ liệu người khác | ownerId ngoài phạm vi | Báo lỗi 403 |
| 19 | Không có dữ liệu | Khoảng ngày không phát sinh | Trả danh sách rỗng và số liệu 0 |
| 20 | Lọc theo phòng không tồn tại | roomId sai | Báo lỗi 404 |

---

# 17. TEST CASE – ACTIVITY LOGS

| STT | Test Case | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| 1 | Xem danh sách nhật ký | Token hợp lệ | Trả danh sách |
| 2 | Xem chi tiết nhật ký | ID hợp lệ | Trả chi tiết |
| 3 | Lọc theo người dùng | userId hợp lệ | Trả nhật ký người đó |
| 4 | Lọc theo hành động | action=UPDATE | Chỉ trả bản ghi UPDATE |
| 5 | Lọc theo đối tượng | entityType=ROOM | Trả nhật ký phòng |
| 6 | Lọc theo thời gian | Khoảng ngày hợp lệ | Trả đúng thời gian |
| 7 | Xem hoạt động gần đây | limit hợp lệ | Trả bản ghi mới nhất |
| 8 | Xem hoạt động của tôi | Token hợp lệ | Trả nhật ký tài khoản |
| 9 | Người thuê xem nhật ký toàn hệ thống | Token người thuê | Báo lỗi 403 |
| 10 | Người dùng sửa nhật ký | Gọi PUT | Không hỗ trợ hoặc báo lỗi |
| 11 | Người dùng xóa nhật ký | Gọi DELETE | Không hỗ trợ hoặc báo lỗi |
| 12 | Ghi log khi tạo phòng | POST /rooms | Có nhật ký CREATE |
| 13 | Ghi log khi sửa phòng | PUT /rooms/{id} | Có old_values và new_values |
| 14 | Ghi log khi thanh toán | Thanh toán thành công | Có nhật ký PAYMENT |
| 15 | Ghi log khi xuất báo cáo | Export thành công | Có nhật ký EXPORT |
| 16 | Xuất nhật ký | format=XLSX | Tạo file hợp lệ |
| 17 | Truy cập dữ liệu chủ nhà khác | ownerId sai | Báo lỗi 403 |
| 18 | Ghi log thao tác thất bại | Lỗi nghiệp vụ | Ghi nhận theo chính sách |
| 19 | Kiểm tra dữ liệu nhạy cảm | Nhật ký đăng nhập | Không chứa mật khẩu hoặc token |
| 20 | Kiểm tra phân trang | page và limit hợp lệ | Trả đúng số bản ghi |

---

# 18. BẢO MẬT VÀ HIỆU NĂNG

## 18.1. Reports

- Xác thực người dùng trước khi truy vấn.
- Lọc dữ liệu theo quyền sở hữu.
- Không để Client tự truyền ownerId để xem dữ liệu của người khác.
- Giới hạn khoảng thời gian truy vấn.
- Sử dụng phân trang cho báo cáo chi tiết.
- Tối ưu truy vấn bằng Index.
- Có thể tạo bảng tổng hợp hoặc Materialized View nếu dữ liệu lớn.
- Không cache dữ liệu tài chính mà không có chính sách làm mới phù hợp.
- Kiểm tra quyền trước khi xuất file.
- Giới hạn thời hạn tải xuống file.

## 18.2. Activity Logs

- Người dùng thông thường không được sửa nhật ký.
- Người dùng thông thường không được xóa nhật ký.
- Chỉ người được phân quyền mới được xem nhật ký.
- Không lưu mật khẩu, token, OTP và dữ liệu xác thực.
- Giới hạn số lượng kết quả trả về.
- Tạo Index cho các trường truy vấn thường xuyên.
- Có thể phân vùng bảng theo thời gian khi dữ liệu lớn.
- Có chính sách lưu trữ và thời hạn lưu nhật ký.
- Có thể lưu bản sao lưu hoặc dùng kho lưu trữ chống chỉnh sửa nếu yêu cầu kiểm toán cao.
- Nhật ký phải được bảo vệ cả khi xuất file.

---

# 19. INDEX VÀ RÀNG BUỘC DATABASE

## 19.1. Index cho Activity_Logs

Đề xuất:

```sql
CREATE INDEX idx_activity_owner_created
ON Activity_Logs(owner_id, created_at);

CREATE INDEX idx_activity_user_created
ON Activity_Logs(user_id, created_at);

CREATE INDEX idx_activity_entity
ON Activity_Logs(entity_type, entity_id);

CREATE INDEX idx_activity_action
ON Activity_Logs(action);

CREATE INDEX idx_activity_request
ON Activity_Logs(request_id);
```

Tên bảng và kiểu dữ liệu có thể cần điều chỉnh theo hệ quản trị cơ sở dữ liệu thực tế.

## 19.2. Index cho Report Exports

```sql
CREATE INDEX idx_report_exports_owner
ON Report_Exports(owner_id, created_at);

CREATE INDEX idx_report_exports_status
ON Report_Exports(status, created_at);
```

## 19.3. Ràng buộc

- `owner_id` phải tham chiếu đúng chủ sở hữu.
- `user_id` có thể NULL với tác vụ hệ thống.
- `status` phải thuộc danh sách hợp lệ.
- `created_at` phải được Backend tạo.
- Không cho cập nhật hoặc xóa Activity Logs bằng API thông thường.
- File export phải có thời gian hết hạn hoặc chính sách lưu trữ rõ ràng.

---

# 20. ACCEPTANCE CRITERIA – TIÊU CHÍ NGHIỆM THU

## Reports

- [ ] Xem được báo cáo tổng quan.
- [ ] Xem được số lượng và trạng thái phòng.
- [ ] Tính được tỷ lệ lấp đầy.
- [ ] Xem được doanh thu theo khoảng thời gian.
- [ ] Xem được doanh thu theo tháng.
- [ ] So sánh được hai kỳ doanh thu.
- [ ] Xem được báo cáo hóa đơn.
- [ ] Xem được công nợ.
- [ ] Xem được lịch sử thanh toán.
- [ ] Xem được tiền đặt cọc.
- [ ] Xem được tiêu thụ điện nước.
- [ ] Xem được doanh thu dịch vụ.
- [ ] Xem được chi phí bảo trì.
- [ ] Xem được thông tin hợp đồng và người thuê theo quyền.
- [ ] Lọc dữ liệu theo ngày và phòng.
- [ ] Xuất được báo cáo theo định dạng đã triển khai.
- [ ] Số liệu khớp với dữ liệu các module nghiệp vụ.

## Activity Logs

- [ ] Ghi nhật ký khi tạo dữ liệu.
- [ ] Ghi nhật ký khi cập nhật dữ liệu.
- [ ] Ghi nhật ký khi xóa hoặc hủy dữ liệu.
- [ ] Ghi nhật ký khi thay đổi trạng thái quan trọng.
- [ ] Ghi nhật ký khi thanh toán và hoàn tiền.
- [ ] Ghi nhật ký khi xuất báo cáo.
- [ ] Xem được danh sách nhật ký.
- [ ] Xem được chi tiết nhật ký.
- [ ] Lọc được theo người dùng.
- [ ] Lọc được theo loại hành động.
- [ ] Lọc được theo đối tượng.
- [ ] Lọc được theo khoảng thời gian.
- [ ] Xem được hoạt động gần đây.
- [ ] Người dùng không có quyền không thể xem nhật ký của người khác.
- [ ] Không thể sửa hoặc xóa nhật ký qua API thông thường.
- [ ] Không lưu mật khẩu hoặc token trong nhật ký.

---

# 21. THỨ TỰ TRIỂN KHAI

## Giai đoạn 1 – Reports cơ bản

1. Tạo API báo cáo tổng quan.
2. Tạo API báo cáo phòng.
3. Tạo API tỷ lệ lấp đầy.
4. Tạo API doanh thu.
5. Tạo API hóa đơn.
6. Tạo API công nợ.
7. Tạo API thanh toán.

## Giai đoạn 2 – Reports nâng cao

8. Báo cáo tiền cọc.
9. Báo cáo điện nước.
10. Báo cáo dịch vụ.
11. Báo cáo bảo trì.
12. Báo cáo người thuê và hợp đồng.
13. So sánh doanh thu.
14. Xuất Excel, CSV, PDF.

## Giai đoạn 3 – Activity Logs

15. Tạo bảng Activity_Logs.
16. Tạo cơ chế ghi log dùng chung ở Backend.
17. Tích hợp ghi log vào Module Authentication.
18. Tích hợp ghi log vào Module Room.
19. Tích hợp ghi log vào Module Tenant & Contract.
20. Tích hợp ghi log vào Module Rental Services & Billing.
21. Tích hợp ghi log vào Module Notification.
22. Tích hợp ghi log vào Module Maintenance.
23. Tạo API danh sách và chi tiết nhật ký.
24. Tạo bộ lọc và phân trang.
25. Tạo API thống kê và xuất nhật ký.

---

# 22. TỔNG KẾT MODULE 8

Module 8 gồm hai phần độc lập nhưng có liên quan:

**A. REPORTS**

- Overview Reports.
- Room Reports.
- Occupancy Reports.
- Revenue Reports.
- Monthly Revenue.
- Revenue Comparison.
- Invoice Reports.
- Debt Reports.
- Payment Reports.
- Deposit Reports.
- Utility Reports.
- Service Reports.
- Maintenance Reports.
- Tenant Reports.
- Contract Reports.
- Report Export.

**B. ACTIVITY LOGS**

- Activity Log List.
- Activity Log Detail.
- User Activity History.
- Entity Activity History.
- My Activities.
- Activity Statistics.
- Action Types.
- Activity Export.
- Security Events.
- Recent Activities.

**Database chính:**

- `Report_Exports` (tùy chọn).
- `Activity_Logs`.
- `Activity_Log_Metadata` (tùy chọn).
- `Audit_Log_Archives` (tùy chọn).



