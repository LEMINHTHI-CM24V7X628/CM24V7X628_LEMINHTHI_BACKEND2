const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
// BỔ SUNG: Import ApiError để xử lý lỗi
const ApiError = require("./api-error"); 

const app = express();

app.use(cors());
app.use(express.json());

// Định nghĩa routes
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với ứng dụng ContactBook!" });
});
app.use("/api/contacts", contactRouter);

// BƯỚC 1 (Cuối cùng): Middleware xử lý lỗi 404 (Khi không tìm thấy Route)
// Middleware này phải nằm sau tất cả các routes khác
app.use((req, res, next) => {
    // Nếu request tới một route không tồn tại, tạo lỗi 404 và chuyển cho middleware tiếp theo
    return next(new ApiError(404, "Resource not found"));
});

// BƯỚC 2 (Cuối cùng): Middleware xử lý lỗi tập trung
// Middleware này phải có 4 tham số (err, req, res, next)
app.use((err, req, res, next) => {
    // Phản hồi lỗi dưới dạng JSON
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;