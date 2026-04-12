
module.exports.index=(req,res)=>{
   res.render('index', { title: 'Home Page' });
//    res.send("This is HOME page");
}
module.exports.signup_get=(req,res)=>{
    res.render('signup_get', { title: 'Sign up' });
}
module.exports.signup_post=(req,res)=>{
   // res.render('signup_post');
   res.send("Data is submitted signup_post")
   const {name,pass}=req.body;
   console.log(name,pass);
}
module.exports.login_get=(req,res)=>{
    res.render('login_get', { title: 'Log in' });
}
module.exports.login_post=(req,res)=>{
   // res.render('logIN_post');
   res.send("Data is submitted login_post")
    console.log(req.body);
}
module.exports.dashboard=(req,res)=>{
    res.render('users/dashboard', { title: 'dashboard'});
}