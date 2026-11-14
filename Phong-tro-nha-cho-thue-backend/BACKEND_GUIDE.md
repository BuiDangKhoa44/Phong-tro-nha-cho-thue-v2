# Backend quản lý phòng trọ (bản MVP)

## Chạy với Docker

1. Sao chép `.env.example` thành `.env` và đổi **tất cả** mật khẩu, JWT_SECRET.
2. Chạy `docker compose up -d --build` tại thư mục gốc.
3. Kiểm tra `http://localhost:3000/health`.
4. Tạo tài khoản chủ nhà bằng `POST /api/v1/auth/register`, sau đó đăng nhập qua `POST /api/v1/auth/login`.
5. Các API còn lại gửi `Authorization: Bearer <access_token>`.

Ví dụ đăng ký:
```bash
curl -X POST http://localhost:3000/api/v1/auth/register -H 'Content-Type: application/json' -d '{"full_name":"Chu nha","email":"owner@example.com","password":"ChangeMe123!"}'
```

## API có thể dùng

- Auth: `POST /auth/register`, `/auth/login`, `/auth/change-password`; `GET /auth/me`.
- Properties: `GET,POST /properties`; `GET,PUT /properties/:id`.
- Rooms: `GET,POST /rooms`; `GET,PUT /rooms/:id`; `PATCH /rooms/:id/status`.
- Tenants: `GET,POST /tenants`; `GET,PUT,DELETE /tenants/:id`.
- Contracts: `GET,POST /contracts`; `GET /contracts/:id`; `POST /contracts/:id/end`.
- Services: `GET,POST /services`; `PUT /services/:id`.
- Utilities: `GET,POST /meter-readings` (GET yêu cầu `contract_id`).
- Invoices: `POST /invoices/generate`; `GET /invoices`, `/invoices/:id`.
- Payments: `POST,GET /payments`.
- Maintenance: `GET,POST /maintenance`; `PATCH /maintenance/:id/status`.
- Reports: `GET /reports/overview`; audit: `GET /audit-logs`.
- Notifications: `GET /notifications`; `PATCH /notifications/:id/read`.

Tất cả endpoint trên có prefix `/api/v1`.

## Lưu ý triển khai

Đây là **MVP**, chưa bao phủ toàn bộ API trong 8 tài liệu thiết kế. Chưa có refresh token, email reset password, quản lý nhân viên đầy đủ, bảng giá điện lũy tiến, OCR/AI, QR/payment gateway, scheduler, deposit ledger, xuất báo cáo, test tự động. Chỉ ghi nhận thanh toán thủ công, **không tự xác nhận tiền chuyển khoản**. Giá điện/nước hiện tính đơn giá cố định trên mỗi lần ghi chỉ số. Không tuyên bố đã kiểm thử Docker/MySQL trong môi trường này.

`database/init.sql` chỉ tự chạy khi MySQL volume **mới**. Nếu đã có dữ liệu, hãy **sao lưu** trước; không chạy `docker compose down -v` trên dữ liệu cần giữ. Cần xây migration nâng cấp schema riêng cho volume cũ. Trạng thái phòng chuẩn hóa thành `VACANT/OCCUPIED/MAINTENANCE`, khác từ `RENTED` xuất hiện trong một tài liệu API.

Lưu ý bảo mật: đăng ký công khai tạo LANDLORD mới (phù hợp môi trường demo). Khi triển khai thật cần chính sách onboarding/chống spam, giới hạn phân quyền STAFF, kiểm thử quyền trên mọi endpoint và hệ thống migrations. Phân quyền hiện chỉ có LANDLORD/STAFF cơ bản, không phải RBAC đầy đủ.
