var express = require("express");
var aquilaServer = require("./aquilaServer");

var app = express();
var port = 8080;

app.configure(function(){
	app.set("port", process.env.PORT || port);
	//app.use(express.favicon());
	app.use(express.logger("dev"));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + "/public"));
	app.set("views", __dirname + "/views");
	app.engine("html", require("ejs").renderFile);
});

app.configure("development", function(){
	app.use(express.errorHandler());
});


app.get("/", function(req, res){
	res.render("index.html");
});

aquilaServer.listen( app.listen(port, function()
{
	console.log("server listening on port " + port);
}));