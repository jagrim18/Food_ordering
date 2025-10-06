const mongoose = require("mongoose");

const connectMainDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Main MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Main DB Error: ${error.message}`);
    process.exit(1);
  }
};

// Separate connection for Restaurants DB
const connectRestaurantDB = () => {
  try {
    const restaurantDB = mongoose.createConnection(process.env.RESTAURANT_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Restaurant DB Connected`);
    return restaurantDB;
  } catch (error) {
    console.error(`❌ Restaurant DB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectMainDB, connectRestaurantDB };
