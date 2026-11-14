## Hệ Thống Quản Lý Phòng Trọ & Nhà Cho Thuê

> **Mục đích:** Xác định các tiêu chí chất lượng và vận hành của hệ thống, làm cơ sở cho thiết kế, lập trình, kiểm thử và nghiệm thu.

## 1. Tổng quan

Yêu cầu chức năng mô tả **hệ thống làm gì**; yêu cầu phi chức năng mô tả **hệ thống phải hoạt động tốt đến mức nào**.

Các yêu cầu dưới đây được viết theo hướng có thể kiểm thử. Những con số chưa được chủ nhà hoặc nhóm dự án xác nhận chính thức cần được xem là **mục tiêu đề xuất**, sau đó thống nhất trong quá trình phân tích.

## 2. Danh sách yêu cầu phi chức năng

### NFR-PER-01 — Thời gian phản hồi

- **Nhóm:** Hiệu năng (Performance)
- **Yêu cầu:** Các thao tác thông thường như mở danh sách phòng, xem hóa đơn, tra cứu khách thuê và xem thông tin hợp đồng phải phản hồi nhanh.
- **Tiêu chí nghiệm thu đề xuất:** Trong điều kiện tải bình thường, ít nhất 95% yêu cầu đọc dữ liệu hoàn thành trong không quá **2 giây**; các báo cáo hoặc thao tác xử lý lớn hoàn thành trong không quá **5 giây**, không tính thời gian chờ dịch vụ bên thứ ba.
- **Cách kiểm thử:** Đo thời gian phản hồi bằng công cụ kiểm thử hiệu năng và kiểm tra log máy chủ.

### NFR-AVL-01 — Tính sẵn sàng 24/7

- **Nhóm:** Tính sẵn sàng (Availability)
- **Yêu cầu:** Hệ thống cần hoạt động trực tuyến 24 giờ mỗi ngày, 7 ngày mỗi tuần để chủ nhà, nhân viên quản lý và khách thuê có thể truy cập khi cần.
- **Tiêu chí nghiệm thu đề xuất:** Mục tiêu thời gian hoạt động đạt ít nhất **99,5% mỗi tháng**, không tính thời gian bảo trì đã thông báo trước.
- **Cách kiểm thử:** Theo dõi thời gian hoạt động bằng công cụ giám sát và tổng hợp báo cáo sự cố hằng tháng.
- **Lưu ý:** “24/7” là mục tiêu vận hành liên tục; để cam kết chính xác cần xác định thêm mức uptime, lịch bảo trì và thời gian khôi phục.

### NFR-SCL-01 — Hỗ trợ 100 người dùng đồng thời

- **Nhóm:** Khả năng mở rộng và chịu tải (Scalability)
- **Yêu cầu:** Hệ thống phải hỗ trợ tối thiểu **100 người dùng đồng thời** thực hiện các tác vụ phổ biến mà không bị treo hoặc phát sinh lỗi hàng loạt.
- **Tiêu chí nghiệm thu đề xuất:** Với kịch bản tải đại diện cho 100 người dùng đồng thời, 95% yêu cầu thông thường phản hồi trong không quá 3 giây và tỷ lệ lỗi dưới 1%.
- **Cách kiểm thử:** Chạy kiểm thử tải với các kịch bản đăng nhập, xem phòng, tra cứu hóa đơn và xem hợp đồng.
- **Lưu ý:** Cần phân biệt 100 tài khoản đã đăng ký với 100 người đang thao tác cùng lúc.

### NFR-SEC-01 — Xác thực và phân quyền

- **Nhóm:** Bảo mật (Security)
- **Yêu cầu:** Người dùng phải đăng nhập để truy cập chức năng cần bảo vệ; quyền truy cập được phân theo vai trò như chủ nhà/quản lý, nhân viên quản lý, khách thuê và quản trị hệ thống.
- **Tiêu chí nghiệm thu:** Người dùng không thể xem, sửa hoặc xóa dữ liệu nằm ngoài quyền được cấp.
- **Cách kiểm thử:** Kiểm thử truy cập trái quyền với từng vai trò và kiểm tra các API quan trọng.

### NFR-SEC-02 — Bảo vệ dữ liệu cá nhân

- **Nhóm:** Bảo mật và quyền riêng tư
- **Yêu cầu:** Thông tin định danh, liên hệ, hợp đồng, tiền cọc và lịch sử thanh toán của khách thuê phải được bảo vệ khi truyền và khi lưu trữ theo khả năng của nền tảng triển khai.
- **Tiêu chí nghiệm thu:** Kết nối sử dụng HTTPS trong môi trường triển khai; thông tin nhạy cảm không xuất hiện trong log hoặc thông báo lỗi không cần thiết.
- **Cách kiểm thử:** Kiểm tra cấu hình HTTPS, quyền truy cập dữ liệu và nội dung log.

### NFR-DAT-01 — Độ chính xác tính toán hóa đơn

