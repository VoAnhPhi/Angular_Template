import { Routes } from '@angular/router';

// layout
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

// client
import { HomeComponent } from './client/home/home.component';
import { SignInComponent } from './client/sign-in/sign-in.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { ContactComponent } from './client/contact/contact.component';
import { AboutUsComponent } from './client/about-us/about-us.component';
import { NotFoundComponent } from './client/not-found/not-found.component';
import { ProductPageComponent } from './client/product-page/product-page.component';
import { CartPageComponent } from './client/cart-page/cart-page.component';
import { ProductsBycategoryComponent } from './client/products-bycategory/products-bycategory.component';
import { ProductDetailComponent } from './client/product-detail/product-detail.component';
import { SearchComponent } from './client/search/search.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { OrderConfirmationComponent } from './client/order-confirmation/order-confirmation.component';
import { PaymentComponent } from './client/payment/payment.component';
import { AccountComponent } from './client/account/account.component';
import { NewsComponent } from './client/news/news.component';
import { NewsDetailComponent } from './client/news-detail/news-detail.component';

// admin
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdProductComponent } from './admin/ad-product/ad-product.component';
import { AdProductAddComponent } from './admin/ad-product-add/ad-product-add.component';
import { AdProductEditComponent } from './admin/ad-product-edit/ad-product-edit.component';
import { AdCategoryComponent } from './admin/ad-category/ad-category.component';
import { AdCategoryAddComponent } from './admin/ad-category-add/ad-category-add.component';
import { AdCategoryEditComponent } from './admin/ad-category-edit/ad-category-edit.component';
import { AdOrderComponent } from './admin/ad-order/ad-order.component';
import { AdOrderEditComponent } from './admin/ad-order-edit/ad-order-edit.component';
import { AdUserComponent } from './admin/ad-user/ad-user.component';
import { AdUserEditComponent } from './admin/ad-user-edit/ad-user-edit.component';
import { AdNewsComponent } from './admin/ad-news/ad-news.component';
import { AdNewsEditComponent } from './admin/ad-news-edit/ad-news-edit.component';
import { AdNewsAddComponent } from './admin/ad-news-add/ad-news-add.component';
import { AdNewsCategoryComponent } from './admin/ad-news-category/ad-news-category.component';
import { AdNewsCategoryEditComponent } from './admin/ad-news-category-edit/ad-news-category-edit.component';
import { AdNewsCategoryAddComponent } from './admin/ad-news-category-add/ad-news-category-add.component';
import { AdOrderDetailComponent } from './admin/ad-order-detail/ad-order-detail.component';
import { AdUserAddComponent } from './admin/ad-user-add/ad-user-add.component';
import { AdCategoryTrashComponent } from './admin/ad-category-trash/ad-category-trash.component';
import { AdProductTrashComponent } from './admin/ad-product-trash/ad-product-trash.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';
import { AuthGuard } from './admin/auth.guard';
import { AdNewsTrashComponent } from './admin/ad-news-trash/ad-news-trash.component';
export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'admin-auth', component: AdminAuthComponent, title: 'Trang Đăng Nhập Admin' },
            { path: '', component: DashboardComponent, title: 'Trang Quản Trị', canActivate: [AuthGuard] },

            { path: 'product', component: AdProductComponent, title: 'Quản Lý Sản Phẩm', canActivate: [AuthGuard] },
            { path: 'product-trash', component: AdProductTrashComponent, title: 'Thùng Rác Sản Phẩm', canActivate: [AuthGuard] },
            { path: 'product-edit/:id', component: AdProductEditComponent, title: 'Chi Tiết Sản Phẩm', canActivate: [AuthGuard] },
            { path: 'product-add', component: AdProductAddComponent, title: 'Thêm Sản Phẩm', canActivate: [AuthGuard] },

            { path: 'category', component: AdCategoryComponent, title: 'Quản Lý Danh Mục', canActivate: [AuthGuard] },
            { path: 'category-trash', component: AdCategoryTrashComponent, title: 'Thùng Rác Danh Mục', canActivate: [AuthGuard] },
            { path: 'category-edit/:id', component: AdCategoryEditComponent, title: 'Chi Tiết Danh Mục', canActivate: [AuthGuard] },
            { path: 'category-add', component: AdCategoryAddComponent, title: 'Thêm Danh Mục', canActivate: [AuthGuard] },
            
            { path: 'order', component: AdOrderComponent, title: 'Quản Lý Đơn Hàng', canActivate: [AuthGuard] },
            { path: 'order-detail/:id', component: AdOrderDetailComponent, title: 'Chi Tiết Đơn Hàng', canActivate: [AuthGuard] },    
            { path: 'order-edit/:id', component: AdOrderEditComponent, title: 'Sửa Đơn Hàng', canActivate: [AuthGuard] },

            { path: 'user', component: AdUserComponent, title: 'Quản Lý Người Dùng', canActivate: [AuthGuard] },
            { path: 'user-edit/:id', component: AdUserEditComponent, title: 'Chi Tiết Người Dùng', canActivate: [AuthGuard] },
            { path: 'user-add', component: AdUserAddComponent, title: 'Thêm Người Dùng', canActivate: [AuthGuard] },

            { path: 'news', component: AdNewsComponent, title: 'Quản Lý Tin Tức', canActivate: [AuthGuard] },
            { path: 'news-trash', component: AdNewsTrashComponent, title: 'Thùng Rác Tin Tức', canActivate: [AuthGuard] },
            { path: 'news-edit/:id', component: AdNewsEditComponent, title: 'Chi Tiết Tin Tức', canActivate: [AuthGuard] },
            { path: 'news-add', component: AdNewsAddComponent, title: 'Thêm Tin Tức', canActivate: [AuthGuard] },

            { path: 'news-category', component: AdNewsCategoryComponent, title: 'Quản Lý Danh Mục Tin Tức', canActivate: [AuthGuard] },
            { path: 'news-category-edit/:id', component: AdNewsCategoryEditComponent, title: 'Chi Tiết Danh Mục Tin Tức', canActivate: [AuthGuard] },
            { path: 'news-category-add', component: AdNewsCategoryAddComponent, title: 'Thêm Danh Mục Tin Tức', canActivate: [AuthGuard] },

            { path: '**', component: NotFoundComponent, title: 'Không tìm thấy trang admin' }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent, title: 'Trang Chủ' },
            { path: 'product-page', component: ProductPageComponent, title: 'Trang Sản Phẩm' },
            { path: 'product/:slug', component: ProductDetailComponent, title: 'Chi Tiết Sản Phẩm' },
            { path: 'products-bycategory/:category', component: ProductsBycategoryComponent, title: 'Trang Sản Phẩm Theo Danh Mục' },
            { path: 'search', component: SearchComponent, title: 'Trang Tìm Kiếm Sản Phẩm' },
            { path: 'cart', component: CartPageComponent, title: 'Trang Giỏ Hàng' },
            { path: 'contact', component: ContactComponent, title: 'Liên Hệ' },
            { path: 'news', component: NewsComponent, title: 'Tin Tức' },
            { path: 'news_detail/:slug', component: NewsDetailComponent, title: 'Chi Tiết Tin Tức' },
            { path: 'checkout', component: CheckoutComponent, title: 'Thanh Toán' },
            { path: 'payment', component: PaymentComponent, title: 'Thanh Toán' },
            { path: 'order-confirmation', component: OrderConfirmationComponent, title: 'Xác Nhận Đơn Hàng' },
            { path: 'about', component: AboutUsComponent, title: 'Về chúng tôi' },
            { path: 'sign-in', component: SignInComponent, title: 'Trang Đăng Nhập' },
            { path: 'sign-up', component: SignUpComponent, title: 'Trang Đăng Ký' },
            { path: 'account', component: AccountComponent, title: 'Trang Tài Khoản' },
            { path: '**', component: NotFoundComponent, title: 'Không tìm thấy trang' }
        ]
    },
];
