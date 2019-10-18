app.controller("tiendaController", ["rutas", "Auth", "Producto", "Compra","SessionStorage", function(rutas, Auth, Producto, Compra, SessionStorage){
    var ctrl=this;
    ctrl.rutas = rutas;
    ctrl.usuario = Auth.parseToken(Auth.getToken()).email;
    ctrl.productos = Producto.query();
    ctrl.carrito = [];
    ctrl.getCarrito =  function(){
        if(Object.entries(SessionStorage.getObject('carrito')).length === 0){
            ctrl.carrito = {
                fecha: new Date(),
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

    ctrl.addItem = function(item, index){
        console.log(item);
        var precioInit = ctrl.productos[index].precio;
        if(Object.entries(ctrl.carrito.items).length === 0){
            item.cantidad = ctrl.cantidad[index];
            item.precio = item.cantidad*item.precio;
            ctrl.carrito.items.push(item);
            SessionStorage.setObject('carrito', ctrl.carrito);
        }
        else{
            var ItemExist = false;
            for(i=0;i<ctrl.carrito.items.length;i++){
                
                if(ctrl.carrito.items[i].id==item.id){
                    var setCantidad = ctrl.carrito.items[i].cantidad+ctrl.cantidad[index];
                    ctrl.carrito.items[i].cantidad = setCantidad;
                    ctrl.carrito.items[i].precio = precioInit * setCantidad;
                    ItemExist = true;
                    
                }
            }
            if(ItemExist==false){
                item.cantidad = ctrl.cantidad[index];
                item.precio = item.cantidad*item.precio;
                ctrl.carrito.items.push(item);
            }
            SessionStorage.setObject('carrito', ctrl.carrito);
        }
        ctrl.carrito.cantidadTotal = ctrl.carrito.cantidadTotal+ctrl.cantidad[index];
        for (var i = 0; i <ctrl.carrito.items.length ; i++){
            ctrl.carrito.precioTotal += ctrl.carrito.items[i].precio;
        };
    
    };
    ctrl.remove=function(item){
        var index = ctrl.carrito.items.indexOf(item);
        ctrl.carrito.items.splice(index, 1);
        ctrl.carrito.cantidadTotal = ctrl.carrito.cantidadTotal-ctrl.cantidad[index];
        ctrl.carrito.precioTotal = ctrl.carrito.precioTotal-ctrl.carrito.items[index].precio;
        SessionStorage.setObject('carrito', ctrl.carrito);
    };

    ctrl.compra=function(){
        Compra.save(ctrl.carrito, function(carrito){
            SessionStorage.remove('carrito');
            ctrl.getCarrito();
        });
    };
}])
