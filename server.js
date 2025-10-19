const app = require("./app");
const config = require("./app/config");
const { connectDB } = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await connectDB();
    app.listen(config.app.port, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${config.app.port}`);
    });
  } catch (error) {
    console.error("❌ Không thể kết nối MongoDB!", error);
    process.exit(1);
  }
}

startServer();
