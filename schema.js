var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title 		         : {type:String,default:'',required:true, unique:true},
	subTitle             : {type:String,default:''},
	body                 : {type:String,default:''},
	tags		         : [],
	createdAt		     : {type:Date},
	lastUpdatedAt        : {type:Date},
	authorInfo           :  {},

});


mongoose.model('blogData',blogSchema);