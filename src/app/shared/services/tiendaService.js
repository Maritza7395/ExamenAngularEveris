app.factory('Producto', ["$resource", "api", function($resource, api) {	
    var service = $resource(api.baseUrl+'/productos/');
    return service;
}]);