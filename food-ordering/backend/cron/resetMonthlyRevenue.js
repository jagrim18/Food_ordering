const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const MonthlyRevenue = require("../models/MonthlyRevenue");
const ExcelJS = require("exceljs");

// Excel file path
const excelPath = path.join(__dirname, "..", "uploads", "admin_revenue", "revenue.xlsx");

// Ensure directory exists
const excelDir = path.dirname(excelPath);
if (!fs.existsSync(excelDir)) {
  fs.mkdirSync(excelDir, { recursive: true });
}

/* ==========================================================
   Helper: Write / Update Excel file
========================================================== */
async function updateExcelFile() {
  try {
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    // If file exists → load it
    if (fs.existsSync(excelPath)) {
      await workbook.xlsx.readFile(excelPath);
      worksheet = workbook.getWorksheet("Revenue") || workbook.addWorksheet("Revenue");
    } else {
      // Create new file
      worksheet = workbook.addWorksheet("Revenue");

      // Header row
      worksheet.addRow(["Month", "Total Revenue", "Total Orders", "Created At"]);
    }

    // Fetch all revenue records
    const months = await MonthlyRevenue.find().sort({ month: 1 });

    // Clear old rows except header
    worksheet.spliceRows(2, worksheet.rowCount - 1);

    // Insert fresh data
    months.forEach((m) => {
      worksheet.addRow([
        m.month,
        m.totalRevenue,
        m.totalOrders,
        m.createdAt.toISOString().split("T")[0],
      ]);
    });

    // Save file
    await workbook.xlsx.writeFile(excelPath);
    console.log("📁 Revenue Excel file updated");
  } catch (err) {
    console.error("❌ Excel update error:", err);
  }
}

/* ==========================================================
   CRON: Runs on 1st day of each month @ 00:00
========================================================== */
cron.schedule("0 0 1 * *", async () => {
  try {
    console.log("🔄 Monthly revenue cron started...");

    const now = new Date();
    const newMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Check if this month entry already exists
    const exists = await MonthlyRevenue.findOne({ month: newMonth });

    if (!exists) {
      await MonthlyRevenue.create({
        month: newMonth,
        totalRevenue: 0,
        totalOrders: 0,
      });

      console.log(`📅 New month created: ${newMonth}`);
    } else {
      console.log(`✔ Month already exists: ${newMonth}`);
    }

    // Update Excel
    await updateExcelFile();

    console.log("✅ Monthly revenue cron completed");
  } catch (err) {
    console.error("❌ Cron job error:", err);
  }
});

module.exports = { updateExcelFile };
