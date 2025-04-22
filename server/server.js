const express = require("express")
var app = express(); //tạo ứng dụng nodejs
const port = 3000;

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(express.json());  //cho phép đọc dữ liệu dạng json
const cors = require("cors")
app.use(cors()); //cho phép mọi nguồi bên ngoài request đến ứnd dụng

const client = require("./routes/client");
const admin = require("./routes/admin");

app.use("/api", client);
app.use("/admin", admin);

// app.get("/api/news/page/:page", async (req, res) => {
//     const page = Number(req.params.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const offset = (page - 1) * limit;

//     const total = await TinTucModel.count({
//         where: { an_hien: 1 },
//     })

//     const totalPages = Math.ceil(total / limit);

//     const news_arr = await TinTucModel.findAll({
//         where: { an_hien: 1 },
//         order: [['ngay', 'DESC']],
//         offset,
//         limit,
//     })
//     res.json({ news_arr, total, totalPages, page, limit });
// })

// // tin tức theo loại
// app.get("/api/news/loai/:id", async (req, res) => {
//     const id = Number(req.params.id)
//     if (isNaN(id)) {
//         res.status(400).json({ error: "Invalid news ID" });
//         return;
//     }
//     const news_arr = await TinTucModel.findAll({
//         where: { id_loai: id },
//         order: [['ngay', 'DESC']],
//     })
//     res.json(news_arr);
// })

// // loại tin
// app.get("/api/news/loai_tin", async (req, res) => {
//     const loai_tin_arr = await LoaiTinModel.findAll({
//         where: { an_hien: 1 },
//         order: [['thu_tu', 'ASC']],
//     })
//     res.json(loai_tin_arr);
// })

// // chi tiết tin tức
// app.get("/api/news/:slug", async (req, res) => {
//     const slug = req.params.slug
//     if (!slug) {
//         res.status(400).json({ error: "Invalid news slug" });
//         return;
//     }
//     const news = await TinTucModel.findOne({
//         where: { slug: slug },
//     })
//     if (!news) {
//         res.status(404).json({ error: "News not found" });
//         return;
//     }
//     res.json(news);
// })

// // tin tức liên quan 
// app.get("/api/news/related/:id", async (req, res) => {
//     const id = Number(req.params.id)
//     if (isNaN(id)) {
//         res.status(400).json({ error: "Invalid news ID" });
//         return;
//     }
//     const relatedNews = await TinTucModel.findAll({
//         where: { id_loai: id },
//         order: [['ngay', 'DESC']],
//         limit: 3,
//     })
//     if (relatedNews.length === 0) {
//         res.status(404).json({ error: "No related news found" });
//         return;
//     }
//     res.json(relatedNews);
// })

// //routes
// app.get("/api/loai", async (req, res) => {
//     const loai_arr = await LoaiModel.findAll({
//         where: { an_hien: 1 },
//         order: [['thu_tu', 'ASC']],
//     })
//     res.json(loai_arr);
// })

// // { User
// app.post("/api/dangky", async (req, res) => {
//     let { ho_ten, email, mat_khau, dien_thoai, nhap_lai_mat_khau } = req.body
//     const phoneRegex = /^(0(3|5|7|8|9))[0-9]{8}$/;

//     // kiểm tra xem email đã tồn tại trong database chưa
//     const user = await UserModel.findOne({ where: { email: email } })
//     if (user) {
//         res.json({ "thong_bao": "Email đã tồn tại" })
//         return;
//     }

//     if (!ho_ten || !email || !mat_khau || !dien_thoai || !nhap_lai_mat_khau) {
//         res.json({ "thong_bao": "Vui lòng nhập đầy đủ thông tin" })
//         return;
//     } else if (mat_khau.length < 6) {
//         res.json({ "thong_bao": "Mật khẩu phải có ít nhất 6 ký tự" })
//         return;
//     } else if (!phoneRegex.test(dien_thoai)) {
//         res.json({ "thong_bao": "Số điện thoại không hợp lệ (Ví dụ: 0909090909) và có 10 số" })
//         return;
//     } else if (nhap_lai_mat_khau !== mat_khau) {
//         res.json({ "thong_bao": "Mật khẩu không khớp" })
//         return;
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const mat_khau_hash = await bcrypt.hash(mat_khau, salt)

