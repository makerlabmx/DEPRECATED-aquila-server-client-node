(function(){

  var app = angular.module('mainController',['aquilaFactorys']);

  app.controller('MainController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){    
      main = this;        

      main.doReload = function(){
        Aq.reload();
      };
          
      
    }]);
})();