- **Nhóm:** Toàn vẹn dữ liệu (Data Integrity)
- **Yêu cầu:** Tiền thuê, điện, nước, dịch vụ, tiền cọc và các khoản khấu trừ phải được tính theo bảng giá, chỉ số công tơ và quy tắc đã cấu hình.
- **Tiêu chí nghiệm thu:** Với bộ dữ liệu kiểm thử đã biết kết quả, tổng tiền và từng khoản mục phải khớp với kết quả tính toán chuẩn; hệ thống không tự ý làm tròn hoặc thay đổi quy tắc giá.
- **Cách kiểm thử:** Kiểm thử đơn vị cho từng công thức, gồm trường hợp biên và các bậc giá điện lũy tiến.

### NFR-AI-01 — Độ chính xác OCR/Computer Vision

- **Nhóm:** Chất lượng xử lý AI
- **Yêu cầu:** Khi dùng AI/OCR đọc chỉ số công tơ, hệ thống cần hiển thị kết quả nhận dạng và cho phép người có quyền xác nhận hoặc chỉnh sửa trước khi chốt hóa đơn.
- **Tiêu chí nghiệm thu đề xuất:** Đánh giá độ chính xác trên bộ ảnh công tơ đại diện do nhóm thu thập; đặt ngưỡng mục tiêu sau khi có kết quả thử nghiệm thực tế. Các trường hợp độ tin cậy thấp phải được đưa vào bước kiểm tra thủ công.
- **Cách kiểm thử:** So sánh kết quả OCR với chỉ số được người kiểm tra xác nhận.
- **Lưu ý:** Không nên cam kết một tỷ lệ chính xác cụ thể trước khi kiểm thử trên loại công tơ và điều kiện chụp ảnh thực tế.

### NFR-USE-01 — Tính dễ sử dụng

- **Nhóm:** Khả dụng (Usability)
-   **Yêu cầu:** Giao diện đơn giản, dễ sử dụng, giúp người dùng hoàn
    thành các chức năng với số thao tác tối thiểu.
-   **Tiêu chí nghiệm thu:**
    -   Xem danh sách phòng: tối đa 2 thao tác.
    -   Tìm kiếm phòng: tối đa 3 thao tác.
    -   Thêm khách thuê: tối đa 6 thao tác.
    -   Nhập chỉ số điện, nước: tối đa 5 thao tác.
    -   Tạo hóa đơn: tối đa 4 thao tác.
-   **Kiểm thử:** Thực hiện các tác vụ thực tế và đếm số thao tác cần
    thiết.

> **Lưu ý:** Không tính thời gian đăng nhập, thao tác cuộn trang hoặc
> nhập dữ liệu vào từng trường.

### NFR-REL-01 — Sao lưu và khôi phục dữ liệu

- **Nhóm:** Độ tin cậy (Reliability)
- **Yêu cầu:** Dữ liệu quan trọng như phòng, khách thuê, hợp đồng, hóa đơn và thanh toán phải được sao lưu định kỳ và có quy trình khôi phục khi xảy ra sự cố.
- **Tiêu chí nghiệm thu đề xuất:** Sao lưu tự động ít nhất mỗi ngày; kiểm tra khôi phục định kỳ để xác nhận bản sao lưu sử dụng được.
- **Cách kiểm thử:** Khôi phục dữ liệu vào môi trường thử nghiệm và đối chiếu tính đầy đủ.
- **Lưu ý:** Nhóm cần thống nhất thêm thời gian mất dữ liệu tối đa chấp nhận được (RPO) và thời gian khôi phục mục tiêu (RTO).

### NFR-MNT-01 — Khả năng bảo trì

- **Nhóm:** Khả năng bảo trì (Maintainability)
- **Yêu cầu:** Mã nguồn phải có cấu trúc rõ ràng, đặt tên nhất quán, có hướng dẫn cài đặt/chạy dự án và ghi lại các cấu hình quan trọng.
- **Tiêu chí nghiệm thu:** Thành viên khác trong nhóm có thể chạy dự án theo README; thay đổi một mô-đun không gây lỗi không liên quan ở các mô-đun đã có kiểm thử.
- **Cách kiểm thử:** Thành viên khác làm theo hướng dẫn cài đặt và chạy bộ kiểm thử.

### NFR-MON-01 — Giám sát và ghi nhật ký

- **Nhóm:** Vận hành và hỗ trợ
- **Yêu cầu:** Hệ thống phải ghi nhận lỗi và các sự kiện quan trọng như đăng nhập, thay đổi hóa đơn, điều chỉnh tiền cọc và cập nhật thanh toán; không ghi mật khẩu hoặc dữ liệu bí mật.
- **Tiêu chí nghiệm thu:** Nhân viên kỹ thuật có thể xác định thời điểm và nguyên nhân sơ bộ của lỗi từ log; thao tác nhạy cảm có thông tin người thực hiện và thời gian.
- **Cách kiểm thử:** Tạo lỗi thử nghiệm và thực hiện thao tác nhạy cảm để kiểm tra log.

### NFR-CMP-01 — Tương thích trình duyệt và thiết bị

