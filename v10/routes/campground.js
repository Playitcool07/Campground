var express=require("express"),
	Campground=require("../models/campground"),
	middleware=require("../middleware"),
	router=express.Router();



router.get("/",function(req,res){
	res.render("landing");
})


router.get("/campgrounds",function(req,res){
//Get campgrounds from the database
Campground.find({},function(err,campgrounds){
	if(err){
		console.log(err);
	}else{
		res.render("campground/index",{campgrounds:campgrounds,currentUser:req.user});
	}
})
	//res.render("campgrounds",{campgrounds:campgrounds});
})
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
})
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,price:price,image:image,description:desc,author:author};
	//create a new campground and save to db
Campground.create(newCampground,function(err,newlyCreated){
	if(err){
		console.log(err);
	}else{
		res.redirect("/campgrounds");
	}
})
	//campgrounds.push(newCampground);
})
//show more info about one campground
router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,id1){
		if(err){
			console.log(err);
		}else{
			
			res.render("campground/show",{campground:id1});
		}
	});
	
})
//edit campground
	router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err || !foundCampground){
				req.flash("error","Campground not found");
				console.log(err);
			}else{
				res.render("campground/edit",{campground:foundCampground});
			}
		})
		
	})
//Destroy Campground
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			res.redirect("/campgrounds");
		}
		campground.remove();
		res.redirect("/campgrounds");
	})
})
//update Campground
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	//Campground find and update
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,update){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})
// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
// function checkCampgroundOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id,function(err,foundCampground){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 				if(req.user._id.equals(foundCampground.author.id)){
// 					next();
// 				}else{
// 					res.redirect("back");
// 				}
// 			}
// 		})
// 	}else{
// 		res.redirect("back");
// 	}
// }

module.exports=router;