//     await UserModel.create({ email: email, mat_khau: mat_khau_hash, ho_ten: ho_ten, dien_thoai: dien_thoai })
//         .then(data => {
//             if (data.status === 200) {
//                 res.json({ "thong_bao": "Đã tạo tài khoản", "data": data })
//             } else {
//                 this.thong_bao = data.thong_bao;
//             }
//         })
//         .catch(err => res.json({ "thong_bao": "Lỗi tạo tài khoản ", err }))
// })

// app.post("/api/dangnhap", async (req, res) => {
//     let { email, mat_khau } = req.body

//     const user = await UserModel.findOne({ where: { email: email } })
//     if (!user) {
//         return res.status(404).json({ thong_bao: "Email không tồn tại" });
//     }

//     let mat_khau_hash = user.mat_khau
//     let isMatch = bcrypt.compareSync(mat_khau, mat_khau_hash)
//     if (!isMatch) {
//         return res.status(403).json({ thong_bao: "Mật khẩu không chính xác" });
//     }

//     const privateKey = process.env.JWT_SECRET;
//     if (!privateKey) {
//         return res.status(500).json({ thong_bao: "Không tìm thấy khóa bí mật" });
//     }

//     const payload = { id: user.id, email: user.email }
//     const expiresIn = "1h"
//     const bearerToken = jwt.sign(payload, privateKey, {
//         expiresIn: expiresIn,
//         subject: user.id.toString()
//     });

//     res.status(200).json({
//         "status": 200,
//         "thong_bao": "Đăng nhập thành công",
//         "token": bearerToken,
//         "expiresIn": expiresIn,
//         "user": user
//     })
// })

// // cập nhật thông tin tài khoản
// app.post("/api/capnhat", async (req, res) => {
//     let { email, ho_ten, dien_thoai, dia_chi } = req.body;

//     const updateData = {};
//     if (ho_ten && ho_ten.trim() !== "") {
//         updateData.ho_ten = ho_ten;
//     }

//     if (dien_thoai && dien_thoai.trim() !== "") {
//         const phoneRegex = /^0(3|5|7|8|9)[0-9]{8}$/;
//         if (!phoneRegex.test(dien_thoai)) {
//             return res.json({ thong_bao: "Số điện thoại không hợp lệ (Ví dụ: 0909090909)" });
//         }
//         updateData.dien_thoai = dien_thoai;
//     }

//     if (dia_chi && dia_chi.trim() !== "") {
//         updateData.dia_chi = dia_chi;
//     }

//     if (Object.keys(updateData).length === 0) {
//         return res.json({ thong_bao: "Không có trường nào được gửi để cập nhật" });
//     }

//     const user = await UserModel.findOne({ where: { email: email } })
//     if (!user) {
//         res.json({ "thong_bao": "Không tìm thấy tài khoản" })
//         return;
//     }

//     await UserModel.update(updateData, { where: { email } });
//     res.json({ thong_bao: "Đã cập nhật thông tin tài khoản", cap_nhat: updateData });
// })

// app.post("/api/doipass", async (req, res) => {
//     const { email, pass_old, pass_new1, pass_new2 } = req.body;
//     const authHeader = req.headers['authorization'];

//     if (!authHeader) {
//         return res.status(403).json({ thong_bao: "Token không hợp lệ" });
//     }

//     const token = authHeader.split(' ')[1];
//     let decoded;
//     try {
//         const privateKey = process.env.JWT_SECRET;
//         decoded = jwt.verify(token, privateKey);
//     } catch (err) {
//         return res.status(403).json({ thong_bao: "Token hết hạn hoặc không hợp lệ" });
//     }

//     // Kiểm tra email trong token có trùng với email từ client
//     if (decoded.email !== email) {
//         return res.status(403).json({ thong_bao: "Email không trùng khớp với token" });
//     }

//     // Tìm người dùng theo email
//     const user = await UserModel.findOne({ where: { email } });
//     if (!user) {
//         return res.status(404).json({ thong_bao: "Không tìm thấy người dùng" });
//     }

//     const mk_trongdb = user.mat_khau;
//     const match = bcrypt.compareSync(pass_old, mk_trongdb);
//     if (!match) {
//         return res.status(403).json({ thong_bao: "Mật khẩu cũ không đúng" });
//     }

//     if (!pass_new1 || pass_new1 !== pass_new2) {
//         return res.status(400).json({ thong_bao: "2 mật khẩu mới không khớp" });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const mk_mahoa = bcrypt.hashSync(pass_new1, salt);

