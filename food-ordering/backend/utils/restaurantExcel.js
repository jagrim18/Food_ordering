// backend/utils/restaurantExcel.js
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

/**
 * Saves advanced restaurant Excel report
 * @param {String} restaurantId 
 * @param {String} startDate YYYY-MM-DD 
 * @param {String} endDate YYYY-MM-DD 
 * @param {Object} payload { summary, perDay, topItems, payments, peakHour }
 * @returns {String} relative path for download
 */
exports.buildAndSaveRestaurantExcel = async (
  restaurantId,
  startDate,
  endDate,
  payload
) => {
  const { summary, perDay, topItems, payments, peakHour } = payload;

  // Base directory: /uploads/restaurant_reports/<restaurantId>
  const baseDir = path.join(
    __dirname,
    "..",
    "uploads",
    "restaurant_reports",
    restaurantId
  );

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // File name
  const fileName = `${startDate}_to_${endDate}.xlsx`;
  const fullPath = path.join(baseDir, fileName);

  // Create workbook
  const workbook = new ExcelJS.Workbook();

  /* ================================
     SHEET 1 — SUMMARY
  =================================*/
  const summarySheet = workbook.addWorksheet("Summary");

  summarySheet.addRow(["Metric", "Value"]);
  summarySheet.addRow(["Total Revenue", summary.totalRevenue]);
  summarySheet.addRow(["Total Orders", summary.totalOrders]);
  summarySheet.addRow(["Cancelled Orders", summary.cancelledOrders]);
  summarySheet.addRow(["Average Order Value", summary.avgOrderValue.toFixed(2)]);
  summarySheet.addRow(["Peak Order Hour", peakHour]);

  summarySheet.columns = [
    { width: 30 },
    { width: 25 },
  ];

  /* ================================
     SHEET 2 — Daily Report
  =================================*/
  const dailySheet = workbook.addWorksheet("Daily Report");

  dailySheet.addRow([
    "Date",
    "Total Orders",
    "Delivered",
    "Cancelled",
    "Revenue",
    "Avg Order Value",
    "Most Sold Item",
    "Qty",
  ]);

  perDay.forEach((d) => {
    dailySheet.addRow([
      d.date,
      d.totalOrders,
      d.deliveredOrders,
      d.cancelledOrders,
      d.totalRevenue,
      d.avgOrderValue.toFixed(2),
      d.mostSoldItem,
      d.mostSoldQty,
    ]);
  });

  dailySheet.columns = [
    { width: 12 },
    { width: 14 },
    { width: 12 },
    { width: 12 },
    { width: 14 },
    { width: 17 },
    { width: 25 },
    { width: 10 },
  ];

  /* ================================
     SHEET 3 — Top Items Overall
  =================================*/
  const topSheet = workbook.addWorksheet("Top Items");

  topSheet.addRow(["Item Name", "Qty Sold", "Revenue"]);

  topItems.forEach((item) => {
    topSheet.addRow([item.name, item.qty, item.revenue]);
  });

  topSheet.columns = [
    { width: 30 },
    { width: 12 },
    { width: 15 },
  ];

  /* ================================
     SHEET 4 — Payment Breakdown
  =================================*/
  const paySheet = workbook.addWorksheet("Payments");

  paySheet.addRow(["Method", "Total Amount"]);

  Object.keys(payments).forEach((k) => {
    paySheet.addRow([k, payments[k]]);
  });

  paySheet.columns = [
    { width: 20 },
    { width: 20 },
  ];

  /* ================================
     SHEET 5 — Top 3 Items per Day
  =================================*/
  const topDailySheet = workbook.addWorksheet("Daily Top 3 Items");

  topDailySheet.addRow(["Date", "Item", "Qty", "Revenue"]);

  perDay.forEach((d) => {
    (d.top3 || []).forEach((item) => {
      topDailySheet.addRow([
        d.date,
        item.name,
        item.qty,
        item.revenue,
      ]);
    });
  });

  topDailySheet.columns = [
    { width: 12 },
    { width: 30 },
    { width: 10 },
    { width: 14 },
  ];

  /* ================================
     WRITE FILE
  =================================*/
  await workbook.xlsx.writeFile(fullPath);

  console.log("📁 Restaurant Excel Report Saved:", fullPath);

  // Return relative path for FE download
  return `/uploads/restaurant_reports/${restaurantId}/${fileName}`;
};
