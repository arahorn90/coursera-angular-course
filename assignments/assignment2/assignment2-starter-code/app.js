(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        let requiredElements = this;
        requiredElements.items = ShoppingListCheckOffService.getRequiredItems();

        requiredElements.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        let boughtElements = this;

        boughtElements.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        let shoppingService = this;
        let requiredItems = [
            { name: "cookies", quantity: 10 },
            { name: "breads", quantity: 2 },
            { name: "cakes", quantity: 11 },
            { name: "cheese", quantity: 3 },
            { name: "tomato", quantity: 2 }
        ]

        let boughtItems = [];

        shoppingService.buyItem = function(index) {
            let item = requiredItems[index];
            boughtItems.push(item);
            requiredItems.splice(index, 1);
        }

        shoppingService.getRequiredItems = function() {
            return requiredItems;
        };

        shoppingService.getBoughtItems = function() {
            return boughtItems;
        };
    }

})();