angular.module('adminModule').controller('gestiontiposlesionesCtrl', function($scope,$location,$http,peticiones){

    $scope.registrados=[]; //contendrá la lista de tipos de circulacion que se encuentran registrados en el sistema


    $scope.obtenerSeleccionada=function (selected) {
        if (selected===0){
            window.location.href = ('#/insertarTipoLesion');
        }
        else if(selected===1){
            window.location.href = ('#/modificarTipoLesion');
        }
        else {
            window.location.href = ('#/eliminarTipoLesion');
        }
        
    };


    //realizar la insercion del tipo de circulacion en la base de datos
    $scope.insertarTipoLesion=function () {
        var nombre = document.getElementById('nombre').value;
        //insercion
        peticiones.insertar("insertarTipolesion",nombre)
            .then(function (response) {
                mostrarNotificacion("El tipo de lesion fué registrado con éxito", 2);
                document.getElementById('nombre').value=""; //actualiza vista del campo de texto

            }, function (response) {
                mostrarNotificacion("Ocurrió un error en el registro del tipo de lesión", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    //funcion para modificar informacion de un tipo de circulacion
    $scope.modificarTipoLesion=function(){
        var nom=document.getElementById('nombre').value;

        var indice=document.getElementById('selec').selectedIndex;
        if (indice==-1){
            indice=0;
        }


        //enviar id del estado del tiempo y el nuevo nombre del mismo
        peticiones.modificar("modificarTipoLesion",$scope.registrados[indice].id,nom)
            .then(function (response) {
                mostrarNotificacion("La información del tipo de lesión fue modificada con éxito", 2);
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
    $scope.seleccionarTiposLesiones=function () {

        peticiones.seleccionar("obtenerTiposLesiones")
            .then(function (response) {
                console.log("estados del tiempo obtenidos");
                console.log(response);
                //guardar los datos en el arreglo de registrados
                $scope.registrados=recorrerRespuesta(response.data,"v_tipolesion","v_id");

                if ($scope.registrados.length==0){
                    mostrarNotificacion("No existen tipos de lesiones registradas en el sistema",3);
                }

            }, function (response) {
                mostrarNotificacion("Error en la carga de tipos de lesiones", 1);

            });
    };

    $scope.eliminarTipoLesion=function () {
        var indice=document.getElementById('selec').selectedIndex;
        console.log("indice... "+indice);
        peticiones.eliminar("eliminarTipoLesion",$scope.registrados[indice].id)
            .then(function (response) {
                console.log(response);
                mostrarNotificacion("El tio de lesión ha sido eliminada",2);
                $scope.registrados.splice(indice,1); //actualizar el select

            }, function (response) {
                mostrarNotificacion("El tipo de lesión no pudo ser eliminada", 1);
                console.log("respuesta negativa");
                console.log(response.data.message);
            });
    };


    if ((window.location.href.indexOf('modificarTipoLesion')!=-1)||(window.location.href.indexOf('eliminarTipoLesion')!=-1)){
        $scope.seleccionarTiposLesiones();
    }

});

