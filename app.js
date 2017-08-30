var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

// Connection to the database named as edwisorBlog

db = mongoose.connect('mongodb://localhost/edwisorBlog');

//checking of db connection success
mongoose.connection.once('open', function() {

	console.log("database connection established");

});

var routes=require("./routes.js");

app.use('/',routes);


// display 404 status if the requested URL/API is noty present
app.use(function(req, res) {
   res.status('404').send("404: Page not Found");
   console.log("404 error");
});
//404



app.listen(3000, function () {
  console.log('edwisor blog listening to port 3000');
});