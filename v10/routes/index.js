var express=require("express"),
	router=express.Router(),
    User=require("../models/user"),
	passport=require("passport");

router.get("/register",function(req,res){
	res.render("register");
})
router.post("/register",function(req,res){
	var newUser= new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			
			//req.flash("error",err);
			return res.render("register",{"error":err.message});
		}else{
		passport.authenticate("local")(req,res, function(){
			req.flash("success","Welcome to YelpCamp " + user.username);
			return res.redirect("/campgrounds/");
		})};
		
	});
});
//show login form
router.get("/login",function(req,res){
	res.render("login");
});
// //login methods and post route
// router.post("/login",passport.authenticate("local",{successRedirect:"/campgrounds",
// 			failureRedirect:"/login"
// 	}
// 													),function(req,res,err){
// 	if(err){
// 		req.flash("error",err.message),
// 			res.redirect("/login")
// 	}
// 	});
// router.get("/logout",function(req,res){
// 	req.logout();
// 	req.flash("success","You have successfully logged out");
// 	res.redirect("/campgrounds");
// })

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
module.exports=router;