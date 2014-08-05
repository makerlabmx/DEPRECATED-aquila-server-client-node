(function(){
  
  var app = angular.module('aquila', ['factorys','ngRoute']);
  var aquila;

  app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/dispositivos/dispositivos.html',
        controller: 'MainController'
      }).
      when('/interacciones', {
        templateUrl: 'views/interacciones/interacciones.html',
        controller: 'InteraccionesController'
      }).
      otherwise({
        redirectTo: '/404error'
      });
  }]);

  app.controller('InteraccionesController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){    
    inter = this;        
    inter.devices=[];
    inter.interaccion;
    inter.entries;
    inter.test = "hola";
    inter.edit_element = false;
    inter.save_element = false;

    function editTrue(){
      inter.edit_element = true;
      inter.save_element = false;
    }
    function saveTrue(){
      inter.edit_element = false;
      inter.save_element = true;
    }

    inter.init = function (){        
      loadInter();      
    }
    inter.new = function (){
      inter.interaccion = {};
      saveTrue();
    }

    inter.edit = function (entry){
      inter.interaccion = {};          
      dev_cuando = Aq(entry.address)[0];
      dev_hacer = Aq(entry.device)[0];      
      inter.interaccion.dev_cuando = dev_cuando;
      inter.interaccion.dev_hacer = dev_hacer;
      inter.interaccion.event_cuando = getEvent(dev_cuando.address,entry.event);
      inter.interaccion.action_hacer = getAction(dev_hacer.address,entry.action);
      inter.interaccion.n = entry.n;      
      editTrue();
    }

    inter.save = function (){      
      var entry =  new Entry();
      entry.event = inter.interaccion.event_cuando.n ;
      entry.action = inter.interaccion.action_hacer.n ;
      entry.address = inter.interaccion.dev_cuando.address ;      
      Aq(inter.interaccion.dev_hacer.address).addEntry(entry, function(){
        console.log("si se guardo")
      });
    }

    inter.update = function (){      
      var entry =  new Entry();
      entry.event = inter.interaccion.event_cuando.n ;
      entry.action = inter.interaccion.action_hacer.n ;
      entry.address = inter.interaccion.dev_cuando.address ;      
      Aq(inter.interaccion.dev_hacer.address).editEntry(inter.interaccion.n,entry, function(){
        console.log("si se actualizo")
      });
    }    

    inter.delete = function (entry){
      Aq(entry.device).removeEntry(entry.n,function(){
        console.log("todo ok");
      });
    }

    $Aq.on('deviceAdded', function(){
      loadInter();  
    });

    function loadInter(){
      inter.devices=[];
      inter.entries=[];
      var devs = Aq("*");      
      //console.log(devs);
      for(var i = 0; i < devs.length; i++)
      {                           
        if(devs[i].active){           
          inter.devices.push(devs[i]);                    
          for(var x = 0; x < devs[i].entries.length; x++){                        
            devs[i].entries[x].device = devs[i].address;
            devs[i].entries[x].cuando_name = getDevice(devs[i].entries[x].address);            
            devs[i].entries[x].event_name = getEvent(devs[i].entries[x].address,devs[i].entries[x].event).name;
            devs[i].entries[x].hacer_name = devs[i].name;            
            devs[i].entries[x].action_name = getAction(devs[i].address,devs[i].entries[x].action).name;
            inter.entries.push(devs[i].entries[x]);
          }          
        }        
      } 
    }

    function getDevice(address){
      var devices = Aq(address);
      if(devices.length > 0){
        return devices[0].name;
      }      
      return "no found";
    }

    function getAction(address,idAction){      
      var devices = Aq(address);
      if(devices.length > 0){
        device = devices[0];   
        for (i = 0; i < device.actions.length; i++) { 
          if(device.actions[i].n == idAction){            
            return device.actions[i];
          }                        
        }             
      }      
      return "no found";
    }
    function getEvent(address,idEvent){
      var devices = Aq(address);
      if(devices.length > 0){
        device = devices[0];           
        for (i = 0; i < device.events.length; i++) {                     
          if(device.events[i].n == idEvent){                   
            return device.events[i];
          }                        
        }             
      }      
      return "no found";
    }
    
  }]);

  app.controller('MainController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){    
    aquila = this;        
    aquila.devices=[];
    aquila.active;
    aquila.device;    

    /*Main */

    aquila.classes = {};
    aquila.sizeClases = 0;

    aquila.images=['icon-075','icon-013','icon-023'];

    aquila.initMain = function (){        
      loadMain();
    }

    aquila.seeOptions = function(device){                  
      device = Aq(device.address)[0];
      device.show_options = true;
    };

    aquila.hideOptions = function(device){                        
      device.show_options = false;
    };

    aquila.seeAllDevices = function(){            
      aquila.active = false;      
    };

    aquila.doAction = function(id, action){
      Aq(id).action(action);
    };

    aquila.load = function (clase){        
      aquila.devices=[];
      var devs = Aq(clase);
      for(var i = 0; i < devs.length; i++)
      {                      
        if(devs[i].active)  { 
          devs[i].img= aquila.classes[devs[i].class].image; 
          devs[i].color = "color"+((i+1)%5);
          aquila.devices.push(devs[i]);                  
        }        
      } 
    }    

    $Aq.on('deviceAdded', function(){
      loadMain();
    });

    $Aq.on('deviceRemoved', function(){      
      loadMain();
    });

    function loadMain(){
      if(!aquila.classes) return;
      aquila.devices=[];
      var devs = Aq("*");
      for(var i = 0; i < devs.length; i++)
      {                      
        if(devs[i].active)  {           
          if(!(devs[i].class in aquila.classes)){
            var clase = {
              name: devs[i].class,
              image: aquila.images[aquila.sizeClases]
            };
            aquila.classes[clase.name] = clase;            
            aquila.sizeClases++;            
          }
          devs[i].img= aquila.classes[devs[i].class].image;
          devs[i].color = "color"+((i+1)%5);
          aquila.devices.push(devs[i]);          
          
          
        }        
      } 
    }    
    
  }]);
  

})();