//     await UserModel.update({ mat_khau: mk_mahoa }, { where: { email } });

//     return res.status(200).json({ thong_bao: "Đổi mật khẩu thành công" });
// });

// // }

// app.get("/api/sphot/:sosp?", async (req, res) => {
//     const sosp = Number(req.params.sosp) || 12
//     const sp_arr = await SanPhamModel.findAll({
//         where: { an_hien: 1, hot: 1 },
//         order: [['ngay', 'DESC'], ['gia', 'ASC']],
//         offset: 0, limit: sosp,
//     })
//     res.json(sp_arr);
// })

// app.get("/api/spmoi/:sosp?", async (req, res) => {
//     const sosp = Number(req.params.sosp) || 6
//     const sp_arr = await SanPhamModel.findAll({
//         where: { an_hien: 1 },
//         order: [['ngay', 'DESC'], ['gia', 'ASC']],
//         offset: 0, limit: sosp,
//     })
//     res.json(sp_arr);
// })

// // API phân trang cho tất cả sản phẩm
// app.get("/api/products/page/:page", async (req, res) => {
//     try {
//         const page = Number(req.params.page) || 1;
//         const limit = Number(req.query.limit) || 9;
//         const offset = (page - 1) * limit;

//         // Lấy tổng số sản phẩm để tính tổng số trang
//         const totalProducts = await SanPhamModel.count({
//             where: { an_hien: 1 }
//         });

//         const totalPages = Math.ceil(totalProducts / limit);

//         // Lấy sản phẩm theo trang
//         const products = await SanPhamModel.findAll({
//             where: { an_hien: 1 },
//             order: [['ngay', 'DESC'], ['gia', 'ASC']],
//             offset: offset,
//             limit: limit
//         });

//         res.json({
//             products,
//             pagination: {
//                 total: totalProducts,
//                 totalPages,
//                 currentPage: page,
//                 limit
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching paginated products:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // API phân trang cho sản phẩm theo loại
// app.get("/api/products/category/:categoryId/page/:page", async (req, res) => {
//     try {
//         const categoryId = Number(req.params.categoryId);
//         const page = Number(req.params.page) || 1;
//         const limit = Number(req.query.limit) || 9;
//         const offset = (page - 1) * limit;

//         // Lấy tổng số sản phẩm trong loại để tính tổng số trang
//         const totalProducts = await SanPhamModel.count({
//             where: { an_hien: 1, id_loai: categoryId }
//         });

//         const totalPages = Math.ceil(totalProducts / limit);

//         // Lấy sản phẩm theo loại và trang
//         const products = await SanPhamModel.findAll({
//             where: { an_hien: 1, id_loai: categoryId },
//             order: [['ngay', 'DESC'], ['gia', 'ASC']],
//             offset: offset,
//             limit: limit
//         });

//         // Lấy thông tin loại
//         const category = await LoaiModel.findByPk(categoryId);

//         res.json({
//             products,
//             category,
//             pagination: {
//                 total: totalProducts,
//                 totalPages,
//                 currentPage: page,
//                 limit
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching paginated products by category:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // API phân trang cho sản phẩm hot
// app.get("/api/products/hot/page/:page", async (req, res) => {
//     try {
//         const page = Number(req.params.page) || 1;
//         const limit = Number(req.query.limit) || 9;
//         const offset = (page - 1) * limit;

//         const totalProducts = await SanPhamModel.count({
//             where: { an_hien: 1, hot: 1 }
//         });

//         const totalPages = Math.ceil(totalProducts / limit);

//         // Lấy sản phẩm hot theo trang
//         const products = await SanPhamModel.findAll({
//             where: { an_hien: 1, hot: 1 },
//             order: [['ngay', 'DESC'], ['gia', 'ASC']],
//             offset: offset,
//             limit: limit
//         });

//         res.json({
//             products,
//             pagination: {
//                 total: totalProducts,
//                 totalPages,
//                 currentPage: page,
//                 limit
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching paginated hot products:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// // API tìm kiếm sản phẩm 
// app.get("/api/search/:key/page/:page", async (req, res) => {
//     try {
//         const key = req.params.key;
//         const page = Number(req.params.page) || 1;
//         const limit = Number(req.query.limit) || 9;
//         const offset = (page - 1) * limit;

//         if (!key) {
//             return res.status(400).json({ error: "Search key cannot be empty" });
//         }

