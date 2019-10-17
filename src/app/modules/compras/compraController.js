app.controller('compraController',["Compra",function(Compra){
    var ctrl = this;
    ctrl.compras = Compra.query(function(){});
}])