(function(){

  var app = angular.module('deviceController',['aquilaFactorys']);

  app.controller('DeviceController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){    
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

      aquila.doSlider = function(device,action){
        Aq(device.address).action(action.n,action.range);
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