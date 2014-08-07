(function(){

var app = angular.module('aquilaFactorys', []);

app.factory('$Aq', ['$rootScope', function ($rootScope) {

  return {
    on: function (eventName, callback) {
      function wrapper() {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(Aq.manager, args);
        });
      }
      Aq.manager.on(eventName, wrapper);

      return function () {
        Aq.removeListener(eventName, wrapper);
      };
    },

  };
}]);


})();