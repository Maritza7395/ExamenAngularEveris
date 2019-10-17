app.directive('privateAside', ["$location", "rutas", function($location, rutas) {
    return { 
        restrict : "E", 
        templateUrl : "./app/shared/directives/private-aside/privateAsideView.html",
        replace: true,
        scope : {},
        link: function (scope, element, attrs) {
            scope.currentLocation = $location.path();
            scope.rutas = rutas;
        }
        
    }
}]);