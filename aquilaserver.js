var socket = require("socket.io");
var Aq = require("aquilaLib").Aq;

var AquilaServer = function()
{
};

AquilaServer.prototype.listen = function(port, callback)
{
	Aq.manager.on("ready", function()
	{
		Aq.manager.on("deviceAdded", function()
			{
				console.log("Device Added");
			});

		Aq.manager.on("deviceRemoved", function()
			{
				console.log("Device Removed");
			});


		console.log("Protocol ready.");
		console.log("Getting devices...");
		Aq.update(function()
			{
				console.log("Devices ready.");
			});
	});

	var io = socket.listen(port, function () {
		if(callback) callback();
	});

	io.sockets.on("connection", function(socket)
	{	
		socket.on("action", function(addresses, action, param)
			{
				Aq(addresses).action(action, param);
			});

		Aq.manager.on("deviceAdded", function()
			{
				socket.emit("deviceAdded", Aq.manager.devices);
			});

		Aq.manager.on("deviceRemoved", function()
			{
				socket.emit("deviceRemoved", Aq.manager.devices);
			});

		socket.emit("deviceAdded", Aq.manager.devices);
	});

	return port;
};

var aquilaServer = new AquilaServer();

module.exports = aquilaServer;

