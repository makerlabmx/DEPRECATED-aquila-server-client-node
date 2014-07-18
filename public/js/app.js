(function(){
  
  var app = angular.module('aquila', ['factorys']);
  var aquila;

  app.controller('MainController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){
    aquila = this;        
    aquila.devices=[];
    aquila.active;
    aquila.device;

    aquila.classes = {};
    aquila.sizeClases = 0;

    aquila.images=['icon-075','icon-013','icon-023'];


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

          if(! aquila.classes.hasOwnProperty(devs[i].class)){
            var clase = {
              name: devs[i].class,
              image: aquila.images[aquila.sizeClases]
            };
            aquila.classes[clase.name] = clase;            
            aquila.sizeClases++;
            console.log(aquila.classes);
          }


          devs[i].img= aquila.classes[devs[i].class].image;
          devs[i].color = "color"+((i+1)%5);
          aquila.devices.push(devs[i]);
          
          
        }        
      } 
    }    
    
  }]);
  

})();