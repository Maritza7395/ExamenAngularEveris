app.controller("tiendaController", ["rutas", "Auth", "Producto","SessionStorage", function(rutas, Auth, Producto, SessionStorage){
    var ctrl=this;
    ctrl.rutas = rutas;
    ctrl.usuario = Auth.parseToken(Auth.getToken()).email;
    ctrl.productos = Producto.query();
    ctrl.carrito = [];
    ctrl.getCarrito =   function(){
        if(Object.entries(SessionStorage.getObject('carrito')).length === 0){
            ctrl.carrito = {
                fecha: "",
                items:[],
                precioTotal: 0,
                cantidadTotal: 0,
                moneda: "CLP",
                usuario: Auth.parseToken(Auth.getToken()).email,
                estado: "enviada"
            };
        }
        else{
            ctrl.carrito = SessionStorage.getObject('carrito');
        }
    };
    ctrl.getCarrito();
    ctrl.addItem = function(item){
        var push = ctrl.carrito.push(item);
        SessionStorage.setObject("carrito", push);
        var temp = SessionStorage.getObject("carrito");
        console.log(sessionStorage.getObject("carrito"));
        console.log(ctrl.carrito[0]['nombre']);
        console.log(ctrl.carrito['1']);
    }
    ctrl.remove=function(item){
        SessionStorage.removeItem(item);
    };
}])
