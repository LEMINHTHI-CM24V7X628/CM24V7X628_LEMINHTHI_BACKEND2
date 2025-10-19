// app.js

const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");
const ApiError = require("./api-error"); // Đường dẫn đúng vì api-error.js nằm ở thư mục gốc

const app = express();

app.use(cors());
app.use(express.json());

// Định nghĩa routes
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với ứng dụng ContactBook!" });
});
app.use("/api/contacts", contactRouter);

// BƯỚC 1: Middleware xử lý lỗi 404 (Route not found)
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// BƯỚC 2: Middleware xử lý lỗi tập trung (TRẢ VỀ JSON)
app.use((err, req, res, next) => {
    // Kiểm tra và trả về status code của ApiError (hoặc 500 mặc định)
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;