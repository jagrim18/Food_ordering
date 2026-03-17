// backend/utils/printReceipt.js
/**
 * ESC/POS network printer helper.
 *
 * - Uses environment variables:
 *    PRINTER_IP (required to actually print)
 *    PRINTER_PORT (optional, default 9100)
 *
 * If PRINTER_IP is not set, the module will gracefully fallback to logging
 * the receipt data so nothing breaks.
 *
 * Requires: npm i escpos escpos-network
 */

const util = require("util");

const PRINTER_IP = process.env.PRINTER_IP || "";
const PRINTER_PORT = parseInt(process.env.PRINTER_PORT || "9100", 10);

// lazy import to avoid errors if package not installed and PRINTER_IP is empty
let escpos, NetworkDevice, PrinterClass;

const isPrinterConfigured = !!PRINTER_IP;

async function ensureEscpos() {
  if (!isPrinterConfigured) return false;
  if (escpos) return true;
  try {
    escpos = require("escpos");
    // network support
    require("escpos-network");
    NetworkDevice = escpos.Network;
    PrinterClass = escpos.Printer;
    return true;
  } catch (err) {
    console.error(
      "⚠️ escpos (or escpos-network) not installed or failed to load. Install with: npm i escpos escpos-network",
      err
    );
    return false;
  }
}

/**
 * Pretty-print receipt to console for debugging / fallback.
 */
function printToConsole(order, restaurant) {
  const lines = [];
  lines.push("===== RECEIPT =====");
  lines.push(restaurant?.name || "RESTAURANT");
  lines.push(`Order #: ${order.orderNumber || order._id}`);
  lines.push(`Order ID: ${order._id}`);
  lines.push(`Date: ${new Date(order.createdAt).toLocaleString()}`);
  lines.push("-------------------------------");
  (order.items || []).forEach((it) => {
    const name = it.name || it.itemName || "Item";
    const qty = it.quantity || 1;
    const price = it.price || 0;
    const total = price * qty;
    lines.push(`${name} x${qty}  ₹${price}  => ₹${total}`);
  });
  lines.push("-------------------------------");
  lines.push(`Subtotal: ₹${order.totalPrice || 0}`);
  if (order.tax) lines.push(`Tax: ₹${order.tax}`);
  if (order.deliveryCharges) lines.push(`Delivery: ₹${order.deliveryCharges}`);
  lines.push(`TOTAL: ₹${order.totalPrice || 0}`);
  lines.push("-------------------------------");
  lines.push("Thanks! Please visit again.");
  lines.push("=====================");
  console.log(lines.join("\n"));
}

/**
 * Format a line with left and right parts for fixed width.
 * (Simple heuristic, used for console fallback)
 */
function padLine(left, right = "", width = 32) {
  left = String(left || "");
  right = String(right || "");
  const leftLen = left.length;
  const rightLen = right.length;
  const space = Math.max(1, width - leftLen - rightLen);
  return left + " ".repeat(space) + right;
}

/**
 * Print the order via network ESC/POS printer.
 * If PRINTER_IP not configured, fallback to console logging.
 *
 * Accepts:
 *   order: mongoose order doc or plain object (with items array)
 *   restaurant: optional restaurant doc or object
 */
async function printReceipt(order, restaurant = {}) {
  try {
    // sanitize
    const ord = order.toObject ? order.toObject() : order;

    if (!isPrinterConfigured) {
      console.warn("⚠️ PRINTER_IP not set — falling back to console output.");
      printToConsole(ord, restaurant);
      return { ok: false, reason: "no-printer-config" };
    }

    const ok = await ensureEscpos();
    if (!ok) {
      printToConsole(ord, restaurant);
      return { ok: false, reason: "escpos-not-available" };
    }

    const device = new NetworkDevice(PRINTER_IP, PRINTER_PORT);
    const deviceOpen = util.promisify(device.open).bind(device);

    await deviceOpen();

    const printer = new PrinterClass(device);

    // Build receipt content
    const storeName = restaurant?.restaurantName || restaurant?.name || "RESTAURANT";
    const orderNumber = ord.orderNumber || ord._id;
    const date = new Date(ord.createdAt || Date.now());
    const dateStr = date.toLocaleString();

    printer
      .encode("GB18030") // encoding
      .font("a")
      .align("ct")
      .style("b")
      .size(1, 1);

    // Header
    printer.text(storeName);
    printer.style("normal");
    if (restaurant?.address) printer.text(restaurant.address);
    if (restaurant?.phone) printer.text(`Ph: ${restaurant.phone}`);
    printer.text("");

    printer.size(0, 0).style("b");
    printer.text(`ORDER #: ${orderNumber}`);
    printer.size(0, 0).style("normal");
    printer.text(`Date: ${dateStr}`);
    printer.text("--------------------------------");

    // Items
    printer.align("lt");
    (ord.items || []).forEach((it) => {
      const name = it.name || it.itemName || "Item";
      const qty = it.quantity || 1;
      const price = Number(it.price || 0);
      const lineTotal = (qty * price).toFixed(2);

      // Print name, qty and line total
      printer.text(`${name}`);
      // right-aligned qty x price
      const qtyPrice = `${qty} x ${price.toFixed(2)}`;
      // we write qtyPrice and lineTotal on the same line via padding
      // escpos printer doesn't support direct two-column easily so do a simple formatted text
      printer.text(`${qtyPrice}    ₹${lineTotal}`);
    });

    printer.text("--------------------------------");

    // Totals
    const total = Number(ord.totalPrice || 0).toFixed(2);
    printer.align("rt").text(`TOTAL: ₹${total}`);
    printer.align("lt");
    if (ord.paymentMethod) printer.text(`Payment: ${ord.paymentMethod}`);
    if (ord.notes) printer.text(`Notes: ${ord.notes}`);

    printer.text("");
    printer.align("ct");
    printer.text("Thank you for ordering!");
    printer.text("Visit Again.");
    printer.text("");
    printer.cut();
    // close device
    printer.close();

    return { ok: true };
  } catch (err) {
    console.error("❌ printReceipt error:", err);
    // fallback to console print so your system doesn't fail
    try {
      printToConsole(order, restaurant);
    } catch (e) {
      console.error("❌ console fallback failed:", e);
    }
    return { ok: false, error: err.message || err };
  }
}

module.exports = {
  printReceipt,
};
