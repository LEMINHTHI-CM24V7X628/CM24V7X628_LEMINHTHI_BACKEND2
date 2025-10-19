const app = require("./app"); // Nhập cấu hình ứng dụng Express từ app.js
const config = require("./app/config");
// KHẮC PHỤC LỖI: Nhập đối tượng MongoDB (chứ không phải hàm connectDB)
const MongoDB = require("./app/utils/mongodb.util"); 

async function startServer() {
    try {
        // KHẮC PHỤC LỖI: Gọi hàm kết nối chính xác là MongoDB.connect()
        await MongoDB.connect(config.db.uri); 
        console.log("✅ Kết nối MongoDB thành công!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
        });
    } catch (error) {
        // Sửa thông báo lỗi để hiển thị lỗi gốc
        console.error("❌ Không thể kết nối MongoDB! ", error.message);
        process.exit(1); // Thoát nếu không kết nối được
    }
}

startServer();