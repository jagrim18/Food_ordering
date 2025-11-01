// const mongoose = require("mongoose");

// const connectMainDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`✅ Main MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ Main DB Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// // Separate connection for Restaurants DB
// const connectRestaurantDB = () => {
//   try {
//     const restaurantDB = mongoose.createConnection(process.env.RESTAURANT_MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`✅ Restaurant DB Connected`);
//     return restaurantDB;
//   } catch (error) {
//     console.error(`❌ Restaurant DB Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = { connectMainDB, connectRestaurantDB };


















// const mongoose = require("mongoose");

// const connectMainDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     return conn;
//   } catch (error) {
//     console.error(`❌ DB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectMainDB;













// backend/config/db.js
const mongoose = require("mongoose");

const connectMainDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMainDB;
