// // backend/server.js
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const path = require("path");
// const { Server } = require("socket.io");
// const connectMainDB = require("./config/db");

// // ============================================================
// // 🌍 Load environment variables
// // ============================================================
// dotenv.config();

// // ============================================================
// // 🧠 Connect MongoDB
// // ============================================================
// connectMainDB();

// const app = express();

// // ============================================================
// // ⚙️ Middleware
// // ============================================================

// // Increase payload size for images & forms
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// // Allow frontend to connect (CORS setup)
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // ============================================================
// // 🖼️ Serve Uploaded Files (Public Access)
// // ============================================================

// // ✅ Serve "uploads" folder statically
// const uploadsPath = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(uploadsPath));

// console.log(`📸 Serving static files from: ${uploadsPath}`);

// // ============================================================
// // 📦 Import Routes
// // ============================================================
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const restaurantItemRoutes = require("./routes/restaurantItemRoutes");

// // ============================================================
// // 🚏 Mount Routes
// // ============================================================
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/restaurantitems", restaurantItemRoutes);

// // ============================================================
// // 🏠 Base Route
// // ============================================================
// app.get("/", (req, res) => {
//   res.send("🍔 Foodify Backend API is running successfully!");
// });

// // ============================================================
// // ⚡ Socket.IO Setup
// // ============================================================
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("✅ Client connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     if (!roomId) return;
//     socket.join(roomId);
//     console.log(`📌 ${socket.id} joined room: ${roomId}`);
//   });

//   socket.on("leaveRoom", (roomId) => {
//     if (!roomId) return;
//     socket.leave(roomId);
//     console.log(`📤 ${socket.id} left room: ${roomId}`);
//   });

//   socket.on("disconnect", (reason) => {
//     console.log(`❌ Client disconnected (${socket.id}) - reason: ${reason}`);
//   });
// });

// // ============================================================
// // 🚀 Start Server
// // ============================================================
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🌐 Visit: http://localhost:${PORT}/uploads/restaurants/<image-name>.png`);
// });



// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const connectMainDB = require("./config/db");

// ============================================================
// 🌍 Load environment variables
// ============================================================
dotenv.config();

// ============================================================
// 🧠 Connect MongoDB
// ============================================================
connectMainDB();

const app = express();

// ============================================================
// ⚙️ Middleware
// ============================================================

// ✅ Parse JSON and Form Data (support large uploads)
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// ✅ Allow frontend connection (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ============================================================
// 🖼️ Serve Uploaded Files (Profile + Gallery)
// ============================================================
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));
console.log(`📸 Static files served from: ${uploadsPath}`);
console.log(`🌐 Accessible at: http://localhost:${process.env.PORT || 5000}/uploads/<file-name>`);

// ============================================================
// 📦 Import Routes
// ============================================================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const restaurantItemRoutes = require("./routes/restaurantItemRoutes");

// ============================================================
// 🚏 Mount Routes
// ============================================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/restaurantitems", restaurantItemRoutes);

// ============================================================
// 🏠 Base Route
// ============================================================
app.get("/", (req, res) => {
  res.send("🍔 Foodify Backend API is running successfully!");
});

// ============================================================
// ⚡ Socket.IO Setup
// ============================================================
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`📌 ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    if (!roomId) return;
    socket.leave(roomId);
    console.log(`📤 ${socket.id} left room: ${roomId}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`❌ Client disconnected (${socket.id}) - reason: ${reason}`);
  });
});

// ============================================================
// 🚀 Start Server
// ============================================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Static uploads: http://localhost:${PORT}/uploads/`);
});
