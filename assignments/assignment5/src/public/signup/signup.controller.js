(function() {
    'use strict';

    var signupController = function(MenuService) {
        var info = this;

        info.user = {};
        info.favoriteDish = {};

        info.showError = false;       
        info.showMessage = false; 
        
        info.signup = function(form) {
            info.showError = false;
            info.showMessage = false;
            if(form.$invalid) {
                console.log('The form is not valid');
                return;
            }
            info.user.favoriteDish = info.user.favoriteDish.toUpperCase();

            const codeArray = info.user.favoriteDish.match(/[a-z]+/gi);
            const numberArray = info.user.favoriteDish.match(/\d+/g);
            if(codeArray == null || numberArray == null) {
                console.log('Code and number should be presented');
                info.showError = true;
            } else {
                const code = codeArray.join("");
                const number = numberArray.join("");

                MenuService.getFavoriteDish(code, number).then(function(response) {
                    info.user.favoriteDishDetails = response.data;
                    console.log(response);
                    MenuService.saveUser(info.user);
                    if(info.user.favoriteDishDetails == null) {
                        console.log('favoriteDishDetails is null');
                        info.showError = true;
                    } else {
                        info.showMessage = true;
                    }
                }, function(error) {
                    console.log(error);
                    info.showError = true;
                });
            }

        }
    };


    signupController.$inject = ['MenuService'];
    angular.module('public').controller('SignupController', signupController);
})();
