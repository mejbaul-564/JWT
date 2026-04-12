const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//-------------
module.exports.index = (req, res) => {
  res.render("index", { title: "Home Page" });
  //    res.send("This is HOME page");
};

module.exports.signup_get = (req, res) => {
  res.render("signup_get", { title: "Sign up" });
};

// নতুন User তৈরি করো
module.exports.signup_post = async (req, res, next) => {
  // res.render('signup_post');
  try {
    const { name, email, password, age } = req.body;
    console.log("Received data:", req.body); // Check the incoming data
    const newUser = await User.createUser(name, email, password, age);
    //  JWT token তৈরি করো
    const token = createToken(newUser);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration cookie সেট করো
//  Response এ user data এবং token পাঠাও
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ User কে authenticate করো এবং JWT token generate করো
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", {
    expiresIn: "1h",
  });
}

//login page এর জন্য GET এবং POST route handler
module.exports.login_get = (req, res) => {
  res.render("login_get", { title: "Log in" });
};
//----------------
module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = createToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//----------------
module.exports.dashboard = (req, res) => {
  res.render("users/dashboard", { title: "dashboard" });
};
//cookie সেট করা
module.exports.setcookie = (req, res) => {
  res.cookie("username", "john_doe");
  res.cookie("isLoggedIn", true, { httpOnly: true });
  res.cookie(
    "preferences",
    { theme: "dark", language: "en" },
    { maxAge: 900000, httpOnly: true },
  );

  res.send("Cookie set successfully");
};

module.exports.getcookie = (req, res) => {
  const username = req.cookies.username;
  const isLoggedIn = req.cookies.isLoggedIn;
  const preferences = req.cookies.preferences;
  res.send(
    `Cookie values: ${username}, ${isLoggedIn}, ${JSON.stringify(preferences)}`,
  );
  res.json(preferences);
};
