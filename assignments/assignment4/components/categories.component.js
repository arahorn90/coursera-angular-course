(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
           templateUrl: 'htmls/categories.component.html',
            bindings: {
                categories: '<'
            }
        });
})();