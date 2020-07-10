var express=require("express"),
	Campground=require("../models/campground"),
	Comment=require("../models/comment"),
    middleware=require("../middleware"),
	router=express.Router();

// function isLoggedIn(req,res,next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

router.get("/campgrounds/:id/comment/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	})
	
})
router.post("/campgrounds/:id/comment",middleware.isLoggedIn,function(req,res){
Campground.findById(req.params.id,function(err,campground){
	if(err){
		console.log(err);
	}else{
		Comment.create(req.body.comment,function(err,comment){
			if(err){
				req.flash("error","Something went wrong");
				consoler.log(err);
			}else{
				comment.author.id=req.user._id;
				comment.author.username=req.user.username;
				comment.save();
				campground.comments.push(comment);
				campground.save();
				req.flash("success","Comment created!")
				res.redirect("/campgrounds/" + campground._id);
			}
		})
	}
})	
});
//edit comment 
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment})
		}
	})
	
})
//update comment
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})
//Destroy comment
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
		if(err){
			res.redirect("back");
		}
		req.flash("success","Comment deleted successfully");
		res.redirect("/campgrounds/" + req.params.id);
	})
})
// function checkCommentOwnership(req,res,next){
// 	if(req.isAuthenticated()){
// 		Comment.findById(req.params.comment_id,function(err,foundComment){
// 			if(err){
// 				res.redirect("back");
// 			}else{
// 				if(foundComment.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					res.redirect("back");
// 				}
// 			}
// 		});
// 	}else{
// 		res.redirect("back");
// 	}
// }

module.exports=router;