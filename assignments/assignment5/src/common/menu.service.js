(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = {};

  service.saveUser = function(user) {
    service.user = angular.copy(user);
    console.log(service.user);
  }

  service.getUser = function() {
    return service.user;
  }
  
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getFavoriteDish = function(code, number) {
    return $http.get(ApiPath + '/menu_items/' + code.toUpperCase() + '/menu_items/' +  number + '.json');
  }
}



})();
