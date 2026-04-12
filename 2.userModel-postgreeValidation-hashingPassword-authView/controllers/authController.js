const User = require("../models/userModel");
//-------------
module.exports.index = (req, res) => {
  res.render("index", { title: "Home Page" });
  //    res.send("This is HOME page");
};
module.exports.signup_get = (req, res) => {
  res.render("signup_get", { title: "Sign up" });
};
// ✅ নতুন User তৈরি করো
module.exports.signup_post = async (req, res, next) => {
  // res.render('signup_post');
  
  try {

    const { name, email, password, age } = req.body;

    const newUser = await User.createUser(name, email, password, age);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser
    });
  
  } catch (error) {

   return res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};
//----------------
module.exports.login_get = (req, res) => {
  res.render("login_get", { title: "Log in" });
};

module.exports.login_post = (req, res) => {
  // res.render('logIN_post');
  res.send("Data is submitted login_post");
  console.log(req.body);
};

module.exports.dashboard = (req, res) => {
  res.render("users/dashboard", { title: "dashboard" });
};
