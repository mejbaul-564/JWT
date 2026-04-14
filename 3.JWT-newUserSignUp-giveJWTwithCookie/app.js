// // app.js
// const express = require("express");
// // create express app
// const app = express();
// // middleware কেউ request পাঠালে body তে যদি **JSON data** থাকে, সেটা automatically **parse** করো না দিলে `req.body` তে কিছুই পাবে না
// app.use(express.json());
// // import routes
// const authRoutes = require("./routes/auth.routes");
// // routes(Most important part)
// app.use("/api/version_1/auth", authRoutes);

// // auth routes
// module.exports = app;
//-------------------------------------------------------------------------
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

// ─── Middleware ───────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
//  View Engine SET
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // optional but recommended
app.use(express.static("public"));

// ─── Routes ──────────────────────────────────
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

// ─── Health Check ─────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running " });
});

// ─── 404 Handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found " });
});

// ─── Global Error Handler ─────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error " });
});

module.exports = app;
