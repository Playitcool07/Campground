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
const session=require('express-session'),
 MongoStore = require('connect-mongo')(session);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useFindAndModify',false);
//mongoose.connect(process.env.DATABASEURL);

app.set("view engine","ejs");
//app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
//app.use('/static', express.static(__dirname, 'public'));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect(process.env.DATABASEURL||'mongodb://localhost:27017/yelp_camp_v11');
app.use(session({
	secret:"Hello-World",
	// cookie:{
	// secure: true,
	// maxAge:60000
	// },
	 store: new MongoStore({ mongooseConnection: mongoose.connection }),
	resave:false,
	saveUninitialized:false
}));
// app.use(function(req,res,next){
// if(!req.session){
//     return next(new Error('Oh no')) //handle error
// }
// next() //otherwise continue
// });
//mongoose.connect({useFindAndModify:false,useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb://localhost:27017/yelp_camp_v11', {useFindAndModify:false,useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect('mongodb+srv://ankit07:Ron@ldo07@cluster0.t1rgd.gcp.mongodb.net/ankit07?retryWrites=true&w=majority', {useFindAndModify:false,useNewUrlParser: true, useUnifiedTopology: true});

//comment seeddb
//seedDB();

//Passport Configuration
// app.use(session({
// 	secret:"Hello World!!",
// 	resave:false,
// 	saveUninitialized:false
// }));
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

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Our Yelpcamp has started");
})