(function(){
  
  var app = angular.module('aquila', ['factorys']);
  var aquila;

  app.controller('MainController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){
    aquila = this;    
    aquila.test = "prueba";
    aquila.devices=[];
    aquila.active;
    aquila.device;


    aquila.seeDevice = function(id){            
      aquila.active = true;     
      aquila.device = Aq(id)[0];             
    };

    aquila.seeAllDevices = function(){            
      aquila.active = false;      
    };

    aquila.doAction = function(id, action){
      Aq(id).action(action);
    };


    $Aq.on('deviceAdded', function(){
      load();
    });

    $Aq.on('deviceRemoved', function(){      
      load();
    });

    function load(){            
      aquila.devices=[];
      var devs = Aq("*");
      for(var i = 0; i < devs.length; i++)
      {                      
        if(devs[i].active)  { 
          devs[i].img= "icon-075";
          aquila.devices.push(devs[i]);
        }        
      }      
    }
    
  }]);
  

})();