//         const totalProducts = await SanPhamModel.count({
//             where: {
//                 an_hien: 1,
//                 ten_sp: { [Op.like]: `%${key}%` }
//             }
//         });

//         const totalPages = Math.ceil(totalProducts / limit);

//         const products = await SanPhamModel.findAll({
//             where: {
//                 an_hien: 1,
//                 ten_sp: { [Op.like]: `%${key}%` }
//             },
//             order: [['ngay', 'DESC'], ['gia', 'ASC']],
//             offset: offset,
//             limit: limit
//         });

//         res.json({
//             products,
//             pagination: {
//                 total: totalProducts,
//                 totalPages,
//                 currentPage: page,
//                 limit
//             }
//         });
//     } catch (error) {
//         console.error("Error fetching search products:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.get("/api/sp/:slug", async (req, res) => {
//     const slug = req.params.slug
//     if (!slug) {
//         res.status(400).json({ error: "Invalid product slug" });
//         return;
//     }
//     const sp = await SanPhamModel.findOne({
//         where: { slug: slug },
//     })
//     if (!sp) {
//         res.status(404).json({ error: "Sản phẩm không tồn tại" });
//         return;
//     }
//     res.json(sp);
// })

// // sản phẩm cùng loại
// app.get("/api/products/same-category/:categoryId", async (req, res) => {
//     try {
//         const categoryId = Number(req.params.categoryId);
//         const limit = Number(req.query.limit) || 4;
//         const offset = Number(req.query.offset) || 0;

//         const products = await SanPhamModel.findAll({
//             where: { id_loai: categoryId, an_hien: 1 },
//             order: [literal('RAND()')],
//             offset: offset,
//             limit: limit
//         });

//         res.json(products);
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// app.post("/api/sp/:slug", async (req, res) => {
//     const slug = req.params.slug
//     const sp = await SanPhamModel.findOne({ where: { slug } });
//     if (!sp) {
//         res.status(400).json({ error: "Invalid product slug" });
//         return;
//     }
//     const currentLuotXem = sp.luot_xem ?? 0;
//     const newLuotXem = currentLuotXem + 1;

//     await SanPhamModel.update({ luot_xem: newLuotXem }, { where: { slug } });
//     res.json({ thong_bao: "Đã cập nhật lượt xem", luot_xem: newLuotXem });
// })


// app.get("/api/sptrongloai/:id", async (req, res) => {
//     const id_loai = Number(req.params.id)
//     if (isNaN(id_loai)) {
//         res.status(400).json({ error: "Invalid category ID" });
//         return;
//     }
//     const sp_arr = await SanPhamModel.findAll({
//         where: { id_loai: id_loai, an_hien: 1 },
//         order: [['ngay', 'DESC'], ['gia', 'ASC']],
//     })
//     res.json(sp_arr);
// })

// app.get("/api/loai/:id", async (req, res) => {
//     const loai = await LoaiModel.findByPk(req.params.id)
//     if (!loai) {
//         res.status(404).json({ error: "Danh mục đã bị lỗi, vui lòng thử lại sau" });
//         return;
//     }
//     res.json(loai);
// })

// // đặt hàng
// app.post('/api/luudonhang', async (req, res) => {
//     let { ho_ten, email, ghi_chu, dia_chi } = req.body
//     await DonHangModel.create({
//         ho_ten: ho_ten, email: email, ghi_chu: ghi_chu, dia_chi: dia_chi,
//     })
//         .then(function (item) {
//             res.json({ "thong_bao": "Đã tạo đơn hàng", "dh": item });
//         })
//         .catch(function (err) {
//             res.json({ "thong_bao": "Lỗi tạo đơn hàng", err })
//         });
// });

// // lưu giỏ hàng
// app.post('/api/luugiohang', async (req, res) => {
//     let { id_dh, id_sp, so_luong } = req.body
//     await DonHangChiTietModel.create({
//         id_dh: id_dh, id_sp: id_sp, so_luong: so_luong
//     })
//         .then(function (item) {
//             res.json({ "thong_bao": "Đã lưu giỏ hàng", "sp": item });
//         })
//         .catch(function (err) {
//             res.json({ "thong_bao": "Lỗi lưu giỏ hàng ", err })
//         });
// });


app.listen(port, () => {
    console.log(`Ung dung dang chay o port ${port}`);
})
    .on('error', function (err) {
        console.log(`Loi xay ra khi chay ung dung ${err}`)
    });
