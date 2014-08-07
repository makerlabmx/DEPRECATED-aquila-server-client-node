(function(){

	var app = angular.module('configuracionController',['aquilaFactorys']);

	app.controller('ConfiguracionController', [ '$http' , '$scope', '$Aq' ,function($http, $scope, $Aq){    
		config = this;
      	config.panel = 1;
      	config.pan = 12;

		config.selectTab = function(index){
			config.panel = index;
		};

		config.isSelected = function(index){
      		return config.panel == index;
    	};

    	$('#PANADDRESS').keyup(function() {    		
    	    var $th = $(this);
    	    $th.val( $th.val().replace(/[^a-zA-Z0-9]/g, function(str) { alert('You typed " ' + str + ' ".\n\nPlease use only letters and numbers.'); return ''; } ) );
    	});
    	
    	config.getPAN = function(){
    		Aq.getPAN(function(pan){				
				config.pan = pan;				
				hexString = pan.toString(16);				
				$("#PANADDRESS").val(hexString);
			}); 			
    	};

    	config.setPAN = function(pan){    		    		
    		Aq.setPAN(parseInt(pan, 16),function(pan){    		
				console.log("ok");
			});			
    	};    	
       
      
  	}]);
})();