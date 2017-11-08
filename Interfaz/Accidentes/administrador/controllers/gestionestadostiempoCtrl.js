angular.module('adminModule').controller('gestionestadostiempoCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de circulacion que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarEstadoTiempo');
        }
        else if(selected===1){
            window.location.href = ('#/modificarEstadoTiempo');
        }
        else if(selected===2){
            window.location.href = ('#/eliminarEstadoTiempo');
        }
        else{

        }

    };


    //realizar la insercion del tipo de circulacion en la base de datos
    $scope.insertarEstadoTiempo=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarEstadoTiempo",nombre)
            .then(function (response) {
                mostrarNotificacion("El estado del tiempo fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto

            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del estado del tiempo", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //funcion para modificar informacion de un tipo de circulacion
    $scope.modificarEstadoTiempo=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }


        //enviar id del estado del tiempo y el nuevo nombre del mismo
        peticiones.modificar("modificarEstadoTiempo",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del estado del tiempo fue modificada con éxito", 2);
                console.log(response);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto
                $scope.registrados[indice].model=nom;

            }, function (response) {
                mostrarNotificacion("Error en la modificación de la información", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };

    //seleccionar los estados del tiempo registrados en el sistema
    $scope.seleccionarEstadosTiempo=function () {

        peticiones.seleccionar("obtenerEstadosTiempo")
            .then(function (response) {
                console.log("estados del tiempo obtenidos");
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_estadotiempo","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen estados del tiempo registrados en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de estados tiempo", 1);
                
            });
    };

    $scope.eliminarEstadoTiempo=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarEstadoTiempo",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El estado del tiempo ha sido eliminado",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El estado del tiempo no pudo ser eliminado", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarEstadoTiempo')!=-1)||(window.location.href.indexOf('eliminarEstadoTiempo')!=-1)){
        $scope.seleccionarEstadosTiempo();
    }

});
