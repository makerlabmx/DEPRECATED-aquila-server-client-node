addressParser = require("./addressParser");
Entry = require("./entry");
var manager = require("./deviceManagerClient");
var socket;

var AquilaDevices = function(devices)
{
	Array.call(this);
	// this = devices;
	for(var d = 0; d < devices.length; d++)
	{
		this.push(devices[d]);
	}
};

AquilaDevices.prototype.__proto__ = Array.prototype;

AquilaDevices.prototype.getDeviceAddresses = function()
{
	var addresses = [];
	for(var d = 0; d < this.length; d++)
	{
		addresses.push(this[d].address);
	}
	return addresses;
};

// action can be number or action name string
AquilaDevices.prototype.action = function(action, param)
{
	var addresses = this.getDeviceAddresses();
	socket.emit("action", addresses, action, param);
};

AquilaDevices.prototype.clearEntries = function(cb)
{
	var addresses = this.getDeviceAddresses();
	socket.emit("clearEntries", addresses, cb);
};

AquilaDevices.prototype.addEntry = function(entry, cb)
{
	var addresses = this.getDeviceAddresses();
	socket.emit("addEntry", addresses, entry, cb);
};

AquilaDevices.prototype.removeEntry = function(entryN, cb)
{
	var addresses = this.getDeviceAddresses();
	socket.emit("removeEntry", addresses, entryN, cb);
};

AquilaDevices.prototype.editEntry = function(entryN, entry, cb)
{
	var addresses = this.getDeviceAddresses();
	socket.emit("editEntry", addresses, entryN, entry, cb);
};

var Aquila = function(query)
{
	return new AquilaDevices(manager.getDevice(query));
};

Aquila.manager = manager;

Aquila.update = function(callback)
{
	socket.emit("update", callback);
};

Aquila.reload = function(callback)
{
	socket.emit("reload", callback);
};

socket = io.connect();
socket.on("connect", function()
{
	console.log("Socket connected");
	Aquila.update();
	Aquila.manager.emit("ready");
});
socket.on("deviceAdded", function(devices)
{
	Aquila.manager.devices = devices;
	Aquila.manager.emit("deviceAdded");
});
socket.on("deviceRemoved", function(devices)
{
	Aquila.manager.devices = devices;
	Aquila.manager.emit("deviceRemoved");
});

// For being accesible from the browser.
Aq = Aquila;
