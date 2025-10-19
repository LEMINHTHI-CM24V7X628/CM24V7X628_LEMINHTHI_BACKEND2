const express = require("express");
const cors = require("cors");
const contactRouter = require("./app/routes/contact.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRouter);

app.get("/", (req, res) => {
  res.json({ message: "Chào mừng đến với ứng dụng ContactBook!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy tài nguyên" });
});

module.exports = app;
