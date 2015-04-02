angular.module('spadeApp', [])
                            
.factory('templateService', function(){
    	var items = [];
        var myTemplatesService = {};
        
        myTemplatesService.addItem = function(item) {
        	console.log("Entering Factory");
        	console.log(item)
            items.push(item);
        	console.log("Leaving Factory");
        };

        myTemplatesService.items = function() {
            return items;
        };
        
        myTemplatesService.clear = function() {
        	items = [];
        	console.log(items);
        };
        
        return myTemplatesService;
        
    })