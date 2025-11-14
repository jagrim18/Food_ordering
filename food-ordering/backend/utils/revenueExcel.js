const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const MonthlyRevenue = require("../models/MonthlyRevenue");

// Path of Excel file
const excelPath = path.join(__dirname, "..", "uploads", "admin_revenue", "revenue.xlsx");

// Make sure directory exists
const excelDir = path.dirname(excelPath);
if (!fs.existsSync(excelDir)) {
  fs.mkdirSync(excelDir, { recursive: true });
}

/* ==========================================================
   Generate or Update the Revenue Excel File
========================================================== */
const generateRevenueExcel = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    let worksheet;

    // Load existing file if it exists
    if (fs.existsSync(excelPath)) {
      await workbook.xlsx.readFile(excelPath);
      worksheet = workbook.getWorksheet("Revenue") || workbook.addWorksheet("Revenue");
    } else {
      // Create new workbook
      worksheet = workbook.addWorksheet("Revenue");

      // Header row
      worksheet.addRow(["Month", "Total Revenue", "Total Orders", "Created At"]);
    }

    // Fetch all months from database
    const months = await MonthlyRevenue.find().sort({ month: 1 });

    // Clear old rows except header (row 1)
    worksheet.spliceRows(2, worksheet.rowCount - 1);

    // Insert updated month rows
    months.forEach((m) => {
      worksheet.addRow([
        m.month,
        m.totalRevenue,
        m.totalOrders,
        m.createdAt.toISOString().split("T")[0],
      ]);
    });

    // Apply styling
    worksheet.columns.forEach((col) => {
      col.width = 20;
    });

    // Save the Excel
    await workbook.xlsx.writeFile(excelPath);

    console.log("📁 Revenue Excel generated/updated successfully");

    return excelPath;
  } catch (error) {
    console.error("❌ Error generating revenue Excel:", error);
    throw error;
  }
};

module.exports = { generateRevenueExcel, excelPath };
