var addressParser = require("./addressParser");
var events = require("events");
var buffertools = require("buffertools");

var DeviceManagerClient = function()
{
	this.devices = [];
};

DeviceManagerClient.prototype.__proto__ = events.EventEmitter.prototype;

DeviceManagerClient.prototype.getDevice = function(query)
{
	var devices = [];
	if(typeof query === "undefined")
	{
		devices = this.devices;
	}
	else if(Array.isArray(query))	// Array of addresses
	{
		for(var i = 0; i < this.devices.length; i++)
		{
			for(var j = 0; j < query.length; j++)
			{
				if(addressParser.isAddress(query[j]))
				{
					if(addressParser.compare(query[j], this.devices[i].address))
					{
						devices.push(this.devices[i]);
					}
				}
			}
		}
	}
	else if(typeof query === "string")
	{
		if(query === "*")
		{
			devices = this.devices;
		}
		else
		{
			devices = this.devices.filter(function(element)
			{
				if(addressParser.isAddress(query))
				{
					if(addressParser.compare(element.address, query)) return true;
				}
				if(element.name === query) return true;
				if(element.class === query) return true;
				return false;
			});
		}
	}
	else if(Buffer.isBuffer(query))
	{
		devices = this.devices.filter(function(element)
		{
			if(buffertools.compare(addressParser.toBuffer(element.address), query) === 0) return true;
			else return false;
		});
	}
	return devices;
};

var deviceManagerClient = new DeviceManagerClient();

module.exports = deviceManagerClient;