- **Nhóm:** Tương thích (Compatibility)
- **Yêu cầu:** Giao diện web phải sử dụng được trên các phiên bản hiện hành của Chrome, Edge và trình duyệt di động phổ biến.
- **Tiêu chí nghiệm thu:** Các chức năng chính hoạt động và không bị vỡ bố cục ở kích thước màn hình máy tính và điện thoại đã thống nhất.
- **Cách kiểm thử:** Kiểm thử thủ công trên danh sách trình duyệt và kích thước màn hình mục tiêu.

### NFR-EXT-01 — Khả năng mở rộng nghiệp vụ

- **Nhóm:** Khả năng mở rộng (Scalability)
- **Yêu cầu:** Có thể bổ sung khu nhà, phòng, loại dịch vụ, phương thức thanh toán và quy tắc giá mới mà không phải viết lại toàn bộ hệ thống.
- **Tiêu chí nghiệm thu:** Các bảng giá và dịch vụ thông thường có thể được cấu hình qua chức năng quản lý phù hợp, không cần sửa mã nguồn cho mỗi thay đổi dữ liệu.
- **Cách kiểm thử:** Thêm một loại dịch vụ hoặc bảng giá mới trong môi trường thử nghiệm và kiểm tra quy trình lập hóa đơn.

## 3. Bảng tóm tắt

| Mã | Yêu cầu | Mức độ ưu tiên |
|---|---|---|
| NFR-PER-01 | Thời gian phản hồi nhanh | Cao |
| NFR-AVL-01 | Hoạt động 24/7, mục tiêu uptime 99,5%/tháng | Cao |
| NFR-SCL-01 | Hỗ trợ 100 người dùng đồng thời | Cao |
| NFR-SEC-01 | Xác thực và phân quyền | Cao |
| NFR-SEC-02 | Bảo vệ dữ liệu cá nhân | Cao |
| NFR-DAT-01 | Tính toán hóa đơn chính xác | Cao |
| NFR-AI-01 | Kiểm soát chất lượng OCR/AI | Cao |
| NFR-USE-01 | Giao diện dễ sử dụng | Trung bình |
| NFR-REL-01 | Sao lưu và khôi phục | Cao |
| NFR-MNT-01 | Dễ bảo trì | Trung bình |
| NFR-MON-01 | Giám sát và ghi nhật ký | Cao |
| NFR-CMP-01 | Tương thích trình duyệt/thiết bị | Trung bình |
| NFR-EXT-01 | Mở rộng dịch vụ và bảng giá | Trung bình |

## 4. Quy tắc viết yêu cầu phi chức năng theo góc nhìn BA

Một yêu cầu tốt cần:

1. **Cụ thể:** Nêu rõ đối tượng hoặc chức năng chịu yêu cầu.
2. **Đo lường được:** Có con số, ngưỡng hoặc điều kiện kiểm tra khi phù hợp.
3. **Kiểm thử được:** QA/nhóm phát triển có thể xác minh đạt hay không.
4. **Có thể truy vết:** Có mã yêu cầu để liên kết với thiết kế, test case và kết quả nghiệm thu.
5. **Được các bên liên quan thống nhất:** Phân biệt rõ yêu cầu chính thức và mục tiêu đề xuất.

Ví dụ:

- Chưa tốt: “Website phải nhanh.”
- Tốt hơn: “Trong điều kiện tải bình thường, ít nhất 95% yêu cầu xem danh sách phòng phản hồi trong không quá 2 giây.”

- Chưa tốt: “Server luôn online.”
- Tốt hơn: “Hệ thống hướng tới uptime ít nhất 99,5% mỗi tháng, không tính thời gian bảo trì đã thông báo trước.”

- Chưa tốt: “Có thể có nhiều người dùng.”
- Tốt hơn: “Hệ thống phải phục vụ 100 người dùng đồng thời theo kịch bản kiểm thử đã thống nhất, với 95% yêu cầu thông thường phản hồi trong không quá 3 giây.”

## 5. Definition of Done — Điều kiện hoàn thành

Một yêu cầu phi chức năng chỉ được xem là hoàn thành khi:

- [ ] Có mã định danh và mô tả rõ ràng.
- [ ] Có tiêu chí nghiệm thu cụ thể.
- [ ] Có test case hoặc phương pháp kiểm tra tương ứng.
- [ ] Đã chạy kiểm thử và lưu lại kết quả.
- [ ] Lỗi phát hiện đã được xử lý hoặc được ghi nhận rõ ràng.
- [ ] Chủ nhà/đại diện nghiệp vụ và nhóm dự án thống nhất các ngưỡng cần cam kết.

## 6. Các điểm cần xác nhận với chủ nhà/giảng viên

- [ ] “100 người dùng” có nghĩa là 100 người dùng đồng thời hay 100 tài khoản tổng cộng?
- [ ] Thời gian phản hồi mục tiêu là 2 giây hay ngưỡng khác?
- [ ] Mức uptime yêu cầu là 99%, 99,5% hay 99,9% mỗi tháng?
- [ ] Thời gian bảo trì có được loại khỏi cách tính uptime không?
- [ ] Dữ liệu cần lưu trong bao lâu và ai được quyền xem/sửa?
- [ ] Khi OCR đọc sai chỉ số công tơ, ai là người xác nhận?
- [ ] Tần suất sao lưu và thời gian khôi phục tối đa là bao lâu?
