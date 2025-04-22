# 🛒 ShopTech-ecommerce (Angular)

ShopTech-ecommerce là một website thương mại điện tử hiện đại được xây dựng bằng Angular, giúp người dùng dễ dàng mua sắm các sản phẩm điện tử với trải nghiệm trực quan và tiện lợi.

---

## ✨ Tính năng nổi bật

Ứng dụng cung cấp đầy đủ tính năng cho người dùng và quản trị viên, hỗ trợ trải nghiệm mượt mà và dễ mở rộng.

---

## 🧍‍♂️ Tính năng người dùng

- **Đăng nhập & Đăng ký**: Quản lý tài khoản cá nhân.
- **Duyệt sản phẩm**: Theo danh mục, từ khóa tìm kiếm.
- **Chi tiết sản phẩm**: Hiển thị thông tin đầy đủ (hình ảnh, giá, mô tả...).
- **Giỏ hàng**: Thêm, cập nhật, xóa sản phẩm theo thời gian thực.
- **Thanh toán & Xác nhận đơn hàng**: Đặt hàng, thanh toán, nhận xác nhận.
- **Trang tin tức**: Đọc các bài viết công nghệ.
- **Trang giới thiệu, liên hệ, tài khoản**: Hỗ trợ người dùng hiểu rõ về doanh nghiệp.

---

## 🛠️ Tính năng quản trị (Admin)

Admin sử dụng dashboard để quản lý toàn bộ hệ thống với các chức năng CRUD & soft-delete.

### 👤 Quản lý người dùng
- Thêm, sửa, xóa tạm thời người dùng.

### 📦 Quản lý sản phẩm
- Tạo, sửa, xóa tạm thời sản phẩm với đầy đủ thông tin.

### 🗃️ Quản lý danh mục sản phẩm
- Tạo, chỉnh sửa, xóa tạm thời danh mục.

### 📰 Quản lý tin tức & danh mục tin tức
- Tạo, sửa, xoá tin bài & danh mục bài viết.

### 📦 Quản lý đơn hàng
- Theo dõi chi tiết đơn hàng: sản phẩm, người dùng, tổng tiền, trạng thái.

---

## 🧭 Kiến trúc router

Dự án sử dụng Angular Routing để phân chia layout người dùng và quản trị viên rõ ràng:

### 🏢 **Layout người dùng (`MainLayoutComponent`)**

| Route | Mô tả |
|-------|-------|
| `/` | Trang chủ |
| `/product-page` | Danh sách sản phẩm |
| `/product/:slug` | Chi tiết sản phẩm |
| `/products-bycategory/:category` | Sản phẩm theo danh mục |
| `/search` | Tìm kiếm |
| `/cart` | Giỏ hàng |
| `/checkout`, `/payment`, `/order-confirmation` | Thanh toán |
| `/contact`, `/about` | Liên hệ, Giới thiệu |
| `/news`, `/news_detail/:slug` | Tin tức & chi tiết |
| `/sign-in`, `/sign-up`, `/account` | Xác thực & tài khoản |
| `**` | Trang 404 |

---

### 🔐 **Layout quản trị (`AdminLayoutComponent`)** – `canActivate: [AuthGuard]`

| Route | Mô tả |
|-------|-------|
| `/admin` | Trang tổng quan |
| `/admin/product`, `/admin/product-add`, `/admin/product-edit/:id`, `/admin/product-trash` | Quản lý sản phẩm |
| `/admin/category`, `/admin/category-add`, `/admin/category-edit/:id`, `/admin/category-trash` | Quản lý danh mục |
| `/admin/order`, `/admin/order-detail/:id`, `/admin/order-edit/:id` | Quản lý đơn hàng |
| `/admin/user`, `/admin/user-add`, `/admin/user-edit/:id` | Quản lý người dùng |
| `/admin/news`, `/admin/news-add`, `/admin/news-edit/:id`, `/admin/news-trash` | Quản lý tin tức |
| `/admin/news-category`, `/admin/news-category-add`, `/admin/news-category-edit/:id` | Quản lý danh mục tin tức |
| `/admin/admin-auth` | Trang đăng nhập quản trị |
| `**` | Trang 404 (admin) |

---

## 📂 Cấu trúc dự án chính

