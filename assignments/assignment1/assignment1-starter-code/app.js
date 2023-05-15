(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        var pleaseEnter = 'Please enter data first';
        $scope.placeholder = 'list comma separated dishes you usually have for lunch';
        $scope.message = pleaseEnter;
        $scope.items = '';

        $scope.verifyLunch = function() {
            if ($scope.items.length === 0) {
                $scope.message = pleaseEnter;
            } else {

                if ($scope.items.split(',').length <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!';
                }
            }
        };
    }
})();