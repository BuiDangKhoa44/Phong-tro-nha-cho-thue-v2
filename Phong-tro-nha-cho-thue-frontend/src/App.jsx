
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Receipt,
  Wallet,
  Wrench,
  Bell,
  BarChart3,
  Settings,
  Search,
  Menu,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Home,
  CalendarDays,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";
import "./App.css";

const menuItems = [
  { name: "Tổng quan", icon: LayoutDashboard },
  { name: "Quản lý phòng", icon: Building2 },
  { name: "Người thuê", icon: Users },
  { name: "Hợp đồng", icon: FileText },
  { name: "Hóa đơn", icon: Receipt },
  { name: "Tiền cọc", icon: Wallet },
  { name: "Bảo trì", icon: Wrench },
  { name: "Thông báo", icon: Bell },
  { name: "Báo cáo", icon: BarChart3 },
];

const revenueData = [
  { month: "T1", revenue: 25 },
  { month: "T2", revenue: 32 },
  { month: "T3", revenue: 28 },
  { month: "T4", revenue: 40 },
  { month: "T5", revenue: 35 },
  { month: "T6", revenue: 48 },
  { month: "T7", revenue: 43 },
  { month: "T8", revenue: 55 },
  { month: "T9", revenue: 49 },
  { month: "T10", revenue: 62 },
  { month: "T11", revenue: 58 },
  { month: "T12", revenue: 70 },
];

const rooms = [
  { name: "Phòng A101", tenant: "Nguyễn Văn An", price: "3.500.000đ", status: "Đang thuê" },
  { name: "Phòng A102", tenant: "Trần Thị Mai", price: "3.000.000đ", status: "Đang thuê" },
  { name: "Phòng A103", tenant: "Chưa có người thuê", price: "2.800.000đ", status: "Còn trống" },
  { name: "Phòng B201", tenant: "Lê Văn Nam", price: "4.000.000đ", status: "Đang thuê" },
];

function App() {
  const [activeMenu, setActiveMenu] = useState("Tổng quan");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Tổng số phòng",
      value: "50",
      note: "Phòng trong hệ thống",
      icon: Building2,
      color: "blue",
    },
    {
      title: "Phòng đang thuê",
      value: "38",
      note: "76% công suất",
      icon: Home,
      color: "green",
    },
    {
      title: "Phòng còn trống",
      value: "12",
      note: "24% tổng số phòng",
      icon: Users,
      color: "orange",
    },
    {
      title: "Doanh thu tháng",
      value: "125 triệu",
      note: "So với tháng trước",
      icon: Wallet,
      color: "purple",
    },
  ];

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarOpen ? "" : "sidebar-closed"}`}>
        <div className="brand">
          <div className="brand-icon">
            <Building2 size={25} />
          </div>
          {sidebarOpen && (
            <div>
              <h2>RentalPro</h2>
              <span>QUẢN LÝ NHÀ TRỌ</span>
            </div>
          )}
        </div>

        <div className="menu-label">MENU CHÍNH</div>

        <nav className="navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => setActiveMenu(item.name)}
                title={item.name}
              >
                <Icon size={19} />
                {sidebarOpen && <span>{item.name}</span>}
                {item.name === "Thông báo" && sidebarOpen && (
                  <span className="notification-count">3</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={19} />
            {sidebarOpen && <span>Cài đặt</span>}
          </button>
          {sidebarOpen && <p>RentalPro © 2026</p>}
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={22} />
            </button>
            <div>
              <h3>{activeMenu}</h3>
              <p>Trang chủ / {activeMenu}</p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={17} />
              <input placeholder="Tìm kiếm..." />
            </div>

            <button className="icon-button notification-button">
              <Bell size={20} />
              <span></span>
            </button>

            <div className="profile">
              <div className="avatar">AD</div>
              <div className="profile-info">
                <strong>Admin</strong>
                <span>Chủ nhà</span>
              </div>
            </div>
          </div>
        </header>

        {activeMenu === "Tổng quan" ? (
          <div className="dashboard">
            <section className="welcome-section">
              <div>
                <h1>Tổng quan hệ thống</h1>
                <p>Chào mừng bạn trở lại! Đây là tình hình nhà trọ hôm nay.</p>
              </div>

              <button className="primary-button">
                <Plus size={18} />
                Thêm phòng mới
              </button>
            </section>

            <section className="stats-grid">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="stat-card" key={stat.title}>
                    <div className={`stat-icon ${stat.color}`}>
                      <Icon size={23} />
                    </div>
                    <p>{stat.title}</p>
                    <h2>{stat.value}</h2>
                    <span>{stat.note}</span>
                  </div>
                );
              })}
            </section>

            <section className="content-grid">
              <div className="panel revenue-panel">
                <div className="panel-header">
                  <div>
                    <h3>Doanh thu</h3>
                    <p>Thống kê doanh thu theo tháng</p>
                  </div>
                  <button className="filter-button">
                    <CalendarDays size={16} />
                    Năm 2026
                  </button>
                </div>

                <div className="revenue-total">
                  <h2>125.000.000đ</h2>
                  <span className="growth">
                    <ArrowUpRight size={16} /> 12,5%
                  </span>
                </div>

                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4778ee" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#4778ee" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4778ee"
                        strokeWidth={3}
                        fill="url(#revenueColor)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="panel occupancy-panel">
                <div className="panel-header">
                  <div>
                    <h3>Tình trạng phòng</h3>
                    <p>Thống kê hiện tại</p>
                  </div>
                </div>

                <div className="occupancy-number">76%</div>
                <p className="occupancy-description">Tỷ lệ lấp đầy</p>

                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>

                <div className="occupancy-row">
                  <span><i className="dot green-dot"></i> Đang thuê</span>
                  <strong>38 phòng</strong>
                </div>
                <div className="occupancy-row">
                  <span><i className="dot orange-dot"></i> Còn trống</span>
                  <strong>12 phòng</strong>
                </div>
              </div>
            </section>

            <section className="panel rooms-panel">
              <div className="panel-header">
                <div>
                  <h3>Danh sách phòng gần đây</h3>
                  <p>Thông tin các phòng trong hệ thống</p>
                </div>
                <button className="text-button" onClick={() => setActiveMenu("Quản lý phòng")}>
                  Xem tất cả
                  <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>TÊN PHÒNG</th>
                      <th>NGƯỜI THUÊ</th>
                      <th>GIÁ THUÊ</th>
                      <th>TRẠNG THÁI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.name}>
                        <td><strong>{room.name}</strong></td>
                        <td>{room.tenant}</td>
                        <td>{room.price}</td>
                        <td>
                          <span className={`status ${room.status === "Đang thuê" ? "occupied" : "vacant"}`}>
                            {room.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : (
          <div className="placeholder-page">
            <div className="placeholder-icon">
              <Building2 size={35} />
            </div>
            <h2>{activeMenu}</h2>
            <p>Chức năng này sẽ được xây dựng ở bước tiếp theo.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;