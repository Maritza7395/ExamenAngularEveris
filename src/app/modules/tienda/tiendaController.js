app.controller("tiendaController", ["rutas", "Auth", "Producto","SessionStorage", function(rutas, Auth, Producto, SessionStorage){
    var ctrl=this;
    ctrl.rutas = rutas;
    ctrl.usuario = Auth.parseToken(Auth.getToken()).email;
    ctrl.productos = Producto.query();
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

    ctrl.addItem = function(index){
        var itemIndex =  ctrl.carrito.items.findIndex(function(item){
             return item.id == ctrl.productos[index].id;
         })
         if(itemIndex==-1){
             var item =ctrl.productos[index];
             item.cantidad =ctrl.cant[index];
             ctrl.carrito.items.push(item);
         }else{
             ctrl.carrito.items[itemIndex].cantidad =ctrl.carrito.items[itemIndex].cantidad +ctrl.cant[index];
         }
         ctrl.carrito.cantidadTotal = ctrl.carrito.cantidadTotal+ ctrl.cant[index]
         ctrl.carrito.precioTotal = ctrl.carrito.precioTotal+ (ctrl.cant[index]*ctrl.productos[index].precio)
         ctrl.cant[index] = '';
         SessionStorage.setObject('carrito', ctrl.carrito);
     }
}])
