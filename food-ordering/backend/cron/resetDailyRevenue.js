// // backend/cron/resetDailyRevenue.js
// const cron = require("node-cron");
// const Restaurant = require("../models/Restaurant");
// const DailyRevenue = require("../models/DailyRevenue");

// /**
//  * We want cron to run at 00:00 IST each day.
//  * IST = UTC + 5:30. To trigger at 00:00 IST, schedule at 18:30 UTC previous day.
//  * Cron expression below runs at 18:30 UTC every day → that's 00:00 IST.
//  *
//  * Note: node-cron uses server local time by default. If your server runs in UTC,
//  * the below expression is correct. If your server runs in IST already, you may
//  * instead use "0 0 * * *". Use whichever matches your deployment environment.
//  *
//  * Here we use the widely compatible UTC-based schedule: "30 18 * * *".
//  */

// cron.schedule("30 18 * * *", async () => {
//   try {
//     console.log("🔄 Daily revenue reset cron started (creating today's entries per restaurant)...");

//     const now = new Date();
//     // Compute IST day key (YYYY-MM-DD)
//     const istOffsetMs = 5.5 * 60 * 60 * 1000;
//     const istDate = new Date(now.getTime() + istOffsetMs);
//     const dayKey = istDate.toISOString().slice(0, 10);

//     const restaurants = await Restaurant.find({}, "_id").lean();

//     for (const r of restaurants) {
//       try {
//         const exists = await DailyRevenue.findOne({
//           day: dayKey,
//           restaurant: r._id,
//         });

//         if (!exists) {
//           await DailyRevenue.create({
//             day: dayKey,
//             restaurant: r._id,
//             totalRevenue: 0,
//             totalOrders: 0,
//           });
//         }
//       } catch (innerErr) {
//         // Log and continue; don't let one failure stop others
//         console.error(`❌ Failed creating daily entry for restaurant ${r._id}:`, innerErr);
//       }
//     }

//     console.log(`✅ Daily revenue entries ensured for day ${dayKey}`);
//   } catch (err) {
//     console.error("❌ Daily revenue cron error:", err);
//   }
// });




// backend/cron/resetDailyRevenue.js
const cron = require("node-cron");
const DailyRevenue = require("../models/DailyRevenue");

/**
 * Daily reset at 00:00 IST
 *
 * IST = UTC + 5:30
 * So we run cron at 18:30 UTC (previous day)
 */
cron.schedule("30 18 * * *", async () => {
  try {
    console.log("🔄 Daily revenue cron started...");

    const now = new Date();
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffsetMs);

    const dayKey = istDate.toISOString().slice(0, 10);

    let todayEntry = await DailyRevenue.findOne({ day: dayKey });

    if (!todayEntry) {
      // Create brand new entry for today
      await DailyRevenue.create({
        day: dayKey,
        totalRevenue: 0,
        totalOrders: 0,
      });

      console.log(`📅 New DailyRevenue created for: ${dayKey}`);
    } else {
      // Reset existing to zero if already created
      todayEntry.totalRevenue = 0;
      todayEntry.totalOrders = 0;
      await todayEntry.save();

      console.log(`♻️ DailyRevenue reset to zero for: ${dayKey}`);
    }

    console.log("✅ Daily revenue cron completed");

  } catch (err) {
    console.error("❌ Daily revenue cron error:", err.message);
  }
});
