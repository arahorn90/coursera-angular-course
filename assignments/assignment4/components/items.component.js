(function() {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'htmls/items.component.html',
            bindings: {
                items: '<'
            }
        });
})();