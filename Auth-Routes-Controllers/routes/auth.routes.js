const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// routes
// router.get("/", (req, res) => {
//   res.send("This is HOME pa");
// });
// router.get("/register", (req, res) => {
//   res.send("User registered!");
// });
// router.get("/login", (req, res) => {
//   res.send("User logged in!");
// });
// --------------------------------------------------------------------------------------------
router.get("/", authController.index);
//Signup পেজ দেখানো ব্রাউজারে /signup URL-এ গেলে — signup ফর্মের HTML পেজ পাঠায় (render করে)।
router.get("/signup", authController.signup_get);
//Signup ফর্ম জমা নেওয়াইউজার ফর্ম fill করে Submit চাপলে — নাম, ইমেইল, পাসওয়ার্ড ইত্যাদি server-এ পাঠায়, তারপর database-এ save করে।
router.post("/signup", authController.signup_post);
//Login পেজ দেখানো ---logIN URL-এ গেলে — login ফর্মের HTML পেজ পাঠায়।
router.get("/login", authController.login_get);
//Login ফর্ম জমা নেওয়া ইউজার ইমেইল+পাসওয়ার্ড দিয়ে Submit করলে — verify করে এবং session/token তৈরি করে।
router.post("/login", authController.login_post);
router.get("/dashboard", authController.dashboard);
//cookie সেট করা
router.get("/setcookie", authController.setcookie);
router.get("/getcookie", authController.getcookie);
//----------------

// auth routes
module.exports = router;
