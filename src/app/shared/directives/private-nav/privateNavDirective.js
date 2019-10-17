app.directive('privateNav', ["$location", "rutas","Auth", function($location, rutas, Auth) {
    return { 
        restrict : "E", 
        templateUrl : "./app/shared/directives/private-nav/privateNavView.html",
        replace: true,
        scope : {},
        link: function (scope, element, attrs) {
            scope.currentLocation = $location.path();
            scope.rutas = rutas;
            scope.usuario = Auth.parseToken(Auth.getToken()).email;
        }
    }
}]);