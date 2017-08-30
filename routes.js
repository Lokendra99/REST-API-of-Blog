var express=require("express")
var mongoose=require("mongoose");
var router=express.Router();
var Blog = require('./schema.js');
var blogModel = mongoose.model('blogData');



// Blog API 

// API for intro
router.get('/', function (req, res) {

  res.send("Welcome here for the Blog API")

});

// route to GET all blogs
router.get('/blogs',function(req, res) {

  blogModel.find({},function(err,result){
    if(err){
			res.send(err)
		}
		else{
			res.send(result)
		}
	});

});



// route to get a blog depending on its id
router.get('/blogs/:id',function(req, res) {

	blogModel.findOne({'_id':req.params.id},function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.send(result)
		}
	});

});


//route to create a blog
	router.post('/blog/create',function(req, res) {
		var blogData = new blogModel({

			title 		: req.body.title,
			subTitle 	: req.body.subTitle,
			body 	: req.body.body

		});

		//date
		var today = Date.now();
		blogData.createdAt = today;

		//tags
		var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		blogData.tags = allTags;

		// author
		var authorData = {fullName: req.body.authorName,email:req.body.authorEmail};
		blogData.authorInfo = authorData;

		blogData.save(function(err){
			if(err){
				console.log(err);
				res.send(err);

			}
			else{
				res.send(blogData);
			}

		});


	});



// route to edit the blog
router.put('/blogs/edit/:id',function(req, res) {

	var update = req.body;
	//date
		var today = Date.now();
		update.lastUpdatedAt = today;

		//tags
		var updatedAllTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		update.tags = updatedAllTags;

		// author
		var updatedAuthorData = {fullName: req.body.authorName,email:req.body.authorEmail};
		update.authorInfo = updatedAuthorData;

	blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){

		if(err){
			console.log("something is not working");
			res.send(err)
		}
		else{
			res.send(result)
		}
		



	});

});



//route to delete a blog depending on ID using POST reqquest
router.post('/blogs/delete/:id',function(req, res) {

	blogModel.remove({'_id':req.params.id},function(err,result){

		if(err){
			console.log(err);
			res.send(err)
		}
		else{
			res.send(result)
		}


	});
});

module.exports=router;