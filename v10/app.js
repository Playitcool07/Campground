var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment");
var User=require("./models/user");
var flash=require("connect-flash");
var methodOverride=require("method-override");
var campgroundRoutes=require("./routes/campground"),
	commentRoutes=require("./routes/comments"),
	indexRoutes=require("./routes/index");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
//app.use('/static', express.static(__dirname, 'public'));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', {useFindAndModify:false,useNewUrlParser: true, useUnifiedTopology: true});
//comment seeddb
//seedDB();

//Passport Configuration
app.use(require("express-session")({
	secret:"Hello World!!",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})


/*Campground.create({
	name:"babloo",
	image:"https://media.istockphoto.com/photos/equipment-and-accessories-for-mountain-hiking-in-the-wilderness-picture-id926586802",
description:"A beautiful image"},function(err,campground){
if(err){
	console.log(err);
}	else{
	console.log("Our new campground");
	console.log(campground);
}
})*/

//===================
//Comment route
//====================
//*************
//Auth Routes
app.use(indexRoutes);
app.use(campgroundRoutes); 
app.use(commentRoutes);

app.listen(3000,function(){
	console.log("Our Yelpcamp has started");
})