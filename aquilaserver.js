var socket = require("socket.io");
var Aq = require("aquilaLib").Aq;
var Entry = require("aquilaLib").Entry;

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

		var io = socket.listen(port, function () {
			if(callback) callback();
		});

		io.sockets.on("connection", function(socket)
		{	
			socket.on("action", function(addresses, action, param)
				{
					Aq(addresses).action(action, param);
				});

			socket.on("setName", function(addresses, name)
				{
					Aq(addresses).setName(name);
				});

			socket.on("setPAN", function(pan, callback)
				{
					Aq.setPAN(pan, callback);
				});

			socket.on("getPAN", function(callback)
				{
					Aq.getPAN(callback);
				});

			socket.on("update", function(callback)
				{
					Aq.update(callback);
				});

			socket.on("reload", function(callback)
				{
					Aq.reload(callback);
				});

			socket.on("clearEntries", function(addresses, cb)
				{
					console.log("clearEntries");
					Aq(addresses).clearEntries(function()
						{
							socket.emit("deviceAdded", Aq.manager.getDevices());
							cb();
						});
				});

			socket.on("addEntry", function(addresses, entry, cb)
				{
					console.log("addEntry");
					var localEntry = new Entry();
					for (var attrname in entry) { localEntry[attrname] = entry[attrname]; }
					Aq(addresses).addEntry(localEntry, function()
						{
							socket.emit("deviceAdded", Aq.manager.getDevices());
							cb();
						});
				});

			socket.on("removeEntry", function(addresses, entryN, cb)
				{
					console.log("removeEntry");
					Aq(addresses).removeEntry(entryN, function()
						{
							socket.emit("deviceAdded", Aq.manager.getDevices());
							cb();
						});
				});

			socket.on("editEntry", function(addresses, entryN, entry, cb)
				{
					console.log("editEntry");
					var localEntry = new Entry();
					for (var attrname in entry) { localEntry[attrname] = entry[attrname]; }
					Aq(addresses).editEntry(entryN, localEntry, function()
						{
							socket.emit("deviceAdded", Aq.manager.getDevices());
							cb();
						});
				});

			Aq.manager.on("deviceAdded", function()
				{
					socket.emit("deviceAdded", Aq.manager.getDevices());
				});

			Aq.manager.on("deviceRemoved", function()
				{
					socket.emit("deviceRemoved", Aq.manager.getDevices());
				});

			socket.emit("deviceAdded", Aq.manager.getDevices());
		});
	});

	return port;
};

var aquilaServer = new AquilaServer();

module.exports = aquilaServer;

