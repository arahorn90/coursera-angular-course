(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menuData = this;
        menuData.shortName = '';

        menuData.matchedMenuItems = function(searchTerm) {
            if(searchTerm.length !== 0) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

                promise.then(function(items) {

                    
                    if (items && items.length > 0) {
                        menuData.message = '';
                        menuData.foundItems = items;
                    } else {
                        menuData.message = 'Nothing was found!';
                        menuData.foundItems = [];
                    }
                    
                    if (menuData.foundItems.length) {
                      menuData.empty = false; 

                    } 
                    else {
                      menuData.empty = true;
                    }
                });
            }
        };

        menuData.removeMenuItem = function(itemIndex) {
            menuData.foundItems.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json")
            }).then(function(result) {
                var foundItems = [];

                for(var key in result.data) {
                  for(var index = 1; index < result.data[key].menu_items.length; index++) {
                    var itemDescription = result.data[key].menu_items[index].description.toLowerCase();
                    
                    if (itemDescription.indexOf(searchTerm.toLowerCase()) != -1) {
                      foundItems.push(result.data[key].menu_items[index]);
                    }
                  }
                }

                return foundItems;
              })
              .catch(function (error) {
                console.log("Something went terribly wrong.");
                console.log(error);
              });
            };
        };
    

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItem : '=',
                onRemove : '&',
                empty : '='
            },
            controller: NarrowItDownController,
            controllerAs: 'menuData',
            bindToController: true
        };

        return ddo;
    }
})();