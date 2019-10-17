app.controller("tiendaController", ["rutas", "Auth", "Producto","SessionStorage", function(rutas, Auth, Producto, SessionStorage){
    var ctrl=this;
    ctrl.rutas = rutas;
    ctrl.usuario = Auth.parseToken(Auth.getToken()).email;
    ctrl.productos = Producto.query();
    ctrl.carrito = [];
    ctrl.addItem = function(item){
        var push = ctrl.carrito.push(item);
        SessionStorage.setObject("carrito", push);
        var temp = SessionStorage.getObject("carrito");
        console.log(ctrl.carrito);
        // else{
        //     var temp = SessionStorage.getObject("carrito");
        //     console.log(temp);
        // }
        
        // else{
        //     console.log("else");
        //     var itemActual;
        //     for(i=0;i<ctrl.carrito.length;i++){
        //         if(ctrl.carrito[i].id==item.id){
        //             console.log("if");
        //             itemActual = ctrl.carrito[i];
                    
        //         }
        //     }
        // }
        
        // console.log(ctrl.carrito[0]);
        // console.log(item.id);
        // if(!ctrl.carrito==""){
        //     console.log(ctrl.carrito.id);
        //     console.log(item.id);
        //     // if(!ctrl.carrito.id==item.id){ //distintos
        //     //     console.log("");
        //     //     ctrl.carrito.push(item);
        //     // }
        //     // else{ 
        //     //     console.log("entro");
        //     //     ctrl.carrito.cantidad+=item.cantidad;
        //     // }

        // }
        // else{
        //     ctrl.carrito.push(item);
        // }
        // SessionStorage.setObject("carrito", ctrl.carrito.item);
        // ctrl.total=function(){
        //     var total = 0;
        //     for(item of ctrl.carrito){
        //         total += item.precio;
        //     }
        // }
    };
    ctrl.remove=function(item){
        SessionStorage.removeItem(item);
    };
}])
