angular.module('adminModule').controller('gestionkilometrorutaCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[];

    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarKilometroRuta');
        }
        else if(selected===1){
            window.location.href = ('#/modificarKilometroRuta');
        }
        else{
            window.location.href = ('#/eliminarKilometroRuta');
        }
       

    };



    $scope.insertarKilometroRuta=function () {
        var nombre = document.getElementById('nombre').value;

        //insercion
        peticiones.insertar("insertarKilometroRuta",nombre)
            .then(function (response) {

                mostrarNotificacion("El kilometro-ruta fué registrado con éxito", 2);
                console.log(response);
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del kilometro-ruta", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    $scope.modificarKilometroRuta=function(){
        var nom=document.getElementById('nombre').value;
        console.log("nombre value.. "+ nom);
        if (nom!= ""){
            var indice=document.getElementById('selec').selectedIndex;
            
            //enviar id del kilometro-ruta seleccionada y el nuevo nombre de la misma
            peticiones.modificar("modificarKilometroRuta",$scope.registrados[indice].id, nom)
                .then(function (response) {
                    
                    mostrarNotificacion("La información del kilometro-ruta fue modificada con éxito", 2);
                    console.log(response);
                    document.getElementById('nombre').value="";
                }, function (response) {
                    mostrarNotificacion("Error en la modificación", 1);
                    console.log("respuesta negativa");
                    console.log(response.data.message);
                });
        }
        else{
            mostrarNotificacion("Debe ingresar el nuevo nombre para el kilometro-ruta",1);
        }
    };
    
     $scope.seleccionarKilometroRuta=function () {

         peticiones.seleccionar("obtenerKilometrosRutas")
             .then(function (response) {
                 console.log(response);
                 $scope.registrados=recorrerRespuesta(response.data,"v_kilometroruta","v_id");
             }, function (response) {
                 mostrarNotificacion("Error en la carga del kilometro-ruta", 1);
                 console.log("respuesta negativa");
                 console.log(response.data.message);
             });
     };

    $scope.eliminarKilometroRuta=function () {
        var indice=document.getElementById('selec').selectedIndex;
        peticiones.eliminarD("eliminarKilometroRuta",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El kilometro-ruta ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select
                
            }, function (response) {
                mostrarNotificacion("Error en la eliminación del kilometro-ruta", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };
    
    if ((window.location.href.indexOf('modificarKilometroRuta')!=-1)||(window.location.href.indexOf('eliminarKilometroRuta')!=-1)){
        $scope.seleccionarKilometroRuta();
        document.getElementById('selec').selectedIndex=0;
    }

});