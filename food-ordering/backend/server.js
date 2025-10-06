// // const express = require("express");
// // const dotenv = require("dotenv");
// // const cors = require("cors");
// // const { connectMainDB } = require("./config/db");

// // // Load environment variables
// // dotenv.config();

// // // ✅ Connect to main database (users, menus, orders, etc.)
// // connectMainDB();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Import routes
// // const authRoutes = require("./routes/authRoutes");          // user login/register
// // const menuRoutes = require("./routes/menuRoutes");          // menus CRUD
// // const userRoutes = require("./routes/userRoutes");          // user management
// // const orderRoutes = require("./routes/orderRoutes");        // orders
// // const restaurantRoutes = require("./routes/restaurantRoutes"); // restaurants

// // // ✅ Routes
// // app.use("/api/auth", authRoutes);        
// // app.use("/api/menu", menuRoutes);        
// // app.use("/api/users", userRoutes);       
// // app.use("/api/orders", orderRoutes);     
// // app.use("/api/restaurants", restaurantRoutes); 

// // // ✅ Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));







// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
// const { connectMainDB } = require("./config/db");

// // Load environment variables
// dotenv.config();

// // ✅ Connect to main database
// connectMainDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const restaurantRoutes = require("./routes/restaurantRoutes");

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/restaurants", restaurantRoutes);

// // ✅ Start server with Socket.IO
// const PORT = process.env.PORT || 5000;
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // You can restrict this to frontend URL in production
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// // Store io globally so controllers can access
// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("✅ New client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { connectMainDB } = require("./config/db");

// Load environment variables
dotenv.config();

// ✅ Connect to main database
connectMainDB();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);

// ✅ Start server with Socket.IO
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ In production, replace "*" with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Store io globally so controllers can access
app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // ✅ Client joins a room (userId OR restaurantId)
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`📌 Client ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`📌 Client ${socket.id} left room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
