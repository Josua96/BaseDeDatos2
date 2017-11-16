angular.module('adminModule').controller('gestiontiposcirculacionCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de circulacion que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarTipoCirculacion');
        }
        else if(selected===1){
            window.location.href = ('#/modificarTipoCirculacion');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarTipoCirculacion');
        }
        else{

        }

    };
    
    
    //realizar la insercion del tipo de circulacion en la base de datos
    $scope.insertarTipoCirculacion=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarTipoCirculacion",nombre)
            .then(function (response) {
                mostrarNotificacion("El tipo de circulación fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                
            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del tipo de circulación", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //funcion para modificar informacion de un tipo de circulacion
    $scope.modificarTiposCirculacion=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }
        console.log("nombre.. "+nom);
        
        //enviar id del tipo de circulacion y el nuevo nombre del mismo
        peticiones.modificar("modificarTipoCirculacion",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del tipo de circulación fue modificada con éxito", 2);
                console.log(response);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
                });

    };


    //seleccionar los tipos de circulacion registrados
    $scope.seleccionarTiposCirculacion=function () {
        
        peticiones.seleccionar("obtenerTiposCirculacion")
            .then(function (response) {
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_tipocirculacion","v_id");
            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de circulación", 1);
            });
    };

    $scope.eliminarTipoCirculacion=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarTipoCirculacion",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El tipo de circulación ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El tipo de circulación no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarTipoCirculacion')!=-1)||(window.location.href.indexOf('eliminarTipoCirculacion')!=-1)){
        $scope.seleccionarTiposCirculacion();
    }

});