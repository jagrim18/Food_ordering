const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { protect, restaurantOnly } = require("../middlewares/authMiddleware");
const restaurantController = require("../controllers/restaurantController");
const { changePassword } = require("../controllers/authController");

const router = express.Router();

/* ===============================
   MULTER CONFIG
================================== */
const uploadBaseDir = path.join(__dirname, "../uploads");
const restaurantUploadDir = path.join(uploadBaseDir, "restaurants");

[uploadBaseDir, restaurantUploadDir].forEach((d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, restaurantUploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpeg|jpg|png|webp)$/i;
  if (allowed.test(file.originalname)) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

const upload = multer({ storage, fileFilter });

/* ===============================
   PUBLIC ROUTES
================================== */
router.get("/", restaurantController.getRestaurants);
router.post("/register", restaurantController.registerRestaurant);
router.post("/login", restaurantController.loginRestaurant);

/* ===============================
   PROTECTED ROUTES
================================== */
router.get("/profile", protect, restaurantOnly, restaurantController.getRestaurantProfile);

router.put(
  "/profile",
  protect,
  restaurantOnly,
  upload.single("profileImage"),
  restaurantController.updateRestaurantProfile
);

router.put(
  "/change-password",
  protect,
  restaurantOnly,
  changePassword
);

/* 🔥 FINAL FIX: multer ONLY here */
router.post(
  "/upload-gallery",
  protect,
  restaurantOnly,
  upload.array("images", 10),
  restaurantController.uploadGallery
);

router.delete(
  "/gallery/:imageName",
  protect,
  restaurantOnly,
  restaurantController.deleteGalleryImage
);

/* ADMIN ROUTES */
router.put("/:id", restaurantController.updateRestaurantById);
router.get("/:id", restaurantController.getRestaurantById);

module.exports = router;
