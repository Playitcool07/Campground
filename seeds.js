var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
var seeds=[{
	name:"cloud",
	image:"https://photosforclass.com/download/pb_2512944",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},
		 {
			 name:"Nature",
	image:"https://pixabay.com/get/55e4d5454b51ab14f1dc84609620367d1c3ed9e04e507440762a7ad3964acc_340.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		 },
		 {
			 name:"Night",
	image:"https://pixabay.com/get/57e8dc414e5ba814f1dc84609620367d1c3ed9e04e507440762a7ad3964acc_340.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
		 }];

// function seedDB(){
// Campground.deleteMany({},function(err){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("removed everything");
// 	}
// 	data.forEach(function(seed){
// 		Campground.create(seed,function(err,campground){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("One campground added");
// 		}//add comment
// 			Comment.create({
// 				text:"Hurra",
// 				author:"Manglu"
// 			},function(err,comment){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					campground.comments.push(comment);
// 					campground.save();
// 					console.log("Created new comment");
// 				}
				
// 			})
// 			})
	
// })
// 	})
// }
//*******************
//Another way to do the above commented thing:)
async function seedDB(){
try{await Campground.deleteMany({});
	console.log("Campground removed");
	await Comment.deleteMany({});
	console.log("Comments removed")
// for(const seed of seeds){
// 		 let campground=await Campground.create(seed);
// 	console.log("Campground created");
// 	//add comment
// 		let comment=await	Comment.create({
// 				text:"Hurra",
// 				author:"Manglu"
// 			})
// 		console.log("comment created");
// 				await	campground.comments.push(comment);
// 				await	campground.save();
// 					console.log("Campground saved");
//    }			
}
catch(err){
	console.log(err);
}
}

module.exports=